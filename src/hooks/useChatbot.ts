"use client";

import { useState, useCallback, useRef } from 'react';
import { Message } from '@/components/ChatMessage';
import { toast } from 'sonner';

export type ContentMode = 'draft' | 'seo' | 'polish' | 'summarize' | 'chat';

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMode, setCurrentMode] = useState<ContentMode>('chat');
  const messageIdCounter = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const playSound = useCallback((soundEnabled: boolean) => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log('Audio not supported');
    }
  }, []);

  const sendMessage = useCallback(async (text: string, soundEnabled: boolean = true, mode: ContentMode = 'chat', fileContent?: string) => {
    // Add user message
    const userMessage: Message = {
      id: `msg-${messageIdCounter.current++}`,
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    playSound(soundEnabled);
    setCurrentMode(mode);

    // Start typing animation
    setIsTyping(true);

    try {
      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: text, mode, context: fileContent }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate content');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let aiText = '';
      const aiMessageId = `msg-${messageIdCounter.current++}`;

      // Create initial AI message
      const aiMessage: Message = {
        id: aiMessageId,
        text: '',
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      setIsSpeaking(true);

      // Stream the response
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            try {
              const json = JSON.parse(data);
              if (json.content) {
                aiText += json.content;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === aiMessageId
                      ? { ...msg, text: aiText }
                      : msg
                  )
                );
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      playSound(soundEnabled);
      setIsSpeaking(false);
      
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
        toast.info('Generation stopped');
      } else {
        console.error('Error generating content:', error);
        
        const errorMessage: Message = {
          id: `msg-${messageIdCounter.current++}`,
          text: error.message || '❌ Sorry, I encountered an error generating content. Please try again.',
          sender: 'ai',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, errorMessage]);
        toast.error('Failed to generate content');
      }
      
      setIsTyping(false);
      setIsSpeaking(false);
    }
  }, [playSound]);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsTyping(false);
    setIsSpeaking(false);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isTyping,
    isSpeaking,
    currentMode,
    sendMessage,
    stopGeneration,
    clearMessages,
  };
}