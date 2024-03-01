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

        $respondentCount = $this->countRespondents($id, $responses);
        $getTAMChartData = $this->getTAMChartData($id, $responses);
        $tamSurveyResults = $this->getTAMResults($id, $responses);
        $calculateDescriptiveStatistics = $this->getCalculateDescriptiveStatistics($id, $responses, $this->variables);
        $calculateRegression = $this->calculateRegression($id, $responses);
dd($calculateRegression);
        return inertia('Account/TAM/Index', [
            'surveyTitles' => $surveyTitles,
            'survey' => $survey,
            'responses' => $responses,
            'respondentCount' => $respondentCount,
            'test' => $responses,
            'getTAMChartData' => $getTAMChartData,
            'calculateDescriptiveStatistics' => $calculateDescriptiveStatistics,
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

    private function getCalculateDescriptiveStatistics($surveyId, $responses, $variables)
    {
        $respondents = $this->countRespondents($surveyId, $responses);

        $descriptiveStatistics = [];

        foreach ($variables as $variable) {
            $total_responses = 0;

            foreach ($responses as $response) {
                $responseData = json_decode($response->response_data, true);
                if (isset($responseData['tam'])) {
                    for ($i = $variable['start_question']; $i <= $variable['end_question']; $i++) {
                        $questionKey = 'tam' . $i;
                        if (isset($responseData['tam'][$questionKey])) {
                            $total_responses += $responseData['tam'][$questionKey];
                        }
                    }
                }
            }

            $sum_sk = $variable['questions'] * $variable['max_score'] * $respondents;
            $p = 0;

            if ($sum_sk != 0) {
                $p = ($total_responses / $sum_sk) * 100;
            }

            $descriptiveStatistics[] = [
                'variable' => $variable['name'],
                'nI' => $variable['questions'],
                'sum_SK' => $sum_sk,
                'sum_SH' => $total_responses,
                'P' => number_format($p, 2) . '%',
            ];
        }
        return $descriptiveStatistics;
    }

    private function calculateRegression($surveyId, $responses)
    {
        $regressionResults = []; // Inisialisasi array untuk menyimpan hasil regresi

        $variables = [
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

        foreach ($variables as $variable) {
            $regressionValues = []; // Inisialisasi array untuk menyimpan nilai regresi untuk setiap variabel

            foreach ($responses as $response) {
                echo $variable['name'] . '<br>';
                $responseData = json_decode($response->response_data, true);
                $total_responses = 0;

                for ($i = $variable['start_question']; $i <= $variable['end_question']; $i++) {
                    $questionKey = 'tam' . $i;
                    if (isset($responseData['tam'][$questionKey])) {
                        $total_responses += $responseData['tam'][$questionKey];
                        echo $responseData['tam'][$questionKey] . '<br>';
                    }
                }
                echo $total_responses . '<br>';

                $sum_sk = $variable['questions'] * $variable['max_score'];
                $value = 0;

                // Menghitung nilai regresi jika sum_sk tidak sama dengan 0
                if ($sum_sk != 0) {
                    $value = ($total_responses / $sum_sk) * 100;
                    echo 'value : ' . $value . '<br>';
                }

                // Menyimpan nilai regresi dalam array regressionValues
                $regressionValues[$variable['name']] = number_format($value, 2) . '%';
                echo $regressionValues[$variable['name']] . '<br>'. '<br>';
            }

            $regressionResults[] = $regressionValues; // Tambahkan nilai regresi untuk variabel ke dalam array hasil
        }

        return $regressionResults; // Mengembalikan hasil regresi
    }

    private function getTamResults($id, $responses)
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
