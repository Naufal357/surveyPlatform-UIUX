<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SurveyResponses;

class responsesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SurveyResponses::create([
            'first_name' => 'Rizki',
            'surname' => 'Hidayat',
            'email' => 'k9qFP@example.com',
            'birth_date' => '2002-05-17',
            'gender' => 'Male',
            'profession' => 'Student',
            'educational_background' => "Bachelor's Degree",
            'response_data' => '{
                                    "sus": {
                                        "sus1": 1,
                                        "sus2": 3,
                                        "sus3": 3,
                                        "sus4": 1,
                                        "sus5": 3,
                                        "sus6": 2,
                                        "sus7": 2,
                                        "sus8": 5,
                                        "sus9": 3,
                                        "sus10": 4
                                    },
                                    "tam": [
                                        {
                                        "name": "PEU",
                                        "responses": [
                                            {
                                            "name": "Kemudahan dipelajari",
                                            "value": [
                                                [
                                                "tam1",
                                                2
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah dipahami/dimengerti",
                                            "value": [
                                                [
                                                "tam2",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah sehingga mahir",
                                            "value": [
                                                [
                                                "tam3",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah digunakan",
                                            "value": [
                                                [
                                                "tam4",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah dikendalikan",
                                            "value": [
                                                [
                                                "tam5",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah diingat",
                                            "value": [
                                                [
                                                "tam6",
                                                3
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "PU",
                                        "responses": [
                                            {
                                            "name": "Lebih cepat",
                                            "value": [
                                                [
                                                "tam7",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Meningkatkan kinerja",
                                            "value": [
                                                [
                                                "tam8",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Meningkatkan produktivitas",
                                            "value": [
                                                [
                                                "tam9",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Meningkatkan efektivitas",
                                            "value": [
                                                [
                                                "tam10",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Lebih mudah",
                                            "value": [
                                                [
                                                "tam11",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Bermanfaat",
                                            "value": [
                                                [
                                                "tam12",
                                                4
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "ATU",
                                        "responses": [
                                            {
                                            "name": "Rasa senang",
                                            "value": [
                                                [
                                                "tam13",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Menikmati",
                                            "value": [
                                                [
                                                "tam14",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Rasa bosan",
                                            "value": [
                                                [
                                                "tam15",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Tidak suka",
                                            "value": [
                                                [
                                                "tam16",
                                                2
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "BI",
                                        "responses": [
                                            {
                                            "name": "Menggunakan kapan saja",
                                            "value": [
                                                [
                                                "tam17",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Menggunakan kondisi apapun",
                                            "value": [
                                                [
                                                "tam18",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Niat menggunakan terus",
                                            "value": [
                                                [
                                                "tam19",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Berharap menggunakan",
                                            "value": [
                                                [
                                                "tam20",
                                                5
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "ASU",
                                        "responses": [
                                            {
                                            "name": "Frekuensi penggunaan",
                                            "value": [
                                                [
                                                "tam21",
                                                3
                                                ],
                                                [
                                                "tam22",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Durasi penggunaan",
                                            "value": [
                                                [
                                                "tam23",
                                                4
                                                ]
                                            ]
                                            }
                                        ]
                                        }
                                    ]
                                }',
            'survey_id' => 1
        ]);

        SurveyResponses::create([
            'first_name' => 'Jane',
            'surname' => 'Doe',
            'email' => 'jane.doe@example.com',
            'birth_date' => '1990-12-31',
            'gender' => 'Female',
            'profession' => 'Other',
            'educational_background' => "Master's Degree",
            'response_data' => '{
                                    "sus": {
                                        "sus1": 1,
                                        "sus2": 3,
                                        "sus3": 3,
                                        "sus4": 1,
                                        "sus5": 3,
                                        "sus6": 2,
                                        "sus7": 2,
                                        "sus8": 5,
                                        "sus9": 3,
                                        "sus10": 4
                                    },
                                    "tam": [
                                        {
                                        "name": "PEU",
                                        "responses": [
                                            {
                                            "name": "Kemudahan dipelajari",
                                            "value": [
                                                [
                                                "tam1",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah dipahami/dimengerti",
                                            "value": [
                                                [
                                                "tam2",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah sehingga mahir",
                                            "value": [
                                                [
                                                "tam3",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah digunakan",
                                            "value": [
                                                [
                                                "tam4",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah dikendalikan",
                                            "value": [
                                                [
                                                "tam5",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah diingat",
                                            "value": [
                                                [
                                                "tam6",
                                                5
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "PU",
                                        "responses": [
                                            {
                                            "name": "Lebih cepat",
                                            "value": [
                                                [
                                                "tam7",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Meningkatkan kinerja",
                                            "value": [
                                                [
                                                "tam8",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Meningkatkan produktivitas",
                                            "value": [
                                                [
                                                "tam9",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Meningkatkan efektivitas",
                                            "value": [
                                                [
                                                "tam10",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Lebih mudah",
                                            "value": [
                                                [
                                                "tam11",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Bermanfaat",
                                            "value": [
                                                [
                                                "tam12",
                                                4
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "ATU",
                                        "responses": [
                                            {
                                            "name": "Rasa senang",
                                            "value": [
                                                [
                                                "tam13",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Menikmati",
                                            "value": [
                                                [
                                                "tam14",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Rasa bosan",
                                            "value": [
                                                [
                                                "tam15",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Tidak suka",
                                            "value": [
                                                [
                                                "tam16",
                                                3
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "BI",
                                        "responses": [
                                            {
                                            "name": "Menggunakan kapan saja",
                                            "value": [
                                                [
                                                "tam17",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Menggunakan kondisi apapun",
                                            "value": [
                                                [
                                                "tam18",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Niat menggunakan terus",
                                            "value": [
                                                [
                                                "tam19",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Berharap menggunakan",
                                            "value": [
                                                [
                                                "tam20",
                                                5
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "ASU",
                                        "responses": [
                                            {
                                            "name": "Frekuensi penggunaan",
                                            "value": [
                                                [
                                                "tam21",
                                                3
                                                ],
                                                [
                                                "tam22",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Durasi penggunaan",
                                            "value": [
                                                [
                                                "tam23",
                                                4
                                                ]
                                            ]
                                            }
                                        ]
                                        }
                                    ]
                                }',
            'survey_id' => 1
        ]);

        SurveyResponses::create([
            'first_name' => 'Emily',
            'surname' => 'Johnson',
            'email' => 'emily.johnson@example.com',
            'birth_date' => '1998-03-20',
            'gender' => 'Female',
            'profession' => 'Private Worker',
            'educational_background' => "High School",
            'response_data' => '{
                                    "sus": {
                                        "sus1": 1,
                                        "sus2": 3,
                                        "sus3": 3,
                                        "sus4": 1,
                                        "sus5": 3,
                                        "sus6": 2,
                                        "sus7": 2,
                                        "sus8": 5,
                                        "sus9": 3,
                                        "sus10": 4
                                    },
                                    "tam": [
                                        {
                                        "name": "PEU",
                                        "responses": [
                                            {
                                            "name": "Kemudahan dipelajari",
                                            "value": [
                                                [
                                                "tam1",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah dipahami/dimengerti",
                                            "value": [
                                                [
                                                "tam2",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah sehingga mahir",
                                            "value": [
                                                [
                                                "tam3",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah digunakan",
                                            "value": [
                                                [
                                                "tam4",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah dikendalikan",
                                            "value": [
                                                [
                                                "tam5",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah diingat",
                                            "value": [
                                                [
                                                "tam6",
                                                5
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "PU",
                                        "responses": [
                                            {
                                            "name": "Lebih cepat",
                                            "value": [
                                                [
                                                "tam7",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Meningkatkan kinerja",
                                            "value": [
                                                [
                                                "tam8",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Meningkatkan produktivitas",
                                            "value": [
                                                [
                                                "tam9",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Meningkatkan efektivitas",
                                            "value": [
                                                [
                                                "tam10",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Lebih mudah",
                                            "value": [
                                                [
                                                "tam11",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Bermanfaat",
                                            "value": [
                                                [
                                                "tam12",
                                                4
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "ATU",
                                        "responses": [
                                            {
                                            "name": "Rasa senang",
                                            "value": [
                                                [
                                                "tam13",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Menikmati",
                                            "value": [
                                                [
                                                "tam14",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Rasa bosan",
                                            "value": [
                                                [
                                                "tam15",
                                                2
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Tidak suka",
                                            "value": [
                                                [
                                                "tam16",
                                                3
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "BI",
                                        "responses": [
                                            {
                                            "name": "Menggunakan kapan saja",
                                            "value": [
                                                [
                                                "tam17",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Menggunakan kondisi apapun",
                                            "value": [
                                                [
                                                "tam18",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Niat menggunakan terus",
                                            "value": [
                                                [
                                                "tam19",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Berharap menggunakan",
                                            "value": [
                                                [
                                                "tam20",
                                                5
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "ASU",
                                        "responses": [
                                            {
                                            "name": "Frekuensi penggunaan",
                                            "value": [
                                                [
                                                "tam21",
                                                3
                                                ],
                                                [
                                                "tam22",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Durasi penggunaan",
                                            "value": [
                                                [
                                                "tam23",
                                                4
                                                ]
                                            ]
                                            }
                                        ]
                                        }
                                    ]
                                    }',
            'survey_id' => 1
        ]);

        SurveyResponses::create([
            'first_name' => 'Michael',
            'surname' => 'Brown',
            'email' => 'michael.brown@example.com',
            'birth_date' => '1995-07-10',
            'gender' => 'Male',
            'profession' => 'Professor',
            'educational_background' => "Doctorate Degree",
            'response_data' => '{
                                    "sus": {
                                        "sus1": 1,
                                        "sus2": 3,
                                        "sus3": 3,
                                        "sus4": 1,
                                        "sus5": 3,
                                        "sus6": 2,
                                        "sus7": 2,
                                        "sus8": 5,
                                        "sus9": 3,
                                        "sus10": 4
                                    },
                                    "tam": [
                                        {
                                        "name": "PEU",
                                        "responses": [
                                            {
                                            "name": "Kemudahan dipelajari",
                                            "value": [
                                                [
                                                "tam1",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah dipahami/dimengerti",
                                            "value": [
                                                [
                                                "tam2",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah sehingga mahir",
                                            "value": [
                                                [
                                                "tam3",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah digunakan",
                                            "value": [
                                                [
                                                "tam4",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah dikendalikan",
                                            "value": [
                                                [
                                                "tam5",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Mudah diingat",
                                            "value": [
                                                [
                                                "tam6",
                                                3
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "PU",
                                        "responses": [
                                            {
                                            "name": "Lebih cepat",
                                            "value": [
                                                [
                                                "tam7",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Meningkatkan kinerja",
                                            "value": [
                                                [
                                                "tam8",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Meningkatkan produktivitas",
                                            "value": [
                                                [
                                                "tam9",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Meningkatkan efektivitas",
                                            "value": [
                                                [
                                                "tam10",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Lebih mudah",
                                            "value": [
                                                [
                                                "tam11",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Bermanfaat",
                                            "value": [
                                                [
                                                "tam12",
                                                4
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "ATU",
                                        "responses": [
                                            {
                                            "name": "Rasa senang",
                                            "value": [
                                                [
                                                "tam13",
                                                3
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Menikmati",
                                            "value": [
                                                [
                                                "tam14",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Rasa bosan",
                                            "value": [
                                                [
                                                "tam15",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Tidak suka",
                                            "value": [
                                                [
                                                "tam16",
                                                2
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "BI",
                                        "responses": [
                                            {
                                            "name": "Menggunakan kapan saja",
                                            "value": [
                                                [
                                                "tam17",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Menggunakan kondisi apapun",
                                            "value": [
                                                [
                                                "tam18",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Niat menggunakan terus",
                                            "value": [
                                                [
                                                "tam19",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Berharap menggunakan",
                                            "value": [
                                                [
                                                "tam20",
                                                5
                                                ]
                                            ]
                                            }
                                        ]
                                        },
                                        {
                                        "name": "ASU",
                                        "responses": [
                                            {
                                            "name": "Frekuensi penggunaan",
                                            "value": [
                                                [
                                                "tam21",
                                                3
                                                ],
                                                [
                                                "tam22",
                                                4
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Durasi penggunaan",
                                            "value": [
                                                [
                                                "tam23",
                                                4
                                                ]
                                            ]
                                            }
                                        ]
                                        }
                                    ]
                                }',
            'survey_id' => 1
        ]);

        SurveyResponses::create([
            'first_name' => 'David',
            'surname' => 'Lee',
            'email' => 'david.lee@example.com',
            'birth_date' => '1988-04-02',
            'gender' => 'Male',
            'profession' => 'Armed Forces',
            'educational_background' => "Associate's Degree",
            'response_data' => '{
                                "sus": {
                                    "sus1": 1,
                                    "sus2": 3,
                                    "sus3": 3,
                                    "sus4": 1,
                                    "sus5": 3,
                                    "sus6": 2,
                                    "sus7": 2,
                                    "sus8": 5,
                                    "sus9": 3,
                                    "sus10": 4
                                },
                                "tam": [
                                    {
                                    "name": "PEU",
                                    "responses": [
                                        {
                                        "name": "Kemudahan dipelajari",
                                        "value": [
                                            [
                                            "tam1",
                                            5
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Mudah dipahami/dimengerti",
                                        "value": [
                                            [
                                            "tam2",
                                            5
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Mudah sehingga mahir",
                                        "value": [
                                            [
                                            "tam3",
                                            4
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Mudah digunakan",
                                        "value": [
                                            [
                                            "tam4",
                                            4
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Mudah dikendalikan",
                                        "value": [
                                            [
                                            "tam5",
                                            3
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Mudah diingat",
                                        "value": [
                                            [
                                            "tam6",
                                            3
                                            ]
                                        ]
                                        }
                                    ]
                                    },
                                    {
                                    "name": "PU",
                                    "responses": [
                                        {
                                        "name": "Lebih cepat",
                                        "value": [
                                            [
                                            "tam7",
                                            5
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Meningkatkan kinerja",
                                        "value": [
                                            [
                                            "tam8",
                                            4
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Meningkatkan produktivitas",
                                        "value": [
                                            [
                                            "tam9",
                                            4
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Meningkatkan efektivitas",
                                        "value": [
                                            [
                                            "tam10",
                                            4
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Lebih mudah",
                                        "value": [
                                            [
                                            "tam11",
                                            3
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Bermanfaat",
                                        "value": [
                                            [
                                            "tam12",
                                            4
                                            ]
                                        ]
                                        }
                                    ]
                                    },
                                    {
                                    "name": "ATU",
                                    "responses": [
                                        {
                                        "name": "Rasa senang",
                                        "value": [
                                            [
                                            "tam13",
                                            3
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Menikmati",
                                        "value": [
                                            [
                                            "tam14",
                                            4
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Rasa bosan",
                                        "value": [
                                            [
                                            "tam15",
                                            4
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Tidak suka",
                                        "value": [
                                            [
                                            "tam16",
                                            2
                                            ]
                                        ]
                                        }
                                    ]
                                    },
                                    {
                                    "name": "BI",
                                        "responses": [
                                            {
                                            "name": "Menggunakan kapan saja",
                                            "value": [
                                                [
                                                "tam17",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Menggunakan kondisi apapun",
                                            "value": [
                                                [
                                                "tam18",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Niat menggunakan terus",
                                            "value": [
                                                [
                                                "tam19",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Berharap menggunakan",
                                            "value": [
                                                [
                                                "tam20",
                                                5
                                                ]
                                            ]
                                            }
                                        ]
                                    },
                                    {
                                    "name": "ASU",
                                    "responses": [
                                        {
                                        "name": "Frekuensi penggunaan",
                                        "value": [
                                            [
                                            "tam21",
                                            3
                                            ],
                                            [
                                            "tam22",
                                            4
                                            ]
                                        ]
                                        },
                                        {
                                        "name": "Durasi penggunaan",
                                        "value": [
                                            [
                                            "tam23",
                                            4
                                            ]
                                        ]
                                        }
                                    ]
                                    }
                                ]
                            }',
            'survey_id' => 1
        ]);

        SurveyResponses::create([
            'first_name' => 'Amanda',
            'surname' => 'Clark',
            'email' => 'amanda.clark@example.com',
            'birth_date' => '1992-09-18',
            'gender' => 'Female',
            'profession' => 'Police',
            'educational_background' => "Junior High School",
            'response_data' => '{
                                  "sus": {
                                    "sus1": 1,
                                    "sus2": 3,
                                    "sus3": 3,
                                    "sus4": 1,
                                    "sus5": 3,
                                    "sus6": 2,
                                    "sus7": 2,
                                    "sus8": 5,
                                    "sus9": 3,
                                    "sus10": 4
                                  },
                                  "tam": [
                                    {
                                      "name": "PEU",
                                      "responses": [
                                        {
                                          "name": "Kemudahan dipelajari",
                                          "value": [
                                            [
                                              "tam1",
                                              5
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Mudah dipahami/dimengerti",
                                          "value": [
                                            [
                                              "tam2",
                                              5
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Mudah sehingga mahir",
                                          "value": [
                                            [
                                              "tam3",
                                              4
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Mudah digunakan",
                                          "value": [
                                            [
                                              "tam4",
                                              4
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Mudah dikendalikan",
                                          "value": [
                                            [
                                              "tam5",
                                              3
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Mudah diingat",
                                          "value": [
                                            [
                                              "tam6",
                                              3
                                            ]
                                          ]
                                        }
                                      ]
                                    },
                                    {
                                      "name": "PU",
                                      "responses": [
                                        {
                                          "name": "Lebih cepat",
                                          "value": [
                                            [
                                              "tam7",
                                              5
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Meningkatkan kinerja",
                                          "value": [
                                            [
                                              "tam8",
                                              4
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Meningkatkan produktivitas",
                                          "value": [
                                            [
                                              "tam9",
                                              4
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Meningkatkan efektivitas",
                                          "value": [
                                            [
                                              "tam10",
                                              4
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Lebih mudah",
                                          "value": [
                                            [
                                              "tam11",
                                              3
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Bermanfaat",
                                          "value": [
                                            [
                                              "tam12",
                                              4
                                            ]
                                          ]
                                        }
                                      ]
                                    },
                                    {
                                      "name": "ATU",
                                      "responses": [
                                        {
                                          "name": "Rasa senang",
                                          "value": [
                                            [
                                              "tam13",
                                              3
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Menikmati",
                                          "value": [
                                            [
                                              "tam14",
                                              4
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Rasa bosan",
                                          "value": [
                                            [
                                              "tam15",
                                              4
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Tidak suka",
                                          "value": [
                                            [
                                              "tam16",
                                              2
                                            ]
                                          ]
                                        }
                                      ]
                                    },
                                    {
                                      "name": "BI",
                                        "responses": [
                                            {
                                            "name": "Menggunakan kapan saja",
                                            "value": [
                                                [
                                                "tam17",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Menggunakan kondisi apapun",
                                            "value": [
                                                [
                                                "tam18",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Niat menggunakan terus",
                                            "value": [
                                                [
                                                "tam19",
                                                5
                                                ]
                                            ]
                                            },
                                            {
                                            "name": "Berharap menggunakan",
                                            "value": [
                                                [
                                                "tam20",
                                                5
                                                ]
                                            ]
                                            }
                                        ]
                                    },
                                    {
                                      "name": "ASU",
                                      "responses": [
                                        {
                                          "name": "Frekuensi penggunaan",
                                          "value": [
                                            [
                                              "tam21",
                                              3
                                            ],
                                            [
                                              "tam22",
                                              4
                                            ]
                                          ]
                                        },
                                        {
                                          "name": "Durasi penggunaan",
                                          "value": [
                                            [
                                              "tam23",
                                              4
                                            ]
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }',
            'survey_id' => 1
        ]);
    }
}
