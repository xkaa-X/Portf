import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import CardNav from '@/Components/CardNav';
import BackgroundPaths from '@/Components/BackgroundPaths';

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
                
                <BackgroundPaths />

                {/* KONTEN UTAMA (Z-index di atas veil background) */}
                <div className="relative z-10 flex flex-col min-h-screen">
                    
                    {/* Memanggil CardNav dengan data terintegrasi Laravel Auth */}
                    <CardNav items={navItems} auth={auth} />

                    {/* HERO CONTAINER */}
                    <header className="flex-1 max-w-5xl mx-auto px-6 flex flex-col justify-center items-center text-center pb-20">
                        
                        {/* Tag Kecil Animasi */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] uppercase tracking-widest text-zinc-400 mb-8 animate-fade-in">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                            Portf Engine 2.0 Active
                        </div>

                        {/* Judul Utama dengan Efek Gradasi Mewah */}
                        <h1 className="text-4xl md:text-7xl font-light tracking-tight leading-[1.15] max-w-4xl mx-auto text-zinc-200">
                            Buat Portofolio kalian dengan cepat <br />
                            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500">
                                Dan Praktis
                            </span> dengan portf.
                        </h1>

                        {/* Sub-Deskripsi */}
                        <p className="text-zinc-500 text-xs md:text-sm max-w-lg mx-auto mt-8 font-light leading-relaxed tracking-wide">
                            Platform kurasi digital eksklusif yang mentransformasi rekam jejak Anda menjadi sebuah portofolio dengan estetika high-end. Karena profesionalisme sejati tidak sekadar ditampilkan.
                        </p>

                        {/* Tombol Aksi Utama */}
                        <div className="mt-12">
                            {auth.user ? (
                                <a 
                                    href={route('dashboard')} 
                                    className="px-8 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold uppercase tracking-widest text-[10px] rounded-xl transition-all duration-300 shadow-xl shadow-amber-500/5"
                                >
                                    Masuk Ke Dashboard
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