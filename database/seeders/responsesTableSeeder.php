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
            'response_data' => '{"sus": {
                                    "sus1": 5,
                                    "sus2": 1,
                                    "sus3": 5,
                                    "sus4": 2,
                                    "sus5": 4,
                                    "sus6": 3,
                                    "sus7": 2,
                                    "sus8": 4,
                                    "sus9": 2,
                                    "sus10": 4
                                },
                                "tam": {
                                    "tam1": 5,
                                    "tam2": 2,
                                    "tam3": 4,
                                    "tam4": 3,
                                    "tam5": 2,
                                    "tam6": 4,
                                    "tam7": 2,
                                    "tam8": 4,
                                    "tam9": 2,
                                    "tam10": 4,
                                    "tam11": 2,
                                    "tam12": 4,
                                    "tam13": 5,
                                    "tam14": 5,
                                    "tam15": 5,
                                    "tam16": 3,
                                    "tam17": 4,
                                    "tam18": 3,
                                    "tam19": 4,
                                    "tam20": 3,
                                    "tam21": 5,
                                    "tam22": 5,
                                    "tam23": 4
                                }
                            }',
            'survey_id' => 1
        ]);

        SurveyResponses::create([
            'first_name' => 'Jane',
            'surname' => 'Doe',
            'email' => 'jane.doe@example.com',
            'birth_date' => '1990-12-31',
            'gender' => 'Female',
            'profession' => 'other',
            'educational_background' => "Master's Degree",
            'response_data' => '{"sus": {
                            "sus1": 3,
                            "sus2": 4,
                            "sus3": 2,
                            "sus4": 1,
                            "sus5": 5,
                            "sus6": 4,
                            "sus7": 3,
                            "sus8": 5,
                            "sus9": 2,
                            "sus10": 4
                        },
                        "tam": {
                            "tam1": 4,
                            "tam2": 3,
                            "tam3": 5,
                            "tam4": 2,
                            "tam5": 4,
                            "tam6": 3,
                            "tam7": 5,
                            "tam8": 2,
                            "tam9": 4,
                            "tam10": 3,
                            "tam11": 5,
                            "tam12": 2,
                            "tam13": 5,
                            "tam14": 5,
                            "tam15": 5,
                            "tam16": 3,
                            "tam17": 4,
                            "tam18": 3,
                            "tam19": 4,
                            "tam20": 3,
                            "tam21": 5,
                            "tam22": 5,
                            "tam23": 4
                        }
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
            'response_data' => '{"sus": {
                            "sus1": 3,
                            "sus2": 2,
                            "sus3": 4,
                            "sus4": 5,
                            "sus5": 3,
                            "sus6": 4,
                            "sus7": 2,
                            "sus8": 3,
                            "sus9": 4,
                            "sus10": 2
                        },
                        "tam": {
                            "tam1": 4,
                            "tam2": 3,
                            "tam3": 5,
                            "tam4": 2,
                            "tam5": 4,
                            "tam6": 3,
                            "tam7": 5,
                            "tam8": 2,
                            "tam9": 4,
                            "tam10": 3,
                            "tam11": 5,
                            "tam12": 2,
                            "tam13": 5,
                            "tam14": 5,
                            "tam15": 5,
                            "tam16": 3,
                            "tam17": 4,
                            "tam18": 3,
                            "tam19": 4,
                            "tam20": 3,
                            "tam21": 5,
                            "tam22": 5,
                            "tam23": 4
                        }
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
            'response_data' => '{"sus": {
                            "sus1": 5,
                            "sus2": 4,
                            "sus3": 3,
                            "sus4": 2,
                            "sus5": 1,
                            "sus6": 5,
                            "sus7": 4,
                            "sus8": 3,
                            "sus9": 2,
                            "sus10": 1
                        },
                        "tam": {
                            "tam1": 3,
                            "tam2": 2,
                            "tam3": 4,
                            "tam4": 1,
                            "tam5": 3,
                            "tam6": 2,
                            "tam7": 4,
                            "tam8": 1,
                            "tam9": 3,
                            "tam10": 2,
                            "tam11": 4,
                            "tam12": 1,
                            "tam13": 5,
                            "tam14": 5,
                            "tam15": 5,
                            "tam16": 3,
                            "tam17": 4,
                            "tam18": 3,
                            "tam19": 4,
                            "tam20": 3,
                            "tam21": 5,
                            "tam22": 5,
                            "tam23": 4
                        }
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
            'response_data' => '{"sus": {
                            "sus1": 4,
                            "sus2": 3,
                            "sus3": 5,
                            "sus4": 2,
                            "sus5": 4,
                            "sus6": 3,
                            "sus7": 4,
                            "sus8": 5,
                            "sus9": 3,
                            "sus10": 4
                        },
                        "tam": {
                            "tam1": 5,
                            "tam2": 4,
                            "tam3": 3,
                            "tam4": 2,
                            "tam5": 4,
                            "tam6": 3,
                            "tam7": 5,
                            "tam8": 4,
                            "tam9": 3,
                            "tam10": 5,
                            "tam11": 2,
                            "tam12": 3,
                            "tam13": 5,
                            "tam14": 5,
                            "tam15": 5,
                            "tam16": 3,
                            "tam17": 4,
                            "tam18": 3,
                            "tam19": 4,
                            "tam20": 3,
                            "tam21": 5,
                            "tam22": 5,
                            "tam23": 4
                        }
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
            'response_data' => '{"sus": {
                            "sus1": 3,
                            "sus2": 2,
                            "sus3": 4,
                            "sus4": 5,
                            "sus5": 3,
                            "sus6": 4,
                            "sus7": 2,
                            "sus8": 3,
                            "sus9": 4,
                            "sus10": 2
                        },
                        "tam": {
                            "tam1": 5,
                            "tam2": 5,
                            "tam3": 5,
                            "tam4": 5,
                            "tam5": 5,
                            "tam6": 5,
                            "tam7": 5,
                            "tam8": 5,
                            "tam9": 5,
                            "tam10": 5,
                            "tam11": 5,
                            "tam12": 5,
                            "tam13": 5,
                            "tam14": 5,
                            "tam15": 5,
                            "tam16": 5,
                            "tam17": 5,
                            "tam18": 5,
                            "tam19": 5,
                            "tam20": 5,
                            "tam21": 5,
                            "tam22": 5,
                            "tam23": 5
                        }
                    }',
            'survey_id' => 1
        ]);
    }
}
