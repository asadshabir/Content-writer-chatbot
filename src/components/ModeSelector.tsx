"use client";

import { motion } from 'framer-motion';
import { FileEdit, Search, Sparkles, FileText, MessageSquare } from 'lucide-react';
import { ContentMode } from '@/hooks/useChatbot';

interface ModeSelectorProps {
  selectedMode: ContentMode;
  onModeChange: (mode: ContentMode) => void;
}

const modes = [
  {
    id: 'chat' as ContentMode,
    label: 'Chat',
    icon: MessageSquare,
    description: 'General conversation',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'draft' as ContentMode,
    label: 'Draft',
    icon: FileEdit,
    description: 'Create blog drafts',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'seo' as ContentMode,
    label: 'SEO Optimize',
    icon: Search,
    description: 'Optimize for search engines',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'polish' as ContentMode,
    label: 'Polish',
    icon: Sparkles,
    description: 'Refine and enhance',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'summarize' as ContentMode,
    label: 'Summarize',
    icon: FileText,
    description: 'Create summaries',
    color: 'from-indigo-500 to-violet-500',
  },
];

export default function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
      <div className="flex flex-wrap gap-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedMode === mode.id;

          return (
            <motion.button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isSelected
                  ? 'bg-white/15 border-2 border-white/30 shadow-lg'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${mode.color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">{mode.label}</p>
                <p className="text-xs text-white/60">{mode.description}</p>
              </div>
              
              {isSelected && (
                <motion.div
                  layoutId="selectedMode"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-white/5"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
