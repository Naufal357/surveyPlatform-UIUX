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

Route::group(['middleware' => 'cors'], function () {
    Route::get('/register', [\App\Http\Controllers\Auth\RegisterController::class, 'index'])->name('register')->middleware('guest');
    Route::get('/register/preferences', [\App\Http\Controllers\Auth\RegisterController::class, 'index1'])->name('register1')->middleware('guest');
    Route::post('/register/personaldata', [\App\Http\Controllers\Auth\RegisterController::class, 'storePersonalData'])->name('PersonalData.store')->middleware('guest');
    Route::post('/register/preferencedata', [\App\Http\Controllers\Auth\RegisterController::class, 'storePreferenceData'])->name('PreferenceData.store')->middleware('guest');

    Route::get('/login', [\App\Http\Controllers\Auth\LoginController::class, 'index'])->name('login')->middleware('guest');
    Route::post('/login', [\App\Http\Controllers\Auth\LoginController::class, 'store'])->name('login.store')->middleware('guest');

    Route::post('/logout', \App\Http\Controllers\Auth\LogoutController::class)->name('logout')->middleware('auth');

    Route::get('/', \App\Http\Controllers\Web\HomeController::class)->name('web.home.index');

    Route::get('/categories', [\App\Http\Controllers\Web\CategoryController::class, 'index'])->name('web.categories.index');
    Route::get('/categories/{slug}', [\App\Http\Controllers\Web\CategoryController::class, 'show'])->name('web.categories.show');

    Route::get('/surveys', [\App\Http\Controllers\Web\SurveyController::class, 'index'])->name('web.forms.index');

    Route::get('/articles', [\App\Http\Controllers\Web\ArticleController::class, 'index'])->name('web.articles.index');
    Route::get('/articles/{id}/{slug}', [\App\Http\Controllers\Web\ArticleController::class, 'show'])->name('web.articles.show');

    Route::get('/form/{id}/{slug}', [\App\Http\Controllers\Web\FormController::class, 'show'])->name('form.show')->middleware('auth');
    Route::post('/form', [\App\Http\Controllers\Web\FormController::class, 'store'])->middleware('auth');

    Route::prefix('account')->group(function () {
        Route::group(['middleware' => ['auth']], function () {
            Route::get('/dashboard', [App\Http\Controllers\Account\DashboardController::class, 'index'])->name('account.dashboard');

            Route::get('/profile', [App\Http\Controllers\Account\ProfileController::class, 'index'])->name('account.profile');

            Route::resource('/surveys', App\Http\Controllers\Account\SurveyController::class, ['as' => 'account'])
                ->middleware('permission:surveys.index|surveys.create|surveys.edit|surveys.delete');

            Route::resource('/categories', \App\Http\Controllers\Account\CategoryController::class, ['as' => 'account'])
                ->middleware('permission:categories.index|categories.create|categories.edit|categories.delete');

            Route::get('/responses/sus/{id}/export', [App\Http\Controllers\Account\SusController::class, 'export'])->name('responses.sus.export');

            Route::resource('/roles', \App\Http\Controllers\Account\RoleController::class, ['as' => 'account'])
                ->middleware('permission:roles.index|roles.create|roles.edit|roles.delete');

            Route::get('/permissions', \App\Http\Controllers\Account\PermissionController::class)->name('account.permissions.index')
                ->middleware('permission:permissions.index');

            Route::resource('/certificates', \App\HTTP\Controllers\Account\CertificateController::class, ['as' => 'account']);

            Route::resource('/users', \App\Http\Controllers\Account\UserController::class, ['as' => 'account'])
                ->middleware('permission:users.index|users.create|users.edit|users.delete');

            Route::resource('articles', \App\Http\Controllers\Account\ArticleController::class, ['as' => 'account']);
                
            Route::get('/sus', [\App\Http\Controllers\Account\SusController::class, 'index'])->name('account.sus');
            Route::get('/sus/{id}', [App\Http\Controllers\Account\SusController::class, 'show'])->name('account.sus.id');

            Route::get('/tam', [\App\Http\Controllers\Account\TamController::class, 'index'])->name('account.tam');
            Route::get('/tam/{id}', [App\Http\Controllers\Account\TamController::class, 'show'])->name('account.tam.id');
        });
    });
});
