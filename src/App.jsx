import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Flame, Smile, CheckCircle2, Moon, Sun } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [mood, setMood] = useState('Focused');
  const [userName, setUserName] = useState('Raunak Tiwari');
  const [userRashi, setUserRashi] = useState('Aries');

  // Routines state
  const [routines, setRoutines] = useState([
    { id: 1, text: 'Morning Hydration & Sunlight', done: false, time: '07:00 AM' },
    { id: 2, text: 'Deep Work Session (2 Hours)', done: true, time: '10:00 AM' },
    { id: 3, text: 'Physical Workout / Rigorous Movement', done: false, time: '05:00 PM' }
  ]);

  const toggleRoutine = (id) => {
    setRoutines(routines.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const completedCount = routines.filter(r => r.done).length;
  const progressPercent = Math.round((completedCount / routines.length) * 100);

  // Dynamic Mood Insight
  const moodInsights = {
    Energised: "⚡ High Energy Day! Take on your most difficult problem first.",
    Calm: "🌿 Clear Mind. Great time for deep thinking & planning.",
    Low: "🌧️ Go easy on yourself today. Small steps still count.",
    Focused: "🎯 Lock in. Eliminate distractions and build momentum.",
    Stressed: "🔥 Take a 5-minute breather. Reset your focus."
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#c5c6c7] font-sans flex flex-col justify-between max-w-md mx-auto border-x border-[#1f2833]">
      
      {/* Header */}
      <header className="p-5 border-b border-[#1f2833] bg-[#0b0c10]/80 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-wide text-[#66fcf1]">Sutradhar</h1>
          <p className="text-xs text-gray-400">{userName} • <span className="text-[#45a29e]">{userRashi}</span></p>
        </div>
        <div className="bg-[#1f2833] px-3 py-1 rounded-full text-xs text-[#66fcf1] border border-[#45a29e]/30 flex items-center gap-1">
          <Sparkles size={12} /> Live Active
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-5 space-y-6 overflow-y-auto">
        {activeTab === 'today' && (
          <>
            {/* Dynamic Insight Banner */}
            <div className="bg-gradient-to-r from-[#1f2833] to-[#0b0c10] p-4 rounded-xl border border-[#45a29e]/40 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#66fcf1] uppercase tracking-wider mb-1">
                <Zap size={14} /> Today's Vibe Insight
              </div>
              <p className="text-sm font-medium text-white">
                {moodInsights[mood]}
              </p>
            </div>

            {/* Mood Selector */}
            <div className="bg-[#1f2833]/50 p-4 rounded-xl border border-[#1f2833]">
              <h2 className="text-xs text-center text-gray-400 uppercase tracking-widest font-bold mb-3">Aaj Ka Mood</h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Energised', 'Calm', 'Low', 'Focused', 'Stressed'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setMood(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      mood === item 
                        ? 'bg-[#66fcf1] text-[#0b0c10] shadow-[0_0_12px_rgba(102,252,241,0.4)] scale-105' 
                        : 'bg-[#0b0c10] text-gray-300 hover:border-[#45a29e] border border-transparent'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress & Streak Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1f2833]/40 p-4 rounded-xl border border-[#1f2833] text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Routine Progress</p>
                <div className="text-2xl font-extrabold text-[#66fcf1] mt-1">{progressPercent}%</div>
                <div className="w-full bg-[#0b0c10] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-[#66fcf1] h-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-[#1f2833]/40 p-4 rounded-xl border border-[#1f2833] text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Streak</p>
                <div className="text-2xl font-extrabold text-[#66fcf1] mt-1 flex items-center justify-center gap-1">
                  <Flame size={22} className="text-orange-500 fill-orange-500" /> 3 Din
                </div>
                <p className="text-[10px] text-gray-400 mt-2">Personal Best: 7 Din</p>
              </div>
            </div>

            {/* Today's Actionable Routines */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#66fcf1]" /> Key Routines
              </h2>
              {routines.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggleRoutine(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    item.done 
                      ? 'bg-[#1f2833]/20 border-gray-800 text-gray-500 line-through' 
                      : 'bg-[#1f2833]/80 border-[#45a29e]/30 text-white hover:border-[#66fcf1]'
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{item.text}</p>
                    <span className="text-[10px] text-gray-400">{item.time}</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={item.done} 
                    readOnly 
                    className="accent-[#66fcf1] w-4 h-4 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab !== 'today' && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-semibold text-white capitalize">{activeTab} Module</p>
            <p className="text-xs mt-1">Refining Meta-level features for this tab...</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-[#0b0c10] border-t border-[#1f2833] p-3 flex justify-around items-center text-xs">
        {['today', 'wardrobe', 'routine', 'sitaare', 'contacts'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize flex flex-col items-center gap-1 transition-colors ${
              activeTab === tab ? 'text-[#66fcf1] font-bold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

    </div>
  );
}