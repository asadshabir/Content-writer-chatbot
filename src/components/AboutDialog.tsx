"use client";

import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Github, Linkedin, Facebook, Globe, Mail } from 'lucide-react';

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] backdrop-blur-2xl bg-white/10 border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            👨‍💻 Asad Shabir – Certified AI Engineer
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <img
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Asad-1761416179516.png?width=8000&height=8000&resize=contain"
                  alt="Asad Shabir - AI Engineer"
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-white/30 backdrop-blur-xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <p className="text-white/90 leading-relaxed">
                Hi, I'm <strong className="text-cyan-400">Asad Shabir</strong>, a <strong>Certified and Specialized AI Engineer</strong> with 3+ years of experience in developing <strong className="text-purple-400">AI-powered content pipelines</strong>.
              </p>
              <p className="text-white/90 leading-relaxed mt-2">
                This project showcases how I design <strong>AI Blog Writing & SEO Optimization Systems</strong> that handle the full journey from <strong className="text-green-400">idea to publish-ready content</strong>.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                🌟 Skills & Expertise
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {['🤖 OpenAI Agents SDK', '🔗 Chainlit', '🗄️ SQLite Memory', '🐍 Python', '🔄 N8N Automation', '⚡ AI & Automation Tools'].map((skill, index) => (
                  <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs">
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Connect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                🌐 Connect with Me
              </h3>
              <div className="space-y-2">
                <a href="https://portfolio-asadshbair.netlify.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg px-4 py-3 hover:bg-white/10 transition-all group">
                  <Globe className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-sm">Portfolio</p>
                    <p className="text-xs text-white/60">portfolio-asadshbair.netlify.app</p>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/asad-shabir-programmer110/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg px-4 py-3 hover:bg-white/10 transition-all group">
                  <Linkedin className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-sm">LinkedIn</p>
                    <p className="text-xs text-white/60">Asad Shabir</p>
                  </div>
                </a>
                <a href="https://www.facebook.com/Asadalibhatti110" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg px-4 py-3 hover:bg-white/10 transition-all group">
                  <Facebook className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-sm">Facebook</p>
                    <p className="text-xs text-white/60">Asad Ali Bhatti</p>
                  </div>
                </a>
                <a href="https://github.com/asadshabir" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg px-4 py-3 hover:bg-white/10 transition-all group">
                  <Github className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-sm">GitHub</p>
                    <p className="text-xs text-white/60">asadshabir</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                📌 About This App
              </h3>
              <p className="text-white/80 text-sm mb-3">
                This <strong className="text-green-400">Blog Automation AI App</strong> is <strong>fully developed by me</strong> 💯.
                It helps users <strong>research, draft, polish, and SEO-optimize blog content automatically</strong> using multiple specialized AI agents.
              </p>
              <div className="space-y-2">
                {[
                  '📝 Drafting Agent – Generates structured blog drafts',
                  '✨ Polish Agent – Improves clarity and readability',
                  '📈 SEO Agent – Optimizes for search engines',
                  '📄 Summarization Agent – Creates concise summaries',
                  '🔍 Web Search Tool – Real-time info with DuckDuckGo',
                  '🤖 Main Agent – Friendly AI assistant'
                ].map((feature, index) => (
                  <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs">
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                🛠 Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {['OpenAI Agents SDK', 'Chainlit', 'Python', 'DuckDuckGo API', 'SQLite Memory', 'PyMuPDF'].map((tech, index) => (
                  <span key={index} className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                ⚡ How It Works
              </h3>
              <div className="space-y-2">
                {[
                  'User enters blog topic → Drafting Agent creates a draft',
                  'Draft is polished → Polishing Agent enhances grammar & flow',
                  'Content is SEO optimized → SEO Agent applies keywords',
                  'Final blog delivered → Ready to publish',
                  'Optional: Summarize PDFs to integrate content'
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm text-white/80 pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hire Me */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4"
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                🤝 Hire Me
              </h3>
              <p className="text-sm text-white/90 mb-2">
                💡 Do you want to build a custom AI assistant, chatbot, or automation system like this?
              </p>
              <p className="text-sm font-semibold text-cyan-400">
                👉 Contact me for your next project!
              </p>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center py-4"
            >
              <p className="text-lg font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                🌟 "From Idea to SEO-Ready Blog – Powered by AI, Built by Me." 🌟
              </p>
            </motion.div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}