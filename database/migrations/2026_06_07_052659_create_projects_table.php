<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // branding & medsos
            $table->string('role');
            $table->string('tech_stack');
            $table->string('instagram_link')->nullable();

            // Section tentang saya
            $table->text('about_me');
            $table->string('location')->nullable();
            $table->string('phone_contact');

            // Section : Skills
            $table->text('programming_skills');

            // Section: Masterpiece Project
            $table->string('title');
            $table->text('description');
            $table->string('github_link')->nullable();
            $table->string('demo_link')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
