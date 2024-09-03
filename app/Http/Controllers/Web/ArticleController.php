<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Articles;
use App\Models\User;

class ArticleController extends Controller
{
    public function index()
    {
        $auth = auth()->user();
        $articles = Articles::latest()->where('status', 'Public')->paginate(8);

        return inertia('Web/Articles/Index', [
            'auth' => $auth,
            'articles' => $articles
        ]);
    }

    public function show($id, $slug, Articles $articles)
    {
        $user = auth()->user();
        $article = $articles::where('id', $id)->where('slug', $slug)->firstOrFail();

        $article->load('user');
        if ($article->status == 'Private' && $article->user_id !== $user->id) {
            abort(403, 'This survey is not available.');
        };

        return inertia('Web/Articles/Show', [
            'auth' => $user,
            'article' => $article
        ]);
    }
}
