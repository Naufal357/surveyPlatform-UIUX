<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Certificate;

class CertificateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Certificate::create(['user_id' => 1, 'certificate' => 'certificate.pdf', 'status' => 'pending']);
        Certificate::create(['user_id' => 1, 'certificate' => 'certificate2.pdf', 'status' => 'pending']);
        Certificate::create(['user_id' => 2, 'certificate' => 'certificate3.pdf', 'status' => 'pending']);
        Certificate::create(['user_id' => 3, 'certificate' => 'certificate4.pdf', 'status' => 'pending']);
        Certificate::create(['user_id' => 4, 'certificate' => 'certificate5.pdf', 'status' => 'pending']);
        Certificate::create(['user_id' => 4, 'certificate' => 'certificate6.pdf', 'status' => 'pending']);
    }
}
