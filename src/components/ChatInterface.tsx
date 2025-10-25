"use client";

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage, { Message } from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { ContentMode } from '@/hooks/useChatbot';
import { Bot, Download, Copy, Trash2, Sparkles, Wand2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInterfaceProps {
  messages: Message[];
  isTyping: boolean;
  currentMode: ContentMode;
  onCopy: () => void;
  onDownload: () => void;
  onClear: () => void;
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export default function ChatInterface({ messages, isTyping, currentMode, onCopy, onDownload, onClear, onToggleSidebar, sidebarOpen }: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getModeColor = (mode: ContentMode) => {
    const colors = {
      chat: 'from-blue-500 to-cyan-500',
      draft: 'from-green-500 to-emerald-500',
      seo: 'from-orange-500 to-amber-500',
      polish: 'from-purple-500 to-pink-500',
      summarize: 'from-indigo-500 to-violet-500'
    };
    return colors[mode];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full backdrop-blur-2xl bg-gradient-to-br from-black/40 via-black/30 to-black/40 border-2 border-white/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">

      {/* Enhanced Glassmorphic overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      {/* Fixed/Sticky Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="sticky top-0 z-20 px-3 sm:px-5 py-3 sm:py-4 border-b-2 border-white/30 backdrop-blur-xl bg-gradient-to-r from-black/50 via-black/40 to-black/50">

        {/* Main and Small Headers with Sidebar Toggle */}
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Left Side: Sidebar Toggle + Headers */}
          <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
            {/* Sidebar Toggle Button - Only visible on mobile/tablet */}
            {onToggleSidebar && (
              <motion.button
                onClick={onToggleSidebar}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden flex-shrink-0 mt-0.5 backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/30 rounded-lg p-2 shadow-lg hover:shadow-xl hover:border-white/50 transition-all w-9 h-9"
                title="Toggle Sidebar">
                <div className="flex flex-col items-center justify-center gap-1 w-full h-full">
                  <motion.div
                    animate={{
                      rotate: sidebarOpen ? 45 : 0,
                      y: sidebarOpen ? 5 : 0
                    }}
                    className="w-4 h-0.5 bg-white rounded-full" />
                  <motion.div
                    animate={{
                      opacity: sidebarOpen ? 0 : 1,
                      scaleX: sidebarOpen ? 0 : 1
                    }}
                    className="w-4 h-0.5 bg-white rounded-full" />
                  <motion.div
                    animate={{
                      rotate: sidebarOpen ? -45 : 0,
                      y: sidebarOpen ? -5 : 0
                    }}
                    className="w-4 h-0.5 bg-white rounded-full" />
                </div>
              </motion.button>
            )}

            {/* Headers */}
            <div className="flex-1 min-w-0">
              {/* Main Header */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 flex items-center gap-2">
                <motion.span
                  animate={{
                    rotate: isTyping ? [0, 360] : 0
                  }}
                  transition={{
                    duration: 3,
                    repeat: isTyping ? Infinity : 0,
                    ease: "linear"
                  }}
                  className="inline-block">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </motion.span>
                SEO Content Generator
              </h1>
              
              {/* Small Header */}
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Create high-quality, search-engine-optimized content instantly.
              </p>
            </div>
          </div>

          {/* Premium Bot Icon with Writing Showcase */}
          <motion.div
            animate={{
              scale: isTyping ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: isTyping ? Infinity : 0,
              ease: "easeInOut"
            }}
            className="flex-shrink-0 relative">
            
            {/* Bot Icon Container */}
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${getModeColor(currentMode)} flex items-center justify-center shadow-2xl relative overflow-hidden ${isTyping ? 'shadow-cyan-500/60' : 'shadow-blue-500/40'}`}>
              {/* Animated Background Glow */}
              <motion.div
                animate={{
                  opacity: isTyping ? [0.3, 0.6, 0.3] : 0.3,
                  scale: isTyping ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-white/20 rounded-2xl blur-xl" />
              
              {/* Bot Icon */}
              <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10 drop-shadow-lg" />
              
              {/* Writing Indicator - Shows when typing */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50 border-2 border-white/50">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                      <Wand2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Writing Status Label */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] sm:text-xs font-medium text-cyan-300 bg-black/40 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Writing...
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex gap-1.5 sm:gap-2 justify-end">
          <Button
            onClick={onCopy}
            disabled={messages.length === 0}
            className="rounded-full backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/30 h-8 w-8 sm:h-9 sm:w-9 p-0 shadow-lg disabled:opacity-30 transition-all duration-300"
            size="icon"
            title="Copy Content">
            <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </Button>
          <Button
            onClick={onDownload}
            disabled={messages.length === 0}
            className="rounded-full backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/30 h-8 w-8 sm:h-9 sm:w-9 p-0 shadow-lg disabled:opacity-30 transition-all duration-300"
            size="icon"
            title="Download as Markdown">
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </Button>
          <Button
            onClick={onClear}
            disabled={messages.length === 0}
            className="rounded-full backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/30 h-8 w-8 sm:h-9 sm:w-9 p-0 shadow-lg disabled:opacity-30 transition-all duration-300"
            size="icon"
            title="Clear Chat">
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </Button>
        </div>
      </motion.div>

      {/* Messages Area - Now scrollable independently */}
      <div
        ref={scrollRef}
        className="absolute top-[120px] sm:top-[130px] bottom-0 left-0 right-0 overflow-y-auto overflow-x-hidden"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.05)'
        }}>

        <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full min-h-[300px] sm:min-h-[400px] text-center px-4">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 sm:mb-6 shadow-2xl shadow-blue-500/50">
                <Bot className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
              </motion.div>
              <p className="text-white/90 text-sm sm:text-base max-w-md leading-relaxed font-medium drop-shadow-md">
                Select a mode from the sidebar and start creating amazing content. I support English, Roman Sindhi, and Roman Urdu.
              </p>
              <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 justify-center">
                {['Draft', 'SEO', 'Polish', 'Summarize'].map((mode, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/15 border-2 border-white/30 text-xs sm:text-sm font-bold text-white backdrop-blur-xl shadow-lg">
                    {mode}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage key={message.id} message={message} index={index} />
              ))}
              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>
              {/* Invisible element for scrolling to bottom */}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}