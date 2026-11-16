/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  animate,
  type MotionValue,
} from 'motion/react';
import {
  Github,
  Instagram,
  MoveUpRight,
  Globe,
  Calculator,
  Lock,
  Diamond,
  X,
  Code2,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Download,
  Smartphone,
} from 'lucide-react';
import AdminPanel from './AdminPanel';
import {
  type StoredApkApp,
  loadCachedApkApps,
  subscribePublishedApkApps,
  triggerApkDownload,
} from './apkStore';

// --- DATA ---
export interface AppProject {
  id?: string;
  name: string;
  desc: string;
  fullDesc: string;
  tag: string;
  icon: React.ReactNode;
  image?: string;
  url: string;
  number: string;
  iconColor: string;
  baseColor: string;
  gradient: string;
  glowColor: string;
  features: string[];
  tech: string[];
  apkData?: StoredApkApp;
}

const defaultApps: AppProject[] = [
  {
    id: 'loki_x_prime_apk',
    name: 'Loki X Prime',
    desc: 'Next-gen web interface engineered for zero-latency engagement.',
    fullDesc:
      'Loki X Prime operates at the absolute edge of modern web rendering. Engineered deeply with physics-based motion and hardware-accelerated gradients, this platform delivers an ultra-responsive experience across every screen.',
    tag: 'Web Platform',
    icon: <Globe className="w-4 h-4" />,
    image: 'https://i.ibb.co/27vjwr6f/Screenshot-20260617-125714-Loki-Prime-X.jpg',
    url: 'https://loki-x-prime.vercel.app/',
    number: '01',
    iconColor: 'text-[#ff00c8]',
    baseColor: '#ff00c8',
    gradient: 'from-[#ff00c8] to-[#ffea00]',
    glowColor: 'rgba(255, 0, 200, 0.45)',
    features: ['Hardware Accelerated UI', 'Intelligent State Routing', 'Physics-Based Layouts'],
    tech: ['React 18', 'Motion Physics', 'GPU Compositor'],
  },
  {
    id: 'commerce_prime_apk',
    name: 'Commerce Prime',
    desc: 'High-speed algorithmic utility built for modern commerce.',
    fullDesc:
      'A high-throughput algorithmic dashboard designed exclusively for commerce. Commerce Prime strips away bloated interfaces, offering pure speed and sub-millisecond visual feedback.',
    tag: 'Web Utility',
    icon: <Calculator className="w-4 h-4" />,
    image: 'https://i.ibb.co/LdwsZdj2/Screenshot-20260617-125701-Chrome.jpg',
    url: 'https://commerce-prime.vercel.app/',
    number: '02',
    iconColor: 'text-[#00ffd5]',
    baseColor: '#00ffd5',
    gradient: 'from-[#00ffd5] to-[#8800ff]',
    glowColor: 'rgba(0, 255, 213, 0.45)',
    features: ['Real-time Algorithmic Engine', 'Dynamic Metric Dashboards', 'Sub-millisecond Feedback'],
    tech: ['Next.js Framework', 'Tailwind Engine', 'Secure Logic'],
  },
  {
    id: 'classified_build',
    name: 'Classified Build',
    desc: 'Stealth digital infrastructure currently in restricted development.',
    fullDesc:
      'Highly redacted stealth protocol. Details of this architecture are restricted. Features adaptive encryption layouts and shifting DOM elements for next-generation security.',
    tag: 'Stealth Sys',
    icon: <Lock className="w-4 h-4" />,
    url: '#',
    number: '03',
    iconColor: 'text-[#fffb00]',
    baseColor: '#fffb00',
    gradient: 'from-[#ffea00] to-[#ff007b]',
    glowColor: 'rgba(255, 251, 0, 0.4)',
    features: ['Redacted Interface Layers', 'Quantum Routing Protocols', 'Adaptive Camouflage Mode'],
    tech: ['Stealth Core', 'Cybernetic State', 'Encrypted Node'],
  },
];

const HERO_LETTERS = ['S', 'O', 'M', 'A', 'Y', '.'];

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.5H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.11 19.75 7.84 19L7.54 18.82L4.42 19.64L5.25 16.6L5.05 16.29C4.23 14.98 3.79 13.46 3.79 11.91C3.79 7.37 7.49 3.67 12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.64 20.28 9.71 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.57 13.99C16.32 13.87 15.11 13.27 14.88 13.19C14.65 13.11 14.49 13.07 14.32 13.32C14.15 13.57 13.68 14.13 13.54 14.29C13.39 14.46 13.25 14.48 13 14.35C12.75 14.23 11.96 13.97 11.01 13.12C10.28 12.47 9.78 11.66 9.64 11.41C9.49 11.17 9.62 11.03 9.75 10.91C9.86 10.8 10 10.62 10.12 10.48C10.24 10.33 10.29 10.23 10.37 10.06C10.45 9.9 10.41 9.75 10.35 9.63C10.29 9.5 9.79 8.29 9.59 7.8C9.39 7.32 9.19 7.39 9.04 7.38C8.9 7.37 8.73 7.37 8.56 7.37C8.4 7.37 8.13 7.43 7.91 7.68C7.68 7.93 7.04 8.53 7.04 9.75C7.04 10.97 7.93 12.14 8.05 12.31C8.18 12.47 9.8 14.98 12.28 16.05C12.87 16.31 13.33 16.46 13.69 16.57C14.28 16.76 14.82 16.73 15.25 16.67C15.72 16.6 16.71 16.07 16.91 15.5C17.12 14.92 17.12 14.43 17.06 14.32C17 14.22 16.82 14.12 16.57 13.99Z" />
  </svg>
);

const getSocialLinks = (isLight: boolean) => [
  {
    name: 'Instagram',
    icon: <Instagram className="w-5 h-5 md:w-6 md:h-6" />,
    url: 'https://www.instagram.com/its_owner_official/?utm_source=ig_web_button_share_sheet',
    hoverProps: {
      className:
        'hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:shadow-[0_0_25px_rgba(225,48,108,0.4)] active:border-[#E1306C]/60',
    },
    dotClass: 'bg-[#E1306C] shadow-[0_0_15px_#E1306C]',
  },
  {
    name: 'X / Twitter',
    icon: <XIcon className="w-5 h-5 md:w-6 md:h-6" />,
    url: '#twitter',
    hoverProps: {
      className: isLight
        ? 'hover:text-black hover:border-black/40 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]'
        : 'hover:text-white hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]',
    },
    dotClass: isLight ? 'bg-black shadow-[0_0_15px_#000]' : 'bg-white shadow-[0_0_15px_#fff]',
  },
  {
    name: 'WhatsApp',
    icon: <WhatsAppIcon className="w-5 h-5 md:w-6 md:h-6" />,
    url: 'https://wa.me/919034184333',
    hoverProps: {
      className:
        'hover:text-[#25D366] hover:border-[#25D366]/40 hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] active:border-[#25D366]/60',
    },
    dotClass: 'bg-[#25D366] shadow-[0_0_15px_#25D366]',
  },
  {
    name: 'GitHub',
    icon: <Github className="w-5 h-5 md:w-6 md:h-6" />,
    url: '#github',
    hoverProps: {
      className: isLight
        ? 'hover:text-black hover:border-black/40 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]'
        : 'hover:text-white hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]',
    },
    dotClass: isLight ? 'bg-black shadow-[0_0_15px_#000]' : 'bg-white shadow-[0_0_15px_#fff]',
  },
];

// Silent automatic hardware optimization for low-budget & mid-range phones
function detectSilentLowSpec(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return true;
    const nav = navigator as any;
    const cores = nav.hardwareConcurrency || 8;
    const memory = nav.deviceMemory || 8;
    const isMobile =
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return isMobile || cores <= 6 || memory <= 4;
  } catch {
    return false;
  }
}

// --- 3D DEEP SPACE WARP CANVAS (Pauses during active touch drag on budget phones for 100% slider FPS) ---
function SpaceWarpCanvas({
  isLight,
  lowSpec,
  spaceIntensityRef,
  activeColorRef,
  isDraggingRef,
}: {
  isLight: boolean;
  lowSpec: boolean;
  spaceIntensityRef: React.MutableRefObject<number>;
  activeColorRef: React.MutableRefObject<string>;
  isDraggingRef: React.MutableRefObject<boolean>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isPaused = false;

    // Cap DPR on mobile / budget devices to prevent GPU fill-rate bottleneck
    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, lowSpec ? 1.0 : 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();

    const handleResize = () => {
      updateSize();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? (lowSpec ? 24 : 36) : lowSpec ? 48 : 100;
    const stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 1000 + 1,
      size: Math.random() * 1.5 + 0.6,
    }));

    const render = () => {
      if (isPaused) return;

      // On budget/mobile devices, skip canvas repaint while user is actively dragging the 3D slider
      // so 100% of CPU/GPU frame budget is dedicated to butter-smooth 3D phone motion
      if ((lowSpec || isMobile) && isDraggingRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const intensity = spaceIntensityRef.current;
      const speed = 1.0 + intensity * (lowSpec ? 4.5 : 11);
      const cx = w / 2;
      const cy = h / 2;

      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        star.z -= speed;
        if (star.z <= 1) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
        }

        const k = 420 / star.z;
        const px = cx + star.x * k;
        const py = cy + star.y * k;

        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          const depthAlpha = (1 - star.z / 1000) * (0.28 + intensity * 0.72);
          const radius = star.size * (1 + (1 - star.z / 1000) * 1.3);

          if (intensity > 0.15 && !lowSpec && !isMobile) {
            const prevK = 420 / (star.z + speed * 1.6);
            const prevPx = cx + star.x * prevK;
            const prevPy = cy + star.y * prevK;

            ctx.beginPath();
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.strokeStyle = isLight
              ? `rgba(24, 24, 27, ${depthAlpha * 0.5})`
              : i % 4 === 0
              ? activeColorRef.current
              : `rgba(255, 255, 255, ${depthAlpha * 0.8})`;
            ctx.lineWidth = Math.max(0.6, radius * 0.6);
            ctx.stroke();
          }

          if (lowSpec || isMobile) {
            ctx.fillStyle = isLight
              ? `rgba(24, 24, 27, ${depthAlpha * 0.65})`
              : `rgba(255, 255, 255, ${depthAlpha})`;
            const sz = Math.max(1, radius * 1.2);
            ctx.fillRect(px - sz / 2, py - sz / 2, sz, sz);
          } else {
            ctx.beginPath();
            ctx.arc(px, py, Math.max(0.6, radius * 0.6), 0, Math.PI * 2);
            ctx.fillStyle = isLight
              ? `rgba(24, 24, 27, ${depthAlpha * 0.65})`
              : `rgba(255, 255, 255, ${depthAlpha})`;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isLight, lowSpec, spaceIntensityRef, activeColorRef, isDraggingRef]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none hw-accel"
    />
  );
}

// --- REALISTIC PHONE HARDWARE CHASSIS BUTTONS ---
function PhoneHardwareButtons() {
  return (
    <>
      {/* Left Edge: Action / Mute Slider */}
      <div className="absolute -left-[3px] sm:-left-[3.5px] top-18 w-[3px] sm:w-[3.5px] h-3.5 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-600 rounded-l-[1.5px] pointer-events-none" />
      {/* Left Edge: Volume Up Button */}
      <div className="absolute -left-[3px] sm:-left-[3.5px] top-26 w-[3px] sm:w-[3.5px] h-10 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-600 rounded-l-[1.5px] pointer-events-none" />
      {/* Left Edge: Volume Down Button */}
      <div className="absolute -left-[3px] sm:-left-[3.5px] top-40 w-[3px] sm:w-[3.5px] h-10 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-600 rounded-l-[1.5px] pointer-events-none" />

      {/* Right Edge: Elongated Power / Lock Button */}
      <div className="absolute -right-[3px] sm:-right-[3.5px] top-30 w-[3px] sm:w-[3.5px] h-14 bg-gradient-to-l from-zinc-300 via-zinc-400 to-zinc-600 rounded-r-[1.5px] pointer-events-none" />

      {/* Antenna Break Lines on Titanium Band */}
      <div className="absolute -left-[1px] top-11 w-[2px] h-[1.5px] bg-zinc-600/60 pointer-events-none" />
      <div className="absolute -right-[1px] top-11 w-[2px] h-[1.5px] bg-zinc-600/60 pointer-events-none" />
      <div className="absolute -left-[1px] bottom-14 w-[2px] h-[1.5px] bg-zinc-600/60 pointer-events-none" />
      <div className="absolute -right-[1px] bottom-14 w-[2px] h-[1.5px] bg-zinc-600/60 pointer-events-none" />

      {/* Ultra-Slim Micro Acoustic Earpiece Slit */}
      <div className="absolute top-[1px] left-1/2 -translate-x-1/2 w-12 sm:w-14 h-[1.5px] bg-zinc-800/90 border border-white/10 rounded-full z-20 pointer-events-none" />
    </>
  );
}

// --- REALISTIC NOTCHLESS PHONE STATUS BAR (ZERO GPU BLUR OVERHEAD, DEDICATED HEADER) ---
function PhoneStatusBar({
  app,
  isModal = false,
}: {
  app?: AppProject;
  isModal?: boolean;
}) {
  const dynamicBackdrop = useMemo(() => {
    if (!app) {
      return {
        backgroundColor: '#09090e',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      };
    }
    if (app.name === 'Loki X Prime') {
      return {
        backgroundColor: '#0e0618',
        borderBottom: '1px solid rgba(255, 0, 200, 0.22)',
      };
    }
    if (app.name === 'Commerce Prime') {
      return {
        backgroundColor: '#02131a',
        borderBottom: '1px solid rgba(0, 255, 213, 0.22)',
      };
    }
    return {
      backgroundColor: '#08080c',
      borderBottom: `1px solid ${app.baseColor}33`,
    };
  }, [app]);

  return (
    <div
      style={dynamicBackdrop}
      className={`w-full flex items-center justify-between select-none pointer-events-none ${
        isModal
          ? 'h-[26px] sm:h-[28px] px-3.5 sm:px-4'
          : 'h-[28px] sm:h-[32px] px-4 sm:px-5'
      }`}
    >
      {/* Authentic Phone Time */}
      <span className="font-semibold text-[10.5px] sm:text-[11.5px] tracking-tight text-white font-sans select-none">
        9:41
      </span>

      {/* 100% Notchless Center Area */}
      <div className="flex-1" />

      {/* Top Status Indicators: Cellular, Wi-Fi, Battery */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-white">
        {/* Cellular 4-Bar Signal */}
        <svg className="w-3.5 h-2.5 sm:w-4 sm:h-3" viewBox="0 0 17 12" fill="currentColor">
          <rect x="0.5" y="8" width="2.5" height="4" rx="0.75" />
          <rect x="4.5" y="5.5" width="2.5" height="6.5" rx="0.75" />
          <rect x="8.5" y="3" width="2.5" height="9" rx="0.75" />
          <rect x="12.5" y="0.5" width="2.5" height="11.5" rx="0.75" />
        </svg>

        {/* 5G / Wi-Fi Signal */}
        <svg className="w-3.5 h-3 sm:w-4 sm:h-3.5" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 2.5C10.5 2.5 12.8 3.5 14.5 5.2L16 3.7C13.9 1.5 11.1 0.2 8 0.2C4.9 0.2 2.1 1.5 0 3.7L1.5 5.2C3.2 3.5 5.5 2.5 8 2.5ZM8 6.5C9.4 6.5 10.7 7.1 11.7 8.1L13.2 6.6C11.9 5.3 10 4.5 8 4.5C6 4.5 4.1 5.3 2.8 6.6L4.3 8.1C5.3 7.1 6.6 6.5 8 6.5ZM8 10C8.8 10 9.5 10.7 9.5 11.5C9.5 12.3 8.8 13 8 13C7.2 13 6.5 12.3 6.5 11.5C6.5 10.7 7.2 10 8 10Z" />
        </svg>

        {/* Realistic Battery Pill with 98% Charge */}
        <div className="flex items-center">
          <div className="w-[20px] sm:w-[22px] h-[10px] sm:h-[11px] rounded-[3px] border border-white/90 p-[1px] flex items-center bg-black/40">
            <div className="h-full w-[88%] bg-white rounded-[1.5px]" />
          </div>
          <div className="w-[1.5px] h-[3.5px] bg-white/90 rounded-r-[1px] -ml-[0.5px]" />
        </div>
      </div>
    </div>
  );
}

// --- PURE PHONE SCREEN GLASS TILE (PEAK PERFORMANCE 60/120FPS 3D ENGINE, 100% NOTCHLESS) ---
function SpacePhoneGlassTile({
  app,
  index,
  total,
  isActive,
  onSelect,
  onInspect,
  isLight,
  lowSpec,
  spreadPx,
  didDragRef,
  virtualIndex,
}: {
  app: AppProject;
  index: number;
  total: number;
  isActive: boolean;
  onSelect: () => void;
  onInspect: () => void;
  isLight: boolean;
  lowSpec: boolean;
  spreadPx: number;
  didDragRef: React.MutableRefObject<boolean>;
  virtualIndex: MotionValue<number>;
}) {
  // Continuous circular offset computed directly from the single unified virtualIndex MotionValue
  const currentOffset = useTransform(virtualIndex, (v) => {
    if (total <= 1) return 0;
    const mod = ((v % total) + total) % total;
    let diff = index - mod;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  // Single unified GPU 3D transform string (eliminates multi-property matrix overhead & preserve-3d bottlenecks)
  const unifiedTransform = useTransform(currentOffset, (val) => {
    const abs = Math.abs(val);
    const clampedAbs = Math.min(abs, 1.8);
    const tx = val * spreadPx;
    const ty = clampedAbs * (lowSpec ? 10 : 14);
    const tz = -clampedAbs * (lowSpec ? 95 : 145);
    const rotY = Math.max(-34, Math.min(34, val * (lowSpec ? -20 : -26)));
    const scale = 1 - clampedAbs * 0.14;
    return `perspective(1050px) translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, ${tz.toFixed(1)}px) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
  });

  const liveOpacity = useTransform(currentOffset, (val) => {
    const abs = Math.abs(val);
    if (abs > 1.55) return 0;
    return Math.max(0.42, 1 - Math.min(abs, 1.55) * 0.44);
  });

  // Discrete 3-step zIndex prevents continuous DOM stacking-context churn during drag
  const liveZIndex = useTransform(currentOffset, (val) => {
    const abs = Math.abs(val);
    if (abs < 0.5) return 30;
    if (abs < 1.2) return 20;
    return 10;
  });

  return (
    <motion.div
      style={{
        transform: unifiedTransform,
        opacity: liveOpacity,
        zIndex: liveZIndex,
      }}
      onClick={() => {
        if (didDragRef.current) return;
        if (!isActive) onSelect();
        else onInspect();
      }}
      className="absolute cursor-pointer select-none will-change-transform backface-hidden flex flex-col items-center group"
    >
      <div className="relative flex flex-col items-center">
        {/* Lightweight Soft Aura (Pre-blended radial gradient, zero CSS filter blur) */}
        <div
          className={`absolute -inset-4 sm:-inset-7 rounded-[3rem] pointer-events-none transition-opacity duration-300 ${
            isActive ? 'opacity-75' : 'opacity-10'
          }`}
          style={{
            background: `radial-gradient(ellipse at center, ${app.glowColor} 0%, transparent 66%)`,
          }}
        />

        {/* --- PHYSICAL SMARTPHONE GLASS BODY (ULTRA-SLIM TITANIUM BEZEL, ZERO BLUR-SHADOW LAG) --- */}
        <div
          className={`relative aspect-[9/19.5] w-[216px] xs:w-[244px] sm:w-[280px] md:w-[308px] lg:w-[325px] rounded-[2.4rem] sm:rounded-[3rem] pt-[2px] sm:pt-[2.5px] pb-[5px] sm:pb-[6px] px-[4px] sm:px-[5px] transition-colors duration-300 ${
            isLight
              ? isActive
                ? 'bg-gradient-to-b from-[#ebebf2] via-[#d8d8e2] to-[#c0c0ce] border-[1.5px] border-black/25'
                : 'bg-gradient-to-b from-[#e5e5eb] via-[#d6d6df] to-[#c2c2ce] border-[1px] border-black/15'
              : isActive
              ? 'bg-gradient-to-b from-[#3c3c4b] via-[#1c1c27] to-[#0b0b12] border-[1.5px] border-white/35'
              : 'bg-gradient-to-b from-[#23232e] via-[#121219] to-[#08080c] border-[1px] border-white/15'
          }`}
        >
          {/* Side Hardware Buttons on Phone Frame */}
          <PhoneHardwareButtons />

          {/* INNER DISPLAY SCREEN: 100% NOTCHLESS EDGE-TO-EDGE GLASS */}
          <div className="w-full h-full rounded-t-[2.25rem] sm:rounded-t-[2.85rem] rounded-b-[2.1rem] sm:rounded-b-[2.65rem] overflow-hidden relative bg-[#030305] flex flex-col">
            {/* Real Smartphone Status Bar - Dedicated Header (Zero overlap with image) */}
            <div className="shrink-0 w-full z-30">
              <PhoneStatusBar app={app} />
            </div>

            {/* Crisp Edge Specular Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none z-20" />
            <div
              className="absolute inset-0 rounded-t-[2.25rem] sm:rounded-t-[2.85rem] rounded-b-[2.1rem] sm:rounded-b-[2.65rem] pointer-events-none z-20"
              style={{
                boxShadow: isActive
                  ? `inset 0 0 0 1px ${app.baseColor}55`
                  : 'inset 0 0 0 1px rgba(255,255,255,0.12)',
              }}
            />

            {/* SCREEN CONTENT: APP PHOTO FILLING SCREEN DIRECTLY UNDER STATUS BAR */}
            {app.image ? (
              <div className="flex-1 w-full relative overflow-hidden bg-[#030305]">
                <img
                  src={app.image}
                  alt={app.name}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-cover object-top select-none pointer-events-none"
                />

                {/* Subtle bottom gradient to highlight phone bottom */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
              </div>
            ) : (
              /* Futuristic Stealth UI Screen for Classified Build / APK without screenshot */
              <div className="flex-1 w-full relative overflow-hidden bg-[#050508] flex flex-col items-center justify-center p-6 text-center select-none">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at center, ${app.glowColor} 0%, transparent 75%)`,
                    opacity: 0.25,
                  }}
                />
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className="w-14 h-14 rounded-full border flex items-center justify-center mb-3"
                    style={{
                      borderColor: `${app.baseColor}66`,
                      backgroundColor: `${app.baseColor}18`,
                    }}
                  >
                    {app.apkData ? (
                      <Smartphone className="w-6 h-6" style={{ color: app.baseColor }} />
                    ) : (
                      <Lock className="w-6 h-6 text-[#fffb00]" />
                    )}
                  </div>
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]"
                    style={{ color: app.baseColor }}
                  >
                    {app.apkData ? app.apkData.version : 'CLASSIFIED'}
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-zinc-400 mt-1 uppercase">
                    {app.apkData ? `${app.apkData.apkSize} // APK BUILD` : 'PROTOCOL 03 // RESTRICTED'}
                  </span>
                  <div
                    className="mt-4 px-3 py-1 rounded border bg-black/75 text-[8px] font-mono tracking-widest text-zinc-300"
                    style={{ borderColor: `${app.baseColor}33` }}
                  >
                    {app.apkData ? 'TAP TO DOWNLOAD APK' : 'TAP TO DECRYPT'}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-1 bg-white/80 rounded-full z-30 pointer-events-none" />

            {/* Tap to Open / APK CTA Pill Overlay on Center Phone */}
            {isActive && (
              <div className="absolute inset-x-0 bottom-6 z-30 flex justify-center pointer-events-none">
                <div
                  className="px-3.5 py-1.5 rounded-full border bg-[#050509]/92 text-white flex items-center gap-2"
                  style={{ borderColor: `${app.baseColor}55` }}
                >
                  {app.apkData ? (
                    <>
                      <Download className="w-3 h-3" style={{ color: app.baseColor }} />
                      <span className="text-[9px] font-mono font-bold tracking-[0.22em] uppercase">
                        APK READY · TAP PHONE
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3" style={{ color: app.baseColor }} />
                      <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase">
                        TAP FOR DETAILS
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Minimal Under-Phone Floating Title */}
        <div className="mt-4 flex flex-col items-center text-center pointer-events-none">
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: app.baseColor }}
            />
            <span
              className={`font-display font-black text-sm sm:text-base tracking-wider uppercase ${
                isLight ? 'text-zinc-900' : 'text-white'
              }`}
            >
              {app.name}
            </span>
          </div>
          <span
            className="text-[9px] font-mono uppercase tracking-[0.25em] mt-0.5"
            style={{ color: app.baseColor }}
          >
            {app.apkData ? `${app.tag} · ${app.apkData.version}` : app.tag}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// --- MAIN APP ---
export default function App() {
  const [activeApp, setActiveApp] = useState<AppProject | null>(null);
  const [isLight, setIsLight] = useState<boolean>(false);
  const [lowSpec] = useState<boolean>(() => detectSilentLowSpec());
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // Stealth #admin hash detection (completely invisible on main site)
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#admin';
  });

  // Published APK apps synced from Firestore / local cache
  const [publishedApks, setPublishedApks] = useState<StoredApkApp[]>(() =>
    loadCachedApkApps().filter((a) => a.published)
  );
  const [downloadingApkId, setDownloadingApkId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const downloadLockRef = useRef<boolean>(false);

  useEffect(() => {
    const checkHash = () => {
      setIsAdminRoute(window.location.hash.toLowerCase() === '#admin');
    };
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  useEffect(() => {
    const unsub = subscribePublishedApkApps((cloudApps) => {
      setPublishedApks(cloudApps);
    });
    return () => unsub();
  }, []);

  // 3D Phone Viewer apps remain separate from downloadable APK apps
  const phoneApps: AppProject[] = defaultApps;

  // Standalone downloadable APK apps for #apps section (ZERO default apps)
  const apkSectionApps: AppProject[] = useMemo(() => {
    return publishedApks
      .filter(
        (apk) =>
          apk.id !== 'loki_x_prime_apk' &&
          apk.id !== 'commerce_prime_apk' &&
          !defaultApps.some((b) => b.name.toLowerCase() === apk.name.toLowerCase())
      )
      .map((apk, idx) => ({
        id: apk.id,
        name: apk.name,
        desc: apk.desc,
        fullDesc: apk.fullDesc,
        tag: apk.tag || 'Android APK',
        icon: <Smartphone className="w-4 h-4" />,
        image: apk.image || undefined,
        url: apk.url || '#',
        number: String(idx + 1).padStart(2, '0'),
        iconColor: 'text-[#00ffd5]',
        baseColor: apk.baseColor || '#00ffd5',
        gradient: 'from-[#00ffd5] to-[#ff00c8]',
        glowColor: `${apk.baseColor || '#00ffd5'}66`,
        features: apk.features,
        tech: apk.tech,
        apkData: apk,
      }));
  }, [publishedApks]);

  const spaceSectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const isShowcaseInView = useInView(spaceSectionRef, {
    margin: '-60px 0px -80px 0px',
    amount: 0.15,
  });
  const spaceIntensityRef = useRef<number>(0);
  const activeColorRef = useRef<string>(defaultApps[0].baseColor);

  // Responsive pixel spread for single-matrix 3D transforms
  const [spreadPx, setSpreadPx] = useState<number>(() => {
    if (typeof window === 'undefined') return 220;
    const w = window.innerWidth;
    if (w < 420) return 158;
    if (w < 640) return 182;
    if (w < 1024) return 225;
    return 265;
  });

  useEffect(() => {
    const updateSpread = () => {
      const w = window.innerWidth;
      if (w < 420) setSpreadPx(158);
      else if (w < 640) setSpreadPx(182);
      else if (w < 1024) setSpreadPx(225);
      else setSpreadPx(265);
    };
    window.addEventListener('resize', updateSpread, { passive: true });
    return () => window.removeEventListener('resize', updateSpread);
  }, []);

  // Unified Continuous Virtual Index for Peak 60/120FPS 3D Phone Viewer
  const virtualIndex = useMotionValue(0);
  const isDraggingRef = useRef<boolean>(false);
  const didDragRef = useRef<boolean>(false);
  const pointerDownXRef = useRef<number>(0);
  const pointerDownYRef = useRef<number>(0);
  const dragStartVirtualRef = useRef<number>(0);
  const lastMoveTimeRef = useRef<number>(0);
  const lastMoveXRef = useRef<number>(0);
  const velocityXRef = useRef<number>(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const spreadRef = useRef<number>(spreadPx);
  spreadRef.current = spreadPx;

  const { scrollYProgress } = useScroll();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 25 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 25 });

  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.25, 0.9]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const safeSlideIndex = ((activeSlide % phoneApps.length) + phoneApps.length) % phoneApps.length;
  const currentActiveApp = phoneApps[safeSlideIndex] || phoneApps[0];

  useEffect(() => {
    spaceIntensityRef.current = isShowcaseInView ? 1 : 0.2;
    activeColorRef.current = currentActiveApp.baseColor;
  }, [isShowcaseInView, currentActiveApp]);

  // Animate virtualIndex smoothly to target index with incoming momentum
  const selectSlideManual = useCallback(
    (targetIdx: number, swipeVelocityPx = 0) => {
      const total = phoneApps.length;
      if (total <= 0) return;
      const normalizedTarget = ((targetIdx % total) + total) % total;
      const currentV = virtualIndex.get();
      const currentMod = ((currentV % total) + total) % total;
      let delta = normalizedTarget - currentMod;
      if (delta > total / 2) delta -= total;
      if (delta < -total / 2) delta += total;

      const nextVirtual = Math.round(currentV + delta);
      setActiveSlide(normalizedTarget);
      activeColorRef.current = phoneApps[normalizedTarget].baseColor;

      const clampedVel = Math.max(-1800, Math.min(1800, swipeVelocityPx));
      animate(virtualIndex, nextVirtual, {
        type: 'spring',
        stiffness: 290,
        damping: 30,
        mass: 0.48,
        velocity: clampedVel ? -clampedVel / spreadRef.current : 0,
      });
    },
    [phoneApps, virtualIndex]
  );

  const settleSwipe = useCallback(
    (dx: number, vx: number) => {
      if (isHorizontalSwipeRef.current !== false && (Math.abs(dx) > 22 || Math.abs(vx) > 90)) {
        if (dx < -22 || vx < -90) {
          selectSlideManual(safeSlideIndex + 1, vx);
        } else if (dx > 22 || vx > 90) {
          selectSlideManual(safeSlideIndex - 1, vx);
        } else {
          selectSlideManual(safeSlideIndex, 0);
        }
      } else {
        selectSlideManual(safeSlideIndex, 0);
      }
      setTimeout(() => {
        didDragRef.current = false;
      }, 65);
    },
    [safeSlideIndex, selectSlideManual]
  );

  // Native non-passive touch listeners so budget Android browsers never cancel horizontal swipes
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      virtualIndex.stop();
      const t = e.touches[0];
      isDraggingRef.current = true;
      didDragRef.current = false;
      isHorizontalSwipeRef.current = null;
      pointerDownXRef.current = t.clientX;
      pointerDownYRef.current = t.clientY;
      lastMoveXRef.current = t.clientX;
      lastMoveTimeRef.current = performance.now();
      velocityXRef.current = 0;
      dragStartVirtualRef.current = virtualIndex.get();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const t = e.touches[0];
      const dx = t.clientX - pointerDownXRef.current;
      const dy = t.clientY - pointerDownYRef.current;

      if (isHorizontalSwipeRef.current === null) {
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          isHorizontalSwipeRef.current = Math.abs(dx) >= Math.abs(dy) * 0.85;
        }
      }

      if (isHorizontalSwipeRef.current === false) return;

      // Lock horizontal swipe so Chrome/Safari stays 100% responsive with zero gesture hijack
      if (isHorizontalSwipeRef.current === true && e.cancelable) {
        e.preventDefault();
      }

      if (Math.abs(dx) > 5) {
        didDragRef.current = true;
      }

      const now = performance.now();
      const dt = Math.max(1, now - lastMoveTimeRef.current);
      const instantVx = ((t.clientX - lastMoveXRef.current) / dt) * 1000;
      // Exponential smoothing avoids wild velocity spikes on cheap digitizers
      velocityXRef.current = velocityXRef.current * 0.55 + instantVx * 0.45;
      lastMoveXRef.current = t.clientX;
      lastMoveTimeRef.current = now;

      virtualIndex.set(dragStartVirtualRef.current - dx / spreadRef.current);
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      const t = e.changedTouches[0];
      const dx = t ? t.clientX - pointerDownXRef.current : 0;
      settleSwipe(dx, velocityXRef.current);
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [settleSwipe, virtualIndex]);

  // Mouse / trackpad pointer handlers with pointer capture (touch handled natively above)
  const handleStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || (e.button !== 0 && e.pointerType === 'mouse')) return;
    virtualIndex.stop();
    isDraggingRef.current = true;
    didDragRef.current = false;
    isHorizontalSwipeRef.current = true;
    pointerDownXRef.current = e.clientX;
    pointerDownYRef.current = e.clientY;
    lastMoveXRef.current = e.clientX;
    lastMoveTimeRef.current = performance.now();
    velocityXRef.current = 0;
    dragStartVirtualRef.current = virtualIndex.get();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore if unsupported
    }
  };

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || e.pointerType === 'touch') return;
    const dx = e.clientX - pointerDownXRef.current;

    if (Math.abs(dx) > 5) {
      didDragRef.current = true;
    }

    const now = performance.now();
    const dt = Math.max(1, now - lastMoveTimeRef.current);
    const instantVx = ((e.clientX - lastMoveXRef.current) / dt) * 1000;
    velocityXRef.current = velocityXRef.current * 0.55 + instantVx * 0.45;
    lastMoveXRef.current = e.clientX;
    lastMoveTimeRef.current = now;

    virtualIndex.set(dragStartVirtualRef.current - dx / spreadRef.current);
  };

  const handleStagePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || e.pointerType === 'touch') return;
    isDraggingRef.current = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
    const dx = e.clientX - pointerDownXRef.current;
    settleSwipe(dx, velocityXRef.current);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (lowSpec || e.pointerType === 'touch') return;
      pointerX.set((e.clientX - window.innerWidth / 2) * 0.1);
      pointerY.set((e.clientY - window.innerHeight / 2) * 0.1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveApp(null);
      if (!activeApp && !isAdminRoute) {
        if (e.key === 'ArrowRight') selectSlideManual(safeSlideIndex + 1);
        if (e.key === 'ArrowLeft') selectSlideManual(safeSlideIndex - 1);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lowSpec, pointerX, pointerY, activeApp, isAdminRoute, safeSlideIndex, selectSlideManual]);

  useEffect(() => {
    document.body.style.overflow = activeApp ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeApp]);

  useEffect(() => {
    document.body.style.backgroundColor = isLight ? '#f4f4f5' : '#020205';
    document.body.style.color = isLight ? '#09090b' : '#fff';
  }, [isLight]);

  const handleDownloadApkFromModal = async (apk: StoredApkApp) => {
    if (downloadLockRef.current) return;
    downloadLockRef.current = true;
    setDownloadingApkId(apk.id);
    setDownloadProgress(8);
    try {
      await triggerApkDownload(apk, (pct) => setDownloadProgress(pct));
    } finally {
      setTimeout(() => {
        downloadLockRef.current = false;
        setDownloadingApkId(null);
        setDownloadProgress(0);
      }, 500);
    }
  };

  // --- STEALTH #admin ROUTE (ONLY ACCESSIBLE BY TYPING #admin IN URL) ---
  if (isAdminRoute) {
    return (
      <AdminPanel
        isLight={isLight}
        onExitAdmin={() => {
          window.history.pushState(
            '',
            document.title,
            window.location.pathname + window.location.search
          );
          setIsAdminRoute(false);
        }}
        onAppsChanged={() => {
          setPublishedApks(loadCachedApkApps().filter((a) => a.published));
        }}
      />
    );
  }

  return (
    <div
      className={`min-h-[100dvh] font-sans selection:bg-[#00d5ff]/30 relative overflow-x-hidden transition-colors duration-500 ${
        isLight ? 'bg-[#f4f4f5] selection:text-zinc-900' : 'bg-[#020205] selection:text-white'
      }`}
    >
      {/* --- DEEP SPACE STARFIELD WARP CANVAS --- */}
      <SpaceWarpCanvas
        isLight={isLight}
        lowSpec={lowSpec}
        spaceIntensityRef={spaceIntensityRef}
        activeColorRef={activeColorRef}
        isDraggingRef={isDraggingRef}
      />

      {/* --- MINIMAL AMBIENT ORBITAL GEOMETRY --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden hw-accel">
        <motion.div
          style={{ x: smoothX, y: smoothY, scale: ringScale }}
          className="absolute inset-0 flex items-center justify-center transform-gpu"
        >
          <div
            className="w-[75vmin] h-[75vmin] max-w-[640px] max-h-[640px] rounded-full transition-opacity duration-700"
            style={{
              background: isLight
                ? 'radial-gradient(circle, rgba(0,213,255,0.16) 0%, rgba(255,0,123,0.1) 45%, transparent 70%)'
                : `radial-gradient(circle, ${currentActiveApp.glowColor} 0%, rgba(0,213,255,0.1) 48%, transparent 72%)`,
            }}
          />
        </motion.div>

        <motion.div
          style={{ scale: ringScale, rotate: ringRotate }}
          className="absolute inset-0 flex items-center justify-center transform-gpu"
        >
          <div
            style={lowSpec && isShowcaseInView ? { animationPlayState: 'paused' } : undefined}
            className={`w-[82vmin] h-[82vmin] max-w-[720px] max-h-[720px] rounded-full border border-dashed animate-orbit-cw ${
              isLight ? 'border-black/[0.08]' : 'border-white/[0.08]'
            }`}
          />
          <div
            style={lowSpec && isShowcaseInView ? { animationPlayState: 'paused' } : undefined}
            className={`absolute w-[56vmin] h-[56vmin] max-w-[480px] max-h-[480px] rounded-full border animate-orbit-ccw ${
              isLight ? 'border-black/[0.06]' : 'border-white/[0.06]'
            }`}
          />
        </motion.div>
      </div>

      {/* --- UI LAYER --- */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* MINIMAL TOP BAR (HIDES UPWARD WHEN IN ASSET/SHOWCASE SECTION) */}
        <nav
          className={`fixed top-0 w-full z-50 px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hw-accel transform-gpu pt-safe ${
            isShowcaseInView
              ? '-translate-y-full opacity-0 pointer-events-none'
              : 'translate-y-0 opacity-100 pointer-events-auto'
          } ${
            isLight
              ? 'bg-gradient-to-b from-[#f4f4f5]/90 to-transparent'
              : 'bg-gradient-to-b from-[#020205]/90 to-transparent'
          }`}
        >
          <motion.a
            href="#"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="outline-none"
          >
            <span
              className={`font-display font-black text-[10px] sm:text-xs uppercase flex items-center gap-2.5 px-4 sm:px-5 py-2.5 tracking-[0.2em] rounded-full border transition-colors duration-500 backdrop-blur-xl ${
                isLight
                  ? 'bg-white/90 border-black/10 text-zinc-900 shadow-sm'
                  : 'bg-[#07070c]/90 border-white/15 text-white god-border'
              }`}
            >
              <Diamond className="w-3 h-3 shrink-0 fill-[#00ffd5] text-[#00ffd5]" />
              <span>OWNER_OFFICIAL</span>
            </span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 sm:gap-7 text-[10px] uppercase tracking-[0.25em] font-semibold"
          >
            <a
              href="#work"
              className={`hover:text-[#00ffd5] transition-colors ${
                isLight ? 'text-zinc-700' : 'text-zinc-300'
              }`}
            >
              Assets
            </a>
            <a
              href="#contact"
              className={`hidden sm:block hover:text-[#00ffd5] transition-colors ${
                isLight ? 'text-zinc-700' : 'text-zinc-300'
              }`}
            >
              Connect
            </a>

            <button
              onClick={() => setIsLight(!isLight)}
              aria-label="Toggle color theme"
              className={`p-2.5 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xl ${
                isLight
                  ? 'bg-white/90 border-black/10 text-zinc-900 shadow-sm'
                  : 'bg-[#08080c]/90 border-white/15 text-white'
              }`}
            >
              <AnimatePresence mode="wait">
                {isLight ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </nav>

        {/* --- MINIMAL HERO SECTION (TIGHT & BALANCED) --- */}
        <section className="min-h-[76dvh] sm:min-h-[82dvh] w-full flex flex-col items-center justify-center text-center px-4 pt-24 pb-6 relative">
          <div className="flex flex-col items-center justify-center">
            {/* Staggered Spring Letters */}
            <div className="flex items-center justify-center select-none">
              {HERO_LETTERS.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 35, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.08 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.05,
                    transition: { type: 'spring', stiffness: 400, damping: 14 },
                  }}
                  className={`inline-block text-[19vw] sm:text-[15vw] md:text-[12.5vw] lg:text-[10.5rem] font-display font-black leading-[0.88] tracking-tighter cursor-default transform-gpu ${
                    char === '.'
                      ? 'text-[#00ffd5] drop-shadow-[0_0_25px_rgba(0,255,213,0.6)]'
                      : isLight
                      ? 'text-transparent bg-clip-text bg-gradient-to-b from-zinc-950 via-zinc-700 to-zinc-400'
                      : 'text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-600'
                  }`}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className={`mt-4 sm:mt-5 text-[11px] sm:text-xs md:text-sm tracking-[0.32em] font-semibold uppercase ${
                isLight ? 'text-zinc-600' : 'text-zinc-300'
              }`}
            >
              Design <span className="text-[#ff007b] mx-1">✦</span> Develop{' '}
              <span className="text-[#00ffd5] mx-1">✦</span> Elevate
            </motion.p>

            {/* A.K.A OWNER Sweep Badge */}
            <motion.a
              href="#apps"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="mt-7 sm:mt-9 relative group cursor-pointer outline-none"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00d5ff] via-[#ff007b] to-[#ccff00] rounded-full blur-[14px] bg-[length:200%_auto] animate-[rgb-sweep_4s_linear_infinite] opacity-55 group-hover:opacity-90 transition duration-500 -z-10" />
              <div
                className={`px-8 sm:px-11 py-3 sm:py-3.5 flex items-center justify-center border rounded-full backdrop-blur-2xl transition-colors duration-500 ${
                  isLight
                    ? 'bg-white/95 border-black/15 text-zinc-900'
                    : 'bg-[#050508]/95 border-white/20 text-white'
                }`}
              >
                <span className="text-[10px] sm:text-xs font-display font-bold tracking-[0.55em] sm:tracking-[0.7em] pl-[0.55em] uppercase whitespace-nowrap">
                  A.K.A OWNER
                </span>
              </div>
            </motion.a>
          </div>

          {/* Minimal Scroll Indicator */}
          <motion.a
            href="#apps"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className={`mt-7 sm:mt-10 flex flex-col items-center gap-2 ${
              isLight ? 'text-zinc-500' : 'text-zinc-400'
            }`}
          >
            <span className="text-[9px] uppercase tracking-[0.35em] font-semibold">
              Explore Apps
            </span>
            <div className="w-[1px] h-7 bg-gradient-to-b from-[#00ffd5] to-transparent" />
          </motion.a>
        </section>

        {/* --- APPS SECTION (AFTER SOMAY HERO, BEFORE 3D PHONE VIEWER — ZERO DEFAULT APPS) --- */}
        <section
          id="apps"
          className="w-full py-6 sm:py-10 relative z-10 flex flex-col items-center px-4"
        >
          <div className="w-full max-w-5xl">
            <div className="flex items-end justify-between gap-4 mb-5 sm:mb-7 px-1">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#00ffd5] block mb-1">
                  ANDROID RELEASES
                </span>
                <h2
                  className={`text-xl sm:text-2xl md:text-3xl font-display font-black uppercase tracking-tight ${
                    isLight ? 'text-zinc-900' : 'text-white'
                  }`}
                >
                  Apps &amp; APKs
                </h2>
              </div>
              <a
                href="#work"
                className={`text-[10px] font-mono uppercase tracking-[0.25em] flex items-center gap-1.5 transition-colors hover:text-[#00ffd5] whitespace-nowrap shrink-0 ${
                  isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                <span>3D Phones</span>
                <MoveUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {apkSectionApps.length === 0 ? (
              <div
                className={`rounded-2xl border border-dashed px-6 py-8 text-center ${
                  isLight
                    ? 'bg-white/60 border-black/15 text-zinc-500'
                    : 'bg-[#08080f]/60 border-white/10 text-zinc-400'
                }`}
              >
                <p className="text-xs font-mono uppercase tracking-[0.24em]">
                  No APK Releases Published Yet
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {apkSectionApps.map((app) => (
                  <div
                    key={app.id || app.name}
                    onClick={() => setActiveApp(app)}
                    className={`group rounded-2xl border p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer active:scale-[0.99] ${
                      isLight
                        ? 'bg-white/90 border-black/10 hover:border-black/25 shadow-sm'
                        : 'bg-[#08080f]/90 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 overflow-hidden"
                            style={{
                              borderColor: `${app.baseColor}44`,
                              backgroundColor: `${app.baseColor}14`,
                              color: app.baseColor,
                            }}
                          >
                            {app.image ? (
                              <img
                                src={app.image}
                                alt={app.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              app.icon
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3
                              className={`font-display font-bold text-sm sm:text-base tracking-tight truncate ${
                                isLight ? 'text-zinc-900' : 'text-white'
                              }`}
                            >
                              {app.name}
                            </h3>
                            <p
                              className={`text-[11px] font-mono truncate ${
                                isLight ? 'text-zinc-500' : 'text-zinc-400'
                              }`}
                            >
                              {app.tag}
                              {app.apkData ? ` · ${app.apkData.version}` : ''}
                            </p>
                          </div>
                        </div>
                      </div>

                      <p
                        className={`text-xs leading-relaxed line-clamp-2 mb-4 ${
                          isLight ? 'text-zinc-600' : 'text-zinc-400'
                        }`}
                      >
                        {app.desc}
                      </p>
                    </div>

                    <div
                      className={`flex items-center justify-between gap-2 pt-3 border-t ${
                        isLight ? 'border-black/10' : 'border-white/10'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveApp(app);
                        }}
                        className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold hover:opacity-80 transition-opacity whitespace-nowrap cursor-pointer"
                        style={{ color: app.baseColor }}
                      >
                        App Details
                      </button>

                      {app.apkData && (
                        <button
                          type="button"
                          disabled={Boolean(downloadingApkId)}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (app.apkData) handleDownloadApkFromModal(app.apkData);
                          }}
                          className="px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider text-black flex items-center gap-1.5 cursor-pointer hover:opacity-90 active:scale-[0.97] transition-all whitespace-nowrap disabled:opacity-65 disabled:cursor-not-allowed"
                          style={{ backgroundColor: app.baseColor }}
                        >
                          {downloadingApkId === app.apkData.id ? (
                            <>
                              <span className="w-3 h-3 rounded-full border-2 border-black/25 border-t-black animate-spin shrink-0" />
                              <span>{downloadProgress}%...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3 h-3 shrink-0" />
                              <span>APK ({app.apkData.apkSize})</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* --- 3D DEEP SPACE ASSET SHOWCASE (120FPS BUTTER-SMOOTH SLIDER ON ALL PHONES) --- */}
        <section
          id="work"
          ref={spaceSectionRef}
          className="w-full py-8 sm:py-14 md:py-16 relative z-10 flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="w-full max-w-6xl flex flex-col items-center justify-center px-4">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 z-20">
              <span className="text-[9px] font-mono uppercase tracking-[0.38em] text-[#00ffd5] block mb-1">
                DEEP SPACE SECTOR // LIVE APPS
              </span>
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tighter ${
                  isLight ? 'text-zinc-900' : 'text-white'
                }`}
              >
                Featured Assets
              </h2>
            </div>

            {/* 3D Perspective Stage with Zero-Overhead Single-Matrix GPU Rendering */}
            <div
              ref={stageRef}
              onPointerDown={handleStagePointerDown}
              onPointerMove={handleStagePointerMove}
              onPointerUp={handleStagePointerUp}
              onPointerCancel={handleStagePointerUp}
              className="relative w-full h-[505px] xs:h-[550px] sm:h-[615px] md:h-[660px] flex items-center justify-center my-2 cursor-grab active:cursor-grabbing touch-pan-y select-none"
            >
              {/* Sleek Keynote 3D Stage Floor Pedestal Glow (Pure gradient, 0px CSS blur = zero GPU lag) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 w-[260px] sm:w-[340px] h-[34px] rounded-[100%] transition-colors duration-300"
                style={{
                  background: `radial-gradient(ellipse at center, ${currentActiveApp.baseColor}42 0%, ${currentActiveApp.baseColor}14 48%, transparent 74%)`,
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-12 sm:bottom-14 left-1/2 -translate-x-1/2 w-[210px] sm:w-[270px] h-[16px] rounded-[100%] border opacity-35 transition-colors duration-300"
                style={{
                  borderColor: currentActiveApp.baseColor,
                }}
              />

              {phoneApps.map((app, index) => (
                <SpacePhoneGlassTile
                  key={app.id || app.name}
                  app={app}
                  index={index}
                  total={phoneApps.length}
                  isActive={index === safeSlideIndex}
                  onSelect={() => selectSlideManual(index)}
                  onInspect={() => setActiveApp(app)}
                  isLight={isLight}
                  lowSpec={lowSpec}
                  spreadPx={spreadPx}
                  didDragRef={didDragRef}
                  virtualIndex={virtualIndex}
                />
              ))}
            </div>

            {/* Infinite Slider Controls */}
            <div className="z-20 mt-4 flex flex-col items-center gap-3">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => selectSlideManual(safeSlideIndex - 1)}
                  aria-label="Previous asset"
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer ${
                    isLight
                      ? 'bg-white/90 border-black/10 text-zinc-900 hover:bg-black hover:text-white shadow-sm'
                      : 'bg-white/5 border-white/15 text-white hover:bg-white hover:text-black shadow-lg'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Minimal Paginated Dots */}
                <div className="flex items-center gap-2.5">
                  {phoneApps.map((app, i) => (
                    <button
                      key={app.id || app.name}
                      type="button"
                      onClick={() => selectSlideManual(i)}
                      aria-label={`Select ${app.name}`}
                      className="p-1.5 cursor-pointer"
                    >
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === safeSlideIndex ? 'w-8' : 'w-2 opacity-35'
                        }`}
                        style={{
                          backgroundColor:
                            i === safeSlideIndex
                              ? app.baseColor
                              : isLight
                              ? '#18181b'
                              : '#ffffff',
                        }}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => selectSlideManual(safeSlideIndex + 1)}
                  aria-label="Next asset"
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer ${
                    isLight
                      ? 'bg-white/90 border-black/10 text-zinc-900 hover:bg-black hover:text-white shadow-sm'
                      : 'bg-white/5 border-white/15 text-white hover:bg-white hover:text-black shadow-lg'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <span
                className={`text-[9px] font-mono uppercase tracking-[0.28em] ${
                  isLight ? 'text-zinc-500' : 'text-zinc-400'
                }`}
              >
                Swipe or tap phone to view details & APK
              </span>
            </div>
          </div>
        </section>

        {/* --- MINIMAL FOOTER --- */}
        <footer
          id="contact"
          className={`w-full relative z-20 transition-colors duration-500 mt-6 sm:mt-12 ${
            isLight ? 'bg-zinc-100' : 'bg-gradient-to-b from-transparent to-[#040407]'
          }`}
        >
          <div
            className={`max-w-[1400px] mx-auto px-4 sm:px-6 py-14 sm:py-24 flex flex-col items-center border-b relative overflow-hidden backdrop-blur-md rounded-t-[2rem] sm:rounded-t-[3rem] border-t transition-colors duration-500 ${
              isLight ? 'border-black/5 bg-white/80' : 'border-white/10 bg-[#050508]/85'
            }`}
          >
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 relative z-10">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="mailto:officialsomay222@gmail.com"
                className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.32em] uppercase px-6 sm:px-9 py-3.5 sm:py-4 rounded-full border transition-all duration-300 ${
                  isLight
                    ? 'text-zinc-800 bg-white border-black/15 shadow-sm hover:border-[#00d5ff]'
                    : 'text-zinc-100 bg-[#08080c] border-white/15 hover:border-[#00d5ff] hover:shadow-[0_0_30px_rgba(0,213,255,0.3)]'
                }`}
              >
                Establish Connection
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="https://wa.me/919034184333"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] uppercase px-5 sm:px-7 py-3.5 sm:py-4 rounded-full border flex items-center gap-2.5 transition-all duration-300 ${
                  isLight
                    ? 'text-[#128C7E] bg-white border-[#25D366]/40 hover:bg-[#25D366]/10'
                    : 'text-[#25D366] bg-[#08080c] border-[#25D366]/35 hover:border-[#25D366] hover:shadow-[0_0_30px_rgba(37,211,102,0.35)]'
                }`}
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp Direct</span>
              </motion.a>
            </div>

            <a
              href="mailto:officialsomay222@gmail.com"
              className="group flex flex-col items-center justify-center outline-none hw-accel relative z-10 w-full"
            >
              <div className="flex flex-col items-center text-center mt-2 w-full max-w-[92vw] md:max-w-[68vw] relative z-10 transform-gpu">
                <svg
                  viewBox="0 0 1200 420"
                  className="w-full h-auto overflow-visible select-none pointer-events-none md:group-hover:scale-[1.02] transition-transform duration-700"
                >
                  <defs>
                    <linearGradient id="fluid-glow" x1="0%" y1="0%" x2="200%" y2="0%">
                      <stop offset="0%" stopColor="#00d5ff" />
                      <stop offset="25%" stopColor="#ff007b" />
                      <stop offset="50%" stopColor="#ccff00" />
                      <stop offset="75%" stopColor="#00d5ff" />
                      <stop offset="100%" stopColor="#ff007b" />
                    </linearGradient>
                  </defs>
                  <text
                    x="50%"
                    y="30%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-display font-black text-[145px] uppercase tracking-[0.08em]"
                    fill="transparent"
                    stroke={isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}
                    strokeWidth="2"
                  >
                    OWNER
                  </text>
                  <text
                    x="50%"
                    y="82%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-display font-black text-[145px] uppercase tracking-[0.08em]"
                    fill="transparent"
                    stroke={isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}
                    strokeWidth="2"
                  >
                    OFFICIAL
                  </text>
                  <text
                    x="50%"
                    y="30%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-display font-black text-[145px] uppercase tracking-[0.08em] fluid-stroke-text"
                    fill="transparent"
                    stroke="url(#fluid-glow)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  >
                    OWNER
                  </text>
                  <text
                    x="50%"
                    y="82%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-display font-black text-[145px] uppercase tracking-[0.08em] fluid-stroke-text"
                    fill="transparent"
                    stroke="url(#fluid-glow)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  >
                    OFFICIAL
                  </text>
                </svg>
              </div>
            </a>
          </div>

          <div
            className={`w-full relative z-10 transition-colors duration-500 pb-safe ${
              isLight ? 'bg-zinc-100' : 'bg-[#040407]'
            }`}
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <Diamond className="w-4 h-4 fill-[#00d5ff] text-[#00d5ff]" />
                <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-zinc-500">
                  © {new Date().getFullYear()}{' '}
                  <span className={isLight ? 'text-zinc-900' : 'text-white'}>
                    OWNER_OFFICIAL
                  </span>
                </p>
              </div>
              <div className="flex gap-4 sm:gap-5">
                {getSocialLinks(isLight).map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className={`transition-all duration-300 group relative border rounded-full p-3.5 sm:p-4 ${
                      isLight
                        ? 'text-zinc-600 bg-white border-black/10 shadow-sm'
                        : 'text-zinc-300 bg-[#0a0a0f] border-white/10 shadow-lg'
                    } ${link.hoverProps.className}`}
                  >
                    <div className="group-hover:rotate-12 transition-transform duration-300">
                      {link.icon}
                    </div>
                    <span
                      className={`absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${link.dotClass}`}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* --- APP DETAIL MODAL (APPEARS ON CLICKING THE PHONE) --- */}
      <AnimatePresence>
        {activeApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 lg:p-12 pointer-events-auto transform-gpu"
          >
            <div
              className={`absolute inset-0 backdrop-blur-xl transition-colors duration-300 ${
                isLight ? 'bg-zinc-900/45' : 'bg-[#000]/85'
              }`}
              onClick={() => setActiveApp(null)}
            />

            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className={`w-full h-[92dvh] md:h-[86vh] md:max-h-[840px] md:max-w-5xl border-t md:border overflow-y-auto md:overflow-hidden relative z-10 flex flex-col md:flex-row rounded-t-3xl md:rounded-3xl transition-colors duration-300 transform-gpu custom-scrollbar ${
                isLight
                  ? 'bg-white border-black/10 shadow-2xl'
                  : 'bg-[#060609] border-white/15 shadow-[0_0_60px_rgba(0,213,255,0.15)]'
              }`}
            >
              {/* Mobile Header Bar */}
              <div
                className={`sticky top-0 z-50 flex md:hidden items-center justify-between px-5 py-3.5 border-b backdrop-blur-xl ${
                  isLight
                    ? 'bg-white/90 border-black/5 text-zinc-900'
                    : 'bg-[#060609]/90 border-white/10 text-white'
                }`}
              >
                <span className="text-xs font-mono font-bold" style={{ color: activeApp.baseColor }}>
                  {activeApp.number} · {activeApp.tag}
                </span>
                <button
                  onClick={() => setActiveApp(null)}
                  aria-label="Close project details"
                  className={`w-9 h-9 rounded-full border flex items-center justify-center active:scale-90 transition-transform ${
                    isLight
                      ? 'bg-zinc-100 border-black/10 text-zinc-900'
                      : 'bg-white/10 border-white/15 text-white'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Desktop Close Button */}
              <button
                onClick={() => setActiveApp(null)}
                aria-label="Close project details"
                className={`hidden md:flex absolute top-6 right-6 z-50 w-10 h-10 border rounded-full items-center justify-center transition-colors group backdrop-blur-md cursor-pointer ${
                  isLight
                    ? 'bg-white/80 hover:bg-zinc-100 border-black/10 text-zinc-900'
                    : 'bg-black/60 hover:bg-white/15 border-white/15 text-white'
                }`}
              >
                <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>

              {/* Left Column: Realistic Phone Preview */}
              <div
                className={`w-full py-6 px-6 sm:p-8 md:h-full md:w-[45%] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r relative overflow-hidden shrink-0 ${
                  isLight ? 'bg-zinc-50 border-black/5' : 'bg-[#030306] border-white/5'
                }`}
              >
                <div
                  className="absolute -inset-10 opacity-35 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${activeApp.glowColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Smartphone Silhouette in Modal (100% Notchless, Ultra-Sleek) */}
                <div
                  className={`relative aspect-[9/19.5] w-[200px] sm:w-[230px] md:w-[250px] rounded-[2.3rem] sm:rounded-[2.7rem] pt-[2px] sm:pt-[2.5px] pb-[5px] sm:pb-[6px] px-[4px] sm:px-[5px] shadow-2xl ${
                    isLight
                      ? 'bg-gradient-to-b from-[#e5e5eb] via-[#d6d6df] to-[#c2c2ce] border-[1.5px] border-black/15'
                      : 'bg-gradient-to-b from-[#32323f] via-[#1a1a24] to-[#0c0c12] border-[1.5px] border-white/25'
                  }`}
                >
                  {/* Phone Hardware Chassis Buttons */}
                  <PhoneHardwareButtons />

                  {/* Modal Screen */}
                  <div className="w-full h-full rounded-t-[2.15rem] sm:rounded-t-[2.55rem] rounded-b-[2rem] sm:rounded-b-[2.4rem] overflow-hidden relative bg-[#030305] flex flex-col">
                    {/* Realistic Status Bar Header (Zero overlap with image) */}
                    <div className="shrink-0 w-full z-30">
                      <PhoneStatusBar app={activeApp} isModal={true} />
                    </div>

                    {activeApp.image ? (
                      <div className="flex-1 w-full relative overflow-hidden bg-[#030305]">
                        <img
                          src={activeApp.image}
                          alt={activeApp.name}
                          className="w-full h-full object-cover object-top select-none pointer-events-none"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
                      </div>
                    ) : (
                      <div className="flex-1 w-full flex flex-col items-center justify-center p-4 bg-[#060609]">
                        <Lock className="w-7 h-7 text-[#fffb00] mb-2" />
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#fffb00]">
                          RESTRICTED ACCESS
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none z-20" />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-1 bg-white/75 rounded-full z-30 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Right Column: Complete App Details */}
              <div
                className={`w-full md:h-full md:w-[55%] p-6 sm:p-10 md:p-12 flex flex-col md:overflow-y-auto custom-scrollbar pb-safe ${
                  isLight ? 'bg-white' : 'bg-[#060609]'
                }`}
              >
                <div className="hidden md:flex items-center gap-3 mb-5">
                  <span
                    className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: activeApp.baseColor }}
                  >
                    {activeApp.tag}
                  </span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-xs font-mono font-bold text-zinc-500">
                    ID {activeApp.number}
                  </span>
                  {activeApp.apkData && (
                    <>
                      <span className="text-zinc-500">·</span>
                      <span className="text-xs font-mono text-[#00ffd5]">
                        {activeApp.apkData.version} ({activeApp.apkData.apkSize})
                      </span>
                    </>
                  )}
                </div>

                <h3
                  className={`text-2xl sm:text-4xl font-display font-black mb-3 uppercase tracking-tight ${
                    isLight ? 'text-zinc-900' : 'text-white'
                  }`}
                >
                  {activeApp.name}
                </h3>
                <p
                  className={`text-sm sm:text-base leading-relaxed mb-6 ${
                    isLight ? 'text-zinc-600' : 'text-zinc-300'
                  }`}
                >
                  {activeApp.fullDesc}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-3">
                    Core Engineering Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {activeApp.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-3 text-sm ${
                          isLight ? 'text-zinc-700' : 'text-zinc-200'
                        }`}
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0"
                          style={{ color: activeApp.baseColor }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-2.5">
                    Technology Architecture
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {activeApp.tech.map((t, i) => (
                      <div
                        key={i}
                        className={`text-xs border rounded-lg px-3 py-1.5 flex items-center gap-2 font-mono ${
                          isLight
                            ? 'text-zinc-700 bg-zinc-50 border-black/10'
                            : 'text-zinc-300 bg-white/5 border-white/10'
                        }`}
                      >
                        <Code2 className="w-3.5 h-3.5 text-zinc-500" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Download APK & Launch CTAs */}
                <div className="mt-auto pt-4 flex flex-col gap-3">
                  {activeApp.apkData && (
                    <button
                      type="button"
                      disabled={Boolean(downloadingApkId)}
                      onClick={() =>
                        activeApp.apkData && handleDownloadApkFromModal(activeApp.apkData)
                      }
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00ffd5] via-[#00d5ff] to-[#ff00c8] text-black font-display font-black text-xs sm:text-sm uppercase tracking-[0.22em] flex items-center justify-center gap-3 shadow-xl hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed"
                    >
                      {downloadingApkId === activeApp.apkData.id ? (
                        <span className="w-4 h-4 rounded-full border-2 border-black/25 border-t-black animate-spin shrink-0" />
                      ) : (
                        <Download className="w-4 h-4 shrink-0" />
                      )}
                      <span>
                        {downloadingApkId === activeApp.apkData.id
                          ? `Downloading APK (${downloadProgress}%)...`
                          : `Download APK · ${activeApp.apkData.version} (${activeApp.apkData.apkSize})`}
                      </span>
                    </button>
                  )}

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    {activeApp.url && activeApp.url !== '#' && (
                      <a
                        href={activeApp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:flex-1 rounded-xl p-[1px] relative group overflow-hidden active:scale-[0.99] transition-all duration-300 god-border"
                      >
                        <div
                          className={`w-full py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-3 relative z-10 transition-colors ${
                            isLight
                              ? 'bg-zinc-900 text-white hover:bg-black'
                              : 'bg-[#08080c] hover:bg-black text-white'
                          }`}
                        >
                          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold z-10">
                            Launch Web Asset
                          </span>
                          <MoveUpRight className="w-4 h-4 z-10" />
                        </div>
                      </a>
                    )}

                    <a
                      href={`https://wa.me/919034184333?text=Hi%20Somay,%20I%20am%20interested%20in%20your%20app%20${encodeURIComponent(
                        activeApp.name
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full ${
                        activeApp.url && activeApp.url !== '#' ? 'sm:w-auto' : 'sm:flex-1'
                      } px-5 py-3.5 sm:py-4 rounded-xl border flex items-center justify-center gap-2.5 transition-all text-xs font-semibold tracking-wider uppercase active:scale-95 ${
                        isLight
                          ? 'border-[#25D366]/40 text-[#128C7E] hover:bg-[#25D366]/10'
                          : 'border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/15'
                      }`}
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Inquire</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
