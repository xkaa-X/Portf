<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portf. | Premium Portfolio Generator Studio</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .glow-button:hover { box-shadow: 0 0 25px rgba(212, 175, 55, 0.4); }
    </style>
</head>
<body class="bg-[#050505] text-zinc-100 min-h-screen relative overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-300">

    <div class="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none"></div>

    <nav class="border-b border-zinc-900/60 bg-[#070707]/70 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="text-2xl font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 font-bold">Portf.</span>
            </div>
            <div class="flex items-center gap-4">
                @auth
                    <a href="/dashboard" class="text-xs uppercase tracking-widest text-amber-400 border border-amber-500/20 px-5 py-2.5 rounded-full hover:bg-amber-500/5 transition duration-300">Dashboard</a>
                @else
                    <a href="{{ route('login') }}" class="text-xs uppercase tracking-widest text-zinc-400 hover:text-zinc-200 transition px-4 py-2">Sign In</a>
                    <a href="{{ route('register') }}" class="text-xs uppercase tracking-widest bg-gradient-to-r from-amber-600 to-amber-400 text-black font-semibold px-5 py-2.5 rounded-lg transition duration-300 glow-button">Register</a>
                @endauth
            </div>
        </div>
    </nav>

    <header class="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center relative z-10">
        <h1 class="text-5xl md:text-7xl font-serif text-zinc-100 font-bold tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Ubah Parameter Kode Menjadi <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">Karya Agung</span> Portofolio
        </h1>
        <p class="text-zinc-500 text-sm md:text-base max-w-xl mx-auto mt-6 font-light leading-relaxed">
            Cukup tuangkan narasi masterpiece Anda, dan kecerdasan sistem kami akan merakit sebuah halaman portofolio premium siap pakai beserta source code .ZIP instan.
        </p>
        <div class="mt-10 flex justify-center">
            <a href="{{ route('register') }}" class="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold uppercase tracking-widest text-xs rounded-xl transition duration-300 glow-button text-center">
                Mulai Merakit Sekarang (Gratis)
            </a>
        </div>
    </header>
</body>
</html>