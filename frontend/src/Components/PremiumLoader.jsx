import React from "react";

const PremiumLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] h-screen w-full bg-slate-950/40 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl">
      <div className="relative flex items-center justify-center">
        {/* Outer ambient glow */}
        <div className="absolute h-24 w-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-20 blur-xl animate-pulse" />

        {/* Outer rotating ring */}
        <div className="h-20 w-20 rounded-full border-2 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin" />

        {/* Inner reverse-rotating ring */}
        <div className="absolute h-14 w-14 rounded-full border-2 border-transparent border-b-cyan-400 border-l-indigo-400 animate-[spin_1.5s_linear_infinite_reverse]" />

        {/* Center pulsing core */}
        <div className="absolute h-4 w-4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_12px_rgba(129,140,248,0.8)] animate-ping" />
        <div className="absolute h-3 w-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
      </div>

      {/* Glowing text effect */}
      <div className="mt-6 flex items-center space-x-1">
        <span className="text-sm font-medium tracking-widest text-slate-300 uppercase">
          Loading
        </span>
        <span className="flex space-x-1">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" />
        </span>
      </div>
    </div>
  );
};

export default PremiumLoader;
