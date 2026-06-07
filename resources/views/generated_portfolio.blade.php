<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $project->user->name }} | Personal Portfolio Suite</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #040404; }
        .font-serif { font-family: 'Playfair Display', serif; }
    </style>
</head>
<body class="text-zinc-200 min-h-screen relative overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-300">

    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-500/[0.03] to-transparent blur-[120px] pointer-events-none"></div>

    <nav class="border-b border-zinc-900/50 bg-[#040404]/80 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="#biography" class="font-serif text-amber-400 font-medium text-base tracking-widest hover:opacity-80 transition">{{ $project->user->name }}</a>
            
            <div class="hidden md:flex items-center gap-8 text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
                <a href="#biography" class="hover:text-zinc-200 transition">01 / Bio</a>
                <a href="#competencies" class="hover:text-zinc-200 transition">02 / Skills</a>
                <a href="#exhibition" class="hover:text-zinc-200 transition">03 / Project</a>
            </div>

            <div>
                @if(!isset($isDownload) || !$isDownload)
                <a href="{{ route('portofolio.download', $project->id) }}" class="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-semibold uppercase tracking-widest text-[9px] rounded-lg shadow-lg hover:brightness-110 transition duration-300">
                    📥 Export Code (.ZIP)
                </a>
                @endif
            </div>
        </div>
    </nav>

    <header class="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center relative z-10">
        <span class="text-[9px] font-mono tracking-[0.5em] text-amber-500/80 uppercase block mb-4" data-aos="fade-down" data-aos-duration="1000">Available for Selective Commissions</span>
        <h1 class="text-5xl md:text-7xl font-serif tracking-tight text-zinc-100 font-semibold mb-4" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">{{ $project->user->name }}</h1>
        <p class="text-lg md:text-xl font-serif italic text-zinc-400 font-light" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">{{ $project->role }}</p>
        <div class="w-8 h-[1px] bg-amber-500/20 mx-auto my-10" data-aos="zoom-in" data-aos-delay="600"></div>
        <div class="flex flex-wrap justify-center gap-2 max-w-md mx-auto" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="700">
            @foreach(explode(',', $project->tech_stack) as $tech)
                <span class="text-[9px] font-mono tracking-wider uppercase bg-[#090909] border border-zinc-900 px-3 py-1.5 rounded-md text-zinc-400">{{ trim($tech) }}</span>
            @endforeach
        </div>
    </header>

    <main class="max-w-3xl mx-auto px-6 space-y-32 pb-32">
        
        <section id="biography" class="scroll-mt-28 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div class="md:col-span-1 border-l border-amber-500/20 pl-4" data-aos="fade-right" data-aos-duration="1000">
                <h2 class="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">01 / Profile Outline</h2>
                <span class="text-xs text-zinc-600 block mt-1 font-light">{{ $project->location }}</span>
            </div>
            <div class="md:col-span-2 space-y-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <p class="text-zinc-400 leading-relaxed text-sm font-light whitespace-pre-line">{{ $project->about_me }}</p>
                <div class="text-[11px] font-mono text-zinc-500 pt-2">Direct Wire: <span class="text-zinc-300 font-sans ml-1">{{ $project->phone_contact }}</span></div>
            </div>
        </section>

        <section id="competencies" class="scroll-mt-28 space-y-8">
            <div class="border-b border-zinc-900 pb-3" data-aos="fade-up">
                <h2 class="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">02 / Validated Competencies</h2>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                @foreach(explode(',', $project->programming_skills) as $skill)
                    @php $trimmedSkill = trim($skill); @endphp
                    <div class="bg-[#090909] border border-zinc-900/60 rounded-xl p-5 flex items-center justify-between transition-all duration-300 hover:border-zinc-800 hover:bg-[#0c0c0c] group" data-aos="fade-up" data-aos-duration="800">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 bg-zinc-950 rounded-lg flex items-center justify-center text-zinc-500 group-hover:text-amber-400 transition-colors duration-300">
                                @if($trimmedSkill == 'Laravel')
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5.47 11.23L1.13 8.7a1.66 1.66 0 0 1 0-2.88l4.34-2.52a1.65 1.65 0 0 1 1.66 0l4.33 2.52a1.66 1.66 0 0 1 0 2.88l-4.33 2.53a1.65 1.65 0 0 1-1.66 0zM17.13 18l-4.34-2.52a1.66 1.66 0 0 1 0-2.88l4.34-2.53a1.65 1.65 0 0 1 1.66 0l4.34 2.53a1.66 1.66 0 0 1 0 2.88l-4.34 2.52a1.65 1.65 0 0 1-1.66 0zm0-9.77l-4.34-2.52a1.66 1.66 0 0 1 0-2.88l4.34-2.53a1.65 1.65 0 0 1 1.66 0l4.34 2.53a1.66 1.66 0 0 1 0 2.88l-4.34 2.52a1.65 1.65 0 0 1-1.66 0z"/></svg>
                                @elseif($trimmedSkill == 'PHP')
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1.69 12.38c-.37.45-.82.68-1.37.68h-1c-.13 0-.25-.05-.34-.14a.5.5 0 0 1-.14-.34l.43-3c.02-.15.1-.27.24-.37A.88.88 0 0 1 12 9.1c.36 0 .68.08.94.24s.45.39.55.7c.07.24.05.52-.05.86c-.1.32-.35.82-.75 1.48z"/></svg>
                                @elseif($trimmedSkill == 'JavaScript')
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm12.53 13.1c-.2-.33-.53-.55-.95-.65c-.32-.08-.72-.15-1.22-.22c-.5-.06-.87-.15-1.11-.27c-.32-.15-.48-.4-.48-.73c0-.25.1-.47.33-.63c.22-.17.53-.25.92-.25c.38 0 .68.1.9.3c.22.2.35.53.38.98h1.8c-.03-.86-.33-1.52-.92-1.97c-.58-.45-1.37-.68-2.35-.68c-1.02 0-1.8.25-2.33.75c-.53.5-.8 1.15-.8 1.95c0 .73.22 1.3.65 1.68c.43.38 1.07.65 1.92.82c.85.17 1.43.3 1.75.4c.4.1.7.27.87.52c.17.25.25.57.25.95c0 .4-.15.73-.45.98c-.3.25-.73.38-1.28.38c-.62 0-1.08-.15-1.38-.45c-.3-.3-.47-.78-.5-1.45H7.3c.03.95.37 1.67 1.02 2.13c.65.47 1.55.7 2.7.7c1.13 0 2.02-.27 2.65-.8c.63-.54.95-1.27.95-2.18c0-.7-.2-1.23-.62-1.58z"/></svg>
                                @elseif($trimmedSkill == 'Python')
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1.63 4.25c.44 0 .8.36.8.8s-.36.8-.8.8s-.8-.36-.8-.8s.36-.8.8-.8zM9.5 16.5c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1z"/></svg>
                                @else
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                                @endif
                            </div>
                            <span class="text-xs font-mono tracking-wide text-zinc-300 font-medium group-hover:text-zinc-100 transition-colors">{{ $trimmedSkill == 'HTML_CSS' ? 'HTML & CSS' : $trimmedSkill }}</span>
                        </div>
                        <span class="text-[9px] font-mono text-zinc-600">/ Verified</span>
                    </div>
                @endforeach
            </div>
        </section>

        <section id="exhibition" class="scroll-mt-28 space-y-8">
            <div class="border-b border-zinc-900 pb-3" data-aos="fade-up">
                <h2 class="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">03 / Selected Production</h2>
            </div>
            <div class="bg-[#080808] border border-zinc-900 rounded-xl p-8 md:p-10 relative overflow-hidden group shadow-xl" data-aos="fade-up" data-aos-duration="1200">
                <span class="absolute top-0 right-0 p-6 text-7xl font-serif font-semibold text-zinc-950 group-hover:text-amber-500/[0.02] transition duration-500 select-none">01</span>
                <h3 class="text-xl md:text-2xl font-serif text-amber-400 font-medium tracking-wide mb-4">{{ $project->title }}</h3>
                <p class="text-zinc-400 text-xs md:text-sm font-light leading-relaxed mb-8 whitespace-pre-line">{{ $project->description }}</p>
                <div class="flex gap-6 pt-4 border-t border-zinc-900/60 text-[10px] font-mono uppercase tracking-widest">
                    @if($project->github_link) <a href="{{ $project->github_link }}" target="_blank" class="text-zinc-400 hover:text-amber-400 transition">Codebase ↗</a> @endif
                    @if($project->demo_link) <a href="{{ $project->demo_link }}" target="_blank" class="text-zinc-400 hover:text-amber-400 transition">Live View ↗</a> @endif
                </div>
            </div>
        </section>

        <footer class="border-t border-zinc-900/60 pt-12 flex flex-col sm:flex-row justify-between items-center gap-6" data-aos="fade-up">
            <p class="text-[10px] text-zinc-600 font-mono">&copy; {{ date('Y') }} {{ $project->user->name }}. Made via P. Atelier.</p>
            <div class="flex gap-4">
                <a href="mailto:{{ $project->user->email }}" class="text-[10px] font-mono uppercase text-zinc-500 hover:text-zinc-300 transition">Email</a>
                @if($project->instagram_link) <a href="{{ $project->instagram_link }}" target="_blank" class="text-[10px] font-mono uppercase text-amber-500/80 hover:text-amber-400 transition">Instagram</a> @endif
            </div>
        </footer>
    </main>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>AOS.init({ once: true });</script>
</body>
</html>