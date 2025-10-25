"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Square, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentMode } from '@/hooks/useChatbot';
import { toast } from 'sonner';

interface ChatInputProps {
  onSendMessage: (message: string, fileContent?: string) => void;
  disabled?: boolean;
  onStop?: () => void;
  isGenerating?: boolean;
  currentMode: ContentMode;
}

export default function ChatInput({ onSendMessage, disabled = false, onStop, isGenerating = false, currentMode }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; content: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Check file type (text files only)
    const allowedTypes = ['text/plain', 'text/markdown', 'application/pdf'];
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.md') && !file.name.endsWith('.txt')) {
      toast.error('Please upload .txt, .md, or .pdf files only');
      return;
    }

    try {
      const content = await file.text();
      setUploadedFile({ name: file.name, content });
      toast.success(`File "${file.name}" uploaded successfully!`);
    } catch (error) {
      toast.error('Failed to read file');
      console.error('File reading error:', error);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    toast.info('File removed');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), uploadedFile?.content);
      setMessage('');
      setUploadedFile(null);
    }
  };

  const getPlaceholder = () => {
    const placeholders = {
      chat: 'Ask me anything...',
      draft: 'Enter your blog topic (e.g., "AI in Marketing")...',
      seo: 'Paste your content to optimize for SEO...',
      polish: 'Paste your content to polish and refine...',
      summarize: 'Paste text to summarize...',
    };
    return placeholders[currentMode];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative w-full"
    >
      {/* File Upload Indicator */}
      {uploadedFile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 backdrop-blur-xl bg-gradient-to-r from-white/15 to-white/10 border-2 border-white/30 rounded-2xl px-3 py-2 flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-white/90 font-medium truncate">{uploadedFile.name}</span>
          </div>
          <Button
            onClick={handleRemoveFile}
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-red-500/20 flex-shrink-0"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </Button>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative backdrop-blur-2xl bg-gradient-to-r from-black/40 via-black/30 to-black/40 border-2 border-white/30 rounded-full shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 animate-pulse" />
          
          <div className="relative flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2">
            {/* File Upload Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.pdf,text/plain,text/markdown,application/pdf"
                onChange={handleFileUpload}
                className="hidden"
                disabled={disabled}
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 bg-white/10 hover:bg-white/20 border-2 border-white/30 disabled:opacity-40 shadow-lg"
                title="Upload File"
              >
                <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </Button>
            </motion.div>

            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={getPlaceholder()}
              disabled={disabled}
              className="flex-1 bg-transparent px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder:text-white/50 focus:outline-none font-medium"
            />

            {/* Stop/Send Button */}
            {isGenerating ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  onClick={onStop}
                  className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/50 border-2 border-red-400/50"
                >
                  <Square className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-white" />
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  disabled={!message.trim() || disabled}
                  className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-500/50 border-2 border-blue-400/50"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
}