
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEXT_EFFECTS } from '../constants';
import TextEffectRenderer from '../components/TextEffectRenderer';

const TextEffects: React.FC = () => {
  const [inputText, setInputText] = useState("ANIMATION PLAYGROUND");
  const [activeEffect, setActiveEffect] = useState(TEXT_EFFECTS[0].id);

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4">Text Effects Gallery</h2>
        <p className="text-slate-400">Click an effect below to preview it with your own text.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <label className="block text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">Preview Text</label>
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value.toUpperCase())}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Type something..."
            />
          </div>

          <div className="space-y-2">
            {TEXT_EFFECTS.map((effect) => (
              <button
                key={effect.id}
                onClick={() => setActiveEffect(effect.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeEffect === effect.id 
                    ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400 shadow-lg shadow-indigo-500/10' 
                    : 'bg-slate-800/30 border-slate-700 text-slate-400 hover:bg-slate-800/50'
                }`}
              >
                <div className="font-bold">{effect.name}</div>
                <div className="text-xs opacity-60">{effect.category}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-3">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl h-[500px] flex items-center justify-center p-12 overflow-hidden shadow-2xl relative">
            <div className="absolute top-6 left-6 text-xs font-mono text-slate-600">PREVIEW_MODE: {activeEffect.toUpperCase()}</div>
            <div className="text-5xl md:text-7xl lg:text-8xl font-black text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEffect + inputText}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <TextEffectRenderer effectId={activeEffect} text={inputText} />
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="absolute bottom-8 right-8 flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500/50" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
               <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700">
               <h4 className="font-bold text-indigo-400 mb-2">How it works</h4>
               <p className="text-sm text-slate-400">
                 {TEXT_EFFECTS.find(e => e.id === activeEffect)?.description}
               </p>
             </div>
             <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700">
               <h4 className="font-bold text-indigo-400 mb-2">Usage</h4>
               <code className="text-xs text-slate-300 font-mono">
                 &lt;TextEffect type="{activeEffect}" /&gt;
               </code>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEffects;
