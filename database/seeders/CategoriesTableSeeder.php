<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    public function run(): void
    {
        Category::create(['name' => 'Web', 'slug' => 'web']);
        Category::create(['name' => 'Mobile', 'slug' => 'mobile']);
        Category::create(['name' => 'Desktop', 'slug' => 'desktop']);
        Category::create(['name' => 'Pendidikan', 'slug' => 'pendidikan']);
        Category::create(['name' => 'Kesehatan', 'slug' => 'kesehatan']);
        Category::create(['name' => 'Teknologi', 'slug' => 'teknologi']);
        Category::create(['name' => 'Keuangan', 'slug' => 'keuangan']);
        Category::create(['name' => 'Lingkungan', 'slug' => 'lingkungan']);
        Category::create(['name' => 'Pariwisata', 'slug' => 'pariwisata']);
        Category::create(['name' => 'Hiburan', 'slug' => 'hiburan']);
        Category::create(['name' => 'Olahraga', 'slug' => 'olahraga']);
        Category::create(['name' => 'Komunitas', 'slug' => 'komunitas']);
        Category::create(['name' => 'Berita', 'slug' => 'berita']);
        Category::create(['name' => 'Pemerintahan', 'slug' => 'pemerintahan']);
        Category::create(['name' => 'Bisnis', 'slug' => 'bisnis']);
        Category::create(['name' => 'Hukum', 'slug' => 'hukum']);
        Category::create(['name' => 'Seni dan Budaya', 'slug' => 'seni']);
        Category::create(['name' => 'Sains', 'slug' => 'sains']);
        Category::create(['name' => 'Otomotif', 'slug' => 'otomotif']);
        Category::create(['name' => 'Permainan', 'slug' => 'permainan']);
        Category::create(['name' => 'Makanan dan Minuman', 'slug' => 'makanan']);
        Category::create(['name' => 'Transportasi', 'slug' => 'transportasi']);
        Category::create(['name' => 'Pertanian', 'slug' => 'pertanian']);
        Category::create(['name' => 'Manufaktur', 'slug' => 'manufaktur']);
    }
}
