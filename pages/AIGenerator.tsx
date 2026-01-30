
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAnimationIdea } from '../services/geminiService';
import { AIResponse } from '../types';

const AIGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setResult(null);
    try {
      const data = await generateAnimationIdea(prompt);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-sm font-bold mb-4">
          POWERED BY GEMINI
        </div>
        <h2 className="text-4xl font-black mb-4">AI Animation Muse</h2>
        <p className="text-slate-400">Describe a vibe, and our AI will suggest animation parameters for you.</p>
      </div>

      <form onSubmit={handleGenerate} className="relative mb-16">
        <input 
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'a mystical floating orb' or 'energetic neon bounce'"
          className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl px-6 py-5 text-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all shadow-xl"
        />
        <button 
          type="submit"
          disabled={loading || !prompt}
          className="absolute right-3 top-3 bottom-3 px-8 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-xl font-bold transition-all flex items-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : 'Generate'}
        </button>
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-8 rounded-3xl border border-indigo-500/30 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">The Result</h3>
              <p className="text-lg text-slate-300 italic mb-8 border-l-4 border-indigo-500 pl-4">
                "{result.suggestion}"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-widest text-slate-500">Tailwind Helper</h4>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <code className="text-indigo-300 text-sm break-words">{result.cssClasses}</code>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-widest text-slate-500">Framer Variants</h4>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <pre className="text-purple-300 text-xs font-mono">{result.framerCode}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center p-12 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden relative group">
               <motion.div
                 animate={{ 
                   scale: [1, 1.2, 1],
                   rotate: [0, 10, -10, 0],
                   filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"]
                 }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="w-32 h-32 bg-indigo-500 rounded-2xl shadow-[0_0_50px_rgba(99,102,241,0.5)]"
               />
               <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-bold text-white uppercase tracking-widest">Previewing Vibe...</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!result && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30">
          {[1,2,3].map(i => (
            <div key={i} className="h-40 bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-700" />
          ))}
        </div>
      )}
    </div>
  );
};

export default AIGenerator;
