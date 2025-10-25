"use client";

import { useState } from 'react';
import { useChatbot, ContentMode } from '@/hooks/useChatbot';
import ChatInterface from '@/components/ChatInterface';
import ChatInput from '@/components/ChatInput';
import Sidebar from '@/components/Sidebar';
import { toast } from 'sonner';

export default function Home() {
  const { messages, isTyping, isSpeaking, currentMode, sendMessage, stopGeneration, clearMessages } = useChatbot();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedMode, setSelectedMode] = useState<ContentMode>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSendMessage = (text: string, fileContent?: string) => {
    sendMessage(text, soundEnabled, selectedMode, fileContent);
  };

  const handleCopyContent = () => {
    const aiMessages = messages.filter(m => m.sender === 'ai').map(m => m.text).join('\n\n');
    if (aiMessages) {
      navigator.clipboard.writeText(aiMessages);
      toast.success('Content copied to clipboard!');
    } else {
      toast.error('No content to copy');
    }
  };

  const handleDownloadMarkdown = () => {
    const aiMessages = messages.filter(m => m.sender === 'ai').map(m => m.text).join('\n\n');
    if (aiMessages) {
      const blob = new Blob([aiMessages], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `content-${Date.now()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Content downloaded!');
    } else {
      toast.error('No content to download');
    }
  };

  const handleClearChat = () => {
    clearMessages();
    toast.success('Chat cleared!');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated CSS Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-purple-900/30 backdrop-blur-3xl" />
        {!reducedMotion && (
          <>
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </>
        )}
      </div>

      {/* Sidebar */}
      <Sidebar
        selectedMode={selectedMode}
        onModeChange={setSelectedMode}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        reducedMotion={reducedMotion}
        onReducedMotionChange={setReducedMotion}
        soundEnabled={soundEnabled}
        onSoundEnabledChange={setSoundEnabled}
      />

      {/* Main Content - Full screen view */}
      <div className="relative lg:ml-72 h-screen flex flex-col">
        {/* Main Chat Interface - Full screen with minimal padding */}
        <div className="relative z-10 flex-1 flex flex-col p-2 sm:p-3 gap-2 sm:gap-3 overflow-hidden">
          <div className="flex-1 min-h-0">
            <ChatInterface 
              messages={messages} 
              isTyping={isTyping} 
              currentMode={currentMode}
              onCopy={handleCopyContent}
              onDownload={handleDownloadMarkdown}
              onClear={handleClearChat}
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              sidebarOpen={sidebarOpen}
            />
          </div>
          <div className="flex-shrink-0">
            <ChatInput 
              onSendMessage={handleSendMessage} 
              disabled={isTyping || isSpeaking}
              onStop={stopGeneration}
              isGenerating={isTyping || isSpeaking}
              currentMode={selectedMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}