<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $project->name ?: 'Artisan' }} | Artifact Atelier</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                        serif: ['Playfair Display', 'Georgia', 'serif'],
                    },
                    animation: {
                        'logo-loop': 'logo-loop 18s linear infinite',
                        'float': 'float 6s ease-in-out infinite',
                        'lanyard-swing': 'swing 5s ease-in-out infinite alternate',
                    },
                    keyframes: {
                        'logo-loop': {
                            '0%': { transform: 'translateX(0%)' },
                            '100%': { transform: 'translateX(-50%)' },
                        },
                        'float': {
                            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                            '50%': { transform: 'translateY(-10px) rotate(2deg)' },
                        },
                        'swing': {
                            '0%': { transform: 'rotate(2deg)' },
                            '100%': { transform: 'rotate(-2deg)' }
                        }
                    }
                }
            }
        }
    </script>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #030303; }
        .font-mono { font-family: 'Space Mono', monospace; }
        html { scroll-behavior: smooth; }
    </style>
</head>
<body class="text-zinc-400 min-h-screen selection:bg-amber-500/20 selection:text-amber-300 antialiased overflow-x-hidden">

    <!-- SVG Filter untuk Efek Gooey -->
    <svg class="hidden">
        <defs>
            <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
            </filter>
        </defs>
    </svg>

    <!-- Latar Belakang Ferrofluid -->
    <div class="fixed inset-0 w-full h-full -z-10 bg-[#030303]">
        <canvas id="canvas" class="w-full h-full block pointer-events-none opacity-80" style="filter: url(#goo);"></canvas>
    </div>

    <!-- Navbar -->
    <nav class="sticky top-0 bg-zinc-950/30 backdrop-blur-xl border-b border-zinc-900/40 z-50">
        <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <span class="font-serif font-bold text-zinc-200 tracking-wider text-sm">{{ $project->name ?: 'Artisan.' }}</span>
            <div class="flex gap-8 text-[10px] uppercase font-mono tracking-widest font-medium">
                <a href="#biography" class="text-zinc-500 hover:text-zinc-200 transition">Biography</a>
                <a href="#arsenal" class="text-zinc-500 hover:text-zinc-200 transition">Arsenal</a>
                <a href="#showcase" class="text-zinc-500 hover:text-zinc-200 transition">Showcase</a>
                <a href="#location" class="text-zinc-500 hover:text-zinc-200 transition">Location</a>
                <a href="#contact" class="text-zinc-500 hover:text-zinc-200 transition">Contact</a>
            </div>
        </div>
    </nav>

    <div class="max-w-4xl mx-auto px-6 py-20 relative z-10 space-y-28">

        <!-- HERO SECTION -->
        <header class="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-12 pt-8">
            <div class="space-y-4 max-w-xl relative z-20">
                <div class="flex items-center gap-2 text-amber-500 font-mono text-[9px] uppercase tracking-[0.25em]">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> 
                    Identity Verified Asset
                </div>
                <h1 class="text-4xl sm:text-6xl font-serif font-light text-zinc-100 tracking-wide leading-tight drop-shadow-xl">
                    {{ $project->name ?: 'Anonymous Artisan' }}
                </h1>
                <p class="text-zinc-400 font-serif italic text-sm tracking-wide">
                    — {{ $project->role ?: 'Creator' }}
                </p>
                <div class="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-zinc-500 pt-2">
                    @if($project->location)
                        <span class="flex items-center gap-1.5">
                            <svg class="w-3.5 h-3.5 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            {{ $project->location }}
                        </span>
                    @endif
                    @if($project->contact)
                        <span class="flex items-center gap-1.5">
                            <svg class="w-3.5 h-3.5 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            {{ $project->contact }}
                        </span>
                    @endif
                </div>
            </div>

            <!-- LANYARD -->
            <div id="lanyard-container" class="relative mx-auto md:mx-0 w-44 h-80 flex justify-center origin-top z-40 cursor-grab" style="user-select: none;">
                <div id="lanyard-swing" class="w-full h-full flex justify-center origin-top animate-lanyard-swing">
                    <div class="absolute -top-32 w-1.5 h-32 bg-[#1a1a1a] shadow-inner border-r border-zinc-700/30 z-0"></div>
                    <div class="absolute -top-4 flex flex-col items-center z-10 drop-shadow-md pointer-events-none">
                        <div class="w-2.5 h-5 bg-gradient-to-b from-zinc-400 via-zinc-300 to-zinc-500 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.5)]"></div>
                        <div class="w-5 h-5 border-[2.5px] border-zinc-400 rounded-full -mt-2"></div>
                    </div>
                    <div id="lanyard-card" class="w-44 h-72 mt-2 rounded-2xl bg-gradient-to-b from-zinc-900 via-[#0a0a0d] to-[#121217] border border-zinc-700/50 p-4 shadow-2xl relative z-10 flex flex-col justify-between overflow-hidden group will-change-transform" style="transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1); transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);">
                        <div class="absolute -top-0 left-1/2 -translate-x-1/2 w-6 h-2 bg-[#030303] rounded-b-md border-b border-x border-zinc-800 shadow-inner"></div>
                        <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500/40 via-amber-500 to-amber-500/40"></div>
                        <div class="flex justify-between items-center border-b border-zinc-800/60 pb-2 mt-3 pointer-events-none">
                            <span class="text-[7px] font-mono tracking-widest text-zinc-500 uppercase">Studio Pass</span>
                            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                        </div>
                        <div class="my-3 aspect-square rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-inner relative pointer-events-none">
                            @if($project->avatar)
                                <img src="{{ (isset($isDownload) && $isDownload) ? 'assets/avatar.png' : asset($project->avatar) }}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none" alt="Identity Card" />
                            @else
                                <div class="w-full h-full flex items-center justify-center font-serif text-3xl text-zinc-700 bg-zinc-900 pointer-events-none">
                                    {{ substr($project->name, 0, 1) }}
                                </div>
                            @endif
                        </div>
                        <div class="space-y-1 text-center border-t border-zinc-900 pt-2 pb-1 relative z-10 font-mono pointer-events-none">
                            <h4 class="text-[10px] tracking-wider font-semibold text-zinc-200 uppercase truncate">{{ $project->name ?: 'Artisan' }}</h4>
                            <p class="text-[7px] text-zinc-500 truncate mb-1">{{ $project->role ?: 'Creator' }}</p>
                            @if($project->location || $project->contact)
                                <div class="text-[6.5px] text-zinc-600 space-y-0.5 border-t border-zinc-900/50 pt-1.5 mt-1 select-none">
                                    @if($project->location) <p class="truncate text-left">📍 {{ $project->location }}</p> @endif
                                    @if($project->contact) <p class="truncate text-left">✉️ {{ $project->contact }}</p> @endif
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- BIOGRAPHY -->
        <section id="biography" class="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 scroll-mt-24">
            <div class="md:col-span-1">
                <h3 class="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold md:sticky md:top-24">Biography</h3>
            </div>
            <div class="md:col-span-3">
                <p class="text-zinc-300 text-sm font-light leading-relaxed tracking-wide text-justify whitespace-pre-line font-sans relative z-10">
                    {!! nl2br(e($project->bio)) !!}
                </p>
            </div>
        </section>

        <!-- SKILLS ARSENAL -->
        <section id="arsenal" class="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 border-t border-zinc-900/60 pt-12 scroll-mt-24">
            <div class="md:col-span-1">
                <h3 class="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold md:sticky md:top-24">Expertise Arsenal</h3>
            </div>
            <div class="md:col-span-3 overflow-hidden relative w-full">
                @if($project->skills)
                    <div class="w-full overflow-hidden relative py-2 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 before:bg-gradient-to-r before:from-[#030303] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 after:bg-gradient-to-l after:from-[#030303] after:to-transparent after:z-10 group">
                        <div class="flex w-[200%] animate-logo-loop gap-4 items-center group-hover:[animation-play-state:paused]">
                            <!-- Group 1 -->
                            <div class="flex justify-around w-1/2 items-center gap-4">
                                @foreach(explode(',', $project->skills) as $skill)
                                    <div class="flex items-center gap-3 text-[11px] font-mono tracking-wider text-zinc-400 bg-zinc-900/20 border border-zinc-900/80 px-4 py-2.5 rounded-xl backdrop-blur-md shadow-sm transition-all duration-300 min-w-max hover:text-amber-400 hover:border-amber-500/20">
                                        <span class="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                                        {{ trim($skill) }}
                                    </div>
                                @endforeach
                            </div>
                            <!-- Group 2 for seamless loop -->
                            <div class="flex justify-around w-1/2 items-center gap-4">
                                @foreach(explode(',', $project->skills) as $skill)
                                    <div class="flex items-center gap-3 text-[11px] font-mono tracking-wider text-zinc-400 bg-zinc-900/20 border border-zinc-900/80 px-4 py-2.5 rounded-xl backdrop-blur-md shadow-sm transition-all duration-300 min-w-max hover:text-amber-400 hover:border-amber-500/20">
                                        <span class="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                                        {{ trim($skill) }}
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                @else
                    <span class="text-xs italic text-zinc-600">No weapons selected.</span>
                @endif
            </div>
        </section>

        <!-- SHOWCASE -->
        <section id="showcase" class="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 border-t border-zinc-900/60 pt-12 scroll-mt-24">
            <div class="md:col-span-1">
                <h3 class="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold md:sticky md:top-24">Featured Work</h3>
            </div>
            <div class="md:col-span-3">
                <div class="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md group hover:border-amber-500/30 hover:bg-zinc-900/60 transition-all duration-300">
                    <div class="flex justify-between items-start gap-4 mb-4">
                        <h4 class="text-lg font-serif font-medium text-zinc-200 group-hover:text-amber-400 transition duration-300">
                            {{ $project->project_title ?: 'Untitled Masterpiece' }}
                        </h4>
                        @if($project->project_link)
                            <a href="{{ $project->project_link }}" target="_blank" rel="noreferrer" class="text-[10px] font-mono text-zinc-400 hover:text-amber-400 transition uppercase tracking-widest flex items-center gap-1.5 bg-zinc-950/80 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-amber-500/40">
                                Launch <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                            </a>
                        @endif
                    </div>
                    <p class="text-zinc-400 text-xs font-light leading-relaxed tracking-wide text-justify whitespace-pre-line">
                        {!! nl2br(e($project->project_desc)) !!}
                    </p>
                </div>
            </div>
        </section>

        <!-- LOCATION -->
        <section id="location" class="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 border-t border-zinc-900/60 pt-12 scroll-mt-24">
            <div class="md:col-span-1">
                <h3 class="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold md:sticky md:top-24">My Location</h3>
            </div>
            <div class="md:col-span-3">
                <div class="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl overflow-hidden relative group">
                    <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 24px 24px;"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none"></div>
                    
                    <div class="p-8 sm:p-12 relative z-20 flex flex-col items-center justify-center min-h-[300px] text-center">
                        <div class="w-16 h-16 mb-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-500 shadow-[0_0_30px_-5px_rgba(245,158,11,0.2)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        </div>
                        <h4 class="text-2xl font-serif font-light text-zinc-200 mb-3 tracking-wide">Base of Operations</h4>
                        <p class="text-zinc-400 font-mono text-sm max-w-md">
                            {{ $project->location ?: 'Location not specified.' }}
                        </p>
                        @if($project->location)
                            <div class="mt-8 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active Region
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </section>

        <!-- CONTACT ME -->
        <section id="contact" class="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 border-t border-zinc-900/60 pt-12 scroll-mt-24">
            <div class="md:col-span-1">
                <h3 class="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold md:sticky md:top-24">Contact Me</h3>
            </div>
            <div class="md:col-span-3">
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div class="lg:col-span-2 bg-[#050505] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group h-full flex flex-col">
                        <div class="absolute top-0 right-0 p-8 text-6xl font-serif font-bold text-zinc-900/30 group-hover:text-amber-500/5 transition duration-500 pointer-events-none">@</div>
                        <h4 class="text-xl sm:text-2xl font-serif font-light text-zinc-200 mb-4">Let's craft the next masterpiece.</h4>
                        <p class="text-zinc-500 text-xs font-light leading-relaxed mb-8">
                            I am currently available for new opportunities. Reach out if you're looking to build something extraordinary.
                        </p>
                        
                        <div class="space-y-4 relative z-10 mt-auto">
                            @if($project->contact)
                                <div class="flex flex-col gap-3">
                                    <span class="text-[10px] uppercase tracking-widest text-zinc-600 font-mono">Direct Communication</span>
                                    <div class="flex items-center gap-4 text-sm font-mono text-zinc-300 bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-xl">
                                        <div class="w-8 h-8 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-500 shadow-inner">
                                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                        </div>
                                        <a href="mailto:{{ $project->contact }}" class="hover:text-amber-400 hover:underline transition underline-offset-4 truncate">{{ $project->contact }}</a>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>

                    <div class="lg:col-span-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
                        <form class="space-y-5" onsubmit="event.preventDefault(); alert('In a production environment, this will dispatch your message securely.');">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div class="space-y-1.5">
                                    <label class="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Name</label>
                                    <input type="text" class="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:outline-none transition" placeholder="John Doe" required />
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Email</label>
                                    <input type="email" class="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:outline-none transition" placeholder="john@example.com" required />
                                </div>
                            </div>
                            <div class="space-y-1.5">
                                <label class="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Message</label>
                                <textarea rows="4" class="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:outline-none transition resize-none" placeholder="How can we collaborate?" required></textarea>
                            </div>
                            <button type="submit" class="w-full px-6 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-[10px] uppercase tracking-[0.2em] font-bold transition flex items-center justify-center gap-2 group shadow-lg">
                                Send Transmission <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- INFINITE CONNECTIONS TICKER -->
        <section class="w-full overflow-hidden relative border-y border-zinc-900/60 py-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 before:bg-gradient-to-r before:from-[#030303] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 after:bg-gradient-to-l after:from-[#030303] after:to-transparent after:z-10">
            <div class="flex w-[200%] animate-logo-loop items-center gap-16 text-[10px] uppercase tracking-[0.4em] font-mono text-zinc-600">
                <div class="flex justify-around w-1/2 items-center gap-12">
                    <span class="flex items-center gap-2">🔗 Github Link Room</span>
                    <span class="flex items-center gap-2">💼 LinkedIn Space</span>
                    <span class="flex items-center gap-2">✨ Atelier Identity</span>
                </div>
                <div class="flex justify-around w-1/2 items-center gap-12">
                    <span class="flex items-center gap-2">🔗 Github Link Room</span>
                    <span class="flex items-center gap-2">💼 LinkedIn Space</span>
                    <span class="flex items-center gap-2">✨ Atelier Identity</span>
                </div>
            </div>
        </section>

        <!-- FOOTER -->
        <footer class="flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-mono tracking-widest text-zinc-600 relative z-10 pb-8">
            <p>© {{ date('Y') }} {{ $project->name ?: 'Artisan' }}. Built under Portf. Suite.</p>
            <div class="flex gap-6">
                @if($project->github) <a href="{{ $project->github }}" target="_blank" rel="noreferrer" class="hover:text-amber-400 transition uppercase">Hub</a> @endif
                @if($project->linkedin) <a href="{{ $project->linkedin }}" target="_blank" rel="noreferrer" class="hover:text-amber-400 transition uppercase">In</a> @endif
            </div>
        </footer>

    </div>

    <!-- SCRIPTS UNTUK FERROFLUID CANVAS & LANYARD PHYSICS -->
    <script>
        // 1. Canvas Ferrofluid Background
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        class LiquidBlob {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 1.2;
                this.vy = (Math.random() - 0.5) * 1.2;
                this.radius = Math.random() * 150 + 80;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < -this.radius) this.x = width + this.radius;
                if (this.x > width + this.radius) this.x = -this.radius;
                if (this.y < -this.radius) this.y = height + this.radius;
                if (this.y > height + this.radius) this.y = -this.radius;
            }
        }

        const particles = Array.from({length: 18}, () => new LiquidBlob());

        function renderCanvas() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p) => {
                p.update();
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                gradient.addColorStop(0, 'rgba(28, 25, 36, 1)'); 
                gradient.addColorStop(1, 'rgba(10, 10, 12, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(renderCanvas);
        }
        renderCanvas();

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // 2. Lanyard 3D Tilt & Basic Drag Simulation
        const lanyardCard = document.getElementById('lanyard-card');
        const lanyardSwing = document.getElementById('lanyard-swing');
        const lanyardContainer = document.getElementById('lanyard-container');
        
        // 3D Tilt on Hover
        lanyardCard.addEventListener('mousemove', (e) => {
            lanyardSwing.style.animationPlayState = 'paused';
            const rect = lanyardCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = -(y / 8).toFixed(2);
            const rotateY = (x / 8).toFixed(2);
            lanyardCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            lanyardCard.style.transition = 'transform 0.1s ease-out';
        });

        lanyardCard.addEventListener('mouseleave', () => {
            lanyardSwing.style.animationPlayState = 'running';
            lanyardCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            lanyardCard.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        // Drag Physics
        let isDragging = false;
        let startX, startY, currentX = 0, currentY = 0;

        lanyardContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - currentX;
            startY = e.clientY - currentY;
            lanyardContainer.style.cursor = 'grabbing';
            lanyardContainer.style.transition = 'none';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;
            // Limit drag radius roughly
            const dist = Math.sqrt(currentX*currentX + currentY*currentY);
            if(dist > 150) {
                currentX *= 150/dist;
                currentY *= 150/dist;
            }
            lanyardContainer.style.transform = `translate(${currentX}px, ${currentY}px)`;
        });

        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            lanyardContainer.style.cursor = 'grab';
            lanyardContainer.style.transition = 'transform 0.8s cubic-bezier(0.25, 1.5, 0.5, 1)';
            currentX = 0;
            currentY = 0;
            lanyardContainer.style.transform = `translate(0px, 0px)`;
        });
    </script>
</body>
</html>