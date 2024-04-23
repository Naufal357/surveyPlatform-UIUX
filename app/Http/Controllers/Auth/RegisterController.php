<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Models\Category;
use App\Models\UserSelectCategory;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class RegisterController extends Controller
{
    public function index()
    {
        return inertia(
            'Auth/Register',
            [
                'auth' => auth()->user(),
            ]
        );
    }

    public function index1()
    {
        $categories = Category::all();
        return inertia(
            'Auth/SelectCategory',
            [
                'auth' => auth()->user(),
                'categories' => $categories,
            ]
        );
    }

    public function storePersonalData(Request $request)
    {
        $request->validate([
            'first_name'      => 'required',
            'surname'         => 'required',
            'email'     => 'required|email|unique:users',
            'birth_date'     => 'required|date',
            'gender'     => 'required',
            'profession'     => 'required',
            'educational_background'     => 'required',
            'password'  => 'required|confirmed',
        ]);

        $personaldata = [
            'first_name'      => $request->first_name,
            'surname'         => $request->surname,
            'email'     => $request->email,
            'birth_date'     => $request->birth_date,
            'gender'     => $request->gender,
            'profession'     => $request->profession,
            'educational_background'     => $request->educational_background,
            'password'  => bcrypt($request->password)
        ];

        $request->session()->put('personaldata', $personaldata);

        return redirect()->route('register1');
    }

    public function storePreferenceData(Request $request, UserSelectCategory $userPref, Certificate $certificate)
    {
        $this->validate($request, [
            'userPrefsData' => 'required',
            'files.*' => 'file|mimes:pdf|max:2048',
        ]);

        $personaldata = $request->session()->get('personaldata');

        $user = User::create([
            'first_name' => $personaldata['first_name'],
            'surname' => $personaldata['surname'],
            'email' => $personaldata['email'],
            'birth_date' => $personaldata['birth_date'],
            'gender' => $personaldata['gender'],
            'profession' => $personaldata['profession'],
            'educational_background' => $personaldata['educational_background'],
            'password' => $personaldata['password']
        ]);

        $role = Role::findByName('basic user');
        $user->assignRole($role);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $originalName = $file->getClientOriginalName();
                $certificate = $file->hashName();
                $file->storeAs('public/file/certificates', $certificate); 
                Certificate::create([
                    'user_id' => $user->id,
                    'original_certificate' => $originalName,
                    'certificate' => $certificate, 
                    'status' => 'pending',
                ]);
            }
        }

        $userPrefsData = json_decode($request->userPrefsData);
        $userPref->where('user_id', $user->id)->delete();

        foreach ($userPrefsData as $category_id) {
            $userPref->create(['category_id' => $category_id, 'user_id' => $user->id]);
        }

        return redirect()->route('login');
    }

}
