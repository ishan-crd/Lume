// Meal logging — entry methods, camera scan flow, AI breakdown
const { useState: useStateL, useRef: useRefL, useEffect: useEffectL } = React;

const QUICK_FOODS = [
  { name: 'Greek yogurt', cal: 120, swatch: 'linear-gradient(135deg, oklch(0.95 0.03 90), oklch(0.88 0.04 80))' },
  { name: 'Chicken breast 6oz', cal: 280, swatch: 'linear-gradient(135deg, oklch(0.82 0.07 60), oklch(0.72 0.08 50))' },
  { name: 'Wild salmon 5oz', cal: 320, swatch: 'linear-gradient(135deg, oklch(0.78 0.12 35), oklch(0.7 0.13 30))' },
  { name: 'Eggs (2)', cal: 156, swatch: 'linear-gradient(135deg, oklch(0.92 0.1 90), oklch(0.86 0.12 80))' },
  { name: 'Avocado', cal: 240, swatch: 'linear-gradient(135deg, oklch(0.85 0.1 130), oklch(0.72 0.12 140))' },
  { name: 'Quinoa 1cup', cal: 222, swatch: 'linear-gradient(135deg, oklch(0.88 0.05 70), oklch(0.78 0.07 60))' },
  { name: 'Almonds 1oz', cal: 164, swatch: 'linear-gradient(135deg, oklch(0.75 0.06 50), oklch(0.65 0.07 40))' },
  { name: 'Blueberries 1cup', cal: 84, swatch: 'linear-gradient(135deg, oklch(0.55 0.13 260), oklch(0.42 0.16 270))' },
];

function ScreenLog({ goBack }) {
  const [mode, setMode] = useStateL('hub'); // hub | camera | scanning | result | barcode | search
  const [query, setQuery] = useStateL('');

  return (
    <div className="phone-scroll" style={{ height: '100%', overflowY: 'auto', paddingBottom: 110 }}>
      <TopBar
        left={<div>
          <div style={{ fontSize: 11.5, color: 'rgba(20,20,30,0.5)', textTransform: 'uppercase', letterSpacing: 1.4 }}>Log meal</div>
          <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.7, marginTop: 2 }}>What did you eat?</div>
        </div>}
        right={[
          <button key="mic" style={{
            width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,0.6)',
            border: '0.5px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          }}><Icons.mic size={16}/></button>,
        ]}
      />

      {/* Camera hero */}
      <div style={{ padding: '0 14px 14px' }}>
        <button onClick={() => setMode('scanning')} style={{
          width: '100%', textAlign: 'left', border: 0, padding: 0, background: 'transparent',
        }}>
          <Card padding={0} radius={26} style={{
            position: 'relative', overflow: 'hidden', minHeight: 220,
          }}>
            {/* Faux viewfinder gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(120% 90% at 50% 35%, oklch(0.95 0.04 90) 0%, oklch(0.85 0.06 70) 60%, oklch(0.68 0.08 50) 100%)',
            }} />
            {/* Faux "plate" suggestion */}
            <div style={{
              position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%, -50%)',
              width: 140, height: 140, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.7), rgba(255,255,255,0.1))',
              boxShadow: '0 0 0 0.5px rgba(255,255,255,0.6)',
            }} />
            {/* corner brackets */}
            {[
              { l: 18, t: 18, b: '', r: '', cs: [['t','l']] },
              { r: 18, t: 18, l: '', b: '', cs: [['t','r']] },
              { l: 18, b: 80, t: '', r: '', cs: [['b','l']] },
              { r: 18, b: 80, t: '', l: '', cs: [['b','r']] },
            ].map((br, i) => (
              <div key={i} style={{
                position: 'absolute', width: 26, height: 26,
                left: br.l, right: br.r, top: br.t, bottom: br.b,
                borderColor: 'rgba(255,255,255,0.9)',
                borderStyle: 'solid', borderWidth: 0,
                borderTopWidth: br.cs[0][0]==='t'?2:0,
                borderBottomWidth: br.cs[0][0]==='b'?2:0,
                borderLeftWidth: br.cs[0][1]==='l'?2:0,
                borderRightWidth: br.cs[0][1]==='r'?2:0,
                borderRadius: 6,
              }}/>
            ))}
            {/* sweep line */}
            <div style={{
              position: 'absolute', left: 30, right: 30, top: '50%',
              height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
              boxShadow: '0 0 20px rgba(255,255,255,0.7)',
            }} />
            {/* bottom controls strip */}
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 0,
              padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.18))',
            }}>
              <div style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>
                <div style={{ fontSize: 11, opacity: 0.85 }}>Point camera at your plate</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>AI Scan</div>
              </div>
              <div style={{
                width: 56, height: 56, borderRadius: 999, background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2), 0 0 0 4px rgba(255,255,255,0.25)',
              }}>
                <Icons.camera size={24} style={{ color: '#15151b'}}/>
              </div>
              <button style={{
                width: 36, height: 36, borderRadius: 999,
                background: 'rgba(255,255,255,0.25)', border: '0.5px solid rgba(255,255,255,0.5)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icons.flash size={16}/></button>
            </div>
          </Card>
        </button>
      </div>

      {/* Method grid */}
      <div style={{ padding: '0 14px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { id: 'barcode', icon: 'barcode', label: 'Barcode', sub: '2M+ items', tone: 'sage' },
          { id: 'search',  icon: 'search',  label: 'Search',  sub: 'database', tone: 'peri' },
          { id: 'manual',  icon: 'edit',    label: 'Manual',  sub: 'custom',   tone: 'gold' },
        ].map(m => {
          const t = TONES[m.tone];
          return (
            <button key={m.id} onClick={() => setMode(m.id)} style={{
              border: 0, padding: 0, background: 'transparent', textAlign: 'left',
            }}>
              <Card padding={14} radius={18}>
                <div style={{
                  width: 30, height: 30, borderRadius: 10, marginBottom: 8,
                  background: t.soft, color: t.deep,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {React.createElement(Icons[m.icon], { size: 14 })}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(20,20,30,0.5)', marginTop: 1 }}>{m.sub}</div>
              </Card>
            </button>
          );
        })}
      </div>

      {/* Search bar */}
      <div style={{ padding: '0 14px 14px' }}>
        <div className="glass" style={{
          height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10,
        }}>
          <Icons.search size={16} style={{ color: 'rgba(20,20,30,0.4)' }}/>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search 800,000+ foods…"
            style={{
              flex: 1, border: 0, background: 'transparent', outline: 'none',
              fontFamily: 'inherit', fontSize: 14, color: '#15151b',
            }}
          />
          <Pill tone="ink" size="sm">⌘K</Pill>
        </div>
      </div>

      {/* Quick add */}
      <SectionLabel action="Customize →">Quick add</SectionLabel>
      <div style={{ padding: '0 14px 14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {QUICK_FOODS.map(f => (
            <button key={f.name} style={{
              border: 0, padding: 0, background: 'transparent', textAlign: 'left',
            }}>
              <Card padding={10} radius={16}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ImgSlot w={36} h={36} radius={10} label="" swatch={f.swatch}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: 'rgba(20,20,30,0.5)' }}>{f.cal} cal</div>
                  </div>
                  <button style={{
                    width: 26, height: 26, borderRadius: 999, border: 0,
                    background: '#15151b', color: '#fff', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><Icons.plus size={14}/></button>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </div>

      {/* Recent AI scans */}
      <SectionLabel>Recent AI scans</SectionLabel>
      <div style={{ padding: '0 14px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Card padding={14} radius={20}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <ImgSlot w={84} h={84} radius={16} label="salmon bowl" swatch="linear-gradient(135deg, oklch(0.82 0.11 30), oklch(0.7 0.13 50))"/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <Pill tone="peri" size="sm"><Icons.spark size={9}/> AI · 96%</Pill>
                <span style={{ fontSize: 11, color: 'rgba(20,20,30,0.5)' }}>1:08 PM</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>Salmon · quinoa · greens</div>
              <div className="mono" style={{ fontSize: 11.5, color: 'rgba(20,20,30,0.6)', marginTop: 2 }}>612 cal · P44 · C48 · F22</div>
              <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                <Pill tone="sage" size="sm">Omega-3 88%</Pill>
                <Pill tone="sage" size="sm">B12 70%</Pill>
                <Pill tone="ink" size="sm">+4</Pill>
              </div>
            </div>
          </div>
          <div style={{
            marginTop: 12, paddingTop: 12, borderTop: '0.5px solid rgba(20,20,30,0.08)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ fontSize: 11.5, color: 'rgba(20,20,30,0.55)' }}>Estimated portion: <span className="mono" style={{ fontWeight: 600, color: '#15151b' }}>1.0×</span></div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{
                height: 28, padding: '0 12px', borderRadius: 999, border: '0.5px solid rgba(20,20,30,0.15)',
                background: 'rgba(255,255,255,0.5)', fontSize: 11.5, fontWeight: 500,
              }}>Edit</button>
              <button style={{
                height: 28, padding: '0 12px', borderRadius: 999, border: 0,
                background: '#15151b', color: '#fff', fontSize: 11.5, fontWeight: 500,
              }}>Confirm</button>
            </div>
          </div>
        </Card>

        {/* Detected items */}
        <Card padding={14} radius={20}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Detected components</div>
            <Pill tone="ink" size="sm">3 items</Pill>
          </div>
          {[
            { name: 'Wild salmon', amt: '5 oz', cal: 280, tone: 'coral', ic: 'omega' },
            { name: 'Quinoa', amt: '1 cup', cal: 222, tone: 'gold', ic: 'carbs' },
            { name: 'Mixed greens', amt: '2 cup', cal: 110, tone: 'sage', ic: 'fiber' },
          ].map((it, i, a) => {
            const t = TONES[it.tone];
            return (
              <div key={it.name} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
                borderBottom: i < a.length - 1 ? '0.5px solid rgba(20,20,30,0.06)' : 'none',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 9, background: t.soft, color: t.deep,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {React.createElement(Icons[it.ic], { size: 14 })}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{it.name}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: 'rgba(20,20,30,0.5)' }}>{it.amt} · {it.cal} cal</div>
                </div>
                <button style={{
                  width: 24, height: 24, borderRadius: 999, border: 0,
                  background: 'rgba(20,20,30,0.05)', color: '#15151b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Icons.edit size={12}/></button>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

window.ScreenLog = ScreenLog;
