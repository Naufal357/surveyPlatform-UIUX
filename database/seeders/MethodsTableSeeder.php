<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Method;

class MethodsTableSeeder extends Seeder
{
    public function run(): void
    {
        Method::create(['name' => 'SUS', 'slug' => 'sus']);
        Method::create(['name' => 'TAM', 'slug' => 'tam']);
        // Method::create(['name' => 'UTAUT2', 'slug' => 'utaut2']);
    }
}
