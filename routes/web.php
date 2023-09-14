<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return inertia('Home', [
        'auth' => auth()->user(),
    ]);
});

Route::get('/register', [\App\Http\Controllers\Auth\RegisterController::class, 'index'])->name('register');
Route::post('/register', [\App\Http\Controllers\Auth\RegisterController::class, 'store'])->name('register.store');

Route::get('/login', [\App\Http\Controllers\Auth\LoginController::class, 'index'])->name('login');
Route::post('/login', [\App\Http\Controllers\Auth\LoginController::class, 'store'])->name('login.store');

Route::post('/logout', \App\Http\Controllers\Auth\LogoutController::class)->name('logout');

// Route::get('/form', [\App\Http\Controllers\FormController::class, 'index']);
Route::get('/form/{id}', [\App\Http\Controllers\FormController::class, 'show'])->name('form.show');
Route::post('/form', [\App\Http\Controllers\FormController::class, 'storeData']);

Route::prefix('account')->group(function(){
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/dashboard', [App\Http\Controllers\Account\DashboardController::class, 'index'])->name('account.dashboard');

        Route::resource('/surveys', App\Http\Controllers\Account\SurveyController::class, ['as' => 'account']);
    });
});
