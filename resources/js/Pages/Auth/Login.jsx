import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Sign In | Portf. Studio" />

            <div className="min-h-screen bg-[#030303] text-zinc-100 flex overflow-hidden font-sans">
                
                {/* SISI KIRI: VISUAL BRANDING (SPLIT SCREEN) */}
                <div className="hidden lg:flex lg:w-7/12 relative bg-[#070708] border-r border-zinc-900/60 items-center justify-center p-12 overflow-hidden">
                    {/* Efek Tirai Cahaya Redup (Dark Veil Style) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
                    
                    <div className="max-w-md relative z-10">
                        <span className="text-xs uppercase tracking-widest text-amber-500 font-mono">Atelier Entrance</span>
                        <h2 className="text-4xl font-serif font-light text-zinc-200 mt-4 leading-relaxed">
                            Kembali ke Ruang Kerja <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">Masterpiece</span> Anda.
                        </h2>
                        <p className="text-zinc-500 text-xs mt-6 font-light leading-relaxed tracking-wide">
                            Masuk untuk melanjutkan konfigurasi parameter portfolio, mengunduh berkas source code .ZIP, dan mengelola galeri digital premium Anda.
                        </p>
                    </div>
                </div>

                {/* SISI KANAN: FORM INTERFACES */}
                <div className="w-full lg:w-5/12 flex flex-col justify-center px-8 sm:px-16 lg:px-20 relative z-10">
                    
                    {/* Link Kembali Ke Landing Page */}
                    <div className="absolute top-8 left-8 sm:left-16 lg:left-20">
                        <Link href="/" className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition duration-300 flex items-center gap-2">
                            ← Back to Studio
                        </Link>
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                        {/* Header Form */}
                        <div className="mb-10">
                            <h1 className="text-2xl font-serif tracking-wide text-zinc-200">Sign In</h1>
                            <p className="text-zinc-500 text-xs mt-2 font-light">
                                Belum punya akun?{' '}
                                <Link href={route('register')} className="text-amber-400/80 hover:text-amber-400 font-medium underline transition">
                                    Daftar sekarang
                                </Link>
                            </p>
                        </div>

                        {status && <div className="mb-4 font-medium text-xs text-green-500">{status}</div>}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Input Email */}
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-medium">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full bg-[#0a0a0c] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition duration-300"
                                    placeholder="name@domain.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                    autoComplete="username"
                                />
                                {errors.email && <p className="text-xs text-red-500 mt-1.5 font-light">{errors.email}</p>}
                            </div>

                            {/* Input Password */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-medium">Password</label>
                                    {canResetPassword && (
                                        <Link href={route('password.request')} className="text-[10px] tracking-wide text-zinc-500 hover:text-zinc-300 transition">
                                            Forgot?
                                        </Link>
                                    )}
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full bg-[#0a0a0c] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition duration-300"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="current-password"
                                />
                                {errors.password && <p className="text-xs text-red-500 mt-1.5 font-light">{errors.password}</p>}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <label className="flex items-center cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded bg-[#0a0a0c] border-zinc-800 text-amber-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                                    />
                                    <span className="ms-2 text-xs text-zinc-500 font-light">Ingat perangkat ini</span>
                                </label>
                            </div>

                            {/* Tombol Submit */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3.5 bg-zinc-100 hover:bg-zinc-200 disabled:bg-zinc-700 text-zinc-950 font-semibold uppercase tracking-widest text-[10px] rounded-xl transition duration-300 shadow-xl"
                                >
                                    {processing ? 'Verifying...' : 'Access Atelier'}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}