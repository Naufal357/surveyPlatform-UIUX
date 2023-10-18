<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\Models\Survey; 

class SurveyFactory extends Factory
{
    protected $model = Survey::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'image' => 'surveyFactory.jpg',
            'theme' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'embed_design' => '<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FZBrJoFQclkOJHt8c13WjO0%2FMobile-E-Commerce---Porto-Naufal%3Ftype%3Ddesign%26node-id%3D6%253A5%26mode%3Ddesign%26t%3DMS0FsghvdchwVDS1-1" allowfullscreen></iframe>',
            'embed_prototype' => '<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FZBrJoFQclkOJHt8c13WjO0%2FMobile-E-Commerce---Porto-Naufal%3Fnode-id%3D6-5%26starting-point-node-id%3D6%253A5%26mode%3Ddesign%26t%3DqRgJWypwu4mOdUCX-1" allowfullscreen></iframe>',
            'user_id' => 1,
        ];
    }
}

