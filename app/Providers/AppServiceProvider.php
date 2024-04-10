<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        // Setting ngrok hanya untuk lingkungan lokal
        // if ($this->app->environment('local')) {
        //     URL::forceScheme('https');
        // }
    }
}
