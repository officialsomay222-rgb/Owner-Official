import React, { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import {
  Upload,
  Trash2,
  Download,
  Plus,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  LogOut,
  ArrowLeft,
  Image as ImageIcon,
  FileArchive,
  Eye,
  EyeOff,
  Edit3,
  AlertCircle,
} from 'lucide-react';
import { auth, googleProvider, ADMIN_EMAIL } from './firebase';
import {
  type StoredApkApp,
  fetchAllAdminApkApps,
  publishOrUpdateApkApp,
  removeApkApp,
  compressImageFile,
  triggerApkDownload,
} from './apkStore';

interface AdminPanelProps {
  onExitAdmin: () => void;
  onAppsChanged: () => void;
  isLight: boolean;
}

const ACCENT_PRESETS = [
  { label: 'Cyber Cyan', hex: '#00ffd5' },
  { label: 'Neon Magenta', hex: '#ff00c8' },
  { label: 'Volt Yellow', hex: '#fffb00' },
  { label: 'Emerald Matrix', hex: '#10b981' },
  { label: 'Electric Blue', hex: '#3b82f6' },
  { label: 'Solar Orange', hex: '#f97316' },
];

export default function AdminPanel({ onExitAdmin, onAppsChanged, isLight }: AdminPanelProps) {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [apps, setApps] = useState<StoredApkApp[]>([]);
  const [loadingApps, setLoadingApps] = useState<boolean>(false);

  // Form State
  const [editingId, setEditingId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [fullDesc, setFullDesc] = useState<string>('');
  const [tag, setTag] = useState<string>('Android APK');
  const [version, setVersion] = useState<string>('v1.0.0');
  const [apkFileName, setApkFileName] = useState<string>('');
  const [apkSize, setApkSize] = useState<string>('14.2 MB');
  const [apkUrl, setApkUrl] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [url, setUrl] = useState<string>('#');
  const [baseColor, setBaseColor] = useState<string>('#00ffd5');
  const [featuresText, setFeaturesText] = useState<string>(
    '120FPS Hardware Accelerated UI, Ultra-Low RAM Footprint, Signed Release APK'
  );
  const [techText, setTechText] = useState<string>('Android APK, Kotlin / React Native, ARM64');
  const [published, setPublished] = useState<boolean>(true);

  const [selectedApkFile, setSelectedApkFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const loadApps = async () => {
    setLoadingApps(true);
    try {
      const list = await fetchAllAdminApkApps();
      setApps(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingApps(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      loadApps();
    }
  }, [user, authLoading]);

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Google Sign-In failed. You can still publish locally.');
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const resetForm = () => {
    setEditingId('');
    setName('');
    setDesc('');
    setFullDesc('');
    setTag('Android APK');
    setVersion('v1.0.0');
    setApkFileName('');
    setApkSize('14.2 MB');
    setApkUrl('');
    setImage('');
    setUrl('#');
    setBaseColor('#00ffd5');
    setFeaturesText('120FPS Hardware Accelerated UI, Ultra-Low RAM Footprint, Signed Release APK');
    setTechText('Android APK, Kotlin / React Native, ARM64');
    setPublished(true);
    setSelectedApkFile(null);
    setUploadProgress(0);
    setStatusMessage('');
    setErrorMessage('');
  };

  const handleSelectPresetApp = (preset: 'loki' | 'commerce') => {
    resetForm();
    if (preset === 'loki') {
      setEditingId('loki_x_prime_apk');
      setName('Loki X Prime');
      setDesc('Next-gen web & Android APK engineered for zero-latency engagement.');
      setFullDesc(
        'Official Android APK build of Loki X Prime. Engineered deeply with physics-based motion and hardware-accelerated rendering across every smartphone.'
      );
      setTag('Android APK');
      setVersion('v2.4.0');
      setApkFileName('Loki-X-Prime-v2.4.0.apk');
      setApkSize('16.8 MB');
      setImage('https://i.ibb.co/27vjwr6f/Screenshot-20260617-125714-Loki-Prime-X.jpg');
      setUrl('https://loki-x-prime.vercel.app/');
      setBaseColor('#ff00c8');
      setFeaturesText('Hardware Accelerated UI, Intelligent State Routing, Native Android APK');
      setTechText('Android APK, React 18, GPU Compositor');
    } else {
      setEditingId('commerce_prime_apk');
      setName('Commerce Prime');
      setDesc('High-speed algorithmic Android APK built for modern commerce.');
      setFullDesc(
        'Official Android APK package for Commerce Prime. Strips away bloated interfaces, offering pure speed and sub-millisecond visual feedback.'
      );
      setTag('Android APK');
      setVersion('v1.8.5');
      setApkFileName('Commerce-Prime-v1.8.5.apk');
      setApkSize('12.4 MB');
      setImage('https://i.ibb.co/LdwsZdj2/Screenshot-20260617-125701-Chrome.jpg');
      setUrl('https://commerce-prime.vercel.app/');
      setBaseColor('#00ffd5');
      setFeaturesText('Real-time Algorithmic Engine, Dynamic Metric Dashboards, Native APK Build');
      setTechText('Android APK, Next.js Core, Secure Logic');
    }
  };

  const handleEditExisting = (app: StoredApkApp) => {
    setEditingId(app.id);
    setName(app.name);
    setDesc(app.desc);
    setFullDesc(app.fullDesc);
    setTag(app.tag);
    setVersion(app.version);
    setApkFileName(app.apkFileName);
    setApkSize(app.apkSize);
    setApkUrl(app.apkUrl === 'cloud-chunks' || app.apkUrl === 'local-idb' ? '' : app.apkUrl);
    setImage(app.image);
    setUrl(app.url);
    setBaseColor(app.baseColor);
    setFeaturesText(app.features.join(', '));
    setTechText(app.tech.join(', '));
    setPublished(app.published);
    setSelectedApkFile(null);
    setStatusMessage(`Editing "${app.name}"`);
    setErrorMessage('');
  };

  const handleApkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedApkFile(file);
    setApkFileName(file.name.endsWith('.apk') ? file.name : `${file.name}.apk`);
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    setApkSize(`${sizeMB} MB`);
    if (!name) {
      const baseName = file.name.replace(/\.apk$/i, '').replace(/[-_]/g, ' ');
      setName(baseName);
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setStatusMessage('Compressing screenshot for 3D phone display...');
      const dataUrl = await compressImageFile(file);
      setImage(dataUrl);
      setStatusMessage('Screenshot ready!');
    } catch {
      setErrorMessage('Failed to process image file.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setStatusMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter an App Name.');
      return;
    }

    const cleanId =
      editingId ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_|_$/g, '')
        .slice(0, 60) +
        '_' +
        Date.now().toString(36);

    const finalFileName =
      apkFileName.trim() ||
      `${name.trim().replace(/\s+/g, '-')}-${version.trim() || 'v1.0'}.apk`;

    const features = featuresText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 6);
    const tech = techText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 6);

    const existingApp = apps.find((a) => a.id === cleanId);

    const record: StoredApkApp = {
      id: cleanId,
      name: name.trim(),
      desc: desc.trim() || `${name.trim()} official Android APK build.`,
      fullDesc:
        fullDesc.trim() ||
        desc.trim() ||
        `${name.trim()} official Android APK package engineered for ultra-smooth performance across all Android devices.`,
      tag: tag.trim() || 'Android APK',
      version: version.trim() || 'v1.0.0',
      apkFileName: finalFileName.endsWith('.apk') ? finalFileName : `${finalFileName}.apk`,
      apkSize: apkSize.trim() || '14.2 MB',
      apkUrl: apkUrl.trim() || existingApp?.apkUrl || 'cloud-chunks',
      image: image.trim(),
      url: url.trim() || '#',
      baseColor,
      chunkCount: existingApp?.chunkCount || 0,
      features: features.length > 0 ? features : ['Hardware Accelerated Android APK'],
      tech: tech.length > 0 ? tech : ['Android APK', 'ARM64'],
      ownerId: user?.uid || 'local_admin',
      published,
    };

    setIsSubmitting(true);
    try {
      await publishOrUpdateApkApp(record, selectedApkFile, (pct, msg) => {
        setUploadProgress(pct);
        setStatusMessage(msg);
      });
      await loadApps();
      onAppsChanged();
      resetForm();
      setStatusMessage('APK App saved & live on the 3D showcase slider!');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to save APK app.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (app: StoredApkApp) => {
    setErrorMessage('');
    try {
      await removeApkApp(app.id, app.chunkCount);
      await loadApps();
      onAppsChanged();
      setStatusMessage(`Removed "${app.name}"`);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to delete app.');
    }
  };

  const handleTogglePublish = async (app: StoredApkApp) => {
    try {
      await publishOrUpdateApkApp({ ...app, published: !app.published }, null);
      await loadApps();
      onAppsChanged();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to update visibility.');
    }
  };

  const isCloudAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  return (
    <div
      className={`min-h-[100dvh] w-full font-sans pb-20 transition-colors duration-300 ${
        isLight ? 'bg-zinc-100 text-zinc-900' : 'bg-[#040408] text-white'
      }`}
    >
      {/* Top Stealth Admin Bar */}
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 ${
          isLight ? 'bg-white/90 border-black/10' : 'bg-[#07070e]/90 border-white/10'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExitAdmin}
            className={`px-3.5 py-2 rounded-xl border text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors ${
              isLight
                ? 'bg-zinc-100 hover:bg-zinc-200 border-black/10 text-zinc-900'
                : 'bg-white/5 hover:bg-white/10 border-white/15 text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit #admin</span>
          </button>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00ffd5]" />
            <span className="font-display font-bold text-xs sm:text-sm tracking-wider uppercase">
              Stealth APK Admin Console
            </span>
          </div>
        </div>

        {/* Cloud Auth Status */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2.5">
              <span
                className={`text-[11px] font-mono px-3 py-1.5 rounded-lg border ${
                  isCloudAdmin
                    ? 'border-[#00ffd5]/40 bg-[#00ffd5]/10 text-[#00ffd5]'
                    : 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                }`}
              >
                {isCloudAdmin ? `Cloud Admin: ${user.email}` : `Signed in: ${user.email}`}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="p-2 rounded-lg border border-white/15 hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="px-4 py-2 rounded-xl bg-[#00ffd5] text-black font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity cursor-pointer"
            >
              Sign In with Google (Cloud Sync)
            </button>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Add / Upload APK Form */}
        <div className="lg:col-span-7">
          <div
            className={`rounded-3xl border p-5 sm:p-8 ${
              isLight
                ? 'bg-white border-black/10 shadow-lg'
                : 'bg-[#090912] border-white/10 shadow-2xl'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-display font-black uppercase tracking-tight">
                  {editingId ? 'Update APK Release' : 'Publish New APK App'}
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Upload an Android .apk file or attach an APK to any showcase phone tile.
                </p>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-mono text-[#00ffd5] underline cursor-pointer"
                >
                  + New Blank App
                </button>
              )}
            </div>

            {/* Quick Attach to Existing Showcase Apps */}
            <div className="mb-6 p-3.5 rounded-2xl border border-white/10 bg-white/[0.02]">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2.5">
                Quick-Fill Built-In Showcase Apps (Attach APK):
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectPresetApp('loki')}
                  className="px-3 py-1.5 rounded-lg border border-[#ff00c8]/40 bg-[#ff00c8]/10 text-[#ff00c8] text-xs font-mono hover:bg-[#ff00c8]/20 transition-colors cursor-pointer"
                >
                  Attach APK to Loki X Prime
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectPresetApp('commerce')}
                  className="px-3 py-1.5 rounded-lg border border-[#00ffd5]/40 bg-[#00ffd5]/10 text-[#00ffd5] text-xs font-mono hover:bg-[#00ffd5]/20 transition-colors cursor-pointer"
                >
                  Attach APK to Commerce Prime
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. APK File Picker */}
              <div
                className={`p-4 rounded-2xl border-2 border-dashed transition-colors ${
                  selectedApkFile
                    ? 'border-[#00ffd5] bg-[#00ffd5]/5'
                    : isLight
                    ? 'border-black/15 bg-zinc-50'
                    : 'border-white/15 bg-white/[0.02]'
                }`}
              >
                <label className="flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#00ffd5]/15 border border-[#00ffd5]/30 flex items-center justify-center text-[#00ffd5] shrink-0">
                      <FileArchive className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-bold">
                        {selectedApkFile ? selectedApkFile.name : 'Select Android .APK Package File'}
                      </span>
                      <span className="block text-[11px] text-zinc-400">
                        {selectedApkFile
                          ? `Ready to upload (${apkSize})`
                          : 'Tap to browse .apk file from your phone or PC'}
                      </span>
                    </div>
                  </div>
                  <span className="px-4 py-2 rounded-xl bg-[#00ffd5] text-black font-bold text-xs uppercase tracking-wider shrink-0">
                    Choose .APK
                  </span>
                  <input
                    type="file"
                    accept=".apk,application/vnd.android.package-archive"
                    onChange={handleApkFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Or External Direct APK Link */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Or Direct APK Download URL (Optional — for large cloud-hosted APKs)
                </label>
                <input
                  type="text"
                  value={apkUrl}
                  onChange={(e) => setApkUrl(e.target.value)}
                  placeholder="https://example.com/releases/app-release.apk"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none focus:border-[#00ffd5] ${
                    isLight
                      ? 'bg-zinc-50 border-black/10 text-zinc-900'
                      : 'bg-black/50 border-white/10 text-white'
                  }`}
                />
              </div>

              {/* App Name & Version */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    App Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Loki X Prime Mobile"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none focus:border-[#00ffd5] ${
                      isLight
                        ? 'bg-zinc-50 border-black/10 text-zinc-900'
                        : 'bg-black/50 border-white/10 text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    APK Version
                  </label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="v2.4.0"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none focus:border-[#00ffd5] ${
                      isLight
                        ? 'bg-zinc-50 border-black/10 text-zinc-900'
                        : 'bg-black/50 border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>

              {/* APK File Name, Size & Category Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Download Filename (.apk)
                  </label>
                  <input
                    type="text"
                    value={apkFileName}
                    onChange={(e) => setApkFileName(e.target.value)}
                    placeholder="Loki-Prime.apk"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none focus:border-[#00ffd5] ${
                      isLight
                        ? 'bg-zinc-50 border-black/10 text-zinc-900'
                        : 'bg-black/50 border-white/10 text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    File Size Label
                  </label>
                  <input
                    type="text"
                    value={apkSize}
                    onChange={(e) => setApkSize(e.target.value)}
                    placeholder="16.4 MB"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none focus:border-[#00ffd5] ${
                      isLight
                        ? 'bg-zinc-50 border-black/10 text-zinc-900'
                        : 'bg-black/50 border-white/10 text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Android APK"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none focus:border-[#00ffd5] ${
                      isLight
                        ? 'bg-zinc-50 border-black/10 text-zinc-900'
                        : 'bg-black/50 border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>

              {/* Phone Screen Screenshot Upload / URL */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Phone Screen Wallpaper / App Screenshot
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Paste screenshot URL or upload image ->"
                    className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none focus:border-[#00ffd5] ${
                      isLight
                        ? 'bg-zinc-50 border-black/10 text-zinc-900'
                        : 'bg-black/50 border-white/10 text-white'
                    }`}
                  />
                  <label className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shrink-0">
                    <ImageIcon className="w-4 h-4 text-[#00ffd5]" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Short & Full Description */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Short Summary
                </label>
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Fast 1-line summary of the app..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none focus:border-[#00ffd5] ${
                    isLight
                      ? 'bg-zinc-50 border-black/10 text-zinc-900'
                      : 'bg-black/50 border-white/10 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Full App Details (Shown when user taps phone in 3D slider)
                </label>
                <textarea
                  rows={3}
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  placeholder="Complete overview, features, and installation notes..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none focus:border-[#00ffd5] ${
                    isLight
                      ? 'bg-zinc-50 border-black/10 text-zinc-900'
                      : 'bg-black/50 border-white/10 text-white'
                  }`}
                />
              </div>

              {/* Features & Tech Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Key Features (comma separated)
                  </label>
                  <input
                    type="text"
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#00ffd5] ${
                      isLight
                        ? 'bg-zinc-50 border-black/10 text-zinc-900'
                        : 'bg-black/50 border-white/10 text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={techText}
                    onChange={(e) => setTechText(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#00ffd5] ${
                      isLight
                        ? 'bg-zinc-50 border-black/10 text-zinc-900'
                        : 'bg-black/50 border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>

              {/* Glow Accent Color & Visibility */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div>
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Phone Aura Glow Color
                  </span>
                  <div className="flex items-center gap-2">
                    {ACCENT_PRESETS.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setBaseColor(c.hex)}
                        title={c.label}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                          baseColor === c.hex ? 'scale-125 border-white' : 'border-transparent opacity-70'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 accent-[#00ffd5]"
                  />
                  <span className="text-xs font-mono uppercase tracking-wider">
                    Show on Main Website Slider
                  </span>
                </label>
              </div>

              {/* Status & Progress Bar */}
              {isSubmitting && (
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#00ffd5] h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}

              {statusMessage && (
                <div className="p-3 rounded-xl bg-[#00ffd5]/10 border border-[#00ffd5]/30 text-[#00ffd5] text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00ffd5] via-[#00d5ff] to-[#ff00c8] text-black font-display font-black text-xs sm:text-sm uppercase tracking-[0.25em] hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl"
              >
                <Upload className="w-4 h-4" />
                <span>{isSubmitting ? 'Uploading APK...' : editingId ? 'Save APK Changes' : 'Publish APK to Site'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Uploaded APK Releases List */}
        <div className="lg:col-span-5">
          <div
            className={`rounded-3xl border p-5 sm:p-8 ${
              isLight
                ? 'bg-white border-black/10 shadow-lg'
                : 'bg-[#090912] border-white/10 shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-[#00ffd5]" />
                <h3 className="text-base sm:text-lg font-display font-black uppercase tracking-tight">
                  Managed APK Releases ({apps.length})
                </h3>
              </div>
            </div>

            {loadingApps ? (
              <div className="py-12 text-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
                Loading APK repository...
              </div>
            ) : apps.length === 0 ? (
              <div className="py-12 px-4 text-center rounded-2xl border border-dashed border-white/10">
                <FileArchive className="w-8 h-8 text-zinc-500 mx-auto mb-3 opacity-60" />
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  No custom APK packages published yet
                </p>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Use the form on the left to upload an .apk file or attach an APK to Loki X Prime / Commerce Prime.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isLight
                        ? 'bg-zinc-50 border-black/10'
                        : 'bg-black/40 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-10 h-14 rounded-lg overflow-hidden border border-white/15 shrink-0 bg-black flex items-center justify-center"
                          style={{ boxShadow: `0 0 15px ${app.baseColor}33` }}
                        >
                          {app.image ? (
                            <img
                              src={app.image}
                              alt={app.name}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <Smartphone className="w-4 h-4" style={{ color: app.baseColor }} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-display font-bold text-sm truncate">{app.name}</h4>
                            <span
                              className="text-[10px] font-mono px-2 py-0.5 rounded border"
                              style={{
                                color: app.baseColor,
                                borderColor: `${app.baseColor}44`,
                              }}
                            >
                              {app.version}
                            </span>
                          </div>
                          <p className="text-[11px] font-mono text-zinc-400 truncate mt-0.5">
                            {app.apkFileName} · {app.apkSize}
                          </p>
                          <span
                            className={`inline-block mt-1 text-[10px] font-mono uppercase tracking-wider ${
                              app.published ? 'text-emerald-400' : 'text-zinc-500'
                            }`}
                          >
                            {app.published ? '● Live on Main Slider' : '○ Hidden Draft'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => triggerApkDownload(app)}
                          title="Test APK Download"
                          className="p-2 rounded-lg border border-white/10 hover:border-[#00ffd5] text-[#00ffd5] cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(app)}
                          title={app.published ? 'Hide from Main Site' : 'Show on Main Site'}
                          className="p-2 rounded-lg border border-white/10 hover:bg-white/10 text-zinc-300 cursor-pointer"
                        >
                          {app.published ? (
                            <Eye className="w-3.5 h-3.5" />
                          ) : (
                            <EyeOff className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditExisting(app)}
                          title="Edit APK Release"
                          className="p-2 rounded-lg border border-white/10 hover:bg-white/10 text-zinc-300 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(app)}
                          title="Delete APK Release"
                          className="p-2 rounded-lg border border-red-500/20 hover:bg-red-500/20 text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
