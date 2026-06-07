import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Download, CheckCircle, ArrowLeft, Terminal, FileArchive } from 'lucide-react';

export default function GenerateResult({ downloadUrl, portfolioId }) {
    const [counter, setCounter] = useState(0);

    // Replikasi efek "Animated Ticker Number" khas React Bits untuk persentase rakitan
    useEffect(() => {
        if (counter < 100) {
            const timer = setTimeout(() => setCounter(counter + 1), 15);
            return () => clearTimeout(timer);
        }
    }, [counter]);

    return (
        <>
            <Head title="Assembly Successful | Portf." />

            <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col justify-center items-center font-sans px-6 relative overflow-hidden">
                {/* Efek Pendaran Latar Belakang */}
                <div className="absolute w-[500px] h-[500px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none z-0" />

                <div className="w-full max-w-md bg-[#070709] border border-zinc-900/90 rounded-3xl p-8 text-center shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
                    
                    {/* ICON STATS SUKSES */}
                    <div className="w-14 h-14 bg-amber-500/5 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        {counter < 100 ? (
                            <Terminal className="w-6 h-6 text-amber-400 animate-pulse" />
                        ) : (
                            <CheckCircle className="w-6 h-6 text-amber-400 animate-in scale-in duration-300" />
                        )}
                    </div>

                    {/* TICKER SIMULASI REACT BITS */}
                    <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 mb-2">
                        {counter < 100 ? 'Compiling Manifest Assets...' : 'System Integrity Validated'}
                    </div>
                    <div className="text-5xl font-serif text-amber-300 tracking-tight mb-6">
                        {counter}%
                    </div>

                    {counter === 100 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div>
                                <h1 className="text-xl font-serif text-zinc-200">Karya Agung Siap Diunduh</h1>
                                <p className="text-zinc-500 text-xs mt-2 font-light leading-relaxed">
                                    Sistem kami telah sukses membungkus konfigurasi kode HTML, aset arsitektur Tailwind, dan berkas foto Anda menjadi arsip siap pakai.
                                </p>
                            </div>

                            {/* REPLIKASI GLOW CARD DARI REACT BITS UNTUK BOX DOWNLOAD */}
                            <div className="p-4 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl flex items-center justify-between text-left group hover:border-amber-500/30 transition duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-zinc-900 rounded-xl text-zinc-400 group-hover:text-amber-400 transition">
                                        <FileArchive className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-mono font-medium block text-zinc-300">portfolio-master.zip</span>
                                        <span className="text-[9px] block text-zinc-600 uppercase tracking-wider font-mono mt-0.5">Ready to Deploy</span>
                                    </div>
                                </div>
                                <a 
                                    href={downloadUrl}
                                    className="p-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 rounded-xl transition duration-300 shadow-md"
                                >
                                    <Download className="w-4 h-4" />
                                </a>
                            </div>

                            {/* TOMBOL KENDALI BALIK */}
                            <div className="pt-2 flex flex-col gap-3">
                                <a 
                                    href={`/portofolio/${portfolioId}`} 
                                    target="_blank" 
                                    className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-300 font-semibold uppercase tracking-widest text-[9px] rounded-xl transition duration-300"
                                >
                                    Live Preview Site
                                </a>
                                <Link 
                                    href="/dashboard" 
                                    className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition duration-300 flex items-center justify-center gap-1.5 mt-2"
                                >
                                    <ArrowLeft className="w-3 h-3" /> Re-Forge New Parameters
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}