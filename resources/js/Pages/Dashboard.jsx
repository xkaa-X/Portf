import React, { useState, useRef } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { User, Code, Briefcase, Camera, Check, X, ArrowLeft, ArrowRight, Sparkles, LogOut, Loader2 } from 'lucide-react';
import ElegantShape from '@/Components/ElegantShape';

// Opsi Senjata Teknologi untuk menghindari typo
const SKILL_OPTIONS = [
    'React', 'Laravel', 'Tailwind CSS', 'Vue.js', 'Node.js', 
    'TypeScript', 'JavaScript', 'Python', 'Docker', 'GraphQL', 
    'Next.js', 'PostgreSQL', 'MySQL', 'Three.js', 'Figma'
];

export default function Dashboard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        role: '',
        bio: '',
        avatar: null, 
        skills: '', 
        github: '',
        linkedin: '',
        project_title: '',
        project_desc: '',
        project_link: '',
        location: '', // Tambahan field lokasi
        contact: ''   // Tambahan field kontak
    });

    // Mengubah string comma-separated menjadi array untuk state lokal UI
    const selectedSkills = data.skills ? data.skills.split(',').filter(Boolean) : [];

    const toggleSkill = (skill) => {
        let updatedSkills;
        if (selectedSkills.includes(skill)) {
            updatedSkills = selectedSkills.filter(s => s !== skill);
        } else {
            updatedSkills = [...selectedSkills, skill];
        }
        setData('skills', updatedSkills.join(','));
    };

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const submit = (e) => {
        e.preventDefault();
        post('/generate_portofolio', {
            forceFormData: true,
            onSuccess: () => console.log('Assembly success'),
            onError: (err) => console.error(err)
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const dockItems = [
        { id: 1, label: 'Identity', icon: User },
        { id: 2, label: 'Skills & Links', icon: Code },
        { id: 3, label: 'Showcase', icon: Briefcase }
    ];

    return (
        <>
            <Head title="Atelier Dashboard | Portf." />
            <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col relative overflow-hidden font-sans">
                
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl pointer-events-none" />

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <ElegantShape
                        delay={0.3}
                        width={600}
                        height={140}
                        rotate={12}
                        gradient="from-indigo-500/[0.15]"
                        className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                    />

                    <ElegantShape
                        delay={0.5}
                        width={500}
                        height={120}
                        rotate={-15}
                        gradient="from-rose-500/[0.15]"
                        className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                    />

                    <ElegantShape
                        delay={0.4}
                        width={300}
                        height={80}
                        rotate={-8}
                        gradient="from-violet-500/[0.15]"
                        className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                    />

                    <ElegantShape
                        delay={0.6}
                        width={200}
                        height={60}
                        rotate={20}
                        gradient="from-amber-500/[0.15]"
                        className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                    />

                    <ElegantShape
                        delay={0.7}
                        width={150}
                        height={40}
                        rotate={-25}
                        gradient="from-cyan-500/[0.15]"
                        className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

                {/* Header */}
                <header className="border-b border-zinc-900 bg-zinc-950/20 backdrop-blur-md relative z-10">
                    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="text-lg font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">Portf.</Link>
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-500">Project</span>
                        </div>
                        <Link href="/logout" method="post" as="button" className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-red-400 flex items-center gap-2 transition">
                            <LogOut className="w-3 h-3" /> Exit Studio
                        </Link>
                    </div>
                </header>

                <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 relative z-10 flex flex-col justify-center items-center">
                    
                    {/* ================= ANIMASI DOCK ORIGINAL UTUH ================= */}
                    <div className="mb-12 relative z-20">
                        <div 
                            className="flex items-end gap-4 px-4 py-3 bg-zinc-900/30 border border-zinc-800/60 rounded-3xl backdrop-blur-xl h-20"
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {dockItems.map((item, idx) => {
                                const Icon = item.icon;
                                const isSelected = currentStep === item.id;
                                
                                // Kalkulasi skala pembesaran berbasis hover ala Mac Dock asli
                                let sizeClass = "w-12 h-12";
                                if (hoveredIndex !== null) {
                                    if (hoveredIndex === idx) {
                                        sizeClass = "w-16 h-16 -translate-y-2";
                                    } else if (Math.abs(hoveredIndex - idx) === 1) {
                                        sizeClass = "w-14 h-14 -translate-y-1";
                                    }
                                } else if (isSelected) {
                                    sizeClass = "w-16 h-16 -translate-y-2";
                                }

                                return (
                                    <div key={item.id} className="relative group flex flex-col items-center">
                                        <span className="absolute bottom-full mb-3 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[9px] uppercase tracking-widest font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-30">
                                            {item.label}
                                        </span>
                                        <button 
                                            type="button" 
                                            onMouseEnter={() => setHoveredIndex(idx)} 
                                            onClick={() => setCurrentStep(item.id)} 
                                            className={`flex items-center justify-center rounded-2xl border transition-all duration-300 ${sizeClass} ${isSelected ? 'border-amber-500/50 bg-gradient-to-b from-amber-500/10 to-amber-500/20 text-amber-400 shadow-lg shadow-amber-500/5' : 'border-zinc-800 bg-zinc-950/60 text-zinc-500 hover:text-zinc-200'}`}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </button>
                                        <div className={`w-1 h-1 rounded-full mt-1.5 transition-all duration-300 ${isSelected ? 'bg-amber-400 scale-100' : 'bg-transparent scale-0'}`} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Card */}
                    <div className="bg-[#070709] border border-zinc-900 rounded-2xl p-6 sm:p-10 shadow-2xl w-full max-w-3xl">
                        <form onSubmit={submit} className="space-y-8">
                            
                            {/* STEP 1: IDENTITY */}
                            {currentStep === 1 && (
                                <div className="space-y-6 animate-in fade-in duration-300">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <h2 className="text-xl font-serif text-zinc-200">Personal Architecture</h2>
                                            <p className="text-zinc-500 text-xs mt-1">Definisikan aspek visual identitas fundamental Anda.</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div onClick={() => fileInputRef.current.click()} className="w-16 h-16 rounded-2xl border border-zinc-800 bg-[#0d0d11] flex items-center justify-center cursor-pointer overflow-hidden hover:border-amber-500/40 transition">
                                                {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" /> : <Camera className="w-5 h-5 text-zinc-600" />}
                                            </div>
                                            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono">Creative Name</label>
                                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:outline-none transition" placeholder="Name" />
                                            {errors.name && <div className="text-red-400 text-[10px] font-mono mt-1">{errors.name}</div>}
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono">Professional Role</label>
                                            <input type="text" value={data.role} onChange={e => setData('role', e.target.value)} className="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:outline-none transition" placeholder="e.g. Luxury Minimalist" />
                                            {errors.role && <div className="text-red-400 text-[10px] font-mono mt-1">{errors.role}</div>}
                                        </div>
                                    </div>

                                    {/* TAMBAHAN GRID: LOKASI & KONTAK */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono">Location / Base</label>
                                            <input type="text" value={data.location} onChange={e => setData('location', e.target.value)} className="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:outline-none transition" placeholder="e.g. Jakarta" />
                                            {errors.location && <div className="text-red-400 text-[10px] font-mono mt-1">{errors.location}</div>}
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono">Primary Contact</label>
                                            <input type="text" value={data.contact} onChange={e => setData('contact', e.target.value)} className="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:outline-none transition" placeholder="e.g. example@gmail.com" />
                                            {errors.contact && <div className="text-red-400 text-[10px] font-mono mt-1">{errors.contact}</div>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono">Short Biography</label>
                                        <textarea value={data.bio} onChange={e => setData('bio', e.target.value)} rows="4" className="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:outline-none transition resize-none" placeholder="Ceritakan core nilai seni Anda..." />
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: SKILLS OPTIONS & LINKS */}
                            {currentStep === 2 && (
                                <div className="space-y-6 animate-in fade-in duration-300">
                                    <div>
                                        <h2 className="text-xl font-serif text-zinc-200">Arsenal & Connections</h2>
                                        <p className="text-zinc-500 text-xs mt-1">Pilih keahlian Anda (Anti-Typo) dan kaitkan lab jejaring sosial.</p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-3 font-mono">Select Expertise Arsenal</label>
                                        <div className="flex flex-wrap gap-2 p-4 bg-[#0d0d11] border border-zinc-800 rounded-xl">
                                            {SKILL_OPTIONS.map((skill) => {
                                                const isSelected = selectedSkills.includes(skill);
                                                return (
                                                    <button
                                                        key={skill}
                                                        type="button"
                                                        onClick={() => toggleSkill(skill)}
                                                        className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${isSelected ? 'bg-amber-500/10 border-amber-500/50 text-amber-400' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                                                    >
                                                        {skill}
                                                        {isSelected ? <X className="w-3 h-3" /> : <Check className="w-3 h-3 text-zinc-600" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {errors.skills && <div className="text-red-400 text-[10px] font-mono mt-1">{errors.skills}</div>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono">GitHub URL</label>
                                            <input type="url" value={data.github} onChange={e => setData('github', e.target.value)} className="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:outline-none transition" placeholder="https://github.com/..." />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono">LinkedIn URL</label>
                                            <input type="url" value={data.linkedin} onChange={e => setData('linkedin', e.target.value)} className="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:outline-none transition" placeholder="https://linkedin.com/in/..." />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: MASTERPIECE SHOWCASE */}
                            {currentStep === 3 && (
                                <div className="space-y-6 animate-in fade-in duration-300">
                                    <div>
                                        <h2 className="text-xl font-serif text-zinc-200">The Masterpiece Project</h2>
                                        <p className="text-zinc-500 text-xs mt-1">Sematkan satu karya terbaik ke etalase utama.</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="sm:col-span-2">
                                            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono">Project Title</label>
                                            <input type="text" value={data.project_title} onChange={e => setData('project_title', e.target.value)} className="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:outline-none transition" placeholder="e.g. Synapse Core Platform" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono">Project Link / URL</label>
                                            <input type="url" value={data.project_link} onChange={e => setData('project_link', e.target.value)} className="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:outline-none transition" placeholder="https://..." />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono">Project Description</label>
                                            <textarea value={data.project_desc} onChange={e => setData('project_desc', e.target.value)} rows="4" className="w-full bg-[#0d0d11] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-amber-500/40 focus:outline-none transition resize-none" placeholder="Uraikan gambaran arsitektur dan sistem projek seni digital Anda..." />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ================= DYNAMIC BUTTON CONTROLS SECTION ================= */}
                            <div className="flex items-center justify-between border-t border-zinc-900 pt-6 mt-8">
                                {currentStep > 1 ? (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="text-[10px] uppercase tracking-widest font-mono font-medium text-zinc-500 hover:text-zinc-200 flex items-center gap-2 bg-zinc-950 px-4 py-2.5 rounded-xl border border-zinc-800/80 transition duration-300"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                                    </button>
                                ) : (
                                    <div />
                                )}

                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="text-[10px] uppercase tracking-widest font-mono font-medium text-zinc-950 bg-zinc-100 hover:bg-zinc-200 flex items-center gap-2 px-5 py-2.5 rounded-xl transition duration-300 ml-auto"
                                    >
                                        Next <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="text-[10px] uppercase tracking-widest font-mono font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 shadow-lg shadow-amber-500/5 flex items-center gap-2 px-6 py-2.5 rounded-xl transition duration-300 disabled:opacity-50 ml-auto group"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Assembling Suite...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" /> Assemble Artifact
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>

                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}