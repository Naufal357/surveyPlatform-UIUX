<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SurveyResponses;
use App\Models\Survey;
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

        $respondents = $this->countRespondents($id, $responses);

        $respondentCount = $this->countRespondents($id, $responses);
        $getTAMChartData = $this->getTAMChartData($id, $responses);
        $tamSurveyResults = $this->getTAMResults($responses);
        $calculateDescriptiveStatistics = $this->getCalculateDescriptiveStatistics($respondents, $responses, $this->variables);
        $calculateRegression = $this->getCalculateRegression($respondents, $this->variables, $responses);

        return inertia('Account/TAM/Index', [
            'surveyTitles' => $surveyTitles,
            'survey' => $survey,
            'responses' => $responses,
            'respondentCount' => $respondentCount,
            'getTAMChartData' => $getTAMChartData,
            'calculateDescriptiveStatistics' => $calculateDescriptiveStatistics,
            'calculateRegression' => $calculateRegression,
            'tamSurveyResults' => $tamSurveyResults,
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

    private function countRespondents($surveyId, $responses)
    {
        $totalResponsesWithTAM = collect($responses)->filter(function ($response) {
            return isset(json_decode($response->response_data)->tam);
        })->count();

        return $totalResponsesWithTAM;
    }

    private function getTAMChartData($survey_id, $responses)
    {
        $tam_data = [];

        foreach ($responses as $response) {
            $responseData = json_decode($response->response_data, true)['tam'];

            foreach ($responseData as $question => $answer) {
                if (!isset($tam_data[$question])) {
                    $tam_data[$question] = [];
                }

                $tam_data[$question][] = $answer;
            }
        }

        return response()->json($tam_data);
    }

    private function getCalculateDescriptiveStatistics($respondents, $responses, $variables)
    {
        $descriptiveStatistics = [];

        foreach ($variables as $variable) {
            $sum_sh = 0;

            foreach ($responses as $response) {
                $responseData = json_decode($response->response_data, true);
                if (isset($responseData['tam'])) {
                    for ($i = $variable['start_question']; $i <= $variable['end_question']; $i++) {
                        $questionKey = 'tam' . $i;
                        if (isset($responseData['tam'][$questionKey])) {
                            $sum_sh += $responseData['tam'][$questionKey];
                        }
                    }
                }
            }

            $sum_sk = $variable['questions'] * $variable['max_score'] * $respondents;
            $p = 0;

            if ($sum_sk != 0) {
                $p = ($sum_sh / $sum_sk) * 100;
            }

            $descriptiveStatistics[] = [
                'variable' => $variable['name'],
                'nI' => $variable['questions'],
                'sum_SK' => $sum_sk,
                'sum_SH' => $sum_sh,
                'P' => number_format($p, 2) . '%',
            ];
        }
        return $descriptiveStatistics;
    }

    private function getCalculateRegression($respondents, $variables, $responses)
    {
        $PU = [];
        $PEU = [];
        $ATU = [];
        $BI = [];
        $ASU = [];

        $avg_PU = 0;
        $avg_PEU = 0;
        $avg_ATU = 0;
        $avg_BI = 0;
        $avg_ASU = 0;

        foreach ($variables as $variable) {
            $variableName = $variable['name'];
            $startQuestion = $variable['start_question'];
            $endQuestion = $variable['end_question'];

            $variableValues = [];

            foreach ($responses as $response) {
                $responseData = json_decode($response->response_data, true);
                $values = array_values(array_slice($responseData['tam'], $startQuestion - 1, $endQuestion - $startQuestion + 1));
                $variableValues[] = array_sum($values);
            }

            $avg = array_sum($variableValues) / count($variableValues);

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
            echo $variableName . ': ' . $avg . '<br>';
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

        $slope = $numerator / $denominator;
        $intercept = $avgY - $slope * $avgX;

        return [
            'slope' => $slope,
            'intercept' => $intercept,
        ];
    }

    private function calculateRegressionResult($x, $intercept, $slope)
    {
        echo $intercept . ' + ' . $slope . ' * ' . $x . ' = ' . ($intercept + $slope * $x) . '<br>';
        $predictedValues = $intercept + $slope * $x;

        return $predictedValues;
    }



    private function getTamResults($responses)
    {
        $tamSurveyResults = [];

        foreach ($responses as $response) {
            $responseData = json_decode($response->response_data, true)['tam'];

            $tamSurveyResults[] = [
                'id' => $response->id,
                'respondentName' => $response->first_name . " " . $response->surname,
                'answerData' => $responseData,
            ];
        }

        return $tamSurveyResults;
    }
}
