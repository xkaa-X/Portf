import React, { useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowUpRight, MapPin, Mail } from 'lucide-react';

const TECH_LOGOS = {
    'React': { slug: 'react', color: 'hover:text-[#61DAFB] hover:border-[#61DAFB]/30 hover:bg-[#61DAFB]/5' },
    'Laravel': { slug: 'laravel', color: 'hover:text-[#FF2D20] hover:border-[#FF2D20]/30 hover:bg-[#FF2D20]/5' },
    'Tailwind CSS': { slug: 'tailwindcss', color: 'hover:text-[#06B6D4] hover:border-[#06B6D4]/30 hover:bg-[#06B6D4]/5' },
    'Vue.js': { slug: 'vuedotjs', color: 'hover:text-[#4FC08D] hover:border-[#4FC08D]/30 hover:bg-[#4FC08D]/5' },
    'Node.js': { slug: 'nodedotjs', color: 'hover:text-[#5FA41C] hover:border-[#5FA41C]/30 hover:bg-[#5FA41C]/5' },
    'TypeScript': { slug: 'typescript', color: 'hover:text-[#3178C6] hover:border-[#3178C6]/30 hover:bg-[#3178C6]/5' },
    'JavaScript': { slug: 'javascript', color: 'hover:text-[#F7DF1E] hover:border-[#F7DF1E]/30 hover:bg-[#F7DF1E]/5' },
    'Python': { slug: 'python', color: 'hover:text-[#3776AB] hover:border-[#3776AB]/30 hover:bg-[#3776AB]/5' },
    'Docker': { slug: 'docker', color: 'hover:text-[#2496ED] hover:border-[#2496ED]/30 hover:bg-[#2496ED]/5' },
    'GraphQL': { slug: 'graphql', color: 'hover:text-[#E10098] hover:border-[#E10098]/30 hover:bg-[#E10098]/5' },
    'Next.js': { slug: 'nextdotjs', color: 'hover:text-[#FFFFFF] hover:border-[#FFFFFF]/30 hover:bg-[#FFFFFF]/5' },
    'PostgreSQL': { slug: 'postgresql', color: 'hover:text-[#4169E1] hover:border-[#4169E1]/30 hover:bg-[#4169E1]/5' },
    'MySQL': { slug: 'mysql', color: 'hover:text-[#4479A1] hover:border-[#4479A1]/30 hover:bg-[#4479A1]/5' },
    'Three.js': { slug: 'threedotjs', color: 'hover:text-[#FFFFFF] hover:border-[#FFFFFF]/30 hover:bg-[#FFFFFF]/5' },
    'Figma': { slug: 'figma', color: 'hover:text-[#F24E1E] hover:border-[#F24E1E]/30 hover:bg-[#F24E1E]/5' }
};

export default function PortfolioShow({ project }) {
    const canvasRef = useRef(null);
    const lanyardRef = useRef(null);
    const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });
    const [isHovered, setIsHovered] = useState(false);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#030303] flex items-center justify-center text-zinc-500 font-mono text-xs">
                Assembling Atelier Data...
            </div>
        );
    }

    const skillTags = project.skills && typeof project.skills === 'string'
        ? project.skills.split(',').filter(Boolean).map(s => s.trim()) 
        : [];

    // ================= REACT BITS CLONE: FERROFLUID GOOEY BACKGROUND =================
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const particles = [];
        const particleCount = 18; 
        
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

        for (let i = 0; i < particleCount; i++) {
            particles.push(new LiquidBlob());
        }

        const render = () => {
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
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // ================= REACT BITS CLONE: LANYARD 3D TILT LOGIC =================
    const handleLanyardMouseMove = (e) => {
        if (!lanyardRef.current) return;
        const rect = lanyardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const rotateX = -(y / 8).toFixed(2);
        const rotateY = (x / 8).toFixed(2);
        
        setIsHovered(true);
        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            transition: 'transform 0.1s ease-out'
        });
    };

    const handleLanyardMouseLeave = () => {
        setIsHovered(false);
        setTiltStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
    };

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const renderSkillItems = (skills) => {
        return skills.map((skill, idx) => {
            const techInfo = TECH_LOGOS[skill] || { slug: 'code', color: 'hover:text-amber-400 hover:border-amber-500/20' };
            const iconUrl = `https://unpkg.com/simple-icons@v11/icons/${techInfo.slug}.svg`;

            return (
                <div 
                    key={idx} 
                    className={`flex items-center gap-3 text-[11px] font-mono tracking-wider text-zinc-400 bg-zinc-900/20 border border-zinc-900/80 px-4 py-2.5 rounded-xl backdrop-blur-md shadow-sm transition-all duration-300 min-w-max group/item select-none ${techInfo.color}`}
                >
                    <img 
                        src={iconUrl} 
                        alt={skill} 
                        className="w-3.5 h-3.5 opacity-40 group-hover/item:opacity-100 transition-all duration-300 filter invert tracking-normal"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span>{skill}</span>
                </div>
            );
        });
    };

    return (
        <>
            <Head title={`${project.name || 'Artisan'} | Artifact Atelier`} />

            {/* SVG Filter untuk Efek Gooey */}
            <svg className="hidden">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            {/* Latar Belakang Ferrofluid */}
            <div className="fixed inset-0 w-full h-full -z-10 bg-[#030303]">
                <canvas 
                    ref={canvasRef} 
                    className="w-full h-full block pointer-events-none opacity-80" 
                    style={{ filter: 'url(#goo)' }} 
                />
            </div>

            <div className="text-zinc-400 min-h-screen relative z-10 antialiased selection:bg-amber-500/20 selection:text-amber-300">
                
                {/* Navbar */}
                <nav className="sticky top-0 bg-zinc-950/30 backdrop-blur-xl border-b border-zinc-900/40 z-50">
                    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                        <span className="font-serif font-bold text-zinc-200 tracking-wider text-sm">{project.name || 'Artisan.'}</span>
                        <div className="flex gap-8 text-[10px] uppercase font-mono tracking-widest font-medium">
                            <button type="button" onClick={() => scrollToSection('biography')} className="text-zinc-500 hover:text-zinc-200 transition">Biography</button>
                            <button type="button" onClick={() => scrollToSection('arsenal')} className="text-zinc-500 hover:text-zinc-200 transition">Arsenal</button>
                            <button type="button" onClick={() => scrollToSection('showcase')} className="text-zinc-500 hover:text-zinc-200 transition">Showcase</button>
                            <button type="button" onClick={() => scrollToSection('location')} className="text-zinc-500 hover:text-zinc-200 transition">Location</button>
                            <button type="button" onClick={() => scrollToSection('contact')} className="text-zinc-500 hover:text-zinc-200 transition">Contact</button>
                        </div>
                    </div>
                </nav>

                <div className="max-w-4xl mx-auto px-6 py-20 space-y-28">

                    {/* ================= HERO SECTION ================= */}
                    <header className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-12 pt-8">
                        <div className="space-y-4 max-w-xl relative z-20">
                            <div className="flex items-center gap-2 text-amber-500 font-mono text-[9px] uppercase tracking-[0.25em]">
                                <ShieldCheck className="w-3.5 h-3.5" /> Identity Verified Asset
                            </div>
                            <h1 className="text-4xl sm:text-6xl font-serif font-light text-zinc-100 tracking-wide leading-tight drop-shadow-xl">
                                {project.name || 'Anonymous Artisan'}
                            </h1>
                            <p className="text-zinc-400 font-serif italic text-sm tracking-wide">
                                — {project.role || 'Creator'}
                            </p>
                            
                            {/* TAMBAHAN DATA TEKSTUAL: LOKASI & KONTAK DI BAWAH JUDUL HERO */}
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-zinc-500 pt-2">
                                {project.location && (
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5 text-zinc-600" /> {project.location}
                                    </span>
                                )}
                                {project.contact && (
                                    <span className="flex items-center gap-1.5">
                                        <Mail className="w-3.5 h-3.5 text-zinc-600" /> {project.contact}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* REACT BITS LANYARD CLONE CONTAINER WITH FRAMER MOTION DRAG */}
                        <motion.div 
                            drag
                            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                            dragElastic={0.4}
                            dragTransition={{ bounceStiffness: 400, bounceDamping: 10 }}
                            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                            className="relative mx-auto md:mx-0 w-44 h-80 flex justify-center origin-top z-40 cursor-grab"
                        >
                            <div className="w-full h-full flex justify-center origin-top animate-lanyard-swing" style={{ animationPlayState: isHovered ? 'paused' : 'running' }}>
                                
                                {/* Tali Lanyard (Strap) */}
                                <div className="absolute -top-32 w-1.5 h-32 bg-[#1a1a1a] shadow-inner border-r border-zinc-700/30 z-0"></div>
                                
                                {/* Klip Besi Lanyard */}
                                <div className="absolute -top-4 flex flex-col items-center z-10 drop-shadow-md pointer-events-none">
                                    <div className="w-2.5 h-5 bg-gradient-to-b from-zinc-400 via-zinc-300 to-zinc-500 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
                                    <div className="w-5 h-5 border-[2.5px] border-zinc-400 rounded-full -mt-2" />
                                </div>

                                {/* Kartu Fisik Lanyard */}
                                <div 
                                    ref={lanyardRef}
                                    onMouseMove={handleLanyardMouseMove}
                                    onMouseLeave={handleLanyardMouseLeave}
                                    style={tiltStyle}
                                    className="w-44 h-72 mt-2 rounded-2xl bg-gradient-to-b from-zinc-900 via-[#0a0a0d] to-[#121217] border border-zinc-700/50 p-4 shadow-2xl relative z-10 flex flex-col justify-between overflow-hidden group will-change-transform"
                                >
                                    <div className="absolute -top-0 left-1/2 -translate-x-1/2 w-6 h-2 bg-[#030303] rounded-b-md border-b border-x border-zinc-800 shadow-inner" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500/40 via-amber-500 to-amber-500/40" />
                                    
                                    <div className="flex justify-between items-center border-b border-zinc-800/60 pb-2 mt-3 pointer-events-none">
                                        <span className="text-[7px] font-mono tracking-widest text-zinc-500 uppercase">Studio Pass</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                    </div>

                                    <div className="my-3 aspect-square rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-inner relative pointer-events-none">
                                        {project.avatar ? (
                                            <img src={project.avatar} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none" alt="Identity Card" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-serif text-3xl text-zinc-700 bg-zinc-900 pointer-events-none">
                                                {project.name ? project.name.substring(0,1) : 'A'}
                                            </div>
                                        )}
                                    </div>

                                    {/* DATA MIKRO DI DALAM BADGE ID CARD */}
                                    <div className="space-y-1 text-center border-t border-zinc-900 pt-2 pb-1 relative z-10 font-mono pointer-events-none">
                                        <h4 className="text-[10px] tracking-wider font-semibold text-zinc-200 uppercase truncate">{project.name || 'Artisan'}</h4>
                                        <p className="text-[7px] text-zinc-500 truncate mb-1">{project.role || 'Creator'}</p>
                                        
                                        {(project.location || project.contact) && (
                                            <div className="text-[6.5px] text-zinc-600 space-y-0.5 border-t border-zinc-900/50 pt-1.5 mt-1 select-none">
                                                {project.location && <p className="truncate text-left">📍 {project.location}</p>}
                                                {project.contact && <p className="truncate text-left">✉️ {project.contact}</p>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </header>

                    {/* ================= BIOGRAPHY SECTION ================= */}
                    <section id="biography" className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 scroll-mt-24">
                        <div className="md:col-span-1">
                            <h3 className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold md:sticky md:top-24">Biography</h3>
                        </div>
                        <div className="md:col-span-3">
                            <p className="text-zinc-300 text-sm font-light leading-relaxed tracking-wide text-justify whitespace-pre-line font-sans relative z-10">
                                {project.bio || "No description provided."}
                            </p>
                        </div>
                    </section>

                    {/* ================= SKILLS ARSENAL ================= */}
                    <section id="arsenal" className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 border-t border-zinc-900/60 pt-12 scroll-mt-24">
                        <div className="md:col-span-1">
                            <h3 className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold md:sticky md:top-24">Expertise Arsenal</h3>
                        </div>
                        <div className="md:col-span-3 overflow-hidden relative w-full">
                            {skillTags.length > 0 ? (
                                <div className="w-full overflow-hidden relative py-2 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 before:bg-gradient-to-r before:from-[#030303] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 after:bg-gradient-to-l after:from-[#030303] after:to-transparent after:z-10 group">
                                    <div className="flex w-[200%] animate-logo-loop gap-4 items-center group-hover:[animation-play-state:paused]">
                                        <div className="flex justify-around w-1/2 items-center gap-4">
                                            {renderSkillItems(skillTags)}
                                        </div>
                                        <div className="flex justify-around w-1/2 items-center gap-4">
                                            {renderSkillItems(skillTags)}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <span className="text-xs italic text-zinc-600">No weapons selected.</span>
                            )}
                        </div>
                    </section>

                    {/* ================= SHOWCASE WORK ================= */}
                    <section id="showcase" className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 border-t border-zinc-900/60 pt-12 scroll-mt-24">
                        <div className="md:col-span-1">
                            <h3 className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold md:sticky md:top-24">Featured Work</h3>
                        </div>
                        <div className="md:col-span-3">
                            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md group hover:border-amber-500/30 hover:bg-zinc-900/60 transition-all duration-300">
                                <div className="flex justify-between items-start gap-4 mb-4">
                                    <h4 className="text-lg font-serif font-medium text-zinc-200 group-hover:text-amber-400 transition duration-300">
                                        {project.project_title || "Untitled Masterpiece"}
                                    </h4>
                                    {project.project_link && (
                                        <a href={project.project_link} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-zinc-400 hover:text-amber-400 transition uppercase tracking-widest flex items-center gap-1.5 bg-zinc-950/80 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-amber-500/40">
                                            Launch <ArrowUpRight className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                                <p className="text-zinc-400 text-xs font-light leading-relaxed tracking-wide text-justify whitespace-pre-line">
                                    {project.project_desc || "No project overview available."}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ================= MY LOCATION ================= */}
                    <section id="location" className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 border-t border-zinc-900/60 pt-12 scroll-mt-24">
                        <div className="md:col-span-1">
                            <h3 className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold md:sticky md:top-24">My Location</h3>
                        </div>
                        <div className="md:col-span-3">
                            <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl overflow-hidden relative group">
                                {/* Decorative map-like grid background */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none"></div>
                                
                                <div className="p-8 sm:p-12 relative z-20 flex flex-col items-center justify-center min-h-[300px] text-center">
                                    <div className="w-16 h-16 mb-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-500 shadow-[0_0_30px_-5px_rgba(245,158,11,0.2)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-2xl font-serif font-light text-zinc-200 mb-3 tracking-wide">Base of Operations</h4>
                                    <p className="text-zinc-400 font-mono text-sm max-w-md">
                                        {project.location || "Location not specified."}
                                    </p>
                                    {project.location && (
                                        <div className="mt-8 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active Region
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ================= CONTACT ME ================= */}
                    <section id="contact" className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 border-t border-zinc-900/60 pt-12 scroll-mt-24">
                        <div className="md:col-span-1">
                            <h3 className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold md:sticky md:top-24">Contact Me</h3>
                        </div>
                        <div className="md:col-span-3">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                                {/* Info / Email Side */}
                                <div className="lg:col-span-2 bg-[#050505] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group h-full">
                                    <div className="absolute top-0 right-0 p-8 text-6xl font-serif font-bold text-zinc-900/30 group-hover:text-amber-500/5 transition duration-500 pointer-events-none">@</div>
                                    <h4 className="text-xl sm:text-2xl font-serif font-light text-zinc-200 mb-4">Let's craft the next masterpiece.</h4>
                                    <p className="text-zinc-500 text-xs font-light leading-relaxed mb-8">
                                        I am currently available for new opportunities. Reach out if you're looking to build something extraordinary.
                                    </p>
                                    
                                    <div className="space-y-4 relative z-10 mt-auto">
                                        {project.contact && (
                                            <div className="flex flex-col gap-3">
                                                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-mono">Direct Communication</span>
                                                <div className="flex items-center gap-4 text-sm font-mono text-zinc-300 bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-xl">
                                                    <div className="w-8 h-8 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-500 shadow-inner">
                                                        <Mail className="w-3.5 h-3.5" />
                                                    </div>
                                                    <a href={`mailto:${project.contact}`} className="hover:text-amber-400 hover:underline transition underline-offset-4 truncate">{project.contact}</a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Form Side */}
                                <div className="lg:col-span-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
                                    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('In a production environment, this will dispatch your message securely.'); }}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Name</label>
                                                <input type="text" className="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:ring-0 focus:outline-none transition" placeholder="John Doe" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Email</label>
                                                <input type="email" className="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:ring-0 focus:outline-none transition" placeholder="john@example.com" required />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Message</label>
                                            <textarea rows="4" className="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:ring-0 focus:outline-none transition resize-none" placeholder="How can we collaborate?" required></textarea>
                                        </div>
                                        <button type="submit" className="w-full px-6 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-[10px] uppercase tracking-[0.2em] font-bold transition flex items-center justify-center gap-2 group shadow-lg">
                                            Send Transmission <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ================= INFINITE CONNECTIONS TICKER ================= */}
                    <section className="w-full overflow-hidden relative border-y border-zinc-900/60 py-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 before:bg-gradient-to-r before:from-[#030303] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 after:bg-gradient-to-l after:from-[#030303] after:to-transparent after:z-10">
                        <div className="flex w-[200%] animate-logo-loop items-center gap-16 text-[10px] uppercase tracking-[0.4em] font-mono text-zinc-600">
                            <div className="flex justify-around w-1/2 items-center gap-12">
                                <span className="flex items-center gap-2">🔗 Github Link Room</span>
                                <span className="flex items-center gap-2">💼 LinkedIn Space</span>
                                <span className="flex items-center gap-2">✨ Atelier Identity</span>
                            </div>
                            <div className="flex justify-around w-1/2 items-center gap-12">
                                <span className="flex items-center gap-2">🔗 Github Link Room</span>
                                <span className="flex items-center gap-2">💼 LinkedIn Space</span>
                                <span className="flex items-center gap-2">✨ Atelier Identity</span>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-mono tracking-widest text-zinc-600 relative z-10">
                        <p>© {new Date().getFullYear()} {project.name || 'Artisan'}. Built under Portf. Suite.</p>
                        <div className="flex gap-6">
                            {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition uppercase">Hub</a>}
                            {project.linkedin && <a href={project.linkedin} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition uppercase">In</a>}
                        </div>
                    </footer>

                </div>
            </div>
        </>
    );
}