import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import CardNav from '@/Components/CardNav';

export default function Welcome({ auth, navItems }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // Menangkap pergerakan mouse untuk efek "Dark Veil Reveal"
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <Head title="Premium Portfolio Studio" />
            
            {/* AREA UTAMA DENGAN EFEK ANIMASI DARK VEIL */}
            <div 
                className="min-h-screen bg-[#030303] text-zinc-100 relative overflow-hidden select-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                
                {/* DARK VEIL LAYER 1: Pendaran Sinar Di Balik Tabir (Akan mengikuti koordinat kursor) */}
                <div 
                    className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 ease-in-out"
                    style={{
                        opacity: isHovered ? 0.8 : 0.3,
                        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 163, 89, 0.06), transparent 80%)`
                    }}
                />

                {/* DARK VEIL LAYER 2: Efek Kabut Radial Konstan di Pojok Layar */}
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-amber-500/5 to-purple-500/0 blur-[130px] rounded-full pointer-events-none z-0" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-zinc-800/10 blur-[150px] rounded-full pointer-events-none z-0" />

                {/* KONTEN UTAMA (Z-index di atas veil background) */}
                <div className="relative z-10 flex flex-col min-h-screen">
                    
                    {/* Memanggil CardNav dengan data terintegrasi Laravel Auth */}
                    <CardNav items={navItems} auth={auth} />

                    {/* HERO CONTAINER */}
                    <header className="flex-1 max-w-5xl mx-auto px-6 flex flex-col justify-center items-center text-center pb-20">
                        
                        {/* Tag Kecil Animasi */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] uppercase tracking-widest text-zinc-400 mb-8 animate-fade-in">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                            Engine Version 2.0 Active
                        </div>

                        {/* Judul Utama dengan Efek Gradasi Mewah */}
                        <h1 className="text-4xl md:text-7xl font-light tracking-tight leading-[1.15] max-w-4xl mx-auto text-zinc-200">
                            Ubah Parameter Kode Menjadi <br />
                            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500">
                                Karya Agung
                            </span> Portofolio.
                        </h1>

                        {/* Sub-Deskripsi */}
                        <p className="text-zinc-500 text-xs md:text-sm max-w-lg mx-auto mt-8 font-light leading-relaxed tracking-wide">
                            Cukup tuangkan narasi masterpiece Anda. Kecerdasan sistem kami akan merakit sebuah halaman portofolio premium siap pakai beserta berkas source-code .ZIP instan.
                        </p>

                        {/* Tombol Aksi Utama */}
                        <div className="mt-12">
                            {auth.user ? (
                                <a 
                                    href={route('dashboard')} 
                                    className="px-8 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold uppercase tracking-widest text-[10px] rounded-xl transition-all duration-300 shadow-xl shadow-amber-500/5"
                                >
                                    Masuk Ke Dashboard Atelier
                                </a>
                            ) : (
                                <a 
                                    href={route('register')} 
                                    className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold uppercase tracking-widest text-[10px] rounded-xl transition-all duration-300 shadow-lg shadow-amber-900/20 block md:inline"
                                >
                                    Mulai Merakit Sekarang (Gratis)
                                </a>
                            )}
                        </div>
                    </header>

                    {/* Footer Singkat Estetik */}
                    <footer className="w-full text-center py-8 border-t border-zinc-900/60 text-[10px] font-mono tracking-widest text-zinc-600">
                        &copy; 2026 PORTF. STUDIO. ALL RIGHTS RESERVED.
                    </footer>
                </div>
            </div>
        </>
    );
}