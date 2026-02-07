
import React from 'react';

interface CodeAreaProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export const CodeArea: React.FC<CodeAreaProps> = ({ value, onChange, onSubmit, disabled }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      onSubmit();
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl transition-all hover:border-slate-600 focus-within:ring-2 focus-within:ring-blue-500/50">
      <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Source Input</span>
        <span className="text-xs text-slate-500 italic">Ctrl+Enter to submit</span>
      </div>
      <textarea
        className="w-full h-64 p-4 bg-transparent outline-none fira-code text-sm leading-relaxed resize-none placeholder:text-slate-600"
        placeholder="Paste your code or error stack trace here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <div className="p-4 bg-slate-800/30 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
            disabled || !value.trim() 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95'
          }`}
        >
          {disabled ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Debugging...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
              </svg>
              Run Diagnosis
            </>
          )}
        </button>
      </div>
    </div>
  );
};
