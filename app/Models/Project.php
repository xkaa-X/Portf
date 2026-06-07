<?php

namespace App\Http\Controllers;

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /**
     * Kolom-kolom yang diizinkan untuk pengisian massal (Mass Assignment).
     * Telah disesuaikan dengan skema formulir React Atelier Suite yang baru.
     */
    protected $fillable = [
        'user_id',
        'name',
        'role',
        'bio',
        'avatar', // Kolom baru untuk menampung URL foto muka user
        'skills',
        'github',
        'linkedin',
        'project_title',
        'project_desc',
        'project_link',
        'location',
        'contact'
    ];

    /**
     * Relasi kebalikannya: Setiap portofolio project ini 
     * adalah milik (belongs to) satu User di aplikasi.
     */
    public function user() 
    {
        return $this->belongsTo(User::class);
    }
}