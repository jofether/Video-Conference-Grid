import React from 'react';

export default function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Settings</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-3xl leading-none"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
            <label className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Microphone</span>
              <span className="text-sm text-slate-400">Default Device</span>
            </label>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
            <label className="flex items-center justify-between">
              <span className="text-white font-medium">Camera</span>
              <span className="text-sm text-slate-400">HD Ready</span>
            </label>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
            <label className="flex items-center justify-between">
              <span className="text-white font-medium">Speaker</span>
              <span className="text-sm text-slate-400">Built-in</span>
            </label>
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
