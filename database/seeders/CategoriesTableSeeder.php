<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    public function run(): void
    {
        Category::create(['name' => 'Web', 'image' => 'image.png', 'slug' => 'web']);
        Category::create(['name' => 'Mobile', 'image' => 'image.png', 'slug' => 'mobile']);
        Category::create(['name' => 'Desktop', 'image' => 'image.png', 'slug' => 'desktop']);
        Category::create(['name' => 'Pendidikan', 'image' => 'image.png', 'slug' => 'pendidikan']);
        Category::create(['name' => 'Kesehatan', 'image' => 'image.png', 'slug' => 'kesehatan']);
        //5
        Category::create(['name' => 'Teknologi', 'image' => 'image.png', 'slug' => 'teknologi']);
        Category::create(['name' => 'Keuangan', 'image' => 'image.png', 'slug' => 'keuangan']);
        Category::create(['name' => 'Lingkungan', 'image' => 'image.png', 'slug' => 'lingkungan']);
        Category::create(['name' => 'Pariwisata', 'image' => 'image.png', 'slug' => 'pariwisata']);
        Category::create(['name' => 'Hiburan', 'image' => 'image.png', 'slug' => 'hiburan']);
        //10
        Category::create(['name' => 'Olahraga', 'image' => 'image.png', 'slug' => 'olahraga']);
        Category::create(['name' => 'Komunitas', 'image' => 'image.png', 'slug' => 'komunitas']);
        Category::create(['name' => 'Berita', 'image' => 'image.png', 'slug' => 'berita']);
        Category::create(['name' => 'Pemerintahan', 'image' => 'image.png', 'slug' => 'pemerintahan']);
        Category::create(['name' => 'Bisnis', 'image' => 'image.png', 'slug' => 'bisnis']);
        //15
        Category::create(['name' => 'Hukum', 'image' => 'image.png', 'slug' => 'hukum']);
        Category::create(['name' => 'Seni dan Budaya', 'image' => 'image.png', 'slug' => 'seni']);
        Category::create(['name' => 'Sains', 'image' => 'image.png', 'slug' => 'sains']);
        Category::create(['name' => 'Otomotif', 'image' => 'image.png', 'slug' => 'otomotif']);
        Category::create(['name' => 'Permainan', 'image' => 'image.png', 'slug' => 'permainan']);
        //20
        Category::create(['name' => 'Makanan dan Minuman', 'image' => 'image.png', 'slug' => 'makanan']);
        Category::create(['name' => 'Transportasi', 'image' => 'image.png', 'slug' => 'transportasi']);
        Category::create(['name' => 'Pertanian', 'image' => 'image.png', 'slug' => 'pertanian']);
        Category::create(['name' => 'Manufaktur', 'image' => 'image.png', 'slug' => 'manufaktur']);
    }
}
