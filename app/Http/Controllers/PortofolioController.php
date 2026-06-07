<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use ZipArchive;

class PortofolioController extends Controller
{
    // Memproses data form dari dashboard
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'role' => 'required|string|max:255',
            'tech_stack' => 'required|string|max:255',
            'instagram_link' => 'nullable|url',
            'about_me' => 'required|string',
            'location' => 'required|string|max:255',
            'phone_contact' => 'required|string|max:255',
            'programming_skills' => 'required|array', // Validasi input berupa array
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'github_link' => 'nullable|url',
            'demo_link' => 'nullable|url',
        ]);

        // Satukan array pilihan keahlian menjadi string terpisah koma (misal: "Laravel, PHP")
        $validated['programming_skills'] = implode(', ', $request->programming_skills);

        // Buat data project ke database dengan menyertakan user_id yang sedang login
        $project = Project::create(array_merge($validated, ['user_id' => Auth::id()]));

        // Alihkan user langsung ke halaman portofolio hasil jadi
        return redirect()->route('portofolio.show', $project->id);
    }

    // Menampilkan halaman portofolio visual premium hasil generate
    public function show($id)
    {
        $project = Project::with('user')->findOrFail($id);
        return view('generated_portfolio', compact('project'));
    }

    // Mengompilasi dan mengunduh berkas web statis berbentuk .ZIP menggunakan sistem operasi (CLI zip)
    public function downloadZip($id)
    {
        $project = Project::with('user')->findOrFail($id);
        
        $fileName = 'Portfolio_' . str_replace(' ', '_', $project->user->name) . '.zip';
        $zipPath = storage_path('app/public/' . $fileName);

        // Render keseluruhan tampilan web yang mewah secara utuh ke dalam satu file HTML
        $isDownload = true;
        $htmlContent = view('generated_portfolio', compact('project', 'isDownload'))->render();

        // Menggunakan sistem direktori temporary untuk zip
        $tempDir = storage_path('app/public/temp_' . uniqid());
        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0777, true);
        }
        
        // Tulis file HTML ke dalam direktori temporary
        file_put_contents($tempDir . '/index.html', $htmlContent);
        
        // Karena ekstensi ZipArchive tidak tersedia di server, gunakan command line system 'zip'
        exec("cd " . escapeshellarg($tempDir) . " && zip -q -r " . escapeshellarg($zipPath) . " index.html");
        
        // Hapus file temporary
        \Illuminate\Support\Facades\File::deleteDirectory($tempDir);

        return response()->download($zipPath)->deleteFileAfterSend(true);
    }
}  