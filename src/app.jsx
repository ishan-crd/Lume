// App shell — tab routing + tweaks
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/{
  "accentHue": 155,
  "bgVibe": "aurora",
  "glassStrength": 20,
  "showTabLabels": true,
  "compact": false
}/*EDITMODE-END*/;

const BG_OPTIONS = {
  aurora: `
    radial-gradient(1200px 800px at 8% -10%,  oklch(0.94 0.045 60 / 1) 0%, transparent 55%),
    radial-gradient(1100px 900px at 95% 15%,  oklch(0.93 0.06 295 / 1) 0%, transparent 55%),
    radial-gradient(1300px 900px at 50% 110%, oklch(0.94 0.05 165 / 1) 0%, transparent 55%),
    #f4f1ec`,
  dawn: `
    radial-gradient(1200px 900px at 10% -10%, oklch(0.94 0.07 50) 0%, transparent 55%),
    radial-gradient(1100px 900px at 95% 20%, oklch(0.92 0.08 25) 0%, transparent 55%),
    radial-gradient(1300px 900px at 50% 120%, oklch(0.92 0.06 320) 0%, transparent 55%),
    #faf0ea`,
  mist: `
    radial-gradient(1300px 1000px at 30% -10%, oklch(0.96 0.025 220) 0%, transparent 55%),
    radial-gradient(1100px 900px at 90% 30%, oklch(0.95 0.03 280) 0%, transparent 55%),
    radial-gradient(1300px 900px at 50% 120%, oklch(0.96 0.02 180) 0%, transparent 55%),
    #f1f3f6`,
  meadow: `
    radial-gradient(1200px 900px at 10% -10%, oklch(0.95 0.06 155) 0%, transparent 55%),
    radial-gradient(1100px 900px at 95% 20%, oklch(0.95 0.05 90) 0%, transparent 55%),
    radial-gradient(1300px 900px at 50% 120%, oklch(0.94 0.06 195) 0%, transparent 55%),
    #f3f6ef`,
};

function App() {
  const [tab, setTab] = useStateA('home');
  const [t, setTweak] = useTweaks(TWEAK_DEFAULS);

  // apply bg vibe globally
  useEffectA(() => {
    document.body.style.background = BG_OPTIONS[t.bgVibe] || BG_OPTIONS.aurora;
    document.body.style.backgroundAttachment = 'fixed';
  }, [t.bgVibe]);

  // glass strength var
  useEffectA(() => {
    document.documentElement.style.setProperty('--glass-blur', `${t.glassStrength}px`);
  }, [t.glassStrength]);

  const goTab = (id) => setTab(id);
  const goLog = () => setTab('log');

  return (
    <div className="stage">
      <IOSDevice width={402} height={874} dark={false}>
        <div data-screen-label={`${tab}`} style={{ position: 'relative', height: '100%', width: '100%' }}>
          {tab === 'home' && <ScreenHome goLog={goLog} goTab={goTab}/>}
          {tab === 'nutrients' && <ScreenNutrients/>}
          {tab === 'log' && <ScreenLog goBack={() => setTab('home')}/>}
          {tab === 'insights' && <ScreenInsights/>}
          {tab === 'you' && <ScreenProfile/>}
          <TabBar tab={tab} setTab={setTab} onLog={() => setTab('log')}/>
        </div>
      </IOSDevice>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Atmosphere">
          <TweakRadio label="Background vibe" value={t.bgVibe} onChange={v => setTweak('bgVibe', v)}
            options={[
              {value:'aurora',label:'Aurora'},
              {value:'dawn',label:'Dawn'},
              {value:'mist',label:'Mist'},
              {value:'meadow',label:'Meadow'},
            ]}/>
          <TweakSlider label="Glass blur" value={t.glassStrength} min={6} max={36} step={1}
            onChange={v => setTweak('glassStrength', v)}/>
        </TweakSection>
        <TweakSection title="Navigation">
          <TweakRadio label="Active screen" value={tab} onChange={v => setTab(v)}
            options={[
              {value:'home',label:'Home'},
              {value:'log',label:'Log'},
              {value:'nutrients',label:'Nutrients'},
              {value:'insights',label:'Insights'},
              {value:'you',label:'You'},
            ]}/>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
