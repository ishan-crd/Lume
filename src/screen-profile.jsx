// Profile / You — wearables, supplements, blood test, settings
const { useState: useStateP } = React;

function ScreenProfile() {
  return (
    <div className="phone-scroll" style={{ height: '100%', overflowY: 'auto', paddingBottom: 110 }}>
      <TopBar
        left={<div>
          <div style={{ fontSize: 11.5, color: 'rgba(20,20,30,0.5)', textTransform: 'uppercase', letterSpacing: 1.4 }}>Profile</div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.7, marginTop: 2 }}>You</div>
        </div>}
        right={[
          <button key="settings" style={{
            width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,0.6)',
            border: '0.5px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="#15151b" strokeWidth="1.6"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="#15151b" strokeWidth="1.6"/></svg></button>,
        ]}
      />

      {/* Profile card */}
      <div style={{ padding: '0 14px 14px' }}>
        <Card padding={18} radius={24}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 60, height: 60, borderRadius: 20,
              background: 'linear-gradient(135deg, oklch(0.85 0.11 80), oklch(0.7 0.13 30) 50%, oklch(0.6 0.14 280))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, fontWeight: 600, color: '#fff', letterSpacing: -0.5,
            }}>TM</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>Theo Mendel</div>
              <div style={{ fontSize: 12, color: 'rgba(20,20,30,0.55)' }}>32 · Endurance · Mountain View</div>
              <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                <Pill tone="peri" size="sm">Lume Pro</Pill>
                <Pill tone="gold" size="sm"><Icons.flame size={10}/> 23-day streak</Pill>
              </div>
            </div>
          </div>
          <div style={{
            marginTop: 14, paddingTop: 14, borderTop: '0.5px solid rgba(20,20,30,0.08)',
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, textAlign: 'center',
          }}>
            {[
              { v: '186', l: 'Meals logged' },
              { v: '4.2k', l: 'Data points' },
              { v: '92', l: 'Avg score' },
            ].map(s => (
              <div key={s.l}>
                <div className="mono" style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.4 }}>{s.v}</div>
                <div style={{ fontSize: 10.5, color: 'rgba(20,20,30,0.5)', textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Wearables */}
      <SectionLabel action={<span>+ Connect</span>}>Wearables &amp; sensors</SectionLabel>
      <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {WEARABLES.map(w => {
          const t = TONES[w.tone];
          const connected = w.status === 'connected';
          return (
            <Card key={w.id} padding={14} radius={18} tint={connected ? w.tone : undefined}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: connected ? 'rgba(255,255,255,0.6)' : t.soft,
                  color: t.deep,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '0.5px solid rgba(255,255,255,0.7)',
                }}>
                  {React.createElement(Icons[w.icon], { size: 18 })}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{w.name}</div>
                    {connected && <div style={{ width: 6, height: 6, borderRadius: 6, background: 'oklch(0.65 0.16 155)' }} className="pulse-soft"/>}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'rgba(20,20,30,0.55)', marginTop: 1 }}>
                    {connected ? `Synced ${w.last} · ${w.signal.slice(0,2).join(', ')}` : w.signal.slice(0,3).join(' · ')}
                  </div>
                </div>
                {connected ? (
                  <Pill tone="sage" size="sm"><Icons.check size={10}/> On</Pill>
                ) : (
                  <button style={{
                    height: 28, padding: '0 12px', borderRadius: 999, border: 0,
                    background: '#15151b', color: '#fff', fontSize: 11.5, fontWeight: 500,
                  }}>Connect</button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Supplement stack */}
      <SectionLabel action="Edit stack →">Supplement stack</SectionLabel>
      <div style={{ padding: '0 14px 14px' }}>
        <Card padding={16} radius={22}>
          {SUPPLEMENTS.map((s, i, a) => {
            const t = TONES[s.tone];
            return (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
                borderBottom: i < a.length - 1 ? '0.5px solid rgba(20,20,30,0.06)' : 'none',
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 11, background: t.soft, color: t.deep,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Icons.pill size={16}/></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{s.name}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: 'rgba(20,20,30,0.55)', marginTop: 1 }}>{s.dose} · {s.time}</div>
                </div>
                <div style={{ width: 90 }}>
                  <Bar pct={s.adherence * 100} tone={s.tone} height={4}/>
                  <div className="mono" style={{ fontSize: 9.5, color: t.deep, fontWeight: 600, marginTop: 3, textAlign: 'right' }}>{Math.round(s.adherence*100)}% adherence</div>
                </div>
              </div>
            );
          })}
          <button style={{
            width: '100%', height: 38, marginTop: 10, border: '1px dashed rgba(20,20,30,0.18)',
            background: 'transparent', borderRadius: 14, fontSize: 12.5, fontWeight: 500,
            color: 'rgba(20,20,30,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Icons.plus size={14}/> Add supplement
          </button>
        </Card>
      </div>

      {/* Premium / Blood test */}
      <div style={{ padding: '0 14px 14px' }}>
        <Card padding={0} radius={24} style={{
          overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(140deg, oklch(0.94 0.06 80), oklch(0.92 0.08 30) 60%, oklch(0.94 0.07 350))',
        }}>
          <div style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Pill tone="gold" size="sm"><Icons.lock size={10}/> Premium</Pill>
              <Icons.flask size={20} style={{ color: 'oklch(0.42 0.13 30)' }}/>
            </div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.2, marginTop: 12, letterSpacing: -0.3 }}>
              Connect your blood panel for personalized dosing.
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(20,20,30,0.65)', marginTop: 6, lineHeight: 1.5 }}>
              Lume reads 47 biomarkers from your last lab and rewrites your stack — automatically.
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
              <Pill tone="coral" size="sm">Ferritin</Pill>
              <Pill tone="peri" size="sm">Vit D 25-OH</Pill>
              <Pill tone="sage" size="sm">Mg RBC</Pill>
              <Pill tone="ink" size="sm">+44 more</Pill>
            </div>
            <button style={{
              height: 38, padding: '0 16px', marginTop: 16, borderRadius: 999, border: 0,
              background: '#15151b', color: '#fff', fontSize: 13, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>Upload lab results <Icons.arrow size={13}/></button>
          </div>
        </Card>
      </div>

      {/* Settings */}
      <SectionLabel>Settings</SectionLabel>
      <div style={{ padding: '0 14px 22px' }}>
        <Card padding={6} radius={20}>
          {[
            { ic: 'user', label: 'Personal details', detail: 'Age, weight, activity' },
            { ic: 'pill', label: 'Goals &amp; targets', detail: 'Body recomp · 2,400 kcal' },
            { ic: 'spark', label: 'AI preferences', detail: 'Balanced · weekly' },
            { ic: 'lock', label: 'Privacy &amp; data', detail: 'Health data export' },
          ].map((r, i, a) => (
            <div key={r.label} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px',
              borderBottom: i < a.length - 1 ? '0.5px solid rgba(20,20,30,0.06)' : 'none',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 9, background: 'rgba(20,20,30,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{React.createElement(Icons[r.ic], { size: 14 })}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }} dangerouslySetInnerHTML={{__html: r.label}}/>
                <div style={{ fontSize: 11, color: 'rgba(20,20,30,0.55)', marginTop: 1 }} dangerouslySetInnerHTML={{__html: r.detail}}/>
              </div>
              <Icons.chev size={14} style={{ color: 'rgba(20,20,30,0.3)' }}/>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

window.ScreenProfile = ScreenProfile;
