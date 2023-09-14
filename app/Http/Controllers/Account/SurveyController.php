<?php

namespace App\Http\Controllers\Account;

use App\Models\Survey;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class SurveyController extends Controller
{
    public function index()
    {
        // dapatkan survei
        $surveys = Survey::when(request()->q, function($surveys){
            $surveys = $surveys->where('title', 'like', '%' . request()->q . '%');
        })
        ->where('user_id', auth()->user()->id)
        ->latest()
        ->paginate(10);

        // tambahkan query string ke tautan halaman paginasi
        $surveys->appends(['q' => request()->q]);

        // kembalikan inertia
        return inertia('Account/Surveys/Survey', [
            'surveys' => $surveys,
            'auth' => auth()->user(),
        ]);
    }


    public function create()
    {
        return inertia('Account/Surveys/Create', [
            'auth' => auth()->user(),
        ]);
    }


    public function store(Request $request)
    {
        /**
         * validate
         */
        $this->validate($request, [
            'user_id'        => 'required',
            'title'          => 'required|unique:surveys',
            'image'         => 'required|image|mimes:jpeg,jpg,png|max:2000',
            'theme'          => 'required',
            'description'    => 'required',
            'embed_design'   => 'required',
            'embed_prototype'   => 'required',
        ]);

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/surveys', $image->hashName());

        //create Survey
        Survey::create([
            'user_id'        => $request->user_id,
            'title'          => $request->title,
            'image'         => $image->hashName(),
            'theme'          => $request->theme,
            'description'    => $request->description,
            'embed_design'   => $request->embed_design,
            'embed_prototype'   => $request->embed_prototype,
            'slug'          => Str::slug($request->title, '-'),
        ]);

        //redirect
        return redirect()->route('account.surveys.index');
    }


    public function edit(Survey $survey)
    {
        return inertia('Account/Surveys/Edit', [
            'survey' => $survey,
            'auth' => auth()->user(),
        ]);
    }


    public function update(Request $request, Survey $Survey)
    {
        /**
         * validate
         */
        $this->validate($request, [
            'user_id'        => 'required',
            'title'          => 'required|unique:surveys',
            'theme'          => 'required',
            'description'    => 'required',
            'embed_design'   => 'required',
            'embed_prototype'   => 'required',
        ]);

        //check image update
        if ($request->file('image')) {

            //remove old image
            Storage::disk('local')->delete('public/surveys/' . basename($Survey->image));

            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/surveys', $image->hashName());

            //update Survey with new image
            $Survey->update([
                'image' => $image->hashName(),
                'name' => $request->name,
                'slug'          => Str::slug($request->name, '-')
            ]);
        }

        //update Survey without image
        $Survey->update([
            'title'          => $request->title,
            'theme'          => $request->theme,
            'description'    => $request->description,
            'embed_design'   => $request->embed_design,
            'embed_prototype' => $request->embed_prototype,
            'slug'          => Str::slug($request->title, '-')
        ]);

        //redirect
        return redirect()->route('account.surveys.index');
    }


    public function destroy($id)
    {
        //find by ID
        $Survey = Survey::findOrFail($id);

        //remove image
        Storage::disk('local')->delete('public/surveys/' . basename($Survey->image));

        //delete
        $Survey->delete();

        //redirect
        return redirect()->route('account.surveys.index');
    }
}
