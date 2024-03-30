<?php

namespace App\Http\Controllers\Web;
use App\Models\Category;
use App\Models\SurveyHasCategories;
use App\Models\Survey;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::latest()->paginate(16);
        

        return inertia('Web/Categories/Index', [
            'categories' => $categories,
            'auth' => auth()->user(),
        ]);
    }

    public function show($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();
        $categoryId = $category->id;
        $surveyIds = SurveyHasCategories::where('category_id', $categoryId)->pluck('survey_id');
        $surveys = Survey::whereIn('id', $surveyIds)->where('status', 'Public')->get();

        return inertia('Web/Categories/Show', [
            'category' => $category,
            'surveys' => $surveys,
            'auth' => auth()->user(),
        ]);
    }
}
