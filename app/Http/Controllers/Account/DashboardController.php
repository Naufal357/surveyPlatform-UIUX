<?php

namespace App\Http\Controllers\Account;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Survey;
use App\Models\SurveyHasMethods;
use Database\Seeders\SurveyHasMethodsSeeder;
use Psy\Readline\Hoa\Console;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        if ($user->hasPermissionTo('dashboard.index.full')) {
            $surveys = Survey::latest()->paginate(8);
        } else {
            $surveys = Survey::where('user_id', $user->id)->latest()->paginate(8);
        }

        $surveyData = [];

        foreach ($surveys as $survey) {
            $surveyMethods = SurveyHasMethods::where('survey_id', $survey->id)->get();

            $methodIds = $surveyMethods->pluck('method_id')->toArray();

            $surveyData[] = [
                'survey_id' => $survey->id,
                'title' => $survey->title,
                'response_count' => $survey->getTitleAndResponseCount(),
                'method_ids' => $methodIds,
            ];
        }

        return inertia('Account/Dashboard', [
            'surveys' => $surveys,
            'surveyData' => $surveyData,
        ])->with('currentSurveyTitle');
    }
}
