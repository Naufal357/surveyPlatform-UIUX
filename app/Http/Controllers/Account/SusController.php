<?php

namespace App\Http\Controllers\Account;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ResponsesSUSExport;
use App\Models\SurveyResponses;
use App\Models\Survey;
use App\Models\SurveyQuestions;

class SusController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        $surveyTitles = Survey::where('user_id', $user->id)
            ->whereHas('methods', function ($query) {
                $query->where('method_id', 1);
            })
            ->get(['surveys.id', 'surveys.title']);

        if ($surveyTitles->isEmpty()) {
            return redirect()->route('account.surveys.create');
        }

        $sortedSurveyTitles = $surveyTitles->sortBy('id');
        $lowestTitleId = $sortedSurveyTitles->first()->id;

        return redirect()->route('account.sus.id', ['id' => $lowestTitleId]);
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
                $query->where('method_id', 1);
            })
            ->get(['surveys.id', 'surveys.title']);

        $susQuestions = SurveyQuestions::where('survey_id', $id)->get();

        $responses = SurveyResponses::where('survey_id', $id)
            ->where('response_data', 'LIKE', '%"sus"%')
            ->get();

        $respondentCount = $this->countRespondents($id);
        $averageSUS = $this->calculateAverageSUS($responses);
        $classifySUSGrade = $this->classifySUSGrade($averageSUS);
        $susSurveyResults = $this->getSUSResults($responses);
        $getSUSChartData = $this->getSUSChartData($id, $responses);


        return inertia('Account/SUS/Index', [
            'surveyTitles' => $surveyTitles,
            'survey' => $survey,
            'responses' => $responses,
            'respondentCount' => $respondentCount,
            'averageSUS' => $averageSUS,
            'classifySUSGrade' => $classifySUSGrade,
            'getSUSChartData' => $getSUSChartData,
            'susSurveyResults' => $susSurveyResults,
            'susQuestions' => $susQuestions
        ])->with('currentSurveyTitle', $survey->title);
    }

    private function countRespondents($surveyId)
    {
        // Menghitung jumlah responden dengan "sus" dalam response_data
        $totalResponsesWithSUS = SurveyResponses::where('survey_id', $surveyId)
            ->where('response_data', 'LIKE', '%"sus"%')
            ->count();

        return $totalResponsesWithSUS;
    }

    private function calculateAverageSUS($responses)
    {

        $totalSUS = 0;
        $count = count($responses);

        // Menghitung total skor SUS dari semua respons
        foreach ($responses as $response) {
            $responseData = json_decode($response->response_data, true)['sus'];
            $totalSUS += $this->calculateSUS($responseData);
        }
        // Menghitung Skor SUS Rata-rata
        if ($count > 0) {
            $averageSUS = $totalSUS / $count;
            return $averageSUS = number_format($averageSUS, 2);
        } else {
            return $averageSUS = 0;
        }
    }

    private function classifySUSGrade($averageSUS)
    {
        if ($averageSUS >= 90) {
            return 'A';
        } elseif ($averageSUS >= 80) {
            return 'B';
        } elseif ($averageSUS >= 70) {
            return 'C';
        } elseif ($averageSUS >= 60) {
            return 'D';
        } else {
            return 'F';
        }
    }

    private function calculateSUS($responseData)
    {
        // Menghitung Skor SUS dari respons
        $susScore = 0;
        $susScore += $responseData['sus1'] - 1;
        $susScore += 5 - $responseData['sus2'];
        $susScore += $responseData['sus3'] - 1;
        $susScore += 5 - $responseData['sus4'];
        $susScore += $responseData['sus5'] - 1;
        $susScore += 5 - $responseData['sus6'];
        $susScore += $responseData['sus7'] - 1;
        $susScore += 5 - $responseData['sus8'];
        $susScore += $responseData['sus9'] - 1;
        $susScore += 5 - $responseData['sus10'];

        return $susScore * 2.5; // Mengubah skala SUS menjadi 0-100
    }

    private function getSUSChartData($survey_id, $responses)
    {
        // Inisialisasi array kosong untuk setiap pertanyaan (sus1, sus2, dst)
        $sus_data = [];

        // Loop melalui setiap respons
        foreach ($responses as $response) {
            // Decode response_data dari JSON ke dalam array asosiatif
            $responseData = json_decode($response->response_data, true)['sus'];

            // Loop melalui setiap pertanyaan (sus1, sus2, dst)
            foreach ($responseData as $question => $answer) {
                // Jika pertanyaan belum ada dalam array $sus_data, inisialisasikan dengan array kosong
                if (!isset($sus_data[$question])) {
                    $sus_data[$question] = [];
                }

                // Tambahkan nilai jawaban ke array yang sesuai
                $sus_data[$question][] = $answer;
            }
        }

        // Kembalikan hasil dalam format JSON tanpa headers tambahan
        return response()->json($sus_data);
    }

    private function getSUSResults($responses)
    {
        $susSurveyResults = [];

        foreach ($responses as $response) {
            $responseData = json_decode($response->response_data, true)['sus'];

            $susSurveyResults[] = [
                'id' => $response->id,
                'respondentName' => $response->first_name . " " . $response->surname,
                'susScore' => $this->calculateSUS($responseData),
                'answerData' => $responseData,
            ];
        }

        return $susSurveyResults;
    }

    public function export($survey_id)
    {
        return Excel::download(new ResponsesSUSExport($survey_id), 'SurveyResponses.xlsx');
    }
}
