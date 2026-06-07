<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Portf. Generator</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,600;1,400&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
    </style>
</head>
<body class="bg-[#0a0a0a] text-zinc-100 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-md w-full bg-[#121212] border border-zinc-800/80 rounded-2xl p-8 md:p-10 shadow-2xl relative z-10">
        
        <div class="text-center mb-8">
            <h2 class="text-3xl font-serif tracking-wide text-amber-400 font-bold">Portf.</h2>
            <p class="text-zinc-500 text-xs uppercase tracking-widest mt-2">Sign in to your private atelier</p>
        </div>

        @if (session('success'))
            <div class="mb-6 p-4 bg-amber-950/20 border border-amber-500/40 rounded-lg text-amber-400 text-xs tracking-wide">
                {{ session('success') }}
            </div>
        @endif

        @if ($errors->any())
            <div class="mb-6 p-4 bg-red-950/30 border border-red-800/50 rounded-lg text-red-400 text-xs">
                <ul class="list-disc list-inside">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form method="POST" action="{{ route('login') }}" class="space-y-6">
            @csrf

            <div>
                <label for="email" class="block text-[10px] font-semibold uppercase tracking-widest text-amber-500/80 mb-2">Email Address</label>
                <input type="email" id="email" name="email" value="{{ old('email') }}" required autofocus
                    class="w-full bg-[#1a1a1a] border border-zinc-800 rounded-lg px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition duration-300">
            </div>

            <div>
                <div class="flex justify-between items-center mb-2">
                    <label for="password" class="block text-[10px] font-semibold uppercase tracking-widest text-amber-500/80">Password</label>
                    @if (Route::has('password.request'))
                        <a href="{{ route('password.request') }}" class="text-[11px] text-zinc-500 hover:text-amber-400 transition duration-200">Forgot?</a>
                    @endif
                </div>
                <input type="password" id="password" name="password" required
                    class="w-full bg-[#1a1a1a] border border-zinc-800 rounded-lg px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition duration-300">
            </div>

            <div class="flex items-center">
                <input type="checkbox" id="remember_me" name="remember" 
                    class="rounded bg-[#1a1a1a] border-zinc-800 text-amber-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-amber-500">
                <label for="remember_me" class="ml-2 text-xs text-zinc-400 select-none">Keep me signed in</label>
            </div>

            <div class="pt-2">
                <button type="submit" 
                    class="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold uppercase tracking-widest text-xs py-3.5 rounded-lg hover:from-amber-500 hover:to-amber-400 transition duration-300 shadow-lg shadow-amber-950/20 cursor-pointer">
                    Access Account
                </button>
            </div>
        </form>

        <div class="text-center mt-8 pt-6 border-t border-zinc-900">
            <p class="text-xs text-zinc-500">
                Don't have an account? 
                <a href="{{ route('register') }}" class="text-amber-500/90 hover:text-amber-400 font-medium transition duration-200 ml-1">Create one</a>
            </p>
        </div>

    </div>
</body>
</html>