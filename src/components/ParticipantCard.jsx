import React from 'react';
import { getConnectionQualityColor, getConnectionQualityIcon } from '../utils/helpers';

export default function ParticipantCard({ participant, onToggleMute, onToggleCamera, onToggleHandRaise }) {
  const { isMuted, cameraOn, isSpeaking, handRaised, isScreenSharing, connectionQuality, name, avatar } = participant;

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden bg-black border-2 group transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        isSpeaking 
          ? 'border-emerald-400 shadow-2xl shadow-emerald-500/40' 
          : 'border-slate-700 hover:border-slate-600 shadow-lg'
      }`}
      onDoubleClick={onToggleMute}
    >
      
      {/* VIDEO BACKGROUND */}
      <div className={`absolute inset-0 ${participant.color} flex items-center justify-center`}>
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <span className="text-6xl">{avatar}</span>
          {!cameraOn && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
              <svg className="w-16 h-16 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              <p className="text-xs text-slate-400">Camera Off</p>
            </div>
          )}
        </div>
      </div>

      {/* HOVER OVERLAY */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-end p-3 gap-2">
        <button 
          onClick={onToggleMute}
          className={`flex-1 p-2 rounded-full transition-all duration-200 text-white font-semibold text-sm ${
            isMuted 
              ? 'bg-red-600/90 hover:bg-red-700 shadow-lg shadow-red-600/50' 
              : 'bg-emerald-600/90 hover:bg-emerald-700 shadow-lg shadow-emerald-600/50'
          }`}
        >
          {isMuted ? '🔇 Muted' : '🔊 Active'}
        </button>
        <button 
          onClick={onToggleCamera}
          className={`p-2 rounded-full transition-all duration-200 text-white ${
            cameraOn 
              ? 'bg-slate-700 hover:bg-slate-600' 
              : 'bg-red-600/90 hover:bg-red-700'
          }`}
          title={cameraOn ? "Turn off camera" : "Turn on camera"}
        >
          {cameraOn ? '📹' : '📹‍'}
        </button>
        <button 
          onClick={onToggleHandRaise}
          className={`p-2 rounded-full transition-all duration-200 ${
            handRaised 
              ? 'bg-yellow-500/90 hover:bg-yellow-600 shadow-lg shadow-yellow-500/50' 
              : 'bg-slate-700 hover:bg-slate-600'
          }`}
        >
          ✋
        </button>
      </div>

      {/* NAME LABEL */}
      <div className="absolute bottom-3 left-3 z-10">
        <div className="bg-black/70 backdrop-blur-md px-3 py-2 rounded-lg text-slate-700 text-xs font-semibold border border-slate-600/30">
          {name}
          {participant.id === 1 && <span className="text-cyan-400 ml-1">(You)</span>}
        </div>
      </div>

      {/* STATUS BADGES - Top Left */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        <div className={`${getConnectionQualityColor(connectionQuality)} text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg`} title={connectionQuality}>
          {getConnectionQualityIcon(connectionQuality)}
        </div>
        
        {handRaised && (
          <div className="bg-yellow-500 text-slate-900 px-2.5 py-1 rounded-full text-xs font-bold animate-bounce shadow-lg shadow-yellow-500/50">
            ✋
          </div>
        )}

        {isScreenSharing && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-lg">
            🖥️
          </div>
        )}
      </div>

      {/* MUTE INDICATOR - Top Right */}
      <div className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-200 ${
        isMuted 
          ? 'bg-red-600/90 animate-pulse shadow-red-600/50' 
          : 'bg-emerald-600/90 shadow-emerald-600/50'
      }`}>
        {isMuted ? '🔇' : '🔊'}
      </div>

      {/* SPEAKING INDICATOR */}
      {isSpeaking && (
        <div className="absolute inset-0 border-4 border-emerald-400 rounded-2xl pointer-events-none animate-pulse shadow-lg shadow-emerald-500/50"></div>
      )}
    </div>
  );
}
