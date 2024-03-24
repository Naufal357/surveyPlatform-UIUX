<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Survey;
use App\Models\SurveyResponses;
use App\Models\SurveyHasMethods;
use App\Models\SurveyQuestions;

class FormController extends Controller
{
    public function index()
    {
        $surveys = Survey::latest()->paginate(12);

        return inertia('Web/Surveys', [
            'auth' => auth()->user(),
            'surveys' => $surveys
        ]);
    }

    public function show($id, $slug)
    {
        $survey = Survey::where('id', $id)->where('slug', $slug)->firstOrFail();        
        $userEmail = auth()->user()->email;
        $response = SurveyResponses::where('email', $userEmail)->where('survey_id', $survey->id)->first();
        $surveyMethods = SurveyHasMethods::where('survey_id', $survey->id)->get();
        $surveyQuestions = SurveyQuestions::where('survey_id', $survey->id)->get();

        if ($response) {
            abort(403, 'You have already submitted this survey and cannot participate again.');
        }

        return inertia('Web/Form', [
            'surveys' => $survey,
            'auth' => auth()->user(),
            'surveyMethods' => $surveyMethods,
            'surveyQuestions' => $surveyQuestions
        ]);
    }



    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'survey_id'             => 'required|exists:surveys,id',
            'first_name'             => 'required',
            'surname'              => 'required',
            'email'                 => 'required|email',
            'birth_date'                   => 'required|date',
            'gender'                => 'required',
            'profession'            => 'required',
            'educational_background' => 'required',
            'response_data'        => 'required|json',
        ]);

        $userId = auth()->user()->id;

        $survey = Survey::find($validatedData['survey_id']);
        $surveyUserId = $survey->user_id;

        if ($userId === $surveyUserId) {
            abort(403, 'Survey authors cannot submit their own surveys.');
        }

        $responseData = json_decode($validatedData['response_data'], true);

        $surveyResponse = SurveyResponses::create($validatedData);

        return redirect('/')->with('status', 'Pengisian Survey Berhasil!');
    }
}
