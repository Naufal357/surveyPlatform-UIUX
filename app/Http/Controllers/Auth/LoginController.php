<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\User;

class LoginController extends Controller
{
    public function index()
    {
        if (Cookie::has('remember_token')) {
            $user = User::where('remember_token', Cookie::get('remember_token'))->first();
            if ($user) {
                auth()->login($user);
                return redirect()->route('account.dashboard');
            }
        }

        return inertia(
            'Auth/Login',
            [
                'auth' => auth()->user(),
            ]
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'email'     => 'required|email',
            'password'  => 'required',
            'remember'  => 'boolean',
        ]);

        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials, $request->remember)) {

            $request->session()->regenerate();

            if ($request->remember) {
                $user = auth()->user();
                $rememberToken = Str::random(60);
                $user->forceFill([
                    'remember_token' => $rememberToken,
                ])->save();

                $minutes = 60 * 24 * 30; // 30 days

                return redirect()->route('account.dashboard')->withCookie('remember_token', $rememberToken, $minutes);
            }

            return redirect()->route('account.dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
