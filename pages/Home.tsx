
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-700" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-4xl"
      >
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
          Crafting <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Magic</span> with Motion.
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate playground for React developers to experiment with text effects, fluid transitions, and AI-generated animations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/text">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg shadow-xl shadow-indigo-600/20 transition-all"
            >
              Explore Effects
            </motion.button>
          </Link>
          <Link to="/ai">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold text-lg border border-slate-700 transition-all"
            >
              AI Animator
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl opacity-50"
      >
        {['Fluid', 'Fast', 'Reactive', 'Elegant'].map((word, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl font-mono text-slate-500 tracking-widest uppercase">{word}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
