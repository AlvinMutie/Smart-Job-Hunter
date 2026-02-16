import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Target, Sparkles, Clock, ChevronRight, Upload, Search, FileText, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import SpotlightCard from '../components/SpotlightCard';

function Landing() {
    return (
        <div className="min-h-screen bg-[#0f1118] text-white selection:bg-indigo-500/30 font-sans">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center bg-[#0f1118]/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Briefcase size={22} className="text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Hunter<span className="text-indigo-400">.io</span></span>
                </div>
                <div className="flex gap-4 items-center">
                    <Link to="/login" className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">Login</Link>
                    <Link to="/register" className="px-6 py-2.5 text-sm font-bold bg-white text-slate-950 rounded-full hover:bg-slate-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-8 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[140px] rounded-full -z-10 animate-pulse-slow"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 max-w-5xl leading-[1.05]">
                        Stop Applying Blindly. <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Hunt Smarter.
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed mx-auto">
                        The AI-powered career acceleration platform that analyzes your resume, matches you with the perfect roles, and tracks your success.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Link to="/register" className="btn-primary py-4 px-10 text-lg rounded-full shadow-xl shadow-indigo-500/20">
                            Start Free Hunt <ChevronRight size={20} />
                        </Link>
                    </div>
                </motion.div>

                {/* Dashboard Visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mt-24 p-2 rounded-3xl bg-gradient-to-b from-white/10 to-transparent max-w-5xl w-full border border-white/5 relative shadow-2xl shadow-indigo-900/40"
                >
                    <div className="absolute inset-0 bg-slate-950/80 rounded-3xl -z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2670"
                        alt="Dashboard Preview"
                        className="rounded-2xl opacity-90 w-full object-cover h-[500px]"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f1118] via-[#0f1118]/80 to-transparent"></div>
                </motion.div>
            </section>

            {/* How It Works (M3 Cards) */}
            <section className="py-32 px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-24"
                >
                    <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">How It Works</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6">From Resume to Interview</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">Our streamlined process takes the guesswork out of job hunting.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 -z-10"></div>

                    {[
                        { step: "01", icon: <Upload size={24} className="text-white" />, title: "Upload Check", desc: "Drop your PDF/Doc resume. Our parser extracts skills, experience, and education instantly." },
                        { step: "02", icon: <Search size={24} className="text-white" />, title: "Smart Match", desc: "Our Hybrid AI engine scans thousands of jobs to find statistically perfect matches for your profile." },
                        { step: "03", icon: <FileText size={24} className="text-white" />, title: "Gap Analysis", desc: "See exactly why you match—or don't. Get actionable advice on missing skills to bridge the gap." },
                        { step: "04", icon: <Send size={24} className="text-white" />, title: "Track & Win", desc: "Manage your applications in one place. Watch your match scores accurately predict your interview chances." }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <StepCard {...item} description={item.desc} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features Section (Bento Grid) */}
            <section className="py-24 px-8 max-w-7xl mx-auto">
                <div className="mb-16">
                    <span className="text-purple-400 font-bold tracking-widest uppercase text-sm mb-4 block">Power Features</span>
                    <h2 className="text-4xl font-black">Everything You Need</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-2"
                    >
                        <SpotlightCard className="h-full p-10 flex flex-col justify-between group">
                            <div>
                                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 text-indigo-400">
                                    <Target size={28} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-300 transition-colors">Hybrid Matching Engine</h3>
                                <p className="text-slate-400 max-w-lg">
                                    We combine 70% Tech Skill Overlap with 30% Contextual Similarity (TF-IDF) to give you the most accurate match scores in the industry. We even handle aliases like "Postgres" vs "PostgreSQL" automatically.
                                </p>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <SpotlightCard className="h-full p-10 flex flex-col justify-between group" spotlightColor="rgba(168, 85, 247, 0.15)">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400">
                                <Sparkles size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-300 transition-colors">Resume Scoring</h3>
                                <p className="text-slate-400 text-sm">
                                    Find out your score before you apply. Our AI identifies weaker areas so you can fix them.
                                </p>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <SpotlightCard className="h-full p-10 flex flex-col justify-between group" spotlightColor="rgba(6, 182, 212, 0.15)">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6 text-cyan-400">
                                <Clock size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">Pipeline Tracker</h3>
                                <p className="text-slate-400 text-sm">
                                    Visual Kanban-style tracking for all your applications. Never lose track of a follow-up again.
                                </p>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:col-span-2 glass-card p-10 flex flex-col justify-center items-center text-center bg-gradient-to-tr from-slate-900 to-indigo-950/30 border-slate-700/30 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4">Ready to accelerate your career?</h3>
                            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-950 rounded-full font-bold hover:bg-indigo-50 transition-colors">
                                Join Hunter.io Today
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24 px-8 max-w-4xl mx-auto">
                <div className="glass-card p-12 md:p-16 bg-[#161b22] border-slate-800">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                        <p className="text-slate-400">Have questions about our AI? We're here to help.</p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">Name</label>
                                <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">Email</label>
                                <input type="email" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">Message</label>
                            <textarea className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white h-32 resize-none focus:outline-none focus:border-indigo-500 transition-colors" placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="button" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/20">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 bg-[#0a0c10]">
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Briefcase size={16} className="text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">Hunter<span className="text-indigo-400">.io</span></span>
                    </div>
                    <div className="text-slate-500 text-sm">
                        © 2026 Hunter.io. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-slate-500 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function StepCard({ step, icon, title, description }) {
    return (
        <div className="relative pt-8 group">
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:bg-indigo-600 transition-colors duration-300 relative z-10 border border-white/5">
                {icon}
            </div>
            <div className="absolute top-0 right-4 text-6xl font-black text-slate-800/50 -z-0 select-none group-hover:text-indigo-900/20 transition-colors">
                {step}
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-300 transition-colors">{title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
                {description}
            </p>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="glass-card p-8 flex flex-col items-center text-center group">
            <div className="mb-6 p-4 rounded-2xl bg-slate-900 group-hover:bg-indigo-600/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
                {description}
            </p>
        </div>
    );
}

export default Landing;
