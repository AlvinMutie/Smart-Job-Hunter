import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, FileText, MoreVertical, Plus, Briefcase, Sparkles } from 'lucide-react';
import { trackerService } from '../services/api';

function Tracker() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const data = await trackerService.getApplications();
                setApplications(data);
            } catch (error) {
                console.error("Failed to fetch applications:", error);
            }
            setLoading(false);
        };
        fetchApps();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Applied': return 'badge-indigo';
            case 'Interview': return 'badge-cyan';
            case 'Rejected': return 'badge-red';
            case 'Not Applied': return 'badge-slate';
            default: return 'badge-indigo';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Applied': return <Clock size={16} />;
            case 'Interview': return <Sparkles size={16} className="text-amber-400" />;
            case 'Rejected': return <XCircle size={16} />;
            case 'Not Applied': return <FileText size={16} />;
            default: return <Clock size={16} />;
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-[400px] text-slate-500">Loading your pipeline...</div>;
    }

    const avgScore = applications.length > 0
        ? Math.round(applications.reduce((acc, app) => acc + app.score, 0) / applications.length)
        : 0;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Pipeline</h2>
                <button className="btn-primary">
                    <Plus size={18} /> Add Application
                </button>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-800 bg-slate-800/20">
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Job Title</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Company</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Match Score</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Last Active</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-slate-500">No applications tracked yet. Start applying from the Dashboard!</td>
                            </tr>
                        ) : (
                            applications.map(app => (
                                <tr key={app.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">{app.title}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">{app.company}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${getStatusColor(app.status)} flex items-center gap-1.5 w-fit`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${app.score > 80 ? 'bg-emerald-500' : app.score > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                    style={{ width: `${app.score}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-bold text-slate-300">{app.score}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{app.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-500 hover:text-white transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Active Applications" value={applications.length.toString()} delta="Live updates" icon={<Briefcase className="text-indigo-400" />} />
                <StatCard label="Interviews Scheduled" value={applications.filter(a => a.status === 'Interview').length.toString()} delta="Check your email" icon={<Sparkles className="text-amber-400" />} />
                <StatCard label="Average Match Score" value={`${avgScore}%`} delta="Keep tailoring!" icon={<Sparkles className="text-cyan-400" />} />
            </div>
        </div>
    );
}

function StatCard({ label, value, delta, icon }) {
    return (
        <div className="glass-card p-6">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-800/50 rounded-lg">{icon}</div>
                <span className="text-xs text-emerald-400 font-medium">{delta}</span>
            </div>
            <h4 className="text-slate-400 text-sm font-medium">{label}</h4>
            <div className="text-2xl font-bold text-white mt-1">{value}</div>
        </div>
    );
}


export default Tracker;
