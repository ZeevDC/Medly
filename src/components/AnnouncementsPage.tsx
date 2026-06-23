import React from 'react';
import { Bell, Award, Clipboard } from 'lucide-react';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Exam Alert' | 'Filing Extension' | 'General';
}

interface AnnouncementsPageProps {
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
}

export default function AnnouncementsPage({
  announcements,
}: AnnouncementsPageProps) {
  return (
    <div className="space-y-6 animate-fade-in" id="announcements-bulletin-wrapper">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-850 tracking-tight flex items-center gap-1.5">
          <Bell className="text-sky-550 w-6 h-6" /> Announcements Bulletin
        </h2>
        <p className="text-xs text-slate-455 mt-1">
          Stay informed with active filings, registration moves, and syllabus releases.
        </p>
      </div>

      {announcements.length === 0 ? (
        <div className="p-12 text-center bg-white border border-dashed border-slate-200 rounded-[24px] max-w-lg mx-auto space-y-3">
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mx-auto">
            <Clipboard className="w-6 h-6" />
          </div>
          <h4 className="font-extrabold text-slate-805 text-sm">No Active Board Announcements</h4>
          <p className="text-xs text-slate-405 leading-relaxed">
            All bulletins are completely clear!
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {announcements.map((ann) => (
            <div key={ann.id} className="p-5 bg-white border border-slate-105 rounded-[24px] shadow-xs hover:shadow-sm transition-all space-y-3">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div className="space-y-1">
                  <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                    ann.category === 'Exam Alert' ? 'bg-rose-50 text-rose-700 border border-rose-150' : 'bg-sky-50 text-sky-700 border border-sky-150'
                  }`}>
                    {ann.category}
                  </span>
                  <h3 className="font-exrabold font-black text-sm text-slate-800 leading-snug">{ann.title}</h3>
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-bold">{ann.date}</span>
              </div>
              
              <p className="text-xs text-slate-650 leading-relaxed font-medium">
                {ann.content}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
