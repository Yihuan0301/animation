
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PAGE_TRANSITIONS } from '../constants';

const PageTransitions: React.FC = () => {
  const [activeTransition, setActiveTransition] = useState(PAGE_TRANSITIONS[0]);
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(prev => (prev === 3 ? 1 : prev + 1));
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-5xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4">Page Transitions</h2>
        <p className="text-slate-400">Smooth navigation between states using Framer Motion's AnimatePresence.</p>
      </div>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {PAGE_TRANSITIONS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTransition(t);
              setStep(1);
            }}
            className={`px-6 py-2 rounded-full border transition-all ${
              activeTransition.id === t.id 
                ? 'bg-indigo-600 border-indigo-500 text-white' 
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="relative h-[400px] w-full bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTransition.id}-${step}`}
            variants={activeTransition.variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute inset-0 flex flex-col items-center justify-center p-12 text-center ${
              step === 1 ? 'bg-indigo-600/10' : step === 2 ? 'bg-purple-600/10' : 'bg-pink-600/10'
            }`}
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20"
            >
              <span className="text-4xl font-bold">{step}</span>
            </motion.div>
            <h3 className="text-3xl font-bold mb-4">Content Block {step}</h3>
            <p className="text-slate-400 max-w-md mb-8">
              This represents a sub-page or view change. Notice how the {activeTransition.name.toLowerCase()} animates the entire container.
            </p>
            <button 
              onClick={handleNext}
              className="px-8 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors"
            >
              Next Step
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 bg-slate-800/30 p-6 rounded-2xl border border-slate-700">
        <h4 className="font-bold text-white mb-4">Configuration</h4>
        <div className="bg-slate-950 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm text-indigo-300 font-mono">
{`// Current Animation Config: ${activeTransition.name}
const variants = ${JSON.stringify(activeTransition.variants, null, 2)};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PageTransitions;
