<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Category;

class UserSelectCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Isi data untuk user_id 1
        $categories = Category::all();

        $dataUser1 = [];

        foreach ($categories as $category) {
            $dataUser1[] = [
                'user_id' => 1,
                'category_id' => $category->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Isi data untuk user_id 2
        $dataUser2 = [
            [
                'user_id' => 2,
                'category_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'category_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'category_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'category_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data ke tabel
        DB::table('user_select_category')->insert($dataUser1);
        DB::table('user_select_category')->insert($dataUser2);
    }
}
