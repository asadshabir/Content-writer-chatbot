"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { FileEdit, Search, Sparkles, FileText, MessageSquare, Info, Settings, X } from 'lucide-react';
import { ContentMode } from '@/hooks/useChatbot';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import AboutDialog from './AboutDialog';
import SettingsPanel from './SettingsPanel';

interface SidebarProps {
  selectedMode: ContentMode;
  onModeChange: (mode: ContentMode) => void;
  isOpen: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
  onReducedMotionChange: (enabled: boolean) => void;
  soundEnabled: boolean;
  onSoundEnabledChange: (enabled: boolean) => void;
}

const modes = [
{
  id: 'chat' as ContentMode,
  label: 'Chat',
  icon: MessageSquare,
  color: 'from-blue-500 to-cyan-500'
},
{
  id: 'draft' as ContentMode,
  label: 'Draft',
  icon: FileEdit,
  color: 'from-green-500 to-emerald-500'
},
{
  id: 'seo' as ContentMode,
  label: 'SEO Optimize',
  icon: Search,
  color: 'from-orange-500 to-amber-500'
},
{
  id: 'polish' as ContentMode,
  label: 'Polish',
  icon: Sparkles,
  color: 'from-purple-500 to-pink-500'
},
{
  id: 'summarize' as ContentMode,
  label: 'Summarize',
  icon: FileText,
  color: 'from-indigo-500 to-violet-500'
}];


export default function Sidebar({
  selectedMode,
  onModeChange,
  isOpen,
  onToggle,
  reducedMotion,
  onReducedMotionChange,
  soundEnabled,
  onSoundEnabledChange
}: SidebarProps) {
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleModeChange = (mode: ContentMode) => {
    onModeChange(mode);
    if (isMobile) {
      onToggle();
    }
  };

  return (
    <>
      {/* Backdrop for Mobile */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - visible on desktop, slide-in on mobile */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen || !isMobile ? 0 : -300 }}
        className="fixed left-0 top-0 bottom-0 w-72 backdrop-blur-2xl bg-gradient-to-b from-black/40 via-black/30 to-black/40 border-r-2 border-white/20 z-40 shadow-2xl"
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo/Header with Close Button */}
          <div className="mb-6 px-2 relative">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white drop-shadow-lg">SEO Writer</h2>
                <p className="text-xs text-white/70 font-medium">AI Powered</p>
              </div>
            </motion.div>
            
            {/* Close Button */}
            <motion.button
              onClick={onToggle}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -top-1 -right-1 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 flex items-center justify-center transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Mode Buttons */}
          <div className="flex-1 space-y-2 overflow-y-auto pr-1">
            <p className="text-xs font-bold text-white/70 mb-3 px-2 uppercase tracking-wider">Content Modes</p>
            {modes.map((mode, index) => {
              const Icon = mode.icon;
              const isSelected = selectedMode === mode.id;

              return (
                <motion.button
                  key={mode.id}
                  onClick={() => handleModeChange(mode.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  isSelected ?
                  'bg-white/20 border-2 border-white/40 shadow-lg shadow-white/10' :
                  'bg-white/5 border-2 border-white/10 hover:bg-white/10 hover:border-white/20'}`
                  }>

                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${mode.color} flex items-center justify-center shadow-md flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-white drop-shadow-md flex-1 text-left">{mode.label}</span>
                  {isSelected &&
                  <motion.div
                    layoutId="selectedMode"
                    className="w-2.5 h-2.5 bg-white rounded-full shadow-lg flex-shrink-0"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />

                  }
                </motion.button>);

            })}
          </div>

          {/* Bottom Actions */}
          <div className="mt-4 space-y-2 px-1">
            {/* Settings Button */}
            <Button
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center justify-start gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/30 hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-500/50 text-white h-auto">

              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md flex-shrink-0">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold drop-shadow-md flex-1 text-left">Settings</span>
            </Button>

            {/* About Button */}
            <Button
              onClick={() => setShowAbout(true)}
              className="w-full flex items-center justify-start gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-500/50 text-white h-auto">

              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md flex-shrink-0">
                <Info className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold drop-shadow-md flex-1 text-left">About</span>
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* About Dialog */}
      <AboutDialog open={showAbout} onOpenChange={setShowAbout} />
      
      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        reducedMotion={reducedMotion}
        onReducedMotionChange={onReducedMotionChange}
        soundEnabled={soundEnabled}
        onSoundEnabledChange={onSoundEnabledChange} />

    </>);
}