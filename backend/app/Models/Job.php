<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'salary',
        'company',
        'type',
        'paused',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'applications')->withTimestamps();
    }
}
