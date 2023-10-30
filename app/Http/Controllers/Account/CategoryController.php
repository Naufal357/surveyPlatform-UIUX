<?php

namespace App\Http\Controllers\Account;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::when(request()->q, function ($categories) {
            $categories = $categories->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(15);

        $categories->appends(['q' => request()->q]);

        return inertia('Account/Categories/Categories', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return inertia('Account/Categories/Create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'          => 'required|unique:categories',
        ]);

        Category::create([
            'name'          => $request->name,
            'slug'          => Str::slug($request->name, '-')
        ]);

        return redirect()->route('account.categories.index');
    }

    public function edit(Category $category)
    {
        return inertia('Account/Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $this->validate($request, [
            'name'          => 'required|unique:categories,name,' . $category->id,
        ]);

        $category->update([
            'name'          => $request->name,
            'slug'          => Str::slug($request->name, '-')
        ]);

        return redirect()->route('account.categories.index');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        $category->delete();

        return redirect()->route('account.categories.index');
    }
}
