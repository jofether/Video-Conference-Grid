import React, { useState } from 'react';

function App() {
  const [participants, setParticipants] = useState([
    { id: 1, name: "You", initial: "Y", color: "bg-gray-800", isMuted: false, cameraOn: true, isSpeaking: false, handRaised: false, isScreenSharing: false, connectionQuality: "excellent" },
    { id: 2, name: "Sarah Connor", initial: "SC", color: "bg-blue-800", isMuted: false, cameraOn: true, isSpeaking: true, handRaised: false, isScreenSharing: false, connectionQuality: "excellent" },
    { id: 3, name: "Kyle Reese", initial: "KR", color: "bg-green-800", isMuted: true, cameraOn: true, isSpeaking: false, handRaised: false, isScreenSharing: false, connectionQuality: "good" },
    { id: 4, name: "John Doe", initial: "JD", color: "bg-purple-800", isMuted: false, cameraOn: false, isSpeaking: false, handRaised: true, isScreenSharing: false, connectionQuality: "fair" },
    { id: 5, name: "T-800", initial: "T", color: "bg-red-900", isMuted: false, cameraOn: true, isSpeaking: false, handRaised: false, isScreenSharing: true, connectionQuality: "excellent" },
    { id: 6, name: "Dr. Silberman", initial: "DS", color: "bg-yellow-800", isMuted: false, cameraOn: true, isSpeaking: false, handRaised: false, isScreenSharing: false, connectionQuality: "poor" },
  ]);

  const [showParticipantList, setShowParticipantList] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [userMuted, setUserMuted] = useState(false);
  const [userCamera, setUserCamera] = useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => setCallDuration(d => d + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMute = (id) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, isMuted: !p.isMuted } : p
    ));
  };

  const toggleCamera = (id) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, cameraOn: !p.cameraOn } : p
    ));
  };

  const toggleHandRaise = (id) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, handRaised: !p.handRaised } : p
    ));
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getConnectionQualityColor = (quality) => {
    switch(quality) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getConnectionQualityIcon = (quality) => {
    switch(quality) {
      case 'excellent': return '▓▓▓';
      case 'good': return '▓▓░';
      case 'fair': return '▓░░';
      case 'poor': return '░░░';
      default: return '░░░';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col p-4 gap-4">
      
      {/* HEADER: Call info and title */}
      <header className="bg-gray-800/50 backdrop-blur-md rounded-xl px-6 py-3 flex justify-between items-center border border-gray-700/50 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold text-white">Video Conference</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-sm text-gray-300">
            Duration: <span className="font-mono font-bold text-green-400">{formatDuration(callDuration)}</span>
          </div>
          <div className="text-sm text-gray-300">
            Participants: <span className="font-bold text-blue-400">{participants.length}</span>
          </div>
        </div>
      </header>

      {/* VIDEO GRID: Responsive columns */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pr-1">

        {participants.map((p) => (
          <div 
            key={p.id} 
            className={`relative rounded-2xl overflow-hidden bg-black border-2 group transition-all duration-300 cursor-pointer transform hover:scale-105 ${
              p.isSpeaking ? 'border-green-500 shadow-lg shadow-green-500/50' : 'border-gray-700 hover:border-gray-600'
            }`}
            onDoubleClick={() => toggleMute(p.id)}
          >
            
            {/* Fake Video Feed (Placeholder) */}
            <div className={`absolute inset-0 flex items-center justify-center ${p.color}`}>
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="text-6xl text-white opacity-20 font-bold">{p.initial}</span>
                {!p.cameraOn && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-16 h-16 text-gray-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Overlay Controls (appears on hover) */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3 gap-2">
              <button 
                onClick={() => toggleMute(p.id)}
                className={`p-2 rounded-full transition-all duration-200 ${p.isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                title={p.isMuted ? "Unmute" : "Mute"}
              >
                {p.isMuted ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 5a1 1 0 011 1v.622l5.309-5.309A1 1 0 0121 2v20a1 1 0 01-1.691.708l-5.309-5.309V18a1 1 0 11-2 0v-3.622l-5.309 5.309A1 1 0 012 20V2a1 1 0 011.691-.708l5.309 5.309V6a1 1 0 011-1z"/></svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/></svg>
                )}
              </button>
              <button 
                onClick={() => toggleCamera(p.id)}
                className={`p-2 rounded-full transition-all duration-200 ${p.cameraOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
                title={p.cameraOn ? "Turn off camera" : "Turn on camera"}
              >
                {p.cameraOn ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6.707 6.707a1 1 0 010 1.414L5.121 9.707a2 2 0 000 2.828l10.586 10.586a1 1 0 01-1.414 1.414L3.707 13.949a2 2 0 010-2.828l1.586-1.586a1 1 0 011.414 0zm10.586 0a1 1 0 011.414 0l1.586 1.586a2 2 0 010 2.828l-10.586 10.586a1 1 0 01-1.414-1.414L19.879 9.707a2 2 0 000-2.828l-1.586-1.586a1 1 0 010-1.414z"/></svg>
                )}
              </button>
              <button 
                onClick={() => toggleHandRaise(p.id)}
                className={`p-2 rounded-full transition-all duration-200 ${p.handRaised ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                title={p.handRaised ? "Lower hand" : "Raise hand"}
              >
                <span className="text-lg">✋</span>
              </button>
            </div>

            {/* Name Label (Bottom Left) */}
            <div className="absolute bottom-3 left-3 z-10">
              <div className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-xs font-semibold">
                {p.name}
              </div>
            </div>

            {/* Status Badges (Top Left) */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {/* Connection Quality */}
              <div className={`${getConnectionQualityColor(p.connectionQuality)} text-white px-2 py-1 rounded text-xs font-bold`} title={p.connectionQuality}>
                {getConnectionQualityIcon(p.connectionQuality)}
              </div>
              
              {/* Hand Raised Badge */}
              {p.handRaised && (
                <div className="bg-yellow-500 text-gray-900 px-2 py-1 rounded-full text-xs font-bold animate-bounce">
                  ✋
                </div>
              )}

              {/* Screen Share Badge */}
              {p.isScreenSharing && (
                <div className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                  <span>🖥️</span>
                </div>
              )}
            </div>

            {/* Mute Indicator (Top Right) */}
            <div className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-200 ${
              p.isMuted ? 'bg-red-600/90 animate-pulse' : 'bg-green-600/90'
            }`}>
              {p.isMuted ? (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 5a1 1 0 011 1v.622l5.309-5.309A1 1 0 0121 2v20a1 1 0 01-1.691.708l-5.309-5.309V18a1 1 0 11-2 0v-3.622l-5.309 5.309A1 1 0 012 20V2a1 1 0 011.691-.708l5.309 5.309V6a1 1 0 011-1z"/></svg>
              ) : (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/></svg>
              )}
            </div>

            {/* Speaking Indicator (Border) */}
            {p.isSpeaking && (
              <div className="absolute inset-0 border-4 border-green-500 rounded-2xl pointer-events-none animate-pulse"></div>
            )}
          </div>
        ))}

      </div>

      {/* BOTTOM CONTROL BAR */}
      <footer className="h-24 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-md rounded-2xl flex items-center justify-between px-8 shadow-2xl border border-gray-600/30 shrink-0">
        
        {/* Left: Participant List Button */}
        <button 
          onClick={() => setShowParticipantList(!showParticipantList)}
          className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 group relative"
          title="Participants"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {participants.length} in call
          </span>
        </button>

        {/* Center: Main Controls */}
        <div className="flex items-center gap-6">
          
          {/* Mute Toggle */}
          <button 
            onClick={() => setUserMuted(!userMuted)}
            className={`p-4 rounded-full transition-all duration-200 transform hover:scale-110 ${
              userMuted 
                ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/50' 
                : 'bg-gray-700 hover:bg-gray-600'
            } text-white`}
            title={userMuted ? "Unmute Microphone" : "Mute Microphone"}
          >
            {userMuted ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13 5a1 1 0 011 1v.622l5.309-5.309A1 1 0 0121 2v20a1 1 0 01-1.691.708l-5.309-5.309V18a1 1 0 11-2 0v-3.622l-5.309 5.309A1 1 0 012 20V2a1 1 0 011.691-.708l5.309 5.309V6a1 1 0 011-1z"/></svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/></svg>
            )}
          </button>

          {/* Camera Toggle */}
          <button 
            onClick={() => setUserCamera(!userCamera)}
            className={`p-4 rounded-full transition-all duration-200 transform hover:scale-110 ${
              userCamera 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/50'
            } text-white`}
            title={userCamera ? "Turn off Camera" : "Turn on Camera"}
          >
            {userCamera ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6.707 6.707a1 1 0 010 1.414L5.121 9.707a2 2 0 000 2.828l10.586 10.586a1 1 0 01-1.414 1.414L3.707 13.949a2 2 0 010-2.828l1.586-1.586a1 1 0 011.414 0zm10.586 0a1 1 0 011.414 0l1.586 1.586a2 2 0 010 2.828l-10.586 10.586a1 1 0 01-1.414-1.414L19.879 9.707a2 2 0 000-2.828l-1.586-1.586a1 1 0 010-1.414z"/></svg>
            )}
          </button>

          {/* Screen Share */}
          <button 
            className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 transform hover:scale-110"
            title="Share Screen"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm3 7a1 1 0 011-1h8a1 1 0 011 1v3H7v-3z"/></svg>
          </button>

          {/* End Call - PROMINENT */}
          <button 
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200 transform hover:scale-110 shadow-lg shadow-red-600/50 px-8 font-bold text-lg"
            title="End Call"
          >
            📞
          </button>

        </div>

        {/* Right: Settings & More */}
        <button 
          className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 group relative"
          title="More Options"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </button>
      </footer>

      {/* Participant List Sidebar */}
      {showParticipantList && (
        <div className="fixed right-0 top-0 bottom-0 w-80 bg-gray-800/95 backdrop-blur-md border-l border-gray-700 shadow-2xl overflow-y-auto z-50">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Participants ({participants.length})</h2>
              <button 
                onClick={() => setShowParticipantList(false)}
                className="text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2">
              {participants.map(p => (
                <div key={p.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50 hover:border-gray-500 transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-8 h-8 rounded-full ${p.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {p.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{p.name}</p>
                        {p.id === 1 && <p className="text-gray-400 text-xs">(You)</p>}
                      </div>
                    </div>
                    {p.isSpeaking && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs">
                    <span className={p.isMuted ? 'text-red-400' : 'text-green-400'}>
                      {p.isMuted ? '🔇 Muted' : '🔊 Active'}
                    </span>
                    {!p.cameraOn && <span className="text-gray-400">📹 Off</span>}
                    {p.isScreenSharing && <span className="text-purple-400">🖥️ Share</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
