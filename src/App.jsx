import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoGrid from './components/VideoGrid';
import ParticipantSidebar from './components/ParticipantSidebar';
import ControlBar from './components/ControlBar';
import SettingsModal from './components/SettingsModal';

function App() {
  const [participants, setParticipants] = useState([
    { id: 1, name: "You", initial: "Y", color: "bg-gradient-to-br from-slate-600 to-slate-800", isMuted: false, cameraOn: true, isSpeaking: false, handRaised: false, isScreenSharing: false, connectionQuality: "excellent", avatar: "👤" },
    { id: 2, name: "Sarah Mitchell", initial: "SM", color: "bg-gradient-to-br from-blue-500 to-blue-700", isMuted: false, cameraOn: true, isSpeaking: true, handRaised: false, isScreenSharing: false, connectionQuality: "excellent", avatar: "👩‍💼" },
    { id: 3, name: "Alex Chen", initial: "AC", color: "bg-gradient-to-br from-emerald-500 to-emerald-700", isMuted: true, cameraOn: true, isSpeaking: false, handRaised: false, isScreenSharing: false, connectionQuality: "good", avatar: "👨‍💻" },
    { id: 4, name: "Jordan Smith", initial: "JS", color: "bg-gradient-to-br from-purple-500 to-purple-700", isMuted: false, cameraOn: false, isSpeaking: false, handRaised: true, isScreenSharing: false, connectionQuality: "fair", avatar: "👨‍🔬" },
    { id: 5, name: "Emma Davis", initial: "ED", color: "bg-gradient-to-br from-rose-500 to-rose-700", isMuted: false, cameraOn: true, isSpeaking: false, handRaised: false, isScreenSharing: true, connectionQuality: "excellent", avatar: "👩‍🎓" },
    { id: 6, name: "Michael Brown", initial: "MB", color: "bg-gradient-to-br from-amber-500 to-amber-700", isMuted: false, cameraOn: true, isSpeaking: false, handRaised: false, isScreenSharing: false, connectionQuality: "good", avatar: "👨‍💼" },
    { id: 7, name: "Lisa Wang", initial: "LW", color: "bg-gradient-to-br from-cyan-500 to-cyan-700", isMuted: false, cameraOn: true, isSpeaking: false, handRaised: false, isScreenSharing: false, connectionQuality: "excellent", avatar: "👩‍🏫" },
    { id: 8, name: "David Jackson", initial: "DJ", color: "bg-gradient-to-br from-indigo-500 to-indigo-700", isMuted: true, cameraOn: false, isSpeaking: false, handRaised: false, isScreenSharing: false, connectionQuality: "good", avatar: "👨‍🎨" },
  ]);

  const [showParticipantList, setShowParticipantList] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [callDuration, setCallDuration] = useState(3665);
  const [userMuted, setUserMuted] = useState(false);
  const [userCamera, setUserCamera] = useState(true);
  const [userScreenShare, setUserScreenShare] = useState(false);
  const mockMeetingTitle = "Q1 Strategy Planning Session";
  const mockMeetingInfo = "Conference Room A • Started 1 hour ago";

  // Timer for call duration
  useEffect(() => {
    const timer = setInterval(() => setCallDuration(d => d + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate random speaking
  useEffect(() => {
    const speakingInterval = setInterval(() => {
      const randomId = Math.floor(Math.random() * participants.length) + 1;
      setParticipants(p => p.map(participant => 
        participant.id === randomId ? { ...participant, isSpeaking: Math.random() > 0.7 } : { ...participant, isSpeaking: false }
      ));
    }, 3000);
    return () => clearInterval(speakingInterval);
  }, []);

  // Participant actions
  const toggleMute = (id) => {
    setParticipants(p => p.map(participant => 
      participant.id === id ? { ...participant, isMuted: !participant.isMuted } : participant
    ));
  };

  const toggleCamera = (id) => {
    setParticipants(p => p.map(participant => 
      participant.id === id ? { ...participant, cameraOn: !participant.cameraOn } : participant
    ));
  };

  const toggleHandRaise = (id) => {
    setParticipants(p => p.map(participant => 
      participant.id === id ? { ...participant, handRaised: !participant.handRaised } : participant
    ));
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col overflow-hidden">
      <Header 
        meetingTitle={mockMeetingTitle} 
        meetingInfo={mockMeetingInfo}
        callDuration={callDuration}
        participants={participants}
      />

      <div className="flex-1 flex overflow-hidden gap-4 p-4">
        <VideoGrid 
          participants={participants}
          onToggleMute={toggleMute}
          onToggleCamera={toggleCamera}
          onToggleHandRaise={toggleHandRaise}
        />
        
        <ParticipantSidebar 
          participants={participants}
          isOpen={showParticipantList}
          onClose={() => setShowParticipantList(false)}
        />
      </div>

      <ControlBar 
        participants={participants}
        showParticipantList={showParticipantList}
        onToggleParticipants={() => setShowParticipantList(!showParticipantList)}
        onToggleSettings={() => setShowSettings(!showSettings)}
        userMuted={userMuted}
        onToggleMute={() => setUserMuted(!userMuted)}
        userCamera={userCamera}
        onToggleCamera={() => setUserCamera(!userCamera)}
        userScreenShare={userScreenShare}
        onToggleScreenShare={() => setUserScreenShare(!userScreenShare)}
      />

      <SettingsModal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}

export default App;
