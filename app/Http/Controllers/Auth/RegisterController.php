<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;

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

    public function store(Request $request)
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

        $user = User::create([
            'first_name'      => $request->first_name,
            'surname'         => $request->surname,
            'email'     => $request->email,
            'birth_date'     => $request->birth_date,
            'gender'     => $request->gender,
            'profession'     => $request->profession,
            'educational_background'     => $request->educational_background,
            'password'  => bcrypt($request->password)
        ]);

        $role = Role::findByName('user');

        $user->assignRole($role);

        return redirect()->route('login');
    }
}
