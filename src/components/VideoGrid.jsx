import React from 'react';
import ParticipantCard from './ParticipantCard';

export default function VideoGrid({ participants, onToggleMute, onToggleCamera, onToggleHandRaise }) {
  return (
    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto pr-2 pb-2">
      {participants.map((p) => (
        <ParticipantCard
          key={p.id}
          participant={p}
          onToggleMute={() => onToggleMute(p.id)}
          onToggleCamera={() => onToggleCamera(p.id)}
          onToggleHandRaise={() => onToggleHandRaise(p.id)}
        />
      ))}
    </div>
  );
}
