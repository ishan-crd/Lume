// Shared primitives — glass cards, tints, gauges, sparklines, progress
const { useState, useEffect, useRef, useMemo } = React;

const TONES = {
  sage:  { c: 'oklch(0.62 0.12 155)', soft: 'oklch(0.92 0.07 155)', deep: 'oklch(0.42 0.1 155)' },
  coral: { c: 'oklch(0.66 0.16 28)',  soft: 'oklch(0.93 0.08 28)',  deep: 'oklch(0.45 0.13 28)' },
  peri:  { c: 'oklch(0.62 0.14 275)', soft: 'oklch(0.92 0.07 275)', deep: 'oklch(0.42 0.12 275)' },
  gold:  { c: 'oklch(0.72 0.13 75)',  soft: 'oklch(0.94 0.07 75)',  deep: 'oklch(0.5 0.11 75)' },
  ink:   { c: '#1a1a22', soft: '#ecebef', deep: '#0c0c14' },
};

const statusToTone = {
  great: 'sage', good: 'sage', fair: 'gold', low: 'coral', over: 'coral',
};

// Generic glass card
function Card({ children, tint, className = '', style, padding = 18, radius = 22 }) {
  const tintCls = tint ? `glass-tint-${tint}` : '';
  return (
    <div className={`glass ${tintCls} ${className}`} style={{
      borderRadius: radius, padding, position: 'relative', overflow: 'hidden', ...style,
    }}>
      {children}
    </div>
  );
}

// Pill
function Pill({ children, tone = 'ink', size = 'sm', style, onClick }) {
  const t = TONES[tone];
  const h = size === 'lg' ? 32 : size === 'md' ? 26 : 22;
  return (
    <span onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      height: h, padding: `0 ${h*0.4}px`, borderRadius: 999,
      background: tone === 'ink' ? 'rgba(20,20,30,0.06)' : t.soft,
      color: tone === 'ink' ? '#1a1a22' : t.deep,
      fontSize: size === 'lg' ? 13 : 11.5, fontWeight: 500,
      letterSpacing: -0.1, lineHeight: 1, whiteSpace: 'nowrap',
      ...style,
    }}>{children}</span>
  );
}

// Section label
function SectionLabel({ children, action, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      padding: '0 22px 12px', ...style,
    }}>
      <div style={{
        fontSize: 12, fontWeight: 500, color: 'rgba(20,20,30,0.5)',
        textTransform: 'uppercase', letterSpacing: 1.4,
      }}>{children}</div>
      {action && <div style={{ fontSize: 13, color: 'rgba(20,20,30,0.55)' }}>{action}</div>}
    </div>
  );
}

// Big arc gauge — used for vitality / recovery score
function ArcGauge({ value, max = 100, size = 168, stroke = 12, tone = 'sage', label, sub, children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const sweep = 0.78; // 280° arc
  const arcLen = c * sweep;
  const offset = c * (1 - sweep);
  const pct = Math.min(1, value / max);
  const dash = arcLen * pct;
  const t = TONES[tone];
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(126deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(20,20,30,0.08)" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${arcLen} ${c}`} strokeDashoffset={0}/>
        <defs>
          <linearGradient id={`g-${tone}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={t.c}/>
            <stop offset="100%" stopColor={t.deep}/>
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`url(#g-${tone})`} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}/>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      }}>
        {children || (<>
          <div className="mono" style={{ fontSize: size * 0.32, fontWeight: 600, letterSpacing: -2, lineHeight: 1 }}>
            {value}
          </div>
          {label && <div style={{ fontSize: 11.5, color: 'rgba(20,20,30,0.55)', textTransform: 'uppercase', letterSpacing: 1.2, marginTop: 6 }}>{label}</div>}
          {sub && <div style={{ fontSize: 12, color: t.deep, marginTop: 2 }}>{sub}</div>}
        </>)}
      </div>
    </div>
  );
}

// Linear progress
function Bar({ pct, tone = 'sage', height = 6, track = 'rgba(20,20,30,0.06)' }) {
  const t = TONES[tone];
  return (
    <div style={{ height, borderRadius: height, background: track, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${Math.min(100, Math.max(0, pct))}%`,
        background: `linear-gradient(90deg, ${t.c}, ${t.deep})`,
        borderRadius: height,
      }} />
    </div>
  );
}

// Mini sparkline
function Spark({ data, w = 80, h = 26, tone = 'sage', fill = true }) {
  const t = TONES[tone];
  const max = Math.max(...data), min = Math.min(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - 2 - ((v - min) / span) * (h - 4),
  ]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const fillD = d + ` L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      {fill && (
        <>
          <defs>
            <linearGradient id={`sf-${tone}-${w}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={t.c} stopOpacity="0.3"/>
              <stop offset="100%" stopColor={t.c} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={fillD} fill={`url(#sf-${tone}-${w})`} />
        </>
      )}
      <path d={d} fill="none" stroke={t.c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Image placeholder — striped, premium, with monospace caption (we don't draw food)
function ImgSlot({ w = 64, h = 64, label = 'meal', radius = 14, swatch }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: radius, position: 'relative', overflow: 'hidden',
      background: swatch || `repeating-linear-gradient(135deg, oklch(0.86 0.04 70) 0 6px, oklch(0.91 0.04 70) 6px 12px)`,
      boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        position: 'absolute', bottom: 4, left: 6, right: 6,
        fontFamily: 'Geist Mono, monospace', fontSize: 8, letterSpacing: 0.2,
        color: 'rgba(255,255,255,0.85)', textShadow: '0 0 6px rgba(0,0,0,0.3)',
        textTransform: 'lowercase',
      }}>{label}</div>
    </div>
  );
}

// Floating glass tab bar
function TabBar({ tab, setTab, onLog }) {
  const items = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'nutrients', label: 'Nutrients', icon: 'grid' },
    { id: 'log', label: 'Log', icon: 'plus', center: true },
    { id: 'insights', label: 'Insights', icon: 'spark' },
    { id: 'you', label: 'You', icon: 'user' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 14, right: 14, bottom: 18, zIndex: 100,
      pointerEvents: 'none',
    }}>
      <div className="glass-strong" style={{
        borderRadius: 32, padding: '8px 8px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        pointerEvents: 'auto',
      }}>
        {items.map(it => {
          const active = tab === it.id;
          if (it.center) {
            return (
              <button key={it.id}
                onClick={() => { setTab('log'); onLog && onLog(); }}
                style={{
                  width: 54, height: 54, borderRadius: 28, border: 0,
                  background: 'linear-gradient(150deg, oklch(0.26 0.04 280), oklch(0.18 0.03 280))',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 22px -6px oklch(0.4 0.1 280 / 0.5), 0 1px 0 rgba(255,255,255,0.5) inset',
                  marginTop: -22,
                }}>
                <Icons.plus size={22} />
              </button>
            );
          }
          return (
            <button key={it.id} onClick={() => setTab(it.id)}
              style={{
                flex: 1, height: 44, border: 0, background: 'transparent',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 2, color: active ? '#15151b' : 'rgba(20,20,30,0.45)',
                position: 'relative',
              }}>
              <div style={{
                opacity: active ? 1 : 0.85,
                transform: active ? 'translateY(-1px)' : 'none',
                transition: 'all 0.2s',
              }}>{React.createElement(Icons[it.icon], { size: 20 })}</div>
              <div style={{ fontSize: 9.5, fontWeight: active ? 600 : 500, letterSpacing: 0.1 }}>{it.label}</div>
              {active && (
                <div style={{
                  position: 'absolute', bottom: 1, width: 4, height: 4, borderRadius: 4,
                  background: '#15151b',
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Greeting top bar (used in Home + few others)
function TopBar({ left, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '64px 22px 14px',
    }}>
      <div>{left}</div>
      <div style={{ display: 'flex', gap: 8 }}>{right}</div>
    </div>
  );
}

// Lume wordmark
function Wordmark({ size = 22 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: size, height: size, borderRadius: size/2.4,
        background: 'conic-gradient(from 220deg, oklch(0.85 0.13 80), oklch(0.78 0.14 30), oklch(0.7 0.14 280), oklch(0.78 0.12 160), oklch(0.85 0.13 80))',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 3, borderRadius: '50%',
          background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)',
          border: '0.5px solid rgba(255,255,255,0.9)',
        }} />
      </div>
      <div style={{ fontSize: size*0.86, fontWeight: 600, letterSpacing: -0.5 }}>Lume</div>
    </div>
  );
}

Object.assign(window, { TONES, statusToTone, Card, Pill, SectionLabel, ArcGauge, Bar, Spark, ImgSlot, TabBar, TopBar, Wordmark });
