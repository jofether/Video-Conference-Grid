import React from 'react';
import { formatDuration } from '../utils/helpers';

export default function Header({ meetingTitle, meetingInfo, callDuration, participants }) {
  const speakingCount = participants.filter(p => p.isSpeaking).length;
  const handRaisedCount = participants.filter(p => p.handRaised).length;

  return (
    <header className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-2xl border-b border-slate-700/50 px-6 py-4 flex justify-between items-center shadow-2xl z-5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/50">
            🎥
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{meetingTitle}</h1>
            <p className="text-xs text-slate-400">{meetingInfo}</p>
          </div>
        </div>
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-4"></div>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-center">
            <div className="text-2xl font-mono font-bold text-cyan-40 bg-slate-800/50 px-4 py-2 rounded-lg border border-cyan-500/30">
            {formatDuration(callDuration)}
          </div>
          <p className="text-xs text-slate-400 mt-1 -mb-6">Duration</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400">{participants.length}</div>
            <p className="text-xs text-slate-400">Total</p>
          </div>
          <div className="w-px bg-slate-700/50"></div>
          <div className="text-center">
            <div className="text-xl font-bold text-emerald-400">{speakingCount}</div>
            <p className="text-xs text-slate-400">Speaking</p>
          </div>
          <div className="w-px bg-slate-700/50"></div>
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-400">{handRaisedCount}</div>
            <p className="text-xs text-slate-400">Hands Up</p>
          </div>
        </div>
      </div>
    </header>
  );
}
