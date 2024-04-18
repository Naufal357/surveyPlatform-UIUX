<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\SurveyResponses;
use App\Models\Survey;
use App\Models\SurveyQuestions;
use Inertia\Inertia;
use PhpParser\Node\Stmt\Echo_;
use Psy\Readline\Hoa\Console;

class TamController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        $surveyTitles = Survey::where('user_id', $user->id)->get(['id', 'title']);
        if ($surveyTitles->isEmpty()) {
            return redirect()->route('account.surveys.create');
        }

        $sortedSurveyTitles = $surveyTitles->sortBy('id');
        $lowestTitleId = $sortedSurveyTitles->first()->id;

        return redirect()->route('account.tam.id', ['id' => $lowestTitleId]);
    }

    public function show(Request $request, $id)
    {
        $userID = auth()->user()->id;
        $responsesFormated = [];

        $survey = Survey::find($id);
        if ($survey->user_id !== $userID) {
            return abort(403, 'Unauthorized');
        }

        $surveyTitles = Survey::where('user_id', $userID)
            ->whereHas('methods', function ($query) {
                $query->where('method_id', 2);
            })
            ->get(['surveys.id', 'surveys.title']);

        $responses = SurveyResponses::where('survey_id', $id)
            ->where('response_data', 'LIKE', '%"tam"%')
            ->get();

        // Mulai - Format data TAM - responsesFormated
        $responsesFormatedJson = [];

        foreach ($responses as $response) {
            $responseDataFormated = [];

            $responseData = json_decode($response->response_data, true);

            if (!isset($responseDataFormated['response_data'])) {
                $responseDataFormated['response_data'] = [];
            }

            if (isset($responseData['sus'])) {
                $responseDataFormated['response_data']['sus'] = $responseData['sus'];
            }

            $tamFormatted = [];
            foreach ($responseData['tam'] as $variable) {
                foreach ($variable['responses'] as $response) {
                    foreach ($response['value'] as $value) {
                        $tamFormatted[$value[0]] = $value[1];
                    }
                }
            }
            $responseDataFormated['response_data']['tam'] = $tamFormatted;
            $responsesFormatedJson[] = json_encode($responseDataFormated);
        }

        foreach ($responses as $response) {
            $responseCopy = clone $response;
            $responseCopy->response_data = $responsesFormatedJson[$response->id - 1];
            $responsesFormated[] = $responseCopy;
        }
        // Akhir - Format data TAM - responsesFormated

        $tamQustions = SurveyQuestions::where('survey_id', $id)->get();

        $respondents = $this->countRespondents($id, $responses);

        $respondentCount = $this->countRespondents($id, $responsesFormated);
        $getTAMChartData = $this->getTAMChartData($id, $responsesFormated);
        $demographicRespondents = $this->demographicRespondents($responses);
        $tamSurveyResults = $this->getTAMResults($responsesFormated);
        $calculateDescriptiveStatistics = $this->getCalculateDescriptiveStatistics($respondents, $responses);
        // $calculateRegression = $this->getCalculateRegression($respondents, $responses);

        return inertia('Account/TAM/Index', [
            'surveyTitles' => $surveyTitles,
            'survey' => $survey,
            'responsesFormated' => $responsesFormated,
            'respondentCount' => $respondentCount,
            'demographicRespondents' => $demographicRespondents,
            'getTAMChartData' => $getTAMChartData,
            'calculateDescriptiveStatistics' => $calculateDescriptiveStatistics,
            // 'calculateRegression' => $calculateRegression,
            'tamSurveyResults' => $tamSurveyResults,
            'tamQustions' => $tamQustions
        ])->with('currentSurveyTitle', $survey->title);
    }

    private $variables = [
        [
            'name' => 'Perceived Ease of Use',
            'questions' => 3,
            'max_score' => 5,
            'start_question' => 1,
            'end_question' => 3,
        ],
        [
            'name' => 'Perceived Usefulness',
            'questions' => 3,
            'max_score' => 5,
            'start_question' => 4,
            'end_question' => 6,
        ],
        [
            'name' => 'Attitude Toward Using',
            'questions' => 3,
            'max_score' => 5,
            'start_question' => 7,
            'end_question' => 9,
        ],
        [
            'name' => 'Behavioral intention to use',
            'questions' => 3,
            'max_score' => 5,
            'start_question' => 10,
            'end_question' => 12,
        ],
        [
            'name' => 'Actual System use',
            'questions' => 3,
            'max_score' => 5,
            'start_question' => 13,
            'end_question' => 15,
        ],
    ];

    private function countRespondents($surveyId, $responsesFormated)
    {
        $totalResponsesWithTAM = SurveyResponses::where('survey_id', $surveyId)
            ->where('response_data', 'LIKE', '%"sus"%')
            ->count();

        return $totalResponsesWithTAM;
    }

    private function demographicRespondents($responses)
    {
        if ($responses->isEmpty()) {
            return null;
        }

        $demographics = [
            'gender' => [],
            'profession' => [],
            'educational_background' => [],
            'age' => []
        ];

        foreach ($responses as $response) {
            foreach ($demographics as $key => $value) {
                if ($key === 'age') {
                    $age_category = $this->categorizeAge($response['birth_date']);
                    if (isset($demographics[$key][$age_category])) {
                        $demographics[$key][$age_category]++;
                    } else {
                        $demographics[$key][$age_category] = 1;
                    }
                } else {
                    if (isset($demographics[$key][$response[$key]])) {
                        $demographics[$key][$response[$key]]++;
                    } else {
                        $demographics[$key][$response[$key]] = 1;
                    }
                }
            }
        }

        return $demographics;
    }


    private function categorizeAge($birth_date)
    {
        $birth_date = Carbon::parse($birth_date);
        $age = $birth_date->age;

        if ($age < 18) {
            return '0-17';
        } elseif ($age >= 18 && $age < 25) {
            return '18-24';
        } elseif ($age >= 25 && $age < 35) {
            return '25-34';
        } elseif ($age >= 35 && $age < 45) {
            return '35-44';
        } elseif ($age >= 45 && $age < 55) {
            return '45-54';
        } elseif ($age >= 55 && $age < 65) {
            return '55-64';
        } else {
            return '65+';
        }
    }

    private function getTAMChartData($survey_id, $responsesFormated)
    {
        $tam_data = [];
        foreach ($responsesFormated as $response) {
            $responseData = json_decode($response->response_data, true)['response_data']['tam'];

            foreach ($responseData as $question => $answer) {
                if (!isset($tam_data[$question])) {
                    $tam_data[$question] = [];
                }

                $tam_data[$question][] = $answer;
            }
        }

        return response()->json($tam_data);
    }

    private function getCalculateDescriptiveStatistics($respondents, $responses)
    {
        if ($responses->isEmpty()) {
            return null;
        }

        $descriptiveStatistics = [];

        foreach ($responses as $response) {
            $responseData = json_decode($response->response_data, true);
            $maxValues = [];
            $sumValues = [];
            $formattedTamArray = [];

            foreach ($responseData['tam'] as $variable) {
                $formattedResponses = [];

                foreach ($variable['responses'] as $indicator) {
                    if (isset($indicator['value']) && is_array($indicator['value'])) {
                        foreach ($indicator['value'] as $value) {
                            $indicatorName = $value[0];
                            $indicatorValue = $value[1];
                            $formattedResponses[$indicatorName] = $indicatorValue;
                        }
                    }
                }

                $formattedTamArray[$variable['name']] = $formattedResponses;
            }

            foreach ($formattedTamArray as $variable => $responses) {
                $maxValue = count($responses) * 5;
                $sumValue = array_sum($responses);

                $maxValues[$variable] = $maxValue;
                $sumValues[$variable] = $sumValue;
            }
        }

        $descriptiveStatistics = [];
        foreach ($maxValues as $variable => $maxValue) {
            $sumValue = $sumValues[$variable];
            $p = 0;
            if ($sumValue != 0) {
                $p = ($sumValue / $maxValue) * 100;
            }

            $descriptiveStatistics[] = [
                'variable' => $variable,
                'nI' => count($formattedTamArray[$variable]),
                'sum_SK' => $maxValue,
                'sum_SH' => $sumValue,
                'P' => number_format($p, 2) . '%',
            ];
        }

        return $descriptiveStatistics;
    }

    private function getCalculateRegression($respondents, $responsesFormated)
    {
        $responseData = json_decode($responsesFormated[0]->response_data, true);
        $variablesAnswerCount = [];
        $variableValues = [];

        foreach ($responseData['tam'] as $variable) {
            $tamCount = 0;

            foreach ($variable['responses'] as $indicator) {
                if (isset($indicator['value']) && is_array($indicator['value'])) {
                    foreach ($indicator['value'] as $value) {
                        $tamCount += 1;
                    }
                }
            }
            $variablesAnswerCount[$variable['name']] = $tamCount;
        }

        foreach ($responsesFormated as $response) {
            $responseData = json_decode($response->response_data, true);
            $values = $responseData['tam'];

            foreach ($values as $value) {
                $variableName = $value['name'];
                $responseCount = 0;

                foreach ($value['responses'] as $response) {
                    foreach ($response['value'] as $value) {
                        $responseCount += $value[1];
                    }
                }

                if (!isset($variableValues[$variableName])) {
                    $variableValues[$variableName] = 0;
                }
                $variableValues[$variableName] += $responseCount;
            }

        }

        foreach ($variableValues as $key => $value) {
            $avg[$key]['valueTotal'] = $variableValues[$key];
            $avg[$key]['count'] = $variablesAnswerCount[$key];
            $avg[$key]['avg'] = $value / $variablesAnswerCount[$key];
            $avg[$key]['maxValue'] = $variablesAnswerCount[$key] * 5 * $respondents;
        }
        // dd($avg);
        if ($variableName == 'Perceived Ease of Use') {
            $PU = $variableValues;
            $avg_PU = $avg;
        } elseif ($variableName == 'Perceived Usefulness') {
            $PEU = $variableValues;
            $avg_PEU = $avg;
        } elseif ($variableName == 'Attitude Toward Using') {
            $ATU = $variableValues;
            $avg_ATU = $avg;
        } elseif ($variableName == 'Behavioral intention to use') {
            $BI = $variableValues;
            $avg_BI = $avg;
        } elseif ($variableName == 'Actual System use') {
            $ASU = $variableValues;
            $avg_ASU = $avg;
        }

        $PEU_PU = $this->calculateRegressionCoefficient($PEU, $PU, $avg_PEU, $avg_PU);
        $PEU_ATU = $this->calculateRegressionCoefficient($PEU, $ATU, $avg_PEU, $avg_ATU);
        $PU_ATU = $this->calculateRegressionCoefficient($PU, $ATU, $avg_PU, $avg_ATU);
        $PU_BI = $this->calculateRegressionCoefficient($PU, $BI, $avg_PU, $avg_BI);
        $ATU_BI = $this->calculateRegressionCoefficient($ATU, $BI, $avg_ATU, $avg_BI);
        $BI_ASU = $this->calculateRegressionCoefficient($BI, $ASU, $avg_BI, $avg_ASU);

        $regressionResults = [
            'PEU_PU' => $this->calculateRegressionResult($avg_PEU, $PEU_PU['intercept'], $PEU_PU['slope']),
            'PEU_ATU' => $this->calculateRegressionResult($avg_PEU, $PEU_ATU['intercept'], $PEU_ATU['slope']),
            'PU_ATU' => $this->calculateRegressionResult($avg_PU, $PU_ATU['intercept'], $PU_ATU['slope']),
            'PU_BI' => $this->calculateRegressionResult($avg_PU, $PU_BI['intercept'], $PU_BI['slope']),
            'ATU_BI' => $this->calculateRegressionResult($avg_ATU, $ATU_BI['intercept'], $ATU_BI['slope']),
            'BI_ASU' => $this->calculateRegressionResult($avg_BI, $BI_ASU['intercept'], $BI_ASU['slope']),
        ];

        return $regressionResults;
    }

    private function calculateRegressionCoefficient($valueX, $valueY, $avgX, $avgY)
    {
        $numerator = 0;
        $denominator = 0;

        foreach ($valueX as $key => $x) {
            $numerator += ($x - $avgX) * ($valueY[$key] - $avgY);
            $denominator += pow($x - $avgX, 2);
        }

        $slope = ($denominator != 0) ? $numerator / $denominator : 0;

        $intercept = $avgY - $slope * $avgX;
        return [
            'slope' => $slope,
            'intercept' => $intercept,
        ];
    }

    private function calculateRegressionResult($x, $intercept, $slope)
    {
        $predictedValues = $intercept + $slope * $x;

        return $predictedValues;
    }



    private function getTamResults($responsesFormated)
    {
        $tamSurveyResults = [];

        foreach ($responsesFormated as $response) {
            $responseData = json_decode($response->response_data, true)['response_data']['tam'];

            $tamSurveyResults[] = [
                'id' => $response->id,
                'respondentName' => $response->first_name . " " . $response->surname,
                'answerData' => $responseData,
            ];
        }

        return $tamSurveyResults;
    }
}
