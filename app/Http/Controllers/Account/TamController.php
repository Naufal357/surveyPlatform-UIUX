<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SurveyResponses;
use App\Models\Survey;
use Inertia\Inertia;

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

        return Inertia('Account/TAM/Index');

        // return redirect()->route('account.tam', ['id' => $lowestTitleId]);
    }


}
