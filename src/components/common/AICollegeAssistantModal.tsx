import React, { useState } from 'react';
import { Bot, Send, Sparkles, X, User, CornerDownLeft } from 'lucide-react';
import { askCampusAssistant } from '../../services/aiService';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AICollegeAssistantModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Namaste! Welcome to SCSCO College Digital Helpdesk. I can assist you with Admissions, Fees Structure, Courses, Eligibility, Placement Statistics, and Campus Life. What would you like to know?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    'What is the B.Tech admission eligibility and cutoff?',
    'What are the annual fees for Computer & AI branches?',
    'Which companies visit for campus placements?',
    'How do I generate my digital hall ticket?',
  ];

  const handleSend = async (questionText?: string) => {
    const q = questionText || input;
    if (!q.trim() || loading) return;

    const userMsg: Message = {
      sender: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await askCampusAssistant(q);
      const aiMsg: Message = {
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'I apologize, but I could not retrieve information at this moment. Please email info@scsco.edu.in for direct assistance.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white border border-slate-200 rounded-xl shadow-2xl w-full max-w-xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">SCSCO Campus AI Advisor</h3>
                <span className="flex items-center gap-1 text-[10px] font-medium bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-300">Intelligent Admissions & Academic Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center shrink-0 text-xs font-semibold shadow-xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-lg p-3 whitespace-pre-line leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`block text-[10px] mt-1.5 ${
                    m.sender === 'user' ? 'text-blue-100 text-right' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </span>
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-semibold">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5 items-center text-slate-500 text-xs">
              <div className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px] text-slate-400">Synthesizing institutional knowledge...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-2.5 bg-slate-100/70 border-t border-slate-200 flex gap-1.5 overflow-x-auto shrink-0">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] whitespace-nowrap bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 px-2.5 py-1 rounded-md transition-colors shrink-0 shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about admissions, fees, syllabus, placements, or exams..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-3.5 py-2 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
