import React, { useState } from 'react';
import { Send, Sparkles, MessageSquare, ShieldCheck, HelpCircle, Loader2, Key, ExternalLink } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  senderRole?: 'student' | 'mentor' | 'bot';
  content: string;
  timestamp: string;
  avatarColor: string;
}

interface AITutorModeProps {
  isOffline: boolean;
  focusedTopic?: {
    id: string;
    subject: 'Biology' | 'Chemistry' | 'Physics' | 'Social Science';
    category: string;
    topic: string;
    description: string;
    priority: 'High' | 'Medium' | 'Extreme';
  } | null;
  onClearFocusedTopic?: () => void;
}

export default function AITutorMode({ isOffline, focusedTopic, onClearFocusedTopic }: AITutorModeProps) {
  const [activeTutor, setActiveTutor] = useState('Socrates-Med 🎓');
  const [chatIn, setChatIn] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  const [userApiKey, setUserApiKey] = useState(() => {
    try {
      return localStorage.getItem('medly_developer_api_key') || '';
    } catch {
      return '';
    }
  });
  const [tempApiKey, setTempApiKey] = useState(userApiKey);

  const saveApiKey = (key: string) => {
    setUserApiKey(key);
    try {
      localStorage.setItem('medly_developer_api_key', key);
    } catch (e) {
      console.error('Failed to save API key to localStorage', e);
    }
  };

  const handleSaveKey = () => {
    saveApiKey(tempApiKey);
    alert('Gemini API Key saved successfully!');
  };

  const curators = [
    { name: 'Socrates-Med 🎓', tagline: 'Leading Logic & Socratic pre-med guiding', av: '🦉' }
  ];

  const [tutorSessions, setTutorSessions] = useState<Record<string, ChatMessage[]>>({
    'Socrates-Med 🎓': [
      {
        id: '1',
        sender: 'Socrates-Med',
        senderRole: 'bot',
        content: 'Greeting, peer! I am Socrates-Med, your pre-med advisor. Ask me any question, and I will guide you to deduce the answer on your own! Where would you like to start?',
        timestamp: 'Just now',
        avatarColor: 'bg-indigo-650'
      }
    ]
  });

  const activeHistory = tutorSessions[activeTutor] || [];

  // Automatically activate the best tutor and inject a special personalized greeting for the focused topic
  React.useEffect(() => {
    if (focusedTopic) {
      const draftTutor = 'Socrates-Med 🎓';
      setActiveTutor(draftTutor);

      const topicGreetId = `topic-greet-${focusedTopic.id}`;
      // Check if we already have this topic greeting in the session to avoid duplicate greetings on simple re-renders
      const sessionHistory = tutorSessions[draftTutor] || [];
      const hasGreeting = sessionHistory.some(m => m.id === topicGreetId);

      if (!hasGreeting) {
        const greetingTopicMsg: ChatMessage = {
          id: topicGreetId,
          sender: 'Socrates-Med',
          senderRole: 'bot',
          content: `Colleague, I am glad you want to master "${focusedTopic.topic}" (${focusedTopic.subject} • ${focusedTopic.category}). This is rated as a ${focusedTopic.priority}-yield CEM board concept!

💡 Topic Concept: ${focusedTopic.description}

How can I guide you to master this concept? Below are quick study actions we can take, or you can type your own specific question!`,
          timestamp: 'Just now',
          avatarColor: 'bg-indigo-650'
        };

        setTutorSessions(prev => ({
          ...prev,
          [draftTutor]: [
            ...sessionHistory.filter(m => !m.id.startsWith('topic-greet-')), // Keep only current topic greeting
            greetingTopicMsg
          ]
        }));
      }
    }
  }, [focusedTopic]);

  const handleSend = async (e?: React.FormEvent, customContent?: string) => {
    if (e) e.preventDefault();
    const finalContent = customContent || chatIn.trim();
    if (!finalContent || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'Juan Patiently Studying',
      senderRole: 'student',
      content: finalContent,
      timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
      avatarColor: 'bg-slate-700'
    };

    setTutorSessions(prev => ({
      ...prev,
      [activeTutor]: [...(prev[activeTutor] || []), userMsg]
    }));

    if (!customContent) {
      setChatIn('');
    }
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/gemini/socratic', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-gemini-api-key': userApiKey 
        },
        body: JSON.stringify({
          message: userMsg.content,
          context: { 
            tutor: activeTutor,
            focusedTopic: focusedTopic ? {
              topic: focusedTopic.topic,
              subject: focusedTopic.subject,
              category: focusedTopic.category,
              description: focusedTopic.description,
              priority: focusedTopic.priority
            } : undefined
          },
          isOffline: isOffline
        })
      });

      const data = await response.json();
      
      const botReplyMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: activeTutor.split(' ')[0],
        senderRole: 'bot',
        content: data.reply || 'Keep exploring this concept! Tell me, what is the primary formula that binds these variables together?',
        timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
        avatarColor: curators.find(c => c.name === activeTutor)?.av === '🦉' ? 'bg-indigo-650' : curators.find(c => c.name === activeTutor)?.av === '🔬' ? 'bg-[#059669]' : 'bg-purple-650'
      };

      setTutorSessions(prev => ({
        ...prev,
        [activeTutor]: [...(prev[activeTutor] || []), botReplyMsg]
      }));

    } catch (err) {
      console.warn("AI Tutor fetch failed:", err);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" id="ai-tutor-view-wrapper">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Mentor Selection & API Key Configuration (Col span 4) */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-[24px] p-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">CHOOSE COGNITIVE COMPANION</span>
            
            <div className="space-y-3">
              {curators.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setActiveTutor(c.name);
                  }}
                  className={`w-full p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                    activeTutor === c.name
                      ? 'border-indigo-500 bg-indigo-50/40 text-slate-900 font-extrabold shadow-xs'
                      : 'border-slate-150 bg-slate-50 hover:bg-slate-100/50 text-slate-600'
                  }`}
                >
                  <span className="text-2xl p-2 rounded-xl bg-white shadow-xs">{c.av}</span>
                  <div>
                    <h4 className="text-xs font-black">{c.name}</h4>
                    <p className="text-[10px] text-slate-450 mt-1 font-medium leading-tight">{c.tagline}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* User API Key setup block */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/65 text-xs space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Key className="w-4 h-4 text-indigo-550" />
              <span>Connect Gemini API Key</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Paste your Gemini API key (AI Studio)"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  className="flex-1 text-xs p-2 bg-white border border-slate-250 rounded-xl outline-none focus:ring-1 focus:ring-indigo-500 font-mono shadow-inner"
                />
                <button
                  type="button"
                  onClick={handleSaveKey}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl transition-all cursor-pointer text-[10px] shrink-0"
                >
                  Save Key
                </button>
              </div>
              
              <div className="text-[10px] text-slate-500 leading-relaxed space-y-1">
                <p className="font-semibold text-slate-600">Get your free key in 3 easy steps:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Go to <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold inline-flex items-center gap-0.5">Google AI Studio <ExternalLink className="w-2.5 h-2.5" /></a></li>
                  <li>Click <span className="font-bold">"Get API Key"</span> and tap <span className="font-bold">"Create API Key"</span>.</li>
                  <li>Paste your key here. No billing or credit card required!</li>
                </ol>
              </div>

              {userApiKey && (
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 p-1.5 rounded-lg border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Custom Gemini Key Active</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-[10px] text-indigo-900 leading-relaxed font-semibold mt-6">
            ✨ <strong>Socratic Learning tip:</strong> Formulating an answer in your own words creates thicker myelination pathways around study memory structures.
          </div>
        </div>

        {/* Chat Interface (Col span 8) */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[24px] p-5 flex flex-col justify-between h-[540px]">
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-xs font-black text-slate-800">Chatting with {activeTutor}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-[9px] uppercase font-black text-slate-450 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>Gemini Agent Active</span>
            </div>
          </div>

          {focusedTopic && (
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 mb-3 flex items-start justify-between gap-3 text-xs">
              <div className="space-y-1">
                <p className="font-extrabold text-slate-800 flex flex-wrap items-center gap-1.5">
                  <span className="text-[9px] uppercase font-black bg-indigo-200 text-indigo-800 px-1.5 py-0.5 rounded shrink-0">Active Study Focus:</span> 
                  <span className="text-xs text-indigo-950 font-black">{focusedTopic.topic}</span>
                </p>
                <p className="text-[10.5px] text-slate-500 font-semibold leading-relaxed">{focusedTopic.description}</p>
              </div>
              <button 
                type="button"
                onClick={onClearFocusedTopic}
                className="text-slate-400 hover:text-red-500 font-extrabold p-1 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors shrink-0"
                title="Clear topic context and resume general discussion"
              >
                ✕
              </button>
            </div>
          )}

          {/* Messages Flow */}
          <div className="flex-grow overflow-y-auto space-y-3 pr-1 scrollbar-thin">
            {activeHistory.map((m) => {
              const isUser = m.senderRole === 'student';
              return (
                <div key={m.id} className={`flex gap-2 w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {!isUser && (
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-md flex-shrink-0">
                      {curators.find(c => c.name === activeTutor)?.av}
                    </span>
                  )}
                  
                  <div className={`p-3 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 font-bold text-white rounded-tr-none'
                      : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none font-semibold'
                  }`}>
                    <p>{m.content}</p>
                    <span className={`text-[8.5px] block mt-1 text-right truncate ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isChatLoading && (
              <div className="flex gap-2 items-center text-slate-450 text-[10px] italic">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                <span>Mentor is reviewing your deductions...</span>
              </div>
            )}
          </div>

          {/* Quick study triggers as chips */}
          {focusedTopic && (
            <div className="pt-2 flex flex-wrap gap-1.5 items-center">
              <span className="text-[9.5px] uppercase font-black text-slate-400 mr-1 shrink-0">Fast Study Actions:</span>
              <button
                type="button"
                disabled={isChatLoading}
                onClick={() => handleSend(undefined, `Could you give me a clear Socratic explanation and breakdown of the core concepts for "${focusedTopic.topic}"?`)}
                className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 hover:text-sky-850 border border-sky-150 rounded-lg text-[10px] font-black cursor-pointer transition-all flex items-center gap-1 disabled:opacity-40"
              >
                💡 Explain Concept
              </button>
              <button
                type="button"
                disabled={isChatLoading}
                onClick={() => handleSend(undefined, `Test my recall capability! Please challenge me with a high-yield Board-style practice question on "${focusedTopic.topic}" and guide me to the correct answer.`)}
                className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 hover:text-amber-850 border border-amber-150 rounded-lg text-[10px] font-black cursor-pointer transition-all flex items-center gap-1 disabled:opacity-40"
              >
                🔬 Practice Question
              </button>
              <button
                type="button"
                disabled={isChatLoading}
                onClick={() => handleSend(undefined, `What are some useful medical mnemonics, hooks, or memory structures that will make "${focusedTopic.topic}" easy to recall under high-stress board tests?`)}
                className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-850 border border-purple-150 rounded-lg text-[10px] font-black cursor-pointer transition-all flex items-center gap-1 disabled:opacity-40"
              >
                🧠 Mnemonic Hook
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={(e) => handleSend(e)} className="flex gap-2 pt-3 border-t mt-3">
            <input
              type="text"
              required
              disabled={isChatLoading}
              value={chatIn}
              onChange={(e) => setChatIn(e.target.value)}
              placeholder="Ask a leading question (e.g. explain genetics crossing over factors)"
              className="bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs border border-slate-200 rounded-xl p-3 flex-grow outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={isChatLoading || !chatIn.trim()}
              className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer flex items-center justify-center transition-all disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
