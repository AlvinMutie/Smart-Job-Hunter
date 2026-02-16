import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Sparkles, Upload, AlertTriangle, ChevronRight, TrendingUp, Target, BarChart3, Scissors } from 'lucide-react';
import { jobService, authService, trackerService } from '../services/api';
import TailorModal from '../components/TailorModal';

function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [resumeText, setResumeText] = useState('');
    const [matchingJobId, setMatchingJobId] = useState(null);
    const [matchResults, setMatchResults] = useState({});
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);

    // Tailoring State
    const [isTailorModalOpen, setIsTailorModalOpen] = useState(false);
    const [tailorData, setTailorData] = useState({ suggestions: [], jobTitle: '', company: '' });
    const [isTailoring, setIsTailoring] = useState(false);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                // Fetch user data FIRST and set it immediately to ensure name/CV status is correct
                const userData = await authService.getMe();
                console.log("Dashboard user check:", userData);
                setUser(userData);

                if (userData.profile?.resume_text) {
                    setResumeText(userData.profile.resume_text);
                }

                // Fetch secondary data in parallel
                const [jobsData, appsData] = await Promise.all([
                    jobService.getJobs({ keywords: search, location }),
                    trackerService.getApplications()
                ]);
                setJobs(jobsData);
                setApplications(appsData);
            } catch (error) {
                console.error("Dashboard initialization failed:", error);

                // If it might be an auth error, try to get user one more time quietly
                try {
                    const retryUser = await authService.getMe();
                    setUser(retryUser);
                } catch (e) {
                    console.error("Critical: User fetch failed twice.");
                }
            }
            setLoading(false);
        };
        init();
    }, []); // Only run on mount

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const data = await jobService.getJobs({ keywords: search, location });
            setJobs(data);
            // Clear match results on new search to force re-analysis
            setMatchResults({});
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
        }
        setLoading(false);
    };

    // Auto-trigger matching for top jobs when they load
    useEffect(() => {
        if (jobs.length > 0 && resumeText && Object.keys(matchResults).length === 0) {
            const topJobs = jobs.slice(0, 5);
            topJobs.forEach(job => {
                if (!matchResults[job.id]) {
                    handleMatch(job.id);
                }
            });
        }
    }, [jobs, resumeText]);

    const handleMatch = async (jobId) => {
        if (!resumeText) {
            alert("Please enter or upload your resume text first!");
            return;
        }
        setMatchingJobId(jobId);
        try {
            const formData = new FormData();
            formData.append('resume_text', resumeText);
            formData.append('job_id', jobId);
            const result = await jobService.matchResume(formData);
            setMatchResults(prev => ({ ...prev, [jobId]: result }));
        } catch (error) {
            console.error("Match failed:", error);
        }
        setMatchingJobId(null);
    };

    const handleTailor = async (jobId) => {
        if (!resumeText) return;
        setIsTailoring(true);
        try {
            const formData = new FormData();
            formData.append('resume_text', resumeText);
            formData.append('job_id', jobId);
            const result = await jobService.tailorResume(formData);
            setTailorData({
                suggestions: result.suggestions,
                jobTitle: result.job_title,
                company: result.company
            });
            setIsTailorModalOpen(true);
        } catch (error) {
            console.error("Tailoring failed:", error);
        } finally {
            setIsTailoring(false);
        }
    };

    const avgScore = applications.length > 0
        ? Math.round(applications.reduce((acc, app) => acc + (app.score || 0), 0) / applications.length)
        : 0;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Personalized Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.full_name?.split(' ')[0] || 'Hunter'} 👋</h1>
                    <p className="text-slate-400">Targeting roles for <span className="text-indigo-400 font-semibold">{user?.profile?.preferred_role || 'General Positions'}</span></p>
                </div>
                {!user?.profile?.has_resume ? (
                    <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3 text-amber-500 text-sm">
                        <AlertTriangle size={18} />
                        <span>No CV detected. <a href="/resume-hub" className="font-bold underline">Upload now</a> for AI matching.</span>
                    </div>
                ) : !user?.profile?.resume_text && (
                    <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
                        <AlertTriangle size={18} />
                        <span>CV upload detected but content could not be parsed. <a href="/resume-hub" className="font-bold underline">Try re-uploading as a PDF or TXT.</a></span>
                    </div>
                )}
            </div>

            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 bg-indigo-500/5 border-indigo-500/20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                            <Target size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Average Match</p>
                            <p className="text-2xl font-bold text-white">{avgScore}%</p>
                        </div>
                    </div>
                    <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${avgScore}%` }}></div>
                    </div>
                </div>

                <div className="glass-card p-6 bg-emerald-500/5 border-emerald-500/20">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Tracked Applications</p>
                            <p className="text-2xl font-bold text-white">{applications.length}</p>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-4 leading-relaxed">Keep applying to improve your profile's AI memory.</p>
                </div>

                <div className="glass-card p-6 border-slate-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Historical Trend</h3>
                        <BarChart3 size={18} className="text-slate-600" />
                    </div>
                    <div className="flex items-end gap-1.5 h-12">
                        {applications.length > 0 ? applications.slice(-10).map((app, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-indigo-500/40 rounded-t-sm hover:bg-indigo-400 transition-all cursor-help relative group"
                                style={{ height: `${app.score}%` }}
                                title={`${app.score}% Match - ${app.title}`}
                            >
                                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-[10px] text-white rounded whitespace-nowrap z-50">
                                    {app.score}% Match
                                </div>
                            </div>
                        )) : (
                            <div className="text-slate-500 text-xs text-center w-full">Start applying to see trends</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="glass-card p-2 flex gap-2">
                <div className="flex-1 flex items-center px-4 gap-3">
                    <Search className="text-slate-500" size={20} />
                    <input
                        className="bg-transparent border-none outline-none w-full text-white placeholder-slate-500"
                        placeholder="Search keywords (React, Python, Go...)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="w-px h-8 bg-slate-700/50 my-auto"></div>
                <div className="flex-1 flex items-center px-4 gap-3">
                    <MapPin className="text-slate-500" size={20} />
                    <input
                        className="bg-transparent border-none outline-none w-full text-white placeholder-slate-500"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <button
                    onClick={fetchJobs}
                    className="btn-primary"
                >
                    Find Jobs
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Job List */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        Recommended for You <Sparkles className="text-amber-400" size={18} />
                    </h2>

                    {loading ? (
                        <div className="text-center py-20 text-slate-500">Loading jobs...</div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-20 text-slate-500">No jobs found. Try adjusting your filters.</div>
                    ) : (
                        jobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onMatch={() => handleMatch(job.id)}
                                onTailor={() => handleTailor(job.id)}
                                isMatching={matchingJobId === job.id}
                                isTailoring={isTailoring}
                                matchResult={matchResults[job.id]}
                                onApplySuccess={() => trackerService.getApplications().then(setApplications)}
                            />
                        ))
                    )}
                </div>

                {/* Resume Input Sidepanel */}
                <div className="space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Upload size={18} className="text-indigo-400" /> Resume Intel
                        </h3>
                        <p className="text-sm text-slate-400 mb-4">Paste your resume text below to see match scores and missing skills.</p>
                        <textarea
                            className="input-field h-48 text-sm resize-none mb-4"
                            placeholder="Paste your CV text here..."
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                        ></textarea>
                        <div className="flex items-center gap-2 text-xs text-slate-500 italic">
                            <Sparkles size={12} /> TF-IDF & Cosine Similarity analysis
                        </div>
                    </div>

                    <div className="glass-card p-6 border-indigo-500/20 bg-indigo-500/5">
                        <h3 className="font-semibold mb-2 flex items-center gap-2 text-indigo-400">
                            <ChevronRight size={18} /> Optimization Tip
                        </h3>
                        <p className="text-sm text-slate-400">Tailoring your keywords to match the "Missing Skills" section can increase your visibility to recruiters by up to 40%.</p>
                    </div>
                </div>
            </div>

            <TailorModal
                isOpen={isTailorModalOpen}
                onClose={() => setIsTailorModalOpen(false)}
                suggestions={tailorData.suggestions}
                jobTitle={tailorData.jobTitle}
                company={tailorData.company}
            />
        </div>
    );
}

function JobCard({ job, onMatch, onTailor, isMatching, isTailoring, matchResult, onApplySuccess }) {
    const [applying, setApplying] = useState(false);
    const [applied, setApplied] = useState(false);

    const handleApply = async () => {
        setApplying(true);
        try {
            await trackerService.addApplication({
                job_id: job.id,
                status: 'Applied',
                match_score: matchResult?.match_percentage || 0
            });
            setApplied(true);
            if (onApplySuccess) onApplySuccess();
        } catch (error) {
            console.error("Apply failed:", error);
        }
        setApplying(false);
    };

    return (
        <div className="glass-card p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>

            {matchResult && (
                <div className={`absolute top-0 right-0 px-4 py-1 border-b border-l rounded-bl-xl font-bold text-sm ${matchResult.match_percentage > 70 ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-indigo-600/20 border-indigo-500/30 text-indigo-400'
                    }`}>
                    {matchResult.match_percentage}% Match
                </div>
            )}

            <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-white transition-colors group-hover:text-indigo-400">{job.title}</h3>
                        <div className="flex items-center gap-2 text-slate-400 font-medium">
                            <Briefcase size={14} className="text-indigo-400" /> {job.company}
                        </div>
                    </div>
                    <span className="badge badge-indigo">{job.remote_status}</span>
                </div>

                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">{job.description}</p>

                <div className="flex flex-wrap gap-2 pt-2">
                    {(job.skills_required || "").split(',').filter(s => s.trim()).map(skill => (
                        <span key={skill} className="badge badge-cyan">{skill.trim()}</span>
                    ))}
                </div>

                {matchResult && matchResult.missing_skills.length > 0 && (
                    <div className="mt-4 space-y-3 animate-fade-in">
                        <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                <AlertTriangle size={12} /> Missing Skills
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {matchResult.missing_skills.slice(0, 5).map(skill => (
                                    <span key={skill} className="text-xs text-slate-400 decoration-red-500/50 line-through bg-slate-800/50 px-2 py-0.5 rounded">{skill}</span>
                                ))}
                                {matchResult.missing_skills.length > 5 && <span className="text-xs text-slate-500">+{matchResult.missing_skills.length - 5} more</span>}
                            </div>
                        </div>

                        {matchResult.tailoring_advice && (
                            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Sparkles size={12} /> Tailoring Advice
                                </p>
                                <ul className="space-y-1">
                                    {matchResult.tailoring_advice.map((advice, i) => (
                                        <li key={i} className="text-xs text-slate-400 border-l-2 border-emerald-500/30 pl-2">{advice}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col justify-center gap-3 min-w-[140px]">
                <button
                    onClick={onMatch}
                    disabled={isMatching}
                    className={`btn-primary w-full ${isMatching ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isMatching ? 'Analyzing...' : matchResult ? 'Re-Analyze' : 'Analyze Match'}
                </button>

                {matchResult && matchResult.missing_skills.length > 0 && (
                    <button
                        onClick={onTailor}
                        disabled={isTailoring}
                        className="w-full px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400 text-xs font-bold hover:bg-indigo-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        <Scissors size={14} /> {isTailoring ? 'Tailoring...' : 'Tailor CV'}
                    </button>
                )}

                <button
                    onClick={handleApply}
                    disabled={applying || applied}
                    className={`px-4 py-2 rounded-xl border ${applied ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' : 'border-slate-700 hover:border-slate-500 text-slate-300'} text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-inner`}
                >
                    {applying ? 'Applying...' : applied ? (<><Target size={14} /> Applied</>) : 'Quick Apply'}
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
