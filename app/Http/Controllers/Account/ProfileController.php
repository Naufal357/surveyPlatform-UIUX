<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\UserSelectCategory;

class ProfileController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $userPrefs = UserSelectCategory::where('user_id', auth()->user()->id)->get();
        
        return inertia('Account/Profile', [
            'user' => auth()->user(),
            'categories' => $categories,
            'userPrefs' => $userPrefs
        ]);
    }
}
