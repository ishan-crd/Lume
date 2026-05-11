// Home dashboard — Vitality score, recovery, macros, meals, AI insight
const { useState: useStateH } = React;

function ScreenHome({ goLog, goTab }) {
  const v = VITALITY;
  const m = MACROS_TODAY;
  const r = RECOVERY;
  const greet = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <div className="phone-scroll" style={{ height: '100%', overflowY: 'auto', paddingBottom: 110 }}>
      {/* Top bar */}
      <TopBar
        left={<Wordmark size={22} />}
        right={[
          <button key="streak" style={{
            display: 'flex', alignItems: 'center', gap: 4, height: 30, padding: '0 11px',
            borderRadius: 999, background: 'rgba(255,255,255,0.6)',
            border: '0.5px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
            fontSize: 13, fontWeight: 600,
          }}>
            <Icons.flame size={14} style={{ color: 'oklch(0.7 0.18 35)' }} />
            <span className="mono" style={{ letterSpacing: -0.4 }}>23</span>
          </button>,
          <button key="bell" style={{
            width: 30, height: 30, borderRadius: 999, background: 'rgba(255,255,255,0.6)',
            border: '0.5px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 9a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z" stroke="#15151b" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M10 20a2 2 0 0 0 4 0" stroke="#15151b" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>,
        ]}
      />

      {/* Greeting */}
      <div style={{ padding: '0 22px 16px' }}>
        <div style={{ fontSize: 14, color: 'rgba(20,20,30,0.5)', marginBottom: 2 }}>{greet}, Theo</div>
        <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.7, lineHeight: 1.1 }}>
          You're <span className="serif" style={{ fontWeight: 400 }}>trending up</span> — energy +12% this week.
        </div>
      </div>

      {/* Vitality hero card */}
      <div style={{ padding: '0 14px 14px' }}>
        <Card padding={20} radius={28} style={{
          background: 'linear-gradient(165deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <ArcGauge value={v.score} tone="sage" size={140} stroke={11}>
              <div className="mono" style={{ fontSize: 44, fontWeight: 600, letterSpacing: -2.5, lineHeight: 1 }}>
                {v.score}
              </div>
              <div style={{ fontSize: 10.5, color: 'rgba(20,20,30,0.5)', textTransform: 'uppercase', letterSpacing: 1.4, marginTop: 4 }}>
                Vitality
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3, fontSize: 11.5, color: 'oklch(0.5 0.13 155)', fontWeight: 600 }}>
                <Icons.arrowUp size={11}/> +{v.delta} today
              </div>
            </ArcGauge>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                { name: 'Nutrition', v: v.nutrition, tone: 'sage' },
                { name: 'Recovery',  v: v.recovery,  tone: 'peri' },
                { name: 'Activity',  v: v.activity,  tone: 'coral' },
              ].map(row => (
                <div key={row.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: 'rgba(20,20,30,0.6)' }}>{row.name}</span>
                    <span className="mono" style={{ fontWeight: 600, fontSize: 12 }}>{row.v}</span>
                  </div>
                  <Bar pct={row.v} tone={row.tone} height={5}/>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            marginTop: 16, paddingTop: 14, borderTop: '0.5px solid rgba(20,20,30,0.08)',
            display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: 'rgba(20,20,30,0.7)',
          }}>
            <div style={{ width: 26, height: 26, borderRadius: 13, background: 'oklch(0.94 0.05 280)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'oklch(0.4 0.15 280)' }}>
              <Icons.spark size={14}/>
            </div>
            <span><span style={{ fontWeight: 600, color: '#15151b' }}>Coach:</span> 18g more protein at lunch closes today's gap. Salmon would also help omega-3.</span>
          </div>
        </Card>
      </div>

      {/* Recovery + Calories row */}
      <div style={{ padding: '0 14px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Card padding={16} radius={22}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'oklch(0.5 0.13 275)', marginBottom: 8 }}>
            <Icons.heart size={14}/>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 600 }}>Recovery</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <div className="mono" style={{ fontSize: 38, fontWeight: 600, letterSpacing: -1.6, lineHeight: 1 }}>{r.score}</div>
            <div style={{ fontSize: 13, color: 'oklch(0.45 0.12 275)', fontWeight: 500 }}>{r.band}</div>
          </div>
          <div style={{ marginTop: 6, fontSize: 11.5, color: 'rgba(20,20,30,0.55)' }}>HRV {r.hrv.v}ms · RHR {r.rhr.v}</div>
          <div style={{ marginTop: 8 }}>
            <Spark data={[58,62,64,60,71,68,76]} tone="peri" w={130} h={28}/>
          </div>
        </Card>
        <Card padding={16} radius={22}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'oklch(0.55 0.16 30)', marginBottom: 8 }}>
            <Icons.flame size={14}/>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 600 }}>Calories</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
            <div className="mono" style={{ fontSize: 32, fontWeight: 600, letterSpacing: -1.4, lineHeight: 1 }}>{m.cal.v.toLocaleString()}</div>
            <div className="mono" style={{ fontSize: 13, color: 'rgba(20,20,30,0.45)' }}>/ {m.cal.goal.toLocaleString()}</div>
          </div>
          <div style={{ marginTop: 6, fontSize: 11.5, color: 'rgba(20,20,30,0.55)' }}>618 remaining · 332 burned</div>
          <div style={{ marginTop: 10 }}>
            <Bar pct={(m.cal.v/m.cal.goal)*100} tone="coral" height={6}/>
          </div>
        </Card>
      </div>

      {/* Macros + Hydration card */}
      <div style={{ padding: '0 14px 14px' }}>
        <Card padding={18} radius={22}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Today's macros</div>
            <Pill tone="ink" size="sm">{Math.round((m.protein.v/m.protein.goal)*100)}% protein</Pill>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { name: 'Protein', v: m.protein, tone: 'coral', ic: 'protein' },
              { name: 'Carbs',   v: m.carbs,   tone: 'gold',  ic: 'carbs' },
              { name: 'Fat',     v: m.fat,     tone: 'peri',  ic: 'fat' },
              { name: 'Fiber',   v: m.fiber,   tone: 'sage',  ic: 'fiber' },
            ].map(row => {
              const pct = (row.v.v / row.v.goal) * 100;
              const t = TONES[row.tone];
              return (
                <div key={row.name}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: t.deep, marginBottom: 4 }}>
                    {React.createElement(Icons[row.ic], { size: 11 })}
                    <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6 }}>{row.name}</div>
                  </div>
                  <div className="mono" style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.4 }}>{row.v.v}<span style={{ fontSize: 10, color: 'rgba(20,20,30,0.4)', marginLeft: 1 }}>{row.v.unit}</span></div>
                  <div style={{ marginTop: 6 }}><Bar pct={pct} tone={row.tone} height={4}/></div>
                  <div className="mono" style={{ fontSize: 9.5, color: 'rgba(20,20,30,0.42)', marginTop: 4 }}>{Math.round(pct)}% · /{row.v.goal}{row.v.unit}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Hydration tracker */}
      <div style={{ padding: '0 14px 14px' }}>
        <Card padding={16} radius={22}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 16, position: 'relative', overflow: 'hidden',
              background: 'linear-gradient(180deg, oklch(0.95 0.04 235), oklch(0.88 0.06 235))',
              border: '0.5px solid oklch(0.85 0.07 235)',
            }}>
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                height: `${(m.water.v/m.water.goal)*100}%`,
                background: 'linear-gradient(180deg, oklch(0.78 0.13 235), oklch(0.6 0.16 235))',
              }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icons.drop size={20} style={{ color: '#fff' }}/>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <div className="mono" style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.8 }}>{m.water.v}<span style={{ fontSize: 12 }}>oz</span></div>
                <div style={{ fontSize: 12, color: 'rgba(20,20,30,0.5)' }}>of {m.water.goal}oz</div>
              </div>
              <div style={{ fontSize: 11.5, color: 'rgba(20,20,30,0.55)', marginTop: 1 }}>+1 cup recommended after workout</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{ width: 32, height: 32, borderRadius: 999, border: 0, background: 'rgba(20,20,30,0.05)', color: '#15151b', fontSize: 16 }}>−</button>
              <button style={{ width: 32, height: 32, borderRadius: 999, border: 0, background: '#15151b', color: '#fff', fontSize: 16 }}>+</button>
            </div>
          </div>
          {/* 8 cup pips */}
          <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const filled = i < Math.round((m.water.v / 8));
              return (
                <div key={i} style={{
                  flex: 1, height: 5, borderRadius: 3,
                  background: filled ? 'linear-gradient(180deg, oklch(0.78 0.13 235), oklch(0.6 0.16 235))' : 'rgba(20,20,30,0.07)',
                }}/>
              );
            })}
          </div>
        </Card>
      </div>

      {/* AI Insight */}
      <SectionLabel action={<span onClick={()=>goTab('insights')} style={{cursor:'pointer'}}>See all →</span>}>For you · powered by Lume AI</SectionLabel>
      <div style={{ padding: '0 14px 22px' }}>
        <Card padding={18} radius={22} tint="peri">
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12, flexShrink: 0,
              background: 'linear-gradient(150deg, oklch(0.72 0.14 275), oklch(0.55 0.18 285))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              boxShadow: '0 4px 12px -4px oklch(0.5 0.16 275 / 0.5)',
            }}>
              <Icons.spark size={18}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'oklch(0.42 0.12 275)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2 }}>Correlation insight · 86% conf.</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, lineHeight: 1.3 }}>Your afternoon fatigue tracks with magnesium</div>
              <div style={{ fontSize: 12.5, color: 'rgba(20,20,30,0.65)', marginTop: 4, lineHeight: 1.45 }}>On days you log under 60% Mg, you rate energy 1.8 pts lower by 3 PM. Pumpkin seeds at snack would close it.</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button style={{
                  height: 30, padding: '0 12px', borderRadius: 999, border: 0,
                  background: '#15151b', color: '#fff', fontSize: 12, fontWeight: 500,
                }}>Add to plan</button>
                <button style={{
                  height: 30, padding: '0 12px', borderRadius: 999, border: '0.5px solid rgba(20,20,30,0.15)',
                  background: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500,
                }}>Dismiss</button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Today's meals */}
      <SectionLabel action={<span onClick={goLog} style={{cursor:'pointer'}}>+ Log meal</span>}>Today's meals</SectionLabel>
      <div style={{ padding: '0 14px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {TODAY_MEALS.map(meal => (
          <Card key={meal.id} padding={12} radius={18}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ImgSlot w={54} h={54} label={meal.name.split(' ')[0]} radius={14} swatch={meal.swatch}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: -0.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{meal.name}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'rgba(20,20,30,0.5)', flexShrink: 0 }}>{meal.time}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, fontSize: 11.5, color: 'rgba(20,20,30,0.6)' }}>
                  <span className="mono"><b style={{ color: '#15151b', fontWeight: 600 }}>{meal.cal}</b> cal</span>
                  <span style={{ width: 3, height: 3, borderRadius: 3, background: 'rgba(20,20,30,0.2)' }}/>
                  <span className="mono">P{meal.p} · C{meal.c} · F{meal.f}</span>
                </div>
                <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                  {Object.entries(meal.micros).slice(0, 3).map(([k, v]) => (
                    <Pill key={k} tone={v > 50 ? 'sage' : 'gold'} size="sm">{k}{typeof v === 'number' && v > 5 ? ` ${v}%` : ''}</Pill>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
        <button onClick={goLog} style={{
          height: 50, border: '1px dashed rgba(20,20,30,0.18)', borderRadius: 18,
          background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)',
          color: 'rgba(20,20,30,0.7)', fontSize: 13, fontWeight: 500,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Icons.plus size={16}/> Log dinner
        </button>
      </div>

      {/* Wearables glance */}
      <SectionLabel action={<span onClick={()=>goTab('you')} style={{cursor:'pointer'}}>Manage →</span>}>Wearables</SectionLabel>
      <div style={{ padding: '0 14px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Card padding={14} radius={18} tint="peri">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icons.band size={16} style={{ color: 'oklch(0.42 0.12 275)'}}/>
            <div style={{ fontSize: 12.5, fontWeight: 600 }}>WHOOP 5.0</div>
            <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: 6, background: 'oklch(0.65 0.16 155)' }} className="pulse-soft"/>
          </div>
          <div style={{ fontSize: 10.5, color: 'rgba(20,20,30,0.55)', marginTop: 4 }}>Synced 2m · Recovery 76</div>
          <div style={{ marginTop: 8 }}><Spark data={[64,68,71,66,70,74,76]} tone="peri" w={140} h={24}/></div>
        </Card>
        <Card padding={14} radius={18} tint="coral">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icons.watch size={16} style={{ color: 'oklch(0.5 0.15 28)'}}/>
            <div style={{ fontSize: 12.5, fontWeight: 600 }}>Apple Watch</div>
            <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: 6, background: 'oklch(0.65 0.16 155)' }} className="pulse-soft"/>
          </div>
          <div style={{ fontSize: 10.5, color: 'rgba(20,20,30,0.55)', marginTop: 4 }}>HR 62 · 8,420 steps</div>
          <div style={{ marginTop: 8 }}><Spark data={[55,58,62,60,72,68,62]} tone="coral" w={140} h={24}/></div>
        </Card>
      </div>
    </div>
  );
}

window.ScreenHome = ScreenHome;
