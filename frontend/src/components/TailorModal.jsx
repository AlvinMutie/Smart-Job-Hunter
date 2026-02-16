import React from 'react';
import { X, Copy, Check, Sparkles, Zap, Award, Target } from 'lucide-react';

function TailorModal({ isOpen, onClose, suggestions, jobTitle, company }) {
    const [copied, setCopied] = React.useState(null);

    if (!isOpen) return null;

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopied(index);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <div className="glass-card w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border-indigo-500/30">
                {/* Header */}
                <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-indigo-600/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white leading-tight">AI CV Tailoring</h2>
                            <p className="text-sm text-slate-400">Optimizing for {jobTitle} at {company}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3">
                        <Zap className="text-amber-500 shrink-0" size={20} />
                        <p className="text-sm text-amber-200/80">
                            The suggestions below are specifically designed to address your detected skill gaps. Copy and paste them into your actual resume or use them as inspiration.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {suggestions.map((item, index) => (
                            <div key={index} className="group relative p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-indigo-500/30 transition-all">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
                                        {item.section}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
                                        <Award size={12} /> {item.impact}
                                    </div>
                                </div>

                                {item.original_context && (
                                    <p className="text-xs text-slate-500 mb-2 italic">Context: {item.original_context}</p>
                                )}

                                <p className="text-sm text-slate-200 leading-relaxed pr-8">
                                    {item.suggestion}
                                </p>

                                <button
                                    onClick={() => handleCopy(item.suggestion, index)}
                                    className="absolute bottom-4 right-4 p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-600 transition-all opacity-0 group-hover:opacity-100"
                                    title="Copy to clipboard"
                                >
                                    {copied === index ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-slate-900/50 border-t border-slate-700/50 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-white text-sm font-semibold transition-all"
                    >
                        Done Reviewing
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TailorModal;
