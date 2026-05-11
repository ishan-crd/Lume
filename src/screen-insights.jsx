// Insights — AI coaching, symptom correlation, predictions, food swaps, optimal day
const { useState: useStateI } = React;

function ScreenInsights() {
  const [tab, setTab] = useStateI('today');

  return (
    <div className="phone-scroll" style={{ height: '100%', overflowY: 'auto', paddingBottom: 110 }}>
      <TopBar
        left={<div>
          <div style={{ fontSize: 11.5, color: 'rgba(20,20,30,0.5)', textTransform: 'uppercase', letterSpacing: 1.4 }}>Lume AI</div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.7, marginTop: 2 }}>Insights</div>
        </div>}
        right={[
          <button key="filter" style={{
            width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,0.6)',
            border: '0.5px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          }}><Icons.filter size={16}/></button>,
        ]}
      />

      {/* Coach hero */}
      <div style={{ padding: '0 14px 14px' }}>
        <Card padding={0} radius={28} style={{
          overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(165deg, oklch(0.22 0.04 280), oklch(0.16 0.05 270) 50%, oklch(0.2 0.06 320))',
          color: '#fff', border: '0.5px solid rgba(255,255,255,0.15)',
        }}>
          {/* aurora behind */}
          <div style={{
            position: 'absolute', inset: -20, opacity: 0.6,
            background: 'radial-gradient(40% 35% at 80% 20%, oklch(0.78 0.22 350) 0%, transparent 60%), radial-gradient(50% 40% at 15% 90%, oklch(0.7 0.2 220) 0%, transparent 60%)',
            filter: 'blur(6px)',
          }}/>
          <div style={{ position: 'relative', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 999,
                background: 'conic-gradient(from 220deg, oklch(0.85 0.13 80), oklch(0.78 0.14 30), oklch(0.7 0.14 280), oklch(0.78 0.12 160), oklch(0.85 0.13 80))',
              }}/>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Lume Coach</div>
              <Pill tone="ink" size="sm" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}><Icons.lock size={10}/> Premium</Pill>
            </div>
            <div className="serif" style={{ fontSize: 26, fontWeight: 400, lineHeight: 1.15, letterSpacing: -0.4 }}>
              Your week is shaping up well — but magnesium is the bottleneck.
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 10, lineHeight: 1.5 }}>
              Three small swaps could lift recovery by an estimated <span className="mono" style={{ fontWeight: 600, color: '#fff' }}>+8 pts</span> and close 4 deficiencies.
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button style={{
                height: 36, padding: '0 14px', borderRadius: 999, border: 0,
                background: '#fff', color: '#15151b', fontSize: 13, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>View plan <Icons.arrow size={13}/></button>
              <button style={{
                height: 36, padding: '0 14px', borderRadius: 999,
                border: '0.5px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 13, fontWeight: 500,
              }}>Ask Coach</button>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 18px 12px', display: 'flex', gap: 6, overflowX: 'auto' }} className="phone-scroll">
        {[
          { id: 'today', label: 'For today' },
          { id: 'week', label: 'This week' },
          { id: 'symp', label: 'Symptoms' },
          { id: 'swaps', label: 'Swaps' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            height: 30, padding: '0 13px', borderRadius: 999,
            border: '0.5px solid rgba(20,20,30,0.1)',
            background: tab === t.id ? '#15151b' : 'rgba(255,255,255,0.55)',
            color: tab === t.id ? '#fff' : '#15151b',
            fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', backdropFilter: 'blur(12px)',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Insight cards */}
      <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {INSIGHTS.map(ins => {
          const toneMap = { coral: 'coral', gold: 'gold', peri: 'peri' };
          const tone = toneMap[ins.tone];
          const t = TONES[tone];
          const kindLabel = ins.kind === 'correlate' ? 'Correlation' : ins.kind === 'predict' ? 'Prediction' : 'Recovery';
          return (
            <Card key={ins.id} padding={16} radius={20} tint={tone}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: t.deep, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2 }}>
                  <Icons.spark size={12}/> {kindLabel}
                </div>
                <div className="mono" style={{ fontSize: 10.5, color: t.deep, fontWeight: 600 }}>{Math.round(ins.confidence*100)}% conf</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3, letterSpacing: -0.2 }}>{ins.title}</div>
              <div style={{ fontSize: 12.5, color: 'rgba(20,20,30,0.65)', marginTop: 5, lineHeight: 1.5 }}>{ins.body}</div>
            </Card>
          );
        })}
      </div>

      {/* Symptom correlation */}
      <SectionLabel>Symptom signals</SectionLabel>
      <div style={{ padding: '0 14px 14px' }}>
        <Card padding={16} radius={22}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>How you've felt</div>
            <Pill tone="ink" size="sm">7-day avg</Pill>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SYMPTOMS.map(s => {
              const positive = s.delta > 0;
              const flat = s.delta === 0;
              const tone = s.name === 'Soreness' || s.name === 'Hunger' ? (s.delta < 0 ? 'sage' : 'coral') : (positive ? 'sage' : 'coral');
              const t = TONES[tone];
              return (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 70, fontSize: 12.5, fontWeight: 500 }}>{s.name}</div>
                  <div style={{ flex: 1, height: 8, background: 'rgba(20,20,30,0.06)', borderRadius: 6, position: 'relative' }}>
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: `${(s.v/10)*100}%`,
                      background: `linear-gradient(90deg, ${t.c}, ${t.deep})`,
                      borderRadius: 6,
                    }}/>
                    {/* tick at scale midpoint */}
                    <div style={{
                      position: 'absolute', left: '50%', top: -2, bottom: -2, width: 1,
                      background: 'rgba(20,20,30,0.12)',
                    }}/>
                  </div>
                  <div className="mono" style={{ fontSize: 12, fontWeight: 600, width: 28, textAlign: 'right' }}>{s.v.toFixed(1)}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: flat ? 'rgba(20,20,30,0.4)' : t.deep, fontWeight: 600, width: 38, textAlign: 'right' }}>
                    {flat ? '—' : (positive ? '+' : '') + s.delta.toFixed(1)}
                  </div>
                </div>
              );
            })}
          </div>
          {/* correlation chip */}
          <div style={{
            marginTop: 14, padding: '10px 12px', borderRadius: 14,
            background: 'rgba(20,20,30,0.04)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Icons.info size={14} style={{ color: 'rgba(20,20,30,0.6)', flexShrink: 0 }}/>
            <div style={{ fontSize: 11.5, color: 'rgba(20,20,30,0.7)', lineHeight: 1.45 }}>
              <b>Focus</b> correlates with omega-3 intake the prior day (<span className="mono">r=0.62</span>).
            </div>
          </div>
        </Card>
      </div>

      {/* Food swaps */}
      <SectionLabel action="View library →">AI food swaps</SectionLabel>
      <div style={{ padding: '0 0 14px' }}>
        <div className="phone-scroll hsnap" style={{
          display: 'flex', gap: 10, overflowX: 'auto', padding: '0 14px 4px',
        }}>
          {SWAPS.map((sw, i) => {
            const t = TONES[sw.tone];
            return (
              <Card key={i} padding={14} radius={20} tint={sw.tone} style={{ width: 230, flexShrink: 0 }}>
                <div style={{ fontSize: 10.5, color: t.deep, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2 }}>Swap</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 13.5, fontWeight: 500 }}>
                  <span style={{ color: 'rgba(20,20,30,0.55)', textDecoration: 'line-through', textDecorationColor: 'rgba(20,20,30,0.3)' }}>{sw.from}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                  <Icons.arrow size={14} style={{ color: t.c }}/>
                  <span style={{ fontSize: 14, fontWeight: 600, color: t.deep }}>{sw.to}</span>
                </div>
                <div style={{ marginTop: 10, fontSize: 11.5, color: 'rgba(20,20,30,0.6)', lineHeight: 1.45 }}>{sw.why}</div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Optimal day */}
      <SectionLabel action={<Pill tone="ink" size="sm"><Icons.lock size={10}/> Premium</Pill>}>Your optimal day</SectionLabel>
      <div style={{ padding: '0 14px 22px' }}>
        <Card padding={16} radius={22}>
          {[
            { t: '6:30 AM', label: 'Sunlight + water', sub: 'Closes Vit D gap', tone: 'gold', ic: 'flame' },
            { t: '8:00 AM', label: 'High-protein breakfast', sub: 'Eggs · Greek yogurt · berries', tone: 'coral', ic: 'protein' },
            { t: '12:30 PM', label: 'Mg + fiber lunch', sub: 'Quinoa bowl + pumpkin seeds', tone: 'sage', ic: 'carbs' },
            { t: '3:30 PM', label: 'Walk + electrolytes', sub: '12 min · 1 cup water', tone: 'peri', ic: 'steps' },
            { t: '7:00 PM', label: 'Omega-3 dinner', sub: 'Wild salmon · greens', tone: 'coral', ic: 'omega' },
            { t: '10:00 PM', label: 'Mg glycinate · wind-down', sub: '400 mg · screens off', tone: 'peri', ic: 'moon' },
          ].map((row, i, a) => {
            const t = TONES[row.tone];
            return (
              <div key={i} style={{ display: 'flex', gap: 12, position: 'relative' }}>
                <div style={{ width: 58, paddingTop: 2 }}>
                  <div className="mono" style={{ fontSize: 11, fontWeight: 600, color: 'rgba(20,20,30,0.55)' }}>{row.t}</div>
                </div>
                <div style={{ width: 28, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 9, background: t.soft, color: t.deep,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    zIndex: 1,
                  }}>
                    {React.createElement(Icons[row.ic], { size: 13 })}
                  </div>
                  {i < a.length - 1 && (
                    <div style={{
                      position: 'absolute', top: 26, bottom: -10, width: 1,
                      background: 'rgba(20,20,30,0.1)',
                    }}/>
                  )}
                </div>
                <div style={{ flex: 1, paddingBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{row.label}</div>
                  <div style={{ fontSize: 11.5, color: 'rgba(20,20,30,0.55)', marginTop: 1 }}>{row.sub}</div>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

window.ScreenInsights = ScreenInsights;
