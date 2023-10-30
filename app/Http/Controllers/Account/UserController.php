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
        })->with('roles')->orderBy('id')->paginate(5);

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
        $categories = Category::all();

        return inertia('Account/Users/Create', [
            'roles' => $roles,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request, UserSelectCategory $userPref)
    {
        $this->validate($request, [
            'first_name'      => 'required',
            'surname'         => 'required',
            'email'     => 'required|email|unique:users',
            'birth_date'     => 'required|date',
            'gender'     => 'required',
            'profession'     => 'required',
            'educational_background'     => 'required',
            'roles' => 'required',
            'user_prefs' => 'required',
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

        if ($request->has('user_prefs')) {
            $userPrefsData = $request->user_prefs;
            
            $userPref->where('user_id', $user->id)->delete();

            foreach ($userPrefsData as $category_id) {
                $userPref->create(['category_id' => $category_id, 'user_id' => $user->id]);
            }
        }
        return redirect()->route('account.users.index');
    }

    public function edit($id)
    {
        if ($id == 1) {
            abort(403, "The user is not allowed to be edited.");
        }

        $user = User::with('roles')->findOrFail($id);
        $roles = Role::all();
        $categories = Category::all();
        $userPrefs = UserSelectCategory::where('user_id', $id)->get();

        return inertia('Account/Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'categories' => $categories,
            'userPrefs' => $userPrefs
        ]);
    }

    public function update(Request $request, User $user, UserSelectCategory $userPref)
    {
        if ($request->email == "admin@123") {
            abort(403, "The user is not allowed to be edited.");
        }

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

        if ($request->has('user_prefs')) {
            $userPrefsData = $request->user_prefs;
            $userPref->where('user_id', $user->id)->delete();

            foreach ($userPrefsData as $category_id) {
                $userPref->create(['category_id' => $category_id, 'user_id' => $user->id]);
            }
        }
        
        return redirect()->route('account.users.index');
    }

    public function destroy($id)
    {
        if ($id == 1) {
            abort(403, "The system will not allow you to delete this user. The user cannot be deleted.");
        }

        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('account.users.index');
    }
}