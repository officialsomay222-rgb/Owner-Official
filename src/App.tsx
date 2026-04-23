/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import React, { useEffect } from 'react';
import { 
  Github, Twitter, Youtube, Instagram, MoveUpRight, Zap, Layers, Globe, Calculator, Lock, Diamond, Hexagon, TerminalSquare 
} from 'lucide-react';

const myApps = [
  { 
    name: 'Loki X Prime', 
    desc: 'Advanced web interface engineered for ultimate user engagement and fluid interactions.', 
    tag: 'Web Platform', 
    icon: <Globe className="w-4 h-4" />,
    url: 'https://loki-x-prime.vercel.app/',
    number: '01',
    iconColor: 'group-hover:text-[#ff00c8]',
    gradient: 'from-[#ff00c8] to-[#ffea00]',
    spotlight: 'rgba(255, 0, 200, 0.15)'
  },
  { 
    name: 'Commerce Prime', 
    desc: 'A precision-engineered digital utility designated for modern commerce algorithms.', 
    tag: 'Web Utility', 
    icon: <Calculator className="w-4 h-4" />,
    url: 'https://commerce-prime.vercel.app/',
    number: '02',
    iconColor: 'group-hover:text-[#00ffd5]',
    gradient: 'from-[#00ffd5] to-[#8800ff]',
    spotlight: 'rgba(0, 255, 213, 0.15)'
  },
  { 
    name: 'Classified Build', 
    desc: 'Next-generation digital infrastructure currently in stealth development.', 
    tag: 'Stealth Sys', 
    icon: <Lock className="w-4 h-4" />,
    url: '#',
    number: '03',
    iconColor: 'group-hover:text-[#fffb00]',
    gradient: 'from-[#ffea00] to-[#ff007b]',
    spotlight: 'rgba(255, 251, 0, 0.15)'
  }
];

const socialLinks = [
  { name: 'Instagram', icon: <Instagram className="w-4 h-4" />, url: '#instagram' },
  { name: 'X / Twitter', icon: <Twitter className="w-4 h-4" />, url: '#twitter' },
  { name: 'YouTube', icon: <Youtube className="w-4 h-4" />, url: '#youtube' },
  { name: 'GitHub', icon: <Github className="w-4 h-4" />, url: '#github' },
];

function ProjectCard({ app, index }: { app: any, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="hw-accel h-full relative group"
      onMouseMove={handleMouseMove}
    >
      <a 
        href={app.url}
        target={app.url !== '#' ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="glass-obsidian rounded-2xl flex flex-col justify-between h-full min-h-[460px] outline-none cursor-pointer relative block overflow-hidden p-8"
      >
          {/* Spotlight Effect (Vercel/Linear Style) */}
          <motion.div
            className="pointer-events-none absolute -inset-px transition duration-500 opacity-0 group-hover:opacity-100 z-0"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  500px circle at ${mouseX}px ${mouseY}px,
                  ${app.spotlight},
                  transparent 80%
                )
              `,
            }}
          />

          <div className="flex justify-between items-start w-full relative z-10 mb-8">
             <span className={`text-xs font-display font-black ${app.iconColor} transition-colors duration-500 text-zinc-600 tracking-widest`}>{app.number}</span>
             <div className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/60 group-hover:border-white/30 backdrop-blur-md transition-all duration-500 overflow-hidden`}>
                <MoveUpRight className={`w-5 h-5 text-white/50 ${app.iconColor} group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500`} />
             </div>
          </div>

          {/* Premium Browser Window Mockup */}
          <div className="w-full h-36 mb-8 rounded-xl bg-black border border-white/5 relative overflow-hidden flex flex-col browser-mock z-10 shadow-2xl">
             <div className="w-full h-5 bg-white/5 border-b border-white/5 flex items-center px-3 gap-1.5 backdrop-blur-md">
               <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#ff0055] transition-colors" />
               <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#ffea00] transition-colors" />
               <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#00d5ff] transition-colors" />
             </div>
             <div className="flex-1 relative overflow-hidden bg-[#030303]">
                <div className={`absolute inset-0 opacity-20 group-hover:opacity-50 transition-opacity duration-700 bg-gradient-to-tr ${app.gradient} mix-blend-screen`} />
                <div className="absolute top-4 left-4 w-1/2 h-2 rounded-full bg-white/10" />
                <div className="absolute top-8 left-4 w-1/3 h-2 rounded-full bg-white/5" />
                <div className="absolute bottom-4 right-4 w-1/4 h-1/2 rounded bg-white/5 mix-blend-overlay" />
             </div>
          </div>

          <div className="relative z-10 mt-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className={`text-zinc-500 ${app.iconColor} transition-colors duration-500`}>
                  {app.icon}
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 border border-white/10 rounded-full py-1.5 px-4 ${app.iconColor} transition-colors duration-500 bg-[#000]/60 backdrop-blur-sm`}>
                    {app.tag}
                </span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3 tracking-tight uppercase leading-none">{app.name}</h3>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed font-light group-hover:text-zinc-300 transition-colors duration-500">{app.desc}</p>
          </div>
      </a>
    </motion.div>
  );
}

export default function App() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const marqueeText = "OWNER_OFFICIAL  •  LATENCY ZERO  •  SUPREME VISUALS  •  STEALTH ARCHITECTURE  •  RGB OVERRIDE  •  ";

  return (
    <div className="min-h-screen bg-[#010101] font-sans selection:bg-[#00d5ff]/30 selection:text-white relative overflow-hidden">
      
      {/* Premium Texture & Grids */}
      <div className="premium-noise" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-micro-grid opacity-50 hw-accel" />
      
      {/* Fluid Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-blob blob-1" />
        <div className="aurora-blob blob-2" />
        <div className="aurora-blob blob-3" />
      </div>

      {/* GOD LEVEL Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex justify-between items-center bg-gradient-to-b from-[#010101] via-[#010101]/80 to-transparent pointer-events-none hw-accel">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="pointer-events-auto god-border rounded-full shadow-[0_0_25px_rgba(255,0,123,0.3)] mix-blend-screen"
        >
          <span className="font-display font-black text-[9px] md:text-xs uppercase text-white flex items-center gap-3 px-5 py-2.5 md:py-3 relative z-10 w-full h-full tracking-[0.2em] bg-[#020202]/90 rounded-full backdrop-blur-xl">
             <Diamond className="w-3 h-3 fill-[#00ffd5] animate-[pulse_2s_ease-in-out_infinite] drop-shadow-[0_0_8px_#00ffd5]" />
             <span className="drop-shadow-md">OWNER_OFFICIAL</span>
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="pointer-events-auto hidden md:flex items-center gap-10 font-sans text-[10px] uppercase tracking-[0.3em] font-semibold text-zinc-400"
        >
          <div className="flex items-center gap-3 god-border rounded-full px-4 py-2 bg-[#020202]/90 backdrop-blur-xl mix-blend-screen">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffd5] animate-[pulse_1.5s_infinite] shadow-[0_0_8px_#00ffd5]" />
            <span className="text-zinc-200 tracking-[0.4em] text-[9px] mt-0.5">System Online</span>
          </div>
          <a href="#work" className="hover:text-white transition-colors relative group py-2">
             Assets
             <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#00ffd5] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 shadow-[0_0_8px_#00ffd5]" />
          </a>
          <a href="#contact" className="hover:text-white transition-colors relative group py-2">
             Initiate
             <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ff007b] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 shadow-[0_0_8px_#ff007b]" />
          </a>
        </motion.div>
      </nav>

      {/* Architectural Frame */ }
      <div className="fixed left-8 top-8 bottom-8 w-[1px] rgb-glow-line z-0 pointer-events-none hidden xl:block opacity-40 mix-blend-screen" />
      <div className="fixed right-8 top-8 bottom-8 w-[1px] rgb-glow-line z-0 pointer-events-none hidden xl:block opacity-40 mix-blend-screen" />

      <main className="relative z-10 w-full flex flex-col items-center">
        
        {/* TITANIC Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center w-full px-4 pt-44 md:pt-32 overflow-hidden relative">
          
          {/* subtle shooting stars */}
          <div className="meteor" style={{ left: '30%', animationDelay: '1s' }} />
          <div className="meteor" style={{ left: '70%', animationDelay: '3s' }} />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center w-full max-w-[95vw] mx-auto hw-accel z-10 relative"
          >
            <motion.div variants={itemVariants} className="mb-10 flex items-center justify-center gap-3">
              <TerminalSquare className="w-4 h-4 text-[#00d5ff] drop-shadow-[0_0_8px_#00d5ff] animate-pulse" />
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-semibold text-[#00d5ff] drop-shadow-[0_0_8px_rgba(0,213,255,0.6)]">
                System Initialized // RGB Protocol
              </span>
            </motion.div>

            {/* GOD-LEVEL RGB TYPOGRAPHY WITH CHROMATIC REFLECTION */}
            <motion.div variants={itemVariants} className="w-full relative mt-2 mb-10 pointer-events-none text-reflection">
               <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[rgba(255,0,123,0.15)] -translate-y-1/2 hidden md:block" />
               <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[rgba(0,213,255,0.15)] -translate-x-1/2 hidden md:block" />
               
               <h1 className="text-[17vw] sm:text-[15vw] md:text-[13vw] lg:text-[12vw] font-display font-black leading-[1] tracking-[-0.03em] text-rgb select-none whitespace-nowrap">
                 SOMAY
               </h1>
            </motion.div>
            
            {/* Holographic Glowing Badge - Pill Shaped, Extreme Glassmorphism */}
            <motion.div variants={itemVariants} className="mt-6 z-10 relative group cursor-default">
                {/* Ambient Sweeping Aura */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#ff007b] via-[#00d5ff] to-[#ff007b] rounded-full blur-[12px] opacity-40 group-hover:opacity-75 transition duration-1000 -z-10 bg-[length:200%_auto] animate-[rgb-sweep_4s_linear_infinite]" />
                {/* Inner Obsidian Pill */}
                <div className="px-12 py-3.5 flex items-center justify-center relative z-10 bg-[#000]/70 border border-white/20 rounded-full backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] hover:bg-black transition-colors duration-500">
                    {/* Inner top shine */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    <h2 className="text-[11px] md:text-xs font-sans font-bold tracking-[0.7em] md:tracking-[0.8em] uppercase text-white whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                       A.K.A OWNER
                    </h2>
                </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="w-[1px] h-24 md:h-32 rgb-glow-line mt-12 mb-10 shadow-[0_0_20px_#ff007b] opacity-80" />
            
            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <p className="text-[10px] md:text-xs text-zinc-400 max-w-lg font-light leading-[2.5] tracking-[0.3em] uppercase text-center drop-shadow-md">
                Uncompromising geometric precision. <br /> Absolute vibrancy.
              </p>
              <div className="mt-6 px-6 py-2.5 border border-[#00d5ff]/30 bg-[#00d5ff]/10 rounded-full shadow-[inset_0_0_15px_rgba(0,213,255,0.2)]">
                <span className="text-[#00d5ff] font-bold tracking-[0.4em] drop-shadow-[0_0_8px_rgba(0,213,255,0.8)] text-[9px] md:text-[10px] uppercase">
                  Absolute authority.
                </span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Supreme Marquee Separator */}
        <div className="w-full border-y border-white/[0.03] bg-gradient-to-r from-transparent via-white/[0.02] to-transparent py-5 overflow-hidden relative z-10 backdrop-blur-md">
           <div className="marquee-container flex whitespace-nowrap opacity-[0.65]">
              <span className="text-[10px] md:text-xs font-display font-black text-transparent bg-clip-text text-rgb tracking-[0.4em] px-4 w-1/2 mix-blend-screen">{marqueeText}{marqueeText}</span>
              <span className="text-[10px] md:text-xs font-display font-black text-transparent bg-clip-text text-rgb tracking-[0.4em] px-4 w-1/2 mix-blend-screen">{marqueeText}{marqueeText}</span>
           </div>
        </div>

        {/* The Monolith Grid - Colorful Edge */}
        <section className="w-full max-w-[1400px] mx-auto py-32 px-6 md:px-16 lg:px-20 relative z-10 scan-line">
          <div className="flex flex-col md:flex-row pb-8 border-b border-white/5 mb-12 relative">
             <h3 className="text-xl md:text-3xl font-display font-bold text-white uppercase tracking-tight flex items-center gap-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff007b] shadow-[0_0_15px_#ff007b]" />
                Core Architecture
             </h3>
             <p className="md:ml-auto text-xs text-zinc-500 max-w-sm font-normal mt-4 md:mt-0 tracking-widest uppercase">
               The internal logic dictating every line of code deployed by Owner_Official.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] p-[1px] backdrop-blur-md">
             {/* Cell 1 */}
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="p-12 relative group bg-[#040404] hover:bg-[#080808] transition-colors duration-500">
                <div className="w-14 h-14 border border-white/10 flex items-center justify-center mb-16 rounded-2xl bg-black group-hover:border-[#ff007b] group-hover:shadow-[0_0_30px_rgba(255,0,123,0.3)] transition-all overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#ff007b] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                   <Zap className="w-6 h-6 text-zinc-500 group-hover:text-[#ff007b] transition-colors relative z-10" />
                </div>
                <span className="text-[10px] font-display font-bold text-white mb-4 block tracking-[0.3em] group-hover:text-[#ff007b] transition-colors">01 / LATENCY ZERO</span>
                <p className="text-zinc-500 text-sm leading-relaxed font-light mt-4 group-hover:text-zinc-300 transition-colors">Calculated GPU acceleration. Frames rendered with absolute mathematical perfection. No lag, only flow.</p>
             </motion.div>
             
             {/* Cell 2 */}
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }} className="p-12 relative group bg-[#040404] hover:bg-[#080808] transition-colors duration-500">
                <div className="w-14 h-14 border border-white/10 flex items-center justify-center mb-16 rounded-2xl bg-black group-hover:border-[#00d5ff] group-hover:shadow-[0_0_30px_rgba(0,213,255,0.3)] transition-all overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#00d5ff] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                   <Hexagon className="w-6 h-6 text-zinc-500 group-hover:text-[#00d5ff] transition-colors relative z-10" />
                </div>
                <span className="text-[10px] font-display font-bold text-white mb-4 block tracking-[0.3em] group-hover:text-[#00d5ff] transition-colors">02 / OWNER OFFICIAL</span>
                <p className="text-zinc-500 text-sm leading-relaxed font-light mt-4 group-hover:text-zinc-300 transition-colors">Every digital asset bears the signature of Somay. Verified. Secured. Authoritative.</p>
             </motion.div>
             
             {/* Cell 3 */}
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="p-12 relative group bg-[#040404] hover:bg-[#080808] transition-colors duration-500">
                <div className="w-14 h-14 border border-white/10 flex items-center justify-center mb-16 rounded-2xl bg-black group-hover:border-[#ffea00] group-hover:shadow-[0_0_30px_rgba(255,234,0,0.3)] transition-all overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#ffea00] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                   <Layers className="w-6 h-6 text-zinc-500 group-hover:text-[#ffea00] transition-colors relative z-10" />
                </div>
                <span className="text-[10px] font-display font-bold text-white mb-4 block tracking-[0.3em] group-hover:text-[#ffea00] transition-colors">03 / SUPREME RGB</span>
                <p className="text-zinc-500 text-sm leading-relaxed font-light mt-4 group-hover:text-zinc-300 transition-colors">Stripping away noise. Engineering UI that commands attention through extremely rich chroma layers.</p>
             </motion.div>
          </div>
        </section>

        {/* High-End Assets Deck - Vercel/Linear Style Hover */}
        <section id="work" className="w-full max-w-[1400px] mx-auto py-20 px-6 md:px-16 lg:px-20 relative z-10">
          <div className="flex items-center gap-6 mb-20">
             <div className="w-12 h-1 rgb-glow-line shadow-[0_0_20px_#00d5ff]" />
             <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter drop-shadow-xl">Live Assets</h2>
             <div className="flex-1 h-[1px] rgb-glow-line ml-4 md:ml-8 opacity-40 mix-blend-screen" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {myApps.map((app, index) => (
                 <ProjectCard key={index} app={app} index={index} />
              ))}
          </div>
        </section>

      </main>

      {/* monolithic colorful footer */}
      <footer id="contact" className="w-full mt-32 border-t border-white/5 relative z-20 bg-[#000]">
        
        <div className="max-w-[1400px] mx-auto px-6 py-32 md:py-48 flex flex-col items-center border-b border-white/5 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-[radial-gradient(circle,rgba(255,0,123,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none mix-blend-screen" />

            <a href="mailto:officialsomay222@gmail.com" className="group flex flex-col items-center justify-center outline-none hw-accel relative z-10">
                <span className="text-[10px] font-semibold tracking-[0.5em] uppercase text-zinc-300 mb-10 px-10 py-4 rounded-full bg-[#030303]/80 god-border backdrop-blur-xl hover:text-white hover:shadow-[0_0_30px_rgba(0,213,255,0.3)] transition-all duration-500">
                  Establish Connection
                </span>
                <div className="flex flex-col items-center text-center mt-6">
                   <h2 className="text-[15vw] md:text-8xl font-display font-black tracking-normal text-rgb select-none whitespace-nowrap drop-shadow-[0_0_50px_rgba(255,0,123,0.5)] group-hover:scale-[1.05] transition-transform duration-[1s] cubic-bezier(0.16,1,0.3,1)">
                      SOMAY
                   </h2>
                </div>
            </a>
        </div>

        <div className="w-full bg-[#030303] relative z-10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-4 mb-10 md:mb-0">
                  <Diamond className="w-5 h-5 fill-[#ff007b]" />
                  <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-zinc-500">
                      © {new Date().getFullYear()} <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">OWNER_OFFICIAL</span>
                  </p>
                </div>
                
                <div className="flex gap-6 md:gap-8">
                    {socialLinks.map((link, idx) => (
                        <motion.a 
                            key={idx} 
                            href={link.url}
                            whileHover={{ y: -4, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="text-zinc-400 hover:text-[#00d5ff] transition-colors hw-accel group relative border border-white/5 rounded-full p-3.5 bg-black hover:bg-[#0a0a0a] hover:border-[#00d5ff]/50 hover:shadow-[0_0_20px_rgba(0,213,255,0.2)]"
                            aria-label={link.name}
                        >
                            <motion.div className="group-hover:rotate-12 transition-transform duration-300">
                                {link.icon}
                            </motion.div>
                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#00d5ff] opacity-0 group-hover:opacity-100 rounded-full shadow-[0_0_15px_#00d5ff] transition-opacity duration-300" />
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
      </footer>

    </div>
  );
}
