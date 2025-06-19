<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    /** @use HasFactory<\Database\Factories\PositionFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'contract',
        'type',
        'description',
        'requirements',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function candidates()
    {
        return $this->belongsToMany(User::class, 'applications')->withTimestamps();
    }
}
