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

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index']);

Route::get('/register', [\App\Http\Controllers\Auth\RegisterController::class, 'index'])->name('register')->middleware('guest');
Route::post('/register', [\App\Http\Controllers\Auth\RegisterController::class, 'store'])->name('register.store')->middleware('guest');

Route::get('/login', [\App\Http\Controllers\Auth\LoginController::class, 'index'])->name('login')->middleware('guest');
Route::post('/login', [\App\Http\Controllers\Auth\LoginController::class, 'store'])->name('login.store')->middleware('guest');

Route::post('/logout', \App\Http\Controllers\Auth\LogoutController::class)->name('logout')->middleware('auth');

Route::get('/form/{id}', [\App\Http\Controllers\FormController::class, 'show'])->name('form.show')->middleware('auth');
Route::post('/form', [\App\Http\Controllers\FormController::class, 'storeData'])->middleware('auth');

Route::prefix('account')->group(function(){
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/dashboard', [App\Http\Controllers\Account\DashboardController::class, 'index'])->name('account.dashboard');

        Route::resource('/surveys', App\Http\Controllers\Account\SurveyController::class, ['as' => 'account'])
        ->middleware('permission:surveys.index|surveys.create|surveys.edit|surveys.delete');
        
        Route::get('/responses/{id}/export', [App\Http\Controllers\Account\SusController::class, 'export'])->name('responses.export');

        Route::get('/permissions', \App\Http\Controllers\Account\PermissionController::class)->name('account.permissions.index')
        ->middleware('permission:permissions.index');

        Route::resource('/roles', \App\Http\Controllers\Account\RoleController::class, ['as' => 'account'])
        ->middleware('permission:roles.index|roles.create|roles.edit|roles.delete');

        Route::resource('/users', \App\Http\Controllers\Account\UserController::class, ['as' => 'account'])
        ->middleware('permission:users.index|users.create|users.edit|users.delete');

        Route::get('/sus', [\App\Http\Controllers\Account\SusController::class, 'index0'])->name('account.sus');
        Route::get('/sus/{id}', [App\Http\Controllers\Account\SusController::class, 'index'])->name('account.sus');
    });
});
