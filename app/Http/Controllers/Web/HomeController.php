<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\Category;
use App\Models\Articles;
use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\Controller;
use App\Models\UserSelectCategory;
use App\Models\User;

class HomeController extends Controller
{
    public function __invoke(Request $request)
    {
        if (Cookie::has('remember_token')) {
            $user = User::where('remember_token', Cookie::get('remember_token'))->first();
            if ($user) {
                auth()->login($user);
            }
        }

        $user = auth()->user();
        $categories = Category::latest()->take(4)->get();
        $articles = Articles::latest()->where('status', 'Public')->take(9)->get();

        if ($user) {
            $userSelectedCategories = UserSelectCategory::where('user_id', $user->id)->pluck('category_id');
            $surveys = Survey::whereHas('categories', function ($query) use ($userSelectedCategories) {
                $query->whereIn('category_id', $userSelectedCategories);
            })
                ->where('status', 'Public')
                ->latest()
                ->take(9)
                ->get();
            if ($surveys->count() < 9) {
                $additionalSurveys = Survey::whereNotIn('id', $surveys->pluck('id')->toArray())
                    ->where('status', 'Public')
                    ->inRandomOrder()
                    ->take(9 - $surveys->count())
                    ->get();

                $surveys = $surveys->merge($additionalSurveys);
            }
        } else {
            $surveys = Survey::where('status', 'Public')->latest()->take(9)->get();
        }
        
        return inertia('Web/Home', [
            'categories' => $categories,
            'surveys' => $surveys,
            'articles' => $articles,
            'auth' => $user,
        ]);
    }
}
