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
        $user = auth()->user();

        $surveyTitles = Survey::where('user_id', $user->id)->get(['id', 'title']);
        if ($surveyTitles->isEmpty()) {
            return redirect()->route('account.surveys.create');
        }

        $sortedSurveyTitles = $surveyTitles->sortBy('id');
        $lowestTitleId = $sortedSurveyTitles->first()->id;

        return redirect()->route('account.dashboard', ['id' => $lowestTitleId]);
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

        $averageSatisfaction = $this->calculateAverageSatisfaction($responses);
        $averageSUS = $this->calculateAverageSUS($responses);
        $susSurveyResults = $this->getSUSResults($responses);
        $getSUSChartData = $this->getSUSChartData($id);


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
            'getSUSChartData' => $getSUSChartData,
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
    
            $susSurveyResults[] = [
                'id' => $response->id,
                'respondentName' => $response->first_name . " " . $response->last_name,
                'susScore' => $this->calculateSUS($responseData),
                'answerData' => $responseData,
            ];
        }
    
        return $susSurveyResults;
    }

    private function getSUSChartData($survey_id)
    {
        // Ambil semua respons berdasarkan $survey_id
        $responses = SurveyResponses::where('survey_id', $survey_id)->get();

        // Inisialisasi array kosong untuk setiap pertanyaan (sus1, sus2, dst)
        $suspensions = [];

        // Loop melalui setiap respons
        foreach ($responses as $response) {
            // Decode response_data dari JSON ke dalam array asosiatif
            $responseData = json_decode($response->response_data, true);

            // Loop melalui setiap pertanyaan (sus1, sus2, dst)
            foreach ($responseData as $question => $answer) {
                // Jika pertanyaan belum ada dalam array $suspensions, inisialisasikan dengan array kosong
                if (!isset($suspensions[$question])) {
                    $suspensions[$question] = [];
                }

                // Tambahkan nilai jawaban ke array yang sesuai
                $suspensions[$question][] = $answer;
            }
        }

        // Kembalikan hasil dalam format JSON tanpa headers tambahan
        return response()->json($suspensions);
    }

}