import React, { useState } from 'react';
import { Send, Star, Heart, CheckCircle2 } from 'lucide-react';

interface FeedbackItem {
  id: string;
  rating: number;
  category: string;
  comment: string;
  date: string;
  user: string;
}

interface FeedbackPageProps {
  feedbacks: FeedbackItem[];
  setFeedbacks: React.Dispatch<React.SetStateAction<FeedbackItem[]>>;
}

export default function FeedbackPage({
  feedbacks,
  setFeedbacks,
}: FeedbackPageProps) {
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('Biology Syllabus');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newItem: FeedbackItem = {
      id: `fb-${Date.now()}`,
      rating,
      category,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      user: 'Juan dela Cruz (Student)'
    };

    setFeedbacks([newItem, ...feedbacks]);
    setComment('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fade-in" id="feedback-canvas-wrapper">
      
      {/* Title */}
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-black text-slate-805 tracking-tight flex items-center justify-center gap-1.5">
          Send Your Feedback <Heart className="w-5 h-5 text-rose-500 animate-pulse fill-rose-500" />
        </h2>
        <p className="text-xs text-slate-455 max-w-md mx-auto">
          Help curriculum coordinators polish high-yield premed indexes. Every comment receives strict review.
        </p>
      </div>

      <div className="bg-white border border-slate-100 rounded-[24px] p-5 sm:p-6 shadow-xs space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          
          {/* Rate */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Subject Rating Score</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 cursor-pointer hover:scale-110 transition-all outline-none"
                >
                  <Star className={`w-7 h-7 ${
                    rating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-205'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Feedback Category Area</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            >
              <option value="Biology Syllabus">Biology & Genetics Syllabus</option>
              <option value="Physics Mechanics">Physics Mechanics & Snell's Optics</option>
              <option value="Chemistry Stoichiometrics">Chemistry Formulas & gas laws</option>
              <option value="Mock Simulated Exams">Mock Simulated Exams & timers</option>
              <option value="Aesthetic layout feedback">Aesthetic interface layout presets</option>
              <option value="Socratic AI Tutor">Socratic AI Tutor Mode replies</option>
            </select>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Describe your experience</label>
            <textarea
              required
              rows={4}
              placeholder="State any notes error offsets, physical bugs, or syllabus recommendations..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none focus:bg-white focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Submit Feedback Logs</span>
          </button>
        </form>

        {submitted && (
          <div className="p-3 bg-emerald-50 border border-emerald-250 text-emerald-800 text-[11px] rounded-xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
            <span>Feedback recorded! Your comments have been queued directly inside the Master Admin Inbox. Thanks for polishing Medly!</span>
          </div>
        )}
      </div>

    </div>
  );
}
