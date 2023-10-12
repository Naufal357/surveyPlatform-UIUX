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
        return inertia('Account/Index')->with('currentSurveyTitle');
    }
}