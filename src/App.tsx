/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import { Github, Twitter, Youtube, Instagram, MoveUpRight, Zap, Layers, Globe, Calculator, Lock, Diamond, Hexagon, TerminalSquare, X, Code2, Sun, Moon } from 'lucide-react';
import * as THREE from 'three';

// --- DATA ---
const myApps = [
  { 
    name: 'Loki X Prime', 
    desc: 'Advanced web interface engineered for ultimate client engagement.', 
    fullDesc: 'Loki X Prime operates at the absolute edge of modern web rendering. By bypassing standard design conventions, it introduces a fluid, zero-latency architectural aesthetic. Engineered deeply with physics-based motion and hardware-accelerated gradients, this platform is a masterclass in God-Level UX.',
    tag: 'Web Platform', 
    icon: <Globe className="w-4 h-4" />,
    image: 'https://i.ibb.co/27vjwr6f/Screenshot-20260617-125714-Loki-Prime-X.jpg',
    url: 'https://loki-x-prime.vercel.app/',
    number: '01',
    iconColor: 'text-[#ff00c8]',
    hoverColor: 'group-hover:text-[#ff00c8]',
    baseColor: '#ff00c8',
    gradient: 'from-[#ff00c8] to-[#ffea00]',
    spotlight: 'rgba(255, 0, 200, 0.2)',
    features: ['Hardware Accelerated UI', 'Intelligent State Routing', 'Physics-Based Layouts'],
    tech: ['React 18', 'Framer / Motion', 'WebGL Subsystem']
  },
  { 
    name: 'Commerce Prime', 
    desc: 'Precision-engineered digital utility for modern commerce logic.', 
    fullDesc: 'A high-throughput algorithmic dashboard designed exclusively for commerce. Commerce Prime strips away the bloated interfaces of traditional systems, offering raw, unadulterated speed. Financial data flows seamlessly through encrypted visual channels with zero visual stutter.',
    tag: 'Web Utility', 
    icon: <Calculator className="w-4 h-4" />,
    image: 'https://i.ibb.co/LdwsZdj2/Screenshot-20260617-125701-Chrome.jpg',
    url: 'https://commerce-prime.vercel.app/',
    number: '02',
    iconColor: 'text-[#00ffd5]',
    hoverColor: 'group-hover:text-[#00ffd5]',
    baseColor: '#00ffd5',
    gradient: 'from-[#00ffd5] to-[#8800ff]',
    spotlight: 'rgba(0, 255, 213, 0.2)',
    features: ['Real-time Algorithmic Engine', 'Dynamic Metric Dashboards', 'Sub-millisecond Feedback'],
    tech: ['Next.js Framework', 'Tailwind Processor', 'Secure Payments']
  },
  { 
    name: 'Classified Build', 
    desc: 'Next-generation digital infrastructure in stealth development.', 
    fullDesc: 'Highly redacted stealth protocol. Details of this architecture are currently restricted to authorized personnel only. Features adaptive encryption layouts and shifting DOM elements to prevent unauthorized scraping or replication.',
    tag: 'Stealth Sys', 
    icon: <Lock className="w-4 h-4" />,
    url: '#',
    number: '03',
    iconColor: 'text-[#fffb00]',
    hoverColor: 'group-hover:text-[#fffb00]',
    baseColor: '#fffb00',
    gradient: 'from-[#ffea00] to-[#ff007b]',
    spotlight: 'rgba(255, 251, 0, 0.2)',
    features: ['Redacted Interface Layers', 'Quantum Routing Protocols', 'Adaptive Camouflage Mode'],
    tech: ['Unknown Architecture', 'Cybernetic Injection', 'Encrypted State']
  }
];

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.5H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.112.551 4.17 1.594 5.968l-1.523 5.565 5.69-1.493a11.966 11.966 0 006.27 1.761c6.646 0 12.034-5.385 12.034-12.031S18.677 0 12.031 0zm6.183 17.387c-.255.72-.884 1.34-1.614 1.488-.584.119-1.332.186-2.585-.236-4.51-1.503-7.533-5.263-7.753-5.564-.22-.3-.1.185-1.85-2.65-.185-2.65.185 1.528 2.062 2.378 2.062.85 0 1.262-.39 1.772-.39s.51.524.73.524 1.353-.105 1.72-.255.454-3.567.873-4.137.98-.363 1.135-.363c.156 0 .397.028.583.085.185.057.426.114.58.426.24.496.824 2.013.895 2.155s.114.283.028.453-.142.227-.3.397c-.156.17-.326.38-.47.51-.156.128-.323.27-.142.582.185.312.823 1.353 1.763 2.195 1.216 1.09 2.228 1.43 2.54 1.58.312.142.496.114.68-.1.185-.213.794-.922.994-1.233.213-.312.41-.255.71-.142.284.114 1.8.85 2.11 1.006.313.156.526.227.597.355.085.128.085.737-.17 1.46z"/>
  </svg>
);

const getSocialLinks = (isLight: boolean) => [
  { 
    name: 'Instagram', icon: <Instagram className="w-5 h-5 md:w-6 md:h-6" />, url: 'https://www.instagram.com/its_owner_official/?utm_source=ig_web_button_share_sheet',
    hoverProps: { className: 'hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:shadow-[0_0_25px_rgba(225,48,108,0.4)]' },
    dotClass: 'bg-[#E1306C] shadow-[0_0_15px_#E1306C]'
  },
  { 
    name: 'X / Twitter', icon: <XIcon className="w-5 h-5 md:w-6 md:h-6" />, url: '#twitter',
    hoverProps: { className: isLight ? 'hover:text-black hover:border-black/40 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]' : 'hover:text-white hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]' },
    dotClass: isLight ? 'bg-black shadow-[0_0_15px_#000]' : 'bg-white shadow-[0_0_15px_#fff]'
  },
  { 
    name: 'WhatsApp', icon: <WhatsAppIcon className="w-5 h-5 md:w-6 md:h-6" />, url: 'https://wa.me/918929395222',
    hoverProps: { className: 'hover:text-[#25D366] hover:border-[#25D366]/40 hover:shadow-[0_0_25px_rgba(37,211,102,0.4)]' },
    dotClass: 'bg-[#25D366] shadow-[0_0_15px_#25D366]'
  },
  { 
    name: 'GitHub', icon: <Github className="w-5 h-5 md:w-6 md:h-6" />, url: '#github',
    hoverProps: { className: isLight ? 'hover:text-black hover:border-black/40 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]' : 'hover:text-white hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]' },
    dotClass: isLight ? 'bg-black shadow-[0_0_15px_#000]' : 'bg-white shadow-[0_0_15px_#fff]'
  },
];

// --- 3D WEBGL COMPONENT ---
function CyberCore({ isLight }: { isLight: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const innerFlowRef = useRef<THREE.Mesh>(null);

  const { tubeGeom, wireGeom, innerGeom, flowTex, flowTexReverse } = useMemo(() => {
    class InfinityCurve extends THREE.Curve<THREE.Vector3> {
      scale: number;
      constructor(scale = 1) {
        super();
        this.scale = scale;
      }
      getPoint(t: number, optionalTarget = new THREE.Vector3()) {
        const theta = t * Math.PI * 2;
        const a = this.scale;
        // Perfect Infinity Math (Lemniscate of Bernoulli)
        const x = (a * Math.cos(theta)) / (1 + Math.pow(Math.sin(theta), 2));
        const y = (a * Math.sin(theta) * Math.cos(theta)) / (1 + Math.pow(Math.sin(theta), 2));
        const z = a * 0.3 * Math.sin(theta); // 3D depth wave flow
        return optionalTarget.set(x, y, z);
      }
    }
    const infCurve = new InfinityCurve(2.4); // optimized size for all devices
    const tGeom = new THREE.TubeGeometry(infCurve, 100, 0.28, 24, true);
    const wGeom = new THREE.TubeGeometry(infCurve, 64, 0.38, 8, true);
    const iGeom = new THREE.TubeGeometry(infCurve, 100, 0.1, 12, true);
    
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 16;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 1024, 0);
    // Google colors: Blue, Red, Yellow, Green
    gradient.addColorStop(0, '#4285F4');
    gradient.addColorStop(0.25, '#EA4335');
    gradient.addColorStop(0.5, '#FBBC05');
    gradient.addColorStop(0.75, '#34A853');
    gradient.addColorStop(1, '#4285F4');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 16);
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;

    const texRev = tex.clone();
    
    return { tubeGeom: tGeom, wireGeom: wGeom, innerGeom: iGeom, flowTex: tex, flowTexReverse: texRev };
  }, []);

  // Use framer-motion approach or manual reading of scroll to drive 3D changes smoothly
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    // Flow the texture inside the tube (slower)
    flowTex.offset.x = -time * 0.15;
    flowTexReverse.offset.x = time * 0.1;

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = time * 0.15;
      wireRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }
    if (innerFlowRef.current) {
      innerFlowRef.current.rotation.y = time * 0.15;
      innerFlowRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }

    // Scroll calculations for group scale and rotation
    if (groupRef.current) {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(scrollY / maxScroll, 1);

      // Smoothly interpolate current values towards target values using lerp
      const targetScale = 0.9 + scrollProgress * 0.6; // Expands slightly as you scroll down
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);

      const targetRotationZ = scrollProgress * Math.PI * 0.5; // Rotate sideways
      const targetRotationX = scrollProgress * 1.5; // Pitch rotation
      
      // We manually lerp rotation. x and z
      groupRef.current.rotation.z += (targetRotationZ - groupRef.current.rotation.z) * 0.05;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={0.9}>
      <ambientLight intensity={isLight ? 0.8 : 0.2} />
      <directionalLight position={[10, 10, 5]} intensity={isLight ? 2 : 4} color="#4285F4" />
      <directionalLight position={[-10, -10, -5]} intensity={isLight ? 2 : 4} color="#EA4335" />
      <directionalLight position={[0, -10, 0]} intensity={isLight ? 1.5 : 3} color="#FBBC05" />
      <directionalLight position={[0, 10, -5]} intensity={isLight ? 1.5 : 3} color="#34A853" />
      
      {!isLight && <Stars radius={100} depth={50} count={1000} factor={4} saturation={1} fade speed={1} />}
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        
        {/* Inner flowing energy core */}
        <mesh ref={innerFlowRef} geometry={innerGeom}>
          <meshBasicMaterial 
            map={flowTexReverse}
            transparent
            opacity={isLight ? 0.5 : 1}
            blending={THREE.AdditiveBlending}
            color="#ffffff"
          />
        </mesh>

        {/* Outer Solid Glass Tube wrapping the energy */}
        <mesh ref={meshRef} geometry={tubeGeom}>
          <meshPhysicalMaterial 
            map={flowTex}
            emissiveMap={flowTex}
            emissive="#ffffff"
            emissiveIntensity={isLight ? 0.2 : 1.5}
            color={isLight ? "#ffffff" : "#020202"} 
            clearcoat={1} 
            clearcoatRoughness={0} 
            metalness={isLight ? 0.3 : 1} 
            roughness={isLight ? 0.1 : 0.05}
            transmission={isLight ? 0.2 : 0.8} // High transmission to see the energy core
            thickness={2}
            envMapIntensity={isLight ? 2 : 1.5}
            transparent
            opacity={isLight ? 0.5 : 1}
          />
        </mesh>
        
        {/* Cyber Wireframe Envelope */}
        <mesh ref={wireRef} geometry={wireGeom}>
          <meshBasicMaterial 
            map={flowTex}
            wireframe 
            transparent 
            opacity={isLight ? 0.1 : 0.4} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>
    </group>
  );
}

// --- PROJECT CARD COMPONENT ---
function ProjectCard({ app, index, onClick, isLight }: { app: any, index: number, onClick: () => void, isLight: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      layoutId={`project-container-${app.name}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="hw-accel cursor-pointer group relative pointer-events-auto transform-gpu will-change-transform will-change-opacity"
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      <div className={`${isLight ? 'bg-white/80 border-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:bg-white hover:border-black/20 hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)]' : 'bg-[#030303]/80 border-white/5 shadow-2xl hover:bg-[#0a0a0a]/90 hover:border-white/20'} backdrop-blur-2xl rounded-2xl flex flex-col justify-between p-6 h-full border relative overflow-hidden transition-all duration-300`}>
          <motion.div
            className="pointer-events-none absolute -inset-px transition duration-500 opacity-0 group-hover:opacity-100 z-0"
            style={{
              background: useMotionTemplate`
                radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${app.spotlight}, transparent 80%)
              `,
            }}
          />

          <motion.div layoutId={`project-header-${app.name}`} className="flex justify-between items-center w-full relative z-10 mb-6">
             <span className={`text-[10px] font-display font-black ${app.hoverColor} transition-colors duration-500 tracking-widest ${isLight ? 'text-zinc-400' : 'text-zinc-600'}`}>{app.number}</span>
             <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 overflow-hidden ${isLight ? 'bg-black/5 border-black/10 group-hover:border-black/20' : 'bg-black/60 border-white/10 group-hover:border-white/30 backdrop-blur-md'}`}>
                <MoveUpRight className={`w-3.5 h-3.5 ${isLight ? 'text-black/40' : 'text-white/50'} ${app.hoverColor} group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-300`} />
             </div>
          </motion.div>

          <motion.div layoutId={`project-image-${app.name}`} className={`w-full aspect-[4/5] md:aspect-[3/4] object-cover mb-8 rounded-2xl border relative overflow-hidden flex items-center justify-center z-10 group-hover:-translate-y-2 transition-transform duration-500 shadow-xl p-4 md:p-6 lg:p-8 ${isLight ? 'bg-[#f0f0f0] border-black/5' : 'bg-[#111] border-white/5'}`}>
             <div className={`absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-700 bg-gradient-to-tr ${app.gradient} ${isLight ? 'mix-blend-multiply' : 'mix-blend-screen'} scale-150 rotate-12 blur-2xl radial-gradient z-0`} />
             
             {app.image ? (
                <div className={`h-full aspect-[9/20] rounded-[1.2rem] border relative z-10 flex flex-col overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02] ${isLight ? 'border-black/10 bg-white' : 'border-white/10 bg-black'}`}>
                   <div className="flex-1 w-full relative overflow-hidden bg-black rounded-[1rem]">
                     <img src={app.image} alt={app.name} className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity duration-700" />
                     <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${isLight ? 'shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]' : 'shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]'}`} />
                   </div>
                </div>
             ) : (
                <div className={`h-full aspect-[9/20] rounded-[1.2rem] border relative z-10 flex flex-col overflow-hidden shadow-2xl ${isLight ? 'border-black/10 bg-white/50 backdrop-blur-md' : 'border-white/10 bg-black/50 backdrop-blur-md'}`}>
                   <div className="w-full h-full p-4 flex flex-col gap-3 relative z-10 pt-6">
                     <div className={`w-3/4 h-2 rounded-full ${isLight ? 'bg-black/10' : 'bg-white/20'}`} />
                     <div className={`w-1/2 h-2 rounded-full ${isLight ? 'bg-black/5' : 'bg-white/10'}`} />
                     <div className={`flex-1 w-full rounded-lg mt-2 border ${isLight ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'}`} />
                   </div>
                </div>
             )}
          </motion.div>

          <div className="relative z-10 mt-auto">
              <motion.h3 layoutId={`project-title-${app.name}`} className={`text-lg md:text-xl font-display font-bold mb-2 tracking-tight uppercase leading-none transition-colors duration-500 ${isLight ? 'text-zinc-900' : 'text-white'}`}>{app.name}</motion.h3>
              <p className={`text-[11px] leading-relaxed font-light line-clamp-2 transition-colors duration-500 ${isLight ? 'text-zinc-600 group-hover:text-zinc-800' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{app.desc}</p>
          </div>
      </div>
    </motion.div>
  );
}

// --- MAIN APP ---
export default function App() {
  const [activeApp, setActiveApp] = useState<any>(null);
  const [isLight, setIsLight] = useState<boolean>(false);
  const { scrollYProgress } = useScroll();
  
  // Parallax the WebGL canvas
  const canvasY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  useEffect(() => {
    if (activeApp) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [activeApp]);
  
  useEffect(() => {
    document.body.style.backgroundColor = isLight ? '#f4f4f5' : '#000';
    document.body.style.color = isLight ? '#09090b' : '#fff';
    document.body.style.transition = 'background-color 0.7s ease, color 0.7s ease';
  }, [isLight]);

  return (
    <div className={`min-h-screen font-sans selection:bg-[#00d5ff]/30 relative overflow-hidden transition-colors duration-700 ${isLight ? 'bg-[#f4f4f5] selection:text-zinc-900' : 'bg-[#000] selection:text-white'}`}>
      
      {/* --- NOISE TEXTURE LAYER --- */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      
      {/* --- 3D WEBGL LAYER (Bottom) --- */}
      <motion.div style={{ y: canvasY, opacity: canvasOpacity }} className="fixed inset-0 z-0 pointer-events-none transform-gpu will-change-transform will-change-opacity">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
           <CyberCore isLight={isLight} />
        </Canvas>
      </motion.div>

      {/* --- UI LAYER (Top) --- */}
      <div className="relative z-10 w-full flex flex-col items-center pointer-events-none">
        
        {/* NAV */}
        <nav className={`fixed top-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex justify-between items-center transition-colors duration-700 pointer-events-none hw-accel transform-gpu ${isLight ? 'bg-gradient-to-b from-[#f4f4f5] via-[#f4f4f5]/90 to-transparent' : 'bg-gradient-to-b from-[#000] via-[#000]/80 to-transparent'}`}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="pointer-events-auto transform-gpu will-change-transform will-change-opacity">
            <span className={`font-display font-black text-[9px] md:text-xs uppercase flex items-center gap-3 px-5 py-2.5 md:py-3 relative z-10 w-full h-full tracking-[0.2em] rounded-full backdrop-blur-xl border transition-colors duration-700 ${isLight ? 'bg-white/80 border-black/5 text-zinc-900 shadow-[0_4px_20px_rgba(0,0,0,0.05)]' : 'bg-[#020202]/90 border-white/5 text-white god-border my-shadow shadow-[0_0_25px_rgba(0,213,255,0.2)]'}`}>
               <Diamond className="w-3 h-3 fill-[#00ffd5] animate-[pulse_2s_ease-in-out_infinite] drop-shadow-[0_0_8px_#00ffd5]" />
               <span className="drop-shadow-sm">OWNER_OFFICIAL</span>
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="pointer-events-auto flex items-center gap-6 md:gap-10 font-sans text-[10px] uppercase tracking-[0.3em] font-semibold">
            <div className={`hidden md:flex items-center gap-3 rounded-full px-4 py-2 backdrop-blur-xl border transition-colors duration-700 ${isLight ? 'bg-white/80 border-black/5' : 'bg-[#020202]/90 border-white/5 god-border'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffd5] animate-[pulse_1.5s_infinite] shadow-[0_0_8px_#00ffd5]" />
              <span className={`tracking-[0.4em] text-[9px] ${isLight ? 'text-zinc-600' : 'text-zinc-200'}`}>System Online</span>
            </div>
            <a href="#work" className={`hidden md:block hover:text-[#00d5ff] transition-colors py-2 relative group ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
               Assets
               <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#00ffd5] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 shadow-[0_0_8px_#00ffd5]" />
            </a>
            <button
               onClick={() => setIsLight(!isLight)}
               className={`p-3 md:p-2.5 rounded-full border backdrop-blur-xl transition-all duration-500 hover:scale-105 active:scale-95 ${isLight ? 'bg-zinc-100 border-black/10 text-zinc-900 shadow-[0_4px_15px_rgba(0,0,0,0.05)]' : 'bg-[#020202]/90 border-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]'}`}
            >
               <AnimatePresence mode="wait">
                  {isLight ? (
                     <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <Moon className="w-4 h-4 md:w-3.5 md:h-3.5" />
                     </motion.div>
                  ) : (
                     <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <Sun className="w-4 h-4 md:w-3.5 md:h-3.5" />
                     </motion.div>
                  )}
               </AnimatePresence>
            </button>
          </motion.div>
        </nav>

        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center w-full px-4 pt-32 overflow-hidden relative pointer-events-none">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: [0.16,1,0.3,1] }} className="z-10 flex flex-col items-center transform-gpu will-change-transform will-change-opacity">
            
            <div className="relative pointer-events-auto cursor-default group flex flex-col items-center">
               <div className={`absolute -inset-10 blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-1000 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] -z-10`} />
               <h1 className={`relative text-[18vw] sm:text-[15vw] md:text-[13vw] font-display font-black leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all duration-700 ${isLight ? 'from-zinc-900 via-zinc-600 to-zinc-400 drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] group-hover:from-black group-hover:to-zinc-600' : 'from-white via-zinc-300 to-zinc-800 group-hover:from-white group-hover:to-zinc-400'}`}>
                 SOMAY<span className={`${isLight ? 'text-black' : 'text-white'}`}>.</span>
               </h1>
               <p className={`mt-6 text-sm md:text-base tracking-[0.3em] font-medium uppercase transition-colors duration-500 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                 Design ✦ Develop ✦ Elevate
               </p>
            </div>

            <motion.div className="mt-12 z-10 relative group cursor-default pointer-events-auto">
                <div className={`absolute -inset-1.5 bg-gradient-to-r from-[#00d5ff] via-[#ff007b] to-[#00d5ff] rounded-full blur-[16px] transition duration-1000 -z-10 bg-[length:200%_auto] animate-[rgb-sweep_4s_linear_infinite] ${isLight ? 'opacity-20 group-hover:opacity-40' : 'opacity-40 group-hover:opacity-80'}`} />
                <div className={`px-12 py-3.5 flex items-center justify-center z-10 border rounded-full backdrop-blur-3xl transition-colors duration-500 ${isLight ? 'bg-white/80 border-black/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]' : 'bg-[#000]/80 border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]'}`}>
                    <h2 className={`text-[11px] md:text-xs font-sans font-bold tracking-[0.8em] uppercase whitespace-nowrap transition-colors duration-500 ${isLight ? 'text-zinc-900 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]' : 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]'}`}>
                       A.K.A OWNER
                    </h2>
                </div>
            </motion.div>

            <div className={`w-[1px] h-24 md:h-32 bg-gradient-to-b from-[#00d5ff] to-transparent mt-16 opacity-60 transition-colors duration-700 ${isLight ? 'shadow-none' : 'shadow-[0_0_15px_#00d5ff]'}`} />
          </motion.div>
          
          {/* Scroll instruction text */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-auto transform-gpu will-change-transform will-change-opacity ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}
          >
            <span className="text-[9px] uppercase tracking-[0.4em] font-semibold">Scroll to explore</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-current to-transparent animate-pulse" />
          </motion.div>
        </section>

        {/* WORK / PROJECTS SECTION */}
        <section id="work" className="w-full max-w-[1400px] mx-auto py-32 px-6 md:px-16 lg:px-20 relative z-10 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-16 pointer-events-auto transform-gpu will-change-transform will-change-opacity"
          >
             <div className="w-12 h-1 bg-gradient-to-r from-[#ff007b] to-transparent shadow-[0_0_20px_#ff007b]" />
             <h2 className={`text-3xl md:text-5xl font-display font-black uppercase tracking-tighter transition-colors duration-500 ${isLight ? 'text-zinc-900 drop-shadow-sm' : 'text-white drop-shadow-xl'}`}>Live Assets</h2>
             <div className={`flex-1 h-[1px] bg-gradient-to-r to-transparent ml-4 md:ml-8 transition-colors duration-500 ${isLight ? 'from-black/10' : 'from-white/20'}`} />
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myApps.map((app, index) => (
                 <ProjectCard key={index} app={app} index={index} onClick={() => setActiveApp(app)} isLight={isLight} />
              ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className={`w-full relative z-20 pointer-events-auto transition-colors duration-700 ${isLight ? 'bg-zinc-100' : 'bg-gradient-to-b from-transparent to-[#050505]'}`}>
          <div className={`max-w-[1400px] mx-auto px-6 py-32 md:py-48 flex flex-col items-center border-b relative overflow-hidden backdrop-blur-md rounded-t-[3rem] border-t transition-colors duration-700 ${isLight ? 'border-black/5 bg-white/50' : 'border-white/5 bg-[#000]/50 border-white/10'}`}>
              
              <a href="mailto:officialsomay222@gmail.com" className="group flex flex-col items-center justify-center outline-none hw-accel relative z-10">
                  <span className={`text-[10px] font-semibold tracking-[0.5em] uppercase mb-8 px-10 py-4 rounded-full border backdrop-blur-xl transition-all duration-500 ${isLight ? 'text-zinc-600 bg-white border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] group-hover:text-zinc-900 group-hover:border-[#00d5ff]/50' : 'text-zinc-300 bg-[#050505] border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:text-white group-hover:border-[#00d5ff]/50 group-hover:shadow-[0_0_40px_rgba(0,213,255,0.4)]'}`}>
                    Establish Connection
                  </span>
                  
                  <div className="flex flex-col items-center text-center mt-2 w-full max-w-[95vw] md:max-w-[65vw] relative z-10 transform-gpu will-change-transform">
                    <svg viewBox="0 0 1200 450" className="w-full h-auto overflow-visible select-none pointer-events-none group-hover:scale-[1.02] transition-transform duration-1000 cubic-bezier(0.16,1,0.3,1) transform-gpu will-change-transform">
                      <defs>
                        <linearGradient id="fluid-glow" x1="0%" y1="0%" x2="200%" y2="0%">
                          <stop offset="0%" stopColor="#00d5ff" />
                          <stop offset="25%" stopColor="#ff007b" />
                          <stop offset="50%" stopColor="#ccff00" />
                          <stop offset="75%" stopColor="#00d5ff" />
                          <stop offset="100%" stopColor="#ff007b" />
                          <animate attributeName="x1" values="0%;-100%" dur="6s" repeatCount="indefinite" />
                          <animate attributeName="x2" values="200%;100%" dur="6s" repeatCount="indefinite" />
                        </linearGradient>
                        <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation={isLight ? "3" : "6"} result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <text x="50%" y="30%" textAnchor="middle" dominantBaseline="middle" className="font-display font-black text-[150px] uppercase tracking-[0.08em]" fill="transparent" stroke={isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"} strokeWidth="2" style={{ transition: 'stroke 0.7s ease' }}>
                        OWNER
                      </text>
                      <text x="50%" y="85%" textAnchor="middle" dominantBaseline="middle" className="font-display font-black text-[150px] uppercase tracking-[0.08em]" fill="transparent" stroke={isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"} strokeWidth="2" style={{ transition: 'stroke 0.7s ease' }}>
                        OFFICIAL
                      </text>
                      <text x="50%" y="30%" textAnchor="middle" dominantBaseline="middle" className="font-display font-black text-[150px] uppercase tracking-[0.08em] fluid-stroke-text" fill="transparent" stroke="url(#fluid-glow)" strokeWidth="4" strokeLinecap="round" filter="url(#glow-blur)">
                        OWNER
                      </text>
                      <text x="50%" y="85%" textAnchor="middle" dominantBaseline="middle" className="font-display font-black text-[150px] uppercase tracking-[0.08em] fluid-stroke-text" fill="transparent" stroke="url(#fluid-glow)" strokeWidth="4" strokeLinecap="round" filter="url(#glow-blur)">
                        OFFICIAL
                      </text>
                    </svg>
                  </div>
              </a>
          </div>

          <div className={`w-full relative z-10 transition-colors duration-700 ${isLight ? 'bg-zinc-100' : 'bg-[#050505]'}`}>
              <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center gap-4 mb-10 md:mb-0">
                    <Diamond className="w-5 h-5 fill-[#00d5ff]" />
                    <p className={`text-[10px] font-semibold tracking-[0.4em] uppercase transition-colors duration-700 ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
                        © {new Date().getFullYear()} <span className={`drop-shadow-sm transition-colors duration-700 ${isLight ? 'text-zinc-900' : 'text-white'}`}>OWNER_OFFICIAL</span>
                    </p>
                  </div>
                  <div className="flex gap-6 md:gap-8">
                      {getSocialLinks(isLight).map((link, idx) => (
                          <motion.a 
                              key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                              whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}
                              className={`transition-all duration-300 group relative border rounded-full p-4 md:p-5 ${isLight ? 'text-zinc-500 bg-white border-black/5 shadow-[0_4px_15px_rgba(0,0,0,0.05)]' : 'text-zinc-400 bg-black border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'} ${link.hoverProps.className}`}
                          >
                              <motion.div className="group-hover:rotate-12 transition-transform duration-300">{link.icon}</motion.div>
                              <span className={`absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${link.dotClass}`} />
                          </motion.a>
                      ))}
                  </div>
              </div>
          </div>
        </footer>

      </div>

      {/* --- FULL-SCREEN MODAL --- */}
      <AnimatePresence>
        {activeApp && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12 pointer-events-auto transform-gpu will-change-opacity"
          >
            <div className={`absolute inset-0 backdrop-blur-3xl transition-colors duration-500 transform-gpu ${isLight ? 'bg-zinc-100/80' : 'bg-[#000]/90'}`} onClick={() => setActiveApp(null)} />
            
            <motion.div 
              layoutId={`project-container-${activeApp.name}`}
              className={`w-full h-full md:h-[90vh] md:max-h-[900px] md:max-w-6xl md:border overflow-hidden relative z-10 flex flex-col md:flex-row md:rounded-3xl shadow-none transition-colors duration-500 transform-gpu will-change-transform ${isLight ? 'bg-white border-black/10 md:shadow-[0_20px_60px_rgba(0,0,0,0.1)]' : 'bg-[#030303] border-white/10 md:shadow-[0_0_50px_rgba(0,213,255,0.15)]'}`}
            >
              <div className={`absolute top-0 left-0 w-full md:w-1/2 h-64 md:h-full bg-gradient-to-br ${activeApp.gradient} opacity-10 mix-blend-screen pointer-events-none`} />

              <button 
                onClick={() => setActiveApp(null)}
                className={`absolute top-4 right-4 md:top-6 md:right-6 z-50 w-12 h-12 md:w-10 md:h-10 border rounded-full flex items-center justify-center transition-colors group backdrop-blur-md ${isLight ? 'bg-white/80 hover:bg-zinc-100 border-black/10 text-zinc-900 shadow-[0_4px_15px_rgba(0,0,0,0.05)]' : 'bg-black/50 hover:bg-white/10 border-white/10 text-white'}`}
              >
                <X className="w-5 h-5 md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
              </button>

              {/* Modal Left Column */}
              <div className={`w-full h-[50vh] md:h-full md:w-[45%] p-6 sm:p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r relative overflow-hidden shrink-0 transition-colors duration-500 ${isLight ? 'bg-zinc-50 border-black/5' : 'bg-[#000] border-white/5'}`}>
                 <motion.div layoutId={`project-header-${activeApp.name}`} className="w-full flex justify-between absolute top-6 md:top-8 px-6 md:px-8 left-0 z-20">
                    <span className={`text-3xl md:text-5xl font-display font-black opacity-10 tracking-widest ${isLight ? 'text-black' : 'text-white'}`}>{activeApp.number}</span>
                 </motion.div>
                 <motion.div layoutId={`project-image-${activeApp.name}`} className={`w-full max-w-[300px] md:max-w-none aspect-[4/5] md:h-[80%] mt-8 mx-auto rounded-[2.5rem] border relative overflow-hidden flex items-center justify-center shadow-2xl transition-colors duration-500 ${isLight ? 'bg-zinc-100 border-black/5' : 'bg-[#111] border-white/10'}`}>
                    <div className={`absolute inset-0 opacity-40 bg-gradient-to-br ${activeApp.gradient} scale-[2] rotate-[25deg] blur-3xl animate-[spin_10s_linear_infinite] ${isLight ? 'mix-blend-multiply' : 'mix-blend-screen'} z-0`} />
                    
                    {activeApp.image ? (
                        <div className={`h-[90%] aspect-[9/20] rounded-[1.2rem] border relative z-10 transition-colors duration-500 flex flex-col ${isLight ? 'bg-white border-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.1)]' : 'bg-black border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]'}`}>
                             <div className="flex-1 w-full relative overflow-hidden bg-[#050505] rounded-[1rem]">
                               <img src={activeApp.image} alt={activeApp.name} className={`w-full h-full object-cover object-top filter contrast-[1.05] ${isLight ? '' : 'brightness-[0.85]'}`} />
                               <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] ${isLight ? 'opacity-0' : 'opacity-100'}`} />
                             </div>
                        </div>
                    ) : (
                      <div className={`h-[90%] aspect-[9/20] rounded-[1.2rem] border backdrop-blur-xl p-6 flex flex-col gap-6 relative z-10 transition-colors duration-500 pt-8 ${isLight ? 'bg-white/60 border-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.05)]' : 'bg-black/60 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]'}`}>
                        <div className={`w-3/4 h-2 rounded-full ${isLight ? 'bg-black/10' : 'bg-white/20'}`} />
                        <div className={`flex-1 rounded-xl border ${isLight ? 'border-black/5 bg-black/[0.02]' : 'border-white/5 bg-white/[0.03]'}`} />
                        <div className={`h-1/3 rounded-xl border ${isLight ? 'border-black/5 bg-black/[0.02]' : 'border-white/5 bg-white/[0.03]'}`} />
                      </div>
                    )}
                 </motion.div>
              </div>

              {/* Modal Right Column */}
              <div className={`w-full h-[60vh] md:h-full md:w-[55%] p-6 sm:p-12 flex flex-col overflow-y-auto custom-scrollbar pb-24 md:pb-12 transition-colors duration-500 ${isLight ? 'bg-white' : 'bg-[#050505]'}`}>
                 <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg border shadow-[0_0_20px_${activeApp.spotlight}] ${activeApp.iconColor} ${isLight ? 'bg-zinc-50 border-black/5' : 'bg-black border-white/10'}`}>
                    {activeApp.icon}
                  </div>
                  <span className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 border rounded-full ${activeApp.iconColor} ${isLight ? 'bg-black/5 border-black/5' : 'bg-white/5 border-white/10'}`}>
                      {activeApp.tag}
                  </span>
                 </div>
                 <motion.h3 layoutId={`project-title-${activeApp.name}`} className={`text-3xl md:text-5xl lg:text-6xl font-display font-black mb-6 uppercase tracking-tight leading-none transition-colors duration-500 ${isLight ? 'text-zinc-900' : 'text-white'}`}>{activeApp.name}</motion.h3>
                 <p className={`text-sm md:text-base font-light leading-relaxed mb-10 transition-colors duration-500 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{activeApp.fullDesc}</p>

                 <div className="mb-10">
                   <h4 className={`text-[10px] md:text-xs uppercase font-bold tracking-[0.3em] mb-6 border-b pb-3 transition-colors duration-500 ${isLight ? 'text-zinc-400 border-black/10' : 'text-zinc-500 border-white/10'}`}>Technical Capabilities</h4>
                   <ul className="space-y-4">
                     {activeApp.features.map((feature: string, i: number) => (
                       <motion.li initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + (i * 0.1) }} key={i} className={`flex items-center gap-4 text-sm md:text-base font-light transition-colors duration-500 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                         <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: activeApp.baseColor, boxShadow: `0 0 12px ${activeApp.baseColor}` }} />
                         {feature}
                       </motion.li>
                     ))}
                   </ul>
                 </div>

                 <div className="mb-12">
                    <h4 className={`text-[10px] md:text-xs uppercase font-bold tracking-[0.3em] mb-6 transition-colors duration-500 ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>Architecture Base</h4>
                    <div className="flex gap-3 flex-wrap">
                      {activeApp.tech.map((t: string, i: number) => (
                         <div key={i} className={`text-xs border rounded-lg px-4 py-2.5 flex items-center gap-2 transition-colors duration-500 ${isLight ? 'text-zinc-700 bg-zinc-50 border-black/10' : 'text-zinc-300 bg-white/5 border-white/10'}`}>
                            <Code2 className="w-3.5 h-3.5 text-zinc-500" />
                            {t}
                         </div>
                      ))}
                    </div>
                 </div>

                 <div className="mt-auto pt-8">
                    <a href={activeApp.url} target={activeApp.url !== '#' ? "_blank" : undefined} rel="noopener noreferrer" className={`block w-full rounded-xl p-[1px] relative group overflow-hidden transition-shadow duration-500 ${isLight ? 'god-border shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(0,213,255,0.2)]' : 'god-border shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,213,255,0.2)]'}`}>
                      <div className={`w-full transition-colors py-6 rounded-xl flex items-center justify-center gap-4 relative z-10 ${isLight ? 'bg-zinc-50 hover:bg-white' : 'bg-[#030303] hover:bg-black'}`}>
                         <div className={`absolute inset-0 bg-gradient-to-r ${activeApp.gradient} opacity-0 transition-opacity duration-500 ${isLight ? 'group-hover:opacity-5' : 'group-hover:opacity-15'}`} />
                         <span className={`text-xs md:text-sm uppercase tracking-[0.4em] font-bold z-10 group-hover:scale-105 transition-all duration-300 ${isLight ? 'text-zinc-900 group-hover:text-black' : 'text-white'}`}>
                           Initialize Access //
                         </span>
                         <MoveUpRight className={`w-5 h-5 z-10 ${isLight ? 'text-zinc-900' : 'text-white'}`} />
                      </div>
                    </a>
                 </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
