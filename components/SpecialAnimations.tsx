import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// --- TILT CARD (Perspective Matrix Fixed) ---
export const TiltCard: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [25, -25]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-25, 25]);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  return (
    <div 
      className="perspective-1000 w-full h-full flex items-center justify-center p-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <motion.div
        style={{ 
          rotateX: springX, 
          rotateY: springY, 
          transformStyle: 'preserve-3d' 
        }}
        className="relative w-64 h-40 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-6 border border-white/10"
      >
        <div 
          style={{ transform: 'translateZ(60px)' }}
          className="text-white font-black text-3xl tracking-tighter uppercase italic drop-shadow-2xl"
        >
          MATRIX
        </div>
        <div 
          style={{ transform: 'translateZ(40px)' }}
          className="mt-2 text-indigo-200 text-[10px] font-mono tracking-[0.3em] font-bold"
        >
          PERSPECTIVE_V3
        </div>
        {/* Decorative elements to show off depth */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/30" style={{ transform: 'translateZ(20px)' }} />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/30" style={{ transform: 'translateZ(20px)' }} />
      </motion.div>
    </div>
  );
};

// --- DIGITAL GAUGE (Fixed Clipping) ---
export const ProgressRing: React.FC = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setProgress(p => (p + 1) % 101), 60);
    return () => clearInterval(timer);
  }, []);

  const radius = 42; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle 
            cx="60" cy="60" r={radius} 
            stroke="currentColor" strokeWidth="8" fill="transparent" 
            className="text-slate-800" 
          />
          <motion.circle
            cx="60" cy="60" r={radius}
            stroke="currentColor" strokeWidth="8" fill="transparent"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.1, ease: "linear" }}
            className="text-indigo-400 drop-shadow-[0_0_12px_rgba(129,140,248,0.7)]"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
          <span className="text-4xl font-black text-white tabular-nums">{progress}</span>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Load</span>
        </div>
      </div>
    </div>
  );
};

// --- AREA SIGNAL (Fixed Clipping & Path) ---
export const AreaChart: React.FC = () => {
  return (
    <div className="w-full h-full p-8 flex flex-col justify-center">
      <div className="relative h-28 w-full bg-slate-900/30 rounded-xl overflow-hidden border border-slate-800/50">
        <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
          <motion.path
            d="M0 60 L0 40 Q 15 15 30 35 T 60 20 T 90 45 L 100 40 L 100 60 Z"
            fill="rgba(99,102,241,0.1)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d="M0 40 Q 15 15 30 35 T 60 20 T 90 45 L 100 40"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
          {/* Scanning dot */}
          <motion.circle
            animate={{ cx: [0, 100], cy: [40, 40], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            r="2"
            fill="#818cf8"
            className="drop-shadow-[0_0_8px_#818cf8]"
          />
        </svg>
      </div>
      <div className="mt-4 flex justify-between text-[10px] font-mono text-slate-600 uppercase tracking-widest px-1">
        <span>Signal_Stable</span>
        <span>0x2A_44</span>
      </div>
    </div>
  );
};

// --- HACKER TERMINAL (Typing Effect Restored) ---
export const HackerTerminal: React.FC = () => {
  const [text, setText] = useState("");
  const fullText = "> AUTHENTICATING_USER_01...\n> ACCESS_GRANTED\n> LOADING_CORE_SYSTEMS...\n> V2.8_PLAYGROUND_INITIALIZED";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        setTimeout(() => i = 0, 3000); // Reset after delay
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-48 bg-black p-5 font-mono text-emerald-500 text-xs rounded-xl border border-emerald-500/20 shadow-inner flex flex-col">
      <div className="flex gap-1.5 mb-4 border-b border-emerald-500/10 pb-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
      </div>
      <pre className="whitespace-pre-wrap flex-1">{text}<span className="animate-pulse inline-block w-2 h-4 bg-emerald-500 align-middle ml-1" /></pre>
    </div>
  );
};

// --- LIQUID FILL (Previous Wavy Style Restored) ---
export const LiquidButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative px-12 py-5 bg-slate-900 rounded-2xl overflow-hidden group border border-slate-800"
    >
      <motion.div
        animate={{ 
          y: isHovered ? '-100%' : '10%',
          rotate: isHovered ? 360 : 0
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute bottom-[-110%] left-[-50%] w-[200%] h-[200%] bg-indigo-600 rounded-[42%] pointer-events-none"
      />
      <motion.div
        animate={{ 
          y: isHovered ? '-100%' : '10%',
          rotate: isHovered ? -360 : 0
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-[-110%] left-[-50%] w-[200%] h-[200%] bg-indigo-400/30 rounded-[38%] pointer-events-none"
      />
      <span className="relative z-10 font-black text-white text-xs tracking-[0.2em] transition-colors group-hover:text-white uppercase">
        Liquid_Flux
      </span>
    </button>
  );
};

// --- MESH FLUID (Plasma Flow Fixed) ---
export const MeshFluid: React.FC = () => {
  return (
    <div className="w-full h-full bg-slate-950 rounded-xl overflow-hidden relative">
      <motion.div 
        animate={{ 
          x: [0, 80, -40, 0],
          y: [0, -60, 80, 0],
          scale: [1, 1.4, 0.8, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-30%] left-[-20%] w-[100%] h-[100%] bg-indigo-500/50 rounded-full blur-[100px] mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 60, 0],
          y: [0, 80, -60, 0],
          scale: [1, 1.5, 1.1, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-30%] right-[-20%] w-[110%] h-[110%] bg-cyan-500/40 rounded-full blur-[120px] mix-blend-screen"
      />
      <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-black text-5xl tracking-[0.2em] opacity-10 pointer-events-none uppercase">Fluid</span>
      </div>
    </div>
  );
};

// --- NEURAL LINK ---
export const NeuralLink: React.FC = () => {
  const nodes = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    size: Math.random() * 4 + 2
  })), []);

  return (
    <div className="w-full h-full bg-slate-950 rounded-xl relative overflow-hidden border border-slate-800">
      <svg className="absolute inset-0 w-full h-full opacity-30">
        {nodes.map((node, i) => (
          nodes.slice(i + 1).map((target, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={`${node.x}%`} y1={`${node.y}%`}
              x2={`${target.x}%`} y2={`${target.y}%`}
              stroke="#6366f1"
              strokeWidth="0.5"
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, delay: (i + j) * 0.2 }}
            />
          ))
        ))}
      </svg>
      {nodes.map(node => (
        <motion.div
          key={node.id}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: node.id * 0.1 }}
          className="absolute bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8]"
          style={{ left: `${node.x}%`, top: `${node.y}%`, width: node.size, height: node.size }}
        />
      ))}
      <div className="absolute bottom-4 left-4 text-[8px] font-mono text-indigo-500 uppercase tracking-widest">Neural_Nexus_Link</div>
    </div>
  );
};

// --- FRACTAL LOOP ---
export const FractalLoop: React.FC = () => {
  return (
    <div className="w-full h-full bg-black rounded-xl overflow-hidden flex items-center justify-center perspective-1000">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            z: [-500, 500],
            opacity: [0, 1, 0],
            rotate: [0, 180]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "linear",
            delay: i * 0.5
          }}
          className="absolute border-2 border-indigo-500/30"
          style={{ width: 100, height: 100 }}
        />
      ))}
    </div>
  );
};

// --- CYBER SIGNAL ---
export const CyberSignal: React.FC = () => {
  return (
    <div className="w-full h-full bg-slate-950 rounded-xl overflow-hidden relative flex flex-col items-center justify-center border border-cyan-500/20">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
      <div className="w-full h-20 relative flex items-center overflow-hidden">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0"
        >
          {[...Array(4)].map((_, i) => (
            <svg key={i} width="160" height="40" viewBox="0 0 160 40" className="shrink-0">
              <path d="M0 20 H40 L50 5 L60 35 L70 20 H90 L100 0 L115 40 L125 20 H160" fill="none" stroke="#22d3ee" strokeWidth="2" className="drop-shadow-[0_0_5px_#22d3ee]" />
            </svg>
          ))}
        </motion.div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        <span className="text-[10px] font-mono text-cyan-500 uppercase font-bold tracking-[0.3em]">Signal_Live</span>
      </div>
    </div>
  );
};

// --- SPRINGY BARS ---
export const SpringyBars: React.FC = () => {
  return (
    <div className="flex items-end gap-1.5 h-32 p-4 bg-slate-900 rounded-xl border border-slate-800">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            height: [
              `${15 + Math.random() * 20}%`, 
              `${70 + Math.random() * 30}%`, 
              `${5 + Math.random() * 15}%`,
              `${15 + Math.random() * 20}%`
            ]
          }}
          transition={{ 
            duration: 0.6 + Math.random() * 0.4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: i * 0.04
          }}
          className="flex-1 bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-t-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]"
        />
      ))}
    </div>
  );
};

// --- RADAR SCAN ---
export const RadarScan: React.FC = () => {
  return (
    <div className="relative w-40 h-40 rounded-full border border-slate-800 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="absolute border border-slate-800 rounded-full" style={{ width: `${(i + 1) * 33}%`, height: `${(i + 1) * 33}%` }} />
        ))}
      </div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 origin-center bg-gradient-to-tr from-cyan-500/20 to-transparent"
        style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%)' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_cyan]" />
      </div>
    </div>
  );
};

// --- MAGNETIC BUTTON ---
export const MagneticButton: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
      className="px-8 py-3 bg-indigo-600 rounded-full font-bold text-white shadow-lg shadow-indigo-600/30 text-xs"
    >
      PULL_ME
    </motion.button>
  );
};

// --- COUNTER ANIMATION ---
export const CounterAnimation: React.FC = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev < 9999 ? prev + Math.floor(Math.random() * 100) : 0));
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return <div className="text-5xl font-black text-indigo-400 font-mono tabular-nums">{count.toString().padStart(4, '0')}</div>;
};

// --- SPOTLIGHT EFFECT ---
export const SpotlightEffect: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(circle 100px at ${x}px ${y}px, rgba(99,102,241,0.15), transparent 80%)`
  );

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full h-full bg-slate-900 overflow-hidden group rounded-xl"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-slate-700 font-bold uppercase tracking-[0.5em] text-[10px]">Scan_Focus</span>
      </div>
    </div>
  );
};

// --- RIPPLE EFFECT ---
export const RippleEffect: React.FC = () => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const addRipple = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples(prev => [...prev, { id: Date.now(), x, y }]);
  };

  return (
    <div 
      onClick={addRipple}
      className="relative w-full h-full bg-slate-950 overflow-hidden flex items-center justify-center cursor-pointer rounded-xl border border-slate-900"
    >
      <span className="text-slate-600 font-mono text-[10px] uppercase">Interactive_Node</span>
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onAnimationComplete={() => setRipples(prev => prev.filter(r => r.id !== ripple.id))}
            className="absolute w-12 h-12 border border-indigo-500 rounded-full pointer-events-none"
            style={{ left: ripple.x - 24, top: ripple.y - 24 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- STARFIELD ---
export const Starfield: React.FC = () => {
  return (
    <div className="w-full h-full bg-black relative overflow-hidden rounded-xl">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2 + Math.random() * 3, 
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%` 
          }}
        />
      ))}
    </div>
  );
};

// --- ROTATING CUBE ---
export const RotatingCube: React.FC = () => {
  return (
    <div className="perspective-800 w-full h-full flex items-center justify-center">
      <motion.div
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="relative w-24 h-24"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-indigo-500/20 border border-indigo-500 flex items-center justify-center text-[10px] font-mono text-white" style={{ transform: 'translateZ(48px)' }}>FRONT</div>
        <div className="absolute inset-0 bg-indigo-500/20 border border-indigo-500 flex items-center justify-center text-[10px] font-mono text-white" style={{ transform: 'translateZ(-48px) rotateY(180deg)' }}>BACK</div>
        <div className="absolute inset-0 bg-indigo-500/20 border border-indigo-500 flex items-center justify-center text-[10px] font-mono text-white" style={{ transform: 'translateX(-48px) rotateY(-90deg)' }}>LEFT</div>
        <div className="absolute inset-0 bg-indigo-500/20 border border-indigo-500 flex items-center justify-center text-[10px] font-mono text-white" style={{ transform: 'translateX(48px) rotateY(90deg)' }}>RIGHT</div>
        <div className="absolute inset-0 bg-indigo-500/20 border border-indigo-500 flex items-center justify-center text-[10px] font-mono text-white" style={{ transform: 'translateY(-48px) rotateX(90deg)' }}>TOP</div>
        <div className="absolute inset-0 bg-indigo-500/20 border border-indigo-500 flex items-center justify-center text-[10px] font-mono text-white" style={{ transform: 'translateY(48px) rotateX(-90deg)' }}>BOTTOM</div>
      </motion.div>
    </div>
  );
};

// --- MAGNETIC GRID ---
const Dot = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Fixed: Cast destructured x and y to numbers to prevent arithmetic type errors.
  const distance = useTransform([mouseX, mouseY], ([x, y]) => {
    const xVal = x as number;
    const yVal = y as number;
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    const parentRect = ref.current.parentElement!.getBoundingClientRect();
    const dx = xVal - (rect.left + rect.width / 2 - parentRect.left);
    const dy = yVal - (rect.top + rect.height / 2 - parentRect.top);
    const d = Math.sqrt(dx * dx + dy * dy);
    return Math.max(0, 1 - d / 100);
  });
  const scale = useSpring(useTransform(distance, [0, 1], [1, 2.5]), { damping: 20, stiffness: 200 });

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className="w-2 h-2 rounded-full bg-slate-700"
    />
  );
};

export const MagneticGrid: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const dots = Array.from({ length: 64 });

  return (
    <div 
      className="w-full h-full p-4 grid grid-cols-8 gap-4 bg-slate-950 items-center justify-center overflow-hidden rounded-xl"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => { mouseX.set(-100); mouseY.set(-100); }}
    >
      {dots.map((_, i) => (
        <Dot key={i} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
};

// --- GLASS REVEAL ---
export const GlassReveal: React.FC = () => {
  return (
    <div className="relative w-64 h-40 group cursor-pointer">
      <div className="absolute inset-0 bg-indigo-600 rounded-2xl transform transition-transform group-hover:scale-105 duration-500" />
      <div className="absolute inset-0 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 transition-opacity group-hover:opacity-0 duration-500 flex items-center justify-center">
        <span className="text-white font-bold tracking-widest uppercase text-xs">Dynamic_Blur</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white font-black text-xl italic">
        CLEAR_VISION
      </div>
    </div>
  );
};

// --- PARTICLE VORTEX ---
export const ParticleVortex: React.FC = () => {
  return (
    <div className="w-full h-full bg-black relative overflow-hidden flex items-center justify-center rounded-xl">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            rotate: 360,
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            repeat: Infinity, 
            ease: "linear",
            delay: i * 0.2
          }}
          className="absolute border border-indigo-400/20 rounded-full"
          style={{ 
            width: (i + 1) * 20, 
            height: (i + 1) * 20,
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]" />
        </motion.div>
      ))}
    </div>
  );
};
