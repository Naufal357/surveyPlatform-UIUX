<?php

namespace App\Http\Controllers\Account;

use App\Models\Survey;
use App\Models\User;
use App\Models\Category;
use App\Models\SurveyHasCategories;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class SurveyController extends Controller
{
    public function index()
    {
        if (auth()->user()->hasPermissionTo('surveys.index.full')) {
            $surveys = Survey::when(request()->q, function ($surveys) {
                $surveys = $surveys->where('title', 'like', '%' . request()->q . '%');
            })->orderBy('id')->paginate(15);

            $surveys->load('user');
        } else {
            $surveys = Survey::when(request()->q, function ($surveys) {
                $surveys = $surveys->where('title', 'like', '%' . request()->q . '%');
            })
                ->where('user_id', auth()->user()->id)
                ->latest()
                ->paginate(10);
        }

        $surveys->appends(['q' => request()->q]);

        return inertia('Account/Surveys/Survey', [
            'surveys' => $surveys,
        ]);
    }

    public function create()
    {
        $categories = Category::all();

        return inertia('Account/Surveys/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request, SurveyHasCategories $surveyHasCategories)
    {
        $this->validate($request, [
            'user_id'        => 'required',
            'title'          => 'required',
            'image'         => 'required|image|mimes:jpeg,jpg,png|max:80000',
            'theme'          => 'required',
            'description'    => 'required',
            'embed_design'   => 'required',
            'embed_prototype'   => 'required',
            'survey_categories' => 'required',
        ]);

        $image = $request->file('image');
        $image->storeAs('public/surveys', $image->hashName());

        $survey = Survey::create([
            'user_id'        => $request->user_id,
            'title'          => $request->title,
            'image'         => $image->hashName(),
            'theme'          => $request->theme,
            'description'    => $request->description,
            'embed_design'   => $request->embed_design,
            'embed_prototype'   => $request->embed_prototype,
            'slug'          => Str::slug($request->title, '-'),
        ]);

        if ($request->has('survey_categories')) {
            $surveyCategoriesData = $request->survey_categories;

            $surveyHasCategories->where('survey_id', $survey->id)->delete();

            foreach ($surveyCategoriesData as $category_id) {
                $surveyHasCategories->create(['category_id' => $category_id, 'survey_id' => $survey->id]);
            }
        }

        return redirect()->route('account.surveys.index');
    }


    public function edit(Survey $survey)
    {
        return inertia('Account/Surveys/Edit', [
            'survey' => $survey,
        ]);
    }


    public function update(Request $request, Survey $Survey)
    {
        $this->validate($request, [
            'user_id'        => 'required',
            'title'          => 'required',
            'theme'          => 'required',
            'description'    => 'required',
            'embed_design'   => 'required',
            'embed_prototype'   => 'required',
        ]);
        
        if ($request->file('image')) {

            Storage::disk('local')->delete('public/surveys/' . basename($Survey->image));

            $image = $request->file('image');
            $image->storeAs('public/surveys', $image->hashName());

            $Survey->update([
                'image' => $image->hashName(),
                'name' => $request->name,
                'slug'=> Str::slug($request->name, '-')
            ]);
        }

        $Survey->update([
            'title'          => $request->title,
            'theme'          => $request->theme,
            'description'    => $request->description,
            'embed_design'   => $request->embed_design,
            'embed_prototype' => $request->embed_prototype,
            'slug'          => Str::slug($request->title, '-')
        ]);
        
        return redirect()->route('account.surveys.index');
    }


    public function destroy($id)
    {
        $Survey = Survey::findOrFail($id);

        Storage::disk('local')->delete('public/surveys/' . basename($Survey->image));

        $Survey->delete();

        return redirect()->route('account.surveys.index');
    }
}
