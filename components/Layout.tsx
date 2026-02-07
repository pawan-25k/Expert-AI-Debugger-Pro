
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 max-w-6xl mx-auto">
      <header className="w-full mb-8 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="m8 2 1.88 1.88" /><path d="M14.12 3.88 16 2" /><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" /><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" /><path d="M12 20v-9" /><path d="M6.53 9C4.6 8.8 3 7.1 3 5" /><path d="M6 13H2" /><path d="M3 21c0-2.1 1.7-3.9 3.8-4" /><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" /><path d="M22 13h-4" /><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            Expert Debugger Pro
          </h1>
        </div>
        <p className="text-slate-400 text-center max-w-lg">
          Paste your code or error message below. Our AI-driven engine will diagnose the issue and provide optimized solutions.
        </p>
      </header>
      <main className="w-full flex flex-col gap-8">
        {children}
      </main>
      <footer className="mt-auto py-8 text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} Expert Debugger Pro. Powered by Gemini 3.
      </footer>
    </div>
  );
};
