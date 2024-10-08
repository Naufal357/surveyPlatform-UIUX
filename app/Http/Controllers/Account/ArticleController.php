<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Articles;

class ArticleController extends Controller
{
    public function index()
    {
        if (auth()->user()->hasPermissionTo('articles.index.full')) {
            $articles = Articles::when(request()->q, function ($articles) {
                $articles = $articles->where('title', 'like', '%' . request()->q . '%');
            })->orderBy('id')->paginate(8);

            $articles->load('user');
        } else {
            $articles = Articles::when(request()->q, function ($articles) {
                $articles = $articles->where('title', 'like', '%' . request()->q . '%');
            })
                ->where('user_id', auth()->user()->id)
                ->latest()
                ->paginate(10);
        }

        $articles->appends(['q' => request()->q]);

        return inertia('Account/Articles/Articles', [
            'articles' => $articles,
            'app_url' => config('app.url')
        ]);
    }

    public function create()
    {
        $user = auth()->user();
        return inertia('Account/Articles/Create', [
            'user' => $user
        ]);
    }

    public function store(Request $request)
    {
        if ($request->image != null) {
            $this->validate($request, [
                'user_id' => 'required',
                'title' => 'required',
                'content' => 'required',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'status' => 'required'
            ]);

            $image = $request->file('image');
            $image->storeAs('public/image/articles/', $image->hashName());

            Articles::create([
                'user_id' => $request->user_id,
                'title' => $request->title,
                'slug' => Str::slug($request->title, '-'),
                'content' => $request->content,
                'image' => $image->hashName(),
                'status' => $request->status
            ]);
        } else {
            $this->validate($request, [
                'user_id' => 'required',
                'title' => 'required',
                'content' => 'required',
                'status' => 'required'
            ]);
            Articles::create([
                'user_id' => $request->user_id,
                'title' => $request->title,
                'slug' => Str::slug($request->title, '-'),
                'content' => $request->content,
                'image' => 'articleFactory.png',
                'status' => $request->status
            ]);
        }

        return redirect()->route('account.articles.index');
    }

    public function edit($id)
    {
        $user = auth()->user();
        $article = Articles::find($id);
        return inertia('Account/Articles/Edit', [
            'user' => $user,
            'article' => $article
        ]);
    }

    public function update(Request $request, Articles $article)
    {
        if ($request->image == null) {
            $request->validate([
                'title' => 'required',
                'content' => 'required',
                'status' => 'required'
            ]);
        } else {
            $request->validate([
                'title' => 'required',
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'content' => 'required',
                'status' => 'required'
            ]);
        }

        if ($request->file('image')) {

            if (!Str::contains($article->image, 'articleFactory.png')) {
                Storage::disk('local')->delete('public/image/articles/' . basename($article->image));
            }

            $image = $request->file('image');
            $image->storeAs('public/image/articles/', $image->hashName());

            $article->update([
                'title' => $request->title,
                'slug' => Str::slug($request->title, '-'),
                'content' => $request->content,
                'status' => $request->status,
                'image' => $image->hashName(),
            ]);
        } else {
            $article->update([
                'title' => $request->title,
                'slug' => Str::slug($request->title, '-'),
                'content' => $request->content,
                'status' => $request->status,
                'image' => 'articleFactory.png',
            ]);
        }

        return redirect()->route('account.articles.index');
    }

    public function destroy($id)
    {
        $article = Articles::find($id);

        if (!Str::contains($article->image, 'articleFactory.png')) {
            Storage::disk('local')->delete('public/image/articles/' . basename($article->image));
        }

        $article->delete();
        return redirect()->route('account.articles.index');
    }
}
