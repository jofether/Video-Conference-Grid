import React from 'react';

export default function ControlBar({ 
  showParticipantList, 
  onToggleParticipants, 
  onToggleSettings,
  userMuted, 
  onToggleMute,
  userCamera, 
  onToggleCamera,
  userScreenShare, 
  onToggleScreenShare,
  participants
}) {
  return (
    <footer className="h-28 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border-t border-slate-700/50 flex items-center justify-between px-6 shadow-2xl">
      
      {/* Left Controls */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleParticipants}
          className="p-3 rounded-full bg-slate-700/50 hover:bg-slate-600 text-white transition-all duration-200 group relative shadow-lg"
          title="Participants"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {participants.length} participants
          </span>
        </button>

        <button 
          onClick={onToggleSettings}
          className="p-3 rounded-full bg-slate-700/50 hover:bg-slate-600 text-white transition-all duration-200 group relative shadow-lg"
          title="Settings"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </div>

      {/* Center: Main Controls */}
      <div className="flex items-center gap-8">
        
        {/* Mute Toggle */}
        <div className="group relative">
          <button 
            onClick={onToggleMute}
            className={`p-4 rounded-full transition-all duration-200 transform hover:scale-110 font-bold shadow-xl ${
              userMuted 
                ? 'bg-red-600 hover:bg-red-700 shadow-red-600/50 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/50 text-white'
            }`}
            title={userMuted ? "Unmute Microphone" : "Mute Microphone"}
          >
            {userMuted ? '🔇' : '🎤'}
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {userMuted ? 'Unmute' : 'Mute'}
          </span>
        </div>

        {/* Camera Toggle */}
        <div className="group relative">
          <button 
            onClick={onToggleCamera}
            className={`p-4 rounded-full transition-all duration-200 transform hover:scale-110 font-bold shadow-xl ${
              userCamera 
                ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                : 'bg-red-600 hover:bg-red-700 shadow-red-600/50 text-white'
            }`}
            title={userCamera ? "Turn off Camera" : "Turn on Camera"}
          >
            {userCamera ? '📹' : '📹'}
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {userCamera ? 'Camera on' : 'Camera off'}
          </span>
        </div>

        {/* Screen Share */}
        <div className="group relative">
          <button 
            onClick={onToggleScreenShare}
            className={`p-4 rounded-full transition-all duration-200 transform hover:scale-110 font-bold shadow-xl ${
              userScreenShare 
                ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/50 text-white' 
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
            title="Share Screen"
          >
            🖥️
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {userScreenShare ? 'Stop Share' : 'Share'}
          </span>
        </div>

        {/* End Call */}
        <button 
          className="px-6 py-4 rounded-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold shadow-2xl shadow-red-600/50 transition-all duration-200 transform hover:scale-110 hover:shadow-red-600/75 text-lg flex items-center gap-2"
          title="End Call"
        >
          🔴 End
        </button>

      </div>

      {/* Right: Info */}
      <div className="flex items-center gap-4 text-right">
        <div className="bg-slate-800/50 rounded-lg px-4 py-3 border border-slate-700/30">
          <p className="text-xs text-slate-400 mb-1">Connection</p>
          <p className="text-sm font-semibold text-emerald-400">Excellent</p>
        </div>
      </div>
    </footer>
  );
}
