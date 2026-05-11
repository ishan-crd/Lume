// Nutrients — macros donut, micronutrient heatmap, deficiency highlights
const { useState: useStateN, useMemo: useMemoN } = React;

function pctToTone(p, over = false) {
  if (over) return 'coral';
  if (p >= 100) return 'sage';
  if (p >= 80) return 'sage';
  if (p >= 60) return 'gold';
  return 'coral';
}

function MacroDonut({ p, c, f, size = 150, stroke = 22 }) {
  const total = p + c + f;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const segs = [
    { v: p, color: 'oklch(0.66 0.16 28)' },
    { v: c, color: 'oklch(0.72 0.13 75)' },
    { v: f, color: 'oklch(0.62 0.14 275)' },
  ];
  let acc = 0;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(20,20,30,0.06)" strokeWidth={stroke}/>
      {segs.map((s, i) => {
        const len = (s.v / total) * C;
        const offset = -acc;
        acc += len;
        return (
          <circle key={i} cx={size/2} cy={size/2} r={r} fill="none"
            stroke={s.color} strokeWidth={stroke}
            strokeDasharray={`${len - 4} ${C}`} strokeDashoffset={offset}
            strokeLinecap="butt"/>
        );
      })}
    </svg>
  );
}

function ScreenNutrients() {
  const [group, setGroup] = useStateN('all');
  const groups = [
    { id: 'all', label: 'All' },
    { id: 'vit', label: 'Vitamins' },
    { id: 'min', label: 'Minerals' },
    { id: 'fa',  label: 'Fats' },
    { id: 'oth', label: 'Other' },
  ];
  const filtered = group === 'all' ? NUTRIENTS : NUTRIENTS.filter(n => n.group === group);
  const deficient = NUTRIENTS.filter(n => n.status === 'low' || n.status === 'fair').slice(0, 3);

  return (
    <div className="phone-scroll" style={{ height: '100%', overflowY: 'auto', paddingBottom: 110 }}>
      <TopBar
        left={<div>
          <div style={{ fontSize: 11.5, color: 'rgba(20,20,30,0.5)', textTransform: 'uppercase', letterSpacing: 1.4 }}>Today · Tue Nov 11</div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.7, marginTop: 2 }}>Nutrients</div>
        </div>}
        right={[
          <button key="cal" style={{
            width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,0.6)',
            border: '0.5px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          }}><Icons.chart size={16}/></button>,
        ]}
      />

      {/* Macro donut card */}
      <div style={{ padding: '0 14px 14px' }}>
        <Card padding={20} radius={26}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <MacroDonut p={MACROS_TODAY.protein.v * 4} c={MACROS_TODAY.carbs.v * 4} f={MACROS_TODAY.fat.v * 9}/>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <div className="mono" style={{ fontSize: 30, fontWeight: 600, letterSpacing: -1.4, lineHeight: 1 }}>{MACROS_TODAY.cal.v.toLocaleString()}</div>
                <div style={{ fontSize: 10, color: 'rgba(20,20,30,0.5)', textTransform: 'uppercase', letterSpacing: 1.4, marginTop: 4 }}>kcal</div>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { name: 'Protein', tone: 'coral', v: MACROS_TODAY.protein },
                { name: 'Carbs', tone: 'gold', v: MACROS_TODAY.carbs },
                { name: 'Fat', tone: 'peri', v: MACROS_TODAY.fat },
              ].map(row => {
                const pct = (row.v.v / row.v.goal) * 100;
                const t = TONES[row.tone];
                return (
                  <div key={row.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 8, background: t.c }}/>
                    <div style={{ flex: 1, fontSize: 12, color: 'rgba(20,20,30,0.6)' }}>{row.name}</div>
                    <div className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{row.v.v}<span style={{ fontSize: 10, color: 'rgba(20,20,30,0.4)' }}>{row.v.unit}</span></div>
                    <div className="mono" style={{ fontSize: 10.5, color: 'rgba(20,20,30,0.4)', width: 32, textAlign: 'right' }}>{Math.round(pct)}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Filter chips */}
      <div style={{ padding: '0 18px 12px', display: 'flex', gap: 6, overflowX: 'auto' }} className="phone-scroll">
        {groups.map(g => (
          <button key={g.id} onClick={() => setGroup(g.id)} style={{
            height: 30, padding: '0 13px', borderRadius: 999,
            border: '0.5px solid rgba(20,20,30,0.1)',
            background: group === g.id ? '#15151b' : 'rgba(255,255,255,0.55)',
            color: group === g.id ? '#fff' : '#15151b',
            fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap',
            backdropFilter: 'blur(12px)',
          }}>{g.label}</button>
        ))}
      </div>

      {/* Heatmap */}
      <SectionLabel action={<span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: TONES.sage.c }}/>good
        <span style={{ width: 8, height: 8, borderRadius: 2, background: TONES.gold.c, marginLeft: 4 }}/>fair
        <span style={{ width: 8, height: 8, borderRadius: 2, background: TONES.coral.c, marginLeft: 4 }}/>low
      </span>}>Micronutrient heatmap</SectionLabel>
      <div style={{ padding: '0 14px 14px' }}>
        <Card padding={14} radius={22}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {filtered.map(n => {
              const tone = pctToTone(n.pct, n.status === 'over');
              const t = TONES[tone];
              const intensity = Math.min(1, Math.max(0.18, n.pct / 100));
              return (
                <div key={n.id} style={{
                  borderRadius: 12, padding: '10px 8px',
                  background: `${t.c.replace(')', ` / ${intensity * 0.22})`)}`,
                  border: `0.5px solid ${t.c.replace(')', ' / 0.18)')}`,
                  position: 'relative', overflow: 'hidden',
                  aspectRatio: '1 / 1',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                  <div style={{ fontSize: 9.5, color: t.deep, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>{n.name}</div>
                  <div>
                    <div className="mono" style={{ fontSize: 16, fontWeight: 600, color: t.deep, letterSpacing: -0.4, lineHeight: 1 }}>{n.pct}<span style={{ fontSize: 9, opacity: 0.7 }}>%</span></div>
                    {n.status === 'over' && <div style={{ fontSize: 8.5, color: t.deep, marginTop: 2 }}>over</div>}
                  </div>
                  {/* mini bar */}
                  <div style={{ height: 2, borderRadius: 2, background: 'rgba(20,20,30,0.06)', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, n.pct)}%`, height: '100%', background: t.c }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Deficiencies */}
      <SectionLabel action="Plan week →">Watch list</SectionLabel>
      <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {deficient.map(n => {
          const tone = pctToTone(n.pct);
          const t = TONES[tone];
          return (
            <Card key={n.id} padding={14} radius={20}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: t.soft, color: t.deep,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Geist Mono', fontWeight: 600, fontSize: 14,
                }}>{n.pct}%</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{n.name}</div>
                    <Pill tone={tone} size="sm">{n.status === 'low' ? 'low' : 'trending low'}</Pill>
                  </div>
                  {n.why && <div style={{ fontSize: 12, color: 'rgba(20,20,30,0.6)', marginTop: 3 }}>{n.why}</div>}
                  {/* swap suggestion */}
                  <div style={{
                    marginTop: 10, padding: '8px 10px', borderRadius: 12,
                    background: 'rgba(20,20,30,0.04)',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <Icons.spark size={12} style={{ color: t.deep }}/>
                    <div style={{ fontSize: 11.5, color: 'rgba(20,20,30,0.7)' }}>
                      Try: <span style={{ fontWeight: 600, color: '#15151b' }}>
                        {n.name === 'Magnesium' ? '1oz pumpkin seeds (37% DV)' :
                         n.name === 'Vit D' ? '4oz wild salmon + 12m sun' :
                         n.name === 'B6' ? 'chickpeas 1 cup (28% DV)' : 'leafy greens 2 cups'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Weekly trend */}
      <SectionLabel>Past 7 days</SectionLabel>
      <div style={{ padding: '0 14px 22px' }}>
        <Card padding={16} radius={22}>
          {[
            { name: 'Magnesium', vals: [42, 50, 48, 55, 58, 60, 58], tone: 'coral' },
            { name: 'Omega-3', vals: [60, 75, 65, 88, 90, 82, 88], tone: 'sage' },
            { name: 'Fiber', vals: [50, 60, 62, 65, 70, 72, 74], tone: 'gold' },
          ].map((row, i, a) => (
            <div key={row.name} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
              borderBottom: i < a.length - 1 ? '0.5px solid rgba(20,20,30,0.06)' : 'none',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500 }}>{row.name}</div>
                <div className="mono" style={{ fontSize: 10.5, color: 'rgba(20,20,30,0.5)', marginTop: 2 }}>
                  avg {Math.round(row.vals.reduce((a,b)=>a+b)/row.vals.length)}%
                </div>
              </div>
              <Spark data={row.vals} tone={row.tone} w={120} h={28}/>
              <div className="mono" style={{ fontSize: 11.5, fontWeight: 600, color: TONES[row.tone].deep, width: 30, textAlign: 'right' }}>{row.vals[row.vals.length-1]}%</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

window.ScreenNutrients = ScreenNutrients;
