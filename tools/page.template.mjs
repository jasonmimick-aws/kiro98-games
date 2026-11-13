// Kiro 98 Games — a late-90s desktop page for Kiro Crew.
// GENERATED into ui/index.mjs by tools/build.py; edit this template, not the output.
// Same host-module convention as Kiro Crew's own standalone apps: React comes from
// window.__kirocrew_modules, there is no JSX and no build step beyond embedding the
// games. Each game runs in a sandboxed iframe (scripts only, no same-origin), so it
// cannot touch the dashboard, its storage or its session.

const React = window.__kirocrew_modules.react
const { useState, useEffect, useRef, useCallback, createElement: h } = React

const GAMES = /*@@GAMES@@*/ {}
const GHOST = /*@@GHOST@@*/ ''
const CARDS = /*@@CARDS@@*/ ''
const VERSION = /*@@VERSION@@*/ ''

const FONT = 'Tahoma, "Segoe UI", system-ui, sans-serif'
const RAISED = 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf'
const PRESSED = 'inset 1px 1px #0a0a0a, inset -1px -1px #ffffff, inset 2px 2px #808080, inset -2px -2px #dfdfdf'
const SUNKEN = 'inset 1px 1px #808080, inset -1px -1px #ffffff'
const WINDOW = 'inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff'

const clock = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

function Btn({ pressed, style, ...rest }) {
  return h('button', {
    type: 'button',
    ...rest,
    style: {
      font: `12px ${FONT}`, color: '#000000', background: pressed ? '#dfdfdf' : '#c0c0c0',
      border: 0, boxShadow: pressed ? PRESSED : RAISED, cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 6, padding: '0 8px', height: 24, ...style,
    },
  })
}

function Clock() {
  const [t, setT] = useState(clock())
  useEffect(() => {
    const id = setInterval(() => setT(clock()), 15000)
    return () => clearInterval(id)
  }, [])
  return h('div', {
    style: { boxShadow: SUNKEN, height: 24, padding: '0 10px', display: 'flex', alignItems: 'center', color: '#000000' },
  }, t)
}

function DesktopIcon({ img, label, selected, onSelect, onOpen }) {
  return h('button', {
    type: 'button',
    title: `Double-click to open ${label}`,
    onClick: onSelect,
    onDoubleClick: onOpen,
    onKeyDown: (e) => { if (e.key === 'Enter') onOpen() },
    style: {
      width: 84, padding: 4, border: 0, background: 'transparent', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, font: `12px ${FONT}`,
      color: '#ffffff', outline: 'none',
    },
  },
  h('img', { src: img, alt: '', width: 40, height: 40, style: { imageRendering: 'pixelated', filter: selected ? 'brightness(.6) sepia(1) hue-rotate(190deg) saturate(4)' : 'none' } }),
  h('span', {
    style: {
      padding: '1px 3px', textAlign: 'center', lineHeight: 1.2,
      background: selected ? '#000080' : 'transparent', color: '#ffffff',
      outline: selected ? '1px dotted #ffffff' : 'none',
    },
  }, label))
}

function GameWindow({ id, visible, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const onMsg = (e) => {
      if (ref.current && e.source === ref.current.contentWindow && e.data && e.data.type === 'k98:close') onClose(id)
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [id, onClose])
  const doc = '<!doctype html><html><head><meta charset="utf-8">' +
    '<style>html,body{margin:0;background:transparent}body{padding:10px 0}</style>' +
    '<script>window.K98_EMBED=true<\/script></head><body>' + GAMES[id].html + '</body></html>'
  return h('iframe', {
    ref, title: GAMES[id].title, srcDoc: doc, sandbox: 'allow-scripts',
    style: {
      display: visible ? 'block' : 'none', position: 'absolute', top: 0, left: '50%',
      transform: 'translateX(-50%)', width: 'min(800px, calc(100% - 24px))', height: '100%',
      border: 0, background: 'transparent', colorScheme: 'normal', zIndex: 5,
    },
  })
}

function About({ onClose }) {
  return h('div', {
    role: 'dialog', 'aria-label': 'About Kiro 98',
    style: {
      position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%,-50%)', zIndex: 20,
      width: 'min(360px, 92%)', padding: 3, background: '#c0c0c0', color: '#000000',
      boxShadow: WINDOW + ', 4px 4px 0 rgba(0,0,0,.35)', font: `12px ${FONT}`,
    },
  },
  h('div', { style: { height: 22, padding: '0 4px', display: 'flex', alignItems: 'center', background: 'linear-gradient(90deg,#000080,#1084d0)', color: '#ffffff', fontWeight: 700 } }, 'About Kiro 98'),
  h('div', { style: { display: 'flex', gap: 14, padding: 14, alignItems: 'flex-start' } },
    h('img', { src: GHOST, alt: '', width: 42, height: 45, style: { imageRendering: 'pixelated' } }),
    h('div', { style: { lineHeight: 1.45 } },
      h('b', null, 'Kiro 98 Games'), ' ', VERSION, h('br'),
      'A late-90s desktop for Kiro Crew.', h('br'),
      'Pairs with the Kiro 98 theme pack.', h('br'),
      h('span', { style: { color: '#404040' } }, 'All art is original. Klondike is a public-domain card game.'))),
  h('div', { style: { display: 'flex', justifyContent: 'center', paddingBottom: 10 } },
    h(Btn, { onClick: onClose, style: { width: 76, justifyContent: 'center' } }, 'OK')))
}

export default function Kiro98Games() {
  const [open, setOpen] = useState({})            // id -> 'open' | 'min'
  const [active, setActive] = useState(null)
  const [selected, setSelected] = useState(null)
  const [menu, setMenu] = useState(false)
  const [about, setAbout] = useState(false)
  const startRef = useRef(null)

  const launch = useCallback((id) => {
    setOpen((o) => ({ ...o, [id]: 'open' })); setActive(id); setMenu(false); setSelected(null)
  }, [])
  const close = useCallback((id) => {
    setOpen((o) => { const n = { ...o }; delete n[id]; return n })
    setActive((a) => (a === id ? null : a))
  }, [])
  const toggle = (id) => {
    setOpen((o) => ({ ...o, [id]: o[id] === 'open' && active === id ? 'min' : 'open' }))
    setActive(id)
  }

  useEffect(() => {
    if (!menu) return
    const onDown = (e) => { if (startRef.current && !startRef.current.contains(e.target)) setMenu(false) }
    const onKey = (e) => { if (e.key === 'Escape') setMenu(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey) }
  }, [menu])

  const ids = Object.keys(GAMES)
  const item = (label, img, onClick) => h('button', {
    type: 'button', role: 'menuitem', onClick,
    style: {
      display: 'flex', alignItems: 'center', gap: 10, width: '100%', height: 34, padding: '0 10px',
      border: 0, background: 'transparent', color: '#000000', font: `12px ${FONT}`, cursor: 'pointer', textAlign: 'left',
    },
    onMouseEnter: (e) => { e.currentTarget.style.background = '#000080'; e.currentTarget.style.color = '#ffffff' },
    onMouseLeave: (e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000000' },
  }, h('img', { src: img, alt: '', width: 24, height: 24, style: { imageRendering: 'pixelated' } }), label)

  return h('div', {
    style: {
      flex: 1, minHeight: 480, height: '100%', display: 'flex', flexDirection: 'column',
      background: '#008080', color: '#ffffff', font: `12px ${FONT}`, userSelect: 'none', overflow: 'hidden',
    },
  },
  // Desktop
  h('div', {
    onPointerDown: (e) => { if (e.target === e.currentTarget) setSelected(null) },
    style: { position: 'relative', flex: 1, minHeight: 0 },
  },
  h('div', { style: { position: 'absolute', top: 12, left: 8, display: 'flex', flexDirection: 'column', gap: 14, zIndex: 1 } },
    ...ids.map((id) => h(DesktopIcon, {
      key: id, img: GAMES[id].icon === 'cards' ? CARDS : GHOST, label: GAMES[id].title,
      selected: selected === id, onSelect: () => setSelected(id), onOpen: () => launch(id),
    })),
    h(DesktopIcon, {
      img: GHOST, label: 'About Kiro 98', selected: selected === '_about',
      onSelect: () => setSelected('_about'), onOpen: () => { setAbout(true); setSelected(null) },
    })),
  ...ids.filter((id) => open[id]).map((id) => h(GameWindow, { key: id, id, visible: open[id] === 'open' && active === id, onClose: close })),
  about && h(About, { onClose: () => setAbout(false) })),
  // Taskbar
  h('div', {
    style: {
      position: 'relative', height: 32, flex: '0 0 32px', display: 'flex', alignItems: 'center', gap: 4,
      padding: '0 3px', background: '#c0c0c0', color: '#000000', boxShadow: 'inset 0 1px #dfdfdf, inset 0 2px #ffffff', zIndex: 30,
    },
  },
  h('div', { ref: startRef, style: { position: 'relative' } },
    h(Btn, { pressed: menu, 'aria-haspopup': 'menu', 'aria-expanded': menu, onClick: () => setMenu((m) => !m), style: { fontWeight: 700 } },
      h('img', { src: GHOST, alt: '', width: 16, height: 17, style: { imageRendering: 'pixelated' } }), 'Start'),
    menu && h('div', {
      role: 'menu',
      style: {
        position: 'absolute', bottom: 30, left: 0, display: 'flex', minWidth: 230, padding: 3,
        background: '#c0c0c0', color: '#000000', boxShadow: WINDOW + ', 2px 2px 0 rgba(0,0,0,.35)',
      },
    },
    h('div', {
      style: {
        width: 24, background: 'linear-gradient(0deg,#000080,#1084d0)', color: '#c0c0c0', display: 'flex',
        alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 6,
      },
    }, h('span', { style: { writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontWeight: 900, fontSize: 16, letterSpacing: 1 } },
      h('span', { style: { color: '#ffffff' } }, 'Kiro'), ' 98')),
    h('div', { style: { flex: 1, padding: '2px 0' } },
      ...ids.map((id) => item(GAMES[id].title, GAMES[id].icon === 'cards' ? CARDS : GHOST, () => launch(id))),
      h('div', { style: { margin: '3px 4px', borderTop: '1px solid #808080', borderBottom: '1px solid #ffffff' } }),
      item('About Kiro 98', GHOST, () => { setAbout(true); setMenu(false) })))),
  h('div', { style: { width: 2, height: 24, margin: '0 2px', boxShadow: 'inset 1px 0 #808080, inset -1px 0 #ffffff' } }),
  ...ids.filter((id) => open[id]).map((id) => h(Btn, {
    key: id, pressed: open[id] === 'open' && active === id, onClick: () => toggle(id),
    style: { width: 160, justifyContent: 'flex-start', fontWeight: open[id] === 'open' && active === id ? 700 : 400 },
  }, h('img', { src: GAMES[id].icon === 'cards' ? CARDS : GHOST, alt: '', width: 16, height: 16, style: { imageRendering: 'pixelated' } }), GAMES[id].title)),
  h('div', { style: { flex: 1 } }),
  h(Clock)))
}
