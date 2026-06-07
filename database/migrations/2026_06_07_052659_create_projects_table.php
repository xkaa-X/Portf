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
        $table->string('name');
        $table->string('role');
        $table->text('bio');
        $table->string('avatar')->nullable(); // Kolom penampung foto (boleh kosong)
        $table->text('skills');
        $table->string('github')->nullable();
        $table->string('linkedin')->nullable();
        $table->string('project_title');
        $table->text('project_desc');
        $table->string('project_link')->nullable();
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
