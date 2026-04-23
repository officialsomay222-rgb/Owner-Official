/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Terminal, Code2, Rocket, Cpu, Globe, 
  Boxes, User, Sparkles, ArrowRight, Github, Twitter, Mail,
  Layout, Smartphone, Zap
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-900/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] rounded-full bg-blue-900/10 blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-display font-bold text-xl tracking-tighter flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>OWNER<span className="text-zinc-500">_OFFICIAL</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#creations" className="hover:text-cyan-400 transition-colors">Creations</a>
            <a href="#plans" className="hover:text-cyan-400 transition-colors">Future Plans</a>
          </div>
          <button className="bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium transition-all backdrop-blur-sm flex items-center gap-2 cursor-pointer">
            <Mail className="w-4 h-4" />
            Contact Me
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-8"
            >
              <Terminal className="w-4 h-4" />
              <span>v2.0.0 Online</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-6"
            >
              Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">Somay</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl md:text-3xl font-display text-zinc-400 mb-8"
            >
              a.k.a <span className="text-zinc-200 border-b border-zinc-700/50 pb-1 border-dashed">Owner<span className="text-cyan-500/80">_Official</span></span>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12"
            >
              I build immersive digital experiences, unhinged applications, and shape the future of the web. Welcome to my creative domain.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a href="#creations" className="w-full sm:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer">
                Explore Creations <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#about" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 font-semibold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer">
                <User className="w-4 h-4" /> My Details
              </a>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 border-t border-white/5 bg-zinc-950/20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">About <span className="text-cyan-400">Owner</span></h2>
              <p className="text-xl text-zinc-400 max-w-2xl">The details behind the screen name. What drives the official Owner.</p>
            </div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div variants={fadeInUp} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/[0.07] transition-all">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Origin Story</h3>
                <p className="text-zinc-400 leading-relaxed">Born from a passion for technology, the alias 'Owner_Official' represents complete mastery over the systems and apps I architect.</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-white/[0.07] transition-all">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Core Stack</h3>
                <p className="text-zinc-400 leading-relaxed">Fluent in modern web technologies. I specialize in building scalable backends, and crafting visually stunning frontends.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.07] transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Vision</h3>
                <p className="text-zinc-400 leading-relaxed">To build digital ecosystems that don't just function, but inspire. Creating impactful tools that empower users globally.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Creations / Apps Section */}
        <section id="creations" className="py-32 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">My <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Apps & Creations</span></h2>
                <p className="text-xl text-zinc-400 max-w-2xl">A curated selection of projects forged in the lab.</p>
              </div>
              <a href="#" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                View GitHub <Github className="w-4 h-4" />
              </a>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* App 1 */}
              <motion.div variants={fadeInUp} className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 flex flex-col">
                <div className="h-64 bg-zinc-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:scale-105 transition-transform duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Layout className="w-20 h-20 text-white/20" />
                  </div>
                </div>
                <div className="p-8 pb-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold font-display group-hover:text-cyan-400 transition-colors">Nexus Dashboard</h3>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/20">Active</span>
                  </div>
                  <p className="text-zinc-400 mb-6 flex-1">A highly analytical dashboard for managing digital assets in real-time. Features dark-mode aesthetics and fluid data visualizations.</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-1 rounded">React</span>
                    <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-1 rounded">Tailwind</span>
                  </div>
                </div>
              </motion.div>

              {/* App 2 */}
              <motion.div variants={fadeInUp} className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 flex flex-col">
                <div className="h-64 bg-zinc-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 group-hover:scale-105 transition-transform duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Smartphone className="w-20 h-20 text-white/20" />
                  </div>
                </div>
                <div className="p-8 pb-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold font-display group-hover:text-violet-400 transition-colors">Owner Social</h3>
                    <span className="px-3 py-1 bg-violet-500/10 text-violet-400 text-xs font-bold rounded-full border border-violet-500/20">Beta</span>
                  </div>
                  <p className="text-zinc-400 mb-6 flex-1">A next-generation platform for creators. Combining fast communication with exclusive community features and seamless UI.</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-1 rounded">SPA</span>
                    <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-1 rounded">Cloud</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Future Plans Section */}
        <section id="plans" className="py-32 px-6 border-t border-white/5 bg-zinc-950/40 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium mb-6">
                <Rocket className="w-4 h-4" />
                <span>Roadmap</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Future <span className="text-blue-400">Plans</span></h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">The journey has just begun. Here is what is on the horizon for Owner_Official.</p>
            </div>

            <div className="max-w-4xl mx-auto relative">
              <div className="absolute left-[19px] md:left-1/2 md:-ml-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              
              <div className="space-y-12">
                {/* Milestone 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-950 bg-cyan-500 text-zinc-950 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="ml-6 md:ml-0 w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 border border-white/10 shadow hover:border-cyan-500/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-cyan-400">Phase 1: Ecosystem Expansion</h4>
                      <span className="text-xs font-mono text-zinc-500">Upcoming</span>
                    </div>
                    <p className="text-sm text-zinc-400">Launching three new interconnected productivity apps under a singular, unified Owner ecosystem.</p>
                  </div>
                </motion.div>

                {/* Milestone 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-950 bg-violet-500 text-zinc-950 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <div className="ml-6 md:ml-0 w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 border border-white/10 shadow hover:border-violet-500/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-violet-400">Phase 2: Open Initiatives</h4>
                      <span className="text-xs font-mono text-zinc-500">Mid-term</span>
                    </div>
                    <p className="text-sm text-zinc-400">Releasing core components of custom developed tools to the public developer community.</p>
                  </div>
                </motion.div>

                {/* Milestone 3 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-950 bg-zinc-700 text-zinc-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="ml-6 md:ml-0 w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 border border-white/10 shadow hover:border-white/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-zinc-300">Phase 3: AI Era</h4>
                      <span className="text-xs font-mono text-zinc-500">Long-term</span>
                    </div>
                    <p className="text-sm text-zinc-400">Developing smart automated workflows powered by deeply integrated machine learning models.</p>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-zinc-950 py-12 px-6 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="font-display font-bold text-2xl tracking-tighter flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-cyan-400" />
                <span>OWNER<span className="text-zinc-500">_OFFICIAL</span></span>
              </div>
              <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} Somay. All rights reserved.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Twitter className="w-4 h-4 text-zinc-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Github className="w-4 h-4 text-zinc-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Mail className="w-4 h-4 text-zinc-400" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
