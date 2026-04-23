/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Terminal, Code2, Rocket, Cpu, Globe, 
  Boxes, User, Sparkles, ArrowRight, Github, Twitter, Mail,
  Layout, Zap, Instagram, Youtube, ExternalLink
} from 'lucide-react';

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Data
const myApps = [
  { 
    name: 'Nexus Dashboard', 
    desc: 'Advanced command center for managing digital assets, server stats, and real-time logs.', 
    tag: 'Infrastructure', 
    color: 'from-cyan-500 to-blue-500',
    icon: <Layout className="w-8 h-8 text-cyan-400" />
  },
  { 
    name: 'Somay OS', 
    desc: 'Web-based operating environment tailored for maximum efficiency and aesthetic supremacy.', 
    tag: 'Web OS', 
    color: 'from-violet-500 to-fuchsia-500',
    icon: <Terminal className="w-8 h-8 text-violet-400" />
  },
  { 
    name: 'Owner Social', 
    desc: 'A next-generation social layer connecting elite creators across the globe silently and fast.', 
    tag: 'Platform', 
    color: 'from-blue-500 to-indigo-500',
    icon: <Globe className="w-8 h-8 text-blue-400" />
  },
  { 
    name: 'Quantum UI', 
    desc: 'A futuristic React component library with built-in physics and interactions.', 
    tag: 'Open Source', 
    color: 'from-emerald-500 to-cyan-500',
    icon: <Boxes className="w-8 h-8 text-emerald-400" />
  }
];

const socialLinks = [
  { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: '#instagram', color: 'hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10' },
  { name: 'Twitter (X)', icon: <Twitter className="w-5 h-5" />, url: '#twitter', color: 'hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/10' },
  { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, url: '#youtube', color: 'hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10' },
  { name: 'GitHub', icon: <Github className="w-5 h-5" />, url: '#github', color: 'hover:text-white hover:border-white/50 hover:bg-white/10' },
  { name: 'Email', icon: <Mail className="w-5 h-5" />, url: 'mailto:officialsomay222@gmail.com', color: 'hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10', main: true }
];

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* Animated Deep Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-zinc-950">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-50%] left-[-50%] w-[100vw] h-[100vw] rounded-full bg-cyan-900/30 blur-[120px] transform-gpu will-change-transform translate-x-[25%] translate-y-[25%]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-50%] right-[-50%] w-[100vw] h-[100vw] rounded-full bg-violet-900/30 blur-[150px] transform-gpu will-change-transform translate-x-[-25%] translate-y-[-25%]" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-display font-black text-xl tracking-tighter flex items-center gap-2 group cursor-pointer">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </motion.div>
            <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">OWNER<span className="text-cyan-500/80">_OFFICIAL</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#apps" className="hover:text-white transition-colors">Apps</a>
            <a href="#socials" className="hover:text-white transition-colors">Socials</a>
            <a href="#plans" className="hover:text-white transition-colors">Roadmap</a>
          </div>
          <a href="mailto:officialsomay222@gmail.com" className="bg-white text-zinc-950 hover:bg-cyan-400 border border-transparent px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]">
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* Modern Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mb-8"
            >
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full blur-2xl bg-gradient-to-r from-cyan-500 to-violet-500 transform-gpu will-change-transform"
              ></motion.div>
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-white/20 p-2 relative bg-zinc-950 shadow-2xl z-10 flex items-center justify-center">
                 <User className="w-16 h-16 text-zinc-300" />
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-4"
            >
              I am <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">Somay</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-display text-zinc-400 font-medium mb-8 flex items-center justify-center gap-3"
            >
              <span className="w-12 h-px bg-zinc-700"></span>
              The <span className="text-cyan-400 font-bold border-b border-cyan-400/50 pb-1 border-dashed">Owner_Official</span>
              <span className="w-12 h-px bg-zinc-700"></span>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12"
            >
              Developer. Architect. Creator. I build digital empires, craft beautiful web experiences, and shape the technologies of tomorrow.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            >
              <a href="#apps" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] font-bold rounded-full transition-all flex items-center justify-center gap-2">
                Explore My Apps <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#socials" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 font-bold rounded-full transition-all flex items-center justify-center gap-2 backdrop-blur-md">
                Connect With Me
              </a>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 transform-gpu will-change-transform"
          >
            <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent"></div>
          </motion.div>
        </section>

        {/* Enhanced Apps Grid */}
        <section id="apps" className="py-32 px-6 border-t border-white/5 bg-zinc-950/40 backdrop-blur-sm relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-display font-black mb-6">Sites & <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Applications</span></h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">The digital experiences built, owned, and operated under the Owner_Official banner.</p>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {myApps.map((app, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp} 
                  whileHover={{ y: -8 }}
                  className="group relative rounded-3xl bg-zinc-900/40 border border-t-white/10 border-white/5 p-8 overflow-hidden hover:bg-zinc-800/60 transition-colors duration-300 flex flex-col transform-gpu shadow-2xl outline-none"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${app.color} rounded-full blur-[100px] opacity-10 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none transform-gpu will-change-transform`}></div>
                  
                  <div className="relative z-10 flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
                        {app.icon}
                      </div>
                      <span className="px-3 py-1 bg-white/10 text-zinc-300 text-xs font-bold font-mono tracking-wider items-center rounded-full border border-white/10 backdrop-blur-sm">
                        {app.tag}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold font-display mb-3 text-white group-hover:text-cyan-300 transition-colors">{app.name}</h3>
                    <p className="text-zinc-400 leading-relaxed mb-8">{app.desc}</p>
                  </div>
                  
                  <div className="relative z-10 mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <a href="#" className="text-sm font-bold text-white hover:text-cyan-400 flex items-center gap-2 transition-colors">
                      Launch App <ExternalLink className="w-4 h-4" />
                    </a>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 group-hover:border-cyan-500/50 transition-all">
                       <Rocket className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Social Accounts & Connect */}
        <section id="socials" className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black mb-4">Official <span className="text-blue-400">Network</span></h2>
              <p className="text-xl text-zinc-400 max-w-xl">Find me across the web. Connect, follow my work, or drop an email for business inquiries.</p>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl border bg-white/5 transition-all duration-300 
                    ${social.main ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-white/10'} 
                    ${social.color}`}
                >
                  {social.icon}
                  <span className="font-bold">{social.name}</span>
                </motion.a>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 relative overflow-hidden text-center"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold font-display mb-2">Direct Contact</h3>
                <p className="text-zinc-400 mb-6 font-mono text-sm">For collabs and inquiries</p>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-lg font-bold text-white hover:bg-white/10 transition-colors select-all">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  officialsomay222@gmail.com
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Future Plans Mini-Section */}
        <section id="plans" className="py-24 px-6 border-t border-white/5 bg-zinc-950/60 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-1/2 h-[300px] bg-gradient-to-tl from-violet-900/10 to-transparent pointer-events-none" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-display font-black mb-4">Building the Future</h2>
                <p className="text-lg text-zinc-400 mb-6">The Owner_Official ecosystem is continuously expanding. Expect major drops in Open Source tools, AI workflows, and productivity platforms.</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-cyan-400">+ AI Integraion</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-violet-400">+ Cloud Compute</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-emerald-400">+ Mobile Apps</span>
                </div>
              </div>
              
              <div className="w-full md:w-auto shrink-0 p-8 rounded-full border-4 border-white/5 bg-gradient-to-b from-zinc-800 to-zinc-950 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-2 rounded-full border border-violet-500/30 animate-[spin_15s_linear_infinite_reverse]"></div>
                <Zap className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] relative z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-zinc-950 pt-16 pb-8 px-6 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="font-display font-black text-3xl tracking-tighter flex items-center gap-2 mb-3">
                <Sparkles className="w-6 h-6 text-cyan-400" />
                <span className="text-white">OWNER<span className="text-cyan-500/80">_OFFICIAL</span></span>
              </div>
              <p className="text-zinc-500 max-w-sm">Designing digital architecture and building the systems of tomorrow.</p>
            </div>
            
            <div className="flex gap-10 text-sm font-medium">
              <div className="flex flex-col gap-3 text-center md:text-left">
                <span className="text-zinc-200 font-bold mb-1">Index</span>
                <a href="#about" className="text-zinc-500 hover:text-cyan-400 transition-colors">About Me</a>
                <a href="#apps" className="text-zinc-500 hover:text-cyan-400 transition-colors">My Apps</a>
                <a href="#plans" className="text-zinc-500 hover:text-cyan-400 transition-colors">Roadmap</a>
              </div>
              <div className="flex flex-col gap-3 text-center md:text-left">
                <span className="text-zinc-200 font-bold mb-1">Connect</span>
                <a href="mailto:officialsomay222@gmail.com" className="text-zinc-500 hover:text-white transition-colors">Email</a>
                <a href="#socials" className="text-zinc-500 hover:text-white transition-colors">Social Platforms</a>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
             <p className="text-zinc-600 text-sm">© {new Date().getFullYear()} Somay (Owner_Official). All rights reserved.</p>
             <div className="flex items-center gap-4 text-zinc-600 text-sm">
                <span>System Status:<span className="text-emerald-500 ml-2">Online</span></span>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

