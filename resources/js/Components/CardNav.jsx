import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const CardNav = ({ items = [], auth }) => {
    const [activeMenu, setActiveMenu] = useState(null);

    return (
        <nav className="w-full sticky top-0 z-[9999] backdrop-blur-md border-b border-zinc-900/80 bg-zinc-950/40">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
                
                {/* LOGO AREA */}
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                    <span className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">
                        Portf.
                    </span>
                </div>

                {/* DROPDOWN LINKS */}
                <div className="hidden md:flex items-center gap-8">
                    {items.map((item, index) => (
                        <div 
                            key={index} 
                            className="relative py-2"
                            onMouseEnter={() => setActiveMenu(index)}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <button className="text-[11px] uppercase tracking-widest font-medium text-zinc-400 hover:text-zinc-100 transition duration-300">
                                {item.label}
                            </button>

                            {activeMenu === index && (
                                <div 
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-xl p-3 shadow-2xl border border-zinc-800/50 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
                                    style={{ backgroundColor: item.bgColor }}
                                >
                                    <div className="flex flex-col gap-1">
                                        {item.links.map((link, lIdx) => (
                                            <a 
                                                key={lIdx}
                                                href={`#${link.label.toLowerCase()}`}
                                                className="text-[11px] py-2 px-3 rounded-lg hover:bg-white/5 transition duration-200 text-zinc-400 hover:text-zinc-100"
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* AUTH BUTTONS */}
                <div className="flex items-center gap-4">
                    {auth?.user ? (
                        <Link 
                            href={route('dashboard')} 
                            className="text-[10px] uppercase tracking-widest border border-zinc-800 px-5 py-2.5 rounded-xl bg-zinc-900 text-zinc-200 font-medium hover:bg-zinc-800 transition duration-300"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link 
                                href={route('login')} 
                                className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-200 transition px-3 py-2 font-medium"
                            >
                                Sign In
                            </Link>
                            <Link 
                                href={route('register')} 
                                className="text-[10px] uppercase tracking-widest font-semibold px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition duration-300 shadow-lg"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default CardNav;