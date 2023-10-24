<?php

namespace App\Http\Controllers\Account;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Models\Category;
use App\Models\UserSelectCategory;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index()
    {
        $users = User::when(request()->q, function ($users) {
            $users = $users->where('name', 'like', '%' . request()->q . '%');
        })->with('roles')->latest()->paginate(5);

        $users->appends(['q' => request()->q]);

        $users->each(function ($user) {
            $user->fullname = $user->first_name . ' ' . $user->surname;
        });

        return inertia('Account/Users/Users', [
            'users' => $users
        ]);
    }

    public function create()
    {
        $roles = Role::all();
        return inertia('Account/Users/Create', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
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
        $user->assignRole($request->roles);
        return redirect()->route('account.users.index');
    }

    public function edit($id)
    {
        $user = User::with('roles')->findOrFail($id);
        $roles = Role::all();
        $categories = Category::all();
        $userprefs = UserSelectCategory::where('user_id', $id)->get();

        return inertia('Account/Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'categories' => $categories,
            'userpref' => $userprefs
        ]);
    }

    public function update(Request $request, User $user)
    {

        $this->validate($request, [
            'first_name'      => 'required',
            'surname'         => 'required',
            'email'    => 'required|unique:users,email,' . $user->id,
            'birth_date'     => 'nullable|date',
            'gender'     => 'required',
            'profession'     => 'required',
            'educational_background'     => 'required',
            'password' => 'nullable|confirmed'
        ]);

        if ($request->password == '' && $request->birth_date == '') {
            $user->update([
                'first_name'      => $request->first_name,
                'surname'         => $request->surname,
                'email'     => $request->email,
                'gender'     => $request->gender,
                'profession'     => $request->profession,
                'educational_background'     => $request->educational_background,
            ]);
        } else if ($request->password == '') {
            $user->update([
                'first_name'      => $request->first_name,
                'surname'         => $request->surname,
                'email'     => $request->email,
                'birth_date'     => $request->birth_date,
                'gender'     => $request->gender,
                'profession'     => $request->profession,
                'educational_background'     => $request->educational_background,
            ]);
        } else if ($request->birth_date == '') {
            $user->update([
                'first_name'      => $request->first_name,
                'surname'         => $request->surname,
                'email'     => $request->email,
                'gender'     => $request->gender,
                'profession'     => $request->profession,
                'educational_background'     => $request->educational_background,
                'password'  => bcrypt($request->password)
            ]);
        }

        $user->syncRoles($request->roles);
        return redirect()->route('account.users.index');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('account.users.index');
    }
}
