import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Plus, Tag, User, Clock, ChevronRight, ArrowLeft, Send, Sparkles } from 'lucide-react';

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  upvotes: number;
}

export interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  category: 'Physics' | 'Chemistry' | 'Biology' | 'Admissions' | 'General Study';
  timestamp: string;
  upvotes: number;
  comments: Comment[];
  isUserUpvoted?: boolean;
}

export default function CommunityDiscussionBoard() {
  const [threads, setThreads] = useState<Thread[]>(() => {
    try {
      const stored = localStorage.getItem('medly_discussion_threads');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }

    return [];
  });

  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  
  // Create thread states
  const [isCreatingThread, setIsCreatingThread] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Physics' | 'Chemistry' | 'Biology' | 'Admissions' | 'General Study'>('General Study');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('Juan Patiently Studying');

  // Comment state
  const [commentText, setCommentText] = useState('');

  // Persist threads on updates
  useEffect(() => {
    try {
      localStorage.setItem('medly_discussion_threads', JSON.stringify(threads));
    } catch (e) {
      console.error(e);
    }
  }, [threads]);

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newThread: Thread = {
      id: `thread-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      content: newContent.trim(),
      author: newAuthor.trim() || 'Anonymous Premed',
      avatar: '🩺',
      timestamp: 'Just now',
      upvotes: 1,
      comments: []
    };

    setThreads([newThread, ...threads]);
    
    // reset form
    setNewTitle('');
    setNewContent('');
    setIsCreatingThread(false);
    setActiveThreadId(newThread.id); // open detail straightaway!
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !activeThreadId) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: 'Juan Patiently Studying',
      avatar: '🩺',
      content: commentText.trim(),
      timestamp: 'Just now',
      upvotes: 1
    };

    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          comments: [...t.comments, newComment]
        };
      }
      return t;
    }));

    setCommentText('');
  };

  const handleUpvoteThread = (threadId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        const alreadyUpvoted = t.isUserUpvoted;
        return {
          ...t,
          upvotes: alreadyUpvoted ? t.upvotes - 1 : t.upvotes + 1,
          isUserUpvoted: !alreadyUpvoted
        };
      }
      return t;
    }));
  };

  const activeThread = threads.find(t => t.id === activeThreadId);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Physics': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Chemistry': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Biology': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Admissions': return 'bg-sky-100 text-sky-700 border-sky-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in" id="medly-community-discussion-view">
      
      {/* Back button or Sub-header toggles */}
      {activeThreadId ? (
        <button
          onClick={() => setActiveThreadId(null)}
          className="inline-flex items-center space-x-1.5 text-xs font-black text-slate-500 hover:text-slate-800 transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-slate-150"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Threads Board</span>
        </button>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-850 tracking-tight flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-indigo-500" />
              <span>Medly Community Hub</span>
            </h1>
            <p className="text-xs text-slate-400">Join discussions with fellow premeds studying for the Philippine medical board admission rounds.</p>
          </div>

          <button
            onClick={() => setIsCreatingThread(!isCreatingThread)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{isCreatingThread ? 'Close Form' : 'Start Discussion'}</span>
          </button>
        </div>
      )}

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Thread details view */}
        {activeThreadId && activeThread ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-6 shadow-sm">
            {/* Topic header */}
            <div className="space-y-3 pb-4 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-black border ${getCategoryColor(activeThread.category)}`}>
                  {activeThread.category}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activeThread.timestamp}
                </span>
              </div>
              
              <h2 className="text-base sm:text-lg font-black text-slate-850 leading-snug">{activeThread.title}</h2>
              
              <div className="flex items-center space-x-2 text-xs text-slate-650">
                <span className="p-1 px-1.5 bg-indigo-50 rounded-lg text-lg leading-none">{activeThread.avatar}</span>
                <div>
                  <p className="font-bold text-slate-805 leading-none">{activeThread.author}</p>
                  <span className="text-[9px] text-slate-400 font-medium">NMAT Aspirant</span>
                </div>
              </div>
            </div>

            {/* Content text */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              {activeThread.content}
            </p>

            {/* Actions row */}
            <div className="flex items-center space-x-4 text-xs font-bold text-slate-500">
              <button 
                onClick={(e) => handleUpvoteThread(activeThread.id, e)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeThread.isUserUpvoted 
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Upvoted ({activeThread.upvotes})</span>
              </button>
              
              <span className="text-slate-400">{activeThread.comments.length} comments</span>
            </div>

            {/* Comments List */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-black text-slate-800 text-xs sm:text-sm">Comments & Advices ({activeThread.comments.length})</h3>
              
              <div className="space-y-3">
                {activeThread.comments.map(c => (
                  <div key={c.id} className="p-3 bg-slate-50 border border-slate-100/80 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[10px]">
                      <div className="flex items-center space-x-2 font-bold text-slate-750">
                        <span className="p-0.5 bg-white rounded shadow-xs">{c.avatar}</span>
                        <span>{c.author}</span>
                      </div>
                      <span className="text-slate-405">{c.timestamp}</span>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed font-medium pl-1">{c.content}</p>
                  </div>
                ))}

                {activeThread.comments.length === 0 && (
                  <p className="text-xs text-slate-450 italic py-4 text-center">No comments on this topic yet. Be the first to share an answer or tip!</p>
                )}
              </div>
            </div>

            {/* Add Comment input form */}
            <form onSubmit={handleAddComment} className="flex gap-2 pt-4 border-t border-slate-100">
              <input
                type="text"
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your input or supportive advice..."
                className="bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs border border-slate-200 rounded-xl p-3 flex-grow outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center cursor-pointer transition-all disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Create discussion block */}
            {isCreatingThread && (
              <form onSubmit={handleCreateThread} className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-xs animate-fade-in text-xs">
                <div className="flex gap-2 items-center text-xs font-black text-slate-850 mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-550" />
                  <span>Post a New Study Topic or Query</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-8">
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Board/Topic Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Physics equations sheet or Chemistry mole guide?"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  
                  <div className="md:col-span-4">
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Category Tag</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none scrollbar-thin"
                    >
                      <option value="Physics">Physics ⚡</option>
                      <option value="Chemistry">Chemistry 🧪</option>
                      <option value="Biology">Biology 🫁</option>
                      <option value="Admissions">Medical School Admissions 🎓</option>
                      <option value="General Study">General Study Strategy 📚</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Your Alias/Name</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Description / Content Body</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about your query or share your study resources with other premed peers..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white font-extrabold rounded-xl cursor-pointer transition-all"
                >
                  Publish and Open Thread
                </button>
              </form>
            )}

            {/* List of active threads */}
            <div className="space-y-3">
              {threads.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  className="bg-white border border-slate-100 rounded-2xl p-4 hover:border-indigo-400 transition-all shadow-xs cursor-pointer flex justify-between items-center text-xs group"
                >
                  <div className="space-y-2 max-w-[85%]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-black border ${getCategoryColor(t.category)}`}>
                        {t.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        By {t.author} • {t.timestamp}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm group-hover:text-indigo-655 leading-snug">
                      {t.title}
                    </h3>

                    <p className="text-slate-500 text-[11px] truncate leading-tight">
                      {t.content}
                    </p>
                  </div>

                  <div className="flex flex-col items-end space-y-2 flex-shrink-0 text-[10.5px]">
                    <button
                      onClick={(e) => handleUpvoteThread(t.id, e)}
                      className={`font-semibold flex items-center space-x-1 px-2.5 py-1 rounded-lg border transition-colors ${
                        t.isUserUpvoted 
                          ? 'bg-rose-50 border-rose-100 text-rose-600'
                          : 'bg-slate-50 border-slate-150 hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{t.upvotes}</span>
                    </button>
                    
                    <span className="text-slate-400 font-black">
                      {t.comments.length} replies
                    </span>
                  </div>
                </div>
              ))}

              {threads.length === 0 && (
                <div className="py-12 bg-white text-center rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-400">The discussion board is quiet right now. Be the first to break the ice and start a thread!</p>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
