<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class PortofolioController extends Controller
{    
    /**
     * 1. Memproses data form dari React Dashboard (Method: POST)
     */
    public function generate(Request $request)
    {
        // Validasi data yang masuk dari formulir React Dock
        $request->validate([
            'name'          => 'required|string|max:255',
            'role'          => 'required|string|max:255',
            'bio'           => 'required|string',
            'avatar'        => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Validasi file foto muka
            'skills'        => 'required|string',
            'github'        => 'nullable|url',
            'linkedin'      => 'nullable|url',
            'project_title' => 'required|string|max:255',
            'project_desc'  => 'required|string',
            'project_link'  => 'nullable|url',
            'location'      => 'nullable|string|max:255',
            'contact'       => 'nullable|string|max:255',
        ]);

        // Menangani penyimpanan file gambar muka (avatar) jika diunggah
        $avatarUrl = null;
        if ($request->hasFile('avatar')) {
            // Menyimpan file di folder storage/app/public/avatars
            $path = $request->file('avatar')->store('avatars', 'public');
            // Mengubah nilai menjadi URL publik asset
            $avatarUrl = Storage::url($path);
        }

        // --- PERUBAHAN DI SINI (Eksplisit Mapping) ---
        // Kita petakan satu per satu agar data dipastikan masuk ke database dengan selamat
        $project = Project::create([
            'user_id'       => Auth::id(),
            'name'          => $request->input('name'),
            'role'          => $request->input('role'),
            'bio'           => $request->input('bio'),
            'avatar'        => $avatarUrl, // Memasukkan string URL, bukan object file
            'skills'        => $request->input('skills'),
            'github'        => $request->input('github'),
            'linkedin'      => $request->input('linkedin'),
            'project_title' => $request->input('project_title'),
            'project_desc'  => $request->input('project_desc'),
            'project_link'  => $request->input('project_link'),
            'location'      => $request->input('location'),
            'contact'       => $request->input('contact'),
        ]);

        // Alihkan (Redirect) ke route GET halaman sukses menggunakan Pola PRG agar aman dari eror Refresh
        return redirect()->route('portofolio.result', $project->id);
    }

    /**
     * 2. Menampilkan halaman sukses kompilasi (Method: GET)
     */
    public function result($id)
    {
        // Memastikan data project ada di database
        $project = Project::findOrFail($id);

        // Render halaman GenerateResult.jsx menggunakan Inertia
        return Inertia::render('GenerateResult', [
            'downloadUrl' => route('portofolio.download', $project->id),
            'portfolioId' => $project->id
        ]);
    }

    /**
     * 3. Menampilkan halaman preview portofolio visual premium (Live Preview)
     */
    public function show($id)
    {
        // Mengambil data portfolio beserta relasi user
        $project = Project::with('user')->findOrFail($id);
        
        // REVISI: Menggunakan Inertia untuk memanggil PortfolioShow.jsx secara aman
        return Inertia::render('PortfolioShow', [
            'project' => $project
        ]);
    }
    /**
     * 4. Mengompilasi dan mengunduh berkas web statis berbentuk .ZIP (CLI zip)
     */
    public function downloadZip($id)
    {
        $project = Project::with('user')->findOrFail($id);
        
        // Menyusun nama berkas ZIP yang bersih berdasarkan nama user
        $safeName = str_replace(' ', '_', $project->name ?? $project->user->name);
        $fileName = 'Portfolio_' . $safeName . '.zip';
        $zipPath = storage_path('app/public/' . $fileName);

        // Render visual halaman web Blade utuh menjadi data string HTML
        $isDownload = true;
        $htmlContent = view('generated_portfolio', compact('project', 'isDownload'))->render();

        // Menyiapkan direktori pengerjaan sementara (Temporary Directory)
        $tempDir = storage_path('app/public/temp_' . uniqid());
        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0777, true);
        }
        
        // Tulis string HTML tadi menjadi sebuah file bernama index.html di dalam folder temp
        file_put_contents($tempDir . '/index.html', $htmlContent);
        
        // JIKA USER UNGGAH FOTO: Masukkan berkas foto tersebut ke dalam arsip ZIP secara lokal
        if ($project->avatar) {
            // Dapatkan path lokal asli dari string URL symlink
            $localAvatarPath = str_replace('/storage/', '', $project->avatar);
            
            if (Storage::disk('public')->exists($localAvatarPath)) {
                // Buat struktur folder penampung asset di dalam folder temp ZIP
                mkdir($tempDir . '/assets', 0777, true);
                
                // Salin file foto dari storage Laravel ke dalam folder temp ZIP
                File::copy(
                    storage_path('app/public/' . $localAvatarPath), 
                    $tempDir . '/assets/avatar.png'
                );
            }
        }
        
        // Menjalankan utilitas kompresi sistem operasi via Command Line (CLI Zip)
        exec("cd " . escapeshellarg($tempDir) . " && zip -q -r " . escapeshellarg($zipPath) . " .");
        
        // Bersihkan seluruh folder temporary yang sudah tidak terpakai agar server tidak penuh
        File::deleteDirectory($tempDir);

        // Unduh berkas ZIP hasil kompresi dan hapus file ZIP tersebut dari server segera setelah terkirim
        return response()->download($zipPath)->deleteFileAfterSend(true);
    }
}