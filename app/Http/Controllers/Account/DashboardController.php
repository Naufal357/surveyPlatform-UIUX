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
    public function index(Request $request)
    {
        if (auth()->user()->hasPermissionTo('dashboard.index.full')) {
            $surveys = Survey::all();
            $surveyData = [];

            foreach ($surveys as $survey) {
                $surveyData[] = $survey->getTitleAndResponseCount();
            }
        } else {
            $user = auth()->user();
            $surveys = Survey::where('user_id', $user->id)->get();
            $surveyData = [];

            foreach ($surveys as $survey) {
                $surveyData[] = $survey->getTitleAndResponseCount();
            }
        }

        return inertia('Account/Dashboard', [
            'surveys' => $surveyData,
        ])->with('currentSurveyTitle');
    }
}
