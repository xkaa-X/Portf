<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PortofolioController;
use Illuminate\Support\Facades\Route;

// Halaman depan utama adalah Landing Page Luxury
Route::get('/', function () {
    return view('welcome');
})->name('welcome');

// Halaman Dashboard Pengisian Form (Wajib Login & Terverifikasi)
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Proses pengiriman data form dashboard (Wajib Login)
Route::post('/generate_portofolio', [PortofolioController::class, 'generate'])->middleware('auth');

// Manajemen Profil (Bawaan Laravel Breeze)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Penayangan Hasil Portofolio & Unduhan Berkas ZIP Sumber Kode
Route::get('/portofolio/{id}', [PortofolioController::class, 'show'])->name('portofolio.show');
Route::get('/portofolio/download/{id}', [PortofolioController::class, 'downloadZip'])->name('portofolio.download')->middleware('auth');

require __DIR__.'/auth.php';