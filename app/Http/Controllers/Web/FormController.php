<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Survey;
use App\Models\SurveyResponses;

class FormController extends Controller
{
    public function index()
    {
        return inertia('Web/Form', [
            'auth' => auth()->user(),
        ]);
    }

    public function show($id)
    {
        $surveys = Survey::findOrFail($id);

        return inertia('Web/Form', [
            'surveys' => $surveys,
            'auth' => auth()->user(),
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

        $responseData = [
            'sus1' => $request->input('sus1'),
            'sus2' => $request->input('sus2'),
            'sus3' => $request->input('sus3'),
            'sus4' => $request->input('sus4'),
            'sus5' => $request->input('sus5'),
            'sus6' => $request->input('sus6'),
            'sus7' => $request->input('sus7'),
            'sus8' => $request->input('sus8'),
            'sus9' => $request->input('sus9'),
            'sus10' => $request->input('sus10'),
        ];


        $surveyResponse = SurveyResponses::create($validatedData);

        return redirect('/')->with('status', 'Pengisian Survey Berhasil!');
    }
}