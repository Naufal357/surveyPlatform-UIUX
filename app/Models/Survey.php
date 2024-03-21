<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'image',
        'theme',
        'description',
        'url_website',
        'embed_design',
        'embed_prototype',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function surveyResponses()
    {
        return $this->hasMany(SurveyResponses::class);
    }

    public function methods()
    {
        return $this->belongsToMany(Method::class, 'survey_has_methods', 'survey_id', 'method_id');
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($image) => asset('storage/image/surveys/' . $image),
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => \Carbon\Carbon::parse($value)->timezone('Asia/Jakarta')->translatedFormat('H:i \W\I\B d/m/Y'),
        );
    }

    protected function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => \Carbon\Carbon::parse($value)->timezone('Asia/Jakarta')->translatedFormat('H:i \W\I\B d/m/Y'),
        );
    }

    public function getTitleAndResponseCount()
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'response_count' => $this->surveyResponses()->count(),
        ];
    }
}
