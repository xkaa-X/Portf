<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    //
    protected $fillable = [
    'user_id', 'role', 'tech_stack', 'instagram_link', 'about_me', 
    'location', 'phone_contact', 'programming_skills', 'title', 'description', 'github_link', 'demo_link'
];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
