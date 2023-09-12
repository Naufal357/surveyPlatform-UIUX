<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class SurveyResponses extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'age',
        'gender',
        'profession',
        'educational_background',
        'response_data',
        'survey_id',
    ];

    protected $casts = [
        'responses_data' => 'json', // Cast responses_data sebagai JSON
    ];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }
}
