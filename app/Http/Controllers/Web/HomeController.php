<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\Category;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function __invoke(Request $request)
    {
        $categories = Category::latest()->take(4)->get();

        $surveys = Survey::latest()->where('status', 'Public')->take(12)->get();

        return inertia('Web/Home', [
            'categories'    => $categories,
            'surveys'       => $surveys,
            'auth' => auth()->user(),
        ]);
    }
}
