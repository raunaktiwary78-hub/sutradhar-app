import React, { useState, useEffect, useRef } from "react";
import { 
  Shirt, ListChecks, Sparkles, Users, Home, Plus, Loader2, 
  Flame, Star, X, MessageCircle, FileUp, TrendingUp, Trash2 
} from "lucide-react";

const THEME = {
  bg: "#0F0D17",
  surface: "#1A1726",
  surfaceRaised: "#262238",
  gold: "#D4AF37",
  goldSoft: "#F3E5AB",
  teal: "#4DB6AC",
  text: "#F5F5F7",
  textMuted: "#8E8A9F",
  line: "#2E2A42",
  danger: "#FF5252"
};

const ZODIACS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

const todayKey = () => new Date().toISOString().slice(0, 10);

const storage = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  },
  set: (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { console.error(e); }
  }
};

async function askAI(promptText, imageBase64 = null) {
  try {
    await new Promise(r => setTimeout(r, 1200)); 
    if (imageBase64) {
      return JSON.stringify({ category: "Topwear", color: "Black", occasion: "Casual" });
    }
    return `Sutradhar Suggestion: ${promptText.includes("routine") ? "Aaj ka mood badhiya hai, thoda focus kaam par lagao!" : "Yeh outfit perfect lagega!"}`;
  } catch (err) {
    return "AI Response connect nahi ho saka. Thodi der mein try karein.";
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result.split(",")[1]);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export default function Sutradhar() {
  const [tab, setTab] = useState("home");
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState({ name: "", zodiac: "Leo" });
  const [wardrobe, setWardrobe] = useState([]);
  const [routine, setRoutine] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [daily, setDaily] = useState({});
  const [busy, setBusy] = useState(false);
  const [showOnboard, setShowOnboard] = useState(false);

  const dayData = daily[todayKey()] || {};

  useEffect(() => {
    const p = storage.get("sutradhar:profile");
    if (p) setProfile(p); else setShowOnboard(true);

    setWardrobe(storage.get("sutradhar:wardrobe") || []);
    setRoutine(storage.get("sutradhar:routine") || []);
    setContacts(storage.get("sutradhar:contacts") || []);
    setDaily(storage.get("sutradhar:daily") || {});
    setLoaded(true);
  }, []);

  const saveProfile = (p) => { setProfile(p); storage.set("sutradhar:profile", p); setShowOnboard(false); };
  const saveWardrobe = (w) => { setWardrobe(w); storage.set("sutradhar:wardrobe", w); };
  const saveRoutine = (r) => { setRoutine(r); storage.set("sutradhar:routine", r); };
  const saveContacts = (c) => { setContacts(c); storage.set("sutradhar:contacts", c); };
  const saveDaily = (d) => { setDaily(d); storage.set("sutradhar:daily", d); };

  const setTodayField = (field, value) => {
    const next = { ...daily, [todayKey()]: { ...dayData, [field]: value } };
    saveDaily(next);
  };

  const streak = (() => {
    let s = 0;
    let cursor = new Date();
    for (let i = 0; i < 365; i++) {
      const key = cursor.toISOString().slice(0, 10);
      if (daily[key]?.routineDone) { s++; cursor.setDate(cursor.getDate() - 1); }
      else break;
    }
    return s;
  })();

  if (!loaded) {
    return (
      <div style={{ background: THEME.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: THEME.textMuted }}>
        <Loader2 size={24} style={{ animation: "spin 1s linear infinite", marginRight: 8 }} /> Loading Sutradhar…
      </div>
    );
  }

  return (
    <div style={{ background: THEME.bg, minHeight: "100vh", color: THEME.text, fontFamily: "system-ui, -apple-system, sans-serif", paddingBottom: 70 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input, select, textarea { font-size: 14px; background: ${THEME.surfaceRaised}; border: 1px solid ${THEME.line}; color: ${THEME.text}; border-radius: 8px; padding: 10px 12px; width: 100%; box-sizing: border-box; outline: none; }
        input:focus { border-color: ${THEME.gold}; }
        button { user-select: none; }
      `}</style>

      {showOnboard ? (
        <Onboard onDone={saveProfile} />
      ) : (
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <Header profile={profile} streak={streak} />
          
          <main style={{ padding: "0 16px 20px" }}>
            {tab === "home" && <HomeTab profile={profile} dayData={dayData} setTodayField={setTodayField} routine={routine} streak={streak} daily={daily} />}
            {tab === "wardrobe" && <WardrobeTab wardrobe={wardrobe} saveWardrobe={saveWardrobe} busy={busy} setBusy={setBusy} setTodayField={setTodayField} dayData={dayData} />}
            {tab === "routine" && <RoutineTab routine={routine} saveRoutine={saveRoutine} setTodayField={setTodayField} />}
            {tab === "astro" && <AstroTab profile={profile} dayData={dayData} setTodayField={setTodayField} busy={busy} setBusy={setBusy} />}
            {tab === "contacts" && <ContactsTab contacts={contacts} saveContacts={saveContacts} />}
          </main>

          <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: THEME.surface, borderTop: `1px solid ${THEME.line}`, display: "flex", justifyContent: "space-around", padding: "8px 0", zIndex: 100 }}>
            {[
              ["home", "Today", Home],
              ["wardrobe", "Wardrobe", Shirt],
              ["routine", "Routine", ListChecks],
              ["astro", "Sitaare", Star],
              ["contacts", "Contacts", Users],
            ].map(([key, label, Icon]) => (
              <button key={key} onClick={() => setTab(key)} style={{ background: "none", border: "none", color: tab === key ? THEME.gold : THEME.textMuted, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", flex: 1 }}>
                <Icon size={18} />
                <span style={{ fontSize: 10, fontWeight: tab === key ? 600 : 400 }}>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

function Card({ children, style = {} }) {
  return <div style={{ background: THEME.surface, border: `1px solid ${THEME.line}`, borderRadius: 12, padding: 16, marginBottom: 16, ...style }}>{children}</div>;
}

function Label({ children }) {
  return <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: THEME.gold, marginBottom: 8, fontWeight: 600 }}>{children}</div>;
}

function Button({ children, onClick, variant = "primary", disabled, style = {} }) {
  const styles = {
    primary: { background: THEME.gold, color: "#000" },
    ghost: { background: "transparent", color: THEME.text, border: `1px solid ${THEME.line}` },
    teal: { background: THEME.teal, color: "#000" },
  };
  return (
    <button disabled={disabled} onClick={onClick} style={{ padding: "10px 16px", borderRadius: 8, fontWeight: 600, border: "none", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", ...styles[variant], ...style }}>
      {children}
    </button>
  );
}

function Onboard({ onDone }) {
  const [name, setName] = useState("");
  const [zodiac, setZodiac] = useState("Leo");
  return (
    <div style={{ padding: 20, maxWidth: 360, margin: "80px auto 0", textAlign: "center" }}>
      <h1 style={{ color: THEME.goldSoft, margin: 0 }}>Sutradhar</h1>
      <p style={{ color: THEME.textMuted, fontSize: 13, marginBottom: 24 }}>Aapka personal lifestyle companion</p>
      <div style={{ textAlign: "left", display: "grid", gap: 12 }}>
        <div>
          <Label>Naam</Label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Apna naam likhein" />
        </div>
        <div>
          <Label>Rashi (Zodiac)</Label>
          <select value={zodiac} onChange={e => setZodiac(e.target.value)}>
            {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>
        <Button onClick={() => onDone({ name: name || "Dost", zodiac })}>Shuru Karein</Button>
      </div>
    </div>
  );
}

function Header({ profile, streak }) {
  return (
    <div style={{ padding: "16px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h2 style={{ margin: 0, color: THEME.goldSoft, fontSize: 20 }}>Sutradhar</h2>
        <div style={{ color: THEME.textMuted, fontSize: 12 }}>{profile.name} • {profile.zodiac}</div>
      </div>
      {streak > 0 && (
        <div style={{ color: THEME.gold, fontSize: 13, display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}>
          <Flame size={16} /> {streak} Din
        </div>
      )}
    </div>
  );
}

function HomeTab({ profile, dayData, setTodayField, routine, streak }) {
  const [genBusy, setGenBusy] = useState(false);
  const moods = [["Energised", "⚡"], ["Calm", "🌿"], ["Low", "🌧️"], ["Focused", "🎯"], ["Stressed", "🔥"]];

  const handleMood = async (m) => {
    setGenBusy(true);
    setTodayField("mood", m);
    const text = await askAI(`User ka mood ${m} hai. Ek chhota motivating daily message do.`);
    setTodayField("brief", text);
    setGenBusy(false);
  };

  return (
    <div>
      <Card>
        <Label>Aaj Ka Mood</Label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {moods.map(([m, e]) => (
            <button key={m} onClick={() => handleMood(m)} style={{ padding: "8px 12px", borderRadius: 20, border: `1px solid ${dayData.mood === m ? THEME.gold : THEME.line}`, background: dayData.mood === m ? "rgba(212,175,55,0.15)" : "transparent", color: THEME.text, cursor: "pointer", fontSize: 12 }}>
              {e} {m}
            </button>
          ))}
        </div>
        {genBusy && <div style={{ fontSize: 12, color: THEME.textMuted, marginTop: 10 }}>AI Soch raha hai...</div>}
        {dayData.brief && !genBusy && <div style={{ marginTop: 12, padding: 12, background: THEME.surfaceRaised, borderRadius: 8, fontSize: 13, lineHeight: 1.5 }}>{dayData.brief}</div>}
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Card style={{ textAlign: "center" }}>
          <Label>Routine Progress</Label>
          <div style={{ fontSize: 24, fontWeight: "bold", color: THEME.teal }}>
            {routine.filter(r => r.doneToday).length}/{routine.length}
          </div>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <Label>Streak</Label>
          <div style={{ fontSize: 24, fontWeight: "bold", color: THEME.gold }}>{streak} Din</div>
        </Card>
      </div>
    </div>
  );
}

function WardrobeTab({ wardrobe, saveWardrobe, busy, setBusy, setTodayField, dayData }) {
  const fileRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBusy(true);
    const b64 = await fileToBase64(file);
    const item = { id: Date.now(), image: `data:image/jpeg;base64,${b64}`, category: "Outfit", color: "Custom" };
    saveWardrobe([item, ...wardrobe]);
    setBusy(false);
  };

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Label>Wardrobe ({wardrobe.length})</Label>
        <Button variant="ghost" onClick={() => fileRef.current?.click()} style={{ width: "auto" }}>
          <Plus size={14} /> Add Outfit
        </Button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {wardrobe.map(item => (
          <div key={item.id} style={{ position: "relative", height: 90 }}>
            <img src={item.image} alt="Outfit" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            <button onClick={() => saveWardrobe(wardrobe.filter(w => w.id !== item.id))} style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.6)", border: "none", color: "#fff", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RoutineTab({ routine, saveRoutine, setTodayField }) {
  const [text, setText] = useState("");
  const add = () => {
    if (!text.trim()) return;
    saveRoutine([...routine, { id: Date.now(), text: text.trim(), doneToday: false }]);
    setText("");
  };
  const toggle = (id) => {
    const updated = routine.map(r => r.id === id ? { ...r, doneToday: !r.doneToday } : r);
    saveRoutine(updated);
    setTodayField("routineDone", updated.every(r => r.doneToday));
  };

  return (
    <Card>
      <Label>Daily Task</Label>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Task add karein..." />
        <Button onClick={add} style={{ width: "80px" }}><Plus size={16} /></Button>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {routine.map(r => (
          <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, background: THEME.surfaceRaised, borderRadius: 8 }}>
            <input type="checkbox" checked={r.doneToday} onChange={() => toggle(r.id)} style={{ width: 18, height: 18 }} />
            <span style={{ flex: 1, fontSize: 14, textDecoration: r.doneToday ? "line-through" : "none", color: r.doneToday ? THEME.textMuted : THEME.text }}>{r.text}</span>
            <Trash2 size={14} color={THEME.textMuted} style={{ cursor: "pointer" }} onClick={() => saveRoutine(routine.filter(x => x.id !== r.id))} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function AstroTab({ profile, dayData, setTodayField, busy, setBusy }) {
  const generate = async () => {
    setBusy(true);
    const res = await askAI(`Rashi: ${profile.zodiac} horoscope.`);
    setTodayField("horoscope", res);
    setBusy(false);
  };
  return (
    <Card>
      <Label>Astro Advice ({profile.zodiac})</Label>
      <Button onClick={generate} disabled={busy} variant="teal">
        {busy ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Star size={14} />} Rashiphal Dekhein
      </Button>
      {dayData.horoscope && <div style={{ marginTop: 12, padding: 12, background: THEME.surfaceRaised, borderRadius: 8, fontSize: 13, lineHeight: 1.5 }}>{dayData.horoscope}</div>}
    </Card>
  );
}

function ContactsTab({ contacts, saveContacts }) {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");

  const add = () => {
    if (!name || !num) return;
    saveContacts([...contacts, { id: Date.now(), name, num }]);
    setName(""); setNum("");
  };

  return (
    <Card>
      <Label>Quick Contacts</Label>
      <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Naam" />
        <input value={num} onChange={e => setNum(e.target.value)} placeholder="Phone Number" />
        <Button onClick={add}>Save Contact</Button>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {contacts.map(c => (
          <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10, background: THEME.surfaceRaised, borderRadius: 8 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: THEME.textMuted }}>{c.num}</div>
            </div>
            <a href={`sms:${c.num}`} style={{ color: THEME.gold, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
              <MessageCircle size={16} /> SMS
            </a>
          </div>
        ))}
      </div>
    </Card>
  );
}