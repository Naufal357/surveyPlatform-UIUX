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
        })->latest()->paginate(10);

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
        if($request->image != null){
            $this->validate($request, [
                'name'          => 'required|unique:categories',
                'image'         => 'image|mimes:jpeg,png,jpg,gif,svg',
            ]);
        } else {
            $this->validate($request, [
                'name'          => 'required|unique:categories',
            ]);
        }
       
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image->storeAs('public/image/categories/', $image->hashName());

            Category::create([
                'name'          => $request->name,
                'image'         => $image->hashName(),
                'slug'          => Str::slug($request->name, '-')
            ]);
        } else {
            Category::create([
                'name'          => $request->name,
                'image'         => 'image.png',
                'slug'          => Str::slug($request->name, '-')
            ]);
        }

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
        if($request->image != null){
            $this->validate($request, [
                'name'          => 'required|unique:categories,name,' . $category->id,
                'image'         => 'image|mimes:jpeg,png,jpg,gif,svg',
            ]);
        } else {
            $this->validate($request, [
                'name'          => 'required|unique:categories,name,' . $category->id,
            ]);
        }
        

        if ($request->hasFile('image')) {
            Storage::disk('local')->delete('public/image/categories/' . basename($category->image));

            $image = $request->file('image');
            $image->storeAs('public/image/categories/', $image->hashName());

            $category->update([
                'name'          => $request->name,
                'image'         => $image->hashName(),
                'slug'          => Str::slug($request->name, '-')
            ]);
        } else {
            $category->update([
                'name'          => $request->name,
                'slug'          => Str::slug($request->name, '-')
            ]);
        }
        return redirect()->route('account.categories.index');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        if ($category->image != 'image.png') {
            Storage::disk('local')->delete('public/image/categories/' . basename($category->image));
        }
        $category->delete();

        return redirect()->route('account.categories.index');
    }
}
