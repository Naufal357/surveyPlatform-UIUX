<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Articles;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Articles::latest()->where('status', 'Public')->paginate(12);

        return inertia('Web/Articles/Index', [
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
            'auth' => auth()->user(),
            'article' => $article
        ]);
    }
}
