<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PortofolioController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Halaman Landing Page Utama (Welcome) - Terbuka untuk Publik
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'navItems' => []
    ]);
})->name('welcome');

// Halaman Live Preview Hasil Portfolio Visual - Terbuka untuk Publik
Route::get('/portofolio/{id}', [PortofolioController::class, 'show'])->name('portofolio.show');


// ==========================================================================
// PROTECTED ROUTES (Hanya Bisa Diakses Setelah User Login / Authenticated)
// ==========================================================================
Route::middleware(['auth'])->group(function () {
    
    // 1. Dashboard Atelier Studio
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // 2. Alur Pengolahan Portofolio (Konsep Aman Anti-Error MethodNotAllowed)
    // Jalur POST untuk memproses data form dari React Dashboard
    Route::post('/generate_portofolio', [PortofolioController::class, 'generate'])->name('portofolio.generate');
    
    // JALUR GET BARU: Untuk mendaratkan halaman sukses Inertia (React Bits Ticker)
    Route::get('/generate_portofolio/success/{id}', [PortofolioController::class, 'result'])->name('portofolio.result');
    
    // Jalur untuk mendownload file hasil kompresi berkas .ZIP
    Route::get('/portofolio/download/{id}', [PortofolioController::class, 'downloadZip'])->name('portofolio.download');

    // 3. Manajemen Profile Bawaan Laravel Breeze
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Memuat Route Otentikasi Bawaan (Login, Register, Logout dari auth.php)
require __DIR__.'/auth.php';