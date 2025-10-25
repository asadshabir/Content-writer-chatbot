"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Sparkles, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useState, useEffect } from 'react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  reducedMotion: boolean;
  onReducedMotionChange: (enabled: boolean) => void;
  soundEnabled: boolean;
  onSoundEnabledChange: (enabled: boolean) => void;
}

export default function SettingsPanel({
  isOpen,
  onClose,
  reducedMotion,
  onReducedMotionChange,
  soundEnabled,
  onSoundEnabledChange,
}: SettingsPanelProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const preferredTheme = savedTheme || 'dark';
    setTheme(preferredTheme);
    applyTheme(preferredTheme);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] sm:w-96 max-h-[90vh] backdrop-blur-2xl bg-gradient-to-br from-black/60 via-black/50 to-black/60 border-2 border-white/30 rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b-2 border-white/20 bg-white/5">
              <h3 className="text-lg font-bold text-white drop-shadow-lg">Settings</h3>
              <Button
                onClick={onClose}
                className="rounded-full w-9 h-9 p-0 bg-white/10 hover:bg-white/20 border border-white/20"
              >
                <X className="w-4 h-4 text-white" />
              </Button>
            </div>

            {/* Settings Options */}
            <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    {theme === 'light' ? (
                      <Sun className="w-6 h-6 text-white" />
                    ) : (
                      <Moon className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white drop-shadow-md">Theme Mode</p>
                    <p className="text-xs text-white/70 truncate font-medium">
                      {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                  className="flex-shrink-0"
                />
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white drop-shadow-md">Reduce Motion</p>
                    <p className="text-xs text-white/70 truncate font-medium">Disable animations</p>
                  </div>
                </div>
                <Switch
                  checked={reducedMotion}
                  onCheckedChange={onReducedMotionChange}
                  className="flex-shrink-0"
                />
              </div>

              {/* Sound Effects */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    {soundEnabled ? (
                      <Volume2 className="w-6 h-6 text-white" />
                    ) : (
                      <VolumeX className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white drop-shadow-md">Sound Effects</p>
                    <p className="text-xs text-white/70 truncate font-medium">Message notifications</p>
                  </div>
                </div>
                <Switch
                  checked={soundEnabled}
                  onCheckedChange={onSoundEnabledChange}
                  className="flex-shrink-0"
                />
              </div>

              {/* Info */}
              <div className="pt-4 border-t-2 border-white/10">
                <p className="text-xs text-white/50 text-center font-medium">
                  SEO Content Writer AI v1.0
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}