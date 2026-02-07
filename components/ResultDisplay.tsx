
import React, { useState } from 'react';
import { DebugResult } from '../types';

interface ResultDisplayProps {
  result: DebugResult;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.fixedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Problem Section */}
      <section className="bg-red-900/10 border border-red-900/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3 text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <h2 className="text-lg font-bold uppercase tracking-wide">Problem Identification</h2>
        </div>
        <p className="text-slate-300 leading-relaxed">{result.problem}</p>
      </section>

      {/* Explanation Section */}
      <section className="bg-blue-900/10 border border-blue-900/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3 text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <h2 className="text-lg font-bold uppercase tracking-wide">The Mistake Explained</h2>
        </div>
        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{result.explanation}</p>
      </section>

      {/* Fixed Code Section */}
      <section className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2 text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            <h2 className="text-sm font-bold uppercase tracking-wide">Fixed Code</h2>
          </div>
          <button 
            onClick={copyToClipboard}
            className={`text-xs flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${copied ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
          >
            {copied ? (
              <><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied</>
            ) : (
              <><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Code</>
            )}
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="fira-code text-sm text-emerald-300 leading-relaxed">
            <code>{result.fixedCode}</code>
          </pre>
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-amber-900/10 border border-amber-900/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4 text-amber-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
          <h2 className="text-lg font-bold uppercase tracking-wide">Pro Tips & Improvements</h2>
        </div>
        <ul className="space-y-3">
          {result.tips.map((tip, idx) => (
            <li key={idx} className="flex gap-3 text-slate-300">
              <span className="text-amber-500 font-bold shrink-0">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
