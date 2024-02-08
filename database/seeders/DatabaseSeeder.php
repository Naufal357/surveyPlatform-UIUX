<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Survey;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesTableSeeder::class);
        $this->call(PermissionsTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(SurveySeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(MethodsTableSeeder::class);
        $this->call(UserSelectCategorySeeder::class);
        $this->call(SurveyHasCategoriesSeeder::class);
        $this->call(SurveyHasMethodsSeeder::class);
    }
}
