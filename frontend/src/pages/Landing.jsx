import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Target, Sparkles, Clock, ChevronRight } from 'lucide-react';

function Landing() {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <Briefcase size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Hunter<span className="text-indigo-500">.io</span></span>
                </div>
                <div className="flex gap-4">
                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">Login</Link>
                    <Link to="/register" className="px-6 py-2 text-sm font-semibold bg-white text-slate-950 rounded-full hover:bg-slate-200 transition-all">Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-8 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full -z-10"></div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
                    <Sparkles size={14} /> New: AI Resume Scoring v2.0
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl leading-[1.1]">
                    Stop Applying Blindly. <br />
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Hunt Smarter.
                    </span>
                </h1>

                <p className="text-lg text-slate-400 max-w-2xl mb-12 leading-relaxed">
                    The all-in-one career acceleration platform that uses AI to match your skills with the perfect roles. Score your resume, track applications, and land your dream job.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/register" className="btn-primary py-4 px-10 text-lg rounded-full">
                        Start Free Hunt <ChevronRight size={20} />
                    </Link>
                    <button className="px-10 py-4 text-lg font-semibold border border-slate-800 rounded-full hover:bg-slate-900 transition-all">
                        View Live Demo
                    </button>
                </div>

                {/* Floating elements/Visuals */}
                <div className="mt-20 glass-card p-4 max-w-4xl w-full border-indigo-500/20 bg-slate-900/40 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
                        alt="Dashboard Preview"
                        className="rounded-xl opacity-80"
                    />
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-8 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold mb-4">Master Your Career Growth</h2>
                    <p className="text-slate-500">Everything you need to outpace the competition.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Target className="text-indigo-500" size={32} />}
                        title="AI Job Matching"
                        description="Our TF-IDF engine compares your resume with thousands of jobs to find the perfect statistical fit."
                    />
                    <FeatureCard
                        icon={<Sparkles className="text-purple-500" size={32} />}
                        title="Resume Scoring"
                        description="Get instant feedback on your CV. Identify missing skills and optimize your keywords in seconds."
                    />
                    <FeatureCard
                        icon={<Clock className="text-cyan-500" size={32} />}
                        title="App Tracking"
                        description="A high-performance pipeline to manage your applications from 'Not Applied' to 'Offer Accepted'."
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 text-center text-slate-600 text-sm">
                <p>© 2026 Hunter.io. Built with Passion for Talent.</p>
            </footer>
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
