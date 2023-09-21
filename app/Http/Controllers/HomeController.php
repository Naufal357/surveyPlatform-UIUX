<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
uSE App\Models\Survey;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function index(){
        $surveys = Survey::when(request()->q, function ($surveys) {
            $surveys = $surveys->where('title', 'like', '%' . request()->q . '%');
        })
        ->where('user_id', auth()->user()->id)
        ->latest()
        ->paginate(20);

        // tambahkan query string ke tautan halaman paginasi
        $surveys->appends(['q' => request()->q]);

        return inertia('Home', [
            'surveys' => $surveys,
        ]);
    }
}
