<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Survey;

class SurveyController extends Controller
{
    public function index()
    {
        $surveys = Survey::latest()->where('status', 'Public')->paginate(12);

        return inertia('Web/Surveys', [
            'auth' => auth()->user(),
            'surveys' => $surveys
        ]);
    }
}
