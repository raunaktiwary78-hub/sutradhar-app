import React, { useState } from 'react';
import { Sparkles, Zap, Flame, CheckCircle2, Shirt, Sun, Moon, Phone, MessageSquare, Compass, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [mood, setMood] = useState('Focused');
  const [userName, setUserName] = useState('Raunak Tiwari');
  const [userRashi, setUserRashi] = useState('Aries');

  // Routines State
  const [routines, setRoutines] = useState([
    { id: 1, text: 'Morning Hydration & Sunlight', category: 'Morning', done: true, time: '07:00 AM' },
    { id: 2, text: 'Deep Work / High-Impact Task', category: 'Morning', done: false, time: '09:00 AM' },
    { id: 3, text: 'Physical Workout & Movement', category: 'Evening', done: false, time: '05:00 PM' },
    { id: 4, text: 'Night Journaling & Reflection', category: 'Night', done: false, time: '10:00 PM' }
  ]);

  const toggleRoutine = (id) => {
    setRoutines(routines.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const completedCount = routines.filter(r => r.done).length;
  const progressPercent = Math.round((completedCount / routines.length) * 100);

  // Dynamic Mood Insight
  const moodInsights = {
    Energised: "⚡ High Energy Day! Take on your hardest problem first.",
    Calm: "🌿 Clear Mind. Great time for deep strategy & planning.",
    Low: "🌧️ Take it easy today. Focus on light tasks.",
    Focused: "🎯 Pure Focus Mode. Lock in and remove distractions.",
    Stressed: "🔥 Take a 5-minute break. Reset your mind."
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#c5c6c7] font-sans flex flex-col justify-between max-w-md mx-auto border-x border-[#1f2833] shadow-2xl">
      
      {/* Dynamic Header */}
      <header className="p-4 border-b border-[#1f2833] bg-[#0b0c10]/90 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-[#66fcf1]">Sutradhar</h1>
          <p className="text-xs text-gray-400">{userName} • <span className="text-[#45a29e] font-semibold">{userRashi}</span></p>
        </div>
        <div className="bg-[#1f2833] px-3 py-1 rounded-full text-xs text-[#66fcf1] border border-[#45a29e]/30 flex items-center gap-1">
          <Sparkles size={12} /> Active App
        </div>
      </header>

      {/* Main Screen Content */}
      <main className="flex-1 p-4 space-y-5 overflow-y-auto">
        
        {/* 1. TODAY TAB */}
        {activeTab === 'today' && (
          <>
            <div className="bg-gradient-to-r from-[#1f2833] to-[#0b0c10] p-4 rounded-xl border border-[#45a29e]/40 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#66fcf1] uppercase tracking-wider mb-1">
                <Zap size={14} /> Today's Insight
              </div>
              <p className="text-sm font-medium text-white">{moodInsights[mood]}</p>
            </div>

            <div className="bg-[#1f2833]/40 p-4 rounded-xl border border-[#1f2833]">
              <h2 className="text-xs text-center text-gray-400 uppercase tracking-widest font-bold mb-3">Aaj Ka Mood</h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Energised', 'Calm', 'Low', 'Focused', 'Stressed'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setMood(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      mood === item 
                        ? 'bg-[#66fcf1] text-[#0b0c10] shadow-[0_0_10px_rgba(102,252,241,0.5)] scale-105' 
                        : 'bg-[#0b0c10] text-gray-300 hover:border-[#45a29e] border border-transparent'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1f2833]/40 p-4 rounded-xl border border-[#1f2833] text-center">
                <p className="text-xs text-gray-400 uppercase">Progress</p>
                <div className="text-2xl font-black text-[#66fcf1] mt-1">{progressPercent}%</div>
                <div className="w-full bg-[#0b0c10] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#66fcf1] h-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>

              <div className="bg-[#1f2833]/40 p-4 rounded-xl border border-[#1f2833] text-center">
                <p className="text-xs text-gray-400 uppercase">Streak</p>
                <div className="text-2xl font-black text-[#66fcf1] mt-1 flex items-center justify-center gap-1">
                  <Flame size={20} className="text-orange-500 fill-orange-500" /> 3 Din
                </div>
                <p className="text-[10px] text-gray-500 mt-1">Best: 7 Din</p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 size={14} className="text-[#66fcf1]" /> Key Actions
              </h2>
              {routines.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggleRoutine(item.id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    item.done 
                      ? 'bg-[#1f2833]/20 border-gray-800 text-gray-500 line-through' 
                      : 'bg-[#1f2833]/70 border-[#45a29e]/30 text-white'
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{item.text}</p>
                    <span className="text-[10px] text-gray-400">{item.time}</span>
                  </div>
                  <input type="checkbox" checked={item.done} readOnly className="accent-[#66fcf1]" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* 2. WARDROBE TAB */}
        {activeTab === 'wardrobe' && (
          <div className="space-y-4">
            <div className="bg-[#1f2833]/60 p-4 rounded-xl border border-[#45a29e]/30">
              <div className="flex items-center gap-2 text-xs text-[#66fcf1] font-bold uppercase">
                <Shirt size={16} /> Outfit Recommender
              </div>
              <p className="text-xs text-gray-300 mt-1">High-Energy Aries Vibe & Work Focus</p>
            </div>

            <div className="space-y-3">
              <div className="bg-[#1f2833]/30 p-4 rounded-xl border border-[#1f2833]">
                <span className="text-[10px] bg-[#66fcf1]/20 text-[#66fcf1] px-2 py-0.5 rounded font-bold">POWER OUTFIT</span>
                <h3 className="text-base font-bold text-white mt-2">Charcoal Blazer + Black Tee</h3>
                <p className="text-xs text-gray-400 mt-1">Perfect for high-impact engineering & focus sessions.</p>
              </div>

              <div className="bg-[#1f2833]/30 p-4 rounded-xl border border-[#1f2833]">
                <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-bold">CASUAL TECH</span>
                <h3 className="text-base font-bold text-white mt-2">Dark Olive Hoodie + Denim</h3>
                <p className="text-xs text-gray-400 mt-1">Relaxed yet focused aesthetic for late-night coding.</p>
              </div>
            </div>
          </div>
        )}

        {/* 3. ROUTINE TAB */}
        {activeTab === 'routine' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#1f2833]/40 p-3 rounded-xl border border-[#1f2833]">
              <div>
                <h3 className="text-sm font-bold text-white">Daily Habit Engine</h3>
                <p className="text-xs text-gray-400">{completedCount} of {routines.length} completed</p>
              </div>
              <Award className="text-[#66fcf1]" size={24} />
            </div>

            {['Morning', 'Evening', 'Night'].map((cat) => (
              <div key={cat} className="space-y-2">
                <h4 className="text-xs font-bold text-[#45a29e] uppercase">{cat} Habits</h4>
                {routines.filter(r => r.category === cat).map(item => (
                  <div key={item.id} onClick={() => toggleRoutine(item.id)} className="p-3 bg-[#1f2833]/50 rounded-lg border border-[#1f2833] flex justify-between items-center cursor-pointer">
                    <span className={`text-sm ${item.done ? 'line-through text-gray-500' : 'text-white'}`}>{item.text}</span>
                    <input type="checkbox" checked={item.done} readOnly className="accent-[#66fcf1]" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* 4. SITAARE TAB */}
        {activeTab === 'sitaare' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#1f2833] to-[#0b0c10] p-4 rounded-xl border border-[#66fcf1]/30">
              <div className="flex items-center gap-2 text-xs font-bold text-[#66fcf1]">
                <Compass size={16} /> ARIES DAILY INSIGHT
              </div>
              <p className="text-sm text-white font-medium mt-2">
                Your governing planet Mars drives strong initiative today. Focus on system architecture and high-impact tasks.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1f2833]/40 p-3 rounded-xl border border-[#1f2833]">
                <p className="text-[10px] text-gray-400 uppercase">Lucky Number</p>
                <p className="text-xl font-bold text-[#66fcf1] mt-1">9 & 18</p>
              </div>
              <div className="bg-[#1f2833]/40 p-3 rounded-xl border border-[#1f2833]">
                <p className="text-[10px] text-gray-400 uppercase">Power Color</p>
                <p className="text-xl font-bold text-red-400 mt-1">Crimson Red</p>
              </div>
            </div>
          </div>
        )}

        {/* 5. CONTACTS TAB */}
        {activeTab === 'contacts' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Inner Circle</h3>
            
            <div className="bg-[#1f2833]/40 p-3 rounded-xl border border-[#1f2833] flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-white">Priya Sharma</p>
                <p className="text-xs text-gray-400">Technical Collaborator</p>
              </div>
              <div className="flex gap-2">
                <a href="tel:" className="p-2 bg-[#0b0c10] text-[#66fcf1] rounded-lg border border-[#45a29e]/30"><Phone size={14} /></a>
                <a href="https://wa.me/" className="p-2 bg-[#0b0c10] text-green-400 rounded-lg border border-green-500/30"><MessageSquare size={14} /></a>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Navigation Bar */}
      <nav className="bg-[#0b0c10] border-t border-[#1f2833] p-3 flex justify-around items-center text-xs">
        {['today', 'wardrobe', 'routine', 'sitaare', 'contacts'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize flex flex-col items-center gap-1 transition-all ${
              activeTab === tab ? 'text-[#66fcf1] font-bold scale-110' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

    </div>
  );
}