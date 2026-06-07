<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atelier Suite | Premium Portfolio Generator</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
    </style>
</head>
<body class="bg-[#060606] text-zinc-100 min-h-screen relative overflow-x-hidden">

    <nav class="border-b border-zinc-900/80 bg-[#0c0c0c]/80 backdrop-blur-md sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="text-2xl font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 font-bold">Portf.</span>
            </div>
            <div class="flex items-center gap-6">
                <span class="text-xs text-zinc-400">Salutations, <span class="text-amber-400">{{ Auth::user()->name }}</span></span>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="text-[11px] uppercase tracking-widest text-zinc-500 hover:text-red-400 transition duration-300 bg-transparent border border-zinc-800 px-4 py-2 rounded-full cursor-pointer">Leave</button>
                </form>
            </div>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto px-6 py-16 relative z-10">
        <div class="bg-[#0d0d0d] border border-zinc-900 rounded-2xl p-8 md:p-12 shadow-2xl">
            <form id="portfolioForm" action="/generate_portofolio" method="POST" class="space-y-8">
                @csrf
                
                <div class="border-b border-zinc-900 pb-4">
                    <h3 class="text-sm font-serif text-amber-400/90 tracking-wider mb-1">01. Identity & Socials</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label class="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Gelar / Role</label>
                        <input type="text" name="role" placeholder="e.g. Fullstack Developer" required class="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/50">
                    </div>
                    <div>
                        <label class="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Tech Stack Utama</label>
                        <input type="text" name="tech_stack" placeholder="e.g. Laravel, Tailwind" required class="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/50">
                    </div>
                    <div>
                        <label class="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Link Instagram</label>
                        <input type="url" name="instagram_link" placeholder="https://instagram.com/..." class="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/50">
                    </div>
                </div>

                <div class="border-b border-zinc-900 pt-4 pb-4">
                    <h3 class="text-sm font-serif text-amber-400/90 tracking-wider mb-1">02. Biography & Contact</h3>
                </div>
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Tentang Saya</label>
                        <textarea name="about_me" rows="3" placeholder="Ceritakan latar belakang profesional Anda..." required class="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/50"></textarea>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Lokasi Terkini</label>
                            <input type="text" name="location" placeholder="e.g. Jakarta, Indonesia" required class="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/50">
                        </div>
                        <div>
                            <label class="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">No. Kontak</label>
                            <input type="text" name="phone_contact" placeholder="e.g. +62 812..." required class="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/50">
                        </div>
                    </div>
                </div>

                <div class="border-b border-zinc-900 pt-4 pb-4">
                    <h3 class="text-sm font-serif text-amber-400/90 tracking-wider mb-1">03. Professional Competencies</h3>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    <label class="relative flex items-center gap-3 bg-[#111111] border border-zinc-800 rounded-xl p-4 cursor-pointer select-none transition duration-300 hover:border-amber-500/30 has-[:checked]:border-amber-500 group">
                        <input type="checkbox" name="programming_skills[]" value="Laravel" class="hidden peer">
                        <svg class="w-5 h-5 text-zinc-500 peer-checked:text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M5.47 11.23L1.13 8.7a1.66 1.66 0 0 1 0-2.88l4.34-2.52a1.65 1.65 0 0 1 1.66 0l4.33 2.52a1.66 1.66 0 0 1 0 2.88l-4.33 2.53a1.65 1.65 0 0 1-1.66 0zM17.13 18l-4.34-2.52a1.66 1.66 0 0 1 0-2.88l4.34-2.53a1.65 1.65 0 0 1 1.66 0l4.34 2.53a1.66 1.66 0 0 1 0 2.88l-4.34 2.52a1.65 1.65 0 0 1-1.66 0zm0-9.77l-4.34-2.52a1.66 1.66 0 0 1 0-2.88l4.34-2.53a1.65 1.65 0 0 1 1.66 0l4.34 2.53a1.66 1.66 0 0 1 0 2.88l-4.34 2.52a1.65 1.65 0 0 1-1.66 0z"/></svg>
                        <span class="text-xs font-mono text-zinc-400">Laravel</span>
                    </label>
                    <label class="relative flex items-center gap-3 bg-[#111111] border border-zinc-800 rounded-xl p-4 cursor-pointer select-none transition duration-300 hover:border-amber-500/30 has-[:checked]:border-amber-500 group">
                        <input type="checkbox" name="programming_skills[]" value="PHP" class="hidden peer">
                        <svg class="w-5 h-5 text-zinc-500 peer-checked:text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1.69 12.38c-.37.45-.82.68-1.37.68h-1c-.13 0-.25-.05-.34-.14a.5.5 0 0 1-.14-.34l.43-3c.02-.15.1-.27.24-.37A.88.88 0 0 1 12 9.1c.36 0 .68.08.94.24s.45.39.55.7c.07.24.05.52-.05.86c-.1.32-.35.82-.75 1.48z"/></svg>
                        <span class="text-xs font-mono text-zinc-400">PHP</span>
                    </label>
                    <label class="relative flex items-center gap-3 bg-[#111111] border border-zinc-800 rounded-xl p-4 cursor-pointer select-none transition duration-300 hover:border-amber-500/30 has-[:checked]:border-amber-500 group">
                        <input type="checkbox" name="programming_skills[]" value="JavaScript" class="hidden peer">
                        <svg class="w-5 h-5 text-zinc-500 peer-checked:text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm12.53 13.1c-.2-.33-.53-.55-.95-.65c-.32-.08-.72-.15-1.22-.22c-.5-.06-.87-.15-1.11-.27c-.32-.15-.48-.4-.48-.73c0-.25.1-.47.33-.63c.22-.17.53-.25.92-.25c.38 0 .68.1.9.3c.22.2.35.53.38.98h1.8c-.03-.86-.33-1.52-.92-1.97c-.58-.45-1.37-.68-2.35-.68c-1.02 0-1.8.25-2.33.75c-.53.5-.8 1.15-.8 1.95c0 .73.22 1.3.65 1.68c.43.38 1.07.65 1.92.82c.85.17 1.43.3(1.75).4c.4.1.7.27.87.52c.17.25.25.57.25.95c0 .4-.15.73-.45.98c-.3.25-.73.38-1.28.38c-.62 0-1.08-.15-1.38-.45c-.3-.3-.47-.78-.5-1.45H7.3c.03.95.37 1.67 1.02 2.13c.65.47 1.55.7 2.7.7c1.13 0 2.02-.27 2.65-.8c.63-.54.95-1.27.95-2.18c0-.7-.2-1.23-.62-1.58z"/></svg>
                        <span class="text-xs font-mono text-zinc-400">JS</span>
                    </label>
                    <label class="relative flex items-center gap-3 bg-[#111111] border border-zinc-800 rounded-xl p-4 cursor-pointer select-none transition duration-300 hover:border-amber-500/30 has-[:checked]:border-amber-500 group">
                        <input type="checkbox" name="programming_skills[]" value="Python" class="hidden peer">
                        <svg class="w-5 h-5 text-zinc-500 peer-checked:text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1.63 4.25c.44 0 .8.36.8.8s-.36.8-.8.8s-.8-.36-.8-.8s.36-.8.8-.8zM9.5 16.5c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1z"/></svg>
                        <span class="text-xs font-mono text-zinc-400">Python</span>
                    </label>
                    <label class="relative flex items-center gap-3 bg-[#111111] border border-zinc-800 rounded-xl p-4 cursor-pointer select-none transition duration-300 hover:border-amber-500/30 has-[:checked]:border-amber-500 group">
                        <input type="checkbox" name="programming_skills[]" value="HTML_CSS" class="hidden peer">
                        <svg class="w-5 h-5 text-zinc-500 peer-checked:text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h20l-1.8 15.2L12 22l-8.2-3.8L2 3zm14.3 5H8.4l.2 2h7.5l-.6 6.1L12 17.5l-3.5-1.4-.2-2.5h2l.1 1.2 1.6.6 1.7-.6.2-2.4H8.8l-.4-4.4h8.3l-.4 2z"/></svg>
                        <span class="text-xs font-mono text-zinc-400">HTML/CSS</span>
                    </label>
                </div>

                <div class="border-b border-zinc-900 pt-4 pb-4">
                    <h3 class="text-sm font-serif text-amber-400/90 tracking-wider mb-1">04. Core Masterpiece</h3>
                </div>
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Judul Proyek Terbaik</label>
                        <input type="text" name="title" placeholder="e.g. Core Enterprise ERP Architecture" required class="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/50">
                    </div>
                    <div>
                        <label class="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Deskripsi Proyek</label>
                        <textarea name="description" rows="4" placeholder="Masalah apa yang Anda pecahkan secara komprehensif?" required class="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/50"></textarea>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Link GitHub Proyek</label>
                            <input type="url" name="github_link" placeholder="https://github.com/..." class="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/50">
                        </div>
                        <div>
                            <label class="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Link Live Demo</label>
                            <input type="url" name="demo_link" placeholder="https://..." class="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/50">
                        </div>
                    </div>
                </div>

                <div class="pt-8 border-t border-zinc-900/60 flex justify-end">
                    <button type="submit" class="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-semibold uppercase tracking-widest text-xs rounded-xl hover:brightness-110 transition duration-300 shadow-xl cursor-pointer">Mulai Merakit Portofolio</button>
                </div>
            </form>
        </div>
    </main>

    <div id="loadingOverlay" class="fixed inset-0 bg-[#060606]/98 hidden flex-col items-center justify-center z-50">
        <div class="text-center max-w-md w-full px-8">
            <div class="w-12 h-12 border border-zinc-800 border-t-amber-400 rounded-full animate-spin mx-auto mb-8"></div>
            <h3 class="text-2xl font-serif text-amber-300 font-medium mb-3 tracking-wide">Merangkai Kode Portofolio</h3>
            <div class="w-full bg-zinc-950 rounded-full h-[3px] overflow-hidden border border-zinc-900">
                <div id="progressBar" class="bg-gradient-to-r from-amber-600 to-amber-400 h-full w-0 transition-all duration-1000 ease-linear"></div>
            </div>
            <div class="flex justify-between items-center mt-3 font-mono text-[10px] text-zinc-500">
                <span class="uppercase tracking-widest">Status: Compiling Assets</span>
                <span id="progressText">0%</span>
            </div>
        </div>
    </div>

    <script>
        const form = document.getElementById('portfolioForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('loadingOverlay').classList.remove('hidden');
            document.getElementById('loadingOverlay').classList.add('flex');
            
            let progress = 0;
            const progressBar = document.getElementById('progressBar');
            const progressText = document.getElementById('progressText');
            
            const interval = setInterval(() => {
                progress++;
                progressBar.style.width = progress + '%';
                progressText.innerText = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    HTMLFormElement.prototype.submit.call(form);
                }
            }, 600); // 60 detik total
        });
    </script>
</body>
</html>