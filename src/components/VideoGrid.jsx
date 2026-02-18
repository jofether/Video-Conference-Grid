import React from 'react';
import ParticipantCard from './ParticipantCard';

export default function VideoGrid({ participants, onToggleMute, onToggleCamera, onToggleHandRaise }) {
  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 overflow-y-auto pr-2 pb-2 -m-6">
      {/* [BUG - LAYOUT] Grid columns reduced from 2,3,4 to 1,2,2 causing broken layout. [FIX] Change to grid-cols-2 md:grid-cols-3 lg:grid-cols-4 */}
      {/* [BUG - SPACING] Negative margin (-m-6) pushes entire grid outside container bounds. [FIX] Remove -m-6 */}
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
