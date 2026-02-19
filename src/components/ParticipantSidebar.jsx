import React from 'react';

export default function ParticipantSidebar({ participants, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="w-80 bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl border-l border-slate-700/50 rounded-2xl overflow-hidden flex flex-col shadow-2xl fixed right-0 top-0 bottom-0 z-10">
      <div className="p-5 border-b border-slate-700/50 bg-slate-800/50">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Participants</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-1">{participants.length} people in call</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {participants.map(p => (
          <div 
            key={p.id} 
            className={`bg-slate-700/40 rounded-xl p-4 border transition-all duration-200 hover:bg-slate-700/60 cursor-pointer ${
              p.isSpeaking ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/20' : 'border-slate-600/30'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-10 h-10 rounded-full ${p.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                  {p.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{p.name}</p>
                  {p.id === 1 && <p className="text-cyan-400 text-xs">Owner</p>}
                </div>
              </div>
              {p.isSpeaking && (
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs">
              <span className={`px-2.5 py-1 rounded-full font-medium ${
                p.isMuted ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {p.isMuted ? '🔇 Muted' : '🔊 Active'}
              </span>
              {!p.cameraOn && (
                <span className="bg-slate-600/30 text-slate-300 px-2.5 py-1 rounded-full">
                  📹 Off
                </span>
              )}
              {p.isScreenSharing && (
                <span className="bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-full">
                  🖥️ Sharing
                </span>
              )}
              {p.handRaised && (
                <span className="bg-yellow-500/20 text-yellow-300 px-2.5 py-1 rounded-full">
                  ✋ Hand
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
