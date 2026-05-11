// Line icons — 1.6 stroke, currentColor, rounded ends. Pixel-honest.
const Ic = ({ d, size = 20, sw = 1.6, fill = "none", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill={fill==="none"?"none":"currentColor"}/>) : <path d={d} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill={fill==="none"?"none":"currentColor"}/>}
  </svg>
);

const Icons = {
  // tab bar
  home: (p) => <Ic d="M3.5 11.2 12 4l8.5 7.2V20a1 1 0 0 1-1 1h-4v-6h-7v6h-4a1 1 0 0 1-1-1Z" {...p} />,
  plus: (p) => <Ic d={["M12 5v14", "M5 12h14"]} sw={2} {...p} />,
  chart: (p) => <Ic d={["M4 20V8", "M10 20V4", "M16 20v-6", "M22 20H2"]} {...p} />,
  spark: (p) => <Ic d={["M12 3l1.8 4.7L18.5 9l-4.7 1.8L12 15l-1.8-4.2L5.5 9l4.7-1.3L12 3Z","M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7L19 16Z"]} {...p}/>,
  user: (p) => <Ic d={["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"]} {...p}/>,
  // actions
  camera: (p) => <Ic d={["M4 8a2 2 0 0 1 2-2h2l1.5-2h5L16 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z","M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"]} {...p}/>,
  barcode: (p) => <Ic d={["M3 6v12","M6 6v12","M9 6v8","M9 16v2","M12 6v12","M15 6v12","M18 6v8","M18 16v2","M21 6v12"]} {...p}/>,
  search: (p) => <Ic d={["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z","M21 21l-4.3-4.3"]} {...p}/>,
  edit: (p) => <Ic d={["M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"]} {...p}/>,
  // food
  protein: (p) => <Ic d={["M15 4a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5h-1l-7 7-3-3 7-7v-1a5 5 0 0 1 5-5h-1Z","M5 21l-2-2"]} {...p}/>,
  carbs: (p) => <Ic d={["M12 3v18","M8 7l4 2 4-2","M7 12l5 2 5-2","M8 17l4 2 4-2"]} {...p}/>,
  fat: (p) => <Ic d={["M12 3c4 5 6 8 6 11a6 6 0 1 1-12 0c0-3 2-6 6-11Z","M9 14a3 3 0 0 0 3 3"]} {...p}/>,
  fiber: (p) => <Ic d={["M4 12c4 0 4-4 8-4s4 4 8 4","M4 17c4 0 4-4 8-4s4 4 8 4","M4 7c4 0 4-4 8-4s4 4 8 4"]} {...p}/>,
  omega: (p) => <Ic d={["M5 18h3l1.5-3-3-7c-1.5-3 1-5.5 4-4.5 3 1 5 5 5 9 0 2-1 5-4 5h-1","M12 11c2 0 4 1 4 3"]} {...p}/>,
  // body / vitals
  heart: (p) => <Ic d={["M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"]} {...p}/>,
  hrv: (p) => <Ic d={["M3 12h3l2-5 3 10 2-7 2 4 2-2h4"]} {...p}/>,
  moon: (p) => <Ic d={["M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"]} {...p}/>,
  drop: (p) => <Ic d={["M12 3c4 5 6 8 6 11a6 6 0 1 1-12 0c0-3 2-6 6-11Z"]} {...p}/>,
  bolt: (p) => <Ic d={["M13 3 4 14h6l-1 7 9-11h-6l1-7Z"]} {...p}/>,
  steps: (p) => <Ic d={["M8 16c-1 1-3 4-3 5h4l1-3","M14 11c-1 1-3 4-3 5h4l1-3","M9 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z","M15 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"]} sw={1.5} {...p}/>,
  flame: (p) => <Ic d={["M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 1 0 2-1 1-3-1-3 0-5 0-6Z"]} {...p}/>,
  // misc
  chev: (p) => <Ic d="M9 6l6 6-6 6" sw={2} {...p}/>,
  chevDown: (p) => <Ic d="M6 9l6 6 6-6" sw={2} {...p}/>,
  close: (p) => <Ic d={["M6 6l12 12","M18 6 6 18"]} sw={2} {...p}/>,
  check: (p) => <Ic d="M4 12l5 5L20 6" sw={2} {...p}/>,
  info: (p) => <Ic d={["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z","M12 8h.01","M11 12h1v5h1"]} {...p}/>,
  arrow: (p) => <Ic d={["M5 12h14","M13 5l7 7-7 7"]} {...p}/>,
  arrowUp: (p) => <Ic d={["M12 19V5","M5 12l7-7 7 7"]} {...p}/>,
  arrowDown: (p) => <Ic d={["M12 5v14","M5 12l7 7 7-7"]} {...p}/>,
  // wearable brand glyphs (abstracted, original — not real logos)
  watch: (p) => <Ic d={["M7 7h10v10H7z","M9 4h6l-.5 3h-5L9 4Z","M9 20h6l-.5-3h-5L9 20Z"]} {...p}/>,
  band: (p) => <Ic d={["M4 9a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z","M9 12h6"]} {...p}/>,
  ring: (p) => <Ic d={["M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z","M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"]} {...p}/>,
  // ui
  filter: (p) => <Ic d={["M4 5h16","M7 12h10","M10 19h4"]} sw={2} {...p}/>,
  lock: (p) => <Ic d={["M6 11h12v9H6z","M8 11V8a4 4 0 1 1 8 0v3"]} {...p}/>,
  refresh: (p) => <Ic d={["M21 12a9 9 0 1 1-3-6.7","M21 4v5h-5"]} {...p}/>,
  pill: (p) => <Ic d={["M3.5 13.5 13.5 3.5a5 5 0 0 1 7 7L10.5 20.5a5 5 0 0 1-7-7Z","M8.5 8.5l7 7"]} {...p}/>,
  flask: (p) => <Ic d={["M9 3h6","M10 3v6L4 19a2 2 0 0 0 1.7 3h12.6A2 2 0 0 0 20 19L14 9V3","M7 14h10"]} {...p}/>,
  mic: (p) => <Ic d={["M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z","M5 12a7 7 0 0 0 14 0","M12 19v3"]} {...p}/>,
  flash: (p) => <Ic d={["M13 3 4 14h6l-1 7 9-11h-6l1-7Z"]} sw={1.4} {...p}/>,
  grid: (p) => <Ic d={["M4 4h7v7H4z","M13 4h7v7h-7z","M4 13h7v7H4z","M13 13h7v7h-7z"]} {...p}/>,
};

window.Icons = Icons;
