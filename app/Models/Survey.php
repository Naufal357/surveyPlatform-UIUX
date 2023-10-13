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
        'image',
        'theme',
        'description',
        'embed_design',
        'embed_prototype',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($image) => asset('storage/surveys/' . $image),
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => \Carbon\Carbon::parse($value)->timezone('Asia/Jakarta')->translatedFormat('H:i:s d F Y').' WIB',
        );
    }

    protected function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => \Carbon\Carbon::parse($value)->timezone('Asia/Jakarta')->translatedFormat('H:i:s d/m/Y').' WIB',
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

    public function surveyResponses()
    {
        return $this->hasMany(SurveyResponses::class);
    }

}
