import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Create Your Account | Portf. Studio" />

            <div className="min-h-screen bg-[#030303] text-zinc-100 flex overflow-hidden font-sans">
                
                {/* SISI KIRI: VISUAL BRANDING (SPLIT SCREEN) */}
                <div className="hidden lg:flex lg:w-7/12 relative bg-[#070708] border-r border-zinc-900/60 items-center justify-center p-12 overflow-hidden">
                    {/* Efek Tirai Cahaya Redup (Dark Veil Style) */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/5 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-zinc-800/10 blur-[120px] rounded-full pointer-events-none" />
                    
                    <div className="max-w-md relative z-10">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-mono">Member Application</span>
                        <h2 className="text-4xl font-serif font-light text-zinc-200 mt-4 leading-relaxed">
                            Mulailah Merakit <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Identitas Digital</span> Anda.
                        </h2>
                        <p className="text-zinc-500 text-xs mt-6 font-light leading-relaxed tracking-wide">
                            Bergabunglah dengan ribuan kreator yang telah mempercayakan kurasi portofolio mereka pada studio sistem cerdas kami. Instan, Premium, dan Tanpa Batas.
                        </p>
                        
                        {/* Status Kecil Estetik */}
                        <div className="mt-12 flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#070708] bg-zinc-800 flex items-center justify-center text-[8px] font-bold">
                                        UA
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] text-zinc-600 tracking-widest uppercase">Trusted by 2k+ Creators</span>
                        </div>
                    </div>
                </div>

                {/* SISI KANAN: FORM INTERFACES */}
                <div className="w-full lg:w-5/12 flex flex-col justify-center px-8 sm:px-16 lg:px-20 relative z-10 overflow-y-auto py-20">
                    
                    {/* Link Kembali Ke Landing Page */}
                    <div className="absolute top-8 left-8 sm:left-16 lg:left-20">
                        <Link href="/" className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition duration-300 flex items-center gap-2">
                            ← Studio Home
                        </Link>
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                        {/* Header Form */}
                        <div className="mb-10">
                            <h1 className="text-2xl font-serif tracking-wide text-zinc-200">Register</h1>
                            <p className="text-zinc-500 text-xs mt-2 font-light">
                                Sudah punya akun sebelumnya?{' '}
                                <Link href={route('login')} className="text-amber-400/80 hover:text-amber-400 font-medium underline transition">
                                    Masuk disini
                                </Link>
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            {/* Input Name */}
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-medium">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="w-full bg-[#0a0a0c] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition duration-300"
                                    placeholder="Enter your name"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                />
                                {errors.name && <p className="text-xs text-red-500 mt-1.5 font-light">{errors.name}</p>}
                            </div>

                            {/* Input Email */}
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-medium">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full bg-[#0a0a0c] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition duration-300"
                                    placeholder="name@domain.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                />
                                {errors.email && <p className="text-xs text-red-500 mt-1.5 font-light">{errors.email}</p>}
                            </div>

                            {/* Input Password */}
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-medium">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full bg-[#0a0a0c] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition duration-300"
                                    placeholder="Minimum 8 characters"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    autoComplete="new-password"
                                />
                                {errors.password && <p className="text-xs text-red-500 mt-1.5 font-light">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-medium">Confirm Password</label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="w-full bg-[#0a0a0c] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition duration-300"
                                    placeholder="Repeat your password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                    autoComplete="new-password"
                                />
                                {errors.password_confirmation && <p className="text-xs text-red-500 mt-1.5 font-light">{errors.password_confirmation}</p>}
                            </div>

                            {/* Tombol Submit */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-zinc-100 hover:bg-zinc-200 disabled:bg-zinc-700 text-zinc-950 font-bold uppercase tracking-widest text-[10px] rounded-xl transition duration-300 shadow-xl shadow-amber-500/5"
                                >
                                    {processing ? 'Creating Account...' : 'Initialize Membership'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer Legal Singkat */}
                    <div className="mt-12 text-center">
                        <p className="text-[9px] text-zinc-600 leading-relaxed uppercase tracking-tighter">
                            By clicking initialize, you agree to our <br />
                            <span className="text-zinc-500">Terms of Service</span> and <span className="text-zinc-500">Privacy Policy</span>.
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}