<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SurveyQuestion;
use GuzzleHttp\Promise\Create;

class SurveyQuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SurveyQuestion::create([
            'survey_id' => 1,
            'questions_data' =>
            '{
                "sus": {
                    "susQst1": "Saya berpikir akan menggunakan sistem Website Rumah Sakit ini lagi.",
                    "susQst2": "Saya merasa sistem Website Rumah Sakit ini rumit untuk digunakan.",
                    "susQst3": "Saya merasa sistem Website Rumah Sakit ini mudah digunakan.",
                    "susQst4": "Saya membutuhkan bantuan dari orang lain atau teknisi dalam menggunakan sistem Website Rumah Sakit ini.",
                    "susQst5": "Saya merasa fitur-fitur sistem Website Rumah Sakit ini berjalan dengan semestinya.",
                    "susQst6": "Saya merasa ada banyak hal yang tidak konsisten (tidak serasi pada sistem Website Rumah Sakit ini).",
                    "susQst7": "Saya merasa orang lain akan memahami cara menggunakan sistem Website Rumah Sakit ini dengan cepat.",
                    "susQst8": "Saya merasa sistem Website Rumah Sakit ini membingungkan.",
                    "susQst9": "Saya merasa tidak ada hambatan dalam menggunakan sistem Website Rumah Sakit ini.",
                    "susQst10": "Saya perlu membiasakan diri terlebih dahulu sebelum menggunakan sistem Website Rumah Sakit ini."
                },
                "tam": {
                    "tamPU1": "Saya tidak mengalami kesulitan menggunakan Website Rumah Sakit.",
                    "tamPU2": "Dengan adanya Website Rumah Sakit dapat mencapai tujuan pekerjaan saya.",
                    "tamPU3": "Secara keseluruhan Saya merasa Website Rumah Sakit mudah dipahami.",
                    "tamPEU4": "Website Rumah Sakit ini menjadikan pekerjaan saya lebih mudah.",
                    "tamPEU5": "Menggunakan Website Rumah Sakit dapat meningkatkan kemampuan saya.",
                    "tamPEU6": "Secara keseluruhan saya merasa Website Rumah Sakit memiliki banyak manfaat.",
                    "tamATU7": "Saya menerima penerapan Website Rumah Sakit ini",
                    "tamATU8": "Saya menolak untuk menggunkan Website Rumah Sakit selain ini",
                    "tamATU9": "Secara keseluruhan saya menikmati penggunaan Website Rumah Sakit ini",
                    "tamBI10": "Saya berharap Website Rumah Sakit ini akan selalu digunakan di masa depan.",
                    "tamBI11": "Saya termotivasi untuk tetap menggunakan Website Rumah Sakit untuk dimasa yang akan datang.",
                    "tamBI12": "Saya selalu menggunakan Website Rumah Sakit ini dalam kondisi apapun.",
                    "tamASU13": "Saya menggunakan Website Rumah Sakit ini sesuai dengan prosedur yang telah diberikan.",
                    "tamASU14": "Saya menggunakan Website Rumah Sakit ini secara jujur sesuai ketentuan dan prosedur.",
                    "tamASU15": "Saya menggunakan Website Rumah Sakit ini sesuai dengan durasi waktu yang telah ditentukan secara real time."
                }
            }',
        ]);

        SurveyQuestion::create([
            'survey_id' => 2,
            'questions_data' =>
            '{
                "tam": {
                    "tamPU1": "Saya tidak mengalami kesulitan menggunakan E-Commerce Fashion Aplication.",
                    "tamPU2": "Dengan adanya E-Commerce Fashion Aplication dapat mencapai tujuan pekerjaan saya.",
                    "tamPU3": "Secara keseluruhan Saya merasa E-Commerce Fashion Aplication mudah dipahami.",
                    "tamPEU4": "E-Commerce Fashion Aplication ini menjadikan pekerjaan saya lebih mudah.",
                    "tamPEU5": "Menggunakan E-Commerce Fashion Aplication dapat meningkatkan kemampuan saya.",
                    "tamPEU6": "Secara keseluruhan saya merasa E-Commerce Fashion Aplication memiliki banyak manfaat.",
                    "tamATU7": "Saya menerima penerapan E-Commerce Fashion Aplication ini",
                    "tamATU8": "Saya menolak untuk menggunkan E-Commerce Fashion Aplication selain ini",
                    "tamATU9": "Secara keseluruhan saya menikmati penggunaan E-Commerce Fashion Aplication ini",
                    "tamBI10": "Saya berharap E-Commerce Fashion Aplication ini akan selalu digunakan di masa depan.",
                    "tamBI11": "Saya termotivasi untuk tetap menggunakan E-Commerce Fashion Aplication untuk dimasa yang akan datang.",
                    "tamBI12": "Saya selalu menggunakan E-Commerce Fashion Aplication ini dalam kondisi apapun.",
                    "tamASU13": "Saya menggunakan E-Commerce Fashion Aplication ini sesuai dengan prosedur yang telah diberikan.",
                    "tamASU14": "Saya menggunakan E-Commerce Fashion Aplication ini secara jujur sesuai ketentuan dan prosedur.",
                    "tamASU15": "Saya menggunakan E-Commerce Fashion Aplication ini sesuai dengan durasi waktu yang telah ditentukan secara real time."
                }
            }',
        ]);

        SurveyQuestion::create([
            'survey_id' => 3,
            'questions_data' =>
            '{
                "sus": {
                    "susQst1": "Saya berpikir akan menggunakan sistem E-Learning Platform ini lagi.",
                    "susQst2": "Saya merasa sistem E-Learning Platform ini rumit untuk digunakan.",
                    "susQst3": "Saya merasa sistem E-Learning Platform ini mudah digunakan.",
                    "susQst4": "Saya membutuhkan bantuan dari orang lain atau teknisi dalam menggunakan sistem E-Learning Platform ini.",
                    "susQst5": "Saya merasa fitur-fitur sistem E-Learning Platform ini berjalan dengan semestinya.",
                    "susQst6": "Saya merasa ada banyak hal yang tidak konsisten (tidak serasi pada sistem E-Learning Platform ini).",
                    "susQst7": "Saya merasa orang lain akan memahami cara menggunakan sistem E-Learning Platform ini dengan cepat.",
                    "susQst8": "Saya merasa sistem E-Learning Platform ini membingungkan.",
                    "susQst9": "Saya merasa tidak ada hambatan dalam menggunakan sistem E-Learning Platform ini.",
                    "susQst10": "Saya perlu membiasakan diri terlebih dahulu sebelum menggunakan sistem E-Learning Platform ini."
                }
            }',
        ]);

        SurveyQuestion::create([
            'survey_id' => 4,
            'questions_data' =>
            '{
                "sus": {
                    "susQst1": "Saya berpikir akan menggunakan sistem Travel Booking App ini lagi.",
                    "susQst2": "Saya merasa sistem Travel Booking App ini rumit untuk digunakan.",
                    "susQst3": "Saya merasa sistem Travel Booking App ini mudah digunakan.",
                    "susQst4": "Saya membutuhkan bantuan dari orang lain atau teknisi dalam menggunakan sistem Travel Booking App ini.",
                    "susQst5": "Saya merasa fitur-fitur sistem Travel Booking App ini berjalan dengan semestinya.",
                    "susQst6": "Saya merasa ada banyak hal yang tidak konsisten (tidak serasi pada sistem Travel Booking App ini).",
                    "susQst7": "Saya merasa orang lain akan memahami cara menggunakan sistem Travel Booking App ini dengan cepat.",
                    "susQst8": "Saya merasa sistem Travel Booking App ini membingungkan.",
                    "susQst9": "Saya merasa tidak ada hambatan dalam menggunakan sistem Travel Booking App ini.",
                    "susQst10": "Saya perlu membiasakan diri terlebih dahulu sebelum menggunakan sistem Travel Booking App ini."
                },
                "tam": {
                    "tamPU1": "Saya tidak mengalami kesulitan menggunakan Travel Booking App.",
                    "tamPU2": "Dengan adanya Travel Booking App dapat mencapai tujuan pekerjaan saya.",
                    "tamPU3": "Secara keseluruhan Saya merasa Travel Booking App mudah dipahami.",
                    "tamPEU4": "Travel Booking App ini menjadikan pekerjaan saya lebih mudah.",
                    "tamPEU5": "Menggunakan Travel Booking App dapat meningkatkan kemampuan saya.",
                    "tamPEU6": "Secara keseluruhan saya merasa Travel Booking App memiliki banyak manfaat.",
                    "tamATU7": "Saya menerima penerapan Travel Booking App ini",
                    "tamATU8": "Saya menolak untuk menggunkan Travel Booking App selain ini",
                    "tamATU9": "Secara keseluruhan saya menikmati penggunaan Travel Booking App ini",
                    "tamBI10": "Saya berharap Travel Booking App ini akan selalu digunakan di masa depan.",
                    "tamBI11": "Saya termotivasi untuk tetap menggunakan Travel Booking App untuk dimasa yang akan datang.",
                    "tamBI12": "Saya selalu menggunakan Travel Booking App ini dalam kondisi apapun.",
                    "tamASU13": "Saya menggunakan Travel Booking App ini sesuai dengan prosedur yang telah diberikan.",
                    "tamASU14": "Saya menggunakan Travel Booking App ini secara jujur sesuai ketentuan dan prosedur.",
                    "tamASU15": "Saya menggunakan Travel Booking App ini sesuai dengan durasi waktu yang telah ditentukan secara real time."
                }
            }',
        ]);

        SurveyQuestion::create([
            'survey_id' => 5,
            'questions_data' =>
            '{
                "sus": {
                    "susQst1": "Saya berpikir akan menggunakan sistem Health and Fitness App ini lagi.",
                    "susQst2": "Saya merasa sistem Health and Fitness App ini rumit untuk digunakan.",
                    "susQst3": "Saya merasa sistem Health and Fitness App ini mudah digunakan.",
                    "susQst4": "Saya membutuhkan bantuan dari orang lain atau teknisi dalam menggunakan sistem Health and Fitness App ini.",
                    "susQst5": "Saya merasa fitur-fitur sistem Health and Fitness App ini berjalan dengan semestinya.",
                    "susQst6": "Saya merasa ada banyak hal yang tidak konsisten (tidak serasi pada sistem Health and Fitness App ini).",
                    "susQst7": "Saya merasa orang lain akan memahami cara menggunakan sistem Health and Fitness App ini dengan cepat.",
                    "susQst8": "Saya merasa sistem Health and Fitness App ini membingungkan.",
                    "susQst9": "Saya merasa tidak ada hambatan dalam menggunakan sistem Health and Fitness App ini.",
                    "susQst10": "Saya perlu membiasakan diri terlebih dahulu sebelum menggunakan sistem Health and Fitness App ini."
                }
            }',
        ]);

        SurveyQuestion::create([
            'survey_id' => 6,
            'questions_data' =>
            '{
                "tam": {
                    "tamPU1": "Saya tidak mengalami kesulitan menggunakan Restaurant Website.",
                    "tamPU2": "Dengan adanya Restaurant Website dapat mencapai tujuan pekerjaan saya.",
                    "tamPU3": "Secara keseluruhan Saya merasa Restaurant Website mudah dipahami.",
                    "tamPEU4": "Restaurant Website ini menjadikan pekerjaan saya lebih mudah.",
                    "tamPEU5": "Menggunakan Restaurant Website dapat meningkatkan kemampuan saya.",
                    "tamPEU6": "Secara keseluruhan saya merasa Restaurant Website memiliki banyak manfaat.",
                    "tamATU7": "Saya menerima penerapan Restaurant Website ini",
                    "tamATU8": "Saya menolak untuk menggunkan Restaurant Website selain ini",
                    "tamATU9": "Secara keseluruhan saya menikmati penggunaan Restaurant Website ini",
                    "tamBI10": "Saya berharap Restaurant Website ini akan selalu digunakan di masa depan.",
                    "tamBI11": "Saya termotivasi untuk tetap menggunakan Restaurant Website untuk dimasa yang akan datang.",
                    "tamBI12": "Saya selalu menggunakan Restaurant Website ini dalam kondisi apapun.",
                    "tamASU13": "Saya menggunakan Restaurant Website ini sesuai dengan prosedur yang telah diberikan.",
                    "tamASU14": "Saya menggunakan Restaurant Website ini secara jujur sesuai ketentuan dan prosedur.",
                    "tamASU15": "Saya menggunakan Restaurant Website ini sesuai dengan durasi waktu yang telah ditentukan secara real time."
                }
            }',
        ]);

        SurveyQuestion::create([
            'survey_id' => 7,
            'questions_data' =>
            '{
                "sus": {
                    "susQst1": "Saya berpikir akan menggunakan sistem Aplikasi Belanja Online ini lagi.",
                    "susQst2": "Saya merasa sistem Aplikasi Belanja Online ini rumit untuk digunakan.",
                    "susQst3": "Saya merasa sistem Aplikasi Belanja Online ini mudah digunakan.",
                    "susQst4": "Saya membutuhkan bantuan dari orang lain atau teknisi dalam menggunakan sistem Aplikasi Belanja Online ini.",
                    "susQst5": "Saya merasa fitur-fitur sistem Aplikasi Belanja Online ini berjalan dengan semestinya.",
                    "susQst6": "Saya merasa ada banyak hal yang tidak konsisten (tidak serasi pada sistem Aplikasi Belanja Online ini).",
                    "susQst7": "Saya merasa orang lain akan memahami cara menggunakan sistem Aplikasi Belanja Online ini dengan cepat.",
                    "susQst8": "Saya merasa sistem Aplikasi Belanja Online ini membingungkan.",
                    "susQst9": "Saya merasa tidak ada hambatan dalam menggunakan sistem Aplikasi Belanja Online ini.",
                    "susQst10": "Saya perlu membiasakan diri terlebih dahulu sebelum menggunakan sistem Aplikasi Belanja Online ini."
                }
            }',
        ]);

        SurveyQuestion::create([
            'survey_id' => 8,
            'questions_data' =>
            '{
                "sus": {
                    "susQst1": "Saya berpikir akan menggunakan sistem Aplikasi Streaming Musik ini lagi.",
                    "susQst2": "Saya merasa sistem Aplikasi Streaming Musik ini rumit untuk digunakan.",
                    "susQst3": "Saya merasa sistem Aplikasi Streaming Musik ini mudah digunakan.",
                    "susQst4": "Saya membutuhkan bantuan dari orang lain atau teknisi dalam menggunakan sistem Aplikasi Streaming Musik ini.",
                    "susQst5": "Saya merasa fitur-fitur sistem Aplikasi Streaming Musik ini berjalan dengan semestinya.",
                    "susQst6": "Saya merasa ada banyak hal yang tidak konsisten (tidak serasi pada sistem Aplikasi Streaming Musik ini).",
                    "susQst7": "Saya merasa orang lain akan memahami cara menggunakan sistem Aplikasi Streaming Musik ini dengan cepat.",
                    "susQst8": "Saya merasa sistem Aplikasi Streaming Musik ini membingungkan.",
                    "susQst9": "Saya merasa tidak ada hambatan dalam menggunakan sistem Aplikasi Streaming Musik ini.",
                    "susQst10": "Saya perlu membiasakan diri terlebih dahulu sebelum menggunakan sistem Aplikasi Streaming Musik ini."
                }
            }',
        ]);

        SurveyQuestion::create([
            'survey_id' => 9,
            'questions_data' =>
            '{
                "tam": {
                    "tamPU1": "Saya tidak mengalami kesulitan menggunakan Aplikasi Kesehatan Mental.",
                    "tamPU2": "Dengan adanya Aplikasi Kesehatan Mental dapat mencapai tujuan pekerjaan saya.",
                    "tamPU3": "Secara keseluruhan Saya merasa Aplikasi Kesehatan Mental mudah dipahami.",
                    "tamPEU4": "Aplikasi Kesehatan Mental ini menjadikan pekerjaan saya lebih mudah.",
                    "tamPEU5": "Menggunakan Aplikasi Kesehatan Mental dapat meningkatkan kemampuan saya.",
                    "tamPEU6": "Secara keseluruhan saya merasa Aplikasi Kesehatan Mental memiliki banyak manfaat.",
                    "tamATU7": "Saya menerima penerapan Aplikasi Kesehatan Mental ini",
                    "tamATU8": "Saya menolak untuk menggunkan Aplikasi Kesehatan Mental selain ini",
                    "tamATU9": "Secara keseluruhan saya menikmati penggunaan Aplikasi Kesehatan Mental ini",
                    "tamBI10": "Saya berharap Aplikasi Kesehatan Mental ini akan selalu digunakan di masa depan.",
                    "tamBI11": "Saya termotivasi untuk tetap menggunakan Aplikasi Kesehatan Mental untuk dimasa yang akan datang.",
                    "tamBI12": "Saya selalu menggunakan Aplikasi Kesehatan Mental ini dalam kondisi apapun.",
                    "tamASU13": "Saya menggunakan Aplikasi Kesehatan Mental ini sesuai dengan prosedur yang telah diberikan.",
                    "tamASU14": "Saya menggunakan Aplikasi Kesehatan Mental ini secara jujur sesuai ketentuan dan prosedur.",
                    "tamASU15": "Saya menggunakan Aplikasi Kesehatan Mental ini sesuai dengan durasi waktu yang telah ditentukan secara real time."
                }
            }',
        ]);

        SurveyQuestion::create([
            'survey_id' => 10,
            'questions_data' =>
            '{
                "tam": {
                    "tamPU1": "Saya tidak mengalami kesulitan menggunakan Aplikasi Kuliner.",
                    "tamPU2": "Dengan adanya Aplikasi Kuliner dapat mencapai tujuan pekerjaan saya.",
                    "tamPU3": "Secara keseluruhan Saya merasa Aplikasi Kuliner mudah dipahami.",
                    "tamPEU4": "Aplikasi Kuliner ini menjadikan pekerjaan saya lebih mudah.",
                    "tamPEU5": "Menggunakan Aplikasi Kuliner dapat meningkatkan kemampuan saya.",
                    "tamPEU6": "Secara keseluruhan saya merasa Aplikasi Kuliner memiliki banyak manfaat.",
                    "tamATU7": "Saya menerima penerapan Aplikasi Kuliner ini",
                    "tamATU8": "Saya menolak untuk menggunkan Aplikasi Kuliner selain ini",
                    "tamATU9": "Secara keseluruhan saya menikmati penggunaan Aplikasi Kuliner ini",
                    "tamBI10": "Saya berharap Aplikasi Kuliner ini akan selalu digunakan di masa depan.",
                    "tamBI11": "Saya termotivasi untuk tetap menggunakan Aplikasi Kuliner untuk dimasa yang akan datang.",
                    "tamBI12": "Saya selalu menggunakan Aplikasi Kuliner ini dalam kondisi apapun.",
                    "tamASU13": "Saya menggunakan Aplikasi Kuliner ini sesuai dengan prosedur yang telah diberikan.",
                    "tamASU14": "Saya menggunakan Aplikasi Kuliner ini secara jujur sesuai ketentuan dan prosedur.",
                    "tamASU15": "Saya menggunakan Aplikasi Kuliner ini sesuai dengan durasi waktu yang telah ditentukan secara real time."
                }
            }',
        ]);
    }
}
