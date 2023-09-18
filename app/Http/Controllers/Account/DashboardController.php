<?php

namespace App\Http\Controllers\Account;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\SurveyResponses;
use App\Models\Survey;

class DashboardController extends Controller
{
    public function index0(Request $request)
    {
        $surveyTitles = Survey::where('user_id', auth()->user()->id)->get(['id', 'title']);

        if ($surveyTitles->isEmpty()) {
            return redirect()->route('account.surveys.create');
        }

        return inertia('Account/Index', [
            'auth' => auth()->user(),
            'surveyTitles' => $surveyTitles,
        ]);
    }

    public function index(Request $request, $id)
    {
        $survey = Survey::find($id);
        if ($survey->user_id !== auth()->user()->id) {
        return abort(403, 'Unauthorized');
        }

        $surveyTitles = Survey::where('user_id', auth()->user()->id)->get(['id', 'title']);
        $responses = SurveyResponses::where('survey_id', $id)->get();
        $respondentCount = $this->countRespondents($id);

        // Menghitung Kepuasan Rata-rata
        $averageSatisfaction = $this->calculateAverageSatisfaction($responses);

        // Menghitung Skor SUS Rata-rata
        $averageSUS = $this->calculateAverageSUS($responses);

        // Mengambil data hasil survey SUS
        $susSurveyResults = $this->getSUSResults($responses);

        // Mengembalikan tampilan
        return inertia('Account/Index', [
            'surveyTitles' => $surveyTitles,
            'auth' => auth()->user(),
            'survey' => $survey,
            'responses' => $responses,
            'respondentCount' => $respondentCount,
            'averageSatisfaction' => $averageSatisfaction,
            'averageSUS' => $averageSUS,
            'susSurveyResults' => $susSurveyResults,
        ])->with('currentSurveyTitle', $survey->title);
    }

    private function countRespondents($surveyId)
    {
        // Mengambil jumlah responden berdasarkan survei_id
        return SurveyResponses::where('survey_id', $surveyId)->count();
    }

    private function calculateAverageSatisfaction($responses)
    {
        $totalSatisfaction = 0;
        $count = count($responses);

        // Menghitung total kepuasan dari semua respons
        foreach ($responses as $response) {
            $responseData = json_decode($response->response_data, true);
            $totalSatisfaction += array_sum($responseData);
        }
        // Menghitung Kepuasan Rata-rata
        if ($count > 0) {
            $averageSatisfaction = $totalSatisfaction / ($count * 10); // Kepuasan dalam skala 1-5
            return $averageSatisfaction = number_format($averageSatisfaction, 2); // Format menjadi 2 angka dibelakang koma
        } else {
            return $averageSatisfaction = 0;
        }

    }

    private function calculateAverageSUS($responses)
    {
        $totalSUS = 0;
        $count = count($responses);

        // Menghitung total skor SUS dari semua respons
        foreach ($responses as $response) {
            $responseData = json_decode($response->response_data, true);
            $totalSUS += $this->calculateSUS($responseData);
        }
        // Menghitung Skor SUS Rata-rata
        if ($count > 0) {
            $averageSUS = $totalSUS / $count;
            return $averageSUS = number_format($averageSUS, 2); // Format menjadi 2 angka dibelakang koma
        } else {
            return $averageSUS = 0;
        }
    }

    private function calculateSUS($responseData)
    {
        // Menghitung Skor SUS dari respons
        $susScore = 0;
        $susScore += 5 - $responseData['sus1'];
        $susScore += 5 - $responseData['sus2'];
        $susScore += $responseData['sus3'];
        $susScore += $responseData['sus4'];
        $susScore += 5 - $responseData['sus5'];
        $susScore += $responseData['sus6'];
        $susScore += 5 - $responseData['sus7'];
        $susScore += $responseData['sus8'];
        $susScore += $responseData['sus9'];
        $susScore += $responseData['sus10'];

        return $susScore * 2.5; // Mengubah skala SUS menjadi 0-100
    }

        private function getSUSResults($responses)
    {
        $susSurveyResults = [];

        foreach ($responses as $response) {
            $responseData = json_decode($response->response_data, true);

            // Sesuaikan dengan struktur data yang ada di database
            $result = [
                'id' => $response->id,
                'respondentName' => $response->respondent_name, // Ganti dengan nama kolom yang sesuai
                'susScore' => $this->calculateSUS($responseData), // Menghitung skor SUS
            ];

            $susSurveyResults[] = $result;
        }

        return $susSurveyResults;
    }
}