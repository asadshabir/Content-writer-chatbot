"use client";

import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  index: number;
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const isAI = message.sender === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`flex gap-2 sm:gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      {isAI && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.05 + 0.1, type: 'spring', stiffness: 200 }}
          className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50"
        >
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </motion.div>
      )}

      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`relative max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 backdrop-blur-xl shadow-lg ${
          isAI
            ? 'bg-gradient-to-br from-white/15 via-white/10 to-white/5 border-2 border-white/30 text-white'
            : 'bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 text-white border-2 border-blue-400/50 shadow-blue-500/30'
        }`}
      >
        {isAI ? (
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-xl sm:text-2xl font-bold mb-3 text-white drop-shadow-lg">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg sm:text-xl font-bold mb-2 mt-3 sm:mt-4 text-white drop-shadow-md">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base sm:text-lg font-semibold mb-2 mt-2 sm:mt-3 text-white drop-shadow-md">{children}</h3>,
                p: ({ children }) => <p className="text-xs sm:text-sm leading-relaxed mb-2 text-white/95 font-medium">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1 text-white/95">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1 text-white/95">{children}</ol>,
                li: ({ children }) => <li className="text-xs sm:text-sm text-white/95 font-medium">{children}</li>,
                strong: ({ children }) => <strong className="font-bold text-white drop-shadow-sm">{children}</strong>,
                em: ({ children }) => <em className="italic text-white/95">{children}</em>,
                code: ({ children }) => <code className="bg-black/30 px-2 py-0.5 rounded text-xs font-mono border border-white/20">{children}</code>,
                hr: () => <hr className="my-3 border-white/30" />,
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-xs sm:text-sm leading-relaxed font-medium">{message.text}</p>
        )}
        <span className="text-[10px] sm:text-xs opacity-70 mt-1.5 sm:mt-2 block font-medium">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </motion.div>

      {!isAI && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.05 + 0.1, type: 'spring', stiffness: 200 }}
          className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50"
        >
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
}