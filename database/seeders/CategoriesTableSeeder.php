<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    public function run(): void
    {
        Category::create(['name' => 'Umum',]);
        Category::create(['name' => 'Khusus',]);
        Category::create(['name' => 'Web',]);
        Category::create(['name' => 'Mobile',]);
        Category::create(['name' => 'Desktop',]);
        Category::create(['name' => 'Pendidikan',]);
        Category::create(['name' => 'Kesehatan',]);
        Category::create(['name' => 'Teknologi',]);
        Category::create(['name' => 'Keuangan',]);
        Category::create(['name' => 'Lingkungan',]);
        Category::create(['name' => 'Pariwisata',]);
        Category::create(['name' => 'Hiburan',]);
        Category::create(['name' => 'Olahraga',]);
        Category::create(['name' => 'Komunitas',]);
        Category::create(['name' => 'Berita',]);
        Category::create(['name' => 'Pemerintahan',]);
        Category::create(['name' => 'Bisnis',]);
        Category::create(['name' => 'Hukum',]);
        Category::create(['name' => 'Seni dan Budaya',]);
        Category::create(['name' => 'Sains',]);
        Category::create(['name' => 'Otomotif',]);
        Category::create(['name' => 'Permainan',]);
        Category::create(['name' => 'Makanan dan Minuman',]);
        Category::create(['name' => 'Transportasi',]);
        Category::create(['name' => 'Pertanian',]);
        Category::create(['name' => 'Manufaktur',]);
    }
}
