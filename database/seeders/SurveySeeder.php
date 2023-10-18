<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Survey;

class SurveySeeder extends Seeder
{
    public function run()
    {
        \App\Models\Survey::factory(10)->create(); 
    }
}
