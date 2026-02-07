
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { CodeArea } from './components/CodeArea';
import { ResultDisplay } from './components/ResultDisplay';
import { AppStatus, DebugResult, DebugSession } from './types';
import { analyzeCode } from './services/geminiService';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<DebugSession[]>([]);
  const [currentResult, setCurrentResult] = useState<DebugResult | null>(null);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('debug_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history when it changes
  useEffect(() => {
    localStorage.setItem('debug_history', JSON.stringify(history));
  }, [history]);

  const handleDiagnose = async () => {
    if (!input.trim()) return;

    setStatus(AppStatus.LOADING);
    setError(null);

    try {
      const result = await analyzeCode(input);
      setCurrentResult(result);
      
      // Update history
      const newSession: DebugSession = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        input,
        result
      };
      setHistory(prev => [newSession, ...prev].slice(0, 10)); // Keep last 10
      
      setStatus(AppStatus.SUCCESS);
      // Smooth scroll to result
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred while debugging. Please try again.');
      setStatus(AppStatus.ERROR);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('debug_history');
  };

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Main Input Area */}
        <CodeArea 
          value={input} 
          onChange={setInput} 
          onSubmit={handleDiagnose} 
          disabled={status === AppStatus.LOADING} 
        />

        {/* Error Message */}
        {status === AppStatus.ERROR && (
          <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg text-red-200 flex items-center gap-3 animate-in fade-in zoom-in duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p>{error}</p>
          </div>
        )}

        {/* Current Result */}
        {currentResult && status === AppStatus.SUCCESS && (
          <ResultDisplay result={currentResult} />
        )}

        {/* History Panel */}
        {history.length > 0 && (
          <div className="mt-12 w-full">
            <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Recent Sessions</h3>
              <button 
                onClick={clearHistory}
                className="text-xs text-slate-500 hover:text-red-400 transition-colors"
              >
                Clear History
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {history.map((session) => (
                <button
                  key={session.id}
                  onClick={() => {
                    setInput(session.input);
                    setCurrentResult(session.result);
                    setStatus(AppStatus.SUCCESS);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-slate-800/40 hover:bg-slate-800 border border-slate-700 p-4 rounded-xl text-left transition-all group flex justify-between items-center"
                >
                  <div className="truncate pr-4">
                    <div className="text-xs text-slate-500 mb-1">{new Date(session.timestamp).toLocaleString()}</div>
                    <div className="text-sm text-slate-300 truncate fira-code">{session.input.split('\n')[0].substring(0, 100)}...</div>
                  </div>
                  <div className="shrink-0 text-slate-600 group-hover:text-blue-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
