
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

interface Props {
  effectId: string;
  text: string;
}

const TextEffectRenderer: React.FC<Props> = ({ effectId, text }) => {
  const characters = text.split("");
  const [isHovered, setIsHovered] = useState(false);

  const container: Variants = {
    hidden: { opacity: 0.4 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const child: Variants = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } },
    hidden: { opacity: 0, y: 5 },
  };

  // --- SCRAMBLE EFFECT ---
  const [scrambled, setScrambled] = useState(text);
  useEffect(() => {
    if (effectId !== 'scramble' || !isHovered) {
      setScrambled(text);
      return;
    }
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambled(text.split("").map((char, idx) => {
        if (idx < iteration) return text[idx];
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
      }).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1/2;
    }, 40);
    return () => clearInterval(interval);
  }, [text, effectId, isHovered]);

  const renderContent = () => {
    switch (effectId) {
      case 'stagger':
        return (
          <motion.div 
            variants={container} 
            initial="hidden" 
            animate={isHovered ? "visible" : "hidden"} 
            className="flex flex-wrap justify-center overflow-hidden"
          >
            {characters.map((char, index) => <motion.span variants={child} key={index} className="inline-block whitespace-pre">{char}</motion.span>)}
          </motion.div>
        );
      case 'glitch':
        return (
          <div className="relative inline-block group">
            <span className="relative z-10">{text}</span>
            <motion.span 
              animate={isHovered ? { x: [-3, 3, -3], opacity: [0.7, 1, 0.7] } : { opacity: 0 }} 
              transition={{ repeat: Infinity, duration: 0.1 }} 
              className="absolute top-0 left-0 w-full h-full text-red-500/80 -z-10 translate-x-1"
            >
              {text}
            </motion.span>
            <motion.span 
              animate={isHovered ? { x: [3, -3, 3], opacity: [0.7, 1, 0.7] } : { opacity: 0 }} 
              transition={{ repeat: Infinity, duration: 0.15 }} 
              className="absolute top-0 left-0 w-full h-full text-cyan-500/80 -z-10 -translate-x-1"
            >
              {text}
            </motion.span>
          </div>
        );
      case 'neon':
        return (
          <motion.span 
            animate={{ 
              textShadow: isHovered ? ["0 0 10px #6366f1", "0 0 30px #6366f1", "0 0 10px #6366f1"] : "0 0 5px rgba(99,102,241,0.2)",
              color: isHovered ? ["#fff", "#a5b4fc", "#fff"] : "#64748b"
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className="font-black"
          >
            {text}
          </motion.span>
        );
      case 'scramble':
        return <span className={`font-mono tracking-widest ${isHovered ? 'text-indigo-400' : 'text-slate-500'}`}>{scrambled}</span>;
      case 'blur':
        return (
          <motion.div 
            animate={isHovered ? { filter: 'blur(0px)', opacity: 1, scale: 1.05 } : { filter: 'blur(4px)', opacity: 0.4, scale: 1 }}
            className="flex transition-all duration-500 font-bold"
          >
            {text}
          </motion.div>
        );
      case 'wave':
        return (
          <div className="flex">
            {characters.map((char, i) => (
              <motion.span 
                key={i} 
                animate={{ y: isHovered ? [0, -15, 0] : [0, -4, 0] }} 
                transition={{ duration: isHovered ? 1 : 2, repeat: Infinity, delay: i * 0.1 }} 
                className={`inline-block whitespace-pre ${isHovered ? 'text-white' : 'text-slate-500'}`}
              >
                {char}
              </motion.span>
            ))}
          </div>
        );
      case 'float':
        return (
          <motion.div
            animate={{ 
              y: [0, -12, 0],
              rotateX: isHovered ? [0, 10, -10, 0] : 0,
              rotateY: isHovered ? [0, 10, -10, 0] : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: 'preserve-3d' }}
            className="cursor-default font-black perspective-500"
          >
            <div style={{ transform: 'translateZ(20px)' }}>{text}</div>
          </motion.div>
        );
      default:
        return <span>{text}</span>;
    }
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-full flex items-center justify-center"
    >
      {renderContent()}
    </div>
  );
};

export default TextEffectRenderer;
