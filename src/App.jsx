import React, { useState, useMemo, useEffect, useReducer, useRef, useCallback } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

/* ═══ v14: helpers de log e fetch com timeout ═══ */
var __isDev = (function(){
  try {
    var h = (typeof window!=="undefined" && window.location ? window.location.hostname : "");
    return h === "localhost" || h === "127.0.0.1" || (h && h.indexOf(".local") !== -1);
  } catch(e){ return false; }
})();
var logErr = function(prefix, e){
  if (__isDev && typeof console !== "undefined") {
    try { console.error(prefix, e && e.message ? e.message : e); } catch(_){}
  }
};
var fetchT = function(url, opts, timeoutMs){
  timeoutMs = timeoutMs || 30000;
  return new Promise(function(resolve, reject){
    var ctrl = (typeof AbortController !== "undefined") ? new AbortController() : null;
    var to = setTimeout(function(){ if (ctrl) ctrl.abort(); else reject(new Error("timeout")); }, timeoutMs);
    var o = Object.assign({}, opts || {});
    if (ctrl && !o.signal) o.signal = ctrl.signal;
    fetch(url, o).then(function(r){ clearTimeout(to); resolve(r); }, function(e){ clearTimeout(to); reject(e); });
  });
};

import { Search, Bell, Calendar, Upload, Sun, Moon, Clock, AlertTriangle, CheckCircle, Users, TrendingUp, ChevronRight, ChevronLeft, Plus, Filter, Inbox, Settings, BarChart3, Zap, Shield, Target, Activity, Layers, MapPin, Plane, Gavel, X, ChevronDown, CalendarDays, Scale, FolderOpen, LayoutDashboard, Timer, Tag, Flame, Edit3, Trash2, Columns3, LayoutGrid, Table2, GripVertical, Save, PenLine, Download, StickyNote, DollarSign, Eye, Link, Pencil, BarChart2, Copy, FileText, ClipboardCheck, History } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════
   COJUR NEXUS · VISUAL UPGRADE PACK v1 · INLINE (single-file)
   Componentes drop-in: BootScreen, AmbientParticles, HUDChassis,
   Tilt, HoloHero, TokamakHero, DNANexus, GlitchNum, RingProgress,
   TerminalAI, KPIFlip, ModoComando, TorresPrazo, TimelinePrism.
   Namespace CSS "cn-" (sem colisao com "cj-" do app).
   ═══════════════════════════════════════════════════════════════════════ */
const CN_UPGRADE_CSS = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');
:root{--cn-ac:#00e5ff;--cn-pu:#b84dff;--cn-su:#00ff88;--cn-cr:#ff2e5b;--cn-wa:#ffb800;--cn-bg:#020208;--cn-txt:#e2e8f0;--cn-dim:#94a3b8;--cn-dim2:#64748b}
@keyframes cn-float3d{0%,100%{transform:translateY(0) rotateX(8deg) rotateY(-12deg)}50%{transform:translateY(-8px) rotateX(8deg) rotateY(-12deg)}}
@keyframes cn-flicker{0%,100%{opacity:.96}3%{opacity:.7}5%{opacity:.97}50%{opacity:.93}}
@keyframes cn-scanV{0%{transform:translateY(-100%)}100%{transform:translateY(420%)}}
@keyframes cn-orbitS{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes cn-orbitR{from{transform:rotate(360deg)}to{transform:rotate(0)}}
@keyframes cn-pulse{0%,100%{box-shadow:0 0 20px rgba(0,229,255,.3),0 0 40px rgba(0,229,255,.15)}50%{box-shadow:0 0 36px rgba(0,229,255,.7),0 0 90px rgba(0,229,255,.35)}}
@keyframes cn-pulseCr{0%,100%{box-shadow:0 0 18px rgba(255,46,91,.5),0 0 40px rgba(255,46,91,.2)}50%{box-shadow:0 0 36px rgba(255,46,91,.9),0 0 80px rgba(255,46,91,.5)}}
@keyframes cn-spinTilt{from{transform:rotateX(15deg) rotateY(0)}to{transform:rotateX(15deg) rotateY(360deg)}}
@keyframes cn-dot{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes cn-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,-30px)}}
@keyframes cn-drift2{0%,100%{transform:translate(0,0)}50%{transform:translate(-30px,40px)}}
@keyframes cn-glitch{0%,100%{clip-path:inset(0 0 0 0)}10%{clip-path:inset(20% 0 30% 0)}20%{clip-path:inset(60% 0 5% 0)}30%{clip-path:inset(0 0 0 0)}}
@keyframes cn-typewrite{from{width:0}to{width:100%}}
@keyframes cn-blink{50%{opacity:0}}
@keyframes cn-rain{0%{transform:translateY(-30px);opacity:0}10%{opacity:.7}90%{opacity:.7}100%{transform:translateY(110vh);opacity:0}}
@keyframes cn-helixL{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}
@keyframes cn-helixR{from{transform:rotateY(360deg)}to{transform:rotateY(0)}}
@keyframes cn-ringExpand{0%{transform:scale(.5);opacity:1}100%{transform:scale(1.6);opacity:0}}
.cn-particles{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.cn-particles .cn-p{position:absolute;width:3px;height:3px;border-radius:50%;background:var(--cn-ac);box-shadow:0 0 8px var(--cn-ac);animation:cn-drift 8s ease-in-out infinite}
.cn-particles .cn-p.pu{background:var(--cn-pu);box-shadow:0 0 8px var(--cn-pu);animation-name:cn-drift2}
.cn-particles .cn-p.su{background:var(--cn-su);box-shadow:0 0 8px var(--cn-su)}
.cn-particles .cn-blob{position:absolute;width:600px;height:600px;border-radius:50%;filter:blur(120px);opacity:.18}
.cn-particles .cn-blob.b1{background:#00e5ff;left:-200px;top:-100px;animation:cn-drift 22s ease-in-out infinite}
.cn-particles .cn-blob.b2{background:#b84dff;right:-200px;top:30%;animation:cn-drift2 28s ease-in-out infinite}
.cn-particles .cn-scanH{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,229,255,.4),transparent);box-shadow:0 0 10px rgba(0,229,255,.3);animation:cn-scanV 14s linear infinite}
.cn-boot{position:fixed;inset:0;z-index:99999;background:#020208;display:grid;place-items:center;overflow:hidden}
.cn-boot::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0,transparent 3px,rgba(0,229,255,.03) 3px,rgba(0,229,255,.03) 4px);pointer-events:none;z-index:6}
.cn-boot::after{content:"";position:absolute;left:0;right:0;height:120px;background:linear-gradient(180deg,transparent,rgba(0,229,255,.12),transparent);animation:cn-bootScan 3.2s linear infinite;pointer-events:none;z-index:5}
@keyframes cn-bootScan{from{top:-120px}to{top:100vh}}
.cn-boot.cn-boot-out{animation:cn-bootOut .7s forwards}
@keyframes cn-bootOut{to{opacity:0;visibility:hidden;transform:scale(1.06)}}
.cn-boot .cn-rain-col{position:absolute;top:-30px;font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--cn-ac);text-shadow:0 0 8px var(--cn-ac);writing-mode:vertical-rl;animation:cn-rain 4s linear infinite;letter-spacing:.1em;opacity:.7}
.cn-boot .cn-boot-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,229,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,.04) 1px,transparent 1px);background-size:50px 50px;-webkit-mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%);mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%);animation:cn-flicker 6s ease-in-out infinite}
.cn-boot .cn-boot-corner{position:absolute;width:48px;height:48px;border:2px solid var(--cn-ac);box-shadow:0 0 14px rgba(0,229,255,.6);z-index:6}
.cn-boot .cn-boot-corner.tl{top:32px;left:32px;border-right:none;border-bottom:none;border-radius:10px 0 0 0}
.cn-boot .cn-boot-corner.tr{top:32px;right:32px;border-left:none;border-bottom:none;border-radius:0 10px 0 0}
.cn-boot .cn-boot-corner.bl{bottom:32px;left:32px;border-right:none;border-top:none;border-radius:0 0 0 10px}
.cn-boot .cn-boot-corner.br{bottom:32px;right:32px;border-left:none;border-top:none;border-radius:0 0 10px 0}
.cn-boot .cn-boot-meta{position:absolute;top:32px;left:50%;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--cn-ac);letter-spacing:.4em;padding:6px 18px;background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.4);border-radius:4px;z-index:6}
.cn-boot .cn-boot-meta::before{content:"";display:inline-block;width:6px;height:6px;background:var(--cn-ac);border-radius:50%;margin-right:10px;vertical-align:middle;animation:cn-dot 1s infinite;box-shadow:0 0 8px var(--cn-ac)}
.cn-boot .cn-boot-foot{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--cn-dim2);letter-spacing:.18em;display:flex;gap:24px;z-index:6;text-transform:uppercase}
.cn-boot .cn-boot-foot span b{color:var(--cn-ac);font-weight:400}
.cn-boot .cn-boot-logo{position:relative;z-index:7;text-align:center;padding:40px 60px;background:radial-gradient(ellipse at center,rgba(2,5,15,.85),transparent 70%);backdrop-filter:blur(2px)}
.cn-boot .cn-boot-logo h1{font-family:'Orbitron',sans-serif;font-size:54px;font-weight:900;letter-spacing:.4em;color:#fff;text-shadow:0 0 24px var(--cn-ac),0 0 48px rgba(0,229,255,.5);margin-bottom:14px;position:relative;display:inline-block;animation:cn-flicker 4s ease-in-out infinite}
.cn-boot .cn-boot-logo h1::before,.cn-boot .cn-boot-logo h1::after{content:attr(data-text);position:absolute;left:0;top:0;width:100%;height:100%}
.cn-boot .cn-boot-logo h1::before{color:var(--cn-cr);transform:translate(-2px,0);clip-path:inset(20% 0 30% 0);animation:cn-glitch 3s infinite;opacity:.7}
.cn-boot .cn-boot-logo h1::after{color:var(--cn-ac);transform:translate(2px,0);clip-path:inset(60% 0 5% 0);animation:cn-glitch 3s infinite reverse;opacity:.7}
.cn-boot .cn-boot-logo .sub{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--cn-ac);letter-spacing:.35em;opacity:.85;text-transform:uppercase}
.cn-boot .cn-boot-bar{margin-top:32px;width:340px;height:3px;background:rgba(0,229,255,.12);border-radius:3px;overflow:hidden;margin-left:auto;margin-right:auto;border:1px solid rgba(0,229,255,.25);box-shadow:0 0 14px rgba(0,229,255,.2)}
.cn-boot .cn-boot-bar div{height:100%;background:linear-gradient(90deg,var(--cn-ac),var(--cn-pu),var(--cn-cr));box-shadow:0 0 14px var(--cn-ac);animation:cn-bootBar 1.8s ease-out forwards}
@keyframes cn-bootBar{from{width:0}to{width:100%}}
.cn-boot .cn-boot-status{margin-top:14px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--cn-su);letter-spacing:.18em;text-transform:uppercase;height:14px}
.cn-boot .cn-boot-hex{position:absolute;width:60px;height:68px;background:linear-gradient(135deg,rgba(0,229,255,.15),rgba(184,77,255,.05));clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);border:1px solid rgba(0,229,255,.3);animation:cn-flicker 3s ease-in-out infinite}
.cn-tilt{transform-style:preserve-3d;transition:transform .15s ease;perspective:1000px}
.cn-tilt::before{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(circle 240px at var(--mx,50%) var(--my,30%),rgba(0,229,255,.18),transparent 60%);pointer-events:none;opacity:0;transition:opacity .25s ease;z-index:1}
.cn-tilt[data-active="1"]::before{opacity:1}
.cn-glitch{position:relative;display:inline-block;color:#fff;text-shadow:0 0 14px var(--cn-cr)}
.cn-glitch::before,.cn-glitch::after{content:attr(data-text);position:absolute;left:0;top:0;width:100%;height:100%}
.cn-glitch::before{color:var(--cn-cr);transform:translate(-2px,0);clip-path:inset(20% 0 30% 0);animation:cn-glitch 3s infinite}
.cn-glitch::after{color:var(--cn-ac);transform:translate(2px,0);clip-path:inset(60% 0 5% 0);animation:cn-glitch 3s infinite reverse}
.cn-term{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--cn-su);background:rgba(0,255,136,.04);padding:14px;border-radius:8px;border:1px solid rgba(0,255,136,.25);line-height:1.7;box-shadow:0 0 24px rgba(0,255,136,.1) inset}
.cn-term .cn-term-line{overflow:hidden;white-space:nowrap;border-right:2px solid var(--cn-su);animation:cn-typewrite 1.6s steps(40,end) forwards,cn-blink .7s step-end infinite}
.cn-term .cn-term-line.done{border-right:none;animation:cn-typewrite 1.6s steps(40,end) forwards}
.cn-term .cn-term-prompt::before{content:"$ ";color:var(--cn-ac);font-weight:700}
.cn-ring-progress{position:relative;display:inline-block}
.cn-ring-progress svg{transform:rotate(-90deg);filter:drop-shadow(0 0 6px var(--cn-su))}
.cn-ring-progress .cn-ring-v{position:absolute;inset:0;display:grid;place-items:center;font-family:'Space Grotesk',sans-serif;font-weight:700;color:#fff}
.cn-flip{perspective:900px;cursor:pointer}
.cn-flip-inner{position:relative;width:100%;height:100%;transition:transform .65s cubic-bezier(.2,.8,.3,1);transform-style:preserve-3d}
.cn-flip:hover .cn-flip-inner,.cn-flip.flipped .cn-flip-inner{transform:rotateY(180deg)}
.cn-flip-face{position:absolute;inset:0;-webkit-backface-visibility:hidden;backface-visibility:hidden;display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:inherit}
.cn-flip-back{transform:rotateY(180deg)}
.cn-holo-stage{height:480px;display:grid;place-items:center;perspective:1400px;position:relative;overflow:hidden;border-radius:20px;background:radial-gradient(ellipse at center,rgba(0,229,255,.05),transparent 70%);border:1px solid rgba(0,229,255,.15)}
.cn-holo-floor{position:absolute;bottom:0;left:0;right:0;height:55%;background:repeating-linear-gradient(90deg,transparent 0,transparent 49px,rgba(0,229,255,.16) 49px,rgba(0,229,255,.16) 50px),repeating-linear-gradient(0deg,transparent 0,transparent 49px,rgba(0,229,255,.1) 49px,rgba(0,229,255,.1) 50px);transform:perspective(700px) rotateX(70deg) translateY(50%);transform-origin:center bottom;-webkit-mask-image:linear-gradient(to top,black 30%,transparent 100%);mask-image:linear-gradient(to top,black 30%,transparent 100%)}
.cn-holo-ghost{position:absolute;width:380px;padding:24px;border-radius:18px;background:linear-gradient(135deg,rgba(0,229,255,.04),rgba(184,77,255,.02));border:1px solid rgba(0,229,255,.12);color:var(--cn-dim);font-size:13px;pointer-events:none}
.cn-holo-ghost.g1{transform:rotateX(8deg) rotateY(-12deg) translate3d(28px,22px,-60px);opacity:.5}
.cn-holo-ghost.g2{transform:rotateX(8deg) rotateY(-12deg) translate3d(56px,44px,-120px);opacity:.25}
.cn-holo-card{width:380px;padding:30px;border-radius:18px;position:relative;background:linear-gradient(135deg,rgba(0,229,255,.15),rgba(184,77,255,.1));border:1px solid rgba(0,229,255,.5);backdrop-filter:blur(14px);box-shadow:0 0 0 1px rgba(255,255,255,.05) inset,0 0 50px rgba(0,229,255,.3),0 30px 80px rgba(0,229,255,.2),0 60px 120px rgba(0,0,0,.7);animation:cn-float3d 5s ease-in-out infinite,cn-flicker 8s ease-in-out infinite;transform-style:preserve-3d}
.cn-holo-card::before{content:"";position:absolute;inset:0;border-radius:18px;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,229,255,.04) 2px,rgba(0,229,255,.04) 3px)}
.cn-holo-card::after{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,transparent,var(--cn-ac),transparent);box-shadow:0 0 14px var(--cn-ac);animation:cn-scanV 3s linear infinite}
.cn-tok{height:520px;display:grid;place-items:center;background:radial-gradient(ellipse at center,rgba(0,229,255,.08),transparent 60%);border-radius:20px;border:1px solid rgba(0,229,255,.15);position:relative;overflow:hidden}
.cn-tok-ring{position:absolute;border-radius:50%;border:1px solid;box-shadow:0 0 30px rgba(0,229,255,.06) inset}
.cn-tok-ring.r1{width:460px;height:460px;border-color:rgba(0,229,255,.3);animation:cn-orbitS 24s linear infinite}
.cn-tok-ring.r2{width:340px;height:340px;border-color:rgba(184,77,255,.3);animation:cn-orbitR 16s linear infinite}
.cn-tok-ring.r3{width:220px;height:220px;border-color:rgba(0,255,136,.3);animation:cn-orbitS 9s linear infinite}
.cn-tok-core{width:130px;height:130px;border-radius:50%;background:radial-gradient(circle,rgba(0,229,255,.7),rgba(0,229,255,.1) 60%,transparent);display:grid;place-items:center;text-align:center;box-shadow:0 0 70px rgba(0,229,255,.6),0 0 140px rgba(0,229,255,.3);animation:cn-pulse 2.4s ease infinite;z-index:5;position:relative}
.cn-tok-core::before{content:"";position:absolute;inset:-20px;border-radius:50%;border:1px dashed rgba(0,229,255,.3);animation:cn-orbitS 20s linear infinite}
.cn-tok-core .n{font-family:'Space Grotesk',sans-serif;font-size:42px;font-weight:800;color:#fff;text-shadow:0 0 20px var(--cn-ac);line-height:1}
.cn-tok-core .l{font-family:'JetBrains Mono',monospace;font-size:9px;color:rgba(255,255,255,.7);letter-spacing:.18em;margin-top:2px}
.cn-tok-pip{position:absolute;width:14px;height:14px;border-radius:50%;border:2px solid;background:rgba(2,3,12,.8);transition:transform .2s ease}
.cn-tok-pip:hover{transform:scale(1.5)}
.cn-tok-pip.cr{border-color:var(--cn-cr);box-shadow:0 0 14px var(--cn-cr);animation:cn-pulseCr 1.4s ease infinite}
.cn-tok-pip.wa{border-color:var(--cn-wa);box-shadow:0 0 12px var(--cn-wa)}
.cn-tok-pip.ok{border-color:var(--cn-su);box-shadow:0 0 12px var(--cn-su)}
.cn-tok-pip.ac{border-color:var(--cn-ac);box-shadow:0 0 12px var(--cn-ac)}
.cn-tok-pip.pu{border-color:var(--cn-pu);box-shadow:0 0 12px var(--cn-pu)}
.cn-dna-stage{height:560px;display:grid;place-items:center;perspective:1200px;position:relative;overflow:hidden;border-radius:20px;background:radial-gradient(ellipse at center,rgba(184,77,255,.06),transparent 70%);border:1px solid rgba(255,255,255,.08)}
.cn-dna-stage::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0,transparent 79px,rgba(184,77,255,.05) 80px),repeating-linear-gradient(0deg,transparent 0,transparent 79px,rgba(184,77,255,.05) 80px);-webkit-mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%);mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%);pointer-events:none}
.cn-dna-helix{position:relative;width:160px;height:480px;transform-style:preserve-3d;animation:cn-helixL 14s linear infinite}
.cn-dna-base{position:absolute;left:50%;top:var(--y,0);transform-style:preserve-3d;transform:translateX(-50%) rotateY(var(--rot,0)) translateZ(0);width:160px;height:8px;display:flex;align-items:center;justify-content:space-between}
.cn-dna-strand{width:14px;height:14px;border-radius:50%;background:radial-gradient(circle,var(--c),color-mix(in srgb,var(--c) 30%,#000));box-shadow:0 0 14px var(--c),0 0 28px color-mix(in srgb,var(--c) 50%,transparent);border:1px solid rgba(255,255,255,.3);position:relative;z-index:2}
.cn-dna-strand.s2{background:radial-gradient(circle,var(--c2,var(--cn-pu)),color-mix(in srgb,var(--c2,var(--cn-pu)) 30%,#000));box-shadow:0 0 14px var(--c2,var(--cn-pu)),0 0 28px color-mix(in srgb,var(--c2,var(--cn-pu)) 50%,transparent)}
.cn-dna-rung{position:absolute;left:14px;right:14px;top:50%;height:2px;transform:translateY(-50%);background:linear-gradient(90deg,var(--c),var(--c2,var(--cn-pu)));box-shadow:0 0 6px color-mix(in srgb,var(--c) 60%,transparent);opacity:.6}
.cn-dna-spine{position:absolute;left:50%;top:0;bottom:0;width:1px;background:linear-gradient(180deg,transparent,rgba(255,255,255,.08),transparent);transform:translateX(-50%) translateZ(-1px)}
.cn-dna-label{position:absolute;font-family:'JetBrains Mono',monospace;font-size:10px;color:#fff;background:rgba(2,5,15,.9);padding:4px 10px;border-radius:6px;border:1px solid rgba(255,255,255,.2);white-space:nowrap;backdrop-filter:blur(8px);box-shadow:0 4px 14px rgba(0,0,0,.5)}
.cn-dna-legend{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);display:flex;gap:18px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--cn-dim);background:rgba(2,5,15,.7);padding:10px 18px;border-radius:20px;border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(8px);z-index:5}
.cn-dna-legend .lg{display:flex;align-items:center;gap:6px}
.cn-dna-legend .sw{width:8px;height:8px;border-radius:50%}
.cn-dna-meta{position:absolute;top:24px;left:24px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--cn-pu);letter-spacing:.2em;background:rgba(2,5,15,.7);padding:6px 14px;border-radius:6px;border:1px solid rgba(184,77,255,.3);box-shadow:0 0 14px rgba(184,77,255,.2);z-index:5;text-transform:uppercase}
.cn-dna-meta::before{content:"";display:inline-block;width:6px;height:6px;background:var(--cn-pu);border-radius:50%;margin-right:8px;vertical-align:middle;animation:cn-dot 1.2s infinite;box-shadow:0 0 8px var(--cn-pu)}
.cn-dna-stats{position:absolute;top:24px;right:24px;display:flex;flex-direction:column;gap:6px;z-index:5}
.cn-dna-stat{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--cn-dim);background:rgba(2,5,15,.7);padding:6px 12px;border-radius:6px;border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(8px);display:flex;justify-content:space-between;gap:14px;min-width:160px}
.cn-dna-stat b{color:#fff;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:12px}
.cn-section-tag{display:inline-flex;align-items:center;gap:10px;padding:6px 16px;background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.3);border-radius:20px;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--cn-ac);letter-spacing:.3em;text-transform:uppercase;margin-bottom:16px}
.cn-section-tag::before{content:"";width:6px;height:6px;background:var(--cn-ac);border-radius:50%;box-shadow:0 0 10px var(--cn-ac);animation:cn-dot 1.2s infinite}
.cn-towers-stage{padding:40px 50px 70px;background:radial-gradient(ellipse at center,rgba(184,77,255,.06),transparent 70%);border-radius:20px;border:1px solid rgba(255,255,255,.08);position:relative;overflow:hidden}
.cn-towers-hd{text-align:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--cn-ac);letter-spacing:.2em;margin-bottom:24px;text-transform:uppercase}
.cn-towers-field{perspective:1100px;height:380px;display:flex;align-items:flex-end;gap:36px;justify-content:center;position:relative}
.cn-towers-field::before{content:"";position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(0,229,255,.6),transparent);box-shadow:0 0 12px rgba(0,229,255,.5)}
.cn-towers-field::after{content:"";position:absolute;bottom:-2px;left:0;right:0;height:60px;background:repeating-linear-gradient(90deg,transparent 0,transparent 39px,rgba(0,229,255,.18) 39px,rgba(0,229,255,.18) 40px);transform:perspective(400px) rotateX(70deg);transform-origin:top;-webkit-mask-image:linear-gradient(to bottom,black,transparent);mask-image:linear-gradient(to bottom,black,transparent)}
.cn-tw{width:78px;transform-style:preserve-3d;transform:rotateX(20deg) rotateY(-15deg);position:relative;transform-origin:bottom center}
.cn-tw .face{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(180deg,var(--c) 0%,color-mix(in srgb,var(--c) 30%,#000) 100%);border:1px solid color-mix(in srgb,var(--c) 60%,transparent);box-shadow:0 0 30px color-mix(in srgb,var(--c) 50%,transparent),0 0 60px color-mix(in srgb,var(--c) 30%,transparent);height:100%}
.cn-tw .grid-overlay{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0,transparent 18px,rgba(255,255,255,.18) 18px,rgba(255,255,255,.18) 19px);pointer-events:none}
.cn-tw .top{position:absolute;left:0;right:0;height:24px;background:color-mix(in srgb,var(--c) 80%,#fff);transform:rotateX(90deg);transform-origin:bottom;box-shadow:0 0 30px color-mix(in srgb,var(--c) 80%,transparent)}
.cn-tw .lbl{position:absolute;bottom:-44px;left:50%;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--cn-dim);white-space:nowrap;text-align:center}
.cn-tw .lbl small{display:block;color:var(--cn-dim2);font-size:8px;margin-top:2px}
.cn-tw .val{position:absolute;top:-26px;left:50%;transform:translateX(-50%);font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:700;color:var(--c);text-shadow:0 0 12px var(--c);white-space:nowrap}
.cn-tw .shadow{position:absolute;bottom:-4px;left:-12px;right:-12px;height:14px;background:radial-gradient(ellipse,var(--c),transparent 70%);opacity:.4;filter:blur(6px);transform:rotateX(90deg)}
/* TIMELINE-PRISM · v41.2 · refeito para nao cortar cards e ficar legivel */
.cn-prism-stage{padding:24px 40px 28px;perspective:1400px;background:radial-gradient(ellipse at center,rgba(0,255,136,.04),transparent 70%);border-radius:20px;border:1px solid rgba(255,255,255,.08);position:relative;overflow:visible}
.cn-prism-hd{text-align:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--cn-ac);letter-spacing:.2em;margin-bottom:14px;text-transform:uppercase}
.cn-prism-strip{transform-style:preserve-3d;transform:rotateX(22deg) translateZ(-10px);transform-origin:center bottom;min-height:260px;position:relative;margin:30px 0 110px}
.cn-prism-track{position:absolute;bottom:30px;left:0;right:0;height:5px;background:linear-gradient(90deg,rgba(0,229,255,.1),rgba(0,229,255,.55) 50%,rgba(0,229,255,.1));border-radius:3px;box-shadow:0 0 14px rgba(0,229,255,.45)}
.cn-prism-now{position:absolute;bottom:30px;transform:translate(-50%,50%);width:16px;height:16px;border-radius:50%;border:2px solid var(--cn-ac);background:#020208;box-shadow:0 0 14px var(--cn-ac);z-index:3}
.cn-prism-pulse{position:absolute;bottom:30px;transform:translate(-50%,50%);width:28px;height:28px;border-radius:50%;border:2px solid rgba(0,229,255,.7);animation:cn-ringExpand 1.6s ease-out infinite;z-index:2}
.cn-prism-pin{position:absolute;bottom:30px;transform:translateX(-50%);width:2.5px;background:linear-gradient(180deg,var(--c),transparent 95%);box-shadow:0 0 6px var(--c);z-index:2}
.cn-prism-card{position:absolute;bottom:calc(30px + var(--h) - 2px);transform:translateX(-50%) translateZ(14px);width:148px;padding:9px 12px;border-radius:8px;background:linear-gradient(135deg,rgba(2,5,20,.96),rgba(8,12,28,.96));border:1px solid var(--c);box-shadow:0 0 14px color-mix(in srgb,var(--c) 35%,transparent),0 6px 18px rgba(0,0,0,.55);transform-style:preserve-3d;z-index:4}
.cn-prism-card .when{font-family:'JetBrains Mono',monospace;font-size:9.5px;color:var(--c);letter-spacing:.08em;font-weight:700}
.cn-prism-card .what{font-family:'Space Grotesk',sans-serif;font-size:11.5px;color:#e2e8f0;margin-top:3px;line-height:1.25;font-weight:600;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.cn-chassis-corner{position:fixed;width:32px;height:32px;border:2px solid var(--cn-ac);box-shadow:0 0 12px rgba(0,229,255,.5);z-index:50;pointer-events:none}
.cn-chassis-corner.tl{top:14px;left:14px;border-right:none;border-bottom:none;border-radius:8px 0 0 0}
.cn-chassis-corner.tr{top:14px;right:14px;border-left:none;border-bottom:none;border-radius:0 8px 0 0}
.cn-chassis-corner.bl{bottom:14px;left:14px;border-right:none;border-top:none;border-radius:0 0 0 8px}
.cn-chassis-corner.br{bottom:14px;right:14px;border-left:none;border-top:none;border-radius:0 0 8px 0}
/* ═══ DNA NEXUS · v41 INTERATIVO · scanner CT, filtros, hover e inspector ═══ */
@keyframes cn-dnaScan{0%{top:-10%}100%{top:110%}}
@keyframes cn-dnaPulseCrit{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.6);opacity:.2}}
@keyframes cn-inspIn{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.cn-dna-scanner{position:absolute;left:8%;right:8%;height:2px;background:linear-gradient(90deg,transparent,rgba(0,229,255,.7),rgba(184,77,255,.7),transparent);box-shadow:0 0 20px rgba(0,229,255,.7);animation:cn-dnaScan 4.5s linear infinite;z-index:3;pointer-events:none;border-radius:2px}
.cn-dna-filtros{position:absolute;top:62px;left:24px;display:flex;flex-direction:column;gap:5px;z-index:6}
.cn-dna-filtro{display:flex;align-items:center;gap:7px;padding:5px 10px;border-radius:6px;background:rgba(2,5,15,.8);border:1px solid rgba(255,255,255,.08);color:var(--cn-dim2);font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.18em;cursor:pointer;transition:all .2s ease;backdrop-filter:blur(8px);font-weight:700;text-transform:uppercase}
.cn-dna-filtro .dot{width:7px;height:7px;border-radius:50%;background:var(--c);opacity:.3;transition:opacity .2s,box-shadow .2s}
.cn-dna-filtro.on{color:#fff;border-color:var(--c);background:color-mix(in srgb,var(--c) 12%,rgba(2,5,15,.8))}
.cn-dna-filtro.on .dot{opacity:1;box-shadow:0 0 8px var(--c)}
.cn-dna-filtro:hover{transform:translateX(2px)}
.cn-dna-base{cursor:pointer;transition:filter .2s ease}
.cn-dna-base.hover{filter:brightness(1.6)}
.cn-dna-base.hover .cn-dna-strand,.cn-dna-base.hover .cn-dna-strand.s2{transform:scale(1.5)}
.cn-dna-base.crit .cn-dna-strand.s2{animation:cn-pulseCr 1.4s ease infinite}
.cn-dna-pulse{position:absolute;left:50%;top:50%;width:14px;height:14px;border-radius:50%;border:2px solid var(--c);transform:translate(-50%,-50%);animation:cn-dnaPulseCrit 1.6s ease-out infinite;pointer-events:none}
.cn-dna-inspector{position:absolute;right:24px;top:50%;transform:translateY(-50%);width:280px;background:linear-gradient(135deg,rgba(2,5,20,.97),rgba(8,12,28,.97));border:1px solid var(--c);border-radius:14px;padding:18px;backdrop-filter:blur(14px);box-shadow:0 0 28px color-mix(in srgb,var(--c) 35%,transparent),0 18px 50px rgba(0,0,0,.7);z-index:7;font-family:'Space Grotesk',sans-serif;animation:cn-inspIn .25s cubic-bezier(.2,.8,.3,1) forwards;pointer-events:auto}
.cn-dna-inspector::before{content:"";position:absolute;left:0;top:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--c),transparent);box-shadow:0 0 12px var(--c);border-radius:14px 14px 0 0}
.cn-dna-inspector-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.2em;font-weight:700}
.cn-dna-inspector-tag{padding:3px 8px;border-radius:4px;color:#020208;font-size:9px;font-weight:800}
.cn-dna-inspector-urg{font-size:10px}
.cn-dna-inspector-num{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--cn-ac);margin-bottom:6px;letter-spacing:.05em}
.cn-dna-inspector-tit{font-size:14px;font-weight:700;color:#fff;line-height:1.3;margin-bottom:14px;text-shadow:0 0 12px rgba(0,229,255,.3)}
.cn-dna-inspector-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 14px;margin-bottom:14px}
.cn-dna-inspector-grid div{display:flex;flex-direction:column;gap:2px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.cn-dna-inspector-grid span{font-family:'JetBrains Mono',monospace;font-size:8px;color:var(--cn-dim2);letter-spacing:.18em;font-weight:700}
.cn-dna-inspector-grid b{font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:700;color:#e2e8f0}
.cn-dna-inspector-cta{width:100%;padding:9px 12px;border-radius:8px;background:color-mix(in srgb,var(--c) 14%,transparent);border:1px solid var(--c);color:var(--c);font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.18em;font-weight:800;cursor:pointer;transition:all .2s;text-transform:uppercase}
.cn-dna-inspector-cta:hover{background:color-mix(in srgb,var(--c) 25%,transparent);box-shadow:0 0 14px color-mix(in srgb,var(--c) 50%,transparent)}
/* ═══ ENHANCEMENTS PACK v41.1 ═══ */
.cn-heatmap{display:grid;grid-template-columns:repeat(var(--cols,14),1fr);grid-auto-rows:14px;gap:3px}
.cn-heatmap-cell{border-radius:3px;background:color-mix(in srgb,var(--c,var(--cn-ac)) calc(var(--intensity,0)*100%),rgba(255,255,255,.03));border:1px solid rgba(255,255,255,.04);transition:transform .15s ease,box-shadow .15s ease;cursor:default}
.cn-heatmap-cell:hover{transform:scale(1.4);box-shadow:0 0 10px var(--c,var(--cn-ac));z-index:2;position:relative}
.cn-noise-css{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;opacity:.18;z-index:2;background-image:repeating-radial-gradient(circle at 30% 30%,rgba(0,229,255,.10) 0,transparent 1.6px),repeating-radial-gradient(circle at 70% 60%,rgba(184,77,255,.10) 0,transparent 1.6px),repeating-radial-gradient(circle at 50% 80%,rgba(0,229,255,.08) 0,transparent 1.4px);background-size:5px 5px,7px 7px,4px 4px;animation:cn-flicker 1.4s ease-in-out infinite}
.cn-fg-overlay{position:fixed;inset:0;z-index:9998;background:rgba(2,3,12,.92);backdrop-filter:blur(10px);display:grid;place-items:center}
.cn-fg-modal{width:min(820px,94vw);background:radial-gradient(ellipse at 30% 0%,rgba(0,229,255,.08),transparent 50%),#020208;border:1px solid rgba(0,229,255,.35);border-radius:18px;padding:18px;box-shadow:0 30px 80px rgba(0,0,0,.7),0 0 60px rgba(0,229,255,.18)}
.cn-fg-hd{display:flex;align-items:center;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--cn-ac);letter-spacing:.3em;margin-bottom:12px;text-transform:uppercase}
.cn-fg-close{width:28px;height:28px;border-radius:6px;background:rgba(255,46,91,.15);border:1px solid rgba(255,46,91,.4);color:var(--cn-cr);cursor:pointer;font-weight:700}
.cn-fg-legend{margin-top:10px;display:flex;gap:14px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--cn-dim);flex-wrap:wrap}
.cn-fg-legend .d{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;vertical-align:middle}
/* cursor HUD nos paineis NEXUS */
.cn-tok,.cn-dna-stage,.cn-holo-stage,.cn-towers-stage,.cn-prism-stage{cursor:crosshair}
@media (prefers-reduced-motion:reduce){.cn-holo-card,.cn-tok-ring,.cn-tok-core,.cn-dna-helix,.cn-dna-scanner,.cn-dna-pulse,.cn-particles .cn-p,.cn-particles .cn-blob,.cn-particles .cn-scanH,.cn-glitch::before,.cn-glitch::after,.cn-tok-pip.cr,.cn-noise-css{animation:none !important}}`;
const injectCnCSS = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById("cn-upgrade")) return;
  const s = document.createElement("style");
  s.id = "cn-upgrade";
  s.textContent = CN_UPGRADE_CSS;
  document.head.appendChild(s);
};

/* Componente <CnStyles/> · garante que o CSS do upgrade entra no DOM
   mesmo em sandbox de artefato (sem depender de document.head). */
function CnStyles() {
  return <style dangerouslySetInnerHTML={{ __html: CN_UPGRADE_CSS }} />;
}

/* Badge visível que confirma que o pacote v41 está ativo. */
function CnVersionBadge() {
  return (
    <div style={{
      position: "fixed", bottom: 16, right: 56, zIndex: 51,
      padding: "5px 11px", borderRadius: 6,
      background: "rgba(0,229,255,.12)", border: "1px solid rgba(0,229,255,.45)",
      color: "#00e5ff", fontFamily: "'JetBrains Mono',monospace",
      fontSize: 9, letterSpacing: ".22em", fontWeight: 700,
      boxShadow: "0 0 14px rgba(0,229,255,.35)", pointerEvents: "none",
      textTransform: "uppercase",
    }}>● COJUR NEXUS · v41 · ON</div>
  );
}

/* ───── 1. Tilt wrapper ───── */
function Tilt({ children, max = 14, glare = true, className = "", style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.transform = `rotateX(${(py - 0.5) * -max}deg) rotateY(${(px - 0.5) * (max + 4)}deg)`;
      if (glare) {
        el.style.setProperty("--mx", px * 100 + "%");
        el.style.setProperty("--my", py * 100 + "%");
        el.dataset.active = "1";
      }
    };
    const onLeave = () => {
      el.style.transform = "rotateX(0) rotateY(0)";
      el.dataset.active = "0";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max, glare]);
  return <div ref={ref} className={"cn-tilt " + className} style={style}>{children}</div>;
}

/* ───── 2. Holo Hero ───── */
function HoloHero({ titulo, num, prazo = "—", responsavel = "—", fase = "—", crit = false }) {
  const accent = crit ? "var(--cn-cr)" : "var(--cn-ac)";
  return (
    <div className="cn-holo-stage">
      <div className="cn-holo-floor" />
      <div className="cn-holo-ghost g2" />
      <div className="cn-holo-ghost g1">RE 1.234.561 · STF · Próximo</div>
      <div className="cn-holo-card">
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: accent, letterSpacing: ".22em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 6, height: 6, background: accent, borderRadius: "50%", boxShadow: `0 0 10px ${accent}`, animation: "cn-dot 1.5s infinite" }} />
          {crit ? "EM FOCO · CRÍTICO" : "EM FOCO · PRIORIDADE 1"}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--cn-dim)", marginTop: 8 }}>{num}</div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginTop: 10, textShadow: "0 0 18px rgba(0,229,255,.5)" }}>{titulo}</div>
        <div style={{ display: "flex", gap: 22, marginTop: 22, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--cn-dim)" }}>
          <div>RESP. <b style={{ color: "#fff" }}>{responsavel}</b></div>
          <div>PRAZO <span style={{ color: crit ? "var(--cn-cr)" : "#fff", fontSize: 14, fontWeight: 800, textShadow: crit ? "0 0 12px var(--cn-cr)" : "none" }}>{prazo}</span></div>
          <div>FASE <b style={{ color: "#fff" }}>{fase}</b></div>
        </div>
      </div>
    </div>
  );
}

/* ───── 3. Tokamak Hero ───── */
function TokamakHero({ items = [], total = 0 }) {
  const placed = useMemo(() => {
    const out = [];
    const r1 = items.filter((i) => i.tier === 1).slice(0, 5);
    const r2 = items.filter((i) => i.tier === 2).slice(0, 4);
    const r3 = items.filter((i) => i.tier === 3).slice(0, 4);
    [r1, r2, r3].forEach((arr, ringIdx) => {
      const ringSize = [460, 340, 220][ringIdx];
      arr.forEach((it, i) => {
        const angle = (i / Math.max(arr.length, 1)) * 360;
        out.push({ ...it, ring: ringSize, angle });
      });
    });
    return out;
  }, [items]);
  return (
    <div className="cn-tok">
      <div className="cn-tok-ring r1" />
      <div className="cn-tok-ring r2" />
      <div className="cn-tok-ring r3" />
      {placed.map((it, i) => {
        const r = it.ring / 2; const rad = (it.angle * Math.PI) / 180;
        const x = Math.cos(rad) * r; const y = Math.sin(rad) * r;
        return <div key={i} className={"cn-tok-pip " + it.color} title={it.label || ""} style={{ left: `calc(50% + ${x}px - 7px)`, top: `calc(50% + ${y}px - 7px)` }} />;
      })}
      <div className="cn-tok-core"><div className="n">{total}</div><div className="l">ATIVOS</div></div>
    </div>
  );
}

/* ───── 4. DNA Nexus · v41 INTERATIVO ─────
   Hover em uma base mostra ficha técnica lateral com dados reais.
   Click abre o processo via callback onSelect.
   Pulse nas bases críticas. Filtros por tipo (toggle).
   Linha-scanner contínua percorrendo a hélice (efeito CT-scan).
   ───────────────────────────────────────────────────────────── */
function DNANexus({ processos = [], h = 480, onSelect }) {
  const helixRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(null);   // index da base sob o mouse
  const [filtros, setFiltros] = useState({ jud: true, adm: true, sust: true });

  const dataAll = useMemo(() => {
    if (processos.length) return processos;
    return [
      { l: "Jud · Crítico 2du", tipo: "jud", urg: "cr", proc: "RE 1.234.567" },
      { l: "Adm · Crítico 5du", tipo: "adm", urg: "cr", proc: "26.0.000003358" },
      { l: "Sust · 9du", tipo: "sust", urg: "wa", proc: "STJ Embargos" },
      { l: "Jud · 14du", tipo: "jud", urg: "ac", proc: "AgInt TRF1" },
      { l: "Adm · 21du", tipo: "adm", urg: "ac", proc: "OAB-RJ Lei 9.696" },
      { l: "Jud · 38du", tipo: "jud", urg: "su", proc: "Embargos TST" },
      { l: "Adm · Folgado", tipo: "adm", urg: "su", proc: "Parecer 2024.882" },
      { l: "Sust · 12du", tipo: "sust", urg: "wa", proc: "TRT2 MS" },
      { l: "Jud · 4du", tipo: "jud", urg: "cr", proc: "Tutela CREMESP" },
      { l: "Adm · 17du", tipo: "adm", urg: "ac", proc: "CREMEC Diploma" },
      { l: "Jud · 31du", tipo: "jud", urg: "su", proc: "Parecer CREMESP" },
      { l: "Sust · 24du", tipo: "sust", urg: "ac", proc: "STJ Memoriais" },
      { l: "Jud · 7du", tipo: "jud", urg: "wa", proc: "Reclamação TST" },
      { l: "Adm · 11du", tipo: "adm", urg: "wa", proc: "Despacho 045" },
    ];
  }, [processos]);

  // aplica filtros e limita a 14 bases
  const data = useMemo(() => dataAll
    .filter(d => filtros[d.tipo] !== false)
    .slice(0, 14), [dataAll, filtros]);

  const TIPO_C = { jud: "var(--cn-ac)", adm: "var(--cn-pu)", sust: "var(--cn-su)" };
  const URG_C = { cr: "var(--cn-cr)", wa: "var(--cn-wa)", ac: "var(--cn-ac)", su: "var(--cn-su)" };

  const stats = useMemo(() => ({
    total: dataAll.length,
    jud: dataAll.filter((d) => d.tipo === "jud").length,
    adm: dataAll.filter((d) => d.tipo === "adm").length,
    sust: dataAll.filter((d) => d.tipo === "sust").length,
    crit: dataAll.filter((d) => d.urg === "cr").length,
  }), [dataAll]);

  const focused = hovered != null ? data[hovered] : null;

  // helpers
  const toggleFiltro = (k) => setFiltros((f) => ({ ...f, [k]: !f[k] }));
  const labelTipo = (t) => t === "jud" ? "Judicial" : t === "sust" ? "Sustentação" : "Administrativo";
  const labelUrg = (u) => u === "cr" ? "CRÍTICO" : u === "wa" ? "ATENÇÃO" : u === "ac" ? "ACOMPANHAR" : "FOLGADO";

  return (
    <div className="cn-dna-stage"
      onMouseEnter={() => { if (helixRef.current) helixRef.current.style.animationPlayState = "paused"; setPaused(true); }}
      onMouseLeave={() => { if (helixRef.current) helixRef.current.style.animationPlayState = "running"; setPaused(false); setHovered(null); }}>
      {/* Linha scanner CT contínua */}
      <div className="cn-dna-scanner" />

      <div className="cn-dna-meta">DNA · Nexus · Genoma do Acervo</div>

      {/* Filtros toggle */}
      <div className="cn-dna-filtros">
        {[
          { k: "jud", label: "JUD", c: "var(--cn-ac)" },
          { k: "adm", label: "ADM", c: "var(--cn-pu)" },
          { k: "sust", label: "SUST", c: "var(--cn-su)" },
        ].map(f => (
          <button
            key={f.k}
            onClick={() => toggleFiltro(f.k)}
            className={"cn-dna-filtro" + (filtros[f.k] ? " on" : "")}
            style={{ "--c": f.c }}
            title={"Toggle " + labelTipo(f.k)}
          >
            <span className="dot" />{f.label}
          </button>
        ))}
      </div>

      <div className="cn-dna-stats">
        <div className="cn-dna-stat">Total <b>{stats.total}</b></div>
        <div className="cn-dna-stat">Judicial <b style={{ color: "var(--cn-ac)" }}>{stats.jud}</b></div>
        <div className="cn-dna-stat">Adm. <b style={{ color: "var(--cn-pu)" }}>{stats.adm}</b></div>
        <div className="cn-dna-stat">Sust. <b style={{ color: "var(--cn-su)" }}>{stats.sust}</b></div>
        <div className="cn-dna-stat">Críticos <b style={{ color: "var(--cn-cr)" }}>{stats.crit}</b></div>
      </div>

      <div ref={helixRef} className="cn-dna-helix" style={{ height: h + "px" }}>
        <div className="cn-dna-spine" />
        {data.map((d, i) => {
          const y = (i * (h - 40)) / Math.max(data.length - 1, 1) + 20;
          const rot = (i * 32) % 360;
          const cL = TIPO_C[d.tipo] || "var(--cn-ac)";
          const cR = URG_C[d.urg] || "var(--cn-ac)";
          const isHover = hovered === i;
          const isCrit = d.urg === "cr";
          return (
            <div
              key={i}
              className={"cn-dna-base" + (isHover ? " hover" : "") + (isCrit ? " crit" : "")}
              style={{ "--y": y + "px", "--rot": rot + "deg", "--c": cL, "--c2": cR }}
              onMouseEnter={() => setHovered(i)}
              onClick={(e) => { e.stopPropagation(); if (onSelect && d.ref) onSelect(d.ref); }}
            >
              <div className="cn-dna-strand" style={{ "--c": cL }} />
              <div className="cn-dna-rung" style={{ "--c": cL, "--c2": cR }} />
              <div className="cn-dna-strand s2" style={{ "--c2": cR }} />
              {isCrit && <div className="cn-dna-pulse" style={{ "--c": cR }} />}
            </div>
          );
        })}
      </div>

      {/* Painel de inspeção (ficha tecnica) */}
      {focused && (
        <div className="cn-dna-inspector" style={{ "--c": URG_C[focused.urg] || "var(--cn-ac)" }}>
          <div className="cn-dna-inspector-hd">
            <span className="cn-dna-inspector-tag" style={{ background: TIPO_C[focused.tipo] }}>
              {labelTipo(focused.tipo).slice(0, 4).toUpperCase()}
            </span>
            <span className="cn-dna-inspector-urg" style={{ color: URG_C[focused.urg] }}>● {labelUrg(focused.urg)}</span>
          </div>
          <div className="cn-dna-inspector-num">{focused.proc || focused.ref?.num || focused.ref?.numeroSEI || "—"}</div>
          <div className="cn-dna-inspector-tit">{focused.ref?.assunto || focused.l || "Sem assunto"}</div>
          <div className="cn-dna-inspector-grid">
            <div><span>TRIBUNAL</span><b>{focused.ref?.tribunal || focused.ref?.orgao || "—"}</b></div>
            <div><span>RESP.</span><b>{focused.ref?.responsavel || "JG"}</b></div>
            <div><span>FASE</span><b>{focused.ref?.fase || focused.ref?.tipoPeca || "—"}</b></div>
            <div><span>SCORE</span><b style={{ color: URG_C[focused.urg] }}>{focused.ref?.score != null ? focused.ref.score : "—"}</b></div>
            <div><span>PRAZO</span><b style={{ color: URG_C[focused.urg] }}>{focused.ref?.diasRestantes != null ? focused.ref.diasRestantes + "du" : "—"}</b></div>
            <div><span>SEM MOV.</span><b>{focused.ref?.semMov != null ? focused.ref.semMov + "d" : "—"}</b></div>
          </div>
          {onSelect && focused.ref && (
            <button className="cn-dna-inspector-cta" onClick={() => onSelect(focused.ref)}>
              ABRIR PROCESSO ▸
            </button>
          )}
        </div>
      )}

      <div className="cn-dna-legend">
        <div className="lg"><span className="sw" style={{ background: "var(--cn-ac)" }} />Judicial</div>
        <div className="lg"><span className="sw" style={{ background: "var(--cn-pu)" }} />Adm.</div>
        <div className="lg"><span className="sw" style={{ background: "var(--cn-su)" }} />Sustent.</div>
        <div className="lg">│</div>
        <div className="lg"><span className="sw" style={{ background: "var(--cn-cr)" }} />Crítico</div>
        <div className="lg"><span className="sw" style={{ background: "var(--cn-wa)" }} />Médio</div>
        <div className="lg"><span className="sw" style={{ background: "var(--cn-su)" }} />Folgado</div>
      </div>
    </div>
  );
}

/* ───── 5. GlitchNum ───── */
function GlitchNum({ children, style }) {
  return <span className="cn-glitch" data-text={String(children)} style={style}>{children}</span>;
}

/* ───── 6. Ring Progress ───── */
function RingProgress({ value = 75, size = 90, color = "var(--cn-su)", label }) {
  const r = size / 2 - 7; const c = 2 * Math.PI * r; const off = c - (value / 100) * c;
  return (
    <div className="cn-ring-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={6} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6} strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" style={{ transition: "stroke-dashoffset .6s ease" }} />
      </svg>
      <div className="cn-ring-v" style={{ fontSize: size * 0.26 }}>{label || value + "%"}</div>
    </div>
  );
}

/* ───── 7. Terminal AI ───── */
function TerminalAI({ lines = [] }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 1700);
    return () => clearTimeout(t);
  }, [shown, lines.length]);
  return (
    <div className="cn-term">
      {lines.slice(0, shown + 1).map((l, i) => (
        <div key={i} className={"cn-term-line cn-term-prompt" + (i < shown ? " done" : "")}>{l}</div>
      ))}
    </div>
  );
}

/* ───── 8. KPI Flip 3D ───── */
function KPIFlip({ frente, verso, w = 180, h = 90, style }) {
  return (
    <div className="cn-flip" style={{ width: w, height: h, ...style }}>
      <div className="cn-flip-inner" style={{ borderRadius: 12 }}>
        <div className="cn-flip-face" style={{ background: "rgba(0,229,255,.06)", border: "1px solid rgba(0,229,255,.3)", borderRadius: 12, color: "#fff" }}>{frente}</div>
        <div className="cn-flip-face cn-flip-back" style={{ background: "rgba(0,229,255,.14)", border: "1px solid rgba(0,229,255,.5)", borderRadius: 12, color: "var(--cn-ac)", boxShadow: "0 0 24px rgba(0,229,255,.3)" }}>{verso}</div>
      </div>
    </div>
  );
}

/* ───── 9. Boot Screen ───── */
function BootScreen({ duration = 2400, ids = [] }) {
  const [out, setOut] = useState(false);
  const [hide, setHide] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);
  const cols = useMemo(() => {
    const sample = ids.length ? ids : ["RE 1.234.567","26.0.000003358","TRT2-MS","STJ Embargos","CREMESP","AgInt TRF1","OAB-RJ","Parecer 882","Diploma XML","Tutela 026","Sustent. 04","Reclamação","CFM 2.343","CRM-CE","Despacho 045"];
    return Array.from({ length: 32 }).map((_, i) => ({ left: (i * 3.2) % 100, delay: -(Math.random() * 4), text: sample[i % sample.length] }));
  }, [ids]);
  const STATUS = useMemo(() => ["▸ Conectando ao Supabase…","▸ Sincronizando acervo (147 processos)…","▸ Cruzando jurisprudência CFM/STJ…","▸ Calculando prazos críticos…","▸ Carregando IA Nexus…","▸ Sistema pronto."], []);
  useEffect(() => {
    const t1 = setTimeout(() => setOut(true), duration);
    const t2 = setTimeout(() => setHide(true), duration + 700);
    const stepMs = duration / STATUS.length;
    const tick = setInterval(() => setStatusIdx((i) => Math.min(i + 1, STATUS.length - 1)), stepMs);
    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(tick); };
  }, [duration, STATUS.length]);
  if (hide) return null;
  return (
    <div className={"cn-boot" + (out ? " cn-boot-out" : "")}>
      <NoiseCanvas opacity={0.22} />
      <div className="cn-boot-grid" />
      {cols.map((c, i) => <div key={i} className="cn-rain-col" style={{ left: c.left + "%", animationDelay: c.delay + "s" }}>{c.text}</div>)}
      <div className="cn-boot-hex" style={{ top: "18%", left: "12%" }} />
      <div className="cn-boot-hex" style={{ top: "70%", right: "14%", animationDelay: "-1.5s" }} />
      <div className="cn-boot-hex" style={{ top: "30%", right: "8%", animationDelay: "-2.8s", width: "40px", height: "46px" }} />
      <div className="cn-boot-hex" style={{ bottom: "22%", left: "18%", animationDelay: "-1s", width: "44px", height: "50px" }} />
      <div className="cn-boot-corner tl" /><div className="cn-boot-corner tr" />
      <div className="cn-boot-corner bl" /><div className="cn-boot-corner br" />
      <div className="cn-boot-meta">COJUR · BOOT SEQUENCE · v4.0</div>
      <div className="cn-boot-logo">
        <h1 data-text="COJUR · NEXUS">COJUR · NEXUS</h1>
        <div className="sub">Inicializando sistema · CFM · 2026</div>
        <div className="cn-boot-bar"><div /></div>
        <div className="cn-boot-status">{STATUS[statusIdx]}</div>
      </div>
      <div className="cn-boot-foot">
        <span>NODE <b>BSB-01</b></span><span>LATÊNCIA <b>42MS</b></span>
        <span>ACERVO <b>147</b></span><span>STATUS <b>ONLINE</b></span>
      </div>
    </div>
  );
}

/* ───── 10. Ambient Particles ───── */
function AmbientParticles({ count = 18 }) {
  const ps = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100, d: -(Math.random() * 6),
    cls: i % 3 === 0 ? "pu" : i % 3 === 1 ? "su" : "",
  })), [count]);
  return (
    <div className="cn-particles" aria-hidden="true">
      <div className="cn-blob b1" /><div className="cn-blob b2" />
      <div className="cn-scanH" style={{ top: "30%" }} />
      <div className="cn-scanH" style={{ top: "75%", animationDelay: "-7s" }} />
      {ps.map((p, i) => <div key={i} className={"cn-p " + p.cls} style={{ left: p.x + "%", top: p.y + "%", animationDelay: p.d + "s" }} />)}
    </div>
  );
}

/* ───── 11. Modo Comando ───── */
function ModoComando({ open, onClose, total = 147, criticos = 8, jud = 23, adm = 47 }) {
  if (!open) return null;
  const pTtl = { color: "var(--cn-ac)", letterSpacing: ".18em", fontSize: 10, marginBottom: 12, display: "flex", alignItems: "center", gap: 6, fontWeight: 700 };
  const hudPanel = (col, row) => ({ gridColumn: col, gridRow: row, background: "linear-gradient(135deg,rgba(8,12,28,.7),rgba(2,5,15,.85))", border: "1px solid rgba(0,229,255,.25)", borderRadius: 10, padding: 18, backdropFilter: "blur(8px)", boxShadow: "0 0 24px rgba(0,229,255,.08)", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--cn-dim)" });
  const Row = ({ label, value, color }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
      <span>{label}</span>
      <b style={{ color: color || "#e2e8f0", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600 }}>{value}</b>
    </div>
  );
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(2,3,12,.94)", backdropFilter: "blur(14px)", display: "grid", placeItems: "center" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose && onClose(); }}>
      <div style={{ width: "min(1180px,94vw)", height: "min(680px,90vh)", position: "relative", borderRadius: 20, background: "radial-gradient(ellipse at 30% 0%,rgba(0,229,255,.1),transparent 50%),radial-gradient(ellipse at 100% 100%,rgba(184,77,255,.08),transparent 50%),#020208", border: "1px solid rgba(0,229,255,.3)", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,.7),0 0 80px rgba(0,229,255,.2)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,229,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,.04) 1px,transparent 1px)", backgroundSize: "30px 30px", maskImage: "radial-gradient(ellipse at center,black 30%,transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse at center,black 30%,transparent 80%)" }} />
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 32, height: 32, borderRadius: 8, background: "rgba(255,46,91,.15)", border: "1px solid rgba(255,46,91,.4)", color: "var(--cn-cr)", cursor: "pointer", fontSize: 18, fontWeight: 700, zIndex: 10 }}>✕</button>
        <div style={{ position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--cn-ac)", letterSpacing: ".3em", padding: "5px 14px", background: "rgba(0,229,255,.1)", border: "1px solid rgba(0,229,255,.4)", borderRadius: 4 }}>● COJUR · NEXUS · MODO COMANDO</div>
        <div style={{ position: "absolute", inset: "60px 40px 40px", display: "grid", gridTemplateColumns: "240px 1fr 240px", gridTemplateRows: "1fr 1fr", gap: 18 }}>
          <div style={hudPanel(1, 1)}><div style={pTtl}>ACERVO</div><Row label="Judicial" value={jud} /><Row label="Adm." value={adm} /><Row label="Sustent." value={4} /><Row label="Pareceres" value={64} /></div>
          <div style={hudPanel(1, 2)}><div style={pTtl}>DELTA · 7D</div><Row label="Concluídos" value="+12" color="var(--cn-su)" /><Row label="Críticos" value={criticos} color="var(--cn-cr)" /><Row label="Pendentes" value={34} />
            <div style={{ padding: 10, marginTop: 10, borderRadius: 6, background: "rgba(255,46,91,.1)", border: "1px solid rgba(255,46,91,.3)", color: "var(--cn-cr)", fontSize: 10, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.4, animation: "cn-pulseCr 2.4s ease infinite" }}>{`⚠ ${criticos} PRAZOS < 48H, REVISAR JÁ`}</div>
          </div>
          <div style={{ ...hudPanel(2, "1/span 2"), display: "flex", alignItems: "center", justifyContent: "center", perspective: 900, borderColor: "rgba(0,229,255,.4)" }}>
            <div style={{ width: 280, height: 280, position: "relative", transformStyle: "preserve-3d", animation: "cn-spinTilt 20s linear infinite" }}>
              {[0, 45, 90, 135].map((deg) => <div key={deg} style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1px solid ${deg % 90 === 0 ? "rgba(0,229,255,.5)" : "rgba(184,77,255,.4)"}`, transform: `rotateY(${deg}deg)`, boxShadow: "0 0 16px rgba(0,229,255,.15) inset" }} />)}
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(0,255,136,.4)", transform: "rotateX(90deg)" }} />
              <div style={{ position: "absolute", inset: "50% auto auto 50%", transform: "translate(-50%,-50%)", width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,229,255,.8),rgba(0,229,255,.1) 70%,transparent)", boxShadow: "0 0 50px rgba(0,229,255,.7),0 0 100px rgba(0,229,255,.3)", display: "grid", placeItems: "center" }}>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", textShadow: "0 0 12px #fff" }}>{total}</span>
              </div>
            </div>
          </div>
          <div style={hudPanel(3, 1)}><div style={pTtl}>PRÓXIMOS</div>
            <div style={{ fontSize: 11, color: "#cbd5e1", lineHeight: 1.7 }}>
              {["02 MAI · CREMESP|var(--cn-cr)","09 MAI · OAB-RJ|var(--cn-wa)","17 MAI · AgInt|var(--cn-ac)","24 MAI · Sustent.|var(--cn-pu)","05 JUN · Parecer|var(--cn-su)"].map((s, i) => {
                const [t, c] = s.split("|"); const [d, label] = t.split(" · ");
                return <div key={i} style={{ padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}><b style={{ color: c, fontFamily: "'JetBrains Mono',monospace", marginRight: 6 }}>{d}</b>· {label}</div>;
              })}
            </div>
          </div>
          <div style={hudPanel(3, 2)}><div style={pTtl}>URGÊNCIA</div>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: 100 }}>
              <circle cx={50} cy={50} r={35} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth={10} />
              <circle cx={50} cy={50} r={35} fill="none" stroke="var(--cn-cr)" strokeWidth={10} strokeDasharray="35 220" transform="rotate(-90 50 50)" />
              <circle cx={50} cy={50} r={35} fill="none" stroke="var(--cn-wa)" strokeWidth={10} strokeDasharray="55 220" strokeDashoffset={-35} transform="rotate(-90 50 50)" />
              <circle cx={50} cy={50} r={35} fill="none" stroke="var(--cn-ac)" strokeWidth={10} strokeDasharray="80 220" strokeDashoffset={-90} transform="rotate(-90 50 50)" />
              <text x={50} y={55} fontSize={14} fill="#fff" textAnchor="middle" fontFamily="Space Grotesk" fontWeight={700}>{total}</text>
            </svg>
            <div style={{ fontSize: 9, color: "var(--cn-dim2)", textAlign: "center", letterSpacing: ".1em", fontFamily: "'JetBrains Mono',monospace" }}>POR FAIXA DE PRAZO</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── 12. Torres (Topografia 3D de Prazos) ───── */
function TorresPrazo({ data, hMin = 60, hMax = 280 }) {
  const torres = useMemo(() => {
    if (data && data.length) return data.slice(0, 8);
    return [
      { l: "2du", t: "CREMESP", s: "RE 1.234.567", v: 2 },{ l: "5du", t: "Diploma", s: "CREMEC", v: 5 },
      { l: "9du", t: "OAB-RJ", s: "Falcão", v: 9 },{ l: "14du", t: "AgInt", s: "TRF1", v: 14 },
      { l: "21du", t: "TRT2", s: "MS", v: 21 },{ l: "38du", t: "Parecer", s: "CREMESP", v: 38 },
      { l: "12du", t: "Sustent.", s: "STJ", v: 12 },
    ];
  }, [data]);
  const colorFor = (v) => v <= 5 ? "#ff2e5b" : v <= 14 ? "#ffb800" : v <= 28 ? "#00e5ff" : "#00ff88";
  const max = Math.max(...torres.map((t) => t.v), 40);
  const heightFor = (v) => hMin + (v / max) * (hMax - hMin);
  return (
    <div className="cn-towers-stage">
      <div className="cn-towers-hd">▣ TOPOGRAFIA DE PRAZOS · TEMPO RESTANTE</div>
      <div className="cn-towers-field">
        {torres.map((t, i) => {
          const c = t.c || colorFor(t.v); const h = heightFor(t.v);
          return (
            <div key={i} className="cn-tw" style={{ height: h + "px", "--c": c }}>
              <div className="cn-tw val">{t.l}</div>
              <div className="face"><div className="grid-overlay" /></div>
              <div className="face" style={{ width: "24px", left: "auto", right: 0, transform: "translateX(12px) rotateY(90deg)", filter: "brightness(.55)" }} />
              <div className="top" style={{ top: 0, transform: `translateY(-${h - 1}px) rotateX(90deg)` }} />
              <div className="cn-tw lbl">{t.t}<small>{t.s}</small></div>
              <div className="shadow" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───── 13. Timeline-Prism ───── */
function TimelinePrism({ events }) {
  const ev = useMemo(() => {
    if (events && events.length) return events.slice(0, 8);
    return [
      { x: 8, c: "#ff2e5b", d: "02 MAI", t: "Tutela CREMESP", h: 90 },
      { x: 22, c: "#ffb800", d: "09 MAI", t: "OAB-RJ Lei 9.696", h: 140 },
      { x: 38, c: "#00e5ff", d: "17 MAI", t: "AgInt TRF1", h: 70 },
      { x: 54, c: "#b84dff", d: "24 MAI", t: "Sustentação STJ", h: 160 },
      { x: 72, c: "#00ff88", d: "05 JUN", t: "Parecer 2024.882", h: 100 },
      { x: 90, c: "#00e5ff", d: "20 JUN", t: "Embargos TST", h: 80 },
    ];
  }, [events]);
  return (
    <div className="cn-prism-stage">
      <div className="cn-prism-hd">▣ LINHA DO TEMPO · PRÓXIMOS 60 DIAS</div>
      <div className="cn-prism-strip">
        <div className="cn-prism-track" />
        <div className="cn-prism-now" style={{ left: "8%" }} />
        <div className="cn-prism-pulse" style={{ left: "8%" }} />
        {ev.map((e, i) => (
          <React.Fragment key={i}>
            <div className="cn-prism-pin" style={{ left: e.x + "%", height: e.h + "px", "--c": e.c }} />
            <div className="cn-prism-card" style={{ left: e.x + "%", "--h": e.h + "px", "--c": e.c }}>
              <div className="when">{e.d}</div><div className="what">{e.t}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ───── 14. HUD Chassis ───── */
function HUDChassis() {
  return (
    <>
      <div className="cn-chassis-corner tl" /><div className="cn-chassis-corner tr" />
      <div className="cn-chassis-corner bl" /><div className="cn-chassis-corner br" />
    </>
  );
}
/* ═══════════════════════════════════════════════════════════════════════
   COJUR NEXUS · ENHANCEMENTS PACK v41.1
   Sparkline, Heatmap, useAnimatedNumber, AnimatedNum, NoiseCanvas,
   ForceGraph e cursor HUD (CSS no CN_UPGRADE_CSS).
   ═══════════════════════════════════════════════════════════════════════ */

/* ── CnSpark · mini grafico SVG inline (Nexus) ── */
function CnSpark({ data = [], color = "var(--cn-ac)", w = 80, h = 24, fill = true }) {
  const series = useMemo(() => {
    if (data && data.length) return data;
    // fallback: 12 pontos pseudo-aleatórios
    var seed = 7;
    return Array.from({ length: 12 }).map(function(_, i){
      seed = (seed * 9301 + 49297) % 233280;
      return 20 + (seed / 233280) * 60;
    });
  }, [data]);
  const max = Math.max.apply(null, series);
  const min = Math.min.apply(null, series);
  const range = max - min || 1;
  const stepX = w / Math.max(series.length - 1, 1);
  const pts = series.map(function(v, i){
    const x = i * stepX;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return [x, y];
  });
  const linePath = pts.map(function(p, i){ return (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" ");
  const areaPath = linePath + " L" + w + "," + h + " L0," + h + " Z";
  return (
    <svg width={w} height={h} viewBox={"0 0 " + w + " " + h} style={{ display: "block" }}>
      {fill && <path d={areaPath} fill={color} fillOpacity={0.12} />}
      <path d={linePath} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 3px " + color + ")" }} />
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r={2.5} fill={color} style={{ filter: "drop-shadow(0 0 4px " + color + ")" }} />
    </svg>
  );
}

/* ── Heatmap · grid 14 colunas x 7 linhas estilo GitHub ── */
function Heatmap({ data = [], cols = 14, color = "var(--cn-ac)" }) {
  const cells = useMemo(() => {
    if (data && data.length) return data;
    var seed = 13;
    return Array.from({ length: cols * 7 }).map(function(_, i){
      seed = (seed * 1103515245 + 12345) % 2147483647;
      return Math.floor((seed / 2147483647) * 5);
    });
  }, [data, cols]);
  const max = Math.max.apply(null, cells.concat([1]));
  return (
    <div className="cn-heatmap" style={{ "--cols": cols, "--c": color }}>
      {cells.map(function(v, i){
        const intensity = max ? v / max : 0;
        return <div key={i} className="cn-heatmap-cell" title={v + " atividades"} style={{ "--intensity": intensity.toFixed(2) }} />;
      })}
    </div>
  );
}

/* ── useAnimatedNumber · easing cubico ── */
function useAnimatedNumber(target, duration) {
  duration = duration || 700;
  const [v, setV] = useState(0);
  const ref = useRef({ raf: 0, from: 0, to: 0, t0: 0 });
  useEffect(function(){
    if (typeof target !== "number" || isNaN(target)) { setV(target); return; }
    ref.current.from = v;
    ref.current.to = target;
    ref.current.t0 = performance.now();
    const tick = function(t){
      const p = Math.min(1, (t - ref.current.t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = ref.current.from + (ref.current.to - ref.current.from) * eased;
      setV(cur);
      if (p < 1) ref.current.raf = requestAnimationFrame(tick);
    };
    ref.current.raf = requestAnimationFrame(tick);
    return function(){ cancelAnimationFrame(ref.current.raf); };
    // eslint-disable-next-line
  }, [target, duration]);
  return Math.round(v);
}

/* ── AnimatedNum · wrapper visual ── */
function AnimatedNum({ value, duration, style }) {
  const v = useAnimatedNumber(typeof value === "number" ? value : 0, duration);
  return <span style={style}>{typeof value === "number" ? v : value}</span>;
}

/* ── NoiseCanvas · versao CSS-only (a anterior travava o sandbox) ── */
function NoiseCanvas() {
  return <div className="cn-noise-css" aria-hidden="true" />;
}

/* ── ForceGraph (leve · layout circular) · relacoes entre processos ── */
function ForceGraph({ open, onClose, processos = [] }) {
  if (!open) return null;
  const all = processos.slice(0, 24);
  const cx = 380, cy = 280, R = 220;
  const nodes = all.map(function(p, i){
    const a = (i / Math.max(all.length, 1)) * Math.PI * 2 - Math.PI / 2;
    return { p: p, x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
  });
  // arestas: mesma parte ou mesmo tribunal
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i].p, b = nodes[j].p;
      let same = null;
      if (a.tribunal && a.tribunal === b.tribunal) same = "trib";
      else if (a.parteContraria && a.parteContraria === b.parteContraria) same = "parte";
      else if (a.interessado && a.interessado === b.interessado) same = "int";
      if (same) edges.push({ a: i, b: j, t: same });
    }
  }
  const colorFor = function(d){
    if (d == null) return "#94a3b8";
    if (d <= 5) return "#ff2e5b";
    if (d <= 14) return "#ffb800";
    if (d <= 28) return "#00e5ff";
    return "#00ff88";
  };
  const edgeColor = { trib: "rgba(0,229,255,.4)", parte: "rgba(255,46,91,.45)", int: "rgba(184,77,255,.4)" };
  return (
    <div className="cn-fg-overlay" onClick={function(e){ if (e.target === e.currentTarget) onClose && onClose(); }}>
      <div className="cn-fg-modal">
        <div className="cn-fg-hd">
          <span>● COJUR · NEXUS · GRAFO DE RELAÇÕES</span>
          <button onClick={onClose} className="cn-fg-close">✕</button>
        </div>
        <svg viewBox={"0 0 " + (cx*2) + " " + (cy*2)} width="100%" style={{ display: "block", maxHeight: "70vh" }}>
          <defs>
            <radialGradient id="cn-fg-bg">
              <stop offset="0%" stopColor="rgba(0,229,255,.08)"/>
              <stop offset="100%" stopColor="rgba(2,3,12,0)"/>
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r={R+10} fill="url(#cn-fg-bg)"/>
          {edges.map(function(e, i){
            return <line key={i} x1={nodes[e.a].x} y1={nodes[e.a].y} x2={nodes[e.b].x} y2={nodes[e.b].y} stroke={edgeColor[e.t]} strokeWidth={1}/>;
          })}
          {nodes.map(function(n, i){
            const c = colorFor(n.p.diasRestantes);
            return (
              <g key={i} style={{ cursor: "pointer" }}>
                <circle cx={n.x} cy={n.y} r={9} fill={c} opacity={0.25}/>
                <circle cx={n.x} cy={n.y} r={5} fill={c} style={{ filter: "drop-shadow(0 0 6px " + c + ")" }}>
                  <title>{(n.p.num || n.p.numeroSEI || "—") + " · " + (n.p.assunto || "")}</title>
                </circle>
                <text x={n.x} y={n.y - 14} textAnchor="middle" fill="#cbd5e1" fontSize={9} fontFamily="JetBrains Mono">{(n.p.num || n.p.numeroSEI || "").slice(0, 12)}</text>
              </g>
            );
          })}
        </svg>
        <div className="cn-fg-legend">
          <span><span className="d" style={{background:"rgba(0,229,255,.6)"}}/>mesmo tribunal</span>
          <span><span className="d" style={{background:"rgba(255,46,91,.6)"}}/>mesma parte</span>
          <span><span className="d" style={{background:"rgba(184,77,255,.6)"}}/>mesmo interessado</span>
          <span style={{marginLeft:"auto",color:"var(--cn-dim)"}}>{nodes.length} nós · {edges.length} relações</span>
        </div>
      </div>
    </div>
  );
}

/* ═══ FIM · COJUR NEXUS UPGRADE PACK · INLINE ═══ */

/* ═══ CUSTAS — CPC + CLT completo ═══ */
/* Peças que SÃO o recurso/ação e exigem preparo, custas ou depósito recursal no protocolo */
const CUSTAS_PECAS=[
  /* ── CPC — Recursos com preparo obrigatório (art. 1.007 CPC) ── */
  "Apelação","Apelação Adesiva",
  "Agravo de Instrumento",
  "Recurso Especial","Agravo em Recurso Especial",
  "Recurso Extraordinário","Agravo em Recurso Extraordinário",
  "Recurso Ordinário Constitucional",
  "Embargos de Divergência",
  /* ── CPC — Ações com depósito obrigatório ── */
  "Ação Rescisória","Ação Rescisória Trabalhista",
  /* ── CLT — Recursos com custas (2%) + depósito recursal (arts. 789 e 899 CLT) ── */
  "Recurso Ordinário Trabalhista",
  "Recurso Ordinário em Mandado de Segurança",
  "Recurso de Revista",
  "Agravo de Instrumento em Recurso de Revista",
  "Recurso de Revista com Agravo",
  "Embargos TST",
  "Recurso Extraordinário Trabalhista",
  "Agravo de Petição"
];
/* Custas aparecem quando a peça sendo elaborada É um recurso/ação que exige preparo */
const hasCustas=p=>CUSTAS_PECAS.some(t=>(p?.tipoPeca||"").toLowerCase()===t.toLowerCase());
/* ═══ CUSTAS — valores estimados por tribunal (2025/2026) ═══ */
const CUSTAS_VALORES={
  /* ── Justiça Federal — preparo via GRU ── */
  "TRF-1":{label:"GRU Justiça Federal",valor:"Apelação: R$ 1.015,27 | AI: R$ 507,64 | Embs.Div.: R$ 1.015,27",url:"https://www.trf1.jus.br/trf1/servicos/gru/"},
  "TRF-2":{label:"GRU Justiça Federal",valor:"Apelação: R$ 1.015,27 | AI: R$ 507,64",url:"https://www.trf2.jus.br/"},
  "TRF-3":{label:"GRU Justiça Federal",valor:"Apelação: R$ 1.015,27 | AI: R$ 507,64",url:"https://www.trf3.jus.br/"},
  "TRF-4":{label:"GRU Justiça Federal",valor:"Apelação: R$ 1.015,27 | AI: R$ 507,64",url:"https://www.trf4.jus.br/"},
  "TRF-5":{label:"GRU Justiça Federal",valor:"Apelação: R$ 1.015,27 | AI: R$ 507,64",url:"https://www.trf5.jus.br/"},
  "TRF-6":{label:"GRU Justiça Federal",valor:"Apelação: R$ 1.015,27 | AI: R$ 507,64",url:"https://www.trf6.jus.br/"},
  /* ── Tribunais Superiores ── */
  "STJ":{label:"GRU STJ (DARF cód. 1312)",valor:"REsp/AREsp/Embs.Div.: R$ 327,24 + porte de remessa",url:"https://www.stj.jus.br/sites/portalp/Paginas/Servicos/Custas-e-porte-de-remessa.aspx"},
  "STF":{label:"GRU STF (DARF cód. 6665)",valor:"RE/ARE: R$ 327,24 + porte de remessa",url:"https://portal.stf.jus.br/"},
  /* ── Justiça do Trabalho — custas 2% + depósito recursal (Ato 51/TST, vigência 2025) ── */
  "TRT-1":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt1.jus.br/pje/"},
  "TRT-2":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt2.jus.br/pje/"},
  "TRT-3":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt3.jus.br/pje/"},
  "TRT-4":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt4.jus.br/pje/"},
  "TRT-5":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt5.jus.br/pje/"},
  "TRT-6":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt6.jus.br/pje/"},
  "TRT-7":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt7.jus.br/pje/"},
  "TRT-8":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt8.jus.br/pje/"},
  "TRT-9":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt9.jus.br/pje/"},
  "TRT-10":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt10.jus.br/pje/"},
  "TRT-11":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt11.jus.br/pje/"},
  "TRT-12":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt12.jus.br/pje/"},
  "TRT-13":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt13.jus.br/pje/"},
  "TRT-14":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt14.jus.br/pje/"},
  "TRT-15":{label:"Custas 2% + Depósito Recursal",valor:"RO: R$ 13.133,48 | RR/Embs.TST: R$ 26.266,95 | AI em RR: 50%",url:"https://pje.trt15.jus.br/pje/"},
  "TST":{label:"Custas 2% + Depósito Recursal TST",valor:"RR/Embs: R$ 26.266,95 | AI em RR: R$ 13.133,48",url:"https://pje.tst.jus.br/pje/"}
};
const getCustasInfo=function(tribunal){return CUSTAS_VALORES[tribunal]||null;};

/* ═══ TRIBUNAL SISTEMAS — URLs verificadas abril/2026 ═══ */
const TRIB_SISTEMA = {
  // TRFs — Justiça Federal (URLs verificadas pelo usuário)
  "TRF-1": {
    nome:"PJe TRF-1",
    url:"https://pje2g.trf1.jus.br/pje/login.seam",
    url1g:"https://pje1g.trf1.jus.br/pje/login.seam",
    sistema:"PJe", icone:"⚖️",
    info:"Login: gov.br nível Ouro ou CPF+senha com autenticação em dois fatores (MFA)"
  },
  "TRF-2": {
    nome:"e-Proc TRF-2",
    url:"https://eproc.trf2.jus.br/eproc/",
    url1g:"https://eproc.trf2.jus.br/eproc/",
    sistema:"eProc", icone:"⚖️",
    info:"Sistema único para 1º e 2º grau. Login: CPF+senha ou certificado digital"
  },
  "TRF-3": {
    nome:"PJe TRF-3",
    url:"https://pje2g.trf3.jus.br/pje/login.seam",
    url1g:"https://pje1g.trf3.jus.br/pje/login.seam",
    sistema:"PJe", icone:"⚖️",
    info:"Login: gov.br nível Ouro ou CPF+senha com autenticação em dois fatores (MFA)"
  },
  "TRF-4": {
    nome:"e-Proc TRF-4",
    url:"https://eproc.trf4.jus.br/eproc2/",
    url1g:"https://eproc.trf4.jus.br/eproc2/",
    sistema:"eProc", icone:"⚖️",
    info:"Sistema único para 1º e 2º grau. Login: CPF+senha ou certificado digital"
  },
  "TRF-5": {
    nome:"PJe TRF-5",
    url:"https://pje2g.trf5.jus.br/pje/login.seam",
    url1g:"https://pje1g.trf5.jus.br/pje/login.seam",
    sistema:"PJe", icone:"⚖️",
    info:"Login: gov.br nível Ouro ou CPF+senha com autenticação em dois fatores (MFA)"
  },
  "TRF-6": {
    nome:"PJe / e-Proc TRF-6",
    url:"https://pje.trf6.jus.br/pje/login.seam",
    url1g:"https://pje.trf6.jus.br/pje/login.seam",
    url2:"https://eproc.trf6.jus.br/eproc/",
    sistema:"PJe+eProc", icone:"⚖️",
    info:"PJe: pje.trf6.jus.br (1º e 2º grau) | e-Proc: eproc.trf6.jus.br"
  },
  // Tribunais Superiores
  "TST": {
    nome:"PJe-JT TST",
    url:"https://pje.tst.jus.br/pje/",
    sistema:"PJe", icone:"⚙️",
    info:"Login via gov.br ou certificado digital + MFA obrigatório (Portaria CNJ 140/2024)"
  },
  "STJ": {
    nome:"CPE STJ (Central do Processo Eletrônico)",
    url:"https://cpe.web.stj.jus.br/",
    sistema:"CPE", icone:"🏛️",
    info:"Peticionamento obrigatório pela CPE. Cadastro com certificado digital A3 ICP-Brasil. Acesso por CPF+senha após cadastro."
  },
  "STF": {
    nome:"Peticionamento STF",
    url:"https://peticionamento.stf.jus.br/",
    sistema:"e-STF", icone:"🏛️",
    info:"Acesso com certificado digital ICP-Brasil. Credenciamento automático no primeiro acesso."
  },
  // TRTs — Justiça do Trabalho (PJe-JT)
  "TRT-1": {nome:"PJe TRT-1", url:"https://pje.trt1.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-2": {nome:"PJe TRT-2", url:"https://pje.trt2.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-3": {nome:"PJe TRT-3", url:"https://pje.trt3.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-4": {nome:"PJe TRT-4", url:"https://pje.trt4.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-5": {nome:"PJe TRT-5", url:"https://pje.trt5.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-6": {nome:"PJe TRT-6", url:"https://pje.trt6.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-7": {nome:"PJe TRT-7", url:"https://pje.trt7.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-8": {nome:"PJe TRT-8", url:"https://pje.trt8.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-9": {nome:"PJe TRT-9", url:"https://pje.trt9.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-10":{nome:"PJe TRT-10", url:"https://pje.trt10.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-11":{nome:"PJe TRT-11", url:"https://pje.trt11.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-12":{nome:"PJe TRT-12", url:"https://pje.trt12.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-13":{nome:"PJe TRT-13", url:"https://pje.trt13.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-14":{nome:"PJe TRT-14", url:"https://pje.trt14.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
  "TRT-15":{nome:"PJe TRT-15", url:"https://pje.trt15.jus.br/pje/", sistema:"PJe", icone:"⚙️"},
};
const getTribSistema = t => TRIB_SISTEMA[t] || null;
const openTrib = function(t, numProcesso) {
  var s=getTribSistema(t);
  if(!s) return;
  // Copy process number to clipboard with multiple fallbacks
  if(numProcesso) {
    var copied = false;
    // Method 1: modern clipboard API
    if(navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(numProcesso).then(function(){
        showCopyToast(numProcesso);
      }).catch(function(){
        // Method 2: execCommand
        var ta=document.createElement("textarea");
        ta.value=numProcesso;ta.style.position="fixed";ta.style.opacity="0";
        document.body.appendChild(ta);ta.focus();ta.select();
        try{document.execCommand("copy");showCopyToast(numProcesso);}catch(e){}
        document.body.removeChild(ta);
      });
    } else {
      // Method 2 directly
      var ta=document.createElement("textarea");
      ta.value=numProcesso;ta.style.position="fixed";ta.style.opacity="0";
      document.body.appendChild(ta);ta.focus();ta.select();
      try{document.execCommand("copy");showCopyToast(numProcesso);}catch(e){}
      document.body.removeChild(ta);
    }
  }
  window.open(s.url,"_blank","noopener,noreferrer");
};

/* Toast de confirmação de cópia */
var _copyToastEl = null;
var showCopyToast = function(txt) {
  if(_copyToastEl) { document.body.removeChild(_copyToastEl); }
  var el = document.createElement("div");
  el.style.cssText = "position:fixed;bottom:90px;right:24px;z-index:9999;padding:12px 18px;border-radius:14px;background:linear-gradient(135deg,rgba(0,255,136,.18),rgba(0,255,136,.08));border:1px solid rgba(0,255,136,.55);color:#00ff88;font-size:13px;font-weight:700;font-family:Orbitron,monospace;box-shadow:0 0 24px rgba(0,255,136,.35),0 12px 32px rgba(0,0,0,.6);backdrop-filter:blur(12px);transition:opacity .4s;pointer-events:none;letter-spacing:.5px;";
  el.innerText = "✅ Nº copiado: " + txt;
  document.body.appendChild(el);
  _copyToastEl = el;
  setTimeout(function(){ el.style.opacity="0"; setTimeout(function(){ if(el.parentNode)document.body.removeChild(el); if(_copyToastEl===el)_copyToastEl=null; }, 400); }, 2800);
};



/* ═══ CSS ═══ */
const injectCSS = () => {
  if (document.getElementById("cj3")) return;
  const s = document.createElement("style");
  s.id = "cj3";
  s.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');

/* ═══ KEYFRAMES ═══ */
@keyframes cjUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes cjSc{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes cjPulse{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes cjUbCritPulse{0%,100%{text-shadow:0 0 6px currentColor,0 0 12px currentColor;transform:scale(1)}50%{text-shadow:0 0 14px currentColor,0 0 28px currentColor,0 0 42px currentColor;transform:scale(1.04)}}
.cj-ub-crit{animation:cjUbCritPulse 1.4s ease-in-out infinite;will-change:text-shadow,transform}
@keyframes tabIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes scanLine{0%{top:-2%}100%{top:102%}}
@keyframes shimmerSlide{0%{transform:translateX(-120%) skewX(-18deg)}100%{transform:translateX(220%) skewX(-18deg)}}
@keyframes neonPulse{0%,100%{box-shadow:0 0 14px rgba(0,229,255,.18),inset 0 0 14px rgba(0,229,255,.03)}50%{box-shadow:0 0 36px rgba(0,229,255,.38),inset 0 0 28px rgba(0,229,255,.07)}}
@keyframes neonPulseCr{0%,100%{box-shadow:0 0 12px rgba(255,46,91,.4)}50%{box-shadow:0 0 28px rgba(255,46,91,.9),0 0 55px rgba(255,46,91,.35)}}
@keyframes neonPulseWa{0%,100%{box-shadow:0 0 12px rgba(255,184,0,.35)}50%{box-shadow:0 0 28px rgba(255,184,0,.8),0 0 50px rgba(255,184,0,.3)}}
@keyframes borderGlow{0%{border-color:rgba(0,255,136,.18)}33%{border-color:rgba(0,229,255,.22)}66%{border-color:rgba(184,77,255,.18)}100%{border-color:rgba(0,255,136,.18)}}
@keyframes gaugeGlow{0%,100%{filter:drop-shadow(0 0 5px rgba(0,229,255,.7))}50%{filter:drop-shadow(0 0 14px rgba(0,229,255,1)) drop-shadow(0 0 28px rgba(0,229,255,.5))}}
@keyframes textGlow{0%,100%{text-shadow:0 0 8px currentColor}50%{text-shadow:0 0 18px currentColor,0 0 35px currentColor}}
@keyframes cjNeonAc{0%,100%{box-shadow:0 0 8px rgba(0,229,255,.35)}50%{box-shadow:0 0 22px rgba(0,229,255,.8),0 0 44px rgba(0,229,255,.3)}}
@keyframes cornerPulse{0%,100%{opacity:.55}50%{opacity:1}}

/* ═══ BASE ═══ */
.cj-up{animation:cjUp .35s ease both}
.cj-sc{animation:cjSc .22s ease both}
.cj-pulse{animation:cjPulse 1.8s ease infinite}
.cj-st>*{animation:cjUp .35s ease both}
.cj-st>:nth-child(1){animation-delay:.03s}.cj-st>:nth-child(2){animation-delay:.06s}
.cj-st>:nth-child(3){animation-delay:.09s}.cj-st>:nth-child(4){animation-delay:.12s}
.cj-st>:nth-child(5){animation-delay:.15s}.cj-st>:nth-child(6){animation-delay:.18s}
.cj-st>:nth-child(n+7){animation-delay:.21s}
.cj-pg{animation:tabIn .3s ease-out both}

/* ═══ SCROLLBAR ═══ */
::-webkit-scrollbar{width:3px;height:3px}
::-webkit-scrollbar-thumb{background:linear-gradient(180deg,rgba(0,229,255,.4),rgba(184,77,255,.4));border-radius:999px}
::-webkit-scrollbar-thumb:hover{background:linear-gradient(180deg,rgba(0,229,255,.7),rgba(184,77,255,.7))}
::-webkit-scrollbar-track{background:transparent}
@keyframes cjProtocolar{0%,100%{box-shadow:0 0 12px rgba(0,255,136,.4),0 0 30px rgba(0,255,136,.15)}50%{box-shadow:0 0 28px rgba(0,255,136,.9),0 0 60px rgba(0,255,136,.35),inset 0 0 10px rgba(0,255,136,.1)}}
@keyframes cjCorrecao{0%,100%{box-shadow:0 0 12px rgba(255,184,0,.45),0 0 28px rgba(255,184,0,.18)}50%{box-shadow:0 0 26px rgba(255,184,0,.95),0 0 55px rgba(255,184,0,.38),inset 0 0 10px rgba(255,184,0,.1)}}
.cj-protocolar{animation:cjProtocolar 1.8s ease-in-out infinite!important;border-color:rgba(0,255,136,.5)!important}
.cj-correcao{animation:cjCorrecao 1.8s ease-in-out infinite!important;border-color:rgba(255,184,0,.5)!important}
button:hover{filter:brightness(1.1)}
button:active{transform:scale(.97)}
input:focus,select:focus{border-color:rgba(0,229,255,.35)!important;box-shadow:0 0 0 2px rgba(0,229,255,.1),0 0 20px rgba(0,229,255,.06)!important}

/* ═══ LINKS ═══ */
a.cj-link,.cj-link{color:#67e8f9;text-decoration:none}
a.cj-link:hover,.cj-link:hover{text-decoration:underline}

/* ═══ NEON ANIMS ═══ */
.cj-neon-cr{animation:neonPulseCr 2s ease-in-out infinite}
.cj-neon-wa{animation:neonPulseWa 2.5s ease-in-out infinite}
.cj-neon-pulse{animation:neonPulse 3s ease-in-out infinite}
.cj-border-glow{animation:borderGlow 4s linear infinite}
.cj-gauge-glow{animation:gaugeGlow 2.5s ease-in-out infinite}
.cj-text-glow{animation:textGlow 2.5s ease-in-out infinite}

/* ═══ HUD CORNERS ═══ */
.cj-hud-tl{position:relative}
.cj-hud-tl::before{content:"";position:absolute;top:0;left:0;width:16px;height:16px;border-top:2px solid rgba(0,229,255,.6);border-left:2px solid rgba(0,229,255,.6);border-radius:4px 0 0 0;pointer-events:none;z-index:1;animation:cornerPulse 3s ease-in-out infinite}
.cj-hud-br{position:relative}
.cj-hud-br::after{content:"";position:absolute;bottom:0;right:0;width:16px;height:16px;border-bottom:2px solid rgba(184,77,255,.6);border-right:2px solid rgba(184,77,255,.6);border-radius:0 0 4px 0;pointer-events:none;z-index:1;animation:cornerPulse 3s ease-in-out .8s infinite}

/* ═══ SCAN SHIMMER ON CARDS ═══ */
.cj-shimmer{position:relative;overflow:hidden}
.cj-shimmer::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(90deg,transparent 30%,rgba(0,229,255,.04) 50%,transparent 70%);transform:translateX(-120%) skewX(-18deg);pointer-events:none;animation:shimmerSlide 5s ease-in-out infinite;z-index:0}

/* ═══ NAV ═══ */
.cj-nav-active{box-shadow:inset 3px 0 0 #00e5ff,0 0 20px rgba(0,229,255,.12)!important;background:linear-gradient(90deg,rgba(0,229,255,.12),rgba(0,229,255,.03))!important}

/* ═══ TABLE ═══ */
.cj-table{width:100%;border-collapse:separate;border-spacing:0;font-size:12px}
.cj-table thead th{position:sticky;top:0;z-index:2;background:rgba(2,2,12,.98);backdrop-filter:blur(14px);border-bottom:1px solid rgba(0,229,255,.15)}
.cj-table tbody tr:nth-child(even){background:rgba(0,229,255,.018)}
.cj-table tbody tr:hover{background:rgba(0,229,255,.06);box-shadow:inset 3px 0 0 rgba(0,229,255,.5)}

/* ═══ CAL CELL ═══ */
.cj-cal-cell{transition:all .15s;cursor:pointer}
.cj-cal-cell:hover{background:rgba(0,229,255,.1)!important;box-shadow:inset 0 0 0 1px rgba(0,229,255,.3)}

/* ═══ IA CARDS ═══ */
.cj-ia-card{background:linear-gradient(135deg,rgba(2,5,20,.97),rgba(1,3,12,.99));backdrop-filter:blur(24px);border:1px solid rgba(0,229,255,.12);border-radius:20px;padding:20px;position:relative;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.02),inset 0 1px 0 rgba(0,229,255,.06);animation:neonPulse 4s ease-in-out infinite}
.cj-ia-card::before{content:"";position:absolute;inset:0 0 auto 0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,229,255,.8),rgba(184,77,255,.4),transparent)}
.cj-ia-card::after{content:"";position:absolute;inset:auto 0 0;height:1px;background:linear-gradient(90deg,transparent,rgba(184,77,255,.3),transparent)}

/* ═══ RANK ═══ */
.cj-rank-item{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:12px;cursor:pointer;transition:all .22s;border:1px solid transparent}
.cj-rank-item:hover{background:rgba(0,229,255,.07);border-color:rgba(0,229,255,.22);transform:translateX(4px);box-shadow:0 0 20px rgba(0,229,255,.08),-4px 0 0 rgba(0,229,255,.4)}

/* ═══ BADGES ═══ */
.cj-badge-fire{background:linear-gradient(135deg,#ff2e5b,#b91c1c);color:#fff;font-size:10px;font-weight:800;padding:2px 9px;border-radius:999px;display:inline-flex;align-items:center;gap:3px;letter-spacing:.3px;box-shadow:0 0 14px rgba(255,46,91,.55),0 0 32px rgba(255,46,91,.25),inset 0 1px 0 rgba(255,255,255,.2)}
.cj-badge-zap{background:linear-gradient(135deg,#ffb800,#d97706);color:#fff;font-size:10px;font-weight:800;padding:2px 9px;border-radius:999px;display:inline-flex;align-items:center;gap:3px;box-shadow:0 0 14px rgba(255,184,0,.5),inset 0 1px 0 rgba(255,255,255,.2)}
.cj-badge-ok{background:linear-gradient(135deg,#00e5ff,#0891b2);color:#fff;font-size:10px;font-weight:800;padding:2px 9px;border-radius:999px;display:inline-flex;align-items:center;gap:3px;box-shadow:0 0 14px rgba(0,229,255,.55),inset 0 1px 0 rgba(255,255,255,.2)}
.cj-badge-ice{background:rgba(255,255,255,.08);color:#94a3b8;font-size:10px;font-weight:700;padding:2px 9px;border-radius:999px;display:inline-flex;align-items:center;gap:3px;border:1px solid rgba(255,255,255,.08)}

/* ═══ SUGGESTION ═══ */
.cj-suggestion{padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.06);background:rgba(0,229,255,.02);cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:10px;font-size:12px;color:#94a3b8}
.cj-suggestion:hover{background:rgba(0,229,255,.08);border-color:rgba(0,229,255,.3);color:#e2e8f0;box-shadow:0 0 20px rgba(0,229,255,.08)}

/* ═══ POSTIT ═══ */
.cj-postit{transition:all .22s ease;cursor:grab}
.cj-postit:hover{transform:scale(1.05) rotate(0deg)!important;z-index:10;box-shadow:8px 16px 40px rgba(0,0,0,.6),0 0 20px rgba(0,229,255,.08)!important}

/* ═══ CUSTAS ═══ */
.cj-custas-blink{animation:neonPulseWa 2.2s ease-in-out infinite}

/* ═══ SOFT ═══ */
/* ═══ SKELETON SHIMMER ═══ */
@keyframes cjShimmer{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}
.cj-skel{background:linear-gradient(90deg,rgba(255,255,255,.04) 25%,rgba(0,229,255,.08) 50%,rgba(255,255,255,.04) 75%);background-size:200px 100%;animation:cjShimmer 1.5s ease infinite;border-radius:8px}
.cj-skel-line{height:12px;margin-bottom:8px;border-radius:6px}
.cj-skel-block{height:60px;border-radius:12px;margin-bottom:10px}

/* ═══ PAGE TRANSITION ═══ */
@keyframes cjPageIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.cj-pg{animation:cjPageIn .3s ease-out both}
.cj-pg .cj-st>*{animation:cjUp .35s ease both}
.cj-pg .cj-st>:nth-child(1){animation-delay:.04s}
.cj-pg .cj-st>:nth-child(2){animation-delay:.08s}
.cj-pg .cj-st>:nth-child(3){animation-delay:.12s}
.cj-pg .cj-st>:nth-child(4){animation-delay:.16s}
.cj-pg .cj-st>:nth-child(5){animation-delay:.20s}
.cj-pg .cj-st>:nth-child(n+6){animation-delay:.24s}

/* ═══ SIDEBAR TRANSITION ═══ */
.cj-side{transition:width .25s cubic-bezier(.4,0,.2,1)}
.cj-side *{transition:opacity .18s ease}
.cj-side-label{transition:opacity .15s ease,max-width .25s ease;overflow:hidden;white-space:nowrap}

/* ═══ STEPPER ═══ */
.cj-stepper{display:flex;align-items:center;gap:0;padding:12px 0}
.cj-step-dot{width:10px;height:10px;border-radius:50%;border:2px solid rgba(0,229,255,.3);background:transparent;flex-shrink:0;transition:all .2s;cursor:pointer;position:relative;z-index:1}
.cj-step-dot.active{background:#00e5ff;border-color:#00e5ff;box-shadow:0 0 10px rgba(0,229,255,.6)}
.cj-step-dot.done{background:rgba(0,255,136,.8);border-color:#00ff88;box-shadow:0 0 6px rgba(0,255,136,.4)}
.cj-step-line{height:2px;flex:1;background:rgba(0,229,255,.15);min-width:8px}
.cj-step-line.done{background:rgba(0,255,136,.5)}

/* ═══ NOTIFICATION PANEL ═══ */
@keyframes cjSlideDown{from{opacity:0;transform:translateY(-8px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.cj-notif-panel{animation:cjSlideDown .2s ease both}

.cj-soft{box-shadow:0 20px 50px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.04)}
.cj-dot{width:8px;height:8px;border-radius:50%;display:inline-block}
.cj-kd{outline:2px dashed rgba(0,229,255,.45);background:rgba(0,229,255,.06)!important}

/* ═══ MISC ═══ */
.cj-glass{background:rgba(0,229,255,.04);backdrop-filter:blur(14px);border:1px solid rgba(0,229,255,.12);border-radius:16px;padding:14px 16px}@keyframes neonBlink{0%,100%{box-shadow:0 0 6px #ff2e5b,0 0 18px #ff2e5b,0 0 36px #ff2e5b;border-color:rgba(255,46,91,.8)}50%{box-shadow:0 0 2px #ff2e5b;border-color:rgba(255,46,91,.3)}}
@keyframes textBlink{0%,100%{opacity:1}50%{opacity:.35}}
.cj-sust-pulse{animation:neonBlink .9s ease-in-out infinite!important}

/* ═══ MESH BLOB ANIMATIONS ═══ */
@keyframes cjBlobA{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(10vw,5vh) scale(1.15)}66%{transform:translate(-5vw,10vh) scale(.92)}}
@keyframes cjBlobB{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-12vw,-8vh) scale(1.1)}}
@keyframes cjBlobC{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(8vw,-6vh) scale(1.18)}80%{transform:translate(-4vw,4vh) scale(.95)}}
@keyframes cjBlobD{0%,100%{transform:translate(0,0) scale(1)}60%{transform:translate(-6vw,-10vh) scale(1.12)}}
.cj-blob-a{animation:cjBlobA 28s ease-in-out infinite}
.cj-blob-b{animation:cjBlobB 32s ease-in-out infinite}
.cj-blob-c{animation:cjBlobC 36s ease-in-out infinite}
.cj-blob-d{animation:cjBlobD 30s ease-in-out infinite}

/* ═══ CONFETTI ═══ */
@keyframes cjConfettiFall{
  0%{transform:translate(0,0) rotate(0deg);opacity:1}
  100%{transform:translate(var(--cj-x,0),100vh) rotate(720deg);opacity:0}
}

/* ═══ PREVIEW FADE IN ═══ */
@keyframes cjPreviewIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}

/* ═══ SORTABLE TABLE HEADERS ═══ */
.cj-table thead th.cj-sortable{cursor:pointer;user-select:none;transition:color .15s}
.cj-table thead th.cj-sortable:hover{color:#00e5ff}
.cj-table thead th.cj-sorted{color:#00e5ff}

/* ═══ RESPONSIVE MOBILE ═══ */
@media(max-width:900px){
  .cj-side{width:60px!important}
  .cj-side-label{display:none!important}
  .cj-pg{padding:12px 8px!important}
}
@media(max-width:680px){
  .cj-side{width:0!important;overflow:hidden!important;border:none!important}
  .cj-pg{margin-left:0!important}
}
`;
  document.head.appendChild(s);
};

/* ═══ THEME ═══ */

/* ═══ FERIADOS NACIONAIS ═══ */
var FERIADOS_NAC = [
  "2025-01-01","2025-04-18","2025-04-21","2025-05-01","2025-06-19",
  "2025-09-07","2025-10-12","2025-11-02","2025-11-15","2025-11-20","2025-12-25",
  "2026-01-01","2026-04-03","2026-04-21","2026-05-01","2026-06-04",
  "2026-09-07","2026-10-12","2026-11-02","2026-11-15","2026-11-20","2026-12-25",
  "2027-01-01","2027-03-26","2027-04-21","2027-05-01","2027-05-27",
  "2027-09-07","2027-10-12","2027-11-02","2027-11-15","2027-11-20","2027-12-25"
];
/* Recesso forense: 20/dez a 20/jan (art. 220 CPC) */
var isRecessoForense=function(d){var m=d.getMonth(),day=d.getDate();return(m===11&&day>=20)||(m===0&&day<=20);};
var isDU = function(d) {
  var dow = d.getDay();
  if (dow === 0 || dow === 6) return false;
  if (isRecessoForense(d)) return false;
  var iso=d.toISOString().split("T")[0];
  return FERIADOS_NAC.indexOf(iso)===-1;
};
var subDU = function(date, n) {
  // go back n business days from date
  var d = new Date(date); var count = 0;
  while (count < n) { d.setDate(d.getDate() - 1); if (isDU(d)) count++; }
  return d;
};
var isSustAlerta = function(p) {
  if (!p.dataSustentacao) return false;
  if (p.tipoPeca !== "Sustentação Oral") return false;
  var sust = new Date(p.dataSustentacao);
  if (isNaN(sust)) return false;
  var hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  sust.setHours(0, 0, 0, 0);
  if (hoje > sust) return false;
  /* Alerta ativa quando faltam 5 du ou menos para a sessão */
  var limite = subDU(sust, 5);
  limite.setHours(0, 0, 0, 0);
  return hoje >= limite;
};
/* Nível do alerta de sustentação:
   "critico"  = deadline de 48h úteis já chegou ou passou (≤2 du antes da sessão)
   "urgente"  = falta 1-2 du para o deadline de envio (3-4 du antes da sessão)
   "preparo"  = tempo de preparar, mas já está próximo (5 du antes da sessão)
   null       = fora da janela de alerta */
var getSustNivel = function(p) {
  if (!p.dataSustentacao) return null;
  var sust = new Date(p.dataSustentacao);
  if (isNaN(sust)) return null;
  var hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  sust.setHours(0, 0, 0, 0);
  if (hoje > sust) return null;
  /* Contar dias úteis entre hoje e a sessão */
  var du = 0; var d = new Date(hoje);
  while (d < sust) { d.setDate(d.getDate() + 1); if (isDU(d)) du++; }
  if (du <= 2) return "critico";
  if (du <= 4) return "urgente";
  if (du <= 5) return "preparo";
  return null;
};
var getSustDeadlineStr = function(p) {
  if (!p.dataSustentacao) return null;
  var sust = new Date(p.dataSustentacao);
  if (isNaN(sust)) return null;
  var deadline = subDU(sust, 2);
  return fmt(deadline);
};
var getSustCountdown = function(p) {
  if (!p.dataSustentacao) return null;
  var sust = new Date(p.dataSustentacao);
  if (isNaN(sust)) return null;
  var agora = new Date();
  var diff = sust - agora;
  if (diff < 0 || diff > 24 * 60 * 60 * 1000) return null;
  var h = Math.floor(diff / 3600000);
  var m = Math.floor((diff % 3600000) / 60000);
  return h + "h " + String(m).padStart(2, "0") + "min";
};

const KD={bg:"#020208",card:"rgba(4,6,20,.92)",cardH:"rgba(6,10,28,.95)",side:"rgba(2,3,14,.99)",modal:"rgba(2,4,16,.99)",brd:"rgba(0,229,255,.1)",txt:"#e2e8f0",dim:"#4e6a8a",dim2:"#3a5070",ac:"#00e5ff",acG:"rgba(0,229,255,.14)",cr:"#ff2e5b",crG:"rgba(255,46,91,.15)",wa:"#ffb800",waG:"rgba(255,184,0,.15)",su:"#00ff88",suG:"rgba(0,255,136,.15)",pu:"#b84dff",puG:"rgba(184,77,255,.15)"};
const KL={bg:"#f0f4f8",card:"rgba(255,255,255,.95)",cardH:"rgba(248,252,255,.98)",side:"rgba(240,245,255,.98)",modal:"rgba(255,255,255,.99)",brd:"rgba(0,150,200,.2)",txt:"#0f172a",dim:"#475569",dim2:"#64748b",ac:"#0284c7",acG:"rgba(2,132,199,.12)",cr:"#dc2626",crG:"rgba(220,38,38,.12)",wa:"#d97706",waG:"rgba(217,119,6,.12)",su:"#059669",suG:"rgba(5,150,105,.12)",pu:"#7c3aed",puG:"rgba(124,58,237,.12)"};
let K=KD;

/* ═══ MODELOS DE DESPACHO ═══ */
var DESPACHO_PROTOCOLO = "Prezado Evandro,\n\nEncaminho em anexo protocolo de peça judicial elaborada para conferência, registro na planilha e baixa no SEI.\n\nAtenciosamente,\nJoão Gabriel Albuquerque Araújo\nAdvogado do CFM";
var DESPACHO_CORRECAO = "Prezado Dr. João Paulo,\n\nEncaminho em anexo peça judicial elaborada para sua apreciação e correção antes do protocolo.\n\nAtenciosamente,\nJoão Gabriel Albuquerque Araújo\nAdvogado do CFM";
var DESPACHO_ANALISE = "Prezado Dr. João Paulo,\n\nEncaminho em anexo Peça judicial elaborada para sua apreciação.\n\nAtenciosamente,\nJoão Gabriel Albuquerque Araújo\nAdvogado do CFM";

function copyText(txt, onDone) {
  try {
    navigator.clipboard.writeText(txt).then(function(){ if(onDone) onDone(); }).catch(function(){
      var ta=document.createElement("textarea");ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta);if(onDone)onDone();
    });
  } catch(e) {
    var ta=document.createElement("textarea");ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta);if(onDone)onDone();
  }
}

const uC=d=>d<=10?K.cr:d<30?K.wa:K.su;
const uL=d=>d<=10?"Crítico":d<30?"Intermediário":"Normal";
const uG=d=>d<=10?K.crG:d<30?K.waG:K.suG;
const getInpSt=()=>({width:"100%",padding:"10px 12px",borderRadius:12,border:`1px solid ${K.brd}`,background:K.acG,color:K.txt,fontSize:13,outline:"none",fontFamily:"inherit",transition:"border-color .2s"});
const getLblSt=()=>({display:"block",fontSize:11,fontWeight:600,color:K.dim,textTransform:"uppercase",letterSpacing:".5px",marginBottom:4});
const getBtnPrim=()=>({padding:"9px 18px",borderRadius:12,border:`1px solid ${K.ac}55`,background:`linear-gradient(135deg,${K.acG},${K.puG})`,boxShadow:`0 0 22px ${K.ac}44,0 12px 32px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.1)`,color:K.ac,fontSize:13,fontWeight:700,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6,fontFamily:"inherit",textShadow:`0 0 8px ${K.ac}aa`});
const getBtnGhost=()=>({padding:"8px 14px",borderRadius:12,border:`1px solid ${K.brd}`,background:K.acG,color:K.dim,fontSize:13,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6,transition:"all .18s",fontFamily:"inherit"});
/* Legacy aliases — recriados como getters simples (sem Proxy) para compatibilidade com React style spread */
const inpSt=getInpSt();
const lblSt=getLblSt();
const btnPrim=getBtnPrim();
const btnGhost=getBtnGhost();
const btnDanger={...getBtnGhost(),borderColor:K.cr,color:K.cr};
/* Reatualiza estilos quando tema muda */
const refreshStyles=()=>{Object.assign(inpSt,getInpSt());Object.assign(lblSt,getLblSt());Object.assign(btnPrim,getBtnPrim());Object.assign(btnGhost,getBtnGhost());Object.assign(btnDanger,{...getBtnGhost(),borderColor:K.cr,color:K.cr});};

/* ═══ DATE ═══ */
const curDate=(base)=>{const d=base?new Date(base):new Date();if(isNaN(d.getTime()))return new Date(NaN);return new Date(d.getFullYear(),d.getMonth(),d.getDate(),12,0,0,0)};
/* NOW é recalculado dinamicamente para evitar stale após horas com app aberto */
const getNOW=()=>curDate();
var NOW=getNOW();
const addD=(d,n)=>{const r=new Date(d);r.setDate(r.getDate()+n);return r};
const diffD=(a,b)=>(!a||!b)?999:Math.ceil((a-b)/86400000);
const isBiz=d=>{const w=curDate(d).getDay();return w!==0&&w!==6};
const bizDiff=(a,b)=>(!a||!b)?999:diffD(curDate(a),curDate(b));
const fmt=d=>(d instanceof Date?d.toLocaleDateString("pt-BR"):"");
const fmtS=d=>(d instanceof Date?d.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"}):"");
const toD=v=>{
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};
const toISO=d=>{try{return d instanceof Date?d.toISOString().slice(0,10):(d||"")}catch(e){return ""}};

const STS=["Ativo","Em Execução","Em Acompanhamento","Pronto p/ Protocolo","Em Correção","Aguardando Resposta","Aguardando Decisão","Concluído","Suspenso","Arquivado"];
const isProtocolar=p=>p.status==="Pronto p/ Protocolo";
const isExecucao=p=>p.status==="Em Execução";
const isAcompanhamento=p=>p.status==="Em Acompanhamento";
const isCorrecao=p=>p.status==="Em Correção";
const PHS=[
  "Triagem","Distribuição","Inicial / Petição Inicial","Análise","Tutela Provisória","Citação / Intimação",
  "Contestação / Informações","Réplica / Manifestação","Saneamento","Produção de Provas","Audiência",
  "Razões Finais / Memoriais","Minuta Pendente","Revisão","Aguardando Assinatura","Pronto para Envio",
  "Protocolado","Aguardando Julgamento","Aguardando Sessão","Sustentação Oral Agendada","Aguardando Publicação",
  "Aguardando Acórdão","Recursal","Contrarrazões","Cumprimento de Sentença","Liquidação","Execução",
  "Aguardando Retorno Externo","Trânsito em Julgado","Cumprido","Arquivado"
];
const TRIBS=[
  "TRF-1","TRF-2","TRF-3","TRF-4","TRF-5","TRF-6",
  "TRT-1","TRT-2","TRT-3","TRT-4","TRT-5","TRT-6","TRT-7","TRT-8","TRT-9","TRT-10","TRT-11","TRT-12",
  "TRT-13","TRT-14","TRT-15","TRT-16","TRT-17","TRT-18","TRT-19","TRT-20","TRT-21","TRT-22","TRT-23","TRT-24",
  "TST","STJ","STF","Outro"
];
const TACOES=[
  "Ação Ordinária","Procedimento Comum","Ação Declaratória","Ação Declaratória de Nulidade","Ação Declaratória de Inexistência de Débito",
  "Ação Condenatória","Ação Constitutiva","Ação Anulatória","Ação Civil Pública","Ação Popular","Mandado de Segurança",
  "Mandado de Segurança Coletivo","Habeas Data","Reclamação","Ação de Cobrança","Ação Monitória","Ação de Execução de Título Extrajudicial",
  "Cumprimento de Sentença","Ação de Obrigação de Fazer","Ação de Obrigação de Não Fazer","Ação de Entrega de Coisa",
  "Consignação em Pagamento","Ação de Exigir Contas","Ação de Oferecer Contas","Produção Antecipada de Provas","Embargos de Terceiro",
  "Oposição","Homologação do Penhor Legal","Restauração de Autos","Inventário","Arrolamento","Interdição","Tutela Cautelar Antecedente",
  "Tutela Antecipada Antecedente","Incidente de Desconsideração da Personalidade Jurídica","Incidente de Assunção de Competência",
  "Incidente de Resolução de Demandas Repetitivas","Conflito de Competência","Arguição de Inconstitucionalidade","Exceção de Impedimento",
  "Exceção de Suspeição","Pedido de Tutela Provisória","Notificação","Interpelação","Protesto Judicial","Apelação","Agravo de Instrumento",
  "Agravo Interno","Embargos de Declaração","Recurso Especial","Agravo em Recurso Especial","Recurso Extraordinário",
  "Agravo em Recurso Extraordinário","Embargos de Divergência","Remessa Necessária","Reclamação Trabalhista","Reclamação Trabalhista - Rito Ordinário",
  "Reclamação Trabalhista - Rito Sumaríssimo","Reclamação Trabalhista - Rito Sumário","Dissídio Individual","Dissídio Coletivo",
  "Dissídio Coletivo de Greve","Ação de Cumprimento","Ação Anulatória de Cláusulas Convencionais","Ação Rescisória","Ação Rescisória Trabalhista",
  "Mandado de Segurança Trabalhista","Homologação de Acordo Extrajudicial","Inquérito Judicial para Apuração de Falta Grave",
  "Consignação em Pagamento Trabalhista","Embargos à Execução","Impugnação à Sentença de Liquidação","Agravo de Petição",
  "Recurso Ordinário Trabalhista","Recurso Ordinário em Mandado de Segurança","Recurso de Revista","Agravo de Instrumento em Recurso de Revista",
  "Recurso de Revista com Agravo","Embargos TST","Recurso Extraordinário Trabalhista","Sustentação Oral","Outro"
];
const TIPOS_PECA=[
  // ── Defesa e atos iniciais ──
  "Contestação","Reconvenção","Exceção de Incompetência","Impugnação ao Valor da Causa",
  // ── Recursos ordinários 1G→2G ──
  "Apelação","Apelação Adesiva","Agravo de Instrumento","Agravo Retido",
  // ── Recursos internos tribunais ──
  "Agravo Interno","Embargos de Declaração","Embargos Infringentes","Embargos de Divergência",
  // ── Recursos excepcionais (STJ/STF) ──
  "Recurso Especial","Agravo em Recurso Especial","Recurso Extraordinário","Agravo em Recurso Extraordinário","Recurso Ordinário Constitucional",
  // ── MS, contrarrazões e incidentes ──
  "Informações em MS","Contrarrazões","Contraminuta","Impugnação ao Cumprimento de Sentença",
  "Exceção de Pré-Executividade","Embargos à Execução","Embargos de Terceiro",
  // ── Tutelas e cautelares ──
  "Manifestação sobre Tutela","Pedido de Efeito Suspensivo","Petição Cautelar",
  // ── Manifestações gerais ──
  "Manifestação","Petição Simples","Razões de Recurso","Contrarrazões de Recurso",
  // ── Memoriais e sustentação oral ──
  "Memorial","Memoriais","Alegações Finais","Sustentação Oral",
  // ── Cumprimento e execução ──
  "Cumprimento de Sentença","Impugnação ao Cumprimento","Cálculos de Liquidação",
  // ── Administrativo CFM ──
  "Parecer Jurídico","Ofício","Nota Técnica","Despacho de Andamento",
  // ── Contratos ──
  "Análise de Contrato",
  // ── Outros ──
  "Outro"
];
const inferTipoPeca=p=>{
  if(p?.tipoPeca) return p.tipoPeca;
  const ac=(p?.tipoAcao||"").toLowerCase();
  if(ac.includes("agravo interno")) return "Agravo Interno";
  if(ac.includes("embargos de declaração")) return "Embargos de Declaração";
  if(ac.includes("mandado de segurança")) return "Informações em MS";
  if(ac.includes("sustentação")) return "Sustentação Oral";
  if(ac.includes("contrarraz")||ac.includes("contraminuta")) return "Contraminuta";
  if(ac.includes("contrato")||ac.includes("licitação")||ac.includes("convênio")||ac.includes("termo de referência")) return "Análise de Contrato";
  return p?.tipo==="jud" ? "Manifestação" : "Parecer Jurídico";
};
const buildChecklist=(tipo,p)=>{
  const base={
    "Parecer Jurídico":["Delimitar controvérsia em relatório conciso","Mapear normas centrais do CFM e checar vigência","Estruturar fundamentação em texto corrido, com parágrafos curtos","Inserir 1 ou 2 caixas normativas com transcrição integral exata","Conferir coerência fática, normativa e anti-invenção","Fechar com quadro-síntese e conclusão expressa da COJUR"],
    "Ofício":["Confirmar destinatário, cargo e órgão","Definir objeto do ofício em uma frase clara","Expor contexto fático de forma objetiva","Indicar fundamento normativo indispensável","Listar providência solicitada e prazo de resposta","Revisar tom institucional e anexos"],
    "Despacho de Andamento":["Identificar providência pendente","Registrar fato novo ou documento juntado","Indicar encaminhamento objetivo","Definir setor responsável e retorno esperado","Conferir concisão e clareza institucional"],
    "Informações em MS":["Ler integralmente inicial, liminar e documentos","Fixar ato apontado como coator e contexto administrativo","Levantar bloco normativo central do CFM","Rebater fumus e periculum quando pertinente","Demonstrar legalidade do ato impugnado","Conferir pedido final e documentos essenciais"],
    "Contestação":["Mapear todos os pedidos e causas de pedir","Levantar preliminares cabíveis","Fixar tese central de mérito","Rebater ponto a ponto os fatos da inicial","Anexar documentos e precedentes úteis","Revisar pedidos finais e provas"],
    "Manifestação":["Identificar exatamente o ponto sobre o qual se manifesta","Resgatar histórico processual mínimo necessário","Rebater argumentos novos da parte contrária","Indicar norma, precedente ou documento decisivo","Encerrar com pedido objetivo"],
    "Contraminuta":["Ler integralmente a decisão agravada e o recurso","Definir tese defensiva principal","Rebater todos os capítulos do agravo","Destacar ausência de probabilidade ou risco, se aplicável","Conferir peças e documentos referidos","Fechar com pedido de desprovimento"],
    "Agravo Interno":["Ler decisão monocrática e identificar fundamentos centrais","Definir erro de premissa, omissão ou inadequação da decisão","Reforçar fundamentos normativos e precedentes","Organizar capítulo específico para urgência ou tutela","Checar peças obrigatórias e tempestividade","Ajustar pedidos de reconsideração e provimento"],
    "Embargos de Declaração":["Identificar omissão, contradição, obscuridade ou erro material","Demonstrar objetivamente o vício por item","Evitar rediscussão indevida do mérito","Indicar reflexo prático da correção","Revisar pedido de saneamento ou prequestionamento"],
    "Sustentação Oral":["Definir tese central em 3 ideias-força","Selecionar precedentes e normas-chave","Preparar abertura, desenvolvimento e fecho em tempo compatível","Antecipar perguntas do colegiado","Separar memoriais e documentos de apoio"],
    "Memoriais":["Sintetizar controvérsia e tese central","Selecionar fundamentos e precedentes decisivos","Enfatizar pontos sensíveis para o julgamento","Ajustar linguagem objetiva e institucional","Conferir endereçamento e pedido final"],
    "Análise de Contrato":["Identificar partes, objeto e vigência do contrato","Verificar cláusulas de rescisão, multa e renovação","Checar conformidade com normas do CFM e legislação aplicável","Analisar riscos jurídicos e cláusulas abusivas","Emitir parecer sobre viabilidade e recomendações","Conferir assinaturas e representação legal"],
    "Outro":["Definir objetivo da peça","Listar pontos obrigatórios","Separar fundamentos normativos","Checar documentos de apoio","Revisar clareza e pedido final"]
  };
  return (base[tipo]||base["Outro"]).map(text=>({text,done:false}));
};

/* ═══ SCORE ═══ */
const calcScore=p=>{let s=0,dr=p.diasRestantes||0;if(isProtocolar(p)||isCorrecao(p))return 100;if(dr<=3)s+=40;else if(dr<=5)s+=34;else if(dr<=10)s+=26;else if(dr<=20)s+=16;else if(dr<30)s+=8;s+=(p.impacto||3)*5+(p.complexidade||3)*3;if(p.reuniao)s+=10;if(p.sustentacao)s+=15;if((p.semMov||0)>10)s+=10;if(p.depTerc)s+=8;if(!p.proxProv)s+=8;if(!p.responsavel)s+=6;return Math.min(100,s)};
const recalc=p=>{const pf=toD(p.prazoFinal);const dr=pf?bizDiff(pf,NOW):999;const tipoPeca=inferTipoPeca(p);return{...p,prazoFinal:pf,diasRestantes:dr,tipoPeca,checklist:(p.checklist&&p.checklist.length?p.checklist:buildChecklist(tipoPeca,p)),score:calcScore({...p,diasRestantes:dr,tipoPeca})}};

/* ═══ DATA ═══ */
let _nid=100;const nid=()=>"N"+(++_nid);
const mkA=ov=>recalc({id:nid(),num:"",numeroSEI:"",assunto:"",interessado:"",orgao:"CFM",responsavel:"João Gabriel",linkRef:"",linkSEI:"",prazoFinal:addD(NOW,30),status:"Ativo",fase:"Triagem",impacto:3,complexidade:3,tipoPeca:"Parecer Jurídico",obs:"",ultMov:NOW,proxProv:"",dataProv:null,estTempo:"",depTerc:false,reuniao:false,sustentacao:false,dataSustentacao:null,tempoFala:15,tags:[],semMov:0,hist:[],checklist:[],tipo:"adm",progresso:0,tempoReal:0,...ov});
const mkJ=ov=>recalc({id:nid(),num:"",numeroSEI:"",assunto:"",tribunal:"TRF-1",orgao:"Justiça Federal",responsavel:"João Gabriel",linkRef:"",linkSEI:"",tipoAcao:"Ação Ordinária",tipoPeca:"Manifestação",parteContraria:"",prazoFinal:addD(NOW,30),pubDJe:null,intersticio:15,status:"Ativo",fase:"Triagem",impacto:3,complexidade:3,destaque:"",obs:"",ultMov:NOW,proxProv:"",dataProv:null,estTempo:"",depTerc:false,reuniao:false,sustentacao:false,tags:[],semMov:0,hist:[],checklist:[],tipo:"jud",motivoAcompanhamento:"",progresso:0,...ov});


/* ═══ SEI → JUDICIAL LINK UTILS ═══ */
var findByNum = function(st, num) {
  if(!num) return null;
  var normalNum = num.replace(/[.\-\/\s]/g,'');
  return [...st.adm,...st.jud].find(function(p){
    return p.num && p.num.replace(/[.\-\/\s]/g,'') === normalNum;
  }) || null;
};
var findBySEI = function(st, sei) {
  if(!sei) return null;
  return [...st.adm,...st.jud].find(function(p){return p.numeroSEI===sei;}) || null;
};

const getLinkedEventDate=p=>p.dataProv?toD(p.dataProv):p.prazoFinal?toD(p.prazoFinal):NOW;
const buildLinkedMeeting=p=>({
  id:nid(),
  linkedProcessId:p.id,
  autoLinked:true,
  titulo:`Reunião vinculada · ${p.assunto||p.num||"Prazo judicial"}`,
  data:getLinkedEventDate(p),
  hora:"14:00",
  local:"A definir",
  obs:[
    `Processo: ${p.num||"Sem nº"}`,
    `Tribunal: ${p.tribunal||"—"}`,
    `Tipo de ação: ${p.tipoAcao||"—"}`,
    p.destaque?`Destaque: ${p.destaque}`:null,
    p.obs?`Observações: ${p.obs}`:null
  ].filter(Boolean).join(" | "),
  checklist:[
    "Confirmar pauta da reunião",
    "Separar peças essenciais",
    "Levar resumo da controvérsia",
    "Validar estratégia"
  ]
});
const buildLinkedSust=p=>({
  id:nid(),
  linkedProcessId:p.id,
  autoLinked:true,
  data:getLinkedEventDate(p),
  hora:"09:00",
  tribunal:p.tribunal||"Outro",
  tema:`Sustentação oral · ${p.assunto||p.num||"Prazo judicial"}`,
  obs:[
    `Processo: ${p.num||"Sem nº"}`,
    `Tipo de ação: ${p.tipoAcao||"—"}`,
    p.destaque?`Destaque: ${p.destaque}`:null,
    p.obs?`Observações: ${p.obs}`:null
  ].filter(Boolean).join(" | "),
  checklist:[
    "Revisar memoriais",
    "Confirmar composição do colegiado",
    "Ensaiar sustentação",
    "Separar precedentes"
  ]
});
const syncJudicialLinks=(st,p)=>{
  let reun=[...st.reun],sust=[...st.sust];
  const rIdx=reun.findIndex(r=>r.linkedProcessId===p.id&&r.autoLinked);
  if(p.reuniao){
    const next=buildLinkedMeeting(p);
    if(rIdx>=0){
      reun[rIdx]={...reun[rIdx],...next,id:reun[rIdx].id,hora:reun[rIdx].hora||next.hora,local:reun[rIdx].local||next.local,checklist:reun[rIdx].checklist?.length?reun[rIdx].checklist:next.checklist};
    }else reun.push(next);
  }else if(rIdx>=0){
    reun=reun.filter((_,i)=>i!==rIdx);
  }
  const sIdx=sust.findIndex(s=>s.linkedProcessId===p.id&&s.autoLinked);
  if(p.sustentacao){
    const next=buildLinkedSust(p);
    if(sIdx>=0){
      sust[sIdx]={...sust[sIdx],...next,id:sust[sIdx].id,hora:sust[sIdx].hora||next.hora,tribunal:p.tribunal||sust[sIdx].tribunal||next.tribunal,checklist:sust[sIdx].checklist?.length?sust[sIdx].checklist:next.checklist};
    }else sust.push(next);
  }else if(sIdx>=0){
    sust=sust.filter((_,i)=>i!==sIdx);
  }
  return {...st,reun,sust};
};

const D_ADM=[
  mkA({id:"A1",num:"26.0.000001826-0",numeroSEI:"26.0.000001826-0",assunto:"Tutela Cautelar Administrativa - PAF 005/2025 - CREMESP",interessado:"Maria Camila Lunardi (CREMESP nº 112.691)",orgao:"CFM",prazoFinal:addD(NOW,15),fase:"Análise",impacto:4,complexidade:4,tipoPeca:"Parecer Jurídico",obs:"Pedido de providências c/ tutela cautelar administrativa. Nulidades estruturais, irregularidades graves no PAF 005/2025 do CREMESP. Adv. Marco Aurelio Souza (OAB/SP 193.035). Recebido via Presidência em 23/02/2026.",proxProv:"Analisar inicial e emitir parecer",dataProv:addD(NOW,5),estTempo:"6h",tags:["CREMESP","cautelar","PAF"],semMov:0,hist:[{d:addD(NOW,-45),e:"Recebido via e-mail Presidência 23/02/2026"},{d:addD(NOW,-45),e:"Abertura SEI e encaminhamento à COJUR"}]}),
  mkA({id:"A2",num:"25.0.000011329-0",numeroSEI:"25.0.000011329-0",assunto:"Indícios de fraude em Diploma Digital (XML) validado pelo MEC",interessado:"CREMEC (CRM-CE)",orgao:"CFM",prazoFinal:addD(NOW,10),status:"Aguardando Resposta",fase:"Aguardando Retorno Externo",impacto:4,complexidade:4,tipoPeca:"Despacho",obs:"Falsificação documental de diploma digital. XML fraudulento validado pelo portal do MEC. Encaminhado à COADM e COINF para análise técnica dos mecanismos de segurança. Denúncia PF e SERES/MEC já realizadas pelo CREMEC. Despacho Coordenador José Alejandro Bullon Silva em 02/12/2025.",proxProv:"Cobrar retorno COADM/COINF",dataProv:addD(NOW,3),estTempo:"1h",depTerc:true,tags:["fraude","diploma","MEC","CREMEC"],semMov:0,hist:[{d:addD(NOW,-130),e:"Despacho Supervisor Evandro Junior 01/12/2025"},{d:addD(NOW,-129),e:"Encaminhado COADM/COINF por Coordenador 02/12/2025"}]}),
  mkA({id:"A3",num:"26.0.000003358-7",numeroSEI:"26.0.000003358-7",assunto:"Consulta OAB/RJ - Exclusividade prescrição atividade física (Lei 9.696/98)",interessado:"Renata Campos Falcão Baalbaki (OAB/RJ - Comissão Direito Desportivo)",orgao:"CFM",prazoFinal:addD(NOW,20),fase:"Triagem",impacto:3,complexidade:3,tipoPeca:"Parecer Jurídico",obs:"Consulta institucional da Comissão de Direito Desportivo da OAB/RJ sobre inexistência de exclusividade do profissional de educação física na prescrição de atividade física na área da saúde. Ofício nº 001/2026 de 26/03/2026. Endereçado à Presidência CFM A/C Dr. João Gabriel.",proxProv:"Analisar consulta e elaborar parecer",dataProv:addD(NOW,10),estTempo:"8h",tags:["OAB","atividade física","CONFEF","Lei 9.696"],semMov:0,hist:[{d:addD(NOW,-9),e:"Recebido via e-mail Presidência 31/03/2026"},{d:addD(NOW,-9),e:"Abertura SEI 26.0.000003358-7"}]}),
];
const D_JUD=[
  mkJ({id:"J1",num:"1033410-78.2021.4.01.3800",numeroSEI:"26.0.000002275-5",tribunal:"TRF-6",tipoAcao:"Apelação",parteContraria:"João Floresta Neto",prazoFinal:addD(NOW,20),assunto:"Apelação - Registro especialidade medicina do trabalho",fase:"Análise",impacto:4,complexidade:4,tipoPeca:"Contrarrazões de Apelação",obs:"Sentença 1º grau julgou improcedente o pedido do autor (8ª Vara Cível/JEF BH). Autor apelou ao TRF-6. Alega direito a registro de especialista em medicina do trabalho por pós-graduação (Portaria DSST 11/1990). CRM-MG e CFM são apelados.",proxProv:"Elaborar contrarrazões de apelação",dataProv:addD(NOW,10),estTempo:"10h",tags:["especialidade","medicina do trabalho","apelação"],semMov:0,hist:[{d:addD(NOW,-30),e:"Recurso de apelação interposto pelo autor em 04/03/2026"}]}),
  mkJ({id:"J2",num:"1063185-38.2025.4.01.3400",numeroSEI:"26.0.000002922-9",tribunal:"TRF-1",tipoAcao:"Ação Civil Pública",parteContraria:"Assoc. Brasileira de Médicos c/ Expertise de Pós-Graduação",prazoFinal:addD(NOW,15),assunto:"ACP - Exercício profissional - publicização de pós-graduação",fase:"Análise",impacto:5,complexidade:5,tipoPeca:"Contrarrazões de Apelação",obs:"20ª Vara Federal Cível da SJDF. Sentença julgou improcedente. Autor (associação) apelou em 10/02/2026. Pretensão: direito de publicizar curso pós-graduação sem termo 'NÃO ESPECIALISTA'. CFM é réu. MPF é fiscal da lei. Pedido de tutela antecipada: SIM.",proxProv:"Elaborar contrarrazões de apelação",dataProv:addD(NOW,7),estTempo:"12h",reuniao:false,tags:["ACP","pós-graduação","especialidade","apelação"],semMov:0,hist:[{d:addD(NOW,-60),e:"Sentença improcedente para o autor"},{d:addD(NOW,-58),e:"Apelação interposta pelo autor em 10/02/2026"}]}),
  mkJ({id:"J3",num:"1008186-77.2021.4.01.3400",numeroSEI:"26.0.000003115-0",tribunal:"TRF-1",tipoAcao:"Cumprimento de Sentença",parteContraria:"Isabel Cristina Jimenez Lobelle",prazoFinal:addD(NOW,10),assunto:"Cumprimento de sentença - Registro profissional - exercício profissional",fase:"Análise",impacto:3,complexidade:3,tipoPeca:"Manifestação em Execução",obs:"22ª Vara Federal Cível da SJDF. Exequentes: CFM e CRM-MA. Executada: Isabel Cristina Jimenez Lobelle. Última movimentação: Juntada de certidão e ato ordinatório em 23/03/2026. Intimação recebida via SEI.",proxProv:"Elaborar manifestação em execução",dataProv:addD(NOW,5),estTempo:"3h",tags:["cumprimento","registro profissional","CRM-MA"],semMov:0,hist:[{d:addD(NOW,-17),e:"Ato ordinatório praticado 23/03/2026"},{d:addD(NOW,-17),e:"Juntada de certidão 23/03/2026"}]}),
  mkJ({id:"J4",num:"5022793-46.2025.4.03.0000",numeroSEI:"26.0.000002536-3",tribunal:"TRF-3",tipoAcao:"Agravo de Instrumento",parteContraria:"Chrysser Ferreira Alves",prazoFinal:addD(NOW,14),assunto:"Agravo de instrumento - Exercício profissional - Honorários advocatícios",fase:"Minuta Pendente",impacto:4,complexidade:4,tipoPeca:"Memoriais",obs:"3ª Turma do TRF-3. Ref. processo 5006699-80.2021.4.03.6105. Agravante: CFM. Agravado: Chrysser Ferreira Alves. SESSÃO DE JULGAMENTO: 23/04/2026 às 14:00 - Ordinária presencial. Local: Plenário 3ª Turma, Av. Paulista 1.842, São Paulo. Intimação de pauta recebida em 10/03/2026.",proxProv:"Elaborar memoriais para sessão de julgamento 23/04",dataProv:addD(NOW,10),estTempo:"8h",tags:["agravo","honorários","TRF-3","sessão 23/04","memoriais"],semMov:0,hist:[{d:addD(NOW,-30),e:"Intimação de pauta recebida 10/03/2026"},{d:addD(NOW,-30),e:"Sessão designada para 23/04/2026"}]}),
  mkJ({id:"J5",num:"5037864-24.2025.4.03.6100",numeroSEI:"26.0.000003378-1",tribunal:"TRF-3",tipoAcao:"Procedimento Comum Cível",parteContraria:"Andre Lanconi da Costa",prazoFinal:addD(NOW,10),assunto:"Exercício profissional - Multas e demais sanções",fase:"Minuta Pendente",impacto:4,complexidade:3,tipoPeca:"Especificação de Provas",obs:"12ª Vara Cível Federal de São Paulo. Autor: Andre Lanconi da Costa. Réu: CREMESP e CFM. SEGREDO DE JUSTIÇA. Despacho de 25/03/2026: manifestar sobre contestação em 15 dias (arts. 350 e 351 CPC) e especificar provas justificando pertinência. Pedido de liminar: SIM.",proxProv:"Elaborar especificação de provas e manifestação sobre contestação",dataProv:addD(NOW,5),estTempo:"6h",tags:["sigilo","multas","CREMESP","especificação de provas"],semMov:0,hist:[{d:addD(NOW,-9),e:"Despacho judicial 25/03/2026 - prazo 15 dias"},{d:addD(NOW,-9),e:"Intimação recebida via SEI"}]}),
  mkJ({id:"J6",num:"1130316-30.2025.4.01.3400",numeroSEI:"26.0.000002129-5",tribunal:"TRF-1",tipoAcao:"Procedimento Comum Cível",parteContraria:"Médicos estrangeiros (16 autores)",prazoFinal:addD(NOW,30),assunto:"Registro profissional - Médicos estrangeiros vs CFM e União",fase:"Acompanhamento",impacto:4,complexidade:4,tipoPeca:"Petição Simples",obs:"21ª Vara Federal Cível da SJDF. 16 autores (médicos estrangeiros). Réu: CFM e União Federal. Contestação já apresentada em 27/02/2026. Peça já elaborada. Orientação Dr. João Paulo: verificar intimação antes de peticionar; se for apenas contestação, seguir com protocolo.",proxProv:"Acompanhar movimentação processual",dataProv:addD(NOW,15),estTempo:"1h",tags:["registro profissional","médicos estrangeiros","petição simples"],semMov:0,progresso:100,hist:[{d:addD(NOW,-37),e:"Notificação SEI - Pet. Simples atribuída 03/03/2026"},{d:addD(NOW,-36),e:"Peça enviada ao Dr. João Paulo para revisão 04/03/2026"},{d:addD(NOW,-34),e:"Orientação Dr. JP: verificar intimação 06/03/2026"},{d:addD(NOW,-41),e:"Contestação juntada aos autos 27/02/2026"}]}),
  mkJ({id:"J7",num:"0036173-62.2008.4.01.3400",numeroSEI:"26.0.000003347-1",tribunal:"TRF-1",tipoAcao:"Apelação",parteContraria:"Cândido Pinheiro Koren de Lima",prazoFinal:addD(NOW,13),assunto:"Apelação cível - Multas e demais sanções - Memoriais",fase:"Acompanhamento",impacto:4,complexidade:3,tipoPeca:"Memoriais",obs:"TRF-1 2º grau. Gab. 21 - Des. Fed. José Amilcar de Queiroz Machado. Sessão virtual 22/04 a 28/04/2026. Memoriais já distribuídos conforme orientação do Dr. João Paulo. Habilitação nos autos da Procuradoria do CFM requerida. Peça já elaborada. Acompanhar julgamento.",proxProv:"Acompanhar sessão de julgamento 22/04 a 28/04",dataProv:addD(NOW,13),estTempo:"1h",tags:["memoriais","apelação","multas","sessão 22/04"],semMov:0,progresso:100,hist:[{d:addD(NOW,-9),e:"Atribuição ao Dr. João Gabriel via SEI 31/03/2026"},{d:addD(NOW,-9),e:"Memoriais elaborados e distribuídos"}]}),
];
const D_REUN=[];
const D_SUST=[];
const D_VIAG=[];
const D_INBOX=[];

/* ═══ PERSISTENCE — v11: Supabase cloud sync + localStorage cache ═══ */
const STORE_KEY = "cojur-nexus-state";
const SUPABASE_URL = "https://vcxastdcsbzdsfcdbtan.supabase.co";
const SUPABASE_KEY = "sb_publishable_pCP08nZyZti0Dak5p52RJw_0MTunzFr";
const SUPABASE_USER_ID = "joao_gabriel_cojur";
const SUPABASE_TABLE = "nexus_state";
const SYNC_STATUS = { idle: "idle", syncing: "syncing", synced: "synced", offline: "offline", error: "error" };
var __lastSyncStatus = SYNC_STATUS.idle;
var __lastSyncTime = null;
var __syncListeners = [];
var onSyncChange = function(fn){__syncListeners.push(fn);return function(){__syncListeners=__syncListeners.filter(function(f){return f!==fn;});};};
var setSyncStatus = function(s){__lastSyncStatus=s;if(s===SYNC_STATUS.synced)__lastSyncTime=new Date();__syncListeners.forEach(function(f){try{f(s,__lastSyncTime);}catch(e){}});};

const serialize = st => JSON.stringify(st, (k, v) => v instanceof Date ? { _dt: v.toISOString() } : v);
const reviveDates = obj => {
  if (!obj || typeof obj !== "object") return obj;
  if (obj._dt) return new Date(obj._dt);
  if (Array.isArray(obj)) return obj.map(reviveDates);
  const out = {};
  for (const k of Object.keys(obj)) out[k] = reviveDates(obj[k]);
  return out;
};
const rehydrate = raw => {
  var parsed;
  try { parsed = reviveDates(JSON.parse(raw)); } catch(e) { logErr("[rehydrate] JSON parse falhou:", e); return null; }
  if (!parsed || typeof parsed !== "object") { logErr("[rehydrate] shape invalido", typeof parsed); return null; }
  return {
    adm: (parsed.adm || []).map(p=>recalc({...mkA({}),...p,id:p.id||nid(),tipo:"adm"})),
    jud: (parsed.jud || []).map(p=>recalc({...mkJ({}),...p,id:p.id||nid(),tipo:"jud"})), lembretes: (parsed.lembretes||[]),
    reun: parsed.reun || [],
    sust: parsed.sust || [],
    viag: parsed.viag || [],
    inbox: parsed.inbox || [],
    realizados: parsed.realizados || [],
    notas: parsed.notas || [],
  };
};

/* ═══ SUPABASE CLIENT (REST API, sem SDK) ═══ */
var supabaseHeaders = function() {
  return {
    "apikey": SUPABASE_KEY,
    "Authorization": "Bearer " + SUPABASE_KEY,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  };
};
var supaFetchState = function() {
  return fetch(SUPABASE_URL + "/rest/v1/" + SUPABASE_TABLE + "?user_id=eq." + SUPABASE_USER_ID + "&select=data,updated_at", {
    method: "GET",
    headers: supabaseHeaders()
  }).then(function(r){
    if(!r.ok) return r.text().then(function(t){throw new Error("HTTP "+r.status+": "+t.substring(0,200));});
    return r.json();
  }).then(function(rows){
    if(!rows||!rows.length) return null;
    /* Suporta tanto coluna `text` (string) quanto `jsonb` (objeto/string) */
    var raw = rows[0].data;
    var value = typeof raw === "string" ? raw : JSON.stringify(raw);
    return { value: value, updated_at: rows[0].updated_at };
  });
};
var supaUpsertState = function(data) {
  return fetch(SUPABASE_URL + "/rest/v1/" + SUPABASE_TABLE + "?on_conflict=user_id", {
    method: "POST",
    headers: Object.assign({}, supabaseHeaders(), { "Prefer": "resolution=merge-duplicates,return=minimal" }),
    body: JSON.stringify({ user_id: SUPABASE_USER_ID, data: data, updated_at: new Date().toISOString() })
  }).then(function(r){
    if(!r.ok) return r.text().then(function(t){throw new Error("HTTP "+r.status+": "+t.substring(0,120));});
    return true;
  });
};
var supaDeleteState = function() {
  return fetch(SUPABASE_URL + "/rest/v1/" + SUPABASE_TABLE + "?user_id=eq." + SUPABASE_USER_ID, {
    method: "DELETE",
    headers: supabaseHeaders()
  }).then(function(r){return r.ok;});
};

/* ═══ HYBRID STORAGE — localStorage cache + Supabase source-of-truth ═══ */
/* Estratégia: get() tenta Supabase primeiro; se falhar, cai pro localStorage.
   set() escreve localStorage imediatamente (rápido) + Supabase em background. */
const storage = {
  async get(key){
    setSyncStatus(SYNC_STATUS.syncing);
    /* 1. Tentar Supabase (fonte da verdade) */
    try {
      const cloudResult = await Promise.race([
        supaFetchState(),
        new Promise(function(_,rej){ setTimeout(function(){ rej(new Error("timeout")); }, 4000); })
      ]);
      if (cloudResult && cloudResult.value) {
        /* Atualiza cache local com dado da nuvem */
        try { localStorage.setItem(key, cloudResult.value); } catch(e){}
        setSyncStatus(SYNC_STATUS.synced);
        return { value: cloudResult.value };
      }
    } catch(e) {
      logErr("[COJUR sync] fetch falhou:", e);
      setSyncStatus(SYNC_STATUS.offline);
    }
    /* 2. Fallback para localStorage (modo offline) */
    try {
      const local = localStorage.getItem(key);
      if (local) return { value: local };
    } catch(e){}
    return null;
  },
  async set(key, value){
    /* 1. Escrita local imediata (sempre funciona, rápido) */
    try { localStorage.setItem(key, value); } catch(e){}
    /* 2. Sync para Supabase em background (com retry automático) */
    setSyncStatus(SYNC_STATUS.syncing);
    try {
      await supaUpsertState(value);
      setSyncStatus(SYNC_STATUS.synced);
      return true;
    } catch(e) {
      logErr("[COJUR sync] upsert falhou:", e);
      setSyncStatus(SYNC_STATUS.offline);
      return false;
    }
  },
  async delete(key){
    try { localStorage.removeItem(key); } catch(e){}
    try { await supaDeleteState(); setSyncStatus(SYNC_STATUS.synced); return true; } catch(e){ return false; }
  }
};

const exportState = function(st) {
  try {
    var json = serialize(st);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "cojur-nexus-" + new Date().toISOString().slice(0,10) + ".json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  } catch(e) {
    try {
      var json2 = serialize(st);
      var a2 = document.createElement("a");
      a2.href = "data:application/json;charset=utf-8," + encodeURIComponent(json2);
      a2.download = "cojur-nexus-" + new Date().toISOString().slice(0,10) + ".json";
      document.body.appendChild(a2);
      a2.click();
      setTimeout(function(){ document.body.removeChild(a2); }, 100);
    } catch(e2) {}
  }
};
/* ═══ EXPORT CSV (Excel-compatible) ═══ */
const exportCSV = function(st) {
  try {
    var all = [...st.adm, ...st.jud];
    var headers = ["Tipo","Nº Processo","Nº SEI","Assunto","Status","Fase","Tipo de Peça","Tribunal/Órgão","Responsável","Prazo Final","Dias Úteis","Score","Parte Contrária/Interessado","Próxima Providência","Tags","Observações"];
    var rows = all.map(function(p){
      return [
        p.tipo==="jud"?"Judicial":"Administrativo",
        '"'+(p.num||"").replace(/"/g,'""')+'"',
        '"'+(p.numeroSEI||"").replace(/"/g,'""')+'"',
        '"'+(p.assunto||"").replace(/"/g,'""')+'"',
        p.status||"",
        p.fase||"",
        p.tipoPeca||"",
        p.tribunal||p.orgao||"",
        p.responsavel||"",
        p.prazoFinal?fmt(toD(p.prazoFinal)):"",
        p.diasRestantes||0,
        p.score||0,
        '"'+((p.parteContraria||p.interessado||"").replace(/"/g,'""'))+'"',
        '"'+((p.proxProv||"").replace(/"/g,'""'))+'"',
        '"'+((p.tags||[]).join(", "))+'"',
        '"'+((p.obs||"").replace(/"/g,'""').replace(/\n/g," "))+'"'
      ].join(";");
    });
    var bom = "\uFEFF";
    var csv = bom + headers.join(";") + "\n" + rows.join("\n");
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "cojur-nexus-" + new Date().toISOString().slice(0,10) + ".csv";
    document.body.appendChild(a);
    a.click();
    setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  } catch(e) {}
};
const importState = function(file, dp, onDone) {
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var restored = rehydrate(e.target.result);
      dp({ type: "LOAD", state: restored });
      if (onDone) onDone("ok");
    } catch (err) {
      if (onDone) onDone("err");
    }
  };
  reader.onerror = function(){ if (onDone) onDone("err"); };
  reader.readAsText(file);
};

/* ═══ REDUCER ═══ */
const mkInit=()=>({adm:D_ADM,jud:D_JUD,reun:D_REUN,sust:D_SUST,viag:D_VIAG,inbox:D_INBOX,realizados:[],notas:[],lembretes:[],auditLog:[]});
/* ═══ AUDIT LOG HELPER ═══ */
var auditEntry=function(action,detail){return{ts:new Date().toISOString(),action:action,detail:detail};};
function reducerCore(st,a){
  switch(a.type){
    case "LOAD": return {...mkInit(), ...a.state, realizados: a.state?.realizados || [], notas: a.state?.notas || [], lembretes: a.state?.lembretes || []};
    case "UPD":{
      const k=a.isAdm?"adm":"jud";
      const list=st[k];
      const updated=list.map(p=>{
        if(p.id!==a.id) return p;
        const merged={...p,...a.ch};
        if(a.ch?.tipoPeca && a.ch.tipoPeca!==p.tipoPeca) merged.checklist=buildChecklist(a.ch.tipoPeca, merged);
        // Auto-recalc prazoFinal from pubDJe when pubDJe or intersticio changes
        if((a.ch?.pubDJe !== undefined || a.ch?.intersticio !== undefined) && merged.pubDJe) {
          var np = calcPrazoDJe(merged.pubDJe, merged.intersticio || 15);
          if (np) merged.prazoFinal = np;
        }
        return recalc(merged);
      });
      if(a.isAdm)return{...st,[k]:updated};
      const proc=updated.find(p=>p.id===a.id);
      return syncJudicialLinks({...st,[k]:updated},proc);
    }
    case "ADD_A":return{...st,adm:[...st.adm,mkA(a.d)]};
    case "ADD_J":{
      const proc=mkJ(a.d);
      return syncJudicialLinks({...st,jud:[...st.jud,proc]},proc);
    }
    case "DEL_P":{
      const inA=st.adm.some(p=>p.id===a.id);
      if(inA)return{...st,adm:st.adm.filter(p=>p.id!==a.id)};
      return{
        ...st,
        jud:st.jud.filter(p=>p.id!==a.id),
        reun:st.reun.filter(r=>r.linkedProcessId!==a.id),
        sust:st.sust.filter(s=>s.linkedProcessId!==a.id)
      };
    }
    case "COMPLETE_P":{
      const foundAdm = st.adm.find(p=>p.id===a.id);
      const foundJud = st.jud.find(p=>p.id===a.id);
      const proc = foundAdm || foundJud;
      if(!proc) return st;
      /* fire confetti (color depends on urgency) */
      try {
        const dr = proc.diasRestantes;
        const color = (dr <= 2) ? "#ff6680" : (dr <= 7 ? "#ffb800" : "#5fb260");
        if (typeof triggerConfetti === "function") triggerConfetti(color);
      } catch(e) {}
      const realizadoEm = curDate();
      const concluido = {
        ...proc,
        status: "Concluído",
        realizadoEm,
        realizadoTipo: proc.tipo==="jud" ? "Judicial" : "Administrativo"
      };
      return {
        ...st,
        adm: st.adm.filter(p=>p.id!==a.id),
        jud: st.jud.filter(p=>p.id!==a.id),
        reun: st.reun.filter(r=>r.linkedProcessId!==a.id),
        sust: st.sust.filter(s=>s.linkedProcessId!==a.id),
        realizados: [concluido, ...(st.realizados||[])]
      };
    }
    case "ADD_R":return{...st,reun:[...st.reun,{id:nid(),checklist:[],...a.d}]};
    case "UPD_R":return{...st,reun:st.reun.map(r=>r.id===a.id?{...r,...a.ch}:r)};
    case "DEL_R":return{...st,reun:st.reun.filter(r=>r.id!==a.id)};
    case "ADD_S":return{...st,sust:[...st.sust,{id:nid(),checklist:[],...a.d}]};
    case "UPD_S":return{...st,sust:st.sust.map(s=>s.id===a.id?{...s,...a.ch}:s)};
    case "DEL_S":return{...st,sust:st.sust.filter(s=>s.id!==a.id)};
    case "ADD_V":return{...st,viag:[...st.viag,{id:nid(),...a.d}]};
    case "DEL_V":return{...st,viag:st.viag.filter(v=>v.id!==a.id)};
    case "ADD_I":return{...st,inbox:[{id:nid(),...a.d},...st.inbox]};
    case "DEL_I":return{...st,inbox:st.inbox.filter(i=>i.id!==a.id)};
    case "TCL":{const{ky,eid,idx}=a;return{...st,[ky]:st[ky].map(e=>{if(e.id!==eid)return e;const cl=[...(e.checklist||[])];const it=cl[idx];cl[idx]=typeof it==="string"?{text:it,done:true}:{...it,done:!it.done};return{...e,checklist:cl}})};}
    case "TCLP":{
      const k=a.isAdm?"adm":"jud";
      return {...st,[k]:st[k].map(p=>{if(p.id!==a.id) return p; const cl=[...(p.checklist||[])]; const it=cl[a.idx]; cl[a.idx]=typeof it==="string"?{text:it,done:true}:{...it,done:!it.done}; return {...p,checklist:cl};})};
    }
    case "ADD_NOTA":return{...st,notas:[{id:nid(),...a.d},...(st.notas||[])]};
    case "DEL_NOTA":return{...st,notas:(st.notas||[]).filter(n=>n.id!==a.id)};
    case "UPD_NOTA":return{...st,notas:(st.notas||[]).map(n=>n.id===a.id?{...n,...a.ch}:n)};
    case "ADD_MOV": {
      var keyM = a.isAdm ? "adm" : "jud";
      var existsM = st[keyM].some(function(p){ return p.id === a.id; });
      if (!existsM) return st;
      return {...st, [keyM]: st[keyM].map(function(p){
        if (p.id !== a.id) return p;
        return {...p, hist: [...(p.hist||[]), {data: toISO(new Date()), txt: a.txt}]};
      })};
    }
    /* ═══ DUPLICAR PROCESSO ═══ */
    case "DUP_P":{
      var src=[...st.adm,...st.jud].find(function(p){return p.id===a.id;});
      if(!src) return st;
      var dup={...src,id:nid(),status:"Ativo",fase:"Triagem",progresso:0,checklist:buildChecklist(src.tipoPeca,src),hist:[{data:toISO(new Date()),txt:"Processo duplicado de "+src.num}],realizadoEm:null,tempoReal:0};
      if(src.tipo==="adm") return {...st,adm:[...st.adm,recalc(dup)]};
      return {...st,jud:[...st.jud,recalc(dup)]};
    }
    /* ═══ REGISTRAR TEMPO REAL ═══ */
    case "ADD_TEMPO":{
      var tk=st.adm.some(function(p){return p.id===a.id;})?"adm":"jud";
      return{...st,[tk]:st[tk].map(function(p){if(p.id!==a.id)return p;return{...p,tempoReal:(p.tempoReal||0)+a.minutos};})};
    }
    case "ADD_LEMBRETE": { var nls=[...(st.lembretes||[])]; nls.push({id:nid(),texto:a.texto,data:a.data||"",done:false}); return {...st,lembretes:nls}; }
    case "UPD_LEMBRETE": { return {...st,lembretes:(st.lembretes||[]).map(function(l){return l.id===a.id?{...l,...a.ch}:l;})}; }
    case "DEL_LEMBRETE": { return {...st,lembretes:(st.lembretes||[]).filter(function(l){return l.id!==a.id;})}; }
    case "LINK_P":{
      var k1=st.adm.some(function(p){return p.id===a.id1;})?"adm":"jud";
      var k2=st.adm.some(function(p){return p.id===a.id2;})?"adm":"jud";
      var upd1=st[k1].map(function(p){if(p.id!==a.id1)return p;var lk=[...(p.linkedIds||[])];if(!lk.includes(a.id2))lk.push(a.id2);return{...p,linkedIds:lk};});
      var upd2=(k1===k2?upd1:st[k2]).map(function(p){if(p.id!==a.id2)return p;var lk=[...(p.linkedIds||[])];if(!lk.includes(a.id1))lk.push(a.id1);return{...p,linkedIds:lk};});
      return k1===k2?{...st,[k1]:upd2}:{...st,[k1]:upd1,[k2]:upd2};
    }
    case "UNLINK_P":{
      var uk1=st.adm.some(function(p){return p.id===a.id1;})?"adm":"jud";
      var uk2=st.adm.some(function(p){return p.id===a.id2;})?"adm":"jud";
      var rem=function(list,fromId,toId){return list.map(function(p){if(p.id!==fromId)return p;return{...p,linkedIds:(p.linkedIds||[]).filter(function(x){return x!==toId;})};});};
      return{...st,[uk1]:rem(st[uk1],a.id1,a.id2),[uk2]:rem(st[uk2],a.id2,a.id1)};
    }
    case "RECALC_ALL": return {...st, adm: (st.adm||[]).map(recalc), jud: (st.jud||[]).map(recalc)};
    case "RST":return mkInit();
    default:return st;
  }
}
/* Wrapper: adds audit log to every mutation */
function reducer(st,a){
  var result=reducerCore(st,a);
  if(result!==st&&a.type!=="LOAD"&&a.type!=="RST"&&a.type!=="RECALC_ALL"){
    var log=[...(result.auditLog||[])];
    var detail=a.id?(a.ch?JSON.stringify(a.ch).substring(0,120):String(a.id)):(a.type);
    log.unshift(auditEntry(a.type,detail));
    if(log.length>200)log=log.slice(0,200);
    result={...result,auditLog:log};
  }
  return result;
}

/* ═══ COMPONENTS ═══ */
const CFMMark=({size=40})=>(
  <svg width={size} height={size} viewBox="0 0 64 64" aria-label="CFM" style={{display:"block",filter:"drop-shadow(0 10px 24px rgba(6,182,212,.22))"}}>
    <defs>
      <linearGradient id="cfmG" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#22d3ee"/>
        <stop offset="100%" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="18" fill="#08111f" stroke="url(#cfmG)" strokeWidth="2.5"/>
    <path d="M32 15l3.6 9.4 9.4 3.6-9.4 3.6-3.6 9.4-3.6-9.4-9.4-3.6 9.4-3.6L32 15z" fill="url(#cfmG)" opacity=".95"/>
    <rect x="16" y="43" width="32" height="10" rx="5" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.08)"/>
    <text x="32" y="50" textAnchor="middle" fill="#dbeafe" fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif">CFM</text>
  </svg>
);
const Bd=({children,color:c,glow:g,style:sx})=><span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 10px",borderRadius:999,fontSize:11,fontWeight:700,background:g||"linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))",color:c||K.txt,border:`1px solid ${(c||K.brd)}33`,boxShadow:"inset 0 1px 0 rgba(255,255,255,.04)",textTransform:"uppercase",letterSpacing:".35px",...sx}}>{children}</span>;
const UB=({d,prazoFinal})=>{
  var c=uC(d);
  var bg=d<=10?"rgba(255,46,91,.15)":d<30?"rgba(255,184,0,.12)":"rgba(0,229,255,.08)";
  var bd=d<=10?"rgba(255,46,91,.4)":d<30?"rgba(255,184,0,.35)":"rgba(0,229,255,.25)";
  var showCountdown=d>=0&&d<=1&&prazoFinal;
  var countdownStr="";
  if(showCountdown){try{var pf=prazoFinal instanceof Date?prazoFinal:new Date(prazoFinal);var agora=new Date();var diff=pf.getTime()+18*3600000-agora.getTime();if(diff>0&&diff<48*3600000){var h=Math.floor(diff/3600000);var m=Math.floor((diff%3600000)/60000);countdownStr=h+"h"+String(m).padStart(2,"0");}else{showCountdown=false;}}catch(e){showCountdown=false;}}
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"8px 12px",borderRadius:12,background:bg,border:"1px solid "+bd,minWidth:64,boxShadow:"0 0 12px "+c+"22"}}>
      {showCountdown&&countdownStr?(
        <div style={{fontSize:13,fontWeight:900,color:c,fontFamily:"Orbitron,monospace",lineHeight:1,letterSpacing:"-.3px",animation:"cjPulse 1.8s ease infinite"}}>{countdownStr}</div>
      ):(
        /* v41 · numero limpo, com pulse neon nos criticos (sem glitch overlay) */
        <div
          className={d<=1?"cj-ub-crit":""}
          style={{fontSize:d===0?11:20,fontWeight:900,color:c,fontFamily:"Orbitron,monospace",lineHeight:1,letterSpacing:d===0?".5px":"-.5px"}}
        >
          {d===0?"HOJE":d<0?Math.abs(d):d}
        </div>
      )}
      {d!==0&&!showCountdown&&<div style={{fontSize:8,fontWeight:700,color:c,opacity:.85,textTransform:"uppercase",letterSpacing:".4px"}}>{d<0?"ATRASO":"dias úteis"}</div>}
      {showCountdown&&countdownStr&&<div style={{fontSize:7,fontWeight:700,color:c,opacity:.85,textTransform:"uppercase",letterSpacing:".3px"}}>restante</div>}
      {d===0&&!showCountdown&&null}
    </div>
  );
};
const SB=({s})=>{const c=s>=70?K.cr:s>=45?K.wa:K.ac;const pct=Math.min(100,Math.max(0,s));const r=14,cx=18,cy=18,sw=3.5;const circ=2*Math.PI*r;const dash=circ*pct/100;return(
  <svg width={36} height={36} viewBox="0 0 36 36" style={{flexShrink:0,filter:"drop-shadow(0 0 4px "+c+"55)"}}>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeOpacity=".15" strokeWidth={sw}/>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ-dash} transform={"rotate(-90 "+cx+" "+cy+")"} style={{transition:"stroke-dashoffset .6s ease"}}/>
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill={c} style={{fontSize:s>=100?9:10,fontWeight:800,fontFamily:"Orbitron,monospace"}}>{s}</text>
  </svg>
)};
const SC=React.memo(({icon:I,label:l,value:v,color:c,sub,onClick,sparkData})=>{
  const col=c||K.ac;
  return(
  <div className="cj-hud-tl cj-hud-br" role={onClick?"button":undefined} tabIndex={onClick?0:undefined} onClick={onClick} onKeyDown={e=>{if(onClick&&(e.key==="Enter"||e.key===" ")){e.preventDefault();onClick();}}} style={{background:"linear-gradient(135deg, rgba(4,8,22,.97), rgba(2,5,14,.99))",border:"1px solid "+col+"28",borderRadius:20,padding:"18px 18px 16px",display:"flex",flexDirection:"column",gap:8,position:"relative",overflow:"hidden",transition:"all .28s",cursor:onClick?"pointer":"default",boxShadow:"0 0 0 1px rgba(255,255,255,.02), 0 18px 44px rgba(0,0,0,.45), inset 0 1px 0 "+col+"10"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.borderColor=col+"50";e.currentTarget.style.boxShadow="0 0 24px "+col+"14, 0 0 0 1px "+col+"22, 0 22px 50px rgba(0,0,0,.5), inset 0 1px 0 "+col+"18";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor=col+"28";e.currentTarget.style.boxShadow="0 0 0 1px rgba(255,255,255,.02), 0 18px 44px rgba(0,0,0,.45), inset 0 1px 0 "+col+"10";}}>
    <div style={{position:"absolute",inset:"0 0 auto 0",height:1,background:"linear-gradient(90deg, transparent, "+col+", transparent)",opacity:.7,pointerEvents:"none"}}/>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:38,height:38,borderRadius:14,background:"linear-gradient(135deg, "+col+"22, rgba(255,255,255,.03))",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 14px "+col+"30, inset 0 1px 0 rgba(255,255,255,.07)"}}><I size={18} color={col}/></div>
        <span style={{fontSize:10,color:K.dim,fontWeight:700,textTransform:"uppercase",letterSpacing:".7px"}}>{l}</span>
      </div>
      <div className="cj-dot cj-pulse" style={{background:col,boxShadow:"0 0 10px "+col+", 0 0 20px "+col+"88"}}/>
    </div>
    <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:8}}>
      <div style={{fontSize:33,fontWeight:800,color:col,fontFamily:"'Orbitron','JetBrains Mono',monospace",lineHeight:1,textShadow:"0 0 18px "+col+"70, 0 0 40px "+col+"30",animation:"textGlow 2.5s ease-in-out infinite"}}>{typeof v === "number" ? <AnimatedCounter value={v}/> : v}</div>
      {sparkData&&sparkData.length>1&&<Sparkline data={sparkData} color={col} w={64} h={22}/>}
    </div>
    {sub&&<span style={{fontSize:10,color:K.dim2,fontFamily:"'JetBrains Mono',monospace"}}>{sub}</span>}
  </div>
);});
/* SectionHeader */
const SH=React.memo(({icon:I,title:t,right})=>(
  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,gap:10}}>
    <div style={{display:"flex",alignItems:"center",gap:10,minWidth:0}}>
      {I&&<div style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,229,255,.08)",border:"1px solid rgba(0,229,255,.25)",boxShadow:"0 0 14px rgba(0,229,255,.22)",animation:"neonPulse 4s ease-in-out infinite"}}><I size={16} color="#00e5ff" style={{filter:"drop-shadow(0 0 6px rgba(0,229,255,.9))"}}/></div>}
      <h3 style={{margin:0,fontSize:14,fontWeight:700,color:K.txt,letterSpacing:".2px"}}>{t}</h3>
    </div>
    {right}
  </div>
));
/* CardBox */
const Bx=React.memo(({children,style:sx,className:cn,onClick,role,title})=><div className={"cj-shimmer cj-hud-tl cj-hud-br "+(cn||"")} title={title} role={onClick?role||"button":undefined} tabIndex={onClick?0:undefined} onClick={onClick} onKeyDown={e=>{if(onClick&&(e.key==="Enter"||e.key===" ")){e.preventDefault();onClick();}}} style={{background:"linear-gradient(135deg, rgba(2,5,20,.97), rgba(1,3,12,.99))",backdropFilter:"blur(24px)",border:"1px solid rgba(0,229,255,.1)",boxShadow:"0 20px 50px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.02), inset 0 1px 0 rgba(0,229,255,.06)",borderRadius:20,padding:20,position:"relative",overflow:"hidden",transition:"all .28s",cursor:onClick?"pointer":"default",animation:onClick?"neonPulse 5s ease-in-out infinite":"none",...sx}} onMouseEnter={e=>{if(onClick){e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.borderColor="rgba(0,229,255,.3)";e.currentTarget.style.boxShadow="0 0 36px rgba(0,229,255,.1), 0 24px 56px rgba(0,0,0,.55), inset 0 1px 0 rgba(0,229,255,.12)";}}} onMouseLeave={e=>{if(onClick){e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="rgba(0,229,255,.1)";e.currentTarget.style.boxShadow="0 20px 50px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.02), inset 0 1px 0 rgba(0,229,255,.06)";}}}>{children}</div>);
/* AlertCard */
const AC=React.memo(({icon:I,color:c,title:t,desc})=><div className="cj-soft" style={{background:`linear-gradient(180deg,${c}10,rgba(255,255,255,.02))`,border:`1px solid ${c}22`,borderRadius:14,padding:"12px 14px",display:"flex",gap:10}}><I size={16} color={c} style={{marginTop:2,flexShrink:0}}/><div><div style={{fontSize:12,fontWeight:700,color:c}}>{t}</div><div style={{fontSize:11,color:K.dim,marginTop:2,lineHeight:1.5}}>{desc}</div></div></div>);
/* ProgressBar */
const PB=React.memo(({value:v,max:m,color:c})=><div style={{height:8,borderRadius:999,background:"rgba(255,255,255,.05)",overflow:"hidden",boxShadow:"inset 0 1px 0 rgba(255,255,255,.03)"}}><div style={{height:"100%",borderRadius:999,background:`linear-gradient(90deg,${c},${c}aa)`,boxShadow:`0 0 22px ${c}55`,width:`${Math.min(100,(v/m)*100)}%`,transition:"width .6s ease"}}/></div>);
/* DoneButton */
const DoneBtn=React.memo(({onClick,small})=><button onClick={e=>{e.stopPropagation();onClick?.()}} style={{display:"inline-flex",alignItems:"center",gap:6,padding:small?"6px 9px":"8px 12px",borderRadius:12,border:`1px solid ${K.su}33`,background:`linear-gradient(180deg,${K.suG},rgba(16,185,129,.08))`,boxShadow:"inset 0 1px 0 rgba(255,255,255,.04)",color:K.su,fontSize:small?11:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}><CheckCircle size={small?12:14}/>Feito</button>);

/* ═══ SKELETON LOADING ═══ */
const SkeletonBlock=({lines=3,h})=>(
  <div style={{padding:16}}>{h&&<div className="cj-skel cj-skel-block" style={{height:h}}/>}{Array.from({length:lines},(_,i)=><div key={i} className="cj-skel cj-skel-line" style={{width:i===lines-1?"60%":"100%"}}/>)}</div>
);

/* ═══ EMPTY STATE ILLUSTRATIONS ═══ */
const EmptyIllust={
  done:function(c){return(<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity=".3"/><path d="M22 33l7 7 13-14" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity=".8"/><circle cx="32" cy="32" r="20" stroke={c} strokeWidth="1" opacity=".15"/></svg>);},
  scale:function(c){return(<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="28" y="14" width="8" height="36" rx="4" stroke={c} strokeWidth="1.5" opacity=".3"/><circle cx="20" cy="38" r="10" stroke={c} strokeWidth="1.5" opacity=".25"/><circle cx="44" cy="38" r="10" stroke={c} strokeWidth="1.5" opacity=".25"/><line x1="20" y1="28" x2="44" y2="28" stroke={c} strokeWidth="1" opacity=".2"/><rect x="16" y="34" width="8" height="8" rx="2" fill={c} opacity=".12"/><rect x="40" y="34" width="8" height="8" rx="2" fill={c} opacity=".12"/></svg>);},
  folder:function(c){return(<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="10" y="20" width="44" height="30" rx="4" stroke={c} strokeWidth="1.5" opacity=".3"/><path d="M10 24h16l4-4h14a4 4 0 014 4" stroke={c} strokeWidth="1.5" opacity=".25"/><line x1="22" y1="32" x2="42" y2="32" stroke={c} strokeWidth="1" opacity=".15"/><line x1="22" y1="38" x2="36" y2="38" stroke={c} strokeWidth="1" opacity=".15"/></svg>);},
  rocket:function(c){return(<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><path d="M32 12c-4 8-6 16-6 24h12c0-8-2-16-6-24z" stroke={c} strokeWidth="1.5" opacity=".35"/><ellipse cx="32" cy="40" rx="8" ry="4" stroke={c} strokeWidth="1" opacity=".2"/><line x1="28" y1="44" x2="24" y2="52" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".25"/><line x1="36" y1="44" x2="40" y2="52" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".25"/><line x1="32" y1="44" x2="32" y2="54" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".2"/><circle cx="32" cy="28" r="3" fill={c} opacity=".15"/></svg>);},
  clock:function(c){return(<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="22" stroke={c} strokeWidth="1.5" opacity=".25"/><line x1="32" y1="32" x2="32" y2="20" stroke={c} strokeWidth="2" strokeLinecap="round" opacity=".4"/><line x1="32" y1="32" x2="42" y2="36" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".3"/><circle cx="32" cy="32" r="2" fill={c} opacity=".3"/></svg>);}
};
const EmptyState=({icon,color,title,sub})=>{
  var c=color||K.dim2;
  var illust=EmptyIllust[icon]?EmptyIllust[icon](c):EmptyIllust.done(c);
  return(
    <div style={{textAlign:"center",padding:"36px 20px"}}>
      <div style={{display:"inline-block",marginBottom:12,opacity:.8}}>{illust}</div>
      <div style={{fontSize:15,fontWeight:700,color:K.txt,marginBottom:6}}>{title}</div>
      {sub&&<div style={{fontSize:12,color:K.dim,lineHeight:1.5}}>{sub}</div>}
    </div>
  );
};

/* ═══ STATUS STEPPER ═══ */
const STATUS_FLOW=["Ativo","Em Execução","Pronto p/ Protocolo","Concluído"];
const StatusStepper=({current,onSet})=>{
  const idx=STATUS_FLOW.indexOf(current);
  return(
    <div className="cj-stepper" style={{margin:"0 0 16px"}}>
      {STATUS_FLOW.map(function(st,i){var isDone=i<idx;var isAct=i===idx;return(
        <React.Fragment key={st}>
          {i>0&&<div className={"cj-step-line"+(isDone?" done":"")}/>}
          <div title={st} onClick={function(){if(onSet)onSet(st);}} className={"cj-step-dot"+(isAct?" active":"")+(isDone?" done":"")} style={{position:"relative"}}>
            {(isAct||isDone)&&<div style={{position:"absolute",top:16,left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap",fontSize:8,fontWeight:700,color:isAct?K.ac:K.su,fontFamily:"Orbitron,monospace",letterSpacing:".3px"}}>{st.length>12?st.slice(0,10)+"…":st}</div>}
          </div>
        </React.Fragment>
      );})}
    </div>
  );
};

/* ═══ NOTIFICATION PANEL ═══ */
const NotifPanel=({alerts,onClose,onSelect})=>(
  <div className="cj-notif-panel" style={{position:"absolute",top:52,right:0,width:360,maxHeight:440,overflowY:"auto",background:K.modal,border:"1px solid "+K.brd,borderRadius:16,boxShadow:"0 24px 60px rgba(0,0,0,.7)",zIndex:200,padding:8}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",marginBottom:4}}>
      <span style={{fontSize:13,fontWeight:700,color:K.txt}}>Notificações</span>
      <button onClick={onClose} style={{background:"none",border:"none",color:K.dim,cursor:"pointer",fontSize:11}}>Fechar</button>
    </div>
    {alerts.length===0&&<div style={{padding:"24px 16px",textAlign:"center",color:K.dim2,fontSize:12}}>Nenhuma notificação pendente</div>}
    {alerts.slice(0,12).map(function(a,i){var I=a.icon;return(
      <div key={i} onClick={function(){if(a.proc&&onSelect)onSelect(a.proc);}} style={{display:"flex",gap:10,padding:"10px 12px",borderRadius:10,cursor:a.proc?"pointer":"default",transition:"background .15s"}} onMouseEnter={function(e){e.currentTarget.style.background="rgba(255,255,255,.04)";}} onMouseLeave={function(e){e.currentTarget.style.background="transparent";}}>
        <div style={{width:28,height:28,borderRadius:8,background:a.color+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I size={13} color={a.color}/></div>
        <div style={{minWidth:0}}>
          <div style={{fontSize:12,fontWeight:600,color:a.color}}>{a.title}</div>
          <div title={a.desc} style={{fontSize:11,color:K.dim,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:260}}>{a.desc}</div>
        </div>
      </div>
    );})}
  </div>
);

/* ═══ HEATMAP DE PRAZOS ═══ */
const PrazoHeatmap=({items})=>{
  const weeks=6,days=7;
  const cells=[];
  for(var w=0;w<weeks;w++){for(var d=0;d<days;d++){var dt=addD(NOW,w*7+d);var count=items.filter(function(p){return p.prazoFinal&&diffD(toD(p.prazoFinal),dt)===0;}).length;cells.push({dt:dt,count:count,w:w,d:d});}}
  return(
    <div style={{display:"flex",flexDirection:"column",gap:3}}>
      <div style={{display:"flex",gap:2,marginBottom:4}}>
        {["D","S","T","Q","Q","S","S"].map(function(l,i){return <div key={i} style={{width:18,height:12,fontSize:8,color:K.dim2,textAlign:"center",fontWeight:600}}>{l}</div>;})}
      </div>
      {Array.from({length:weeks},function(_,w){return(
        <div key={w} style={{display:"flex",gap:2}}>
          {Array.from({length:days},function(__,d){
            var cell=cells[w*7+d];
            var c=cell.count;
            var bg=c===0?"rgba(255,255,255,.03)":c===1?K.su+"30":c<=3?K.wa+"40":K.cr+"50";
            var isToday=diffD(cell.dt,NOW)===0;
            return <div key={d} title={fmt(cell.dt)+": "+c+" prazo"+(c!==1?"s":"")} style={{width:18,height:18,borderRadius:3,background:bg,border:isToday?"1.5px solid "+K.ac:"1px solid rgba(255,255,255,.04)",cursor:"default",transition:"all .15s"}}/>;
          })}
        </div>
      );})}
      <div style={{display:"flex",gap:8,marginTop:4,alignItems:"center"}}>
        <span style={{fontSize:8,color:K.dim2}}>Menos</span>
        {[0,1,2,4].map(function(v){return <div key={v} style={{width:10,height:10,borderRadius:2,background:v===0?"rgba(255,255,255,.03)":v===1?K.su+"30":v<=3?K.wa+"40":K.cr+"50"}}/>;})}
        <span style={{fontSize:8,color:K.dim2}}>Mais</span>
      </div>
    </div>
  );
};

/* ═══ SPARKLINE ═══ */
const Sparkline=({data,color,w=60,h=20})=>{
  if(!data||data.length<2)return null;
  var max=Math.max(...data,1),min=Math.min(...data,0);
  var range=max-min||1;
  var pts=data.map(function(v,i){return(i/(data.length-1))*w+","+(h-((v-min)/range)*h);}).join(" ");
  return <svg width={w} height={h} viewBox={"0 0 "+w+" "+h} style={{opacity:.7}}><polyline points={pts} fill="none" stroke={color||K.ac} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
};

/* ═══ EMPTY STATE ILLUSTRATIONS ═══ */
const EmptySVG=({type,size=64})=>{
  var s=size;
  if(type==="judicial")return(<svg width={s} height={s} viewBox="0 0 64 64"><rect x="16" y="42" width="32" height="4" rx="2" fill={K.dim2} opacity=".4"/><rect x="30" y="18" width="4" height="24" rx="2" fill={K.dim2} opacity=".3"/><path d="M16 18L32 10L48 18" stroke={K.dim2} strokeWidth="3" strokeLinecap="round" fill="none" opacity=".4"/><circle cx="16" cy="22" r="4" fill={K.dim2} opacity=".25"/><circle cx="48" cy="22" r="4" fill={K.dim2} opacity=".25"/></svg>);
  if(type==="admin")return(<svg width={s} height={s} viewBox="0 0 64 64"><rect x="14" y="10" width="36" height="44" rx="4" fill="none" stroke={K.dim2} strokeWidth="2" opacity=".3"/><rect x="20" y="18" width="24" height="3" rx="1.5" fill={K.dim2} opacity=".2"/><rect x="20" y="26" width="18" height="3" rx="1.5" fill={K.dim2} opacity=".15"/><rect x="20" y="34" width="22" height="3" rx="1.5" fill={K.dim2} opacity=".12"/><rect x="14" y="10" width="12" height="8" rx="2" fill={K.dim2} opacity=".15"/></svg>);
  if(type==="success")return(<svg width={s} height={s} viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="none" stroke={K.su} strokeWidth="2" opacity=".3"/><path d="M22 32L29 39L42 25" stroke={K.su} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity=".4"/></svg>);
  return(<svg width={s} height={s} viewBox="0 0 64 64"><circle cx="32" cy="28" r="14" fill="none" stroke={K.dim2} strokeWidth="2" opacity=".25"/><line x1="42" y1="38" x2="52" y2="48" stroke={K.dim2} strokeWidth="3" strokeLinecap="round" opacity=".3"/></svg>);
};

/* INLINE SELECT */
const IS=({value:v,options:o,onChange:oc,color:c})=>{
  const[op,sOp]=useState(false);const ref=useRef(null);
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))sOp(false)};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h)},[]);
  return(
    <div ref={ref} style={{position:"relative",display:"inline-flex"}}>
      <button onClick={e=>{e.stopPropagation();sOp(!op)}} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:"rgba(255,255,255,.05)",color:c||K.txt,border:`1px solid ${K.brd}`,cursor:"pointer"}}><Edit3 size={10}/>{v}<ChevronDown size={10}/></button>
      {op&&<div className="cj-sc" style={{position:"absolute",top:"100%",left:0,marginTop:4,background:K.modal,border:`1px solid ${K.brd}`,borderRadius:10,padding:4,zIndex:50,minWidth:180,boxShadow:"0 12px 32px rgba(0,0,0,.5)"}}>
        {o.map(x=><div key={x} onClick={e=>{e.stopPropagation();oc(x);sOp(false)}} style={{padding:"7px 12px",borderRadius:6,fontSize:11,color:x===v?K.ac:K.txt,cursor:"pointer",fontWeight:x===v?600:400,background:x===v?K.acG:"transparent"}} onMouseEnter={e=>{if(x!==v)e.currentTarget.style.background="rgba(255,255,255,.04)"}} onMouseLeave={e=>{if(x!==v)e.currentTarget.style.background="transparent"}}>{x}</div>)}
      </div>}
    </div>
  );
};

/* CHECKLIST */
const CL=({items,onToggle})=><div style={{display:"flex",flexDirection:"column",gap:4}}>{(items||[]).map((c,i)=>{const it=typeof c==="string"?{text:c,done:false}:c;return <div key={i} onClick={e=>{e.stopPropagation();onToggle(i)}} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:it.done?K.dim2:K.txt,cursor:"pointer",textDecoration:it.done?"line-through":"none"}}><div style={{width:14,height:14,borderRadius:3,border:`1.5px solid ${it.done?K.ac:K.brd}`,background:it.done?K.acG:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{it.done&&<CheckCircle size={10} color={K.ac}/>}</div>{it.text}</div>})}</div>;


/* ═══ DJe PRAZO CALC ═══ */
const addBizDays = (date, n) => {
  var d = new Date(date); var added = 0;
  while(added < n) { d.setDate(d.getDate()+1); var wd=d.getDay(); if(wd!==0&&wd!==6) added++; }
  return d;
};
const calcPrazoDJe = (pubDate, interst) => {
  if(!pubDate) return null;
  var d = pubDate instanceof Date ? pubDate : new Date(pubDate);
  // Intimação: dia útil seguinte à publicação
  var intimacao = addBizDays(d, 1);
  // Prazo começa no dia útil APÓS a intimação
  var inicio = addBizDays(intimacao, 1);
  // Conta os dias úteis do prazo
  return addBizDays(inicio, interst||15);
};

/* ═══ TABELA DE PRAZOS POR TIPO DE PECA ═══ */
var PRAZO_PECA = {
  "Contestacao": {du:15, base:"intimacao", obs:"CPC art.335"},
  "Contestação": {du:15, base:"intimação", obs:"CPC art.335"},
  "Manifestação": {du:15, base:"intimação", obs:"CPC art.238"},
  "Contraminuta": {du:15, base:"intimação", obs:"CPC art.1019"},
  "Agravo Interno": {du:15, base:"publicação acórdão", obs:"CPC art.1021"},
  "Embargos de Declaração": {du:5, base:"publicação acórdão", obs:"CPC art.1023"},
  "Informações em MS": {du:10, base:"notificação", obs:"Lei 12.016, art.9"},
  "Apelação": {du:15, base:"publicação sentença", obs:"CPC art.1003 §5"},
  "Recurso Especial": {du:15, base:"publicação acórdão", obs:"CPC art.1003 §5"},
  "Agravo em Recurso Especial": {du:15, base:"publicação decisão", obs:"CPC art.1042"},
  "Recurso Extraordinário": {du:15, base:"publicação acórdão", obs:"CPC art.1003 §5"},
  "Agravo em Recurso Extraordinário": {du:15, base:"publicação decisão", obs:"CPC art.1042"},
  "Sustentação Oral": {du:0, base:"data marcada", obs:"CPC art.937"},
  "Memoriais": {du:0, base:"data marcada", obs:""},
  "Agravo de Instrumento": {du:15, base:"publicação decisão", obs:"CPC art.1003 §5"},
  "Outro": {du:15, base:"intimação", obs:"CPC art.218 § 3"},
};
var calcPrazoProcessual = function(pubDate, tipoPeca) {
  if(!pubDate) return null;
  var regra = PRAZO_PECA[tipoPeca];
  if(!regra || regra.du === 0) return null;
  return calcPrazoDJe(pubDate, regra.du);
};
var getPrazoInfo = function(tipoPeca) {
  return PRAZO_PECA[tipoPeca] || {du:15, base:"intimação", obs:"prazo geral"};
};



/* ═══ PARECER MODAL — Prompt padrão CFM ═══ */
function buildParecerPrompt(p) {
  // Prompt EXATO conforme documento padrão CFM — não adaptado, apenas ENTRADAS preenchidas
  var prompt = "Você é um advogado sênior do Conselho Federal de Medicina (CFM), atuando na COJUR, e deve elaborar um PARECER JURÍDICO institucional, tecnicamente impecável, em português do Brasil, com linguagem formal, objetiva e persuasiva.\n\nQUALIDADE-CHAVE (PRIORIDADE MÁXIMA)\nA principal qualidade do parecer deve ser a FUNDAMENTAÇÃO: argumentos sólidos, consistentes e verificáveis, apoiados em normas do CFM e demais elementos pertinentes, com citações sempre que necessárias para sustentar premissas e conclusões relevantes. Nunca concluir sem indicar claramente o fundamento normativo e a razão de decidir aplicada aos fatos.\n\nREGRA FORMAL (OBRIGATÓRIA)\nÉ proibido usar travessão no parecer. Não utilizar \"—\" em nenhuma parte do texto. Preferir dois-pontos, ponto e vírgula, parênteses ou frases curtas.\n\nOBJETIVO\nElaborar parecer jurídico completo e pronto para assinatura, com base PRINCIPALMENTE em: (a) Resoluções do CFM aplicáveis; (b) normativos internos e atos do sistema CFM/CRMs, quando fornecidos; (c) Código de Ética Médica na redação vigente, como resolução do CFM; (d) leis, doutrina e princípios apenas de forma subsidiária e estritamente necessária, sem deslocar o centro da análise do CFM.\n\nPESQUISA NORMATIVA OBRIGATÓRIA (CFM)\nAntes de redigir a versão final, realizar busca extensa e analítica de resoluções e normas do CFM relacionadas ao caso, observando:\n• mapear temas e palavras-chave do problema jurídico e localizar normas direta e indiretamente pertinentes, inclusive exceções e regras procedimentais;\n• confirmar a vigência: verificar se cada resolução ou norma foi revogada, alterada, substituída, consolidada ou teve dispositivos modificados;\n• se houver alteração ou consolidação, utilizar o texto vigente ou consolidado e indicar, quando relevante, o ato alterador;\n• se não for possível confirmar a vigência por fonte oficial confiável, não usar a norma como fundamento determinante. Ajustar o raciocínio para não depender dela.\n\nFUNDAMENTAÇÃO PROBATÓRIA E DOCUMENTAL (QUANDO HOUVER)\n• Sempre que existirem documentos, peças, manifestações técnicas ou elementos nos autos, utilize-os para sustentar a subsunção dos fatos às normas e para justificar as conclusões.\n• Evite afirmações abstratas. Prefira referência a elementos constantes dos autos, identificando-os quando fornecido.\n\nCITAÇÕES (OBRIGATÓRIAS QUANDO SUSTENTAREM PREMISSA OU CONCLUSÃO RELEVANTE)\n• Inserir citações normativas sempre que forem base de premissa ou de conclusão: \"Resolução CFM nº /_, art. __ (vigência verificada)\".\n• Se a conclusão depender de regra normativa específica, a regra deve aparecer citada quando confirmada.\n• Fora das caixas normativas, evitar transcrições longas. Preferir paráfrase técnica com referência ao dispositivo.\n• Só cite dispositivos específicos se estiverem disponíveis e confirmados, tanto em texto quanto em vigência.\n\nCAIXAS NORMATIVAS DE DESTAQUE (OBRIGATÓRIAS QUANDO HOUVER RESOLUÇÃO DO CFM APLICÁVEL)\n• Inserir, dentro da FUNDAMENTAÇÃO JURÍDICA, caixas normativas com transcrição integral dos dispositivos mais decisivos para a solução da controvérsia.\n• As caixas devem priorizar resoluções e normativas do CFM. Essa prioridade é absoluta.\n• Cada caixa deve conter apenas 1 artigo decisivo, sem acumular vários artigos no mesmo destaque.\n• O ideal é utilizar 1 ou 2 caixas. Utilizar 3 apenas se for realmente indispensável.\n• A caixa deve conter transcrição integral e exata do dispositivo, sem cortes, sem paráfrase e sem adaptação redacional.\n• Estrutura obrigatória: Resolução CFM nº /_ Art. __ [transcrição integral exata do artigo]. Parágrafo único. [transcrição integral exata do parágrafo único, se houver].\n• Não inserir títulos como \"Norma central\", \"Norma complementar\", \"Caixa normativa\", \"Efeito para o caso\" ou expressões semelhantes.\n• A caixa deve ser visualmente sóbria, limpa e institucional.\n\nREGRA DE OURO (ANTI-INVENÇÃO)\n• Não invente números de resoluções, artigos, datas, julgados, enunciados ou trechos.\n• Se existir norma do CFM aplicável, mas o dispositivo exato não puder ser confirmado com segurança, use: \"(indicar o dispositivo da Resolução CFM aplicável, com confirmação pendente de verificação oficial)\" e reescreva o argumento para não depender de conteúdo não confirmado.\n• Não crie fatos. Se faltar dado relevante, registre apenas 1 linha de ressalva no Relatório e conduza a análise de forma condicionada, à luz dos elementos disponíveis.\n\nENTRADAS (USE APENAS O QUE FOR FORNECIDO; NÃO CRIE FATOS)\n1. Contexto ou unidade demandante:\n   COJUR/CFM — Coordenadoria Jurídica do Conselho Federal de Medicina\n\n2. Número do SEI ou processo, se houver:\n   " + (p.numeroSEI || p.num || "(preencher)") + "\n\n3. Pergunta jurídica exata:\n   " + (p.assunto || "(descrever a pergunta jurídica central)") + "\n\n4. Fatos relevantes, com documentos e partes envolvidas:\n   Interessado/Requerente: " + (p.interessado || p.parteContraria || "(identificar)") + "\n   Órgão envolvido: " + (p.orgao || "(identificar)") + "\n   " + (p.destaque ? "Contexto adicional: " + p.destaque : "(descrever os fatos relevantes e documentos dos autos)") + "\n   " + (p.obs ? "Observações: " + p.obs : "") + "\n\n5. Normas do CFM já fornecidas, com trechos ou número e artigo:\n   (inserir resoluções CFM já identificadas, se houver)\n\n6. Outros normativos fornecidos, se aplicável:\n   (inserir leis, portarias ou atos normativos complementares, se houver)\n\n7. Restrições ou posição institucional, se houver:\n   (descrever eventual posicionamento anterior do CFM ou CRM sobre o tema)\n\n8. Prazo, urgência e tipo de entrega:\n   Prazo final: " + (p.prazoFinal ? p.prazoFinal.toLocaleDateString("pt-BR") : "(informar)") + "\n   Tipo: Parecer Jurídico completo, pronto para assinatura\n\nSAÍDA, ESTRUTURA OBRIGATÓRIA (SEM EMENTA)\nTÍTULO \"PARECER JURÍDICO: [tema em 6 a 12 palavras]\"\nASSUNTO\nAssunto: [resumo em 1 linha]\n\nI. RELATÓRIO (MUITO CONCISO, MÁXIMO 8 LINHAS)\n• Quem demandou e o que foi solicitado, em 1 a 2 linhas.\n• Fatos essenciais e documentos-chave, somente o indispensável.\n• Delimitação exata da questão jurídica, em frase final iniciando por: \"Delimita-se a controvérsia em saber se…\".\n\nII. FUNDAMENTAÇÃO JURÍDICA\nTexto corrido, parágrafos curtos (3 a 5 linhas), sem subtítulos internos, sem listas e sem numeração, admitindo-se apenas caixas normativas. Encadeamento obrigatório: (a) enquadramento institucional; (b) normas do CFM pertinentes; (c) caixas normativas; (d) subsunção dos fatos; (e) consequências práticas; (f) reforço subsidiário apenas se necessário.\n\nQUADRO-SÍNTESE (OBRIGATÓRIO)\nQuadro com 3 colunas: (1) Ponto analisado | (2) Norma do CFM aplicável, com número e artigo | (3) Entendimento e recomendação objetiva, como ação executável.\n\nIII. CONCLUSÃO (MUITO CONCISA, PORÉM COMPLETA)\nPreferencialmente 3 a 6 linhas. Deve conter: (i) resposta direta à pergunta jurídica; (ii) fundamento determinante com referência normativa; (iii) encaminhamento prático. Mencionar expressamente que a COJUR recomenda, sugere ou orienta.\n\nAgora, elabore o parecer com base nas ENTRADAS fornecidas.";
  return prompt;
}


function ParecerModal(props) {
  var proc = props.proc;
  var onClose = props.onClose;
  var [copied, sCopied] = useState(false);
  var prompt = buildParecerPrompt(proc);
  var copy = function() {
    try {
      navigator.clipboard.writeText(prompt).then(function(){ sCopied(true); setTimeout(function(){ sCopied(false); }, 2500); });
    } catch(e) {
      var ta = document.createElement("textarea");
      ta.value = prompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      sCopied(true);
      setTimeout(function(){ sCopied(false); }, 2500);
    }
  };
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.82)",backdropFilter:"blur(12px)",zIndex:1300,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"32px 20px",overflowY:"auto"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,14,.99))",border:"1px solid rgba(0,229,255,.2)",borderRadius:24,width:"100%",maxWidth:740,padding:28,position:"relative",boxShadow:"0 0 60px rgba(0,229,255,.07),0 32px 80px rgba(0,0,0,.8)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer",padding:6}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
          <div style={{fontSize:26}}>📋</div>
          <div>
            <h3 style={{margin:0,fontSize:16,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif",textShadow:"0 0 10px rgba(0,229,255,.5)"}}>Prompt Parecer CFM</h3>
            <div style={{fontSize:11,color:K.dim,marginTop:2}}>Copie e cole na IA para elaborar o parecer</div>
          </div>
        </div>
        <div style={{padding:"12px 16px",borderRadius:13,background:"rgba(0,229,255,.06)",border:"1px solid rgba(0,229,255,.15)",marginBottom:14}}>
          <div style={{fontSize:10,color:"#00e5ff",fontWeight:700,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Processo</div>
          <div style={{fontSize:13,fontWeight:700,color:K.txt}}>{proc.assunto}</div>
          <div style={{fontSize:11,color:K.dim,marginTop:3}}>{proc.tipoPeca}{proc.numeroSEI?" · SEI "+proc.numeroSEI:""}{proc.interessado?" · "+proc.interessado:""}</div>
        </div>
        <div style={{padding:"14px 16px",borderRadius:13,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",maxHeight:340,overflowY:"auto",fontSize:11,color:"#94a3b8",lineHeight:1.7,whiteSpace:"pre-wrap",fontFamily:"'JetBrains Mono',monospace",marginBottom:14}}>{prompt}</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button onClick={copy} style={{flex:1,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,padding:"12px 20px",borderRadius:13,border:copied?"1px solid rgba(0,255,136,.5)":"1px solid rgba(0,229,255,.35)",background:copied?"linear-gradient(135deg,rgba(0,255,136,.18),rgba(0,255,136,.06))":"linear-gradient(135deg,rgba(0,229,255,.18),rgba(0,229,255,.06))",color:copied?"#00ff88":"#00e5ff",fontSize:13,fontWeight:800,cursor:"pointer",boxShadow:copied?"0 0 20px rgba(0,255,136,.25)":"0 0 20px rgba(0,229,255,.2)",textShadow:copied?"0 0 8px rgba(0,255,136,.7)":"0 0 8px rgba(0,229,255,.6)",fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",transition:"all .3s"}}>
            {copied?"✅ Copiado!":"📋 Copiar Prompt Completo"}
          </button>
          <button onClick={onClose} style={{...btnGhost,padding:"12px 16px",fontSize:12}}>Fechar</button>
        </div>
        <div style={{marginTop:12,padding:"10px 14px",borderRadius:10,background:"rgba(184,77,255,.07)",border:"1px solid rgba(184,77,255,.2)",fontSize:11,color:"#a78bfa",lineHeight:1.6}}>
          💡 Cole o prompt copiado no <strong>Claude</strong> ou em outro modelo de IA. Os dados do processo já foram inseridos nas entradas. Complete os campos entre parênteses com informações adicionais dos autos.
        </div>
      </div>
    </div>
  );
}


/* === PDF AI ANALYZER === */
function PdfAIModal(props) {
  var proc=props.proc, onClose=props.onClose;
  var s1=useState(false),loading=s1[0],sLoad=s1[1];
  var s2=useState(""),result=s2[0],sResult=s2[1];
  var s3=useState(""),err=s3[0],sErr=s3[1];
  var s4=useState(""),fname=s4[0],sFname=s4[1];
  var fileRef=useRef(null);
  var analyze=function(b64,mime,fn){
    sLoad(true);sErr("");sResult("");sFname(fn);
    var ctx="Processo: "+(proc.num||"")+" | SEI: "+(proc.numeroSEI||"")+" | Assunto: "+proc.assunto+" | Tipo: "+proc.tipoPeca;
    fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:mime,data:b64}},{type:"text",text:"Voce e advogado senior da COJUR/CFM. Analise este documento e forneca:\n\n1. RESUMO: O que e este documento (2 frases)\n2. PROXIMA PROVIDENCIA: Acao concreta e imediata\n3. PRAZO: Se ha prazo no documento, qual e\n4. ARGUMENTOS: Se for peca da parte contraria, quais os pontos a rebater\n5. RISCO: Critico/Medio/Baixo e justificativa\n\nContexto: "+ctx+"\n\nSeja direto e tecnico. Sem travesSao."}]}]})})
    .then(function(r){return r.json();}).then(function(d){var t=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("\n").trim();sResult(t||"Sem analise.");sLoad(false);}).catch(function(){sErr("Erro na analise.");sLoad(false);});
  };
  var onFile=function(e){var f=e.target.files&&e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){analyze(ev.target.result.split(",")[1],f.type||"application/pdf",f.name);};r.readAsDataURL(f);};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:1400,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"32px 16px",overflowY:"auto"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(168,85,247,.25)",borderRadius:22,width:"100%",maxWidth:680,padding:26,position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,.8)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
          <span style={{fontSize:22}}>📄</span>
          <div><h3 style={{margin:0,fontSize:15,fontWeight:800,color:"#b84dff",fontFamily:"Orbitron,sans-serif"}}>Análise IA do Processo</h3><div style={{fontSize:11,color:K.dim,marginTop:2}}>{proc.num||"—"} · {proc.tipoPeca}</div></div>
        </div>
        <input ref={fileRef} type="file" accept=".pdf,image/*" style={{display:"none"}} onChange={onFile}/>
        {!result&&!loading&&<div style={{textAlign:"center",padding:"36px 0"}}><div style={{fontSize:44,marginBottom:14}}>📎</div><div style={{fontSize:14,fontWeight:700,color:K.txt,marginBottom:6}}>Anexe o PDF do processo</div><div style={{fontSize:12,color:K.dim,marginBottom:20}}>A IA analisa e indica próxima providência, prazo, argumentos e risco</div><button onClick={function(){fileRef.current&&fileRef.current.click();}} style={{...btnPrim,padding:"12px 24px",justifyContent:"center"}}>📎 Selecionar PDF</button></div>}
        {loading&&<div style={{padding:"24px 0"}}><TerminalAI lines={["Lendo PDF · "+(fname||"arquivo")+"…","Extraindo metadados processuais…","Cruzando jurisprudência (CFM · STJ · STF)…","Identificando teses-mãe e contra-argumentos…","Compilando ficha técnica."]}/></div>}
        {err&&<div style={{padding:"12px",borderRadius:12,background:"rgba(255,46,91,.1)",border:"1px solid rgba(255,46,91,.3)",color:"#ff2e5b",fontSize:12,marginBottom:12}}>{err}</div>}
        {result&&<div><div style={{fontSize:10,color:"#b84dff",fontWeight:700,marginBottom:8,fontFamily:"Orbitron,sans-serif",textTransform:"uppercase",letterSpacing:".5px"}}>Análise gerada pela IA</div><div style={{padding:"14px",borderRadius:13,background:"rgba(168,85,247,.06)",border:"1px solid rgba(168,85,247,.15)",fontSize:12,color:K.txt,lineHeight:1.8,whiteSpace:"pre-wrap",maxHeight:380,overflowY:"auto"}}>{result}</div><div style={{fontSize:10,color:K.dim,marginTop:6}}>📄 {fname}</div><div style={{marginTop:12,display:"flex",gap:8}}><button onClick={function(){fileRef.current&&fileRef.current.click();}} style={{...btnGhost,padding:"8px 14px",fontSize:11}}>Analisar outro PDF</button></div></div>}
      </div>
    </div>
  );
}


/* === GMAIL SEI READER === */
function GmailSEIModal(props) {
  var dp=props.dp, onClose=props.onClose;
  var sTab=useState("colar");var tab=sTab[0],setTab=sTab[1];
  var sLoad=useState(false);var loading=sLoad[0],setLoad=sLoad[1];
  var sEmails=useState([]);var emails=sEmails[0],setEmails=sEmails[1];
  var sErr=useState("");var err=sErr[0],setErr=sErr[1];
  var sAdded=useState({});var added=sAdded[0],setAdded=sAdded[1];
  var sTexto=useState("");var texto=sTexto[0],setTexto=sTexto[1];
  var sExtracted=useState(null);var extracted=sExtracted[0],setExtracted=sExtracted[1];

  /* ── ABA 1: Colar email e extrair com IA ─────────────────────────────── */
  var extrairEmail=function(){
    if(!texto.trim()){setErr("Cole o texto do email antes de analisar.");return;}
    setLoad(true);setErr("");setExtracted(null);
    var prompt="Analise o email abaixo e extraia as informações do processo judicial ou administrativo.\n\nEMAIL:\n"+texto+"\n\nRetorne APENAS um objeto JSON (não array) com:\n- assunto: assunto do email (string)\n- remetente: quem enviou (string)\n- data: data do email (string)\n- numeroSEI: número SEI se houver (string ou null)\n- numeroProcesso: número judicial se houver no formato XXXXXXX-XX.XXXX.X.XX.XXXX (string ou null)\n- tipoPeca: tipo de peça jurídica mencionada (string ou null)\n- prazo: data de prazo mencionada (string ou null)\n- tipo: 'jud' se for processo judicial/tribunal, 'adm' se for administrativo\n- grupo: 1 se mencionar novo prazo SEI atribuído, 2 se for email institucional importante\n- urgencia: 'alta' se mencionar prazo vencendo, 'media' se institucional, 'normal' para demais\n- resumo: 1 frase descrevendo o que o email solicita ou comunica\n\nSeja preciso. SOMENTE JSON, sem markdown.";
    fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:prompt}]})})
    .then(function(r){return r.json();})
    .then(function(d){
      var txt=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("").replace(/```json|```/g,"").trim();
      try{
        var obj=JSON.parse(txt);
        setExtracted(obj);
        setLoad(false);
      }catch(e){
        setErr("Não foi possível extrair os dados. Verifique se o texto contém informações de processo.");
        setLoad(false);
      }
    })
    .catch(function(){setErr("Erro de conexão.");setLoad(false);});
  };

  /* ── ABA 2: Busca automática via Gmail MCP ───────────────────────────── */
  var buscarGmail=function(){
    setLoad(true);setErr("");setEmails([]);
    fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
      model:"claude-sonnet-4-20250514",max_tokens:3000,
      messages:[{role:"user",content:"Use o Gmail para buscar emails recentes (últimos 30 dias). Identifique: GRUPO 1 — emails com 'Comunico a atribuição de novo prazo em seu nome no âmbito do sistema SEI'. GRUPO 2 — emails de TRF, STJ, STF, TRT, OAB, AGU, CNJ, CFM, CRM, MP sobre processos, prazos, decisões, intimações. Para cada email retorne JSON: [{assunto, remetente, data, numeroSEI, numeroProcesso, tipoPeca, prazo, tipo (jud/adm), grupo (1/2), urgencia (alta/media/normal), resumo}]. APENAS array JSON."}],
      mcp_servers:[{type:"url",url:"https://gmail.mcp.claude.com/mcp",name:"gmail"}]
    })})
    .then(function(r){return r.json();})
    .then(function(d){
      var txt=(d.content||[]).filter(function(b){return b.type==="text";}).map(function(b){return b.text;}).join("").replace(/```json|```/g,"").trim();
      try{
        var a=JSON.parse(txt);
        if(Array.isArray(a)&&a.length>0){setEmails(a);setLoad(false);}
        else{setErr("Nenhum email relevante encontrado. Tente a aba 'Colar Email' para importar manualmente.");setLoad(false);}
      }catch(e){
        setErr("O Gmail MCP não retornou dados neste ambiente. Use a aba 'Colar Email' — cole o texto do email e a IA extrai as informações automaticamente.");
        setLoad(false);
      }
    })
    .catch(function(e){
      setErr("Erro de conexão. Use a aba 'Colar Email' como alternativa.");
      setLoad(false);
    });
  };

  var importarObj=function(em){
    var isJ=em.tipo==="jud"||(em.numeroProcesso&&em.numeroProcesso.length>10);
    if(isJ){dp({type:"ADD_J",proc:{num:em.numeroProcesso||"",numeroSEI:em.numeroSEI||"",assunto:em.assunto||"Processo judicial via Gmail",tipoPeca:em.tipoPeca||"Manifestação",proxProv:"Verificar prazo e elaborar "+(em.tipoPeca||"peça")}});}
    else{dp({type:"ADD_A",proc:{num:em.numeroSEI||"",numeroSEI:em.numeroSEI||"",assunto:em.assunto||"Processo administrativo via Gmail",tipoPeca:"Parecer Jurídico",proxProv:"Verificar processo no SEI"}});}
    setAdded(function(p){var n=Object.assign({},p);n[em.assunto||"x"]=true;return n;});
  };

  var tabStyle=function(t){return {flex:1,padding:"9px 8px",borderRadius:11,border:tab===t?"1px solid rgba(0,229,255,.5)":"1px solid rgba(0,229,255,.12)",background:tab===t?"rgba(0,229,255,.12)":"rgba(0,229,255,.03)",color:tab===t?"#00e5ff":K.dim,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"};};

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:1500,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"28px 16px",overflowY:"auto"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.2)",borderRadius:22,width:"100%",maxWidth:680,padding:24,position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,.8)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>

        {/* Header */}
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <span style={{fontSize:22}}>📧</span>
          <div>
            <h3 style={{margin:0,fontSize:15,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif"}}>Gmail SEI</h3>
            <div style={{fontSize:11,color:K.dim,marginTop:2}}>Importe processos a partir de emails do SEI/tribunais</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          <button onClick={function(){setTab("colar");setErr("");setExtracted(null);}} style={tabStyle("colar")}>📋 Colar Email (recomendado)</button>
          <button onClick={function(){setTab("auto");setErr("");setEmails([]);}} style={tabStyle("auto")}>🔍 Busca Automática</button>
        </div>

        {/* Erro */}
        {err&&<div style={{padding:"10px 14px",borderRadius:11,background:"rgba(255,46,91,.1)",border:"1px solid rgba(255,46,91,.3)",color:"#ff2e5b",fontSize:12,marginBottom:14,lineHeight:1.6}}>{err}</div>}

        {/* ABA: Colar Email */}
        {tab==="colar"&&<div>
          <div style={{padding:"9px 14px",borderRadius:10,background:"rgba(0,229,255,.05)",border:"1px solid rgba(0,229,255,.12)",fontSize:11,color:K.dim,marginBottom:12,lineHeight:1.6}}>
            <span style={{color:"#00e5ff",fontWeight:700}}>Como usar: </span>
            Abra o email no Gmail, selecione todo o texto (Ctrl+A), copie (Ctrl+C) e cole aqui abaixo. A IA extrai os dados automaticamente.
          </div>
          <textarea
            value={texto}
            onChange={function(e){setTexto(e.target.value);}}
            placeholder={"Cole aqui o texto completo do email SEI ou do tribunal...\n\nExemplo:\nDe: sei@cfm.org.br\nAssunto: Comunico a atribuição de novo prazo...\n\nComunico que foi atribuído novo prazo..."}
            style={{...inpSt,minHeight:160,resize:"vertical",marginBottom:12,lineHeight:1.6,fontSize:12}}
          />
          {loading&&<div style={{padding:"12px 0"}}><SkeletonBlock lines={4} h={20}/><div style={{textAlign:"center",fontSize:11,color:K.ac,fontFamily:"Orbitron,sans-serif",marginTop:8}}>Extraindo informações...</div></div>}
          {!loading&&!extracted&&<button onClick={extrairEmail} style={{...btnPrim,width:"100%",justifyContent:"center",padding:"11px"}}>🧠 Analisar email com IA</button>}
          {extracted&&!loading&&<div>
            <div style={{padding:"14px 16px",borderRadius:14,background:"rgba(0,229,255,.07)",border:"1px solid rgba(0,229,255,.2)",marginBottom:12}}>
              <div style={{fontSize:10,color:"#00e5ff",fontWeight:700,marginBottom:10,textTransform:"uppercase",letterSpacing:".5px"}}>Dados extraídos pela IA</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[["Assunto",extracted.assunto],["Remetente",extracted.remetente],["Data",extracted.data],["Tipo",extracted.tipo==="jud"?"Judicial":"Administrativo"],["Nº SEI",extracted.numeroSEI||"—"],["Nº Processo",extracted.numeroProcesso||"—"],["Tipo de Peça",extracted.tipoPeca||"—"],["Prazo",extracted.prazo||"—"]].map(function(item,i){return(
                  <div key={i} style={{padding:"8px 10px",borderRadius:8,background:"rgba(255,255,255,.025)"}}>
                    <div style={{fontSize:9,color:K.dim,fontWeight:700,textTransform:"uppercase",marginBottom:3}}>{item[0]}</div>
                    <div style={{fontSize:12,color:K.txt,fontWeight:600,wordBreak:"break-word"}}>{item[1]||"—"}</div>
                  </div>
                );})}
              </div>
              {extracted.resumo&&<div style={{marginTop:10,padding:"8px 10px",borderRadius:8,background:"rgba(0,229,255,.06)",fontSize:11,color:"#94a3b8",fontStyle:"italic"}}>{extracted.resumo}</div>}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={function(){importarObj(extracted);}} disabled={added[extracted.assunto||"x"]} style={{flex:1,...btnPrim,justifyContent:"center",padding:"10px",color:added[extracted.assunto||"x"]?"#00ff88":"#00e5ff",borderColor:added[extracted.assunto||"x"]?"rgba(0,255,136,.4)":"rgba(0,229,255,.35)",background:added[extracted.assunto||"x"]?"rgba(0,255,136,.1)":"rgba(0,229,255,.1)"}}>
                {added[extracted.assunto||"x"]?"✅ Processo importado!":"➕ Importar processo"}
              </button>
              <button onClick={function(){setExtracted(null);setTexto("");setErr("");}} style={{...btnGhost,padding:"10px 14px",fontSize:12}}>Novo email</button>
            </div>
          </div>}
        </div>}

        {/* ABA: Busca Automática */}
        {tab==="auto"&&<div>
          <div style={{padding:"9px 14px",borderRadius:10,background:"rgba(255,184,0,.06)",border:"1px solid rgba(255,184,0,.2)",fontSize:11,color:K.dim,marginBottom:14,lineHeight:1.6}}>
            <span style={{color:"#ffb800",fontWeight:700}}>Requer conector Gmail ativo: </span>
            Acesse Configurações → Conectores no Claude.ai e confirme que o Gmail está conectado. Se não funcionar, use a aba "Colar Email".
          </div>
          {!loading&&!emails.length&&<div style={{textAlign:"center",padding:"24px 0"}}>
            <div style={{fontSize:38,marginBottom:10}}>📬</div>
            <div style={{fontSize:14,fontWeight:700,color:K.txt,marginBottom:14}}>Buscar emails com prazos SEI no Gmail</div>
            <button onClick={buscarGmail} style={{...btnPrim,padding:"11px 22px",justifyContent:"center"}}>🔍 Buscar Gmail</button>
          </div>}
          {loading&&<div style={{padding:"24px 0"}}><TerminalAI lines={["Autenticando OAuth Google…","Conectando IMAP / Gmail SEI…","Filtrando assuntos com nº de processo…","Importando últimos 30 dias.","Pronto."]}/></div>}
          {emails.length>0&&(function(){
            var g1=emails.filter(function(e){return e.grupo===1||e.grupo==="1";});
            var g2=emails.filter(function(e){return e.grupo!==1&&e.grupo!=="1";});
            var EM=function(em,i){
              var isJ=em.tipo==="jud"||(em.numeroProcesso&&em.numeroProcesso.length>10);
              var done=added[em.assunto||"x"]; var alta=em.urgencia==="alta";
              var canI=em.grupo===1||em.grupo==="1";
              return(
                <div key={i} style={{padding:"11px 14px",borderRadius:12,background:done?"rgba(0,255,136,.04)":alta?"rgba(255,46,91,.04)":"rgba(255,255,255,.025)",border:done?"1px solid rgba(0,255,136,.25)":alta?"1px solid rgba(255,46,91,.3)":"1px solid rgba(255,255,255,.07)",display:"flex",gap:12,alignItems:"flex-start",marginBottom:8}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",gap:5,marginBottom:5,flexWrap:"wrap"}}>
                      <Bd color={isJ?K.pu:K.ac}>{isJ?"Judicial":"Adm"}</Bd>
                      {alta&&<Bd color={K.cr}>URGENTE</Bd>}
                      {em.prazo&&<Bd color={K.wa}>{em.prazo}</Bd>}
                      {done&&<Bd color={K.su}>Importado</Bd>}
                    </div>
                    <div style={{fontSize:13,fontWeight:700,color:K.txt,marginBottom:3}}>{em.assunto}</div>
                    {em.resumo&&<div style={{fontSize:11,color:"#94a3b8",fontStyle:"italic",marginBottom:3}}>{em.resumo}</div>}
                    {em.numeroSEI&&<div style={{fontSize:10,color:"#7dd3fc",fontFamily:"'JetBrains Mono',monospace"}}>SEI: {em.numeroSEI}</div>}
                    {em.numeroProcesso&&<div style={{fontSize:10,color:"#b84dff",fontFamily:"'JetBrains Mono',monospace"}}>Proc: {em.numeroProcesso}</div>}
                    <div style={{fontSize:10,color:K.dim,marginTop:3}}>{em.remetente} · {em.data}</div>
                  </div>
                  {canI&&<button onClick={function(){importarObj(em);}} disabled={done} style={{padding:"7px 12px",borderRadius:10,border:done?"1px solid rgba(0,255,136,.3)":"1px solid rgba(0,229,255,.3)",background:done?"rgba(0,255,136,.06)":"rgba(0,229,255,.08)",color:done?"#00ff88":"#00e5ff",fontSize:11,fontWeight:700,cursor:done?"default":"pointer",flexShrink:0,fontFamily:"inherit"}}>{done?"Importado":"+ Importar"}</button>}
                </div>
              );
            };
            return(
              <div>
                {g1.length>0&&<div style={{marginBottom:14}}>
                  <div style={{fontSize:10,color:"#ff2e5b",fontWeight:800,letterSpacing:".8px",textTransform:"uppercase",marginBottom:8,fontFamily:"Orbitron,sans-serif",display:"flex",alignItems:"center",gap:8}}>
                    <div className="cj-pulse" style={{width:8,height:8,borderRadius:"50%",background:"#ff2e5b",flexShrink:0}}/>
                    Novos Prazos SEI ({g1.length})
                  </div>
                  {g1.map(EM)}
                </div>}
                {g2.length>0&&<div style={{marginBottom:10}}>
                  <div style={{fontSize:10,color:"#ffb800",fontWeight:800,letterSpacing:".8px",textTransform:"uppercase",marginBottom:8,fontFamily:"Orbitron,sans-serif"}}>Emails Importantes ({g2.length})</div>
                  {g2.map(EM)}
                </div>}
                <button onClick={buscarGmail} style={{...btnGhost,marginTop:4,width:"100%",justifyContent:"center",fontSize:11}}>Atualizar</button>
              </div>
            );
          })()}
        </div>}
      </div>
    </div>
  );
}



/* === RELATORIO DE PRODUCAO === */
function RelatorioModal(props) {
  var st=props.st, onClose=props.onClose;
  var s1=useState(false),loading=s1[0],sLoad=s1[1];
  var s2=useState(""),result=s2[0],sResult=s2[1];
  var s3=useState(false),copied=s3[0],sCopied=s3[1];
  var gerar=function(){
    sLoad(true);sResult("");
    var total=[...st.adm,...st.jud].length;
    var real=(st.realizados||[]);
    var mes=new Date().toLocaleDateString("pt-BR",{month:"long",year:"numeric"});
    var dados="Mes: "+mes+"\nTotal processos: "+total+"\nRealizados: "+real.length+"\nJudiciais: "+st.jud.length+"\nAdministrativos: "+st.adm.length+"\nSustentacoes: "+st.sust.length+"\nReunioes: "+st.reun.length;
    var lista=real.slice(0,15).map(function(p,i){return (i+1)+". "+p.assunto+" ("+p.tipoPeca+", "+(p.tipo==="jud"?"Judicial":"Adm")+")";}).join("\n");
    fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2048,messages:[{role:"user",content:"Voce e advogado senior da COJUR/CFM. Gere Relatorio de Producao Mensal formal para o Coordenador da COJUR. Sem travesSao.\n\nDados:\n"+dados+"\n\nProcessos concluidos:\n"+lista+"\n\nEstrutura: (1) Cabecalho com periodo; (2) Quadro-resumo; (3) Principais atividades; (4) Observacoes; (5) Situacao do acervo. Seja objetivo e institucional."}]})})
    .then(function(r){if(!r.ok) throw new Error("HTTP "+r.status);return r.json();}).then(function(d){if(d.error){sResult("Erro da API: "+(d.error.message||"desconhecido"));sLoad(false);return;}var t=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("\n").trim();sResult(t||"Sem relatorio.");sLoad(false);}).catch(function(e){sResult("Erro ao gerar: "+(e.message||"Verifique sua conexão."));sLoad(false);});
  };
  var copy=function(){try{navigator.clipboard.writeText(result).then(function(){sCopied(true);setTimeout(function(){sCopied(false);},2500);});}catch(e){}};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.83)",backdropFilter:"blur(10px)",zIndex:1400,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"32px 16px",overflowY:"auto"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.2)",borderRadius:22,width:"100%",maxWidth:700,padding:26,position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,.8)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
          <span style={{fontSize:22}}>📊</span>
          <div><h3 style={{margin:0,fontSize:15,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif"}}>Relatório de Produção Mensal</h3><div style={{fontSize:11,color:K.dim,marginTop:2}}>Gerado por IA com base nos dados do COJUR Nexus</div></div>
        </div>
        {!result&&!loading&&<div style={{textAlign:"center",padding:"32px 0"}}><div style={{fontSize:42,marginBottom:12}}>📊</div><div style={{fontSize:14,fontWeight:700,color:K.txt,marginBottom:5}}>Gerar relatório do mês</div><div style={{fontSize:12,color:K.dim,marginBottom:20}}>{(st.realizados||[]).length} realizados · {[...st.adm,...st.jud].length} no acervo</div><button onClick={gerar} style={{...btnPrim,padding:"12px 24px",justifyContent:"center"}}>Gerar Relatório IA</button></div>}
        {loading&&<div style={{padding:"24px 0"}}><TerminalAI lines={["Agrupando processos por tipo, urgência e responsável…","Calculando KPIs e variações 7/30/90 dias…","Renderizando gráficos institucionais…","Pronto."]}/></div>}
        {result&&<div><div style={{padding:"14px",borderRadius:13,background:"rgba(255,255,255,.025)",border:"1px solid rgba(0,229,255,.1)",fontSize:12,color:K.txt,lineHeight:1.8,whiteSpace:"pre-wrap",maxHeight:400,overflowY:"auto",marginBottom:12}}>{result}</div><div style={{display:"flex",gap:10}}><button onClick={copy} style={{flex:1,...btnPrim,justifyContent:"center",padding:"10px",color:copied?"#00ff88":"#00e5ff"}}>{copied?"Copiado!":"Copiar Relatório"}</button><button onClick={gerar} style={{...btnGhost,padding:"10px 14px",fontSize:12}}>Regenerar</button></div></div>}
      </div>
    </div>
  );
}


/* ═══ TEMPLATES DE PROCESSO ═══ */
var TEMPLATES_JUD = [
  {label:"Mandado de Segurança",vals:{tipoAcao:"Mandado de Segurança",tipoPeca:"Informações em MS",intersticio:10,impacto:4,complexidade:3,custas:false}},
  {label:"Ação Ordinária",vals:{tipoAcao:"Ação Ordinária",tipoPeca:"Contestação",intersticio:15,impacto:3,complexidade:3}},
  {label:"Agravo Interno TRF",vals:{tipoAcao:"Agravo Interno",tipoPeca:"Agravo Interno",intersticio:15,impacto:4,complexidade:4,custas:false}},
  {label:"Recurso Especial STJ",vals:{tipoAcao:"Recurso Especial",tipoPeca:"Recurso Especial",tribunal:"STJ",intersticio:15,impacto:5,complexidade:5,custas:true}},
  {label:"Embargos de Declaração",vals:{tipoAcao:"Embargos de Declaração",tipoPeca:"Embargos de Declaração",intersticio:5,impacto:2,complexidade:2,custas:false}},
  {label:"Apelação",vals:{tipoAcao:"Apelação",tipoPeca:"Apelação",intersticio:15,impacto:4,complexidade:4,custas:true}},
  {label:"Sustentação Oral",vals:{tipoAcao:"Sustentação Oral",tipoPeca:"Sustentação Oral",impacto:5,complexidade:4,custas:false,sustentacao:true}},
];
var TEMPLATES_ADM = [
  {label:"Parecer Jurídico",vals:{tipoPeca:"Parecer Jurídico",fase:"Elaboração",impacto:3,complexidade:3}},
  {label:"Ofício para MPF",vals:{tipoPeca:"Ofício",fase:"Elaboração",impacto:3,complexidade:2}},
  {label:"Despacho de Andamento",vals:{tipoPeca:"Despacho de Andamento",fase:"Triagem",impacto:1,complexidade:1}},
  {label:"Análise de Resolução CFM",vals:{tipoPeca:"Parecer Jurídico",fase:"Elaboração",impacto:4,complexidade:4}},
];


/* ═══ RESUMO DE DECISÃO JUDICIAL ═══ */
function DecisaoModal({onClose}) {
  var sLoad=useState(false);var loading=sLoad[0],setLoad=sLoad[1];
  var sTexto=useState("");var texto=sTexto[0],setTexto=sTexto[1];
  var sResult=useState("");var result=sResult[0],setResult=sResult[1];
  var sCopied=useState(false);var copied=sCopied[0],setCopied=sCopied[1];

  var analisar=function(){
    if(!texto.trim())return;
    setLoad(true);setResult("");
    var prompt="Você é advogado sênior da COJUR/CFM. Analise a decisão judicial abaixo e forneça:\n\n1. TIPO DE DECISÃO: (Sentença/Acórdão/Decisão interlocutória/Despacho)\n2. RESULTADO: Resumo em 2 frases do que foi decidido\n3. PRÓXIMA PROVIDÊNCIA: Ação concreta e imediata para a COJUR\n4. PRAZO: Prazo para recurso ou manifestação (com fundamento legal)\n5. ARGUMENTOS A REBATER: Se desfavorável, quais argumentos precisam ser contestados\n6. NÍVEL DE RISCO: Crítico/Médio/Baixo para o CFM — com justificativa\n\nDecisão:\n"+texto+"\n\nSeja direto, técnico e objetivo. Sem travessão.";
    fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:prompt}]})})
    .then(function(r){return r.json();})
    .then(function(d){var t=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("").trim();setResult(t||"Sem resultado.");setLoad(false);})
    .catch(function(){setResult("Erro na análise.");setLoad(false);});
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:1500,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"28px 16px",overflowY:"auto"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(168,85,247,.25)",borderRadius:22,width:"100%",maxWidth:700,padding:24,position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,.8)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <span style={{fontSize:22}}>⚖️</span>
          <div><h3 style={{margin:0,fontSize:15,fontWeight:800,color:"#b84dff",fontFamily:"Orbitron,sans-serif"}}>Resumo de Decisão Judicial</h3>
          <div style={{fontSize:11,color:K.dim,marginTop:2}}>Cole o texto da decisão — IA extrai tipo, prazo, providência e risco</div></div>
        </div>
        <textarea value={texto} onChange={function(e){setTexto(e.target.value);}} placeholder={"Cole aqui o texto da decisão judicial, acórdão ou despacho...\n\nExemplo: VISTOS. Trata-se de ação ordinária proposta..."}
          style={{...inpSt,minHeight:160,resize:"vertical",marginBottom:12,lineHeight:1.6,fontSize:12}}/>
        {loading&&<div style={{padding:"18px 0"}}><TerminalAI lines={["Lendo a decisão judicial…","Extraindo tese, fundamentos e ratio…","Mapeando precedentes citados (STF · STJ · TRFs)…","Sintetizando para parecer interno."]}/></div>}
        {!loading&&!result&&<button onClick={analisar} style={{...btnPrim,width:"100%",justifyContent:"center",padding:"11px",color:"#b84dff",borderColor:"rgba(168,85,247,.4)",background:"rgba(168,85,247,.1)"}}>⚖️ Analisar Decisão com IA</button>}
        {result&&!loading&&<div>
          <div style={{padding:"14px",borderRadius:13,background:"rgba(168,85,247,.06)",border:"1px solid rgba(168,85,247,.2)",fontSize:12,color:K.txt,lineHeight:1.8,whiteSpace:"pre-wrap",maxHeight:360,overflowY:"auto",marginBottom:12}}>{result}</div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={function(){navigator.clipboard.writeText(result).then(function(){setCopied(true);setTimeout(function(){setCopied(false);},2500);});}} style={{flex:1,...btnPrim,justifyContent:"center",padding:"10px",color:copied?"#00ff88":"#b84dff",borderColor:copied?"rgba(0,255,136,.4)":"rgba(168,85,247,.35)",background:copied?"rgba(0,255,136,.08)":"rgba(168,85,247,.08)"}}>{copied?"✅ Copiado!":"📋 Copiar Análise"}</button>
            <button onClick={function(){setResult("");setTexto("");}} style={{...btnGhost,padding:"10px 14px",fontSize:12}}>Nova decisão</button>
          </div>
        </div>}
      </div>
    </div>
  );
}


/* ═══ REVISÃO DE PEÇA ═══ */
function RevisaoModal({onClose}) {
  var sLoad=useState(false);var loading=sLoad[0],setLoad=sLoad[1];
  var sTexto=useState("");var texto=sTexto[0],setTexto=sTexto[1];
  var sResult=useState("");var result=sResult[0],setResult=sResult[1];
  var sCopied=useState(false);var copied=sCopied[0],setCopied=sCopied[1];

  var revisar=function(){
    if(!texto.trim())return;
    setLoad(true);setResult("");
    var prompt="Você é advogado sênior especializado em Direito Administrativo e Processual Civil, revisor de peças jurídicas da COJUR/CFM.\n\nRevise a peça abaixo e aponte:\n\n1. ERROS FORMAIS: problemas de formatação, estrutura, numeração de dispositivos\n2. ERROS TÉCNICOS: referências legais incorretas, argumentos juridicamente fracos ou equivocados\n3. MELHORIAS SUGERIDAS: trechos que podem ser reforçados, argumentos adicionais pertinentes\n4. LINGUAGEM: uso de travessão (proibido na COJUR), informalidades, redundâncias\n5. PONTUAÇÃO: ≤10 (necessita revisão profunda), 10-14 (ajustes pontuais), 15-18 (boa qualidade), 19-20 (excelente)\n\nPeça:\n"+texto+"\n\nSeja específico, cite os trechos problemáticos. Sem travessão na sua resposta.";
    fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1400,messages:[{role:"user",content:prompt}]})})
    .then(function(r){return r.json();})
    .then(function(d){var t=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("").trim();setResult(t||"Sem resultado.");setLoad(false);})
    .catch(function(){setResult("Erro na revisão.");setLoad(false);});
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:1500,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"28px 16px",overflowY:"auto"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,255,136,.2)",borderRadius:22,width:"100%",maxWidth:760,padding:24,position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,.8)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <span style={{fontSize:22}}>✏️</span>
          <div><h3 style={{margin:0,fontSize:15,fontWeight:800,color:"#00ff88",fontFamily:"Orbitron,sans-serif"}}>Revisão de Peça Jurídica</h3>
          <div style={{fontSize:11,color:K.dim,marginTop:2}}>Cole o rascunho — IA revisa erros formais, técnicos e de linguagem</div></div>
        </div>
        <textarea value={texto} onChange={function(e){setTexto(e.target.value);}} placeholder={"Cole aqui o texto da peça jurídica para revisão...\n\nExemplo: EXCELENTÍSSIMO SENHOR DESEMBARGADOR FEDERAL...\n\nVem respeitosamente à presença de Vossa Excelência o CONSELHO FEDERAL DE MEDICINA..."}
          style={{...inpSt,minHeight:200,resize:"vertical",marginBottom:12,lineHeight:1.6,fontSize:12}}/>
        {loading&&<div style={{padding:"18px 0"}}><TerminalAI lines={["Lendo a minuta…","Verificando coerência argumentativa e citações…","Sugerindo blindagens e pontos de elevação…","Compilando comentários de revisão."]}/></div>}
        {!loading&&!result&&<button onClick={revisar} style={{...btnPrim,width:"100%",justifyContent:"center",padding:"11px",color:"#00ff88",borderColor:"rgba(0,255,136,.4)",background:"rgba(0,255,136,.08)"}}>✏️ Revisar Peça com IA</button>}
        {result&&!loading&&<div>
          <div style={{padding:"14px",borderRadius:13,background:"rgba(0,255,136,.05)",border:"1px solid rgba(0,255,136,.15)",fontSize:12,color:K.txt,lineHeight:1.8,whiteSpace:"pre-wrap",maxHeight:380,overflowY:"auto",marginBottom:12}}>{result}</div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={function(){navigator.clipboard.writeText(result).then(function(){setCopied(true);setTimeout(function(){setCopied(false);},2500);});}} style={{flex:1,...btnPrim,justifyContent:"center",padding:"10px",color:copied?"#00ff88":"#00ff88",borderColor:copied?"rgba(0,255,136,.5)":"rgba(0,255,136,.35)",background:"rgba(0,255,136,.08)"}}>{copied?"✅ Copiado!":"📋 Copiar Revisão"}</button>
            <button onClick={function(){setResult("");setTexto("");}} style={{...btnGhost,padding:"10px 14px",fontSize:12}}>Revisar outra peça</button>
          </div>
        </div>}
      </div>
    </div>
  );
}


/* ═══ TIMELINE 30 DIAS ═══ */
function TimelinePg({st,ss}) {
  var all=[...st.adm,...st.jud].filter(function(p){return p.prazoFinal&&p.diasRestantes>=0&&p.diasRestantes<=30;}).sort(function(a,b){return a.diasRestantes-b.diasRestantes;});
  var hoje=new Date();
  var dias=Array.from({length:31},function(_,i){return i;});
  /* v41 · TimelinePrism dataset · proximos 60 dias · alturas alternadas para nao colidir */
  var prism60 = [...st.adm,...st.jud]
    .filter(function(p){return p.prazoFinal && p.diasRestantes>=0 && p.diasRestantes<=60;})
    .sort(function(a,b){return a.diasRestantes-b.diasRestantes;})
    .slice(0,8)
    .map(function(p, i){
      var d = p.diasRestantes;
      var cor = d<=5 ? "#ff2e5b" : d<=14 ? "#ffb800" : d<=28 ? "#00e5ff" : "#00ff88";
      var dt = new Date(p.prazoFinal);
      var dStr = isNaN(dt) ? (d+"du") : dt.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"}).toUpperCase().replace(".","");
      // alturas alternadas (60, 100, 140, 180) ciclicas para evitar sobreposicao visual
      var hAlt = [70, 130, 90, 170, 80, 150, 100, 120][i % 8];
      return { x: Math.max(6, Math.min(94, (d/60)*100)), c: cor, d: dStr, t: (p.assunto||"—").slice(0,28), h: hAlt };
    });
  return(
    <div className="cj-pg">
      <div className="cj-up" style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <span style={{fontSize:24}}>📅</span>
        <div>
          <h2 style={{margin:0,fontSize:20,fontWeight:800,color:K.txt,fontFamily:"Orbitron,sans-serif"}}>Timeline de Prazos</h2>
          <div style={{fontSize:11,color:K.dim,marginTop:2}}>Próximos 30 dias úteis · {all.length} processo{all.length!==1?"s":""} com prazo</div>
        </div>
      </div>
      {/* v41 · TimelinePrism · vista isometrica dos proximos 60 dias */}
      {prism60.length>0 && (
        <div style={{marginBottom:24}}>
          <TimelinePrism events={prism60}/>
        </div>
      )}
      {all.length===0&&<div style={{textAlign:"center",padding:60,color:K.dim}}><div style={{fontSize:48,marginBottom:16}}>✅</div><div style={{fontSize:16,fontWeight:700,color:K.txt}}>Nenhum prazo nos próximos 30 dias úteis</div></div>}
      {all.length>0&&<div>
        {/* Ruler */}
        <div style={{position:"relative",marginBottom:8,height:32,display:"flex",alignItems:"flex-end"}}>
          {[0,5,10,15,20,25,30].map(function(d){return(
            <div key={d} style={{position:"absolute",left:(d/30*100)+"%",transform:"translateX(-50%)",fontSize:10,color:K.dim,fontFamily:"'JetBrains Mono',monospace",fontWeight:700}}>{d===0?"Hoje":d+"du"}</div>
          );})}
        </div>
        {/* Track */}
        <div style={{position:"relative",height:8,borderRadius:999,background:"rgba(255,255,255,.06)",marginBottom:24,overflow:"visible"}}>
          <div style={{position:"absolute",left:0,top:-2,bottom:-2,width:2,background:"#00e5ff",borderRadius:999,boxShadow:"0 0 8px #00e5ff"}}/>
          {all.map(function(p,i){
            var left=(p.diasRestantes/30)*100;
            var cor=uC(p.diasRestantes);
            return <div key={p.id} style={{position:"absolute",left:left+"%",transform:"translateX(-50%)",width:10,height:10,borderRadius:"50%",background:cor,boxShadow:"0 0 8px "+cor,border:"2px solid rgba(0,0,0,.5)",top:-1,cursor:"pointer",zIndex:i+1}} onClick={function(){ss(p);}} title={p.assunto+" — "+p.diasRestantes+"du"}/>;
          })}
        </div>
        {/* Cards por faixa */}
        {[[0,0,"🚨","Vencidos/Hoje","#ff2e5b"],[1,5,"🔥","Próximos 5 dias úteis","#ff2e5b"],[6,10,"⚡","6 a 10 dias úteis","#ffb800"],[11,20,"📋","11 a 20 dias úteis","#00e5ff"],[21,30,"🗓","21 a 30 dias úteis","#94a3b8"]].map(function(faixa){
          var emoji=faixa[2],label=faixa[3],cor=faixa[4];
          var procs=all.filter(function(p){return p.diasRestantes>=faixa[0]&&p.diasRestantes<=faixa[1];});
          if(!procs.length)return null;
          return(
            <div key={label} style={{marginBottom:16}}>
              <div style={{fontSize:11,color:cor,fontWeight:700,marginBottom:8,fontFamily:"Orbitron,sans-serif",textTransform:"uppercase",letterSpacing:".5px"}}>{emoji} {label} ({procs.length})</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>
                {procs.map(function(p){return(
                  <div key={p.id} onClick={function(){ss(p);}} style={{padding:"12px 14px",borderRadius:14,background:"linear-gradient(135deg,rgba(2,5,22,.97),rgba(1,3,12,.99))",border:"1px solid "+cor+"33",cursor:"pointer",transition:"all .18s",position:"relative",overflow:"hidden"}} onMouseEnter={function(e){e.currentTarget.style.borderColor=cor+"77";}} onMouseLeave={function(e){e.currentTarget.style.borderColor=cor+"33";}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:cor,boxShadow:"0 0 6px "+cor}}/>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <div style={{fontSize:10,color:K.dim,fontFamily:"'JetBrains Mono',monospace"}}>{p.num||"Adm"}</div>
                      <div style={{fontSize:12,fontWeight:800,color:cor,fontFamily:"Orbitron,monospace"}}>{p.diasRestantes}du</div>
                    </div>
                    <div style={{fontSize:13,fontWeight:700,color:K.txt,marginBottom:4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.assunto}</div>
                    <div style={{fontSize:10,color:K.dim}}>{p.tipoPeca} · {p.tipo==="jud"?p.tribunal:"Adm"}</div>
                  </div>
                );})}
              </div>
            </div>
          );
        })}
      </div>}
    </div>
  );
}


/* ═══ CHECKLIST PRÉ-PROTOCOLO ═══ */
var CHECKLIST_ITEMS_BASE = [
  {id:"num",label:"Número do processo correto e completo"},
  {id:"ass",label:"Assinatura digital do advogado responsável"},
  {id:"cus",label:"Custas processuais verificadas"},
  {id:"ane",label:"Documentos anexos conferidos"},
  {id:"pra",label:"Prazo processual ainda vigente"},
  {id:"sei",label:"Documento gerado e incluído no SEI"},
];

var CHECKLIST_TIPO = {
  "Agravo Interno":         [{id:"dec",label:"Decisão monocrática identificada e transcrita"},
                             {id:"fun",label:"Fundamentos da decisão rebatidos ponto a ponto"},
                             {id:"pre",label:"Precedentes do próprio tribunal citados"},
                             {id:"pec",label:"Peças obrigatórias listadas (certidão de publicação)"},
                             {id:"tmp",label:"Tempestividade verificada (15 dias da intimação)"},
                             {id:"rei",label:"Requerimento de inclusão em pauta formulado"}],
  "Contestação":            [{id:"ped",label:"Todos os pedidos da inicial mapeados"},
                             {id:"pre",label:"Preliminares processuais verificadas"},
                             {id:"doc",label:"Documentos essenciais do CFM juntados"},
                             {id:"tmp",label:"Tempestividade verificada (prazo de resposta)"},
                             {id:"pro",label:"Rol de provas e testemunhas incluído se necessário"},
                             {id:"con",label:"Contagem de páginas e formatação conferidas"}],
  "Informações em MS":      [{id:"ato",label:"Ato coator identificado e descrito corretamente"},
                             {id:"doc",label:"Cópia do ato impugnado juntada"},
                             {id:"tmp",label:"Prazo de 10 dias verificado"},
                             {id:"lim",label:"Liminar (se deferida) rebatida expressamente"},
                             {id:"nor",label:"Fundamento normativo e precedentes incluídos"},
                             {id:"aut",label:"Autoridade coatora corretamente indicada"}],
  "Recurso Especial":       [{id:"pre",label:"Prequestionamento verificado na decisão recorrida"},
                             {id:"rep",label:"Hipótese de cabimento (art. 105, III CR) indicada"},
                             {id:"div",label:"Divergência jurisprudencial comprovada se aplicável"},
                             {id:"tmp",label:"Tempestividade verificada (15 dias do acórdão)"},
                             {id:"rep",label:"Repercussão geral / relevância da questão federal"},
                             {id:"pec",label:"Certidão de publicação do acórdão juntada"}],
  "Agravo em Recurso Especial":[{id:"dec",label:"Decisão de inadmissão identificada"},
                             {id:"fun",label:"Fundamentos da inadmissão rebatidos"},
                             {id:"tmp",label:"Tempestividade verificada (15 dias)"},
                             {id:"pec",label:"Peças obrigatórias do AREsp listadas"},
                             {id:"cer",label:"Certidão de publicação juntada"}],
  "Parecer Jurídico":       [{id:"rel",label:"Relatório objetivo e delimitação da consulta"},
                             {id:"nor",label:"Normas do CFM citadas com numeração exata"},
                             {id:"con",label:"Conclusão expressa e objetiva da COJUR"},
                             {id:"ass",label:"Assinado pelo advogado e revisado pelo coordenador"},
                             {id:"sei",label:"Incluído no SEI e número registrado no processo"}],
  "Sustentação Oral":       [{id:"ins",label:"Inscrição para sustentação protocolada no tribunal"},
                             {id:"vid",label:"Vídeo enviado (sustentação virtual) dentro do prazo"},
                             {id:"mem",label:"Memoriais protocolados e juntados ao processo"},
                             {id:"rot",label:"Roteiro de sustentação revisado"},
                             {id:"tmp",label:"Tempo de fala verificado com o gabinete"},
                             {id:"pau",label:"Pauta do julgamento confirmada no dia"}],
  "Embargos de Declaração": [{id:"vic",label:"Vício identificado (omissão/contradição/obscuridade)"},
                             {id:"tmp",label:"Tempestividade: 5 dias úteis da publicação"},
                             {id:"pre",label:"Prequestionamento explícito se cabível"},
                             {id:"obj",label:"Não há rediscussão de mérito"}],
  "Manifestação":           [{id:"obj",label:"Objeto da manifestação claro e delimitado"},
                             {id:"ped",label:"Pedido objetivo ao final"},
                             {id:"tmp",label:"Prazo verificado"},
                             {id:"jnt",label:"Documentos referenciados juntados"}],
  "Memoriais":              [{id:"end",label:"Endereçado ao órgão julgador correto"},
                             {id:"tmp",label:"Prazo para memoriais verificado no edital"},
                             {id:"sin",label:"Síntese da tese central clara"},
                             {id:"sei",label:"Protocolado e juntado no SEI"}],
  "Análise de Contrato":   [{id:"obj",label:"Objeto e partes do contrato identificados"},
                             {id:"vig",label:"Vigência, renovação e rescisão verificadas"},
                             {id:"nor",label:"Conformidade com normas do CFM e legislação"},
                             {id:"ris",label:"Riscos jurídicos e cláusulas abusivas analisados"},
                             {id:"par",label:"Parecer conclusivo com recomendações"},
                             {id:"sei",label:"Incluído no SEI com número registrado"}],
};
var getChecklistProtocolo = function(tipoPeca) {
  var base = CHECKLIST_ITEMS_BASE;
  var especifico = CHECKLIST_TIPO[tipoPeca] || [];
  return especifico.concat(base);
};
var CHECKLIST_ITEMS = CHECKLIST_ITEMS_BASE;

function ChecklistModal({proc,onConfirm,onClose}) {
  var sCheck=useState({});var checks=sCheck[0],setCheck=sCheck[1];
  var items = getChecklistProtocolo(proc && proc.tipoPeca);
  var all_ok=items.every(function(it){return checks[it.id];});
  var ok_count=items.filter(function(it){return checks[it.id];}).length;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:1600,display:"flex",justifyContent:"center",alignItems:"center",padding:"28px 16px"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,255,136,.25)",borderRadius:22,width:"100%",maxWidth:520,padding:24,position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,.8)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
          <span style={{fontSize:22}}>📋</span>
          <div><h3 style={{margin:0,fontSize:15,fontWeight:800,color:"#00ff88",fontFamily:"Orbitron,sans-serif"}}>Checklist Pré-Protocolo</h3>
          <div style={{fontSize:11,color:K.dim,marginTop:2}}>{proc&&(proc.num||proc.assunto)}</div></div>
          <div style={{marginLeft:"auto",fontSize:14,fontWeight:800,color:all_ok?"#00ff88":"#ffb800",fontFamily:"Orbitron,monospace"}}>{ok_count}/{items.length}</div>
        </div>
        <div style={{height:4,borderRadius:999,background:"rgba(255,255,255,.06)",marginBottom:18,overflow:"hidden"}}>
          <div style={{height:"100%",width:(ok_count/items.length*100)+"%",background:all_ok?"#00ff88":"#ffb800",boxShadow:"0 0 8px "+(all_ok?"#00ff88":"#ffb800"),transition:"width .3s"}}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
          {items.map(function(it){return(
            <label key={it.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:12,background:checks[it.id]?"rgba(0,255,136,.07)":"rgba(255,255,255,.025)",border:"1px solid "+(checks[it.id]?"rgba(0,255,136,.3)":"rgba(255,255,255,.08)"),cursor:"pointer",transition:"all .2s"}}>
              <input type="checkbox" checked={!!checks[it.id]} onChange={function(e){setCheck(function(p){var n=Object.assign({},p);n[it.id]=e.target.checked;return n;});}} style={{width:18,height:18,accentColor:"#00ff88",flexShrink:0}}/>
              <span style={{fontSize:13,color:checks[it.id]?K.dim:K.txt,textDecoration:checks[it.id]?"line-through":"none",fontWeight:checks[it.id]?400:500}}>{it.label}</span>
            </label>
          );})}
        </div>
        <button onClick={onConfirm} disabled={!all_ok} style={{...btnPrim,width:"100%",justifyContent:"center",padding:"12px",opacity:all_ok?1:0.45,color:"#00ff88",borderColor:"rgba(0,255,136,.5)",background:"rgba(0,255,136,.1)",cursor:all_ok?"pointer":"not-allowed",fontSize:13,fontWeight:800}}>
          {all_ok?"📤 Confirmar Protocolo — Tudo verificado!":"Complete todos os itens para confirmar"}
        </button>
      </div>
    </div>
  );
}


/* ═══ TIPO DE PEÇA — mapa de cores ═══ */
var PECA_COR = {
  // ── Defesa (família cyan/sky) ──
  "Contestação":"#0ea5e9","Reconvenção":"#06b6d4","Exceção de Incompetência":"#0891b2","Impugnação ao Valor da Causa":"#0284c7",
  // ── Recursos 1G→2G (família âmbar/laranja) ──
  "Apelação":"#f59e0b","Apelação Adesiva":"#d97706","Agravo de Instrumento":"#fb923c","Agravo Retido":"#ea580c",
  // ── Recursos internos tribunais (família laranja/coral) ──
  "Agravo Interno":"#f97316","Embargos de Declaração":"#e17055","Embargos Infringentes":"#d44b2f","Embargos de Divergência":"#c0392b",
  // ── Recursos excepcionais STJ/STF (família violeta/púrpura) ──
  "Recurso Especial":"#8b5cf6","Agravo em Recurso Especial":"#7c3aed",
  "Recurso Extraordinário":"#a855f7","Agravo em Recurso Extraordinário":"#9333ea","Recurso Ordinário Constitucional":"#6d28d9",
  // ── MS e incidentes (família azul) ──
  "Informações em MS":"#3b82f6","Contrarrazões":"#2563eb","Contraminuta":"#60a5fa",
  // ── Execução e cumprimento (família vermelho/rosa) ──
  "Impugnação ao Cumprimento de Sentença":"#ef4444","Exceção de Pré-Executividade":"#dc2626",
  "Embargos à Execução":"#f43f5e","Embargos de Terceiro":"#fb7185",
  "Cumprimento de Sentença":"#e11d48","Impugnação ao Cumprimento":"#be123c","Cálculos de Liquidação":"#f87171",
  // ── Tutelas e cautelares (família esmeralda/teal) ──
  "Manifestação sobre Tutela":"#10b981","Pedido de Efeito Suspensivo":"#14b8a6","Petição Cautelar":"#059669",
  // ── Manifestações gerais (família neutra/pedra) ──
  "Manifestação":"#78716c","Petição Simples":"#a8a29e","Razões de Recurso":"#d97706","Contrarrazões de Recurso":"#2563eb",
  // ── Memoriais e sustentação (família índigo/violeta) ──
  "Memorial":"#818cf8","Memoriais":"#6366f1","Alegações Finais":"#4f46e5","Sustentação Oral":"#b84dff",
  // ── Administrativo CFM (família verde/menta) ──
  "Parecer Jurídico":"#00ff88","Ofício":"#22d3ee","Nota Técnica":"#4ade80","Despacho de Andamento":"#86efac",
  // ── Contratos (dourado) ──
  "Análise de Contrato":"#eab308",
  // ── Outros ──
  "Outro":"#64748b"
};
var getPecaCor=function(tp){return PECA_COR[tp]||"#64748b";};
var getPecaLabel=function(tp){
  var abbrev={"Contestação":"CONTEST.","Apelação":"APEL.","Apelação Adesiva":"APEL.ADES.","Agravo de Instrumento":"AG.INST.","Agravo Retido":"AG.RET.","Agravo Interno":"AG.INT.","Embargos de Declaração":"EMBS.DEC.","Embargos Infringentes":"EMBS.INF.","Embargos de Divergência":"EMBS.DIV.","Recurso Especial":"RESP","Agravo em Recurso Especial":"AG.RESP","Recurso Extraordinário":"RE","Agravo em Recurso Extraordinário":"AG.RE","Recurso Ordinário Constitucional":"ROC","Informações em MS":"INFO.MS","Contrarrazões":"CTR.RAZ.","Contraminuta":"CTR.MIN.","Impugnação ao Cumprimento de Sentença":"IMP.CUM.","Exceção de Pré-Executividade":"EXC.PRE.","Embargos à Execução":"EMBS.EX.","Embargos de Terceiro":"EMBS.TER.","Manifestação sobre Tutela":"TUTE.","Pedido de Efeito Suspensivo":"EF.SUSP.","Petição Cautelar":"CAU.","Manifestação":"MANIF.","Petição Simples":"PET.","Memorial":"MEM.","Memoriais":"MEM.","Alegações Finais":"ALEG.FIN.","Razões de Recurso":"RAZ.REC.","Contrarrazões de Recurso":"CTR.REC.","Sustentação Oral":"SUST.","Cumprimento de Sentença":"CUM.SENT.","Impugnação ao Cumprimento":"IMP.CUM.","Cálculos de Liquidação":"CALC.","Parecer Jurídico":"PARECER","Ofício":"OFÍCIO","Nota Técnica":"NT","Despacho de Andamento":"DESP.","Reconvenção":"RECONV.","Exceção de Incompetência":"EXC.INC.","Impugnação ao Valor da Causa":"IMP.VALOR","Análise de Contrato":"CONTRATO"};
  return abbrev[tp]||tp.substring(0,8).toUpperCase();
};


/* ═══ GERADOR DE MINUTA COMPLETA ═══ */
function MinutaModal({proc, onClose}) {
  var sTipo=useState(proc&&proc.tipoPeca||"Contestação");var tipoMinuta=sTipo[0],setTipoMinuta=sTipo[1];
  var sLoad=useState(false);var loading=sLoad[0],setLoad=sLoad[1];
  var sMinuta=useState("");var minuta=sMinuta[0],setMinuta=sMinuta[1];
  var sCopied=useState(false);var copied=sCopied[0],setCopied=sCopied[1];
  var sObs=useState("");var obsExtra=sObs[0],setObs=sObs[1];
  /* ═══ v10 — DRAFT AUTOSAVE ═══ */
  var sDraftId=useState(null);var draftId=sDraftId[0],setDraftId=sDraftId[1];
  var sDrafts=useState(function(){return loadDrafts();});var drafts=sDrafts[0],setDrafts=sDrafts[1];
  var sTab=useState("gerar");var tab=sTab[0],setTab=sTab[1];
  /* Auto-save a cada 2s quando minuta muda */
  useEffect(function(){
    if(!minuta||minuta.length<50)return;
    var t=setTimeout(function(){
      var id=draftId||("dr_"+Date.now());
      var d={id:id,procId:proc&&proc.id,procNum:proc&&proc.num,procAssunto:proc&&proc.assunto,tipo:tipoMinuta,texto:minuta,createdAt:new Date().toISOString(),obs:obsExtra};
      saveDraft(d);setDraftId(id);setDrafts(loadDrafts());
    },2000);
    return function(){clearTimeout(t);};
  },[minuta,tipoMinuta,obsExtra]);

  var gerar=function(){
    setLoad(true);setMinuta("");
    var ctx="";
    if(proc){
      ctx="Processo: "+(proc.num||"—")+" | SEI: "+(proc.numeroSEI||"—")+" | Assunto: "+proc.assunto+" | Parte contrária: "+(proc.parteContraria||"—")+" | Tribunal: "+(proc.tribunal||"—")+" | Tipo de ação: "+(proc.tipoAcao||"—")+" | Próxima providência: "+(proc.proxProv||"—")+" | Observações: "+(proc.obs||"—");
    }
    var instrucoes="REGRAS OBRIGATÓRIAS DE ESTILO COJUR/CFM:\n1. PROIBIDO travessão (use vírgula ou ponto)\n2. Use estrutura: RELATÓRIO, FUNDAMENTOS e CONCLUSÃO\n3. Cite NORMA + FATO + CONSEQUÊNCIA JURÍDICA em cada argumento\n4. Linguagem técnica, objetiva, sem redundâncias\n5. Parágrafos numerados quando houver mais de 3\n6. Endereçamento formal ao tribunal correspondente";
    var prompt="Você é advogado sênior do Conselho Federal de Medicina (CFM) especializado em Direito Administrativo e Processual Civil. Redija uma minuta completa de "+tipoMinuta+" seguindo rigorosamente as regras da COJUR/CFM.\n\n"+instrucoes+"\n\nContexto do processo:\n"+ctx+(obsExtra?"\n\nInstruções adicionais:\n"+obsExtra:"")+"\n\nRedija a peça completa, incluindo cabeçalho formal, qualificação das partes, fundamentos jurídicos (indicando os artigos aplicáveis) e pedido final. A peça deve estar pronta para revisão e protocolo.";
    /* ═══ STREAMING SSE — texto aparece em tempo real ═══ */
    fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:4096,stream:true,messages:[{role:"user",content:prompt}]})})
    .then(function(r){if(!r.ok) throw new Error("HTTP "+r.status);if(!r.body||!r.body.getReader){return r.json().then(function(d){if(d.error){setMinuta("Erro: "+(d.error.message||"desconhecido"));setLoad(false);return;}var t=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("").trim();setMinuta(t||"Sem resultado.");setLoad(false);});}var reader=r.body.getReader();var decoder=new TextDecoder();var acc="";var buf="";function pump(){return reader.read().then(function(result){if(result.done){setLoad(false);return;}buf+=decoder.decode(result.value,{stream:true});var lines=buf.split("\n");buf=lines.pop()||"";lines.forEach(function(line){if(!line.startsWith("data: "))return;var data=line.slice(6).trim();if(data==="[DONE]")return;try{var ev=JSON.parse(data);if(ev.type==="content_block_delta"&&ev.delta&&ev.delta.text){acc+=ev.delta.text;setMinuta(acc);}}catch(e){}});return pump();});}return pump();})
    .catch(function(e){setMinuta("Erro ao gerar: "+(e.message||"Verifique sua conexão."));setLoad(false);});
  };

  var copy=function(){try{navigator.clipboard.writeText(minuta).then(function(){setCopied(true);setTimeout(function(){setCopied(false);},2500);});}catch(e){}};

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.87)",backdropFilter:"blur(14px)",zIndex:1600,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"24px 16px",overflowY:"auto"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.25)",borderRadius:22,width:"100%",maxWidth:820,padding:26,position:"relative",boxShadow:"0 32px 80px rgba(0,0,0,.9)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <span style={{fontSize:24}}>📝</span>
          <div style={{flex:1}}>
            <h3 style={{margin:0,fontSize:16,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif"}}>Gerador de Minuta Completa</h3>
            <div style={{fontSize:11,color:K.dim,marginTop:2}}>{proc&&proc.assunto||"Peça jurídica"} · {proc&&proc.num||"Novo processo"}</div>
          </div>
          {/* ═══ v10 — TABS ═══ */}
          <div style={{display:"flex",gap:4,background:"rgba(0,0,0,.3)",padding:3,borderRadius:10}}>
            <button onClick={function(){setTab("gerar");}} style={{padding:"6px 14px",borderRadius:8,border:"none",background:tab==="gerar"?K.acG:"transparent",color:tab==="gerar"?K.ac:K.dim,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Gerar</button>
            <button onClick={function(){setTab("drafts");setDrafts(loadDrafts());}} style={{padding:"6px 14px",borderRadius:8,border:"none",background:tab==="drafts"?K.puG:"transparent",color:tab==="drafts"?K.pu:K.dim,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}}>Rascunhos {drafts.length>0&&<span style={{fontSize:9,padding:"1px 6px",borderRadius:999,background:K.pu,color:"#fff"}}>{drafts.length}</span>}</button>
          </div>
        </div>
        {/* ═══ TAB DRAFTS ═══ */}
        {tab==="drafts"&&<div>
          {drafts.length===0?<div style={{padding:"40px 20px",textAlign:"center",color:K.dim}}>
            <div style={{fontSize:36,marginBottom:12}}>📋</div>
            <div style={{fontSize:13,fontWeight:700,color:K.txt,marginBottom:6}}>Nenhum rascunho salvo</div>
            <div style={{fontSize:11}}>Minutas geradas são salvas automaticamente a cada 2 segundos</div>
          </div>:<div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:440,overflowY:"auto"}}>
            {drafts.map(function(d){return <div key={d.id} style={{padding:"12px 14px",borderRadius:11,background:"rgba(255,255,255,.025)",border:"1px solid "+K.brd,cursor:"pointer"}} onClick={function(){setMinuta(d.texto);setTipoMinuta(d.tipo);setObs(d.obs||"");setDraftId(d.id);setTab("gerar");}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:10,color:K.pu,fontWeight:700,fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",marginBottom:3}}>{d.tipo}</div>
                  <div title={d.procAssunto||""} style={{fontSize:12,color:K.txt,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.procAssunto||"Sem assunto"}</div>
                  <div style={{fontSize:10,color:K.dim,marginTop:2,fontFamily:"'JetBrains Mono',monospace"}}>{d.procNum||"—"} · {d.texto.length} caracteres</div>
                </div>
                <button onClick={function(e){e.stopPropagation();if(confirm("Excluir rascunho?")){deleteDraft(d.id);setDrafts(loadDrafts());}}} style={{background:"none",border:"none",color:K.dim2,cursor:"pointer",padding:4}}><X size={14}/></button>
              </div>
              <div title={d.texto} style={{fontSize:10,color:K.dim2,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",lineHeight:1.5}}>{d.texto.substring(0,220)}</div>
              <div style={{fontSize:9,color:K.dim2,marginTop:4}}>{new Date(d.createdAt).toLocaleString("pt-BR")}</div>
            </div>;})}
          </div>}
        </div>}
        {/* ═══ TAB GERAR ═══ */}
        {tab==="gerar"&&<>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
          <div>
            <label style={lblSt}>Tipo de Peça</label>
            <select style={inpSt} value={tipoMinuta} onChange={function(e){setTipoMinuta(e.target.value);}}>
              {TIPOS_PECA.map(function(tp){return <option key={tp} value={tp} style={{background:K.modal}}>{tp}</option>;})}
            </select>
          </div>
          <div>
            <label style={lblSt}>Instruções adicionais (opcional)</label>
            <textarea style={{...inpSt,minHeight:60,resize:"vertical",fontSize:11}} value={obsExtra} onChange={function(e){setObs(e.target.value);}} placeholder="Ex: Incluir pedido de tutela de urgência, enfatizar Lei 12.842/2013..."/>
          </div>
        </div>
        <div style={{padding:"10px 14px",borderRadius:11,background:"rgba(0,229,255,.05)",border:"1px solid rgba(0,229,255,.12)",marginBottom:14,fontSize:11,color:K.dim,lineHeight:1.6,display:"flex",gap:10,alignItems:"center"}}>
          <span style={{flex:1}}><span style={{color:"#00e5ff",fontWeight:700}}>Padrão COJUR: </span>Sem travessão · NORMA+FATO+CONSEQUÊNCIA · Estrutura: Relatório / Fundamentos / Conclusão · Linguagem técnica CFM</span>
          {minuta&&draftId&&<span style={{fontSize:10,color:K.su,fontFamily:"'JetBrains Mono',monospace",flexShrink:0}}>💾 Auto-salvo</span>}
        </div>
        {!loading&&!minuta&&<button onClick={gerar} style={{...btnPrim,width:"100%",justifyContent:"center",padding:"13px",fontSize:14,letterSpacing:".3px"}}>
          📝 Gerar Minuta Completa de {tipoMinuta}
        </button>}
        {loading&&<div style={{textAlign:"center",padding:"16px 0",color:"#00e5ff"}}>
          {!minuta&&<><div className="cj-pulse" style={{fontSize:38,marginBottom:12}}>📝</div>
          <div style={{fontSize:13,fontFamily:"Orbitron,sans-serif",letterSpacing:"1px"}}>Redigindo {tipoMinuta}...</div>
          <div style={{fontSize:11,color:K.dim,marginTop:6}}>Texto aparecerá em tempo real via streaming</div></>}
          {minuta&&<div style={{textAlign:"left"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:10,color:"#00e5ff",fontWeight:700,fontFamily:"Orbitron,sans-serif",textTransform:"uppercase",letterSpacing:".5px"}}>Redigindo em tempo real...</div>
            <div className="cj-pulse" style={{width:8,height:8,borderRadius:"50%",background:"#00e5ff"}}/>
          </div>
          <textarea readOnly value={minuta} style={{...inpSt,minHeight:300,resize:"vertical",fontSize:11,lineHeight:1.7,fontFamily:"inherit"}}/></div>}
        </div>}
        {minuta&&!loading&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:10,color:"#00e5ff",fontWeight:700,fontFamily:"Orbitron,sans-serif",textTransform:"uppercase",letterSpacing:".5px"}}>Minuta gerada · {tipoMinuta}</div>
            <div style={{fontSize:10,color:K.dim}}>{minuta.length} caracteres</div>
          </div>
          <textarea readOnly value={minuta} style={{...inpSt,minHeight:420,resize:"vertical",fontSize:11,lineHeight:1.7,fontFamily:"inherit",marginBottom:12}}/>
          <div style={{display:"flex",gap:10}}>
            <button onClick={copy} style={{flex:1,...btnPrim,justifyContent:"center",padding:"11px",color:copied?"#00ff88":"#00e5ff",borderColor:copied?"rgba(0,255,136,.4)":"rgba(0,229,255,.35)",background:copied?"rgba(0,255,136,.08)":"rgba(0,229,255,.08)"}}>
              {copied?"✅ Copiado!":"📋 Copiar Minuta"}
            </button>
            <button onClick={gerar} style={{...btnGhost,padding:"11px 16px",fontSize:12}}>🔄 Regenerar</button>
          </div>
        </div>}
        </>}
      </div>
    </div>
  );
}


function DjeAutoModal(djeP){
  var proc=djeP.proc,dp=djeP.dp,onClose=djeP.onClose;
  var s1=useState(false);var loading=s1[0],setLoad=s1[1];
  var s2=useState(null);var result=s2[0],setResult=s2[1];
  var s3=useState("");var err=s3[0],setErr=s3[1];
  var s4=useState(proc&&proc.num||"");var numero=s4[0],setNumero=s4[1];
  var s5=useState(proc&&proc.tribunal||"TRF-1");var trib=s5[0],setTrib=s5[1];
  var buscar=function(){
    setLoad(true);setErr("");setResult(null);
    var prompt="Pesquise no DJe a publicação mais recente do processo "+numero+" no "+trib+". Retorne JSON: {dataDJe, tipoAto, prazo, intersticio, resumo, encontrado}.";
    fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,messages:[{role:"user",content:prompt}],tools:[{type:"web_search_20250305",name:"web_search"}]})})
    .then(function(r){if(!r.ok) throw new Error("HTTP "+r.status);return r.json();}).then(function(d){if(d.error){setErr("Erro da API: "+(d.error.message||"desconhecido"));setLoad(false);return;}var txt=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("").replace(/```json|```/g,"").trim();try{var jsonMatch=txt.match(/\{[\s\S]*\}/);if(!jsonMatch) throw new Error("JSON não encontrado");setResult(JSON.parse(jsonMatch[0]));setLoad(false);}catch(e){setErr("Não foi possível extrair dados. Verifique o número do processo e tente novamente.");setLoad(false);}}).catch(function(e){setErr("Erro de conexão: "+(e.message||""));setLoad(false);});
  };
  var aplicar=function(){if(!result||!result.dataDJe)return;dp({type:"UPD",id:proc.id,isAdm:false,ch:{pubDJe:result.dataDJe,intersticio:result.intersticio||15}});onClose();};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:1500,display:"flex",justifyContent:"center",alignItems:"center",padding:"28px 16px"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.25)",borderRadius:22,width:"100%",maxWidth:520,padding:24,position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <span style={{fontSize:22}}>DJe</span>
          <div><h3 style={{margin:0,fontSize:14,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif"}}>Busca DJe Automatica</h3><div style={{fontSize:11,color:K.dim}}>IA pesquisa a publicacao mais recente</div></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:10,marginBottom:12}}>
          <div><label style={lblSt}>N do Processo</label><input style={inpSt} value={numero} onChange={function(e){setNumero(e.target.value);}} placeholder="0000000-00.0000.0.00.0000"/></div>
          <div><label style={lblSt}>Tribunal</label><select style={inpSt} value={trib} onChange={function(e){setTrib(e.target.value);}}>{TRIBS.map(function(t){return <option key={t.label||t} value={t.label||t} style={{background:K.modal}}>{t.label||t}</option>;})}</select></div>
        </div>
        {!loading&&!result&&<button onClick={buscar} style={{...btnPrim,width:"100%",justifyContent:"center",padding:"11px"}}>Buscar no DJe</button>}
        {loading&&<div style={{textAlign:"center",padding:"20px 0",color:"#00e5ff"}}><div className="cj-pulse" style={{fontSize:28,marginBottom:8}}>...</div><div style={{fontSize:12,fontFamily:"Orbitron,sans-serif"}}>Pesquisando...</div></div>}
        {err&&<div style={{padding:"10px",borderRadius:10,background:"rgba(255,46,91,.1)",border:"1px solid rgba(255,46,91,.3)",color:"#ff2e5b",fontSize:12,marginTop:8}}>{err}</div>}
        {result&&<div>
          <div style={{padding:"14px",borderRadius:13,background:"rgba(0,229,255,.06)",border:"1px solid rgba(0,229,255,.2)",marginBottom:12}}>
            {result.dataDJe&&<div style={{marginBottom:6}}><div style={{fontSize:9,color:K.dim,textTransform:"uppercase",fontWeight:700,marginBottom:3}}>Data Publicacao DJe</div><div style={{fontSize:18,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,monospace"}}>{result.dataDJe}</div></div>}
            {result.tipoAto&&<div style={{marginBottom:4}}><span style={{fontSize:9,color:K.dim,textTransform:"uppercase",fontWeight:700}}>Ato: </span><span style={{fontSize:12,color:K.txt}}>{result.tipoAto}</span></div>}
            {result.prazo&&<div><span style={{fontSize:9,color:K.dim,textTransform:"uppercase",fontWeight:700}}>Prazo: </span><span style={{fontSize:12,color:"#ffb800",fontWeight:700}}>{result.prazo} ({result.intersticio||15}du)</span></div>}
            {result.resumo&&<div style={{fontSize:11,color:K.dim,fontStyle:"italic",marginTop:6}}>{result.resumo}</div>}
          </div>
          <div style={{display:"flex",gap:8}}>
            {result.dataDJe&&proc&&<button onClick={aplicar} style={{flex:1,...btnPrim,justifyContent:"center",padding:"10px",fontSize:12}}>Aplicar data ao processo</button>}
            <button onClick={buscar} style={{...btnGhost,padding:"10px 14px",fontSize:12}}>Nova busca</button>
          </div>
        </div>}
      </div>
    </div>
  );
}


function IANovoProcessoModal(iaNP){
  var dp=iaNP.dp,onClose=iaNP.onClose;
  var s1=useState(false);var loading=s1[0],setLoad=s1[1];
  var s2=useState("");var descricao=s2[0],setDesc=s2[1];
  var s3=useState(null);var result=s3[0],setResult=s3[1];
  var s4=useState("");var err=s4[0],setErr=s4[1];
  var s5=useState("jud");var tipo=s5[0],setTipo=s5[1];
  var analisar=function(){
    if(!descricao.trim())return;
    setLoad(true);setErr("");setResult(null);
    var prompt="Assistente juridico da COJUR/CFM. Extraia dados do processo descrito. Retorne APENAS JSON com: num, numeroSEI, assunto, tribunal, tipoAcao, tipoPeca, parteContraria, prazoFinal (YYYY-MM-DD), status, impacto (1-5), complexidade (1-5), proxProv, obs. Use null para campos desconhecidos.\n\nDescricao: "+descricao;
    fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:prompt}]})})
    .then(function(r){return r.json();}).then(function(d){var txt=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("").replace(/```json|```/g,"").trim();try{setResult(JSON.parse(txt));setLoad(false);}catch(e){setErr("Nao foi possivel extrair. Descreva com mais detalhes.");setLoad(false);}}).catch(function(){setErr("Erro de conexao.");setLoad(false);});
  };
  var salvar=function(){if(!result)return;var clean={};Object.keys(result).forEach(function(k){if(result[k]!==null&&result[k]!=="null")clean[k]=result[k];});if(tipo==="jud"){dp({type:"ADD_J",proc:clean});}else{dp({type:"ADD_A",proc:clean});}onClose();};
  var campos=[["N Processo","num"],["N SEI","numeroSEI"],["Assunto","assunto"],["Tribunal","tribunal"],["Tipo Acao","tipoAcao"],["Tipo Peca","tipoPeca"],["Parte Contraria","parteContraria"],["Prazo Final","prazoFinal"],["Status","status"],["Proxima Providencia","proxProv"]];
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.87)",backdropFilter:"blur(14px)",zIndex:1600,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"24px 16px",overflowY:"auto"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.3)",borderRadius:22,width:"100%",maxWidth:700,padding:26,position:"relative",boxShadow:"0 32px 80px rgba(0,0,0,.9)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <span style={{fontSize:24}}>IA</span>
          <div><h3 style={{margin:0,fontSize:15,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif"}}>Novo Processo via IA</h3><div style={{fontSize:11,color:K.dim,marginTop:2}}>Descreva em linguagem natural — a IA preenche os campos</div></div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          {[["jud","Judicial"],["adm","Administrativo"]].map(function(it){return <button key={it[0]} onClick={function(){setTipo(it[0]);setResult(null);}} style={{flex:1,padding:"8px",borderRadius:11,border:tipo===it[0]?"1px solid rgba(0,229,255,.5)":"1px solid rgba(0,229,255,.12)",background:tipo===it[0]?"rgba(0,229,255,.1)":"transparent",color:tipo===it[0]?"#00e5ff":K.dim,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{it[1]}</button>;})}
        </div>
        <textarea value={descricao} onChange={function(e){setDesc(e.target.value);}} placeholder="Descreva o processo. Ex: Processo SEI 26.0.001234-5, mandado de seguranca no TRF-1 contra Resolucao CFFa 770/2025, prazo 10 dias a partir de 15/04/2026, parte contraria CFFa" style={{...inpSt,minHeight:100,resize:"vertical",marginBottom:12,lineHeight:1.6,fontSize:12}}/>
        {err&&<div style={{padding:"10px",borderRadius:10,background:"rgba(255,46,91,.1)",border:"1px solid rgba(255,46,91,.3)",color:"#ff2e5b",fontSize:12,marginBottom:10}}>{err}</div>}
        {!loading&&!result&&<button onClick={analisar} style={{...btnPrim,width:"100%",justifyContent:"center",padding:"12px",fontSize:13}}>Extrair campos com IA</button>}
        {loading&&<div style={{padding:"18px 0"}}><TerminalAI lines={["Interpretando descrição livre…","Identificando tipo, partes e órgão competente…","Sugerindo classificação e tese-mãe…","Pré-cadastrando o processo."]}/></div>}
        {result&&!loading&&<div>
          <div style={{fontSize:10,color:"#00e5ff",fontWeight:700,marginBottom:10,fontFamily:"Orbitron,sans-serif",textTransform:"uppercase",letterSpacing:".5px"}}>Campos extraidos — revise antes de salvar</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
            {campos.map(function(item){var val=result[item[1]];if(!val||val==="null")return null;return <div key={item[1]} style={{padding:"9px 11px",borderRadius:10,background:"rgba(255,255,255,.025)",border:"1px solid rgba(0,229,255,.1)"}}><div style={{fontSize:9,color:K.dim,fontWeight:700,textTransform:"uppercase",letterSpacing:".5px",marginBottom:3}}>{item[0]}</div><div style={{fontSize:12,color:K.txt,fontWeight:600,wordBreak:"break-all"}}>{String(val)}</div></div>;})}
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={salvar} style={{flex:1,...btnPrim,justifyContent:"center",padding:"11px",fontSize:13,fontWeight:800}}>Cadastrar processo</button>
            <button onClick={function(){setResult(null);}} style={{...btnGhost,padding:"11px 16px",fontSize:12}}>Corrigir</button>
          </div>
        </div>}
      </div>
    </div>
  );
}


function RelatorioSemanalModal(rsP){
  var st=rsP.st,onClose=rsP.onClose;
  var s1=useState(false);var loading=s1[0],setLoad=s1[1];
  var s2=useState("");var result=s2[0],setResult=s2[1];
  var s3=useState(false);var copied=s3[0],setCopied=s3[1];
  var gerar=function(){
    setLoad(true);setResult("");
    var hoje=new Date();
    var semana="Semana de "+hoje.toLocaleDateString("pt-BR",{day:"numeric",month:"long",year:"numeric"});
    var criticos=[...st.adm,...st.jud].filter(function(p){return p.diasRestantes>=0&&p.diasRestantes<=5;});
    var em_exec=[...st.adm,...st.jud].filter(function(p){return p.status==="Em Execução";});
    var realizados_semana=(st.realizados||[]).slice(0,5);
    var dados="Periodo: "+semana+"\nProcessos criticos (<=5du): "+criticos.length+"\nEm execucao: "+em_exec.length+"\nRealizados recentes: "+realizados_semana.length+"\nTotal no acervo: "+([...st.adm,...st.jud].length)+"\n\nProcessos criticos:\n"+criticos.slice(0,5).map(function(p,i){return (i+1)+". "+p.assunto+" | "+p.tipoPeca+" | "+p.diasRestantes+"du";}).join("\n")+"\n\nEm execucao:\n"+em_exec.slice(0,3).map(function(p,i){return (i+1)+". "+p.assunto+" ("+Math.min(100,Number(p.progresso)||0)+"%)";}).join("\n");
    var prompt="Voce e advogado senior da COJUR/CFM. Gere um resumo semanal de producao conciso e profissional. Sem travesSao.\n\nDados:\n"+dados+"\n\nFormato: (1) Status geral da semana; (2) Prioridades para proxima semana; (3) Alertas criticos; (4) Recomendacao de foco. Seja direto, maximo 200 palavras.";
    fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:prompt}]})})
    .then(function(r){return r.json();}).then(function(d){var t=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("").trim();setResult(t||"Sem resultado.");setLoad(false);}).catch(function(){setResult("Erro.");setLoad(false);});
  };
  var copy=function(){try{navigator.clipboard.writeText(result).then(function(){setCopied(true);setTimeout(function(){setCopied(false);},2500);});}catch(e){}};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.83)",backdropFilter:"blur(10px)",zIndex:1400,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"32px 16px",overflowY:"auto"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.2)",borderRadius:22,width:"100%",maxWidth:620,padding:24,position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}><span style={{fontSize:22}}>📋</span><div><h3 style={{margin:0,fontSize:14,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif"}}>Resumo Semanal</h3><div style={{fontSize:11,color:K.dim}}>Gerado por IA com dados reais do acervo</div></div></div>
        {!result&&!loading&&<button onClick={gerar} style={{...btnPrim,width:"100%",justifyContent:"center",padding:"11px"}}>Gerar Resumo da Semana</button>}
        {loading&&<div style={{textAlign:"center",padding:"20px 0",color:"#00e5ff"}}><div className="cj-pulse" style={{fontSize:28,marginBottom:8}}>...</div><div style={{fontSize:12,fontFamily:"Orbitron,sans-serif"}}>Gerando resumo...</div></div>}
        {result&&<div><div style={{padding:"14px",borderRadius:12,background:"rgba(0,229,255,.04)",border:"1px solid rgba(0,229,255,.1)",fontSize:12,color:K.txt,lineHeight:1.8,whiteSpace:"pre-wrap",marginBottom:12}}>{result}</div><div style={{display:"flex",gap:8}}><button onClick={copy} style={{flex:1,...btnPrim,justifyContent:"center",padding:"9px",color:copied?"#00ff88":"#00e5ff"}}>{copied?"Copiado!":"Copiar Resumo"}</button><button onClick={gerar} style={{...btnGhost,padding:"9px 12px",fontSize:12}}>Regenerar</button></div></div>}
      </div>
    </div>
  );
}


function StatsModal(stP){
  var st=stP.st,onClose=stP.onClose;
  var all=[...st.adm,...st.jud];
  var real=st.realizados||[];
  var porTipo={};
  real.forEach(function(p){var t=p.tipoPeca||"Outro";porTipo[t]=(porTipo[t]||0)+1;});
  var topTipos=Object.entries(porTipo).sort(function(a,b){return b[1]-a[1];}).slice(0,8);
  var porStatus={};
  all.forEach(function(p){var s=p.status||"Ativo";porStatus[s]=(porStatus[s]||0)+1;});
  var criticos=all.filter(function(p){return p.diasRestantes>=0&&p.diasRestantes<=5;}).length;
  var semMov=all.filter(function(p){return (p.semMov||0)>=7;}).length;
  var hPendentes=all.reduce(function(acc,p){var est={"Parecer Jurídico":2.5,"Agravo Interno":2,"Contraminuta":2,"Manifestação":1.5,"Embargos de Declaração":0.75,"Ofício":0.5};return acc+(est[p.tipoPeca]||1.5);},0);
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:1500,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"28px 16px",overflowY:"auto"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(168,85,247,.25)",borderRadius:22,width:"100%",maxWidth:720,padding:26,position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><span style={{fontSize:22}}>📊</span><div><h3 style={{margin:0,fontSize:15,fontWeight:800,color:"#b84dff",fontFamily:"Orbitron,sans-serif"}}>Estatísticas Pessoais</h3><div style={{fontSize:11,color:K.dim}}>Dados reais do seu acervo COJUR</div></div></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
          {[["Total acervo",all.length,"#00e5ff"],["Realizados",real.length,"#00ff88"],["Críticos (≤5du)",criticos,"#ff2e5b"],["Sem mov. (≥7d)",semMov,"#ffb800"]].map(function(item){return(
            <div key={item[0]} style={{padding:"14px 12px",borderRadius:14,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.08)",textAlign:"center"}}>
              <div style={{fontSize:9,color:K.dim,marginBottom:6,textTransform:"uppercase",letterSpacing:".5px",fontWeight:700}}>{item[0]}</div>
              <div style={{fontSize:28,fontWeight:800,color:item[2],fontFamily:"Orbitron,monospace"}}>{item[1]}</div>
            </div>
          );})}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:K.txt,marginBottom:10,textTransform:"uppercase",letterSpacing:".5px"}}>Peças por Tipo (Realizadas)</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {topTipos.length?topTipos.map(function(item){var pct=Math.round(item[1]/real.length*100)||0;return(
                <div key={item[0]} style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{fontSize:11,color:K.txt,flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item[0]}</div>
                  <div style={{width:80,height:6,borderRadius:999,background:"rgba(255,255,255,.06)",overflow:"hidden",flexShrink:0}}>
                    <div style={{height:"100%",width:pct+"%",background:getPecaCor(item[0]),borderRadius:999}}/>
                  </div>
                  <div style={{fontSize:10,color:K.dim,width:20,textAlign:"right",flexShrink:0}}>{item[1]}</div>
                </div>
              );}):(<div style={{fontSize:12,color:K.dim}}>Nenhuma peça realizada ainda</div>)}
            </div>
          </div>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:K.txt,marginBottom:10,textTransform:"uppercase",letterSpacing:".5px"}}>Por Status (Acervo)</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {Object.entries(porStatus).map(function(item){return(
                <div key={item[0]} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",borderRadius:8,background:"rgba(255,255,255,.025)"}}>
                  <span style={{fontSize:11,color:K.txt}}>{item[0]}</span>
                  <span style={{fontSize:12,fontWeight:700,color:"#00e5ff",fontFamily:"Orbitron,monospace"}}>{item[1]}</span>
                </div>
              );})}
            </div>
            <div style={{marginTop:12,padding:"10px 12px",borderRadius:10,background:"rgba(0,229,255,.05)",border:"1px solid rgba(0,229,255,.12)"}}>
              <div style={{fontSize:9,color:K.dim,fontWeight:700,textTransform:"uppercase",marginBottom:4}}>Carga estimada pendente</div>
              <div style={{fontSize:20,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,monospace"}}>{hPendentes.toFixed(1)}h</div>
              <div style={{fontSize:9,color:K.dim}}>baseado nos tipos de peça · 4h/dia disponíveis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ FORM MODAL ═══ */
const FM=({title,fields,initial,onSave,onClose,onDelete,suggestions})=>{
  const[form,setForm]=useState(()=>({...(initial||{})}));
  const[confirmDel,setCD]=useState(false);
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const sugestoesFor=suggestions||{};

  return(
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.7)",backdropFilter:"blur(8px)",zIndex:1100,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"40px 20px",overflowY:"auto"}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="cj-sc" style={{background:K.modal,border:`1px solid ${K.brd}`,borderRadius:20,width:"100%",maxWidth:620,padding:32,position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:16,right:16,background:"none",border:"none",color:K.dim,cursor:"pointer",padding:8}}><X size={20}/></button>
        <h2 style={{margin:"0 0 24px",fontSize:20,fontWeight:700,color:K.txt}}>{title}</h2>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {fields.map(f=>{
            const span=f.full?{gridColumn:"1 / -1"}:{};
            return(
              <div key={f.key} style={span}>
                <label style={lblSt}>{f.label}</label>
                {f.type==="select"?(
                  <select style={{...inpSt}} value={form[f.key]||f.options?.[0]||""} onChange={e=>set(f.key,e.target.value)}>
                    {(f.options||[]).map(o=><option key={o} value={o} style={{background:K.modal}}>{o}</option>)}
                  </select>
                ):f.type==="textarea"?(
                  <textarea style={{...inpSt,resize:"vertical",minHeight:60}} rows={3} value={form[f.key]||""} onChange={e=>set(f.key,e.target.value)}></textarea>
                ):f.type==="checkbox"?(
                  <label style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",cursor:"pointer"}}>
                    <input type="checkbox" checked={!!form[f.key]} onChange={e=>set(f.key,e.target.checked)} style={{width:16,height:16,accentColor:K.ac}}/>
                    <span style={{fontSize:13,color:K.txt}}>{f.checkLabel||"Sim"}</span>
                  </label>
                ):f.type==="number"?(
                  <input style={inpSt} type="number" min={1} max={5} value={form[f.key]??3} onChange={e=>set(f.key,parseInt(e.target.value)||3)}/>
                ):f.type==="datetime-local"?(
                  <input style={inpSt} type="datetime-local" value={
                    form[f.key] instanceof Date
                      ? form[f.key].toISOString().slice(0,16)
                      : (form[f.key] && typeof form[f.key]==="string" && form[f.key].length>=10
                          ? (form[f.key].length===10 ? form[f.key]+"T12:00" : form[f.key].slice(0,16))
                          : "")
                  } onChange={e=>{
                    var val=e.target.value?new Date(e.target.value):null;
                    set(f.key, val && !isNaN(val) ? val : e.target.value);
                  }}/>
                ):f.type==="date"?(
                  <div>
                  <input style={inpSt} type="date" value={form[f.key] instanceof Date ? toISO(form[f.key]) : (form[f.key]||"")} onChange={e=>{
                    var val=e.target.value?new Date(e.target.value+"T12:00:00"):null;
                    set(f.key,val);
                    // Auto-calc prazoFinal when pubDJe changes
                    if(f.key==="pubDJe"&&val){
                      var np=calcPrazoDJe(val,form.intersticio||15);
                      if(np){set("prazoFinal",np);showToast&&showToast("Prazo calculado automaticamente do DJe","success");}
                    }
                  }}/>
                  {f.key==="pubDJe"&&form.pubDJe&&(function(){
                    var np=calcPrazoDJe(form.pubDJe instanceof Date?form.pubDJe:new Date(form.pubDJe+"T12:00:00"),form.intersticio||15);
                    if(!np) return null;
                    var npStr=(np instanceof Date?np:new Date(np+"T12:00:00")).toLocaleDateString("pt-BR");
                    return React.createElement("div",{style:{marginTop:4,padding:"4px 10px",borderRadius:8,background:"rgba(0,229,255,.08)",border:"1px solid rgba(0,229,255,.2)",fontSize:11,color:"#00e5ff",display:"flex",gap:6,alignItems:"center"}},
                      "📅 Prazo calculado: ",React.createElement("strong",null,npStr)," (",((form.intersticio||15)+"du"),")"
                    );
                  })()}
                  </div>
                ):(sugestoesFor[f.key]&&sugestoesFor[f.key].length>0)?(
                  <Autocomplete value={form[f.key]||""} onChange={v=>set(f.key,v)} suggestions={sugestoesFor[f.key]} placeholder={f.ph||""} style={inpSt}/>
                ):(
                  <input style={inpSt} type="text" value={form[f.key]||""} onChange={e=>set(f.key,e.target.value)} placeholder={f.ph||""}/>
                )}
              </div>
            );
          })}
        </div>

        <div style={{display:"flex",justifyContent:"space-between",marginTop:24,gap:12}}>
          <div>
            {onDelete && !confirmDel && <button style={btnDanger} onClick={()=>setCD(true)}><Trash2 size={14}/>Excluir</button>}
            {onDelete && confirmDel && (
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:12,color:K.cr}}>Confirmar exclusão?</span>
                <button style={{...btnDanger,padding:"6px 12px",fontSize:12}} onClick={onDelete}>Sim</button>
                <button style={{...btnGhost,padding:"6px 12px",fontSize:12}} onClick={()=>setCD(false)}>Não</button>
              </div>
            )}
          </div>
          <div style={{display:"flex",gap:10}}>
            <button style={btnGhost} onClick={onClose}>Cancelar</button>
            <button style={btnPrim} onClick={()=>{
              /* ═══ VALIDAÇÃO DE FORMULÁRIO ═══ */
              var erros=[];
              if(!form.assunto||!form.assunto.trim()) erros.push("Assunto é obrigatório");
              if(!form.prazoFinal) erros.push("Prazo Final é obrigatório");
              if(form.impacto&&(form.impacto<1||form.impacto>5)) erros.push("Impacto deve ser entre 1 e 5");
              if(form.complexidade&&(form.complexidade<1||form.complexidade>5)) erros.push("Complexidade deve ser entre 1 e 5");
              if(form.progresso!==undefined&&(form.progresso<0||form.progresso>100)) erros.push("Progresso deve ser entre 0 e 100");
              if(erros.length>0){
                alert("⚠️ Corrija os seguintes campos:\n\n• "+erros.join("\n• "));
                return;
              }
              onSave(form);
            }}><Save size={14}/>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* FORM FIELD DEFINITIONS */
const F_ADM=[
  {key:"num",label:"Nº Principal",ph:"00.0.000000000-0"},{key:"numeroSEI",label:"Nº SEI",ph:"26.0.000000000-0"},{key:"assunto",label:"Assunto Central",full:true},
  {key:"interessado",label:"Interessado"},{key:"orgao",label:"Órgão / Unidade"},{key:"responsavel",label:"Responsável"},{key:"linkRef",label:"Link de Referência",full:true},{key:"linkSEI",label:"Link Processo SEI",ph:"https://sei.cfm.org.br/sei/...",full:true},
  {key:"tipoPeca",label:"Tipo de Peça",type:"select",options:TIPOS_PECA},{key:"prazoFinal",label:"Prazo Final",type:"date"},
  {key:"status",label:"Status",type:"select",options:STS},{key:"fase",label:"Fase",type:"select",options:PHS},
  {key:"impacto",label:"Impacto (1-5)",type:"number"},{key:"complexidade",label:"Complexidade (1-5)",type:"number"},
  {key:"proxProv",label:"Próxima Providência",full:true},{key:"dataProv",label:"Data da Providência",type:"date"},
  {key:"estTempo",label:"Estimativa de Tempo",ph:"Ex: 4h"},{key:"depTerc",label:"Depende de Terceiros",type:"checkbox"},
  {key:"reuniao",label:"Reunião Vinculada",type:"checkbox"},{key:"sustentacao",label:"Sustentação Vinculada",type:"checkbox"},
  {key:"obs",label:"Observações",type:"textarea",full:true},
];
const F_JUD=[
  {key:"num",label:"Nº Judicial",ph:"0000000-00.0000.0.00.0000"},{key:"numeroSEI",label:"Nº SEI",ph:"26.0.000000000-0"},{key:"assunto",label:"Assunto Central",full:true},
  {key:"tribunal",label:"Tribunal",type:"select",options:TRIBS},{key:"orgao",label:"Órgão / Gabinete"},{key:"responsavel",label:"Responsável"},{key:"linkRef",label:"Link de Referência",full:true},{key:"linkSEI",label:"Link Processo SEI",ph:"https://sei.cfm.org.br/sei/...",full:true},
  {key:"tipoAcao",label:"Tipo de Ação",type:"select",options:TACOES},{key:"tipoPeca",label:"Tipo de Peça",type:"select",options:TIPOS_PECA},
  {key:"parteContraria",label:"Parte Contrária"},{key:"prazoFinal",label:"Prazo Final",type:"date"},
  {key:"dataSustentacao",label:"Data/Hora da Sustentação Oral",type:"datetime-local",ph:""},
  {key:"tempoFala",label:"Tempo de fala (min)",type:"number",ph:"15"},
  {key:"pubDJe",label:"Data Publicação DJe",type:"date",ph:"Data da publicação no DJe"},{key:"intersticio",label:"Prazo em dias úteis",type:"number",ph:"Auto por tipo de peça"},
  {key:"status",label:"Status",type:"select",options:STS},{key:"fase",label:"Fase",type:"select",options:PHS},
  {key:"impacto",label:"Impacto (1-5)",type:"number"},{key:"complexidade",label:"Complexidade (1-5)",type:"number"},
  {key:"proxProv",label:"Próxima Providência",full:true},{key:"dataProv",label:"Data da Providência",type:"date"},
  {key:"estTempo",label:"Estimativa de Tempo",ph:"Ex: 6h"},{key:"depTerc",label:"Depende de Terceiros",type:"checkbox"},
  {key:"reuniao",label:"Reunião Vinculada",type:"checkbox",checkLabel:"Criar automaticamente evento na agenda de reuniões"},
  {key:"sustentacao",label:"Sustentação Vinculada",type:"checkbox",checkLabel:"Criar automaticamente evento na agenda de sustentação oral"},
  {key:"destaque",label:"Destaque / Observação Importante",type:"textarea",full:true},
  {key:"obs",label:"Observações Gerais",type:"textarea",full:true},
  {key:"progresso",label:"Progresso da elaboração (0-100%)",type:"number",ph:"0"},
  {key:"motivoAcompanhamento",label:"Motivo do Acompanhamento",type:"textarea",full:true,ph:"Motivo pelo qual este processo está em acompanhamento..."},
];
const F_REUN=[{key:"titulo",label:"Título",full:true},{key:"data",label:"Data",type:"date"},{key:"hora",label:"Horário",ph:"14:00"},{key:"local",label:"Local"},{key:"obs",label:"Observações",type:"textarea",full:true}];
const F_SUST=[{key:"tema",label:"Tema",full:true},{key:"data",label:"Data",type:"date"},{key:"hora",label:"Horário",ph:"09:30"},{key:"tribunal",label:"Tribunal",type:"select",options:TRIBS},{key:"obs",label:"Observações",type:"textarea",full:true}];
const F_VIAG=[{key:"destino",label:"Destino"},{key:"motivo",label:"Motivo",full:true},{key:"dataIda",label:"Ida",type:"date"},{key:"dataVolta",label:"Volta",type:"date"},{key:"obs",label:"Observações",type:"textarea",full:true}];

const extLabel=p=>p.tipo==="jud"?"Parte Contrária":"Interessado";
const extValue=p=>p.tipo==="jud"?(p.parteContraria||"—"):(p.interessado||"—");
const openRef=url=>{if(!url)return;try{window.open(url,"_blank","noopener,noreferrer")}catch(e){}};

/* PROCESS CARD */
/* ProcessCard — memoizado para evitar re-renders desnecessários */

/* ═══════════════════════════════════════════════════════════════
   COJUR PREMIUM SUITE — 6 visual improvements
   1. MeshBg · 2. useTilt · 3. HoverPreview · 4. QuickActions
   5. AnimatedCounter + Confetti · 6. RelacoesPg (force graph)
   ═══════════════════════════════════════════════════════════════ */

/* ── 1. MeshBg: animated colorful blobs in background ── */
const MeshBg = React.memo(() => {
  return (
    <div aria-hidden="true" style={{
      position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
      overflow:"hidden", filter:"blur(80px)", opacity:.55,
    }}>
      <div className="cj-blob cj-blob-a" style={{
        position:"absolute", left:"-10%", top:"10%",
        width:"45vw", height:"45vw", borderRadius:"50%",
        background:"radial-gradient(circle, rgba(0,212,255,.55), rgba(0,212,255,0) 70%)",
      }}/>
      <div className="cj-blob cj-blob-b" style={{
        position:"absolute", right:"-10%", top:"30%",
        width:"50vw", height:"50vw", borderRadius:"50%",
        background:"radial-gradient(circle, rgba(184,77,255,.45), rgba(184,77,255,0) 70%)",
      }}/>
      <div className="cj-blob cj-blob-c" style={{
        position:"absolute", left:"30%", bottom:"-20%",
        width:"55vw", height:"55vw", borderRadius:"50%",
        background:"radial-gradient(circle, rgba(255,102,128,.35), rgba(255,102,128,0) 70%)",
      }}/>
      <div className="cj-blob cj-blob-d" style={{
        position:"absolute", right:"15%", bottom:"5%",
        width:"38vw", height:"38vw", borderRadius:"50%",
        background:"radial-gradient(circle, rgba(95,178,96,.30), rgba(95,178,96,0) 70%)",
      }}/>
    </div>
  );
});

/* ── 2. useTilt: 3D mouse-tracked tilt for any element ── */
const useTilt = (intensity = 8) => {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -intensity;
    const ry = (px - 0.5) *  intensity;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };
  const onMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };
  return { ref, onMouseMove, onMouseLeave };
};

/* ── 3. HoverPreview: compact tech panel — quick glance only ── */
const HoverPreview = ({ proc, anchor }) => {
  if (!proc || !anchor) return null;
  const accent = uC(proc.diasRestantes);
  const dr = proc.diasRestantes;
  const urgLabel = dr <= 0 ? "VENCE HOJE"
    : dr <= 2 ? "CRÍTICO"
    : dr <= 7 ? "URGENTE"
    : dr <= 15 ? "ATENÇÃO" : "NORMAL";

  /* ═══ STRICT POSITIONING — panel never overflows viewport ═══ */
  const r = anchor.getBoundingClientRect();
  const PANEL_W = 280;
  const PANEL_H_EST = 280;
  const SAFE = 24;  /* generous margin from viewport edge */
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  /* preferred: right of card */
  let leftPos = r.right + 12;
  /* if won't fit on right with safe margin, place on left */
  if (leftPos + PANEL_W + SAFE > vw) {
    leftPos = r.left - PANEL_W - 12;
  }
  /* hard clamp regardless of choice (defensive) */
  leftPos = Math.max(SAFE, Math.min(vw - PANEL_W - SAFE, leftPos));
  /* vertical: align with card top, clamp to viewport */
  let topPos = Math.max(SAFE, Math.min(vh - PANEL_H_EST - SAFE, r.top));

  /* ═══ COMPUTED VALUES ═══ */
  let prazoPct = 0;
  let prazoFmt = "—";
  try {
    if (proc.prazoFinal) {
      const d = proc.prazoFinal instanceof Date ? proc.prazoFinal : new Date(proc.prazoFinal+"T12:00:00");
      if (!isNaN(d.getTime())) prazoFmt = d.toLocaleDateString("pt-BR");
      const total = 30;
      const consumed = Math.max(0, total - Math.max(0, dr));
      prazoPct = Math.min(100, Math.max(0, (consumed / total) * 100));
      if (dr < 0) prazoPct = 100;
    }
  } catch(e) {}

  const scoreVal = Math.round(proc.score || proc.iaS || 0);
  const histCount = (proc.hist || []).length;
  const subject = (proc.assunto || "Sem assunto").slice(0, 90);
  const subjectCut = (proc.assunto || "").length > 90;
  const proxProv = proc.proxProv ? proc.proxProv.slice(0, 70) : null;
  const proxProvCut = proc.proxProv && proc.proxProv.length > 70;

  const style = {
    position: "fixed",
    top: topPos,
    left: leftPos,
    width: PANEL_W,
    padding: 0,
    borderRadius: 12,
    background: "linear-gradient(180deg, rgba(8,12,24,.97), rgba(4,7,16,.99))",
    border: `1px solid ${accent}66`,
    boxShadow: `0 12px 36px rgba(0,0,0,.78), 0 0 22px ${accent}33, inset 0 1px 0 rgba(255,255,255,.04)`,
    backdropFilter: "blur(14px)",
    pointerEvents: "none",
    zIndex: 9999,
    fontFamily: "inherit",
    overflow: "hidden",
    animation: "cjPreviewIn .18s ease-out",
  };

  return (
    <div style={style}>
      {/* ═══ TECH HUD CORNER BRACKETS (4 corners) ═══ */}
      <div aria-hidden="true" style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0}}>
        {/* TL */}<div style={{position:"absolute",top:6,left:6,width:10,height:10,borderTop:`1px solid ${accent}`,borderLeft:`1px solid ${accent}`,opacity:.6}}/>
        {/* TR */}<div style={{position:"absolute",top:6,right:6,width:10,height:10,borderTop:`1px solid ${accent}`,borderRight:`1px solid ${accent}`,opacity:.6}}/>
        {/* BL */}<div style={{position:"absolute",bottom:6,left:6,width:10,height:10,borderBottom:`1px solid ${accent}`,borderLeft:`1px solid ${accent}`,opacity:.6}}/>
        {/* BR */}<div style={{position:"absolute",bottom:6,right:6,width:10,height:10,borderBottom:`1px solid ${accent}`,borderRight:`1px solid ${accent}`,opacity:.6}}/>
      </div>

      {/* ═══ ACCENT TOP BAR with scan animation ═══ */}
      <div style={{height:2,background:`linear-gradient(90deg, transparent, ${accent}, transparent)`,position:"relative",zIndex:1}}/>

      {/* ═══ HERO: countdown ring + urgency ═══ */}
      <div style={{padding:"14px 14px 10px",display:"flex",alignItems:"center",gap:12,position:"relative",zIndex:1}}>
        {/* big countdown ring */}
        <div style={{
          width:54, height:54, borderRadius:"50%",
          background:`conic-gradient(${accent} ${prazoPct}%, rgba(127,174,204,.10) 0%)`,
          padding:2, flexShrink:0,
          boxShadow:`0 0 14px ${accent}44`,
        }}>
          <div style={{
            width:"100%",height:"100%",borderRadius:"50%",
            background:"linear-gradient(135deg, #050a18, #0a0e22)",
            display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",
            border:`1px solid ${accent}33`,
          }}>
            <span style={{
              fontSize: dr<0 ? 18 : (Math.abs(dr) >= 100 ? 14 : 17),
              fontWeight:900,color:accent,
              fontFamily:"Orbitron,sans-serif",lineHeight:1,
              textShadow:`0 0 8px ${accent}88`,
            }}>{dr<0?"!":dr}</span>
            <span style={{fontSize:7,color:accent,opacity:.75,fontFamily:"'JetBrains Mono',monospace",marginTop:2,letterSpacing:".05em"}}>{dr<0?"ATRASO":"DIAS ÚT."}</span>
          </div>
        </div>
        <div style={{flex:1,minWidth:0}}>
          {/* urgency label as tech badge */}
          <div style={{
            display:"inline-block",
            padding:"3px 9px",borderRadius:4,
            background:accent+"22",
            border:`1px solid ${accent}77`,
            color:accent,
            fontSize:9,fontWeight:900,
            letterSpacing:".12em",
            fontFamily:"Orbitron,sans-serif",
            textShadow:`0 0 6px ${accent}55`,
            marginBottom:6,
            boxShadow:`inset 0 0 8px ${accent}22`,
          }}>{urgLabel}</div>
          {/* number */}
          <div style={{
            fontSize:11,color:"#7dd3fc",
            fontFamily:"'JetBrains Mono',monospace",fontWeight:700,
            whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",
            letterSpacing:".02em",
            textShadow:"0 0 8px rgba(125,211,252,.35)",
          }}>{proc.num||"sem nº"}</div>
          {/* type */}
          <div style={{
            fontSize:8,color:"rgba(190,215,235,.55)",marginTop:2,
            letterSpacing:".08em",fontFamily:"'JetBrains Mono',monospace",
          }}>
            {proc.tipo==="jud" ? "▶ JUDICIAL" : "▶ ADMINISTRATIVO"}
            {proc.tipoPeca ? ` · ${proc.tipoPeca}` : ""}
          </div>
        </div>
      </div>

      {/* ═══ separator ═══ */}
      <div style={{height:1,background:`linear-gradient(90deg, transparent, ${accent}33 30%, ${accent}33 70%, transparent)`,margin:"0 12px"}}/>

      {/* ═══ SUBJECT — most important text ═══ */}
      <div style={{
        padding:"10px 14px",
        fontSize:12,fontWeight:600,color:"#e2e8f0",
        lineHeight:1.45,
        position:"relative",zIndex:1,
      }}>
        {subject}{subjectCut?"…":""}
      </div>

      {/* ═══ NEXT ACTION — visible only if exists ═══ */}
      {proxProv && (
        <div style={{padding:"0 12px 10px",position:"relative",zIndex:1}}>
          <div style={{
            padding:"8px 10px",
            background:`linear-gradient(135deg, ${accent}10, transparent)`,
            border:`1px solid ${accent}28`,
            borderLeft:`2px solid ${accent}`,
            borderRadius:6,
          }}>
            <div style={{
              fontSize:8,color:accent,
              letterSpacing:".12em",fontWeight:800,
              fontFamily:"Orbitron,sans-serif",
              marginBottom:3,opacity:.9,
              textShadow:`0 0 4px ${accent}55`,
            }}>▶ AÇÃO</div>
            <div style={{
              fontSize:11,color:"#dde6f3",
              lineHeight:1.4,fontWeight:600,
            }}>{proxProv}{proxProvCut?"…":""}</div>
          </div>
        </div>
      )}

      {/* ═══ TECH FOOTER: data line + meta chips ═══ */}
      <div style={{
        padding:"8px 12px 9px",
        background:"rgba(0,0,0,.28)",
        borderTop:"1px solid rgba(127,174,204,.08)",
        position:"relative",zIndex:1,
      }}>
        {/* prazo timeline */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <span style={{fontSize:8,color:"rgba(190,215,235,.40)",letterSpacing:".10em",fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>PRAZO</span>
          <span style={{fontSize:9,color:accent,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",textShadow:`0 0 4px ${accent}33`}}>
            {prazoFmt}
          </span>
        </div>
        <div style={{height:3,borderRadius:2,background:"rgba(127,174,204,.08)",overflow:"hidden",position:"relative",marginBottom:8}}>
          <div style={{
            height:"100%",
            width: `${prazoPct}%`,
            background: `linear-gradient(90deg, ${accent}66, ${accent})`,
            borderRadius:2,
            boxShadow: `0 0 6px ${accent}aa`,
            transition:"width .3s ease",
          }}/>
        </div>
        {/* meta chips row — compact */}
        <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
          {(proc.tribunal || proc.orgao) && (
            <span style={{
              padding:"2px 7px",borderRadius:3,
              background:"rgba(127,184,224,.10)",
              border:"1px solid rgba(127,184,224,.18)",
              color:"#bbd5ec",fontSize:9,fontWeight:700,
              fontFamily:"'JetBrains Mono',monospace",
            }}>{(proc.tribunal||proc.orgao||"").slice(0,12)}</span>
          )}
          {scoreVal > 0 && (
            <span style={{
              padding:"2px 7px",borderRadius:3,
              background: scoreVal >= 75 ? "rgba(255,102,128,.12)" : scoreVal >= 50 ? "rgba(255,184,0,.12)" : "rgba(95,178,96,.12)",
              border:`1px solid ${scoreVal >= 75 ? "rgba(255,102,128,.28)" : scoreVal >= 50 ? "rgba(255,184,0,.28)" : "rgba(95,178,96,.28)"}`,
              color: scoreVal >= 75 ? "#ff6680" : scoreVal >= 50 ? "#ffb800" : "#5fb260",
              fontSize:9,fontWeight:800,
              fontFamily:"'JetBrains Mono',monospace",
            }}>◈ {scoreVal}</span>
          )}
          {histCount > 0 && (
            <span style={{
              padding:"2px 7px",borderRadius:3,
              background:"rgba(0,229,255,.10)",
              border:"1px solid rgba(0,229,255,.20)",
              color:"#00e5ff",fontSize:9,fontWeight:700,
              fontFamily:"'JetBrains Mono',monospace",
            }}>◇ {histCount}</span>
          )}
          {proc.depTerc && (
            <span style={{
              padding:"2px 7px",borderRadius:3,
              background:"rgba(255,184,0,.12)",
              border:"1px solid rgba(255,184,0,.28)",
              color:"#ffb800",fontSize:9,fontWeight:700,
              fontFamily:"'JetBrains Mono',monospace",
            }}>3os</span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── 4. QuickActionsToolbar: slide-in mini bar on card hover ── */
const QuickActionsToolbar = ({ proc, dp, onEdit, visible, accent }) => {
  if (!proc) return null;
  const items = [
    { icon: "✓", label: "Concluir", color: "#5fb260", onClick: e => { e.stopPropagation(); dp({type:"COMPLETE_P",id:proc.id}); }},
    { icon: "✎", label: "Editar",   color: "#7faecc", onClick: e => { e.stopPropagation(); onEdit && onEdit(proc); }},
    { icon: "⧉", label: "Duplicar", color: "#22d3ee", onClick: e => { e.stopPropagation(); dp({type:"DUP_P",id:proc.id}); }},
  ];
  return (
    <div style={{
      position:"absolute",
      top:"50%", right:8,
      transform: visible ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(20px)",
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "auto" : "none",
      display:"flex", flexDirection:"column", gap:5,
      transition:"transform .22s ease, opacity .22s ease",
      zIndex:5,
    }}>
      {items.map((it, i) => (
        <button key={it.label} onClick={it.onClick} title={it.label} style={{
          width:30, height:30, borderRadius:9,
          display:"flex", alignItems:"center", justifyContent:"center",
          background: `${it.color}18`,
          border: `1px solid ${it.color}55`,
          color: it.color,
          cursor: "pointer",
          fontSize:14, fontWeight:900,
          fontFamily:"Orbitron, sans-serif",
          boxShadow: `0 0 8px ${it.color}33`,
          transitionDelay: `${i * 30}ms`,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = `${it.color}30`; e.currentTarget.style.transform = "scale(1.12)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = `${it.color}18`; e.currentTarget.style.transform = "scale(1)"; }}
        >{it.icon}</button>
      ))}
    </div>
  );
};

/* ── 5a. AnimatedCounter: smooth number transitions ── */
const AnimatedCounter = ({ value, duration = 600, style }) => {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef(0);
  useEffect(() => {
    if (value === fromRef.current) return;
    const from = fromRef.current;
    const to = value;
    startRef.current = performance.now();
    let rafId = 0;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const t = (performance.now() - startRef.current) / duration;
      if (t >= 1) {
        setDisplay(to);
        fromRef.current = to;
        return;
      }
      /* ease-out cubic */
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => { cancelled = true; if (rafId) cancelAnimationFrame(rafId); };
  }, [value, duration]);
  return <span style={style}>{display}</span>;
};

/* ── 5b. Confetti: celebration burst on critical complete ── */
let __confettiId = 0;
const __confettiListeners = new Set();
const triggerConfetti = (color) => {
  __confettiId++;
  __confettiListeners.forEach(fn => fn(__confettiId, color));
};
const ConfettiHost = () => {
  const [bursts, setBursts] = useState([]);
  useEffect(() => {
    const timeouts = new Set();
    let mounted = true;
    const fn = (id, color) => {
      if (!mounted) return;
      setBursts(prev => [...prev, { id, color, t: Date.now() }]);
      const to = setTimeout(() => {
        timeouts.delete(to);
        if (mounted) setBursts(prev => prev.filter(b => b.id !== id));
      }, 2400);
      timeouts.add(to);
    };
    __confettiListeners.add(fn);
    return () => {
      mounted = false;
      __confettiListeners.delete(fn);
      timeouts.forEach(t => clearTimeout(t));
      timeouts.clear();
    };
  }, []);
  return (
    <div aria-hidden="true" style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9999,overflow:"hidden"}}>
      {bursts.map(b => <ConfettiBurst key={b.id} color={b.color}/>)}
    </div>
  );
};
const ConfettiBurst = ({ color }) => {
  const pieces = useMemo(() => {
    const cs = ["#00e5ff","#5fb260","#ffb800","#b84dff","#ff6680","#fff"];
    return Array.from({length: 60}, (_, i) => ({
      i,
      left: 30 + Math.random() * 40,    /* % */
      angle: (Math.random() - 0.5) * 1.4,
      vy: 10 + Math.random() * 14,
      delay: Math.random() * 200,
      color: color || cs[Math.floor(Math.random() * cs.length)],
      sz: 5 + Math.random() * 7,
      rot: Math.random() * 360,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }));
  }, []);
  return (
    <>
      {pieces.map(p => (
        <div key={p.i} style={{
          position:"absolute",
          left: p.left + "%",
          top: "30%",
          width: p.sz, height: p.sz,
          background: p.color,
          borderRadius: p.shape === "circle" ? "50%" : "1px",
          opacity: 0.95,
          transform: `rotate(${p.rot}deg)`,
          animation: `cjConfettiFall 1.6s cubic-bezier(.4,.7,.4,1) ${p.delay}ms forwards`,
          ["--cj-x"]: (p.angle * 200) + "px",
        }}/>
      ))}
    </>
  );
};

/* ── 6. RelacoesPg: force-directed graph of process relationships ── */
const RelacoesPg = ({ st, ss, sp }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const mouseRef = useRef({ x: -9999, y: -9999, dragging: null });
  const all = useMemo(() => [...st.adm, ...st.jud], [st.adm, st.jud]);

  /* compute nodes + edges */
  const { nodes, edges } = useMemo(() => {
    const ns = all
      .filter(p => !["Concluído","Arquivado"].includes(p.status))
      .slice(0, 80)
      .map((p, i) => ({
        id: p.id, proc: p,
        x: 0, y: 0, vx: 0, vy: 0,
        r: 6 + Math.min(8, (p.iaS||50)/12),
      }));
    const es = [];
    /* connect by shared interessado/parteContraria */
    const partyMap = {};
    ns.forEach(n => {
      const k = (n.proc.interessado || n.proc.parteContraria || "").toLowerCase().trim();
      if (!k || k === "—") return;
      partyMap[k] = partyMap[k] || [];
      partyMap[k].push(n.id);
    });
    Object.values(partyMap).forEach(ids => {
      for (let i = 0; i < ids.length; i++) {
        for (let j = i+1; j < ids.length; j++) {
          es.push({ a: ids[i], b: ids[j], type: "party" });
        }
      }
    });
    /* connect by shared tipoPeca */
    const tpMap = {};
    ns.forEach(n => {
      const k = (n.proc.tipoPeca || "").toLowerCase().trim();
      if (!k) return;
      tpMap[k] = tpMap[k] || [];
      tpMap[k].push(n.id);
    });
    Object.values(tpMap).forEach(ids => {
      if (ids.length > 8) return;  /* skip huge clusters */
      for (let i = 0; i < ids.length; i++) {
        for (let j = i+1; j < ids.length; j++) {
          if (!es.some(e => (e.a===ids[i]&&e.b===ids[j])||(e.a===ids[j]&&e.b===ids[i]))) {
            es.push({ a: ids[i], b: ids[j], type: "tipoPeca" });
          }
        }
      }
    });
    /* connect by shared tribunal/orgao */
    const trMap = {};
    ns.forEach(n => {
      const k = (n.proc.tribunal || n.proc.orgao || "").toLowerCase().trim();
      if (!k) return;
      trMap[k] = trMap[k] || [];
      trMap[k].push(n.id);
    });
    Object.values(trMap).forEach(ids => {
      if (ids.length > 10) return;
      for (let i = 0; i < ids.length; i++) {
        for (let j = i+1; j < ids.length; j++) {
          if (!es.some(e => (e.a===ids[i]&&e.b===ids[j])||(e.a===ids[j]&&e.b===ids[i]))) {
            es.push({ a: ids[i], b: ids[j], type: "tribunal" });
          }
        }
      }
    });
    return { nodes: ns, edges: es };
  }, [all]);

  /* layout + animation */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const resize = () => {
      W = container.clientWidth;
      H = container.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    /* init positions in a circle */
    const centerX = W / 2, centerY = H / 2;
    nodes.forEach((n, i) => {
      const ang = (i / nodes.length) * Math.PI * 2;
      n.x = centerX + Math.cos(ang) * 200;
      n.y = centerY + Math.sin(ang) * 200;
    });

    /* node lookup */
    const nodeById = {};
    nodes.forEach(n => { nodeById[n.id] = n; });

    let raf;
    const step = () => {
      raf = requestAnimationFrame(step);
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const cx = cw / 2, cy = ch / 2;

      /* repulsion between all nodes */
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i+1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d2 = dx*dx + dy*dy + 0.01;
          const d = Math.sqrt(d2);
          if (d > 240) continue;
          const f = 480 / d2;
          const fx = (dx/d) * f;
          const fy = (dy/d) * f;
          a.vx -= fx; a.vy -= fy;
          b.vx += fx; b.vy += fy;
        }
      }
      /* edge attraction */
      edges.forEach(e => {
        const a = nodeById[e.a], b = nodeById[e.b];
        if (!a || !b) return;
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.sqrt(dx*dx + dy*dy) + 0.01;
        const target = e.type === "party" ? 70 : 110;
        const f = (d - target) * 0.012;
        const fx = (dx/d) * f, fy = (dy/d) * f;
        a.vx += fx; a.vy += fy;
        b.vx -= fx; b.vy -= fy;
      });
      /* center gravity */
      nodes.forEach(n => {
        n.vx += (cx - n.x) * 0.0015;
        n.vy += (cy - n.y) * 0.0015;
        n.vx *= 0.85;  /* damping */
        n.vy *= 0.85;
        if (mouseRef.current.dragging !== n) {
          n.x += n.vx;
          n.y += n.vy;
        } else {
          n.x = mouseRef.current.x;
          n.y = mouseRef.current.y;
          n.vx = 0; n.vy = 0;
        }
      });

      /* render */
      ctx.fillStyle = "#040912";
      ctx.fillRect(0, 0, cw, ch);
      /* radial bg glow */
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(cw, ch)*0.6);
      bg.addColorStop(0, "rgba(20, 60, 110, 0.18)");
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cw, ch);

      /* edges */
      const edgeColors = {
        party: "rgba(255, 102, 128, 0.45)",
        tipoPeca: "rgba(127, 184, 224, 0.30)",
        tribunal: "rgba(184, 77, 255, 0.30)",
      };
      edges.forEach(e => {
        const a = nodeById[e.a], b = nodeById[e.b];
        if (!a || !b) return;
        ctx.strokeStyle = edgeColors[e.type] || "rgba(127, 184, 224, 0.25)";
        ctx.lineWidth = e.type === "party" ? 1.2 : 0.7;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      /* nodes */
      const hovId = hoveredRefLocal.current;
      nodes.forEach(n => {
        const isHov = hovId === n.id;
        const accent = uC(n.proc.diasRestantes);
        /* outer glow */
        const glowR = n.r * (isHov ? 4 : 2.4);
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        g.addColorStop(0, accent + (isHov ? "cc" : "55"));
        g.addColorStop(0.6, accent + "22");
        g.addColorStop(1, accent + "00");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2); ctx.fill();
        /* core */
        ctx.fillStyle = accent;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * (isHov ? 1.3 : 1), 0, Math.PI * 2); ctx.fill();
        /* highlight */
        ctx.fillStyle = "rgba(255,255,255,.85)";
        ctx.beginPath(); ctx.arc(n.x - n.r*0.3, n.y - n.r*0.3, n.r*0.35, 0, Math.PI * 2); ctx.fill();
        /* label for hovered */
        if (isHov) {
          ctx.font = "bold 11px 'JetBrains Mono', monospace";
          const text = (n.proc.num || "").slice(-9) || "?";
          const tw = ctx.measureText(text).width + 12;
          ctx.fillStyle = "rgba(8,12,22,.92)";
          ctx.fillRect(n.x - tw/2, n.y - n.r - 22, tw, 16);
          ctx.strokeStyle = accent;
          ctx.lineWidth = 0.6;
          ctx.strokeRect(n.x - tw/2, n.y - n.r - 22, tw, 16);
          ctx.fillStyle = accent;
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(text, n.x, n.y - n.r - 14);
        }
      });
    };
    step();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [nodes, edges]);

  /* mouse interactions */
  const hoveredRefLocal = useRef(null);
  useEffect(() => { hoveredRefLocal.current = hovered; }, [hovered]);

  const onMove = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    mouseRef.current.x = mx; mouseRef.current.y = my;
    let bestD = 16, bestId = null;
    nodes.forEach(n => {
      const d = Math.hypot(mx - n.x, my - n.y);
      if (d < bestD) { bestD = d; bestId = n.id; }
    });
    setHovered(bestId);
  };
  const onDown = (e) => {
    if (hovered) {
      const node = nodes.find(n => n.id === hovered);
      if (node) mouseRef.current.dragging = node;
    }
  };
  const onUp = (e) => {
    if (mouseRef.current.dragging && mouseRef.current.draggedDist < 5) {
      ss(mouseRef.current.dragging.proc);
    }
    mouseRef.current.dragging = null;
  };
  const onLeave = () => {
    setHovered(null);
    mouseRef.current.dragging = null;
  };

  const stats = useMemo(() => {
    const partyCount = edges.filter(e => e.type === "party").length;
    const tpCount = edges.filter(e => e.type === "tipoPeca").length;
    const trCount = edges.filter(e => e.type === "tribunal").length;
    return { partyCount, tpCount, trCount, total: edges.length };
  }, [edges]);

  return (
    <div style={{padding:0,height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",background:"#040a14",position:"relative"}}>
      <div style={{padding:"14px 22px",display:"flex",alignItems:"center",gap:14,flexShrink:0,borderBottom:"1px solid rgba(127,174,204,.08)",background:"rgba(8,13,22,.7)",backdropFilter:"blur(8px)",zIndex:5}}>
        <div style={{width:40,height:40,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, rgba(0,229,255,.18), rgba(184,77,255,.12))",border:"1px solid rgba(0,229,255,.3)",boxShadow:"0 0 14px rgba(0,229,255,.22)"}}>
          <Layers size={18} color="#00e5ff"/>
        </div>
        <div>
          <h2 style={{margin:0,fontSize:15,fontWeight:700,color:"#bbd5ec",fontFamily:"Orbitron,sans-serif",letterSpacing:".15em"}}>RELAÇÕES</h2>
          <div style={{fontSize:10,color:"rgba(190,215,235,.45)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:".05em",marginTop:2}}>{nodes.length} processos · {edges.length} conexões · arraste para reorganizar</div>
        </div>
        <div style={{flex:1}}/>
        <div style={{display:"flex",gap:14,alignItems:"center",fontSize:11,fontFamily:"'JetBrains Mono',monospace"}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:10,height:2,background:"#ff6680",boxShadow:"0 0 6px #ff6680"}}/><span style={{color:"rgba(255,102,128,.85)"}}>parte ({stats.partyCount})</span></div>
          <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:10,height:2,background:"#7faecc"}}/><span style={{color:"rgba(127,174,204,.7)"}}>peça ({stats.tpCount})</span></div>
          <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:10,height:2,background:"#b84dff"}}/><span style={{color:"rgba(184,77,255,.75)"}}>órgão ({stats.trCount})</span></div>
        </div>
      </div>
      <div ref={containerRef} style={{flex:1,position:"relative"}}>
        <canvas ref={canvasRef}
          onMouseMove={onMove}
          onMouseDown={onDown}
          onMouseUp={onUp}
          onMouseLeave={onLeave}
          style={{display:"block",cursor: hovered ? (mouseRef.current.dragging ? "grabbing" : "pointer") : "default"}}
        />
      </div>
    </div>
  );
};


const PC=React.memo(({item:p,onClick:oc,dp,compact,onEdit})=>{const isA=p.tipo==="adm";const side=extValue(p);const accent=uC(p.diasRestantes);
  const tilt = useTilt(6);
  const [hovering, setHovering] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewTimer = useRef(null);
  const cardRef = useRef(null);
  /* combine refs */
  const setRef = (el) => { tilt.ref.current = el; cardRef.current = el; };
  const handleMouseEnter = () => {
    setHovering(true);
    if (previewTimer.current) clearTimeout(previewTimer.current);
    previewTimer.current = setTimeout(() => setShowPreview(true), 700);
  };
  const handleMouseLeave = (e) => {
    setHovering(false);
    setShowPreview(false);
    if (previewTimer.current) clearTimeout(previewTimer.current);
    tilt.onMouseLeave();
    if (e && e.currentTarget) {
      e.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
      e.currentTarget.style.borderColor = accent + "22";
    }
  };
  const handleMouseMove = (e) => {
    tilt.onMouseMove(e);
  };
  return(
  <>
  {showPreview && <HoverPreview proc={p} anchor={cardRef.current}/>}
  <div ref={setRef} onClick={e=>{e.stopPropagation();oc?.(p)}}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onMouseMove={handleMouseMove}
    className="cj-soft" style={{background:"linear-gradient(180deg,rgba(18,24,42,.92),rgba(11,15,29,.94))",border:"1px solid "+(p.iaS>=75?"rgba(255,46,91,.35)":p.iaS>=50?"rgba(255,184,0,.28)":accent+"22"),borderRadius:20,padding:"0",cursor:"pointer",transition:"transform .22s ease, border-color .25s, box-shadow .25s",overflow:"hidden",position:"relative",transformStyle:"preserve-3d",willChange:"transform",boxShadow: hovering ? `0 14px 40px rgba(0,0,0,.55), 0 0 26px ${accent}22` : "0 4px 16px rgba(0,0,0,.35)"}}>
    <QuickActionsToolbar proc={p} dp={dp} onEdit={onEdit} visible={hovering} accent={accent}/>
    <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,borderRadius:"0 0 0 20px",background:`linear-gradient(180deg,${accent},${accent}44 60%,transparent)`}}/>
    {isSustAlerta(p)&&(function(){
      var nivel=getSustNivel(p);var cd=getSustCountdown(p);var dl=getSustDeadlineStr(p);
      var cores={critico:{bg:"rgba(255,46,91,.18)",bd:"rgba(255,46,91,.8)",txt:"#ff2e5b",anim:"textBlink .9s ease-in-out infinite"},urgente:{bg:"rgba(255,184,0,.15)",bd:"rgba(255,184,0,.7)",txt:"#ffb800",anim:"cjPulse 1.8s ease infinite"},preparo:{bg:"rgba(0,229,255,.1)",bd:"rgba(0,229,255,.5)",txt:"#00e5ff",anim:"none"}};
      var c=cores[nivel]||cores.preparo;
      var msgs={critico:"PRAZO DE ENVIO VENCENDO — envie vídeo/memoriais agora!",urgente:"Prazo de envio em breve — deadline: "+(dl||"—"),preparo:"Prepare memoriais e inscrição — deadline de envio: "+(dl||"—")};
      var labels={critico:"ENVIE AGORA",urgente:"PRAZO PRÓXIMO",preparo:"EM PREPARO"};
      return(
      <div style={{position:"absolute",top:0,left:0,right:0,zIndex:3,background:c.bg,borderBottom:"2px solid "+c.bd,padding:"5px 14px",display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:13,animation:c.anim}}>🎤</span>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:10,fontWeight:900,color:c.txt,fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",animation:nivel==="critico"?c.anim:"none"}}>SUSTENTAÇÃO ORAL</div>
          <div style={{fontSize:9,color:c.txt,opacity:.8,marginTop:1}}>{msgs[nivel]}</div>
        </div>
        {cd&&<span style={{fontSize:11,fontWeight:800,color:c.txt,fontFamily:"Orbitron,monospace",animation:c.anim}}>{cd}</span>}
        {!cd&&p.dataSustentacao&&<span style={{fontSize:9,fontWeight:700,color:c.txt,opacity:.8,flexShrink:0}}>{(new Date(p.dataSustentacao)).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})}</span>}
        <span style={{fontSize:9,fontWeight:700,color:c.txt,background:c.txt+"25",padding:"2px 8px",borderRadius:4,whiteSpace:"nowrap"}}>{labels[nivel]}</span>
      </div>);
    })()}
    <div style={{padding:compact?"8px 12px 6px":"14px 16px 10px",borderBottom:`1px solid ${K.brd}`,background:"linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0))"}}>
      <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"flex-start"}}>
        <div style={{display:"flex",gap:10,minWidth:0,flex:1}}>
          <div style={{width:42,height:42,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",background:p.tipo==="jud"?K.puG:K.acG,border:`1px solid ${p.tipo==="jud"?K.pu:K.ac}22`,flexShrink:0}}>
            {p.tipo==="jud"?<Scale size={18} color={K.pu}/>:<FolderOpen size={18} color={K.ac}/>}
          </div>
          <div style={{minWidth:0}}>
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:4}}>
              <Bd color={p.tipo==="jud"?K.pu:K.ac}>{p.tipo==="jud"?"Judicial":"Administrativo"}</Bd>
              {p.dataSustentacao&&p.tipoPeca==="Sustentação Oral"&&<div style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 7px",borderRadius:6,background:"rgba(255,46,91,.18)",border:"1px solid rgba(255,46,91,.5)",color:"#ff2e5b",fontSize:9,fontWeight:900,fontFamily:"Orbitron,monospace",flexShrink:0,animation:isSustAlerta(p)?"textBlink .9s ease-in-out infinite":"none"}}>
                🎤 {(new Date(p.dataSustentacao)).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})}
              </div>}
            </div>
            {p.tipoPeca&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,padding:"5px 10px",borderRadius:8,background:getPecaCor(p.tipoPeca)+"14",borderLeft:"3px solid "+getPecaCor(p.tipoPeca),marginLeft:-2}}>
              <span style={{fontSize:15,fontWeight:900,color:getPecaCor(p.tipoPeca),letterSpacing:".3px",textShadow:"0 0 18px "+getPecaCor(p.tipoPeca)+"66",fontFamily:"inherit",lineHeight:1.2}}>{p.tipoPeca}</span>
              <span style={{fontSize:9,fontWeight:700,color:getPecaCor(p.tipoPeca),opacity:.6,fontFamily:"Orbitron,monospace",letterSpacing:".5px"}}>{getPecaLabel(p.tipoPeca)}</span>
            </div>}
            <div title={p.num||""} style={{fontSize:14,fontWeight:800,color:K.txt,fontFamily:"'JetBrains Mono',monospace",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.num||"Novo cadastro"}</div>
            {p.numeroSEI&&<div onClick={function(e){e.stopPropagation();if(navigator.clipboard)navigator.clipboard.writeText(p.numeroSEI).then(function(){showCopyToast("SEI "+p.numeroSEI);});}} title={"Clique para copiar SEI: "+p.numeroSEI} style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",color:"#7dd3fc",marginTop:3,cursor:"pointer",padding:"2px 6px",borderRadius:5,background:"rgba(125,211,252,.1)",border:"1px solid rgba(125,211,252,.15)",display:"inline-flex",alignItems:"center",gap:4,userSelect:"none"}}>🗂 SEI {p.numeroSEI}</div>}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end",flexShrink:0}}>
          <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,flexShrink:0}}>
              <UB d={p.diasRestantes} prazoFinal={p.prazoFinal}/>
              {p.prazoFinal&&<div style={{fontSize:9,color:uC(p.diasRestantes),opacity:.7,fontFamily:"monospace",textAlign:"center",whiteSpace:"nowrap"}}>{(function(){try{var d=p.prazoFinal instanceof Date?p.prazoFinal:new Date(p.prazoFinal+"T12:00:00");return d.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});}catch(e){return "";}})()}</div>}
            </div>
            <SB s={p.score}/>
          </div>
          {/* v41 · sparkline mini · evolução do score (deterministica por id) */}
          <CnSpark w={84} h={20} color={accent} data={(function(){
            var seed = (String(p.id||p.num||p.assunto||"x").split("").reduce(function(a,c){return a + c.charCodeAt(0);}, 7)) | 1;
            var arr = [];
            var s = (p.score || 50);
            for (var i = 0; i < 12; i++) {
              seed = (seed * 9301 + 49297) % 233280;
              arr.push(Math.max(0, Math.min(100, s - 25 + (seed/233280)*50 - i*0.6)));
            }
            return arr.reverse().concat([s]);
          })()}/>
          <DoneBtn small onClick={()=>dp({type:"COMPLETE_P",id:p.id})}/>
        </div>
      </div>
      {isExecucao(p)&&<div className="cj-pulse" style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(0,229,255,.15)",border:"1px solid rgba(0,229,255,.5)",borderRadius:8,padding:"3px 8px",fontSize:9,color:"#00e5ff",fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:".5px"}}>⚡ EM EXECUÇÃO</div>}
      {isAcompanhamento(p)&&<div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(168,85,247,.12)",border:"1px solid rgba(168,85,247,.45)",borderRadius:8,padding:"3px 8px",fontSize:9,color:"#b84dff",fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:".5px"}}>👁 EM ACOMPANHAM.</div>}
      {isProtocolar(p)&&<div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:8,background:"rgba(0,255,136,.12)",border:"1px solid rgba(0,255,136,.45)",color:"#00ff88",fontSize:10,fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",marginTop:8,textShadow:"0 0 6px rgba(0,255,136,.7)"}}>📤 PROTOCOLAR NO TRIBUNAL</div>}
      {isCorrecao(p)&&<div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:8,background:"rgba(255,184,0,.12)",border:"1px solid rgba(255,184,0,.45)",color:"#ffb800",fontSize:10,fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",marginTop:8,textShadow:"0 0 6px rgba(255,184,0,.7)"}}>✏️ AGUARDANDO CORREÇÃO</div>}
      {p.tipoPeca==="Sustentação Oral"&&<div className="cj-pulse" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:8,background:"rgba(184,77,255,.14)",border:"1px solid rgba(184,77,255,.5)",color:"#b84dff",fontSize:10,fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",marginTop:8,textShadow:"0 0 6px rgba(184,77,255,.5)",animation:"cjPulse 2s ease-in-out infinite"}}>🎤 INSCRIÇÃO PARA SUSTENTAÇÃO ORAL</div>}
      <div title={p.assunto||""} style={{fontSize:15,fontWeight:800,color:K.txt,marginTop:8,lineHeight:1.45}}>{p.assunto||"Sem assunto"}</div>
    </div>

    <div style={{padding:"14px 16px 16px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        <div style={{padding:"10px 12px",borderRadius:14,background:"rgba(255,255,255,.025)",border:`1px solid ${K.brd}`}}>
          <div style={{fontSize:10,color:K.dim,textTransform:"uppercase",fontWeight:700,marginBottom:4}}>{extLabel(p)}</div>
          <div style={{fontSize:12,color:K.txt,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{side||"—"}</div>
        </div>
        <div style={{padding:"10px 12px",borderRadius:14,background:"rgba(255,255,255,.025)",border:`1px solid ${K.brd}`}}>
          <div style={{fontSize:10,color:K.dim,textTransform:"uppercase",fontWeight:700,marginBottom:4}}>{p.tipo==="jud"?"Órgão / Gabinete":"Órgão / Unidade"}</div>
          <div style={{fontSize:12,color:K.txt,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.orgao||"—"}</div>
        </div>
      </div>

      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}} onClick={e=>e.stopPropagation()}>
        <IS value={p.fase} options={PHS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:isA,ch:{fase:v}})} color={K.ac}/>
        <IS value={p.status} options={STS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:isA,ch:{status:v}})}/>
        {p.tipo==="jud"&&<Bd color={K.pu}><Scale size={10}/>{p.tribunal}</Bd>}
        {p.responsavel&&<Bd color={K.ac}><Users size={10}/>{p.responsavel}</Bd>}
        {p.depTerc&&<Bd color={K.wa}><Users size={10}/>Terceiros</Bd>}
        {p.reuniao&&<Bd color={K.ac}><Calendar size={10}/>Reunião</Bd>}
        {p.sustentacao&&<Bd color={K.pu}><Gavel size={10}/>Sustentação</Bd>}
      </div>

      <div style={{padding:"12px 14px",borderRadius:16,background:`linear-gradient(180deg,${accent}10,rgba(255,255,255,.02))`,border:`1px solid ${accent}22`,marginBottom:12}}>
        <div style={{fontSize:10,color:K.dim,textTransform:"uppercase",fontWeight:700,marginBottom:5}}>Próxima providência</div>
        <div style={{fontSize:12,color:K.txt,fontWeight:700,marginBottom:5,lineHeight:1.5}}>{p.proxProv||"Sem próxima providência"}</div>
        <div style={{fontSize:11,color:K.dim}}>Prazo final: {fmt(p.prazoFinal)} {p.prazoFinal&&React.createElement(function(){return React.createElement("button",{onClick:function(e){e.stopPropagation();var title=encodeURIComponent("COJUR: "+p.assunto);var d=toISO(toD(p.prazoFinal)).replace(/-/g,"");var dates=d+"T120000/"+d+"T150000";var url="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+title+"&dates="+dates;window.open(url,"_blank","noopener,noreferrer");},style:{padding:"2px 8px",borderRadius:5,border:"1px solid rgba(0,229,255,.25)",background:"rgba(0,229,255,.06)",color:"#00e5ff",fontSize:9,fontWeight:700,cursor:"pointer",marginLeft:6,fontFamily:"inherit"}},"Cal");},null)}{p.dataProv?` · Providência: ${fmt(toD(p.dataProv))}`:""}</div>
      </div>

      {hasCustas(p)&&<div className="cj-custas-blink" onClick={e=>e.stopPropagation()} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:10,background:"rgba(245,158,11,.12)",border:"1px solid rgba(245,158,11,.45)",marginBottom:10}}>
        <DollarSign size={13} color={K.wa}/><div style={{flex:1}}><div style={{fontSize:10,fontWeight:800,color:K.wa}}>CUSTAS OBRIGATÓRIAS</div>{(function(){var ci=getCustasInfo(p.tribunal);return ci?<div style={{fontSize:9,color:"#fde68a",marginTop:1}}>{ci.valor}</div>:<div style={{fontSize:9,color:"#fde68a",marginTop:1}}>Verifique preparo antes de protocolar</div>;})()}</div>
      </div>}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
        {p.linkSEI&&<button onClick={e=>{e.stopPropagation();window.open(p.linkSEI,"_blank","noopener,noreferrer");}} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:11,border:"1px solid rgba(0,229,255,.3)",background:"linear-gradient(135deg,rgba(0,229,255,.12),rgba(0,229,255,.05))",color:"#00e5ff",fontSize:11,fontWeight:700,cursor:"pointer",boxShadow:"0 0 12px rgba(0,229,255,.18)",textShadow:"0 0 6px rgba(0,229,255,.6)",fontFamily:"inherit",whiteSpace:"nowrap"}}>🗂️ Processo SEI</button>}
        {p.tipo==="jud"&&React.createElement(function(){return React.createElement("button",{onClick:function(e){e.stopPropagation();setMinutaProc(p);},style:{display:"inline-flex",alignItems:"center",gap:4,padding:"5px 10px",borderRadius:10,border:"1px solid rgba(0,229,255,.22)",background:"rgba(0,229,255,.05)",color:"#00e5ff",fontSize:10,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"}},"📝 Gerar Minuta");},null)}
        {p.tipo==="jud"&&React.createElement(function(){var s=useState(false);var ck=s[0],sCk=s[1];return React.createElement("button",{onClick:function(e){e.stopPropagation();var txt=DESPACHO_CORRECAO.replace(/\\n/g,"\n");try{navigator.clipboard.writeText(txt).then(function(){sCk(true);setTimeout(function(){sCk(false);},2500);});}catch(ex){}},title:"Copiar despacho de envio para correção — Dr. João Paulo",style:{display:"inline-flex",alignItems:"center",gap:4,padding:"5px 10px",borderRadius:10,border:ck?"1px solid rgba(255,184,0,.5)":"1px solid rgba(255,184,0,.22)",background:ck?"rgba(255,184,0,.1)":"rgba(255,184,0,.05)",color:ck?"#ffb800":"#ffb800",fontSize:10,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",transition:"all .3s"}},ck?"✅ Despacho copiado!":"📋 Desp. Correção (Dr. JP)");},null)}
        {React.createElement(function(){var s=useState(false);var show=s[0],sShow=s[1];return React.createElement(React.Fragment,null,React.createElement("button",{onClick:function(e){e.stopPropagation();sShow(true);},style:{display:"inline-flex",alignItems:"center",gap:4,padding:"5px 10px",borderRadius:10,border:"1px solid rgba(168,85,247,.28)",background:"rgba(168,85,247,.07)",color:"#b84dff",fontSize:10,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"}},"📄 Análise IA"),show&&React.createElement(PdfAIModal,{proc:p,onClose:function(){sShow(false);}}));},null)}
        {p.tipo==="adm"&&React.createElement(function(){var[show,sShow]=useState(false);return React.createElement(React.Fragment,null,React.createElement("button",{onClick:function(e){e.stopPropagation();sShow(true);},style:{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:11,border:"1px solid rgba(184,77,255,.32)",background:"linear-gradient(135deg,rgba(184,77,255,.11),rgba(184,77,255,.05))",color:"#b84dff",fontSize:11,fontWeight:700,cursor:"pointer",boxShadow:"0 0 10px rgba(184,77,255,.16)",fontFamily:"inherit",whiteSpace:"nowrap"}},"📋 Elaborar Parecer"),show&&React.createElement(ParecerModal,{proc:p,onClose:function(){sShow(false);}}));},null)}
        {p.tipo==="jud"&&React.createElement(function(){var[ck,sCk]=useState(false);return React.createElement("button",{onClick:function(e){e.stopPropagation();copyText(DESPACHO_ANALISE,function(){sCk(true);setTimeout(function(){sCk(false);},2500);});},style:{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 11px",borderRadius:11,border:ck?"1px solid rgba(184,77,255,.5)":"1px solid rgba(184,77,255,.25)",background:ck?"rgba(184,77,255,.1)":"rgba(184,77,255,.05)",color:ck?"#b84dff":"#b84dff",fontSize:10,fontWeight:700,cursor:"pointer",transition:"all .3s",whiteSpace:"nowrap",fontFamily:"inherit"}},ck?"✅ Copiado!":"📤 Despacho Análise");},null)}
        {p.linkRef&&<button onClick={e=>{e.stopPropagation();openRef(p.linkRef)}} style={{...btnGhost,padding:"6px 10px",fontSize:11,color:K.ac,borderColor:K.ac+"33"}}>🔗 Referência</button>}
        {p.tipo==="jud"&&getTribSistema(p.tribunal)&&(function(){var s=getTribSistema(p.tribunal);return(
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}} onClick={function(e){e.stopPropagation();}}>
            <button onClick={function(){openTrib(p.tribunal,p.num);}} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 11px",borderRadius:12,border:"1px solid rgba(0,229,255,.38)",background:"linear-gradient(135deg,rgba(0,229,255,.15),rgba(0,229,255,.06))",color:"#00e5ff",fontSize:10,fontWeight:700,cursor:"pointer",boxShadow:"0 0 12px rgba(0,229,255,.2)",textShadow:"0 0 6px rgba(0,229,255,.5)",fontFamily:"inherit",whiteSpace:"nowrap"}} title={"2º Grau — "+s.nome+" (nº copiado)"}>
              {s.icone} {s.sistema} 2G
            </button>
            {s.url1g&&<button onClick={function(){if(p.num){if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(p.num).then(function(){showCopyToast(p.num);}).catch(function(){var t2=document.createElement("textarea");t2.value=p.num;t2.style.position="fixed";t2.style.opacity="0";document.body.appendChild(t2);t2.focus();t2.select();try{document.execCommand("copy");showCopyToast(p.num);}catch(e){}document.body.removeChild(t2);});}else{var t2=document.createElement("textarea");t2.value=p.num;t2.style.position="fixed";t2.style.opacity="0";document.body.appendChild(t2);t2.focus();t2.select();try{document.execCommand("copy");showCopyToast(p.num);}catch(e){}document.body.removeChild(t2);}}window.open(s.url1g,"_blank","noopener,noreferrer");}} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 11px",borderRadius:12,border:"1px solid rgba(168,85,247,.35)",background:"linear-gradient(135deg,rgba(168,85,247,.12),rgba(168,85,247,.05))",color:"#b84dff",fontSize:10,fontWeight:700,cursor:"pointer",boxShadow:"0 0 10px rgba(168,85,247,.18)",fontFamily:"inherit",whiteSpace:"nowrap"}} title={"1º Grau — "+s.nome+" (nº copiado)"}>
              {s.icone} {s.sistema} 1G
            </button>}
          </div>
        );})()}
        {p.tipo==="jud"&&p.pubDJe&&(function(){var ri=getPrazoInfo(p.tipoPeca);var du2=p.intersticio||ri.du;var prazo=calcPrazoDJe(p.pubDJe,du2);var du=prazo?diffD(prazo,NOW):null;return prazo?(
          <span title={ri.obs+" — "+du2+"du desde "+ri.base} style={{fontSize:10,color:du<=0?"#ff2e5b":du<=5?"#ffb800":"#00e5ff",fontFamily:"Orbitron,monospace",fontWeight:700,padding:"4px 8px",borderRadius:8,background:"rgba(0,229,255,.06)",border:"1px solid rgba(0,229,255,.2)"}}>
            {du<=0?"VENCIDO":du+"du"} ({du2}du)
          </span>
        ):null;})()}
      </div>
      <div style={{marginTop:8,fontSize:10,color:K.dim2,textAlign:"right"}}>Atualizado {fmt(p.ultMov||NOW)}</div>
      {/* ═══ CHECKLIST PROGRESS BAR ═══ */}
      {p.checklist&&p.checklist.length>0&&(function(){var total=p.checklist.length;var done=p.checklist.filter(function(c){return typeof c==="object"?c.done:false;}).length;var pct=Math.round(done/total*100);var cor=pct>=100?"#00ff88":pct>=50?"#00e5ff":"#ffb800";return React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginTop:6,padding:"4px 0"}},React.createElement("div",{style:{flex:1,height:4,borderRadius:999,background:"rgba(255,255,255,.06)",overflow:"hidden"}},React.createElement("div",{style:{height:"100%",width:pct+"%",background:cor,borderRadius:999,transition:"width .4s"}})),React.createElement("span",{style:{fontSize:9,color:cor,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,flexShrink:0}},done+"/"+total));})()}
    </div>
    <div style={{height:4,borderRadius:"0 0 20px 20px",background:p.status==="Concluído"?K.su:p.status==="Em Elaboração"?K.wa:p.status==="Arquivado"?K.dim:accent,opacity:.7}}/>
  </div>
  </>
)});
/* KANBAN with localStorage persistence */
const KANBAN_KEY = "cojur-kanban-cols";
const DEFAULT_KANBAN_COLS = ["Triagem","Análise","Minuta Pendente","Revisão","Aguardando Retorno Externo","Cumprido"];
const KanbanV=({items,dp,ss,colKey})=>{
  const[did,sDid]=useState(null),[oc,sOc]=useState(null),[colDrag,sColDrag]=useState(null);
  const storageKey = KANBAN_KEY+(colKey||"");
  const loadCols = function(){
    try{var s=localStorage.getItem(storageKey);return s?JSON.parse(s):null;}catch(e){return null;}
  };
  const autoShow = PHS.filter(function(ph){return items.some(function(p){return p.fase===ph;});});
  const initCols = function(){
    var saved=loadCols();
    if(saved&&saved.length) return saved;
    var base=[...DEFAULT_KANBAN_COLS];
    autoShow.forEach(function(ph){if(!base.includes(ph))base.push(ph);});
    return base;
  };
  const[cols,setCols]=useState(initCols);
  const saveCols=function(c){setCols(c);try{localStorage.setItem(storageKey,JSON.stringify(c));}catch(e){}};
  const addCol=function(){
    var ph=PHS.find(function(p){return !cols.includes(p);});
    if(ph)saveCols([...cols,ph]);
  };
  const removeCol=function(ph){saveCols(cols.filter(function(c){return c!==ph;}));};
  /* Column drag reorder */
  const[colDragIdx,sColDragIdx]=useState(null);
  const[colOverIdx,sColOverIdx]=useState(null);
  const handleColDragStart=function(idx){sColDragIdx(idx);};
  const handleColDrop=function(targetIdx){
    if(colDragIdx===null||colDragIdx===targetIdx)return;
    var next=[...cols];var moved=next.splice(colDragIdx,1)[0];next.splice(targetIdx,0,moved);
    saveCols(next);sColDragIdx(null);sColOverIdx(null);
  };
  return(
  <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
      <span style={{fontSize:11,color:K.dim,fontWeight:600}}>Colunas:</span>
      {cols.map(function(ph){return(
        <span key={ph} style={{fontSize:10,padding:"3px 10px",borderRadius:20,background:K.acG,color:K.ac,border:"1px solid "+K.ac+"33",display:"inline-flex",alignItems:"center",gap:5,cursor:"pointer"}}
          onClick={function(){removeCol(ph);}}>
          {ph} <X size={9}/>
        </span>
      );})}
      <button onClick={addCol} style={{...btnGhost,padding:"3px 10px",fontSize:10,color:K.su,borderColor:K.su+"44"}}><Plus size={10}/>Coluna</button>
      <button onClick={function(){saveCols([...DEFAULT_KANBAN_COLS]);}} style={{...btnGhost,padding:"3px 10px",fontSize:10}}>Resetar</button>
    </div>
    <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:12,minHeight:400}}>
      {cols.map(function(ph,colIdx){var col=items.filter(function(p){return p.fase===ph;}).sort(function(a,b){return b.score-a.score;});var isO=oc===ph;var isColOver=colOverIdx===colIdx&&colDragIdx!==null&&colDragIdx!==colIdx;return(
        <div key={ph} className={isO?"cj-kd":""}
          draggable onDragStart={function(e){handleColDragStart(colIdx);e.dataTransfer.effectAllowed="move";}}
          onDragOver={function(e){e.preventDefault();if(colDragIdx!==null){sColOverIdx(colIdx);}else{sOc(ph);}}}
          onDragLeave={function(){sOc(null);sColOverIdx(null);}}
          onDrop={function(e){e.preventDefault();sOc(null);sColOverIdx(null);if(colDragIdx!==null){handleColDrop(colIdx);sColDragIdx(null);return;}if(!did)return;var pr=items.find(function(p){return p.id===did;});if(pr&&pr.fase!==ph)dp({type:"UPD",id:did,isAdm:pr.tipo==="adm",ch:{fase:ph}});sDid(null);}}
          style={{minWidth:260,flex:"0 0 270px",background:isO?"rgba(0,229,255,.06)":"rgba(0,229,255,.02)",borderRadius:14,padding:12,border:"1px solid "+(isColOver?"rgba(184,77,255,.6)":isO?K.ac+"55":K.brd),boxShadow:isO?"0 0 20px rgba(0,229,255,.12)":isColOver?"0 0 20px rgba(184,77,255,.15)":"none",transition:"all .2s",opacity:colDragIdx===colIdx?0.5:1}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,padding:"0 4px",alignItems:"center",cursor:"grab"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <GripVertical size={12} color={K.dim2}/>
              <span style={{fontSize:11,fontWeight:700,color:K.txt,letterSpacing:".2px"}}>{ph}</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:10,fontWeight:700,color:K.dim,fontFamily:"'JetBrains Mono',monospace",background:"rgba(0,229,255,.08)",border:"1px solid rgba(0,229,255,.15)",borderRadius:10,padding:"2px 8px"}}>{col.length}</span>
              <button onClick={function(){removeCol(ph);}} style={{background:"none",border:"none",color:K.dim2,cursor:"pointer",padding:"2px",lineHeight:1}} title="Remover coluna"><X size={10}/></button>
            </div>
          </div>
          <div className="cj-st" style={{display:"flex",flexDirection:"column",gap:8,minHeight:60}}>
            {col.map(function(p){var pcor=getPecaCor(p.tipoPeca);return(
              <div key={p.id} draggable onDragStart={function(e){sDid(p.id);sColDragIdx(null);e.dataTransfer.effectAllowed="move";e.stopPropagation();}} onDragEnd={function(){sDid(null);}} style={{opacity:did===p.id?0.35:1,cursor:"grab",transition:"opacity .15s"}}>
                <div onClick={function(){ss(p);}} style={{background:K.card,border:"1px solid "+K.brd,borderRadius:12,padding:"10px 12px",borderLeft:"3px solid "+uC(p.diasRestantes),transition:"all .2s",boxShadow:"0 4px 12px rgba(0,0,0,.2)"}} onMouseEnter={function(e){e.currentTarget.style.background=K.cardH;e.currentTarget.style.boxShadow="0 0 14px rgba(0,229,255,.08), 0 4px 16px rgba(0,0,0,.3)";}} onMouseLeave={function(e){e.currentTarget.style.background=K.card;e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,.2)";}}>
                  <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:4}}>
                    <GripVertical size={12} color={K.dim2}/>
                    <span style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",color:K.ac}}>{p.num||"Novo"}</span>
                    <div style={{marginLeft:"auto",padding:"1px 5px",borderRadius:4,background:pcor+"18",color:pcor,fontSize:8,fontWeight:800,fontFamily:"Orbitron,monospace"}}>{getPecaLabel(p.tipoPeca)}</div>
                  </div>
                  <div style={{fontSize:12,fontWeight:600,color:K.txt,marginBottom:6,lineHeight:1.4}}>{p.assunto||"Sem assunto"}</div>
                  <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}><UB d={p.diasRestantes} prazoFinal={p.prazoFinal}/><SB s={p.score}/><DoneBtn small onClick={function(){dp({type:"COMPLETE_P",id:p.id});}}/></div>
                </div>
              </div>
            );})}
            {!col.length&&<div style={{padding:"20px 10px",textAlign:"center",color:K.dim2,fontSize:11,border:"1px dashed "+(isO?"rgba(0,229,255,.4)":"rgba(0,229,255,.1)"),borderRadius:10,background:isO?"rgba(0,229,255,.04)":"transparent",transition:"all .2s"}}>Arraste processos aqui</div>}
          </div>
        </div>
      );})}
    </div>
  </div>
)};

/* FILTER PANEL */
const FP=({f,sf,isJ})=>{const[op,sOp]=useState(false);const ac=Object.values(f).filter(v=>v&&v!=="all"&&v!=="").length;return(
  <div style={{position:"relative"}}><button onClick={()=>sOp(!op)} style={{...btnGhost,borderColor:ac?K.ac:K.brd,color:ac?K.ac:K.dim}}><Filter size={14}/>Filtros{ac>0&&<span style={{background:K.ac,color:"#fff",borderRadius:10,padding:"0 6px",fontSize:10,fontWeight:700}}>{ac}</span>}</button>
    {op&&<div className="cj-sc" style={{position:"absolute",top:"100%",right:0,marginTop:8,background:K.modal,border:`1px solid ${K.brd}`,borderRadius:14,padding:16,zIndex:50,width:320,boxShadow:"0 20px 40px rgba(0,0,0,.5)"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{fontSize:13,fontWeight:600,color:K.txt}}>Filtros</span><button onClick={()=>sf({})} style={{background:"none",border:"none",color:K.ac,fontSize:11,cursor:"pointer"}}>Limpar</button></div>
      {[{k:"urg",l:"Urgência",o:["all","Crítico","Intermediário","Normal"]},{k:"st",l:"Status",o:["all",...STS]},{k:"ph",l:"Fase",o:["all",...PHS]},{k:"peca",l:"Tipo de Peça",o:["all",...TIPOS_PECA]},...(isJ?[{k:"tr",l:"Tribunal",o:["all",...TRIBS]}]:[]),{k:"dep",l:"Terceiros",o:["all","Sim","Não"]},{k:"reun",l:"Reunião Vinculada",o:["all","Sim","Não"]},{k:"sust",l:"Sustentação Vinculada",o:["all","Sim","Não"]},{k:"semAcao",l:"Sem Próxima Providência",o:["all","Sim","Não"]},{k:"semResp",l:"Sem Responsável",o:["all","Sim","Não"]}].map(x=><div key={x.k} style={{marginBottom:10}}><label style={lblSt}>{x.l}</label><select style={inpSt} value={f[x.k]||"all"} onChange={e=>sf({...f,[x.k]:e.target.value})}>{x.o.map(v=><option key={v} value={v} style={{background:K.modal}}>{v==="all"?"Todos":v}</option>)}</select></div>)}
      <div style={{marginBottom:10}}><label style={lblSt}>Responsável</label><input style={inpSt} value={f.resp||""} onChange={e=>sf({...f,resp:e.target.value})} placeholder="Filtrar responsável"/></div>
      <div style={{marginBottom:10}}>
        <label style={lblSt}>Prazo Final — Intervalo</label>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <input type="date" style={{...inpSt,flex:1,fontSize:11}} value={f.dtIni||""} onChange={function(e){sf({...f,dtIni:e.target.value});}} placeholder="De"/>
          <span style={{color:K.dim,fontSize:11}}>até</span>
          <input type="date" style={{...inpSt,flex:1,fontSize:11}} value={f.dtFim||""} onChange={function(e){sf({...f,dtFim:e.target.value});}} placeholder="Até"/>
        </div>
      </div>
      <div style={{marginBottom:10}}>
        <label style={lblSt}>Tipo de Peça</label>
        <select style={inpSt} value={f.peca||"all"} onChange={function(e){sf({...f,peca:e.target.value});}}>
          <option value="all" style={{background:K.modal}}>Todos os tipos</option>
          {TIPOS_PECA.map(function(tp){return <option key={tp} value={tp} style={{background:K.modal,color:getPecaCor(tp)}}>{tp}</option>;})}
        </select>
      </div>
      <button style={{...btnPrim,width:"100%",justifyContent:"center"}} onClick={()=>sOp(false)}>Aplicar</button>
    </div>}
  </div>
)};
/* ═══ FUZZY SEARCH ═══ */
const fuzzyMatch=(text,query)=>{if(!query||!text)return false;const t=text.toLowerCase(),q=query.toLowerCase();if(t.includes(q))return true;let ti=0;for(let qi=0;qi<q.length;qi++){const c=q[qi];let found=false;while(ti<t.length){if(t[ti]===c){found=true;ti++;break;}ti++;}if(!found)return false;}return true;};

const applyF=(items,f)=>{let r=items;if(f.urg&&f.urg!=="all")r=r.filter(p=>uL(p.diasRestantes)===f.urg);if(f.st&&f.st!=="all")r=r.filter(p=>p.status===f.st);if(f.ph&&f.ph!=="all")r=r.filter(p=>p.fase===f.ph);if(f.peca&&f.peca!=="all")r=r.filter(p=>p.tipoPeca===f.peca);if(f.tr&&f.tr!=="all")r=r.filter(p=>p.tribunal===f.tr);if(f.dtIni)r=r.filter(p=>p.prazoFinal&&toISO(toD(p.prazoFinal))>=f.dtIni);if(f.dtFim)r=r.filter(p=>p.prazoFinal&&toISO(toD(p.prazoFinal))<=f.dtFim);if(f.semMov)r=r.filter(p=>(p.semMov||0)>=Number(f.semMov));if(f.dep==="Sim")r=r.filter(p=>p.depTerc);if(f.dep==="Não")r=r.filter(p=>!p.depTerc);if(f.reun==="Sim")r=r.filter(p=>p.reuniao);if(f.reun==="Não")r=r.filter(p=>!p.reuniao);if(f.sust==="Sim")r=r.filter(p=>p.sustentacao);if(f.sust==="Não")r=r.filter(p=>!p.sustentacao);if(f.semAcao==="Sim")r=r.filter(p=>!p.proxProv);if(f.semAcao==="Não")r=r.filter(p=>!!p.proxProv);if(f.semResp==="Sim")r=r.filter(p=>!p.responsavel);if(f.semResp==="Não")r=r.filter(p=>!!p.responsavel);if(f.resp){const q=f.resp.toLowerCase();r=r.filter(p=>(p.responsavel||"").toLowerCase().includes(q))}if(f.sq){const q=f.sq;r=r.filter(p=>fuzzyMatch(p.num||"",q)||fuzzyMatch(p.numeroSEI||"",q)||fuzzyMatch(p.assunto||"",q)||fuzzyMatch(p.responsavel||"",q)||fuzzyMatch(p.orgao||"",q)||fuzzyMatch(p.interessado||"",q)||fuzzyMatch(p.parteContraria||"",q)||fuzzyMatch(p.tipoPeca||"",q)||fuzzyMatch(p.tribunal||"",q)||fuzzyMatch((p.tags||[]).join(" "),q))}return r};

/* ═══ CONFIRM DIALOG ═══ */
function ConfirmDialog({title,msg,onConfirm,onCancel,danger}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.82)",backdropFilter:"blur(8px)",zIndex:2000,display:"flex",justifyContent:"center",alignItems:"center",padding:20}} onClick={function(e){if(e.target===e.currentTarget)onCancel();}}>
      <div className="cj-sc" style={{background:K.modal,border:"1px solid "+(danger?K.cr:K.ac)+"33",borderRadius:20,padding:24,maxWidth:420,width:"100%",boxShadow:"0 24px 60px rgba(0,0,0,.7)"}}>
        <h3 style={{margin:"0 0 8px",fontSize:16,fontWeight:800,color:danger?K.cr:K.txt}}>{title}</h3>
        <div style={{fontSize:13,color:K.dim,lineHeight:1.6,marginBottom:20}}>{msg}</div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button onClick={onCancel} style={{...btnGhost,padding:"8px 16px",fontSize:12}}>Cancelar</button>
          <button onClick={onConfirm} style={{...btnPrim,padding:"8px 16px",fontSize:12,color:danger?K.cr:K.ac,borderColor:danger?K.cr+"55":K.ac+"55",background:danger?K.crG:K.acG}}>{danger?"Confirmar exclusão":"Confirmar"}</button>
        </div>
      </div>
    </div>
  );
}

/* ═══ QUICK-ADD MODAL (Cmd+N) ═══ */
function QuickAddModal({dp,onClose,st}){
  var sT=useState("jud");var tipo=sT[0],setTipo=sT[1];
  var sNum=useState("");var num=sNum[0],setNum=sNum[1];
  var sAss=useState("");var ass=sAss[0],setAss=sAss[1];
  var sPeca=useState("Manifestação");var peca=sPeca[0],setPeca=sPeca[1];
  var sPrazo=useState(30);var prazo=sPrazo[0],setPrazo=sPrazo[1];
  var sDup=useState(null);var dup=sDup[0],setDup=sDup[1];
  /* Detecção de duplicata */
  var checkDup=function(v){setNum(v);if(!v||v.length<5){setDup(null);return;}var norm=v.replace(/[.\-\/\s]/g,"");var found=[...st.adm,...st.jud].find(function(p){return p.num&&p.num.replace(/[.\-\/\s]/g,"")===norm;});setDup(found||null);};
  var salvar=function(){
    if(tipo==="jud"){dp({type:"ADD_J",d:{num:num,assunto:ass,tipoPeca:peca,prazoFinal:addD(NOW,prazo)}});}
    else{dp({type:"ADD_A",d:{num:num,assunto:ass,tipoPeca:peca,prazoFinal:addD(NOW,prazo)}});}
    onClose();
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.82)",backdropFilter:"blur(10px)",zIndex:1800,display:"flex",justifyContent:"center",alignItems:"center",padding:20}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-sc" style={{background:K.modal,border:"1px solid "+K.ac+"33",borderRadius:22,padding:24,maxWidth:480,width:"100%",boxShadow:"0 28px 70px rgba(0,0,0,.8)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <Zap size={20} color={K.ac}/><h3 style={{margin:0,fontSize:16,fontWeight:800,color:K.ac,fontFamily:"Orbitron,sans-serif"}}>Cadastro Rápido</h3>
          <span style={{marginLeft:"auto",fontSize:10,color:K.dim,background:"rgba(255,255,255,.05)",padding:"2px 8px",borderRadius:6,fontFamily:"monospace"}}>Cmd+N</span>
          <button onClick={onClose} style={{background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={18}/></button>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <button onClick={function(){setTipo("jud");}} style={{flex:1,padding:"8px",borderRadius:10,border:"1px solid "+(tipo==="jud"?K.pu+"55":K.brd),background:tipo==="jud"?K.puG:"transparent",color:tipo==="jud"?K.pu:K.dim,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Judicial</button>
          <button onClick={function(){setTipo("adm");}} style={{flex:1,padding:"8px",borderRadius:10,border:"1px solid "+(tipo==="adm"?K.ac+"55":K.brd),background:tipo==="adm"?K.acG:"transparent",color:tipo==="adm"?K.ac:K.dim,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Administrativo</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div><label style={lblSt}>Número do processo</label><input style={inpSt} value={num} onChange={function(e){checkDup(e.target.value);}} placeholder="0000000-00.0000.0.00.0000"/></div>
          {dup&&<div style={{padding:"8px 12px",borderRadius:8,background:K.waG,border:"1px solid "+K.wa+"44",fontSize:11,color:K.wa}}>Processo já cadastrado: {dup.assunto} ({dup.status})</div>}
          <div><label style={lblSt}>Assunto</label><input style={inpSt} value={ass} onChange={function(e){setAss(e.target.value);}} placeholder="Descrição breve do processo"/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div><label style={lblSt}>Tipo de peça</label><select style={inpSt} value={peca} onChange={function(e){setPeca(e.target.value);}}>{TIPOS_PECA.map(function(t){return <option key={t} value={t} style={{background:K.modal}}>{t}</option>;})}</select></div>
            <div><label style={lblSt}>Prazo (dias úteis)</label><input type="number" style={inpSt} value={prazo} onChange={function(e){setPrazo(Number(e.target.value)||30);}} min="1" max="365"/></div>
          </div>
        </div>
        <button onClick={salvar} disabled={!ass.trim()||!!dup} style={{...btnPrim,width:"100%",justifyContent:"center",padding:"11px",marginTop:14,opacity:(!ass.trim()||!!dup)?0.4:1,cursor:(!ass.trim()||!!dup)?"not-allowed":"pointer"}}>
          <Plus size={14}/>Cadastrar {tipo==="jud"?"Judicial":"Administrativo"}
        </button>
      </div>
    </div>
  );
}

/* ═══ BULK ACTION BAR ═══ */
function BulkActionBar({selected,onClear,dp,items}){
  var sAction=useState("");var action=sAction[0],setAction=sAction[1];
  var sValue=useState("");var value=sValue[0],setValue=sValue[1];
  if(!selected||!selected.length) return null;
  var aplicar=function(){
    if(!action||!value) return;
    selected.forEach(function(id){
      var proc=items.find(function(p){return p.id===id;});
      if(!proc) return;
      var ch={};
      if(action==="status") ch.status=value;
      if(action==="fase") ch.fase=value;
      if(action==="responsavel") ch.responsavel=value;
      dp({type:"UPD",id:id,isAdm:proc.tipo==="adm",ch:ch});
    });
    onClear();setAction("");setValue("");
  };
  return(
    <div className="cj-sc" style={{position:"fixed",bottom:60,left:"50%",transform:"translateX(-50%)",zIndex:500,display:"flex",alignItems:"center",gap:12,padding:"10px 20px",borderRadius:16,background:K.modal,border:"1px solid "+K.ac+"44",boxShadow:"0 12px 40px rgba(0,0,0,.6),0 0 20px "+K.ac+"22",backdropFilter:"blur(14px)"}}>
      <div style={{fontSize:13,fontWeight:700,color:K.ac,fontFamily:"Orbitron,monospace"}}>{selected.length}</div>
      <span style={{fontSize:12,color:K.dim}}>selecionado{selected.length>1?"s":""}</span>
      <select style={{...inpSt,width:120,padding:"6px 8px",fontSize:11}} value={action} onChange={function(e){setAction(e.target.value);setValue("");}}>
        <option value="" style={{background:K.modal}}>Ação...</option>
        <option value="status" style={{background:K.modal}}>Alterar Status</option>
        <option value="fase" style={{background:K.modal}}>Alterar Fase</option>
        <option value="responsavel" style={{background:K.modal}}>Responsável</option>
      </select>
      {action==="status"&&<select style={{...inpSt,width:140,padding:"6px 8px",fontSize:11}} value={value} onChange={function(e){setValue(e.target.value);}}><option value="">Selecione...</option>{STS.map(function(s){return <option key={s} value={s} style={{background:K.modal}}>{s}</option>;})}</select>}
      {action==="fase"&&<select style={{...inpSt,width:140,padding:"6px 8px",fontSize:11}} value={value} onChange={function(e){setValue(e.target.value);}}><option value="">Selecione...</option>{PHS.map(function(s){return <option key={s} value={s} style={{background:K.modal}}>{s}</option>;})}</select>}
      {action==="responsavel"&&<input style={{...inpSt,width:140,padding:"6px 8px",fontSize:11}} value={value} onChange={function(e){setValue(e.target.value);}} placeholder="Nome"/>}
      <button onClick={aplicar} disabled={!action||!value} style={{...btnPrim,padding:"6px 14px",fontSize:11,opacity:(!action||!value)?0.4:1}}>Aplicar</button>
      <button onClick={onClear} style={{...btnGhost,padding:"6px 10px",fontSize:11}}>Limpar</button>
    </div>
  );
}

/* ═══ AUDIT LOG PAGE ═══ */
const AuditLogPg=({st})=>{
  var log=st.auditLog||[];
  var sFilter=useState("");var filter=sFilter[0],setFilter=sFilter[1];
  var filtered=filter?log.filter(function(e){return e.action.toLowerCase().includes(filter.toLowerCase())||e.detail.toLowerCase().includes(filter.toLowerCase());}):log;
  var actionLabel=function(a){var map={"UPD":"Atualização","ADD_A":"Novo admin","ADD_J":"Novo judicial","DEL_P":"Exclusão","COMPLETE_P":"Conclusão","LINK_P":"Vinculação","UNLINK_P":"Desvinculação","ADD_MOV":"Movimentação","TCLP":"Checklist","ADD_R":"Nova reunião","ADD_S":"Nova sustentação","ADD_NOTA":"Nova nota","ADD_LEMBRETE":"Novo lembrete"};return map[a]||a;};
  return(
    <div className="cj-pg">
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <History size={22} color={K.ac}/><h2 style={{margin:0,fontSize:22,fontWeight:800,color:K.txt}}>Log de Auditoria</h2>
        <span style={{fontSize:12,color:K.dim,fontFamily:"monospace"}}>{filtered.length} registros</span>
        <input style={{...inpSt,maxWidth:200,padding:"6px 12px",fontSize:12,marginLeft:"auto"}} value={filter} onChange={function(e){setFilter(e.target.value);}} placeholder="Filtrar ações..."/>
      </div>
      {!filtered.length&&<EmptyState icon="clock" color={K.dim2} title="Nenhum registro de auditoria" sub="As ações no app serão registradas automaticamente aqui"/>}
      <div style={{display:"flex",flexDirection:"column",gap:4,maxHeight:600,overflowY:"auto"}}>
        {filtered.slice(0,100).map(function(e,i){return(
          <div key={i} style={{display:"flex",gap:12,alignItems:"center",padding:"8px 14px",borderRadius:10,background:i%2===0?"rgba(255,255,255,.02)":"transparent",border:"1px solid "+K.brd}}>
            <div style={{fontSize:9,color:K.dim,fontFamily:"'JetBrains Mono',monospace",minWidth:130}}>{new Date(e.ts).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})}</div>
            <div style={{padding:"2px 8px",borderRadius:6,background:K.acG,color:K.ac,fontSize:10,fontWeight:700,minWidth:90,textAlign:"center"}}>{actionLabel(e.action)}</div>
            <div style={{fontSize:11,color:K.txt,flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}} title={e.detail}>{e.detail||"—"}</div>
          </div>
        );})}
      </div>
    </div>
  );
};

/* ═══ PROCESS LINK PANEL (inside DetMod) ═══ */
function ProcessLinkPanel({proc,st,dp,ss}){
  var linked=(proc.linkedIds||[]).map(function(id){return[...st.adm,...st.jud].find(function(p){return p.id===id;});}).filter(Boolean);
  var sSearch=useState("");var sq=sSearch[0],setSq=sSearch[1];
  var all=[...st.adm,...st.jud].filter(function(p){return p.id!==proc.id&&!(proc.linkedIds||[]).includes(p.id);});
  var results=sq.length>=2?all.filter(function(p){return fuzzyMatch(p.num||"",sq)||fuzzyMatch(p.assunto||"",sq);}).slice(0,5):[];
  return(
    <div style={{marginBottom:16}}>
      <div style={{...lblSt,marginBottom:6}}>Processos vinculados</div>
      {linked.length>0&&<div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:8}}>
        {linked.map(function(lp){return(
          <div key={lp.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:8,background:"rgba(0,229,255,.04)",border:"1px solid "+K.brd,cursor:"pointer"}} onClick={function(){ss(lp);}}>
            <Link size={12} color={K.ac}/>
            <span style={{fontSize:11,color:K.ac,fontFamily:"monospace"}}>{lp.num||"—"}</span>
            <span style={{fontSize:11,color:K.txt,flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{lp.assunto}</span>
            <button onClick={function(e){e.stopPropagation();dp({type:"UNLINK_P",id1:proc.id,id2:lp.id});}} style={{background:"none",border:"none",color:K.dim,cursor:"pointer",padding:2}}><X size={12}/></button>
          </div>
        );})}
      </div>}
      <div style={{display:"flex",gap:6}}>
        <input style={{...inpSt,flex:1,padding:"6px 10px",fontSize:11}} value={sq} onChange={function(e){setSq(e.target.value);}} placeholder="Buscar processo para vincular..."/>
      </div>
      {results.length>0&&<div style={{marginTop:4,border:"1px solid "+K.brd,borderRadius:8,overflow:"hidden"}}>
        {results.map(function(rp){return(
          <div key={rp.id} onClick={function(){dp({type:"LINK_P",id1:proc.id,id2:rp.id});setSq("");}} style={{padding:"6px 10px",fontSize:11,cursor:"pointer",display:"flex",gap:8,alignItems:"center",borderBottom:"1px solid "+K.brd}} onMouseEnter={function(e){e.currentTarget.style.background="rgba(0,229,255,.06)";}} onMouseLeave={function(e){e.currentTarget.style.background="transparent";}}>
            <Plus size={10} color={K.su}/><span style={{color:K.ac,fontFamily:"monospace"}}>{rp.num||"—"}</span><span style={{color:K.txt}}>{rp.assunto}</span>
          </div>
        );})}
      </div>}
    </div>
  );
}

/* ═══ PDF FICHA EXPORT ═══ */
var exportProcessPDF=function(p){
  var html='<!DOCTYPE html><html><head><meta charset="utf-8"><title>Ficha - '+((p.num||p.assunto)||"Processo")+'</title><style>body{font-family:Arial,sans-serif;max-width:700px;margin:20px auto;color:#1a1a1a;font-size:13px;line-height:1.6}h1{font-size:18px;border-bottom:2px solid #0284c7;padding-bottom:8px;color:#0284c7}h2{font-size:14px;margin-top:16px;color:#334155;border-bottom:1px solid #e2e8f0;padding-bottom:4px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}.field{padding:6px 10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px}.field-l{font-size:10px;color:#64748b;text-transform:uppercase;font-weight:600}.field-v{font-size:13px;margin-top:2px}.badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600}ul{padding-left:20px}li{margin-bottom:4px}.footer{margin-top:24px;padding-top:8px;border-top:1px solid #e2e8f0;font-size:10px;color:#94a3b8;text-align:center}@media print{body{margin:0}}</style></head><body>';
  html+='<h1>COJUR/CFM — Ficha do Processo</h1>';
  html+='<div class="grid">';
  var fields=[["Número",p.num||"—"],["SEI",p.numeroSEI||"—"],["Assunto",p.assunto||"—"],["Status",p.status||"—"],["Tipo",p.tipo==="jud"?"Judicial":"Administrativo"],["Tipo de Peça",p.tipoPeca||"—"],["Responsável",p.responsavel||"—"],["Fase",p.fase||"—"]];
  if(p.tipo==="jud"){fields.push(["Tribunal",p.tribunal||"—"],["Tipo de Ação",p.tipoAcao||"—"],["Parte Contrária",p.parteContraria||"—"]);}
  else{fields.push(["Órgão",p.orgao||"—"],["Interessado",p.interessado||"—"]);}
  fields.push(["Prazo Final",p.prazoFinal?fmt(toD(p.prazoFinal)):"—"],["Dias Úteis Restantes",(p.diasRestantes||0)+"du"],["Score",p.score||0],["Impacto",p.impacto||3],["Complexidade",p.complexidade||3]);
  fields.forEach(function(f){html+='<div class="field"><div class="field-l">'+f[0]+'</div><div class="field-v">'+f[1]+'</div></div>';});
  html+='</div>';
  if(p.proxProv){html+='<h2>Próxima Providência</h2><p>'+p.proxProv+'</p>';}
  if(p.obs){html+='<h2>Observações</h2><p>'+p.obs.replace(/\n/g,"<br>")+'</p>';}
  if(p.destaque){html+='<h2>Destaque</h2><p>'+p.destaque+'</p>';}
  if(p.checklist&&p.checklist.length){html+='<h2>Checklist de Elaboração</h2><ul>';p.checklist.forEach(function(c){var t=typeof c==="string"?c:c.text;var d=typeof c==="object"&&c.done;html+='<li style="'+(d?"text-decoration:line-through;color:#94a3b8":"")+'">'+t+'</li>';});html+='</ul>';}
  if(p.hist&&p.hist.length){html+='<h2>Histórico de Movimentações</h2><ul>';p.hist.slice().reverse().forEach(function(h){html+='<li><strong>'+(h.data||h.d?fmt(toD(h.data||h.d)):"—")+'</strong> — '+(h.txt||h.e||"—")+'</li>';});html+='</ul>';}
  html+='<div class="footer">Gerado pelo COJUR Nexus em '+new Date().toLocaleDateString("pt-BR")+" às "+new Date().toLocaleTimeString("pt-BR")+'</div>';
  html+='</body></html>';
  var w=window.open("","_blank");if(w){w.document.write(html);w.document.close();setTimeout(function(){w.print();},500);}
};

/* ═══ PUSH NOTIFICATION HELPER ═══ */
var requestPushPermission=function(){
  if(!("Notification" in window))return Promise.resolve(false);
  if(Notification.permission==="granted")return Promise.resolve(true);
  return Notification.requestPermission().then(function(p){return p==="granted";});
};
var sendPushNotification=function(title,body){
  if(Notification.permission==="granted"){try{new Notification(title,{body:body,icon:"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='16' fill='%23020816'/><text x='32' y='42' text-anchor='middle' font-size='24' fill='%2300e5ff'>N</text></svg>"});}catch(e){}}
};
var checkAndNotifyDeadlines=function(all){
  var criticos=all.filter(function(p){return p.diasRestantes>=0&&p.diasRestantes<=3&&!["Concluído","Arquivado","Suspenso"].includes(p.status);});
  if(criticos.length>0){
    sendPushNotification("COJUR Nexus — Prazos Críticos",criticos.length+" processo"+(criticos.length>1?"s":"")+" com prazo em até 3 dias úteis");
  }
};

/* ═══════════════════════════════════════ */
/* ═══ PAGES ═══ */
/* ═══════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════
/* ═══════════════════════════════════════════════════════════════
/* ═══════════════════════════════════════════════════════════════
   TOKAMAK OVERVIEW v1 — Reator de fusão nuclear
   Confinamento magnético toroidal · Canvas2D 60fps
   CRÍTICOS no núcleo (plasma quente) · NORMAIS no anel externo
   Partículas espiralam em órbita · campo toroidal · sparks de plasma
   ═══════════════════════════════════════════════════════════════ */
const TokamakOverview = ({ st, dp, sp, ss }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [hoveredCat, setHoveredCat] = useState(-1);
  const mouseRef = useRef({ x: -1, y: -1 });

  const all = useMemo(() => [...st.adm, ...st.jud], [st.adm, st.jud]);

  const categories = useMemo(() => {
    const ativos = all.filter(p => !["Concluído","Arquivado","Suspenso"].includes(p.status));
    return [
      {
        id: 'criticos', name: 'CRÍTICOS', label: 'até 2 du',
        ringR: 0.10,  /* core */
        color: [255, 80, 95],
        glow: [255, 160, 140],
        nav: 'priorities',
        isCore: true,
        processes: ativos.filter(p => p.diasRestantes >= 0 && p.diasRestantes <= 2),
      },
      {
        id: 'urgentes', name: 'URGENTES', label: '3 a 7 du',
        ringR: 0.20,
        color: [255, 200, 80],
        glow: [255, 230, 140],
        nav: 'today',
        processes: ativos.filter(p => p.diasRestantes > 2 && p.diasRestantes <= 7),
      },
      {
        id: 'atencao', name: 'ATENÇÃO', label: '8 a 15 du',
        ringR: 0.30,
        color: [255, 145, 70],
        glow: [255, 195, 130],
        nav: 'week',
        processes: ativos.filter(p => p.diasRestantes > 7 && p.diasRestantes <= 15),
      },
      {
        id: 'normais', name: 'NORMAIS', label: 'acima de 15 du',
        ringR: 0.40,
        color: [110, 180, 255],
        glow: [160, 215, 255],
        nav: 'judicial',
        processes: ativos.filter(p => p.diasRestantes > 15),
      },
    ];
  }, [all]);

  const categoriesRef = useRef(categories);
  useEffect(() => { categoriesRef.current = categories; }, [categories]);
  const hoveredCatRef = useRef(-1);
  useEffect(() => { hoveredCatRef.current = hoveredCat; }, [hoveredCat]);
  const hoveredRef = useRef(null);
  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, cx = 0, cy = 0, baseR = 0;

    function resize() {
      W = container.clientWidth;
      H = container.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      cx = W / 2;
      cy = H / 2;
      baseR = Math.min(W, H) * 0.95;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const PERSP = 0.42;  /* perspective squash for top-down view */
    const cats = categoriesRef.current;

    /* ═══ build particles per ring — ALL processes, no limit ═══ */
    const particles = [];
    cats.forEach((cat, ci) => {
      if (cat.isCore) return;
      const list = cat.processes;
      const N = list.length;
      list.forEach((proc, pi) => {
        particles.push({
          ci, pi, proc,
          theta: (pi / Math.max(N, 1)) * Math.PI * 2 + Math.random() * 0.15,
          speed: 0.0035 + Math.random() * 0.0025,
          rOff: (Math.random() - 0.5) * 0.012,
          glowPhase: Math.random() * Math.PI * 2,
        });
      });
    });

    /* core particles (CRÍTICOS) — ALL critical processes */
    const coreParticles = [];
    const criticos = cats[0];
    const coreN = criticos.processes.length;
    criticos.processes.forEach((proc, pi) => {
      coreParticles.push({
        proc, pi,
        theta: (pi / Math.max(coreN, 1)) * Math.PI * 2,
        radius: 0.025 + Math.random() * 0.07,
        speed: 0.013 + Math.random() * 0.015,
        glowPhase: Math.random() * Math.PI * 2,
        bobPhase: Math.random() * Math.PI * 2,
      });
    });

    /* toroidal field coils */
    const coils = [];
    for (let i = 0; i < 14; i++) {
      coils.push({
        theta: (i / 14) * Math.PI * 2,
        phase: i * 0.5,
      });
    }

    /* plasma sparks zooming on rings */
    const sparks = [];
    function spawnSpark() {
      sparks.push({
        ci: 1 + Math.floor(Math.random() * 3),
        theta: Math.random() * Math.PI * 2,
        speed: 0.025 + Math.random() * 0.020,
        life: 1,
      });
    }

    /* particle hit positions (recomputed each frame) */
    const particlePositions = [];

    let frame = 0;
    let raf;

    function animate() {
      raf = requestAnimationFrame(animate);
      frame++;
      const t = frame * 0.016;
      const hci = hoveredCatRef.current;

      /* ═══ background ═══ */
      ctx.fillStyle = '#020308';
      ctx.fillRect(0, 0, W, H);

      /* ═══ HEX GRID BACKGROUND — futuristic floor pattern ═══ */
      ctx.save();
      const hexSz = 22;
      const hexW = hexSz * Math.sqrt(3);
      const hexH = hexSz * 1.5;
      const cols = Math.ceil(W / hexW) + 2;
      const rows = Math.ceil(H / hexH) + 2;
      ctx.lineWidth = 0.5;
      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const xOff = (r % 2 === 0) ? 0 : hexW / 2;
          const hxC = c * hexW + xOff;
          const hyC = r * hexH;
          /* fade by distance from center */
          const dx = hxC - cx, dy = hyC - cy;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const fade = Math.max(0, 1 - dist / (Math.max(W, H) * 0.45));
          if (fade < 0.05) continue;
          ctx.strokeStyle = `rgba(80, 200, 255, ${0.10 * fade})`;
          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const ang = (k / 6) * Math.PI * 2 + Math.PI / 6;
            const phx = hxC + Math.cos(ang) * hexSz;
            const phy = hyC + Math.sin(ang) * hexSz;
            if (k === 0) ctx.moveTo(phx, phy); else ctx.lineTo(phx, phy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();

      /* ambient confinement glow */
      const haloR = baseR * 0.55;
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR);
      halo.addColorStop(0, 'rgba(140, 50, 80, 0.18)');
      halo.addColorStop(0.4, 'rgba(80, 30, 90, 0.10)');
      halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.ellipse(cx, cy, haloR, haloR * (PERSP + 0.45), 0, 0, Math.PI * 2);
      ctx.fill();

      /* ═══ RADAR SWEEP BEAM — rotating scanner ═══ */
      ctx.save();
      const sweepAng = (t * 0.5) % (Math.PI * 2);
      const sweepLen = baseR * 0.48;
      const sweepGrad = ctx.createConicGradient
        ? ctx.createConicGradient(sweepAng, cx, cy)
        : null;
      if (sweepGrad) {
        sweepGrad.addColorStop(0, 'rgba(80, 200, 255, 0.22)');
        sweepGrad.addColorStop(0.04, 'rgba(80, 200, 255, 0.10)');
        sweepGrad.addColorStop(0.12, 'rgba(80, 200, 255, 0)');
        sweepGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = sweepGrad;
        ctx.beginPath();
        ctx.ellipse(cx, cy, sweepLen, sweepLen * (PERSP + 0.18), 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        /* fallback for browsers without conic gradient */
        ctx.strokeStyle = 'rgba(80, 200, 255, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sweepAng) * sweepLen, cy + Math.sin(sweepAng) * sweepLen * (PERSP + 0.18));
        ctx.stroke();
      }
      ctx.restore();

      /* ═══ chamber outer boundary (octagon) ═══ */
      const chamberR = baseR * 0.48;
      ctx.strokeStyle = 'rgba(127, 174, 204, 0.20)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let s = 0; s <= 8; s++) {
        const ang = (s / 8) * Math.PI * 2 + Math.PI / 8;
        const px = cx + Math.cos(ang) * chamberR;
        const py = cy + Math.sin(ang) * chamberR * (PERSP + 0.18);
        if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();

      /* ═══ ANIMATED PULSE traveling around chamber border ═══ */
      const pulseAng = (t * 0.6) % (Math.PI * 2);
      const pulseTrail = 0.25;  /* arc length */
      ctx.save();
      ctx.strokeStyle = 'rgba(80, 220, 255, 0.85)';
      ctx.lineWidth = 1.6;
      ctx.shadowColor = 'rgba(80, 220, 255, 0.7)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      const segs = 14;
      for (let s = 0; s <= segs; s++) {
        const tt = s / segs;
        const ang = pulseAng + tt * pulseTrail;
        const px = cx + Math.cos(ang) * chamberR;
        const py = cy + Math.sin(ang) * chamberR * (PERSP + 0.18);
        if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();

      /* ═══ TACTICAL TICK MARKS — radial markers every 15° ═══ */
      ctx.strokeStyle = 'rgba(127, 184, 224, 0.30)';
      ctx.lineWidth = 0.6;
      for (let k = 0; k < 24; k++) {
        const ang = (k / 24) * Math.PI * 2;
        const isMajor = k % 6 === 0;  /* major tick every 90° */
        const tickLen = isMajor ? 7 : 3;
        const tickR1 = chamberR + 2;
        const tickR2 = chamberR + 2 + tickLen;
        const x1 = cx + Math.cos(ang) * tickR1;
        const y1 = cy + Math.sin(ang) * tickR1 * (PERSP + 0.18);
        const x2 = cx + Math.cos(ang) * tickR2;
        const y2 = cy + Math.sin(ang) * tickR2 * (PERSP + 0.18);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      /* corner anchors */
      for (let s = 0; s < 8; s++) {
        const ang = (s / 8) * Math.PI * 2 + Math.PI / 8;
        const px = cx + Math.cos(ang) * chamberR;
        const py = cy + Math.sin(ang) * chamberR * (PERSP + 0.18);
        ctx.fillStyle = 'rgba(127, 184, 224, 0.7)';
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
        /* outer glow ring */
        ctx.fillStyle = 'rgba(80, 220, 255, 0.15)';
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ═══ toroidal field coils (radial spokes) ═══ */
      coils.forEach(coil => {
        const ang = coil.theta + Math.sin(t * 0.3 + coil.phase) * 0.015;
        const outerR = chamberR;
        const innerR = baseR * 0.06;
        const ox = cx + Math.cos(ang) * outerR;
        const oy = cy + Math.sin(ang) * outerR * (PERSP + 0.18);
        const ix = cx + Math.cos(ang) * innerR;
        const iy = cy + Math.sin(ang) * innerR * (PERSP + 0.18);
        const intensity = 0.13 + 0.10 * Math.sin(t * 0.7 + coil.phase * 2);
        ctx.strokeStyle = `rgba(127, 184, 224, ${intensity})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(ix, iy);
        ctx.stroke();
      });

      /* ═══ ring orbits ═══ */
      cats.forEach((cat, ci) => {
        if (cat.isCore) return;
        const r = cat.ringR * baseR;
        const isHov = ci === hci;
        const alpha = isHov ? 0.45 : 0.20;
        ctx.strokeStyle = `rgba(${cat.color[0]},${cat.color[1]},${cat.color[2]},${alpha})`;
        ctx.lineWidth = isHov ? 1.4 : 0.7;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * PERSP, 0, 0, Math.PI * 2);
        ctx.stroke();
        if (isHov) {
          ctx.strokeStyle = `rgba(${cat.color[0]},${cat.color[1]},${cat.color[2]},0.12)`;
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.ellipse(cx, cy, r, r * PERSP, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      /* ═══ update particles ═══ */
      particles.forEach(p => { p.theta += p.speed; });
      coreParticles.forEach(p => { p.theta += p.speed; });

      /* ═══ update sparks ═══ */
      if (frame % 18 === 0) spawnSpark();
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.theta += sp.speed;
        sp.life -= 0.008;
        if (sp.life <= 0) sparks.splice(i, 1);
      }

      /* count particles per ring for density-based sizing */
      const ringCounts = [0, 0, 0, 0, 0];
      particles.forEach(p => { ringCounts[p.ci]++; });

      /* identify the actively hovered particle for dramatic highlighting */
      const hovInfo = hoveredRef.current;
      const activeProc = (hovInfo && hovInfo.type === 'particle') ? hovInfo.proc : null;
      const hasActive = !!activeProc;

      /* ═══ z-sort particles for proper depth rendering ═══ */
      const drawList = particles.map(p => {
        const cat = cats[p.ci];
        const r = (cat.ringR + p.rOff) * baseR;
        const px = cx + Math.cos(p.theta) * r;
        const py = cy + Math.sin(p.theta) * r * PERSP;
        const z = Math.sin(p.theta);
        return { p, cat, px, py, z, r };
      }).sort((a, b) => a.z - b.z);

      particlePositions.length = 0;

      /* ═══ draw particles back-to-front with 3D shading ═══ */
      drawList.forEach(({p, cat, px, py, z, r}) => {
        const isHovCat = p.ci === hci;
        const isActive = activeProc && p.proc === activeProc;
        /* stronger depth range for more 3D feel */
        const depthScale = 0.55 + (z + 1) * 0.30;   /* 0.55 (back) → 1.15 (front) */
        const depthAlpha = 0.45 + (z + 1) * 0.275;  /* 0.45 (back) → 1.00 (front) */

        /* density-based scaling: shrink particles when ring is crowded */
        const ringN = ringCounts[p.ci];
        const ringR = cat.ringR * baseR;
        const ringCircum = 2 * Math.PI * ringR;
        const idealSpacing = ringCircum / Math.max(ringN, 1);
        const densityScale = Math.min(1, idealSpacing / 14);
        const baseSz = 2.5 + 1.3 * densityScale;
        const trailLen = densityScale > 0.7 ? 6 : (densityScale > 0.4 ? 4 : 2);

        /* DIMMING: when an active particle exists elsewhere, fade the others */
        const dimFactor = (hasActive && !isActive) ? 0.45 : 1.0;
        /* ACTIVE BOOST: hovered particle gets dramatic size+brightness multiplier */
        const activeMul = isActive ? 2.2 : 1.0;
        /* category-hover gives milder boost */
        const catBoost = isHovCat && !isActive ? 1.25 : 1.0;

        /* trail behind */
        for (let ti = trailLen; ti > 0; ti--) {
          const tt = p.theta - p.speed * ti * 1.8;
          const tx = cx + Math.cos(tt) * r;
          const ty = cy + Math.sin(tt) * r * PERSP;
          const tAlpha = ((trailLen - ti) / trailLen) * 0.35 * depthAlpha * dimFactor;
          ctx.fillStyle = `rgba(${cat.color[0]},${cat.color[1]},${cat.color[2]},${tAlpha})`;
          ctx.beginPath();
          ctx.arc(tx, ty, 1.4 * depthScale * densityScale * activeMul, 0, Math.PI * 2);
          ctx.fill();
        }

        /* outer glow with category boost */
        const glowSz = baseSz * depthScale * catBoost * activeMul;
        const glowAlpha = (0.55 + (isHovCat ? 0.20 : 0)) * depthAlpha * dimFactor + 0.10 * Math.sin(t * 1.5 + p.glowPhase);

        /* ═══ ACTIVE PARTICLE: dramatic special effects ═══ */
        if (isActive) {
          /* 1. expanding pulse ring (sonar) */
          const pulseT = (t * 0.9) % 1;
          for (let pulseI = 0; pulseI < 2; pulseI++) {
            const pt = (pulseT + pulseI * 0.5) % 1;
            const pulseR = glowSz * (1 + pt * 5);
            ctx.strokeStyle = `rgba(${cat.glow[0]},${cat.glow[1]},${cat.glow[2]},${(1 - pt) * 0.55})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(px, py, pulseR, 0, Math.PI * 2);
            ctx.stroke();
          }
          /* 2. TARGETING RETICLE — tech-style corner brackets + ID label */
          ctx.save();
          const retSz = glowSz * 4.5;
          const retGap = glowSz * 1.3;
          const bracketLen = glowSz * 1.2;
          ctx.strokeStyle = `rgba(${cat.glow[0]},${cat.glow[1]},${cat.glow[2]},0.92)`;
          ctx.lineWidth = 1.4;
          ctx.lineCap = 'round';
          ctx.shadowColor = `rgba(${cat.glow[0]},${cat.glow[1]},${cat.glow[2]},0.6)`;
          ctx.shadowBlur = 6;
          /* 4 corner brackets (┌ ┐ └ ┘) */
          const corners = [
            [-retSz, -retSz, 1, 1],
            [ retSz, -retSz,-1, 1],
            [-retSz,  retSz, 1,-1],
            [ retSz,  retSz,-1,-1],
          ];
          corners.forEach(([dx, dy, sx, sy]) => {
            ctx.beginPath();
            ctx.moveTo(px + dx, py + dy + sy * bracketLen);
            ctx.lineTo(px + dx, py + dy);
            ctx.lineTo(px + dx + sx * bracketLen, py + dy);
            ctx.stroke();
          });
          /* horizontal + vertical lines with gap (crosshair with breathing space) */
          ctx.lineWidth = 1;
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.moveTo(px - retSz, py);  ctx.lineTo(px - retGap, py);
          ctx.moveTo(px + retGap, py); ctx.lineTo(px + retSz, py);
          ctx.moveTo(px, py - retSz);  ctx.lineTo(px, py - retGap);
          ctx.moveTo(px, py + retGap); ctx.lineTo(px, py + retSz);
          ctx.stroke();
          ctx.shadowBlur = 0;
          /* small ID label "TARGET" with process number */
          const labelText = `TGT • ${(p.proc.num || '').slice(-7) || '?????'}`;
          ctx.font = 'bold 9px "JetBrains Mono", monospace';
          const lblW = ctx.measureText(labelText).width + 10;
          const lblY = py - retSz - 14;
          ctx.fillStyle = `rgba(${cat.color[0]},${cat.color[1]},${cat.color[2]},0.85)`;
          ctx.fillRect(px - lblW/2, lblY, lblW, 14);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(labelText, px, lblY + 7);
          ctx.restore();

          /* 3. connection beam to chamber center */
          const beamGrad = ctx.createLinearGradient(cx, cy, px, py);
          beamGrad.addColorStop(0, `rgba(${cat.glow[0]},${cat.glow[1]},${cat.glow[2]},0.0)`);
          beamGrad.addColorStop(0.5, `rgba(${cat.glow[0]},${cat.glow[1]},${cat.glow[2]},0.15)`);
          beamGrad.addColorStop(1, `rgba(${cat.glow[0]},${cat.glow[1]},${cat.glow[2]},0.65)`);
          ctx.strokeStyle = beamGrad;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 6]);
          ctx.lineDashOffset = -t * 30;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        /* outer glow halo (multi-layered for active) */
        const haloLayers = isActive ? 3 : 1;
        for (let h = 0; h < haloLayers; h++) {
          const layerSz = glowSz * (4 + h * 1.2);
          const layerA = glowAlpha * (1 - h * 0.30);
          const lg = ctx.createRadialGradient(px, py, 0, px, py, layerSz);
          lg.addColorStop(0, `rgba(${cat.glow[0]},${cat.glow[1]},${cat.glow[2]},${layerA})`);
          lg.addColorStop(0.5, `rgba(${cat.color[0]},${cat.color[1]},${cat.color[2]},${layerA * 0.4})`);
          lg.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = lg;
          ctx.beginPath();
          ctx.arc(px, py, layerSz, 0, Math.PI * 2);
          ctx.fill();
        }

        /* 3D SHADING: cast shadow below (depth perception) */
        if (depthAlpha > 0.6) {
          ctx.fillStyle = `rgba(0, 10, 30, ${0.35 * dimFactor})`;
          ctx.beginPath();
          ctx.ellipse(px + glowSz * 0.25, py + glowSz * 0.45, glowSz * 0.7, glowSz * 0.25, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        /* dot core with 3D shading (gradient from upper-left) */
        const coreSz = glowSz * 0.55;
        const coreGrad = ctx.createRadialGradient(
          px - coreSz * 0.3, py - coreSz * 0.3, 0,
          px, py, coreSz
        );
        coreGrad.addColorStop(0, `rgba(255, 255, 255, ${depthAlpha * dimFactor})`);
        coreGrad.addColorStop(0.4, `rgba(${cat.glow[0]},${cat.glow[1]},${cat.glow[2]},${depthAlpha * dimFactor})`);
        coreGrad.addColorStop(1, `rgba(${Math.max(0, cat.color[0] - 40)},${Math.max(0, cat.color[1] - 40)},${Math.max(0, cat.color[2] - 40)},${depthAlpha * 0.85 * dimFactor})`);
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(px, py, coreSz, 0, Math.PI * 2);
        ctx.fill();

        /* 3D HIGHLIGHT: small bright highlight on upper-left (specular) */
        ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.95 * dimFactor})`;
        ctx.beginPath();
        ctx.arc(px - coreSz * 0.35, py - coreSz * 0.35, coreSz * 0.32, 0, Math.PI * 2);
        ctx.fill();

        /* white-hot center (extra bright for active) */
        ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * (isActive ? 1.0 : 0.85) * dimFactor})`;
        ctx.beginPath();
        ctx.arc(px, py, glowSz * (isActive ? 0.32 : 0.25), 0, Math.PI * 2);
        ctx.fill();

        /* ACTIVE: orbiting sparks around the active particle */
        if (isActive) {
          const sparkN = 6;
          const sparkOrbR = glowSz * 1.8;
          for (let s = 0; s < sparkN; s++) {
            const ang = (s / sparkN) * Math.PI * 2 + t * 2;
            const spx = px + Math.cos(ang) * sparkOrbR;
            const spy = py + Math.sin(ang) * sparkOrbR;
            ctx.fillStyle = `rgba(255, 255, 255, ${0.85 + 0.15 * Math.sin(t * 5 + s)})`;
            ctx.beginPath();
            ctx.arc(spx, spy, 1.8, 0, Math.PI * 2);
            ctx.fill();
            /* small glow */
            const sg = ctx.createRadialGradient(spx, spy, 0, spx, spy, 6);
            sg.addColorStop(0, `rgba(${cat.glow[0]},${cat.glow[1]},${cat.glow[2]},0.7)`);
            sg.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = sg;
            ctx.beginPath();
            ctx.arc(spx, spy, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        particlePositions.push({ x: px, y: py, hitR: Math.max(glowSz * 1.8, 10), p });
      });

      /* ═══ plasma sparks racing on rings ═══ */
      sparks.forEach(sp => {
        const cat = cats[sp.ci];
        const r = cat.ringR * baseR;
        const px = cx + Math.cos(sp.theta) * r;
        const py = cy + Math.sin(sp.theta) * r * PERSP;
        const a = sp.life * 0.85;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 8);
        grad.addColorStop(0, `rgba(255, 255, 240, ${a})`);
        grad.addColorStop(0.5, `rgba(${cat.glow[0]},${cat.glow[1]},${cat.glow[2]},${a * 0.6})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ═══ CORE PLASMA (CRÍTICOS) ═══ */
      const coreR = cats[0].ringR * baseR;
      /* outer pulsing confinement */
      const corePulse = 1 + 0.06 * Math.sin(t * 1.8);
      const cglowR = coreR * 1.4 * corePulse;
      const cgrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cglowR);
      cgrad.addColorStop(0, 'rgba(255, 200, 180, 0.70)');
      cgrad.addColorStop(0.25, 'rgba(255, 110, 100, 0.45)');
      cgrad.addColorStop(0.6, 'rgba(255, 70, 90, 0.20)');
      cgrad.addColorStop(1, 'rgba(255, 30, 60, 0)');
      ctx.fillStyle = cgrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, cglowR, cglowR * (PERSP + 0.30), 0, 0, Math.PI * 2);
      ctx.fill();

      /* core particles swirling — with active highlight + 3D shading */
      coreParticles.forEach(cp => {
        const cpR = cp.radius * baseR;
        const cpx = cx + Math.cos(cp.theta) * cpR;
        const cpy = cy + Math.sin(cp.theta) * cpR * (PERSP + 0.10);
        const bob = Math.sin(t * 2 + cp.bobPhase) * 1.5;
        const cpyB = cpy + bob;
        const intensity = 0.7 + 0.25 * Math.sin(t * 3 + cp.glowPhase);
        const isHovCore = hci === 0;
        const isActive = activeProc && cp.proc === activeProc;
        const dimFactor = (hasActive && !isActive) ? 0.45 : 1.0;
        const activeMul = isActive ? 2.0 : 1.0;
        const sz = (isHovCore ? 14 : 11) * activeMul;

        /* ACTIVE: pulse ring + flare */
        if (isActive) {
          const pulseT = (t * 0.9) % 1;
          for (let pulseI = 0; pulseI < 2; pulseI++) {
            const pt = (pulseT + pulseI * 0.5) % 1;
            const pulseR = sz * (1 + pt * 4);
            ctx.strokeStyle = `rgba(255, 200, 180, ${(1 - pt) * 0.65})`;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.arc(cpx, cpyB, pulseR, 0, Math.PI * 2);
            ctx.stroke();
          }
          /* lens flare cross */
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          const flareLen = sz * 5;
          const flareGrad = ctx.createLinearGradient(cpx - flareLen, cpyB, cpx + flareLen, cpyB);
          flareGrad.addColorStop(0, 'rgba(0,0,0,0)');
          flareGrad.addColorStop(0.5, 'rgba(255, 255, 240, 0.85)');
          flareGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.strokeStyle = flareGrad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(cpx - flareLen, cpyB);
          ctx.lineTo(cpx + flareLen, cpyB);
          ctx.stroke();
          const flareV = ctx.createLinearGradient(cpx, cpyB - flareLen, cpx, cpyB + flareLen);
          flareV.addColorStop(0, 'rgba(0,0,0,0)');
          flareV.addColorStop(0.5, 'rgba(255, 255, 240, 0.75)');
          flareV.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.strokeStyle = flareV;
          ctx.beginPath();
          ctx.moveTo(cpx, cpyB - flareLen);
          ctx.lineTo(cpx, cpyB + flareLen);
          ctx.stroke();
          ctx.restore();
        }

        /* outer halo */
        const grad = ctx.createRadialGradient(cpx, cpyB, 0, cpx, cpyB, sz);
        grad.addColorStop(0, `rgba(255, 240, 220, ${intensity * dimFactor})`);
        grad.addColorStop(0.4, `rgba(255, 110, 90, ${intensity * 0.65 * dimFactor})`);
        grad.addColorStop(1, 'rgba(255, 40, 60, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cpx, cpyB, sz, 0, Math.PI * 2);
        ctx.fill();

        /* second halo layer for active */
        if (isActive) {
          const g2 = ctx.createRadialGradient(cpx, cpyB, 0, cpx, cpyB, sz * 1.6);
          g2.addColorStop(0, `rgba(255, 180, 150, 0.55)`);
          g2.addColorStop(0.5, `rgba(255, 90, 80, 0.20)`);
          g2.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g2;
          ctx.beginPath();
          ctx.arc(cpx, cpyB, sz * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }

        /* 3D core: gradient from upper-left highlight → bottom shadow */
        const coreSz = sz * 0.32;
        const coreG = ctx.createRadialGradient(
          cpx - coreSz * 0.4, cpyB - coreSz * 0.4, 0,
          cpx, cpyB, coreSz
        );
        coreG.addColorStop(0, `rgba(255, 255, 255, ${intensity * dimFactor})`);
        coreG.addColorStop(0.5, `rgba(255, 220, 200, ${intensity * dimFactor})`);
        coreG.addColorStop(1, `rgba(220, 80, 90, ${intensity * 0.85 * dimFactor})`);
        ctx.fillStyle = coreG;
        ctx.beginPath();
        ctx.arc(cpx, cpyB, coreSz, 0, Math.PI * 2);
        ctx.fill();

        /* white-hot center */
        ctx.fillStyle = `rgba(255, 255, 255, ${intensity * (isActive ? 1.0 : 0.95) * dimFactor})`;
        ctx.beginPath();
        ctx.arc(cpx, cpyB, isActive ? 3.5 : 2.2, 0, Math.PI * 2);
        ctx.fill();

        /* ACTIVE: orbiting sparks */
        if (isActive) {
          for (let s = 0; s < 6; s++) {
            const ang = (s / 6) * Math.PI * 2 + t * 2.5;
            const sox = cpx + Math.cos(ang) * sz * 1.4;
            const soy = cpyB + Math.sin(ang) * sz * 1.4;
            ctx.fillStyle = `rgba(255, 255, 240, ${0.85 + 0.15 * Math.sin(t * 5 + s)})`;
            ctx.beginPath();
            ctx.arc(sox, soy, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        particlePositions.push({ x: cpx, y: cpyB, hitR: Math.max(sz * 0.85, 9), p: { ci: 0, proc: cp.proc } });
      });

      /* core ring boundary (subtle) */
      ctx.strokeStyle = `rgba(255, 90, 100, ${hci === 0 ? 0.6 : 0.30})`;
      ctx.lineWidth = hci === 0 ? 1.4 : 0.8;
      ctx.beginPath();
      ctx.ellipse(cx, cy, coreR, coreR * PERSP, 0, 0, Math.PI * 2);
      ctx.stroke();

      /* ═══ HOVER DETECTION ═══ */
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      let foundHover = null;
      let foundCatHover = -1;

      if (mx >= 0) {
        for (let i = particlePositions.length - 1; i >= 0; i--) {
          const pp = particlePositions[i];
          const dx = mx - pp.x;
          const dy = my - pp.y;
          if (dx * dx + dy * dy < pp.hitR * pp.hitR) {
            foundHover = { type: 'particle', proc: pp.p.proc, ci: pp.p.ci };
            foundCatHover = pp.p.ci;
            break;
          }
        }
        if (!foundHover) {
          const dx = mx - cx;
          const dy = (my - cy) / PERSP;
          const dist = Math.sqrt(dx * dx + dy * dy);
          for (let i = 0; i < cats.length; i++) {
            const cat = cats[i];
            const r = cat.ringR * baseR;
            if (cat.isCore) {
              if (dist < r * 1.3) {
                foundHover = { type: 'ring', cat, ci: i };
                foundCatHover = i;
                break;
              }
            } else {
              if (Math.abs(dist - r) < r * 0.12) {
                foundHover = { type: 'ring', cat, ci: i };
                foundCatHover = i;
                break;
              }
            }
          }
        }
      }

      /* update hover state if changed */
      const prev = hoveredRef.current;
      const same = (!prev && !foundHover) ||
        (prev && foundHover &&
         prev.type === foundHover.type &&
         prev.ci === foundHover.ci &&
         (prev.type !== 'particle' || prev.proc === foundHover.proc));
      if (!same) {
        setHovered(foundHover);
        hoveredRef.current = foundHover;
      }
      if (foundCatHover !== hoveredCatRef.current) {
        setHoveredCat(foundCatHover);
        hoveredCatRef.current = foundCatHover;
      }

      /* ═══ POST-PROCESS LAYERS — sci-fi tech overlays ═══ */

      /* OSCILLOSCOPE WAVE at top — "reactor frequency" */
      ctx.save();
      const oscY = 26;
      const oscH = 10;
      ctx.strokeStyle = 'rgba(80, 220, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.shadowColor = 'rgba(80, 220, 255, 0.5)';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      const samples = Math.max(60, Math.floor(W / 6));
      for (let i = 0; i <= samples; i++) {
        const x = (i / samples) * W;
        const y = oscY +
          Math.sin(i * 0.4 + t * 4) * oscH * 0.4 +
          Math.sin(i * 0.13 + t * 2.3) * oscH * 0.6 +
          (Math.random() - 0.5) * 1.2;  /* noise */
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      /* SCANLINES — moving horizontal stripes */
      ctx.save();
      ctx.globalAlpha = 0.04;
      const scanOff = (t * 18) % 4;
      ctx.strokeStyle = 'rgba(140, 220, 255, 1)';
      ctx.lineWidth = 0.5;
      for (let y = -4 + scanOff; y < H; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.restore();

      /* CORNER BRACKETS on canvas (tech frame) */
      ctx.save();
      ctx.strokeStyle = 'rgba(80, 220, 255, 0.55)';
      ctx.lineWidth = 1.2;
      ctx.shadowColor = 'rgba(80, 220, 255, 0.5)';
      ctx.shadowBlur = 4;
      const bL = 16;
      const off = 8;
      /* TL */
      ctx.beginPath();
      ctx.moveTo(off, off + bL); ctx.lineTo(off, off); ctx.lineTo(off + bL, off);
      ctx.stroke();
      /* TR */
      ctx.beginPath();
      ctx.moveTo(W - off - bL, off); ctx.lineTo(W - off, off); ctx.lineTo(W - off, off + bL);
      ctx.stroke();
      /* BL */
      ctx.beginPath();
      ctx.moveTo(off, H - off - bL); ctx.lineTo(off, H - off); ctx.lineTo(off + bL, H - off);
      ctx.stroke();
      /* BR */
      ctx.beginPath();
      ctx.moveTo(W - off - bL, H - off); ctx.lineTo(W - off, H - off); ctx.lineTo(W - off, H - off - bL);
      ctx.stroke();
      ctx.restore();

      /* CYAN EDGE VIGNETTE — subtle holographic frame */
      ctx.save();
      const vig = ctx.createRadialGradient(cx, cy, Math.min(W, H) * 0.42, cx, cy, Math.max(W, H) * 0.7);
      vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vig.addColorStop(0.7, 'rgba(0, 50, 90, 0.18)');
      vig.addColorStop(1, 'rgba(0, 30, 60, 0.40)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [categories]);

  /* ═══ event handlers ═══ */
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };
  const handleMouseLeave = () => {
    mouseRef.current.x = -1;
    mouseRef.current.y = -1;
    setHovered(null);
    setHoveredCat(-1);
  };
  const handleClick = () => {
    const h = hoveredRef.current;
    if (!h) return;
    if (h.type === 'particle' && h.proc) ss(h.proc);
    else if (h.type === 'ring' && h.cat) sp(h.cat.nav);
  };

  return (
    <div ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 50%, #0a0612 0%, #050310 50%, #02010a 100%)",
        border: "1px solid rgba(127,184,216,.18)",
        boxShadow: "0 24px 60px rgba(0,0,0,.65), inset 0 1px 0 rgba(127,184,216,.08)",
        marginBottom: 20,
        height: 380,
        cursor: hovered ? 'pointer' : 'default',
      }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block' }} />

      {/* corner brackets */}
      {[{t:10,l:10},{t:10,r:10},{b:10,l:10},{b:10,r:10}].map((pos, i) => (
        <div key={i} style={{position:"absolute",width:24,height:24,pointerEvents:"none",zIndex:2,...(pos.t!==undefined?{top:pos.t}:{bottom:pos.b}),...(pos.l!==undefined?{left:pos.l}:{right:pos.r})}}>
          <div style={{position:"absolute",top:0,height:1.5,width:20,background:"linear-gradient(90deg, #7faecc, transparent)",boxShadow:"0 0 8px #7faecc",...(pos.l!==undefined?{left:0}:{right:0})}}/>
          <div style={{position:"absolute",top:0,width:1.5,height:20,background:"linear-gradient(180deg, #7faecc, transparent)",boxShadow:"0 0 8px #7faecc",...(pos.l!==undefined?{left:0}:{right:0})}}/>
        </div>
      ))}

      {/* title */}
      <div style={{position:"absolute",top:14,left:18,pointerEvents:"none",zIndex:3}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontSize:20,color:"#ff8060",filter:"drop-shadow(0 0 10px rgba(255,128,96,.8))"}}>⚛</div>
          <div>
            <div style={{fontSize:13,fontWeight:900,color:"#bbd5ec",fontFamily:"Orbitron,sans-serif",letterSpacing:".25em",textShadow:"0 0 12px rgba(127,184,216,.6)"}}>TOKAMAK COJUR</div>
            <div style={{fontSize:9,color:"rgba(190,215,235,.45)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:".05em",marginTop:1}}>{all.length} processos · confinamento magnético · clique no anel ou partícula</div>
          </div>
        </div>
      </div>

      {/* category legends panel */}
      <div style={{position:"absolute",right:14,top:14,zIndex:3,fontFamily:"Orbitron,sans-serif",pointerEvents:"auto"}}>
        {categories.map((cat, ci) => {
          const isHov = ci === hoveredCat;
          return (
            <div key={cat.id}
              onClick={(e) => { e.stopPropagation(); sp(cat.nav); }}
              onMouseEnter={() => setHoveredCat(ci)}
              onMouseLeave={() => setHoveredCat(-1)}
              style={{
                display:"flex",alignItems:"center",gap:10,
                padding:"5px 10px",
                marginBottom:4,
                borderRadius:6,
                cursor:"pointer",
                minWidth:160,
                background: isHov ? `rgba(${cat.color[0]},${cat.color[1]},${cat.color[2]},0.18)` : 'rgba(8,4,12,0.55)',
                border: `1px solid rgba(${cat.color[0]},${cat.color[1]},${cat.color[2]},${isHov?0.65:0.25})`,
                backdropFilter:"blur(6px)",
                boxShadow: isHov ? `0 0 14px rgba(${cat.color[0]},${cat.color[1]},${cat.color[2]},0.35)` : 'none',
                transition:"all .2s",
              }}>
              <div style={{
                width:9, height:9, borderRadius:"50%",
                background:`rgb(${cat.color[0]},${cat.color[1]},${cat.color[2]})`,
                boxShadow:`0 0 10px rgb(${cat.color[0]},${cat.color[1]},${cat.color[2]})`,
              }}/>
              <div style={{flex:1}}>
                <div style={{
                  fontSize:9,
                  color:`rgb(${cat.color[0]},${cat.color[1]},${cat.color[2]})`,
                  fontWeight:800,
                  letterSpacing:".15em",
                  lineHeight:1.1,
                }}>{cat.name}</div>
                <div style={{
                  fontSize:8,
                  color:`rgba(${cat.color[0]},${cat.color[1]},${cat.color[2]},0.55)`,
                  letterSpacing:".05em",
                  marginTop:1,
                }}>{cat.label}</div>
              </div>
              <div style={{
                fontSize:14,
                color:`rgb(${cat.color[0]},${cat.color[1]},${cat.color[2]})`,
                fontWeight:900,
                fontFamily:"Orbitron,monospace",
                textShadow:`0 0 8px rgba(${cat.color[0]},${cat.color[1]},${cat.color[2]},0.6)`,
              }}>{cat.processes.length}</div>
            </div>
          );
        })}
      </div>

      {/* HUD bottom-left telemetry */}
      <div style={{position:"absolute",bottom:14,left:18,zIndex:3,pointerEvents:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"rgba(127,174,204,0.6)",letterSpacing:".1em",lineHeight:1.5}}>
        <div>FLUX MAGNÉTICO: 1.42 T</div>
        <div>TEMP CORE: 9.8e6 K</div>
        <div>CONFINEMENT: STABLE</div>
      </div>

      {/* HUD bottom-right */}
      <div style={{position:"absolute",bottom:14,right:18,zIndex:3,pointerEvents:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"rgba(127,174,204,0.6)",letterSpacing:".1em",textAlign:"right",lineHeight:1.5}}>
        <div>PARTÍCULAS: {all.length}</div>
        <div>NÚCLEO: {categories[0].processes.length} CRIT</div>
        <div>STATUS: <span style={{color:"#5fb260"}}>● ATIVO</span></div>
      </div>

      {/* hover detail card */}
      {hovered && hovered.type === 'particle' && hovered.proc && categories[hovered.ci] && (
        <div style={{
          position:"absolute",
          top:"50%", left:"50%",
          transform:"translate(-50%, 130px)",
          padding:"10px 16px",
          borderRadius:8,
          background:"rgba(8,4,12,.94)",
          border:`1px solid rgba(${categories[hovered.ci].color[0]},${categories[hovered.ci].color[1]},${categories[hovered.ci].color[2]},.55)`,
          boxShadow:`0 6px 18px rgba(0,0,0,.55), 0 0 24px rgba(${categories[hovered.ci].color[0]},${categories[hovered.ci].color[1]},${categories[hovered.ci].color[2]},.28)`,
          backdropFilter:"blur(10px)",
          pointerEvents:"none",
          fontFamily:"'JetBrains Mono',monospace",
          maxWidth:520,
          zIndex:4,
          animation:"tokFadeIn .2s ease-out",
        }}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <div style={{fontSize:9,color:`rgb(${categories[hovered.ci].color[0]},${categories[hovered.ci].color[1]},${categories[hovered.ci].color[2]})`,fontWeight:800,letterSpacing:".1em",fontFamily:"Orbitron,sans-serif"}}>
              ◈ {(hovered.proc.num||"").slice(-9)}
            </div>
            <div style={{fontSize:9,color:`rgba(${categories[hovered.ci].color[0]},${categories[hovered.ci].color[1]},${categories[hovered.ci].color[2]},.65)`}}>· {hovered.proc.diasRestantes>=0?hovered.proc.diasRestantes+'du':'—'}</div>
          </div>
          <div style={{fontSize:11,color:"rgba(220,235,250,.92)",fontWeight:600,maxWidth:480,lineHeight:1.4}}>
            {(hovered.proc.assunto||"").slice(0, 100)}{(hovered.proc.assunto||"").length>100?"…":""}
          </div>
        </div>
      )}

      <style>{`
        @keyframes tokFadeIn {
          from { opacity: 0; transform: translate(-50%, 138px); }
          to { opacity: 1; transform: translate(-50%, 130px); }
        }
      `}</style>
    </div>
  );
};






const DashPg=({st,dp,sp,ss})=>{
  const all=[...st.adm,...st.jud],crit=all.filter(p=>p.diasRestantes<=10);
  const urgData=[{name:"Crítico",value:crit.length,color:K.cr},{name:"Intermediário",value:all.filter(p=>p.diasRestantes>10&&p.diasRestantes<30).length,color:K.wa},{name:"Normal",value:all.filter(p=>p.diasRestantes>=30).length,color:K.su}];
  const wkD=Array.from({length:7},(_,i)=>{const d=addD(NOW,i);return{dia:d.toLocaleDateString("pt-BR",{weekday:"short"}).replace(".",""),n:all.filter(p=>p.dataProv&&diffD(toD(p.dataProv),d)===0).length}});
  const todayDue=all.filter(p=>p.diasRestantes<=0).sort((a,b)=>b.score-a.score);
  const next3=all.filter(p=>p.diasRestantes>=0&&p.diasRestantes<=3).sort((a,b)=>a.diasRestantes-b.diasRestantes);
  const noAction=all.filter(p=>!p.proxProv).sort((a,b)=>b.score-a.score);
  const stale=all.filter(p=>(p.semMov||0)>=7).sort((a,b)=>b.semMov-a.semMov);
  const alerts=[];
  all.filter(p=>isProtocolar(p)).forEach(p=>alerts.unshift({icon:Upload,color:K.su,title:"📤 PROTOCOLAR — aprovado pelo chefe",desc:`${p.num||"—"}: protocolar no ${p.tribunal||"tribunal"} imediatamente`}));
  all.filter(p=>isCorrecao(p)).forEach(p=>alerts.unshift({icon:PenLine,color:K.wa,title:"✏️ CORREÇÃO — retornado pelo chefe",desc:`${p.num||"—"}: revisar conforme orientação do contencioso`}));
  all.filter(p=>p.diasRestantes<=10&&p.semMov>=5).forEach(p=>alerts.push({icon:AlertTriangle,color:K.cr,title:"Prazo crítico parado",desc:`${p.num}: ${p.semMov}d sem movimentação`}));
  all.filter(p=>!p.proxProv).forEach(p=>alerts.push({icon:Target,color:K.wa,title:"Sem próxima providência",desc:`${p.num}: defina a próxima ação`}));
  all.filter(p=>!p.responsavel).forEach(p=>alerts.push({icon:Users,color:K.wa,title:"Sem responsável",desc:`${p.num}: preencher responsável`}));
  st.jud.filter(p=>!p.numeroSEI).forEach(p=>alerts.push({icon:FolderOpen,color:K.ac,title:"Judicial sem SEI vinculado",desc:p.num||p.assunto}));
  var todayStr=NOW.toISOString().slice(0,10);(st.lembretes||[]).filter(function(l){return !l.done&&l.data&&l.data<=todayStr;}).forEach(function(l){alerts.unshift({icon:Bell,color:K.wa,title:"⏰ Lembrete vencido",desc:l.texto});});
  st.reun.filter(r=>diffD(toD(r.data),NOW)>=0&&diffD(toD(r.data),NOW)<=2).forEach(r=>{if(!r.obs||!(r.checklist||[]).length)alerts.push({icon:Clock,color:K.wa,title:"Reunião incompleta",desc:r.titulo})});
  st.sust.filter(s=>diffD(toD(s.data),NOW)>=0&&diffD(toD(s.data),NOW)<=7).forEach(s=>{if(!s.obs||!(s.checklist||[]).length)alerts.push({icon:Gavel,color:K.pu,title:"Sustentação incompleta",desc:`${s.tribunal}: ${s.tema}`})});
  /* ═══ v41 · COJUR NEXUS UPGRADE · datasets reutilizaveis ═══ */
  /* DNA itens · prioriza criticos primeiro e carrega ref completa do processo */
  const cnDnaItems = all
    .slice()
    .sort(function(a,b){
      var da = a.diasRestantes == null ? 1e9 : a.diasRestantes;
      var db = b.diasRestantes == null ? 1e9 : b.diasRestantes;
      return da - db;
    })
    .slice(0, 14).map(function(p){
    var d = p.diasRestantes;
    var tipo = (p.tipoPeca && /sustent/i.test(p.tipoPeca)) ? "sust" : (p.tipo || "adm");
    var urg = "su";
    if (d != null) {
      if (d <= 5) urg = "cr";
      else if (d <= 14) urg = "wa";
      else if (d <= 28) urg = "ac";
    }
    return {
      ref: p,  // referência completa para o painel inspector
      l: (tipo === "jud" ? "Jud" : tipo === "sust" ? "Sust" : "Adm") + " · " + (d == null ? "—" : d) + "du",
      tipo: tipo, urg: urg, proc: p.num || p.numeroSEI || "—",
    };
  });

  return(
    <div className="cj-pg">
      <TokamakOverview st={st} dp={dp} sp={sp} ss={ss}/>
      {React.createElement(function(){var s=useState(false);var showR=s[0],sShowR=s[1];return React.createElement(React.Fragment,null,React.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:8,gap:8,flexWrap:"wrap"}},React.createElement("button",{onClick:function(){sp("timeline");},style:{...btnGhost,padding:"6px 12px",fontSize:11,color:"#00e5ff",borderColor:"rgba(0,229,255,.22)"}},"📅 Timeline"),React.createElement("button",{onClick:function(){sShowR(true);},style:{...btnGhost,padding:"6px 12px",fontSize:11,color:"#00e5ff",borderColor:"rgba(0,229,255,.22)"}},"📊 Relatório")),showR&&React.createElement(RelatorioModal,{st:st,onClose:function(){sShowR(false);}}));},null)}
      {/* ═══ v10 — CONFLICT DETECTION ALERT ═══ */}
      {React.createElement(ConflictAlert,{st:st,sp:sp})}
      {/* ═══ PROTOCOLAR / CORREÇÃO — top alert strip ═══ */}
      {(function(){var prot=all.filter(p=>isProtocolar(p));var corr=all.filter(p=>isCorrecao(p));if(!prot.length&&!corr.length)return null;return(
        <div style={{marginBottom:16,display:"grid",gridTemplateColumns:prot.length&&corr.length?"1fr 1fr":prot.length?"1fr":"1fr",gap:12}}>
          {prot.length>0&&<div className="cj-hud-tl cj-hud-br" style={{padding:"14px 18px",borderRadius:16,background:"linear-gradient(135deg,rgba(0,255,136,.12),rgba(0,255,136,.05))",border:"1px solid rgba(0,255,136,.45)",animation:"cjProtocolar 1.8s ease-in-out infinite",cursor:"pointer"}} onClick={()=>sp("protocolar")}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <span style={{fontSize:22}}>📤</span>
              <div><div style={{fontSize:11,color:"#00ff88",fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:"1px",textShadow:"0 0 8px rgba(0,255,136,.7)"}}>PROTOCOLAR NO TRIBUNAL</div>
              <div style={{fontSize:10,color:K.dim,marginTop:2}}>Aprovados pelo chefe do contencioso — aguardando protocolo</div></div>
              <div style={{marginLeft:"auto",fontSize:28,fontWeight:800,color:"#00ff88",fontFamily:"Orbitron,monospace",textShadow:"0 0 16px rgba(0,255,136,.8)"}}>{prot.length}</div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{prot.slice(0,4).map(p=><div key={p.id} onClick={e=>{e.stopPropagation();ss(p);}} style={{padding:"5px 10px",borderRadius:8,background:"rgba(0,255,136,.1)",border:"1px solid rgba(0,255,136,.25)",cursor:"pointer"}}><div style={{fontSize:10,color:"#00ff88",fontFamily:"'JetBrains Mono',monospace"}}>{p.num||"—"}</div><div style={{fontSize:11,color:K.txt,maxWidth:160,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.assunto}</div></div>)}{prot.length>4&&<span style={{fontSize:10,color:K.dim,padding:"5px 8px"}}>+{prot.length-4} mais</span>}</div>
          </div>}
          {corr.length>0&&<div className="cj-hud-tl cj-hud-br" style={{padding:"14px 18px",borderRadius:16,background:"linear-gradient(135deg,rgba(255,184,0,.12),rgba(255,184,0,.05))",border:"1px solid rgba(255,184,0,.45)",animation:"cjCorrecao 1.8s ease-in-out infinite",cursor:"pointer"}} onClick={()=>sp("correcao")}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <span style={{fontSize:22}}>✏️</span>
              <div><div style={{fontSize:11,color:"#ffb800",fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:"1px",textShadow:"0 0 8px rgba(255,184,0,.7)"}}>EM CORREÇÃO</div>
              <div style={{fontSize:10,color:K.dim,marginTop:2}}>Retornados pelo chefe para revisão antes do protocolo</div></div>
              <div style={{marginLeft:"auto",fontSize:28,fontWeight:800,color:"#ffb800",fontFamily:"Orbitron,monospace",textShadow:"0 0 16px rgba(255,184,0,.8)"}}>{corr.length}</div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{corr.slice(0,4).map(p=><div key={p.id} onClick={e=>{e.stopPropagation();ss(p);}} style={{padding:"5px 10px",borderRadius:8,background:"rgba(255,184,0,.1)",border:"1px solid rgba(255,184,0,.25)",cursor:"pointer"}}><div style={{fontSize:10,color:"#ffb800",fontFamily:"'JetBrains Mono',monospace"}}>{p.num||"—"}</div><div style={{fontSize:11,color:K.txt,maxWidth:160,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.assunto}</div></div>)}{corr.length>4&&<span style={{fontSize:10,color:K.dim,padding:"5px 8px"}}>+{corr.length-4} mais</span>}</div>
          </div>}
        </div>
      );})()}

      <div className="cj-st" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:24}}>
        {/* ═══ CARD TOTAL — destaque diferenciado ═══ */}
        <div className="cj-hud-tl cj-hud-br cj-border-glow" role="button" tabIndex={0} onClick={()=>sp("priorities")} style={{background:"linear-gradient(135deg, rgba(6,12,34,.98), rgba(2,5,20,.99))",border:"2px solid rgba(0,229,255,.45)",borderRadius:20,padding:"18px 18px 16px",display:"flex",flexDirection:"column",gap:6,position:"relative",overflow:"hidden",transition:"all .28s",cursor:"pointer",boxShadow:"0 0 28px rgba(0,229,255,.18), 0 0 60px rgba(184,77,255,.08), 0 18px 44px rgba(0,0,0,.5), inset 0 1px 0 rgba(0,229,255,.15)",gridColumn:"span 1"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 0 40px rgba(0,229,255,.3), 0 0 80px rgba(184,77,255,.15), 0 22px 50px rgba(0,0,0,.55)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 0 28px rgba(0,229,255,.18), 0 0 60px rgba(184,77,255,.08), 0 18px 44px rgba(0,0,0,.5), inset 0 1px 0 rgba(0,229,255,.15)";}}>
          <div style={{position:"absolute",inset:"0 0 auto 0",height:2,background:"linear-gradient(90deg, transparent, #00e5ff, #b84dff, transparent)",opacity:.9,pointerEvents:"none"}}/>
          <div style={{position:"absolute",inset:"auto 0 0 0",height:2,background:"linear-gradient(90deg, transparent, #b84dff, #00e5ff, transparent)",opacity:.5,pointerEvents:"none"}}/>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:42,height:42,borderRadius:14,background:"linear-gradient(135deg, rgba(0,229,255,.2), rgba(184,77,255,.15))",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 18px rgba(0,229,255,.3), 0 0 30px rgba(184,77,255,.15), inset 0 1px 0 rgba(255,255,255,.08)",border:"1px solid rgba(0,229,255,.35)"}}><Layers size={20} color="#00e5ff" style={{filter:"drop-shadow(0 0 8px rgba(0,229,255,.9))"}}/></div>
              <span style={{fontSize:10,color:"rgba(148,163,184,.9)",fontWeight:700,textTransform:"uppercase",letterSpacing:".8px"}}>Total Acervo</span>
            </div>
            <div className="cj-pulse" style={{width:10,height:10,borderRadius:"50%",background:"linear-gradient(135deg, #00e5ff, #b84dff)",boxShadow:"0 0 12px #00e5ff, 0 0 24px rgba(184,77,255,.5)"}}/>
          </div>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:8}}>
            <div style={{fontSize:40,fontWeight:900,background:"linear-gradient(135deg, #00e5ff, #b84dff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontFamily:"'Orbitron','JetBrains Mono',monospace",lineHeight:1,filter:"drop-shadow(0 0 12px rgba(0,229,255,.4))"}}>{all.length}</div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2}}>
              <span style={{fontSize:10,color:K.ac,fontFamily:"'JetBrains Mono',monospace",fontWeight:700}}>{st.adm.length} adm</span>
              <span style={{fontSize:10,color:K.pu,fontFamily:"'JetBrains Mono',monospace",fontWeight:700}}>{st.jud.length} jud</span>
            </div>
          </div>
          <span style={{fontSize:10,color:"rgba(78,106,138,.85)",fontFamily:"'JetBrains Mono',monospace"}}>processos ativos comigo</span>
        </div>
        <SC icon={Upload} label="Protocolar" value={all.filter(p=>isProtocolar(p)).length} color={K.su} sub="Aprovado pelo chefe" onClick={()=>sp("protocolar")}/>
        <SC icon={PenLine} label="Em Correção" value={all.filter(p=>isCorrecao(p)).length} color={K.wa} sub="Retornado p/ revisão" onClick={()=>sp("correcao")}/>
        <SC icon={Layers} label="Ativos" value={all.filter(p=>p.status==="Ativo").length} color={K.ac} onClick={()=>sp("priorities")} sparkData={(function(){var r=st.realizados||[];var d=[];for(var i=6;i>=0;i--){var day=addD(NOW,-i);var c=r.filter(function(x){return x.realizadoEm&&diffD(toD(x.realizadoEm),day)===0;}).length;d.push(c);}return d;})()}/>
        <SC icon={FolderOpen} label="Admin" value={st.adm.length} color={K.ac} onClick={()=>sp("admin")}/>
        <SC icon={Scale} label="Judiciais" value={st.jud.length} color={K.pu} onClick={()=>sp("judicial")}/>
        <SC icon={CheckCircle} label="Realizados" value={(st.realizados||[]).length} color={K.su} onClick={()=>sp("done")} sparkData={(function(){var r=st.realizados||[];var d=[];for(var i=6;i>=0;i--){var day=addD(NOW,-i);var c=r.filter(function(x){return x.realizadoEm&&diffD(toD(x.realizadoEm),day)===0;}).length;d.push(c);}return d;})()}/>
        <SC icon={Flame} label="Críticos" value={crit.length} color={K.cr} onClick={()=>sp("priorities")} sparkData={(function(){var d=[];for(var i=6;i>=0;i--){var day=addD(NOW,-i);var c=all.filter(function(p){var dr=bizDiff(toD(p.prazoFinal),day);return dr>=0&&dr<=10;}).length;d.push(c);}return d;})()}/>
        <SC icon={Target} label="Prov. Hoje" value={all.filter(p=>p.dataProv&&diffD(toD(p.dataProv),NOW)<=0).length} color={K.ac} onClick={()=>sp("today")}/>
        <SC icon={Users} label="Aguardando" value={all.filter(p=>p.depTerc).length} color={K.wa} onClick={()=>sp("waiting")}/>
        <SC icon={Gavel} label="Sust. Oral" value={st.sust.length} color={K.pu} sub={st.sust.length?`Próxima: ${fmtS(toD(st.sust[0].data))}`:"—"} onClick={()=>sp("agenda")}/>
        <SC icon={Calendar} label="Reuniões" value={st.reun.length} color={K.ac} sub={`Hoje: ${st.reun.filter(r=>diffD(toD(r.data),NOW)===0).length}`} onClick={()=>sp("agenda")}/>
        <SC icon={Plane} label="Viagens" value={st.viag.length} color={K.su} sub={st.viag.length?`Próxima: ${fmtS(toD(st.viag[0].dataIda))}`:"Nenhuma"} onClick={()=>sp("agenda")}/>
      </div>
      {/* ═══ WEEKLY EVOLUTION CHART ═══ */}
      {React.createElement(WeeklyEvolutionChart,{st:st})}
      {/* Heatmap de prazos — próximas 6 semanas */}
      <div style={{marginBottom:24}}>
        <PrazoHeatmap items={all}/>
      </div>
      {(function(){var procs=[...st.adm,...st.jud].map(function(p){return Object.assign({},p,{iaS:iaScore(p)});}).sort(function(a,b){return b.iaS-a.iaS;});var top=procs[0];if(!top)return null;var b=iaBadge(top.iaS);var sug=iaSugestao(top);return(
        <div onClick={function(){sp("ia");}} style={{marginBottom:16,padding:"10px 18px",borderRadius:14,background:"linear-gradient(135deg, rgba(168,85,247,.12), rgba(0,212,255,.07))",border:"1px solid rgba(168,85,247,.25)",display:"flex",alignItems:"center",gap:14,cursor:"pointer",transition:"all .2s"}} onMouseEnter={function(e){e.currentTarget.style.borderColor="rgba(168,85,247,.5)";}} onMouseLeave={function(e){e.currentTarget.style.borderColor="rgba(168,85,247,.25)";}}>
          <span style={{fontSize:22}}>🧠</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:"#a78bfa",fontWeight:700,marginBottom:2,letterSpacing:".5px",textTransform:"uppercase"}}>IA Nexus · Prioridade #1</div>
            <div title={top.assunto||""} style={{fontSize:13,fontWeight:700,color:K.txt,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{top.assunto}</div>
            <div style={{fontSize:11,color:K.dim,marginTop:1}}>{sug.emoji} {sug.txt}</div>
          </div>
          <span className={b.cls}>{b.emoji} {b.txt}</span>
          <span style={{fontSize:11,color:K.dim,flexShrink:0}}>Ver painel →</span>
        </div>
      );})()}
            {(function(){
        var sust48=[...st.adm,...st.jud].filter(isSustAlerta);
        if(!sust48.length) return null;
        return(
          <div style={{marginBottom:14,padding:"12px 18px",borderRadius:14,background:"rgba(255,46,91,.12)",border:"2px solid rgba(255,46,91,.7)",display:"flex",alignItems:"center",gap:12,animation:"neonBlink .9s ease-in-out infinite"}}>
            <span style={{fontSize:20,animation:"textBlink .9s ease-in-out infinite",flexShrink:0}}>🎤</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:900,color:"#ff2e5b",fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",marginBottom:4}}>ALERTA — SUSTENTAÇÃO ORAL</div>
              {sust48.map(function(p){
                var cd=getSustCountdown(p);
                return(
                  <div key={p.id} style={{display:"flex",alignItems:"center",gap:8,marginTop:2}}>
                    <span title={p.assunto||""} style={{fontSize:11,color:"rgba(255,150,160,.9)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.assunto}</span>
                    {cd&&<span style={{fontSize:11,fontWeight:800,color:"#ff2e5b",fontFamily:"Orbitron,monospace",flexShrink:0}}>{cd}</span>}
                    {!cd&&p.dataSustentacao&&<span style={{fontSize:10,color:"rgba(255,100,120,.8)",flexShrink:0}}>{new Date(p.dataSustentacao).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})}</span>}
                  </div>
                );
              })}
            </div>
            <div style={{textAlign:"right",fontSize:10,color:"rgba(255,100,120,.9)",flexShrink:0}}>
              <div style={{fontWeight:800,marginBottom:2}}>⚡ ENVIE AGORA:</div>
              <div>📹 Vídeo virtual</div>
              <div>📄 Memoriais</div>
              <div>✍️ Inscrição presencial</div>
            </div>
          </div>
        );
      })()}
      <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr 1fr",gap:12,marginBottom:24}}>
        <Bx onClick={()=>sp("today")} title="Abrir página Hoje"><SH icon={Target} title="Painel Operacional de Hoje"/><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          <SC icon={Flame} label="Vence Hoje" value={todayDue.length} color={K.cr} onClick={()=>sp("today")}/>
          <SC icon={CalendarDays} label="Próx. 3 dias" value={next3.length} color={K.wa} onClick={()=>sp("today")}/>
          <SC icon={Calendar} label="Reuniões Hoje" value={st.reun.filter(r=>diffD(toD(r.data),NOW)===0).length} color={K.ac} onClick={()=>sp("agenda")}/>
          <SC icon={Gavel} label="Sustentações 7 dias" value={st.sust.filter(s=>{const d=diffD(toD(s.data),NOW);return d>=0&&d<=7}).length} color={K.pu} onClick={()=>sp("agenda")}/>
        </div></Bx>
        <Bx onClick={()=>noAction[0]?ss(noAction[0]):sp("priorities")} title="Abrir prioridades"><SH icon={AlertTriangle} title="Sem ação"/><div className="cj-st" style={{display:"flex",flexDirection:"column",gap:8,maxHeight:180,overflowY:"auto"}}>{noAction.slice(0,4).map(p=><div key={p.id} onClick={e=>{e.stopPropagation();ss(p)}} style={{cursor:"pointer",padding:"8px 10px",borderRadius:8,background:"rgba(255,255,255,.03)"}}><div style={{fontSize:11,color:K.ac,fontFamily:"'JetBrains Mono',monospace"}}>{p.num||"Sem nº"}</div><div style={{fontSize:12,color:K.txt}}>{p.assunto}</div></div>)}{!noAction.length&&<div style={{padding:18,textAlign:"center",color:K.dim2,fontSize:12}}>Tudo com próxima providência</div>}</div></Bx>
        <Bx onClick={()=>stale[0]?ss(stale[0]):sp("waiting")} title="Abrir aguardando/parados"><SH icon={Timer} title="Parados 7+ dias"/><div className="cj-st" style={{display:"flex",flexDirection:"column",gap:8,maxHeight:180,overflowY:"auto"}}>{stale.slice(0,4).map(p=><div key={p.id} onClick={e=>{e.stopPropagation();ss(p)}} style={{cursor:"pointer",padding:"8px 10px",borderRadius:8,background:"rgba(255,255,255,.03)"}}><div style={{fontSize:11,color:K.ac,fontFamily:"'JetBrains Mono',monospace"}}>{p.num||"Sem nº"}</div><div style={{fontSize:12,color:K.txt}}>{p.assunto}</div><div style={{fontSize:11,color:K.dim}}>{p.semMov} dias sem movimentação</div></div>)}{!stale.length&&<div style={{padding:18,textAlign:"center",color:K.dim2,fontSize:12}}>Sem parados relevantes</div>}</div></Bx>
        <Bx onClick={()=>sp("waiting")} title="Abrir aguardando terceiros"><SH icon={Users} title="Aguardando Terceiros"/><div className="cj-st" style={{display:"flex",flexDirection:"column",gap:8,maxHeight:180,overflowY:"auto"}}>{all.filter(p=>p.depTerc).slice(0,4).map(p=><div key={p.id} onClick={e=>{e.stopPropagation();ss(p)}} style={{cursor:"pointer",padding:"8px 10px",borderRadius:8,background:"rgba(255,255,255,.03)"}}><div style={{fontSize:11,color:K.ac,fontFamily:"'JetBrains Mono',monospace"}}>{p.num||"Sem nº"}</div><div style={{fontSize:12,color:K.txt}}>{p.assunto}</div></div>)}{!all.filter(p=>p.depTerc).length&&<div style={{padding:18,textAlign:"center",color:K.dim2,fontSize:12}}>Nenhuma pendência externa</div>}</div></Bx>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24}}>
        <Bx onClick={()=>sp("admin")} title="Abrir administrativos"><SH icon={FolderOpen} title="Admin SEI" right={<button style={{...btnGhost,padding:"4px 12px",fontSize:11}} onClick={e=>{e.stopPropagation();sp("admin")}}>Ver todos<ChevronRight size={12}/></button>}/><div className="cj-st" style={{display:"flex",flexDirection:"column",gap:10}}>{[...st.adm].sort((a,b)=>b.score-a.score).slice(0,4).map(p=><PC key={p.id} item={p} onClick={ss} dp={dp}/>)}</div></Bx>
        <Bx onClick={()=>sp("judicial")} title="Abrir prazos judiciais"><SH icon={Scale} title="Prazos Judiciais" right={<button style={{...btnGhost,padding:"4px 12px",fontSize:11}} onClick={e=>{e.stopPropagation();sp("judicial")}}>Ver todos<ChevronRight size={12}/></button>}/><div className="cj-st" style={{display:"flex",flexDirection:"column",gap:10}}>{[...st.jud].sort((a,b)=>b.score-a.score).slice(0,4).map(p=><PC key={p.id} item={p} onClick={ss} dp={dp}/>)}</div></Bx>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
        <Bx onClick={()=>sp("priorities")} title="Abrir prioridades"><SH icon={AlertTriangle} title="Alertas Inteligentes"/><div className="cj-st" style={{display:"flex",flexDirection:"column",gap:8,maxHeight:260,overflowY:"auto"}}>{alerts.slice(0,8).map((a,i)=><AC key={i} {...a}/>)}{!alerts.length&&<div style={{textAlign:"center",padding:20,color:K.dim2,fontSize:12}}>Tudo em dia</div>}</div></Bx>
        <Bx onClick={()=>sp("analytics")} title="Abrir analytics"><SH icon={BarChart3} title="Urgência"/><div style={{display:"flex",alignItems:"center",gap:16}}><ResponsiveContainer width="50%" height={160}><PieChart><Pie data={urgData} cx="50%" cy="50%" innerRadius={36} outerRadius={58} dataKey="value" strokeWidth={0}>{urgData.map((d,i)=><Cell key={i} fill={d.color}/>)}</Pie></PieChart></ResponsiveContainer><div style={{flex:1}}>{urgData.map((d,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><div style={{width:10,height:10,borderRadius:"50%",background:d.color}}/><span style={{fontSize:12,color:K.dim,flex:1}}>{d.name}</span><span style={{fontSize:14,fontWeight:700,color:d.color,fontFamily:"'JetBrains Mono',monospace"}}>{d.value}</span></div>)}</div></div></Bx>
        <Bx onClick={()=>sp("week")} title="Abrir semana"><SH icon={TrendingUp} title="Carga Semanal"/><ResponsiveContainer width="100%" height={160}><BarChart data={wkD} barSize={18}><XAxis dataKey="dia" tick={{fill:K.dim2,fontSize:11}} axisLine={false} tickLine={false}/><YAxis hide/><Tooltip contentStyle={{background:K.modal,border:`1px solid ${K.brd}`,borderRadius:8,color:K.txt,fontSize:12}}/><Bar dataKey="n" fill={K.ac} radius={[4,4,0,0]} name="Tarefas"/></BarChart></ResponsiveContainer></Bx>
      </div>
      {/* v41 · DNANexus interativo · hover mostra ficha tecnica, click abre processo */}
      <div style={{marginTop:24}}>
        <div className="cn-section-tag">▣ DNA NEXUS · GENOMA DO ACERVO · INSPEÇÃO INTERATIVA</div>
        <DNANexus processos={cnDnaItems} h={460} onSelect={ss}/>
      </div>
    </div>
  );
};

/* PROCESS LIST PAGE */

const ProcList=({type,st,dp,ss,compact,bulkSelected=[],setBulkSelected,savedFilters=[],setSavedFilters,setComparadorIds})=>{
  const[selMode,sSelMode]=useState(false);
  const toggleBulk=function(id){if(!setBulkSelected)return;setBulkSelected(function(prev){return prev.includes(id)?prev.filter(function(x){return x!==id;}):prev.concat(id);});};
  const selectAll=function(ids){if(!setBulkSelected)return;setBulkSelected(ids);};
  const[vw,sVw]=useState("cards"),[sb,sSb]=useState("score"),[fil,sFil]=useState({}),[showForm,sSF]=useState(null);
  const isA=type==="admin",isJ=!isA,raw=isA?st.adm:st.jud;
  const filtered=applyF(raw,fil),sorted=[...filtered].sort((a,b)=>sb==="score"?b.score-a.score:sb==="urgency"?a.diasRestantes-b.diasRestantes:toD(a.prazoFinal)-toD(b.prazoFinal));
  const doSave=form=>{if(showForm==="new")dp({type:isA?"ADD_A":"ADD_J",d:form});else dp({type:"UPD",id:showForm.id,isAdm:isA,ch:form});sSF(null)};
  const doDelete=()=>{dp({type:"DEL_P",id:showForm.id});sSF(null)};

  return(
    <div className="cj-pg">
      <div className="cj-up" style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,flexWrap:"wrap"}}>
        <h2 style={{margin:0,fontSize:22,fontWeight:700,color:K.txt}}>{isA?"Processos Administrativos SEI":"Prazos Judiciais"}</h2>
        <Bd color={K.ac}>{filtered.length}/{raw.length}</Bd>
        <button style={btnPrim} onClick={()=>sSF("new")}><Plus size={14}/>Novo {isA?"Processo":"Prazo"}</button>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <button style={{...btnGhost,padding:"5px 10px",fontSize:11,borderColor:fil.quick==="crit"?K.cr:K.brd,color:fil.quick==="crit"?K.cr:K.dim}} onClick={()=>sFil({...fil,quick:fil.quick==="crit"?"":"crit",urg:fil.quick==="crit"?fil.urg:"Crítico"})}>Críticos</button>
          <button style={{...btnGhost,padding:"5px 10px",fontSize:11,borderColor:fil.quick==="reun"?K.ac:K.brd,color:fil.quick==="reun"?K.ac:K.dim}} onClick={()=>sFil({...fil,quick:fil.quick==="reun"?"":"reun",reun:fil.quick==="reun"?"all":"Sim"})}>Reunião</button>
          <button style={{...btnGhost,padding:"5px 10px",fontSize:11,borderColor:fil.quick==="sust"?K.pu:K.brd,color:fil.quick==="sust"?K.pu:K.dim}} onClick={()=>sFil({...fil,quick:fil.quick==="sust"?"":"sust",sust:fil.quick==="sust"?"all":"Sim"})}>Sustentação</button>
          <button style={{...btnGhost,padding:"5px 10px",fontSize:11,borderColor:fil.quick==="wait"?K.wa:K.brd,color:fil.quick==="wait"?K.wa:K.dim}} onClick={()=>sFil({...fil,quick:fil.quick==="wait"?"":"wait",dep:fil.quick==="wait"?"all":"Sim"})}>Aguardando</button>
        </div>
        <div style={{flex:1}}/>
        <input style={{...inpSt,width:180,padding:"6px 12px",fontSize:12}} placeholder="Buscar nº, SEI, assunto, parte ou órgão..." value={fil.sq||""} onChange={e=>sFil({...fil,sq:e.target.value})}/>
        <FP f={fil} sf={sFil} isJ={isJ}/>
        <div style={{display:"flex",gap:4}}>{[["score","Score"],["urgency","Urgência"],["date","Data"]].map(([k,l])=><button key={k} onClick={()=>sSb(k)} style={{...btnGhost,padding:"5px 12px",fontSize:11,borderColor:sb===k?K.ac:K.brd,color:sb===k?K.ac:K.dim}}>{l}</button>)}</div>
        <div style={{display:"flex",gap:4}}>{[["cards",LayoutGrid,"Cards"],["kanban",Columns3,"Kanban"],["table",Table2,"Tabela"]].map(([k,I,l])=><button key={k} onClick={()=>sVw(k)} style={{...btnGhost,padding:"5px 10px",fontSize:11,borderColor:vw===k?K.ac:K.brd,color:vw===k?K.ac:K.dim,display:"flex",alignItems:"center",gap:4}}><I size={13}/>{l}</button>)}</div>
        {/* ═══ BATCH SELECT ═══ */}
        <button onClick={function(){sSelMode(!selMode);if(selMode&&setBulkSelected)setBulkSelected([]);}} style={{...btnGhost,padding:"5px 10px",fontSize:11,borderColor:selMode?K.wa:K.brd,color:selMode?K.wa:K.dim,display:"flex",alignItems:"center",gap:4}}><ClipboardCheck size={13}/>{selMode?"Cancelar":"Selecionar"}</button>
        {selMode&&<button onClick={function(){selectAll(sorted.map(function(p){return p.id;}));}} style={{...btnGhost,padding:"5px 10px",fontSize:11,color:K.ac,borderColor:K.ac+"33"}}>Todos ({sorted.length})</button>}
        {/* ═══ COMPARAR (2-5 processos) ═══ */}
        {selMode&&bulkSelected.length>=2&&bulkSelected.length<=5&&setComparadorIds&&<button onClick={function(){setComparadorIds(bulkSelected.slice(0,5));sSelMode(false);setBulkSelected([]);}} style={{...btnGhost,padding:"5px 10px",fontSize:11,color:K.pu,borderColor:K.pu+"33",display:"flex",alignItems:"center",gap:4}}>⚖️ Comparar ({bulkSelected.length})</button>}
        {/* ═══ FILTROS SALVOS ═══ */}
        {savedFilters.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{savedFilters.map(function(sf){return React.createElement("button",{key:sf.id,onClick:function(){sFil({...sf.filter,sq:""});},style:{...btnGhost,padding:"5px 10px",fontSize:11,color:"#a855f7",borderColor:"rgba(168,85,247,.3)",display:"flex",alignItems:"center",gap:4}},"⭐ ",sf.name,React.createElement("span",{onClick:function(e){e.stopPropagation();if(confirm("Excluir filtro '"+sf.name+"'?"))setSavedFilters(function(prev){var next=prev.filter(function(x){return x.id!==sf.id;});try{localStorage.setItem("cojur_filters",JSON.stringify(next));}catch(e){}return next;});},style:{marginLeft:4,opacity:.5,cursor:"pointer"}},"×"));})}</div>}
        {/* ═══ SALVAR FILTRO ATUAL ═══ */}
        {(fil.urg||fil.st||fil.ph||fil.peca||fil.tr||fil.dep==="Sim"||fil.reun==="Sim"||fil.sust==="Sim")&&setSavedFilters&&<button onClick={function(){var name=prompt("Nome do filtro:");if(!name)return;var newF={id:"f_"+Date.now(),name:name,filter:{...fil,sq:""}};setSavedFilters(function(prev){var next=[...prev,newF];try{localStorage.setItem("cojur_filters",JSON.stringify(next));}catch(e){}return next;});}} style={{...btnGhost,padding:"5px 10px",fontSize:11,color:"#a855f7",borderColor:"rgba(168,85,247,.3)"}}>⭐ Salvar Filtro</button>}
      </div>
      {vw==="cards"&&<div className="cj-st" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(380px,1fr))",gap:12}}>{sorted.map(p=><div key={p.id} style={{position:"relative"}}>{selMode&&<div onClick={function(e){e.stopPropagation();toggleBulk(p.id);}} style={{position:"absolute",top:10,left:10,zIndex:5,width:22,height:22,borderRadius:6,border:"2px solid "+(bulkSelected.includes(p.id)?K.ac:K.dim),background:bulkSelected.includes(p.id)?K.ac+"30":"rgba(0,0,0,.4)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>{bulkSelected.includes(p.id)&&<CheckCircle size={14} color={K.ac}/>}</div>}<PC item={p} onClick={selMode?function(){toggleBulk(p.id);}:ss} dp={dp} compact={compact}/></div>)}</div>}
      {vw==="kanban"&&<KanbanV items={sorted} dp={dp} ss={ss}/>}
      {vw==="table"&&(function(){
        var tSortKeys={"Nº / SEI":"num","Assunto":"assunto","Prazo":"prazoFinal","Dias":"diasRestantes","Score":"score","Status":"status","Fase":"fase"};
        var tSorted=[...sorted];
        if(fil._tCol){
          var dir=fil._tDir||"asc";
          var key=fil._tCol;
          tSorted.sort(function(a,b){
            var va=a[key]||"",vb=b[key]||"";
            if(typeof va==="number"&&typeof vb==="number") return dir==="asc"?va-vb:vb-va;
            if(va instanceof Date&&vb instanceof Date) return dir==="asc"?va-vb:vb-va;
            return dir==="asc"?String(va).localeCompare(String(vb)):String(vb).localeCompare(String(va));
          });
        }
        var toggleSort=function(col){
          var key=tSortKeys[col];
          if(!key) return;
          if(fil._tCol===key) sFil({...fil,_tDir:fil._tDir==="asc"?"desc":"asc"});
          else sFil({...fil,_tCol:key,_tDir:"asc"});
        };
        return <Bx style={{padding:0,overflow:"hidden"}}><div style={{overflowX:"auto"}}><table className="cj-table" style={{width:"100%",fontSize:12}}><thead><tr style={{borderBottom:`1px solid ${K.brd}`}}>{["Nº / SEI","Assunto","Resumo","Prazo","Dias","Score","Status","Fase","Ações"].map(h=><th key={h} className={(tSortKeys[h]?"cj-sortable":"")+(fil._tCol===tSortKeys[h]?" cj-sorted":"")} onClick={function(){toggleSort(h);}} style={{padding:"12px 14px",textAlign:"left",color:fil._tCol===tSortKeys[h]?K.ac:K.dim,fontWeight:fil._tCol===tSortKeys[h]?700:500,fontSize:11,textTransform:"uppercase",cursor:tSortKeys[h]?"pointer":"default"}}>{h}{fil._tCol===tSortKeys[h]?(fil._tDir==="asc"?" ↑":" ↓"):""}</th>)}</tr></thead><tbody>{tSorted.map(p=><tr key={p.id} onClick={()=>ss(p)} style={{borderBottom:`1px solid ${K.brd}`,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.02)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        <td style={{padding:"10px 14px",cursor:"pointer"}}><div style={{fontFamily:"'JetBrains Mono',monospace",color:K.ac}}>{p.num||"—"}</div>{p.numeroSEI&&<div style={{fontSize:10,color:K.dim,fontFamily:"'JetBrains Mono',monospace",marginTop:2}}>SEI {p.numeroSEI}</div>}</td>
        <td title={p.assunto||""} style={{padding:"10px 14px",color:K.txt,maxWidth:200,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",cursor:"pointer"}}>{p.assunto||"—"}</td>
        <td style={{padding:"10px 14px",color:K.dim,maxWidth:220}}><div title={isA?(p.interessado||""):(p.tribunal||"")} style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{isA?(p.interessado||"—"):(p.tribunal||"—")}</div><div title={isA?(p.orgao||""):(p.parteContraria||"")} style={{fontSize:10,color:K.dim2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginTop:2}}>{isA?(p.orgao||"—"):(p.parteContraria||"—")}</div></td>
        <td style={{padding:"10px 14px",color:K.dim}}>{fmt(p.prazoFinal)}</td>
        <td style={{padding:"10px 14px",fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:uC(p.diasRestantes)}}>{p.diasRestantes}</td>
        <td style={{padding:"10px 14px"}}><SB s={p.score}/></td>
        <td style={{padding:"10px 14px"}}><IS value={p.status} options={STS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:isA,ch:{status:v}})}/></td>
        <td style={{padding:"10px 14px"}}><IS value={p.fase} options={PHS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:isA,ch:{fase:v}})} color={K.ac}/></td>
        <td style={{padding:"10px 14px"}} onClick={e=>e.stopPropagation()}><div style={{display:"flex",gap:8,alignItems:"center"}}><DoneBtn small onClick={()=>dp({type:"COMPLETE_P",id:p.id})}/><button onClick={()=>sSF(p)} style={{background:"none",border:"none",color:K.dim,cursor:"pointer"}}><PenLine size={14}/></button></div></td>
      </tr>)}</tbody></table></div></Bx>;})()}
      {showForm!==null&&<FM key={showForm==="new"?"new":showForm.id} title={showForm==="new"?`Novo ${isA?"Processo":"Prazo"}`:`Editar: ${showForm.assunto||showForm.num||"Item"}`} fields={isA?F_ADM:F_JUD} initial={showForm==="new"?{prazoFinal:addD(NOW,30)}:showForm} onClose={()=>sSF(null)} onSave={doSave} onDelete={showForm!=="new"?doDelete:undefined} suggestions={{
        responsavel:[...new Set([...st.adm,...st.jud].map(function(p){return p.responsavel;}).filter(Boolean))],
        orgao:[...new Set([...st.adm,...st.jud].map(function(p){return p.orgao;}).filter(Boolean))],
        interessado:[...new Set(st.adm.map(function(p){return p.interessado;}).filter(Boolean))],
        parteContraria:[...new Set(st.jud.map(function(p){return p.parteContraria;}).filter(Boolean))],
      }}/>}
    </div>
  );
};

/* TODAY */
const TodayPg=({st,dp,ss,sp})=>{
  const all=[...st.adm,...st.jud];
  const tdI=all.filter(p=>p.dataProv&&diffD(toD(p.dataProv),NOW)<=0).sort((a,b)=>b.score-a.score);
  const dueToday=all.filter(p=>p.diasRestantes<=0).sort((a,b)=>b.score-a.score);
  const next3=all.filter(p=>p.diasRestantes>=0&&p.diasRestantes<=3).sort((a,b)=>a.diasRestantes-b.diasRestantes);
  const tdM=st.reun.filter(r=>diffD(toD(r.data),NOW)===0);
  const nextS=st.sust.filter(s=>{const d=diffD(toD(s.data),NOW);return d>=0&&d<=7});
  const noAction=all.filter(p=>!p.proxProv).sort((a,b)=>b.score-a.score);
  const stale=all.filter(p=>(p.semMov||0)>=7).sort((a,b)=>b.semMov-a.semMov);
  /* v41 · EM FOCO · processo mais urgente do acervo (movido do Dashboard) */
  const cnHero = all.slice().sort(function(a,b){
    return (a.diasRestantes == null ? 1e9 : a.diasRestantes) - (b.diasRestantes == null ? 1e9 : b.diasRestantes);
  })[0];
  return(
  <div className="cj-pg">
    <div className="cj-up" style={{display:"flex",alignItems:"center",gap:16,marginBottom:24,flexWrap:"wrap"}}><h2 style={{margin:0,fontSize:22,fontWeight:700,color:K.txt}}>Hoje</h2><span style={{fontSize:14,color:K.dim}}>{NOW.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})}</span></div>
    {/* v41 · EM FOCO · HoloHero do processo mais urgente (clicavel) */}
    {cnHero && (
      <div style={{marginBottom:20}} onClick={function(){ ss(cnHero); }}>
        <div className="cn-section-tag">▣ EM FOCO · PROCESSO MAIS URGENTE</div>
        <Tilt max={10}>
          <HoloHero
            titulo={cnHero.assunto || "Sem assunto"}
            num={cnHero.num || cnHero.numeroSEI || "—"}
            prazo={cnHero.diasRestantes == null ? "—" : (cnHero.diasRestantes === 0 ? "HOJE" : cnHero.diasRestantes + "du")}
            responsavel={cnHero.responsavel || "JG"}
            fase={cnHero.fase || cnHero.tipoPeca || "—"}
            crit={cnHero.diasRestantes != null && cnHero.diasRestantes <= 5}
          />
        </Tilt>
      </div>
    )}
    {/* v41 · Heatmap de produtividade · 14 colunas x 7 linhas (estilo GitHub) */}
    <div style={{marginBottom:20,padding:"16px 18px",borderRadius:14,background:"linear-gradient(135deg,rgba(8,12,28,.6),rgba(2,5,15,.8))",border:"1px solid rgba(0,229,255,.15)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:10}}>
        <div className="cn-section-tag" style={{margin:0}}>▣ HEATMAP · ATIVIDADES POR DIA · 14 SEMANAS</div>
        <div style={{display:"flex",gap:8,fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"var(--cn-dim2)",alignItems:"center"}}>
          <span>menos</span>
          {[0.1,0.3,0.55,0.8,1].map(function(v,i){return <span key={i} style={{width:11,height:11,borderRadius:3,background:"color-mix(in srgb,var(--cn-ac) "+(v*100)+"%,rgba(255,255,255,.03))"}}/>;})}
          <span>mais</span>
        </div>
      </div>
      <Heatmap data={(function(){
        // 14*7 = 98 cells. 0..4 baseado em # processos com dataProv naquele dia
        var cells = [];
        for (var w = 13; w >= 0; w--) {
          for (var d = 0; d < 7; d++) {
            var dt = addD(NOW, -(w*7 + (6-d)));
            var n = all.filter(function(p){return p.dataProv && diffD(toD(p.dataProv), dt) === 0;}).length;
            cells.push(Math.min(4, n));
          }
        }
        return cells;
      })()} cols={14}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
      <SC icon={Flame} label="Vence Hoje" value={dueToday.length} color={K.cr} onClick={()=>dueToday[0]&&ss(dueToday[0])||sp("priorities")}/>
      <SC icon={CalendarDays} label="Próx. 3 dias" value={next3.length} color={K.wa} onClick={()=>sp("today")}/>
      <SC icon={Calendar} label="Reuniões Hoje" value={tdM.length} color={K.ac} onClick={()=>sp("agenda")}/>
      <SC icon={Gavel} label="Sustentações 7 dias" value={nextS.length} color={K.pu} onClick={()=>sp("agenda")}/>
      <SC icon={AlertTriangle} label="Sem ação" value={noAction.length} color={K.wa} onClick={()=>noAction[0]&&ss(noAction[0])||sp("priorities")}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1.3fr 1fr 1fr",gap:20}}>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <Bx><SH icon={Target} title="Providências do Dia"/><div className="cj-st" style={{display:"flex",flexDirection:"column",gap:10}}>{tdI.map(p=><PC key={p.id} item={p} onClick={ss} dp={dp}/>)}{!tdI.length&&<div style={{textAlign:"center",padding:30,color:K.dim2}}>Nenhuma providência para hoje</div>}</div></Bx>
        <Bx><SH icon={Flame} title="Prazos até 3 dias corridos"/><div className="cj-st" style={{display:"flex",flexDirection:"column",gap:10}}>{next3.map(p=><PC key={p.id} item={p} onClick={ss} dp={dp}/>)}{!next3.length&&<div style={{textAlign:"center",padding:24,color:K.dim2}}>Sem prazos críticos imediatos</div>}</div></Bx>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <Bx onClick={()=>sp("agenda")} title="Abrir agenda"><SH icon={Calendar} title="Reuniões de Hoje"/>{tdM.map(r=><div key={r.id} onClick={()=>sp("agenda")} style={{marginBottom:12,padding:12,background:K.acG,borderRadius:10,cursor:"pointer"}}><div style={{fontSize:16,fontWeight:700,color:K.ac,fontFamily:"'JetBrains Mono',monospace"}}>{r.hora}</div><div style={{fontSize:13,fontWeight:600,color:K.txt,marginTop:4}}>{r.titulo}</div><div style={{fontSize:11,color:K.dim,marginTop:2}}>{r.local}</div>{r.checklist&&<div style={{marginTop:8}}><CL items={r.checklist} onToggle={i=>dp({type:"TCL",ky:"reun",eid:r.id,idx:i})}/></div>}</div>)}{!tdM.length&&<div style={{textAlign:"center",padding:20,color:K.dim2,fontSize:12}}>Sem reuniões hoje</div>}</Bx>
        <Bx><SH icon={Gavel} title="Sustentações próximas"/>{nextS.map(s=><div key={s.id} onClick={()=>sp("agenda")} style={{marginBottom:12,padding:12,background:K.puG,borderRadius:10,cursor:"pointer"}}><div style={{fontSize:16,fontWeight:700,color:K.pu,fontFamily:"'JetBrains Mono',monospace"}}>{s.hora}</div><div style={{fontSize:13,fontWeight:600,color:K.txt,marginTop:4}}>{s.tema}</div><div style={{fontSize:11,color:K.dim,marginTop:2}}>{s.tribunal} · {fmt(toD(s.data))}</div></div>)}{!nextS.length&&<div style={{textAlign:"center",padding:20,color:K.dim2,fontSize:12}}>Sem sustentações próximas</div>}</Bx>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <Bx onClick={()=>noAction[0]?ss(noAction[0]):sp("priorities")} title="Abrir prioridades"><SH icon={AlertTriangle} title="Sem próxima providência"/><div className="cj-st" style={{display:"flex",flexDirection:"column",gap:8}}>{noAction.slice(0,6).map(p=><div key={p.id} onClick={e=>{e.stopPropagation();ss(p)}} style={{cursor:"pointer",padding:"8px 10px",borderRadius:8,background:"rgba(255,255,255,.03)"}}><div style={{fontSize:11,color:K.ac,fontFamily:"'JetBrains Mono',monospace"}}>{p.num||"Sem nº"}</div><div style={{fontSize:12,color:K.txt}}>{p.assunto}</div></div>)}{!noAction.length&&<div style={{textAlign:"center",padding:20,color:K.dim2,fontSize:12}}>Nenhum processo sem ação</div>}</div></Bx>
        <Bx onClick={()=>stale[0]?ss(stale[0]):sp("waiting")} title="Abrir aguardando"><SH icon={Timer} title="Parados há 7+ dias"/><div className="cj-st" style={{display:"flex",flexDirection:"column",gap:8}}>{stale.slice(0,6).map(p=><div key={p.id} onClick={e=>{e.stopPropagation();ss(p)}} style={{cursor:"pointer",padding:"8px 10px",borderRadius:8,background:"rgba(255,255,255,.03)"}}><div style={{fontSize:11,color:K.ac,fontFamily:"'JetBrains Mono',monospace"}}>{p.num||"Sem nº"}</div><div style={{fontSize:12,color:K.txt}}>{p.assunto}</div><div style={{fontSize:11,color:K.dim}}>{p.semMov} dias sem movimentação</div></div>)}{!stale.length&&<div style={{textAlign:"center",padding:20,color:K.dim2,fontSize:12}}>Nada parado acima do limite</div>}</div></Bx>
      </div>
    </div>
  </div>
)};

/* WEEK */
const WeekPg=({st,dp,ss,sp})=>{const all=[...st.adm,...st.jud];const wI=all.filter(p=>p.diasRestantes<=7).sort((a,b)=>b.score-a.score);const wM=st.reun.filter(r=>{const d=diffD(toD(r.data),NOW);return d>=0&&d<=7});const dL=Array.from({length:7},(_,i)=>{const d=addD(NOW,i);const it=all.filter(p=>p.dataProv&&diffD(toD(p.dataProv),d)===0);return{day:d.toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit"}),h:it.reduce((s,p)=>s+(parseFloat(p.estTempo)||2),0)}});return(
  <div className="cj-pg">
    <div className="cj-up" style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}><h2 style={{margin:0,fontSize:22,fontWeight:700,color:K.txt}}>Esta Semana</h2><Bd color={K.ac}>{wI.length} vencimentos</Bd><Bd color={K.wa}>{wM.length} reuniões</Bd></div>
    <Bx className="cj-up" style={{marginBottom:20}} onClick={()=>sp("calendar")} title="Abrir calendário"><SH icon={Activity} title="Carga Diária"/><div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:10}}>{dL.map((d,i)=><div key={i} style={{textAlign:"center"}}><div style={{fontSize:11,color:K.dim,marginBottom:6}}>{d.day}</div><div style={{height:80,background:"rgba(255,255,255,.03)",borderRadius:6,display:"flex",flexDirection:"column",justifyContent:"flex-end",overflow:"hidden"}}><div style={{height:`${Math.min(100,(d.h/8)*100)}%`,background:d.h>6?`linear-gradient(180deg,${K.cr},${K.cr}88)`:`linear-gradient(180deg,${K.ac},${K.ac}66)`,borderRadius:"4px 4px 0 0",transition:"height .6s ease"}}/></div><div style={{fontSize:13,fontWeight:700,color:d.h>6?K.cr:K.txt,marginTop:4,fontFamily:"'JetBrains Mono',monospace"}}>{d.h}h</div></div>)}</div></Bx>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <Bx onClick={()=>wI[0]?ss(wI[0]):sp("priorities")} title="Abrir ranking/prioridades"><SH icon={Flame} title="Ranking"/><div className="cj-st" style={{display:"flex",flexDirection:"column",gap:8}}>{wI.slice(0,8).map((p,i)=><div key={p.id} onClick={e=>{e.stopPropagation();ss(p)}} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",background:i===0?K.crG:"transparent",borderRadius:10,cursor:"pointer"}} onMouseEnter={e=>{if(i)e.currentTarget.style.background="rgba(255,255,255,.03)"}} onMouseLeave={e=>{if(i)e.currentTarget.style.background="transparent"}}><div style={{width:24,height:24,borderRadius:6,background:i<3?K.cr+"20":K.ac+"15",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:i<3?K.cr:K.ac,fontFamily:"'JetBrains Mono',monospace"}}>#{i+1}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:600,color:K.txt,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.assunto}</div></div><div style={{display:"flex",alignItems:"center",gap:6}}><UB d={p.diasRestantes} prazoFinal={p.prazoFinal}/><DoneBtn small onClick={()=>dp({type:"COMPLETE_P",id:p.id})}/></div></div>)}</div></Bx>
      <Bx onClick={()=>sp("agenda")} title="Abrir agenda"><SH icon={Calendar} title="Compromissos da Semana"/>{wM.map(r=><div key={r.id} onClick={e=>{e.stopPropagation();sp("agenda")}} style={{padding:"10px 0",borderBottom:`1px solid ${K.brd}`,display:"flex",gap:12,alignItems:"center",cursor:"pointer"}}><div style={{textAlign:"center",minWidth:50}}><div style={{fontSize:11,color:K.dim}}>{fmtS(toD(r.data))}</div><div style={{fontSize:14,fontWeight:700,color:K.ac,fontFamily:"'JetBrains Mono',monospace"}}>{r.hora}</div></div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:K.txt}}>{r.titulo}</div><div style={{fontSize:11,color:K.dim}}>{r.local}</div></div></div>)}</Bx>
    </div>
  </div>
)};

/* PRIORITIES */
const PrioPg=({st,dp,ss})=>{const all=[...st.adm,...st.jud].sort((a,b)=>b.score-a.score);return(
  <div className="cj-pg"><div className="cj-up" style={{marginBottom:24}}><h2 style={{margin:0,fontSize:22,fontWeight:700,color:K.txt}}>Prioridades Estratégicas</h2></div>
    <div className="cj-st" style={{display:"flex",flexDirection:"column",gap:10}}>{all.slice(0,15).map((p,i)=><div key={p.id} onClick={e=>{e.stopPropagation();ss(p)}} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",background:K.card,border:`1px solid ${K.brd}`,borderRadius:12,borderLeft:`3px solid ${uC(p.diasRestantes)}`,cursor:"pointer",transition:"all .25s"}} onMouseEnter={e=>{e.currentTarget.style.background=K.cardH;e.currentTarget.style.transform="translateX(4px)"}} onMouseLeave={e=>{e.currentTarget.style.background=K.card;e.currentTarget.style.transform="none"}}>
      <div style={{width:32,height:32,borderRadius:8,background:i<3?K.crG:i<7?K.waG:K.acG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:i<3?K.cr:i<7?K.wa:K.ac,fontFamily:"'JetBrains Mono',monospace",flexShrink:0}}>#{i+1}</div>
      <div style={{flex:1,minWidth:0}}><div style={{display:"flex",gap:8,marginBottom:4}}><span style={{fontSize:12,fontFamily:"'JetBrains Mono',monospace",color:K.ac}}>{p.num}</span><Bd>{p.tipo==="jud"?"Judicial":"Admin"}</Bd>{p.tipo==="jud"&&<Bd color={K.pu}>{p.tribunal}</Bd>}</div><div style={{fontSize:14,fontWeight:600,color:K.txt,marginBottom:4}}>{p.assunto}</div><div style={{fontSize:11,color:K.dim2}}>Próxima: {p.proxProv}</div></div>
      <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end",flexShrink:0}} onClick={e=>e.stopPropagation()}><SB s={p.score}/><UB d={p.diasRestantes} prazoFinal={p.prazoFinal}/><DoneBtn small onClick={()=>dp({type:"COMPLETE_P",id:p.id})}/><IS value={p.fase} options={PHS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:p.tipo==="adm",ch:{fase:v}})} color={K.ac}/></div>
    </div>)}</div>
  </div>
)};

/* WAITING */
const WaitPg=({st,dp,ss})=>{const all=[...st.adm,...st.jud].filter(p=>p.depTerc).sort((a,b)=>b.semMov-a.semMov);return(
  <div className="cj-pg"><div className="cj-up" style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}><h2 style={{margin:0,fontSize:22,fontWeight:700,color:K.txt}}>Aguardando Terceiros</h2><Bd color={K.wa}>{all.length}</Bd></div>
    <div className="cj-st" style={{display:"flex",flexDirection:"column",gap:10}}>{all.map(p=><div key={p.id} onClick={e=>{e.stopPropagation();ss(p)}} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",background:K.card,border:`1px solid ${K.brd}`,borderRadius:12,borderLeft:`3px solid ${p.semMov>=15?K.cr:K.wa}`,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=K.cardH} onMouseLeave={e=>e.currentTarget.style.background=K.card}>
      <div style={{width:48,height:48,borderRadius:10,background:p.semMov>=15?K.crG:K.waG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}><div style={{fontSize:18,fontWeight:800,color:p.semMov>=15?K.cr:K.wa,fontFamily:"'JetBrains Mono',monospace"}}>{p.semMov}</div><div style={{fontSize:9,color:K.dim,textTransform:"uppercase"}}>dias</div></div>
      <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontFamily:"'JetBrains Mono',monospace",color:K.ac}}>{p.num}</div><div style={{fontSize:14,fontWeight:600,color:K.txt,marginTop:2}}>{p.assunto}</div></div>
      <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end"}} onClick={e=>e.stopPropagation()}><UB d={p.diasRestantes} prazoFinal={p.prazoFinal}/><DoneBtn small onClick={()=>dp({type:"COMPLETE_P",id:p.id})}/>{p.semMov>=10&&<Bd color={K.cr}><AlertTriangle size={10}/>Cobrar</Bd>}<IS value={p.status} options={STS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:p.tipo==="adm",ch:{status:v}})}/></div>
    </div>)}</div>
  </div>
)};

/* INBOX */
const InboxPg=({st,dp})=>{const[nt,sNt]=useState(""),[np,sNp]=useState("Média");const add=()=>{if(!nt.trim())return;dp({type:"ADD_I",d:{desc:nt,origem:"Manual",data:NOW,prio:np}});sNt("")};return(
  <div className="cj-pg"><div className="cj-up" style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}><h2 style={{margin:0,fontSize:22,fontWeight:700,color:K.txt}}>Caixa de Entrada</h2><Bd color={K.ac}>{st.inbox.length}</Bd></div>
    <Bx className="cj-up" style={{marginBottom:20}}><div style={{display:"flex",gap:10}}><input style={inpSt} value={nt} onChange={e=>sNt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Nova demanda..."/><select style={{...inpSt,width:100}} value={np} onChange={e=>sNp(e.target.value)}><option value="Alta">Alta</option><option value="Média">Média</option><option value="Baixa">Baixa</option></select><button style={btnPrim} onClick={add}><Plus size={14}/>Adicionar</button></div></Bx>
    <div className="cj-st" style={{display:"flex",flexDirection:"column",gap:10}}>{st.inbox.map(ce=><Bx key={ce.id} style={{padding:"14px 18px",display:"flex",alignItems:"center",gap:14}}><div style={{width:10,height:10,borderRadius:"50%",background:ce.prio==="Alta"?K.cr:ce.prio==="Média"?K.wa:K.dim2,flexShrink:0}}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:500,color:K.txt}}>{ce.desc}</div><div style={{fontSize:11,color:K.dim,marginTop:4}}>{ce.origem} · {fmt(toD(ce.data))}</div></div><Bd color={ce.prio==="Alta"?K.cr:ce.prio==="Média"?K.wa:K.dim2}>{ce.prio}</Bd><button onClick={()=>dp({type:"DEL_I",id:ce.id})} style={{...btnGhost,padding:"4px 8px"}}><Trash2 size={12}/></button></Bx>)}</div>
  </div>
)};

/* AGENDA */
const AgendaPg=({st,dp,sp})=>{const[sR,sSR]=useState(null),[sS,sSS]=useState(null),[sV,sSV]=useState(null);return(
  <div className="cj-pg"><div className="cj-up" style={{marginBottom:24,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}><CFMMark size={34}/><div><h2 style={{margin:0,fontSize:22,fontWeight:800,color:K.txt}}>Agenda Institucional</h2><div style={{fontSize:11,color:K.dim}}>Reuniões, sustentações e viagens em formato executivo</div></div></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
      <div><SH icon={Calendar} title="Reuniões" right={<button style={{...btnPrim,padding:"4px 12px",fontSize:11}} onClick={()=>sSR("new")}><Plus size={12}/>Nova</button>}/>
        <div className="cj-st" style={{display:"flex",flexDirection:"column",gap:10}}>{st.reun.map(r=><Bx key={r.id} onClick={()=>sSR(r)} title="Abrir reunião" style={{borderLeft:`3px solid ${K.ac}`,borderRadius:18,background:"linear-gradient(180deg,rgba(6,182,212,.09),rgba(255,255,255,.02))"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:14,fontWeight:700,color:K.ac,fontFamily:"'JetBrains Mono',monospace"}}>{r.hora}</span><div style={{display:"flex",gap:6}}><button onClick={e=>{e.stopPropagation();sSR(r)}} style={{background:"none",border:"none",color:K.dim,cursor:"pointer"}}><PenLine size={12}/></button><span style={{fontSize:11,color:K.dim}}>{fmt(toD(r.data))}</span></div></div>
          <div style={{fontSize:14,fontWeight:600,color:K.txt,marginBottom:4}}>{r.titulo}</div><div style={{fontSize:11,color:K.dim,marginBottom:8}}>{r.local}</div>
          {r.checklist&&r.checklist.length>0&&<div style={{borderTop:`1px solid ${K.brd}`,paddingTop:8}}><CL items={r.checklist} onToggle={i=>dp({type:"TCL",ky:"reun",eid:r.id,idx:i})}/></div>}
        </Bx>)}</div>
      </div>
      <div><SH icon={Gavel} title="Sustentações" right={<button style={{...btnPrim,padding:"4px 12px",fontSize:11}} onClick={()=>sSS("new")}><Plus size={12}/>Nova</button>}/>
        <div className="cj-st" style={{display:"flex",flexDirection:"column",gap:10}}>{st.sust.map(s=><Bx key={s.id} onClick={()=>sSS(s)} title="Abrir sustentação" style={{borderLeft:`3px solid ${K.pu}`,borderRadius:18,background:"linear-gradient(180deg,rgba(139,92,246,.09),rgba(255,255,255,.02))"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:14,fontWeight:700,color:K.pu,fontFamily:"'JetBrains Mono',monospace"}}>{s.hora}</span><div style={{display:"flex",gap:6}}><button onClick={e=>{e.stopPropagation();sSS(s)}} style={{background:"none",border:"none",color:K.dim,cursor:"pointer"}}><PenLine size={12}/></button><Bd color={K.pu}>{diffD(toD(s.data),NOW)}d</Bd></div></div>
          <div style={{fontSize:14,fontWeight:600,color:K.txt,marginBottom:4}}>{s.tema}</div><div style={{fontSize:11,color:K.dim,marginBottom:8}}>{s.tribunal}</div>
          {s.checklist&&s.checklist.length>0&&<div style={{borderTop:`1px solid ${K.brd}`,paddingTop:8}}><CL items={s.checklist} onToggle={i=>dp({type:"TCL",ky:"sust",eid:s.id,idx:i})}/></div>}
        </Bx>)}</div>
      </div>
      <div><SH icon={Plane} title="Viagens" right={<button style={{...btnPrim,padding:"4px 12px",fontSize:11}} onClick={()=>sSV("new")}><Plus size={12}/>Nova</button>}/>
        <div className="cj-st" style={{display:"flex",flexDirection:"column",gap:10}}>{st.viag.map(v=><Bx key={v.id} onClick={()=>sSV(v)} title="Abrir viagem" style={{borderLeft:`3px solid ${K.su}`,borderRadius:18,background:"linear-gradient(180deg,rgba(16,185,129,.09),rgba(255,255,255,.02))"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><Bd color={K.su}><MapPin size={10}/>{v.destino}</Bd><button onClick={e=>{e.stopPropagation();dp({type:"DEL_V",id:v.id})}} style={{background:"none",border:"none",color:K.dim,cursor:"pointer"}}><Trash2 size={12}/></button></div><div style={{fontSize:12,color:K.txt,marginTop:8}}>{v.motivo}</div><div style={{fontSize:11,color:K.dim,marginTop:4}}>{fmt(toD(v.dataIda))} → {fmt(toD(v.dataVolta))}</div></Bx>)}</div>
      </div>
    </div>
    {sR!==null&&<FM key={sR==="new"?"nr":sR.id} title={sR==="new"?"Nova Reunião":"Editar Reunião"} fields={F_REUN} initial={sR==="new"?{data:addD(NOW,1),hora:"14:00"}:sR} onClose={()=>sSR(null)} onSave={f=>{if(sR==="new")dp({type:"ADD_R",d:f});else dp({type:"UPD_R",id:sR.id,ch:f});sSR(null)}} onDelete={sR!=="new"?()=>{dp({type:"DEL_R",id:sR.id});sSR(null)}:undefined}/>}
    {sS!==null&&<FM key={sS==="new"?"ns":sS.id} title={sS==="new"?"Nova Sustentação":"Editar Sustentação"} fields={F_SUST} initial={sS==="new"?{data:addD(NOW,7),hora:"09:30",tribunal:"TRF-1"}:sS} onClose={()=>sSS(null)} onSave={f=>{if(sS==="new")dp({type:"ADD_S",d:f});else dp({type:"UPD_S",id:sS.id,ch:f});sSS(null)}} onDelete={sS!=="new"?()=>{dp({type:"DEL_S",id:sS.id});sSS(null)}:undefined}/>}
    {sV!==null&&<FM key="nv" title="Nova Viagem" fields={F_VIAG} initial={{dataIda:addD(NOW,7),dataVolta:addD(NOW,9)}} onClose={()=>sSV(null)} onSave={f=>{dp({type:"ADD_V",d:f});sSV(null)}}/>}
  </div>
)};

/* CALENDAR */
const CAL_TIPOS = {
  "reuniao":    {emoji:"📅", cor:"#00e5ff",  bg:"rgba(0,229,255,.18)",  brd:"rgba(0,229,255,.6)",  label:"Reunião"},
  "sust":       {emoji:"⚖️",  cor:"#b84dff",  bg:"rgba(184,77,255,.18)", brd:"rgba(184,77,255,.6)",  label:"Sustentação Oral"},
  "viagem":     {emoji:"✈️",  cor:"#00ff88",  bg:"rgba(0,255,136,.18)",  brd:"rgba(0,255,136,.5)",  label:"Viagem"},
  "lembrete":   {emoji:"⏰",  cor:"#ffb800",  bg:"rgba(255,184,0,.18)",  brd:"rgba(255,184,0,.55)", label:"Lembrete"},
  "prazo_crit": {emoji:"🔥",  cor:"#ff2e5b",  bg:"rgba(255,46,91,.18)",  brd:"rgba(255,46,91,.6)",  label:"Prazo Crítico"},
  "prazo_med":  {emoji:"⚡",  cor:"#ffb800",  bg:"rgba(255,184,0,.12)",  brd:"rgba(255,184,0,.4)",  label:"Prazo"},
  "prazo_ok":   {emoji:"📋",  cor:"#00e5ff",  bg:"rgba(0,229,255,.08)",  brd:"rgba(0,229,255,.3)",  label:"Prazo"},
};

function CalPg({st}){
  const[mo,sMo]=useState(NOW.getMonth()),[yr,sYr]=useState(NOW.getFullYear()),[sd,sSd]=useState(null);
  const all=[...st.adm,...st.jud];
  const fd=new Date(yr,mo,1).getDay();
  const dm=new Date(yr,mo+1,0).getDate();
  const mn=new Date(yr,mo).toLocaleDateString("pt-BR",{month:"long",year:"numeric"});
  const hoje=NOW.toISOString().slice(0,10);

  const sameDay=function(d1,d2){if(!d1||!d2)return false;return d1.getFullYear()===d2.getFullYear()&&d1.getMonth()===d2.getMonth()&&d1.getDate()===d2.getDate();};

  const gEv=function(day){
    var d=new Date(yr,mo,day),ev=[];
    // Prazos de processos
    all.forEach(function(p){
      var pf=toD(p.prazoFinal);
      if(sameDay(pf,d)){
        var dr=p.diasRestantes||0;
        var tipo=dr<=5?"prazo_crit":dr<=15?"prazo_med":"prazo_ok";
        ev.push({tipo:tipo,l:p.assunto,c:CAL_TIPOS[tipo].cor,emoji:CAL_TIPOS[tipo].emoji,destaque:dr<=5});
      }
    });
    // Reuniões
    st.reun.forEach(function(r){
      var rd=toD(r.data);
      if(sameDay(rd,d)) ev.push({tipo:"reuniao",l:r.titulo,c:CAL_TIPOS.reuniao.cor,emoji:CAL_TIPOS.reuniao.emoji,destaque:true});
    });
    // Sustentações orais
    st.sust.forEach(function(s){
      var sd2=toD(s.data);
      if(sameDay(sd2,d)) ev.push({tipo:"sust",l:s.tema,c:CAL_TIPOS.sust.cor,emoji:CAL_TIPOS.sust.emoji,destaque:true});
    });
    // Viagens — marca todos os dias do período
    st.viag.forEach(function(v){
      if(!v.dataIda||!v.dataVolta) return;
      var ini=toD(v.dataIda),fim=toD(v.dataVolta);
      if(d>=ini&&d<=fim) ev.push({tipo:"viagem",l:v.destino||v.motivo,c:CAL_TIPOS.viagem.cor,emoji:CAL_TIPOS.viagem.emoji,destaque:true,span:true});
    });
    // Lembretes
    (st.lembretes||[]).forEach(function(lem){
      if(!lem.data||lem.done) return;
      var ld=new Date(lem.data+"T12:00:00");
      if(sameDay(ld,d)) ev.push({tipo:"lembrete",l:lem.texto,c:CAL_TIPOS.lembrete.cor,emoji:CAL_TIPOS.lembrete.emoji,destaque:true});
    });
    return ev;
  };
  const navM=function(dir){if(dir<0&&mo===0){sMo(11);sYr(yr-1);}else if(dir>0&&mo===11){sMo(0);sYr(yr+1);}else sMo(mo+dir);sSd(null);};
  const DAYS=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
  return(
    <div className="cj-pg">
      <div className="cj-up" style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
        <h2 style={{margin:0,fontSize:22,fontWeight:700,color:K.txt}}>Calendário</h2>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:12}}>
          <button style={{...btnGhost,padding:"6px 10px"}} onClick={()=>navM(-1)}><ChevronLeft size={16}/></button>
          <span style={{fontSize:15,fontWeight:600,color:K.txt,textTransform:"capitalize",minWidth:180,textAlign:"center"}}>{mn}</span>
          <button style={{...btnGhost,padding:"6px 10px"}} onClick={()=>navM(1)}><ChevronRight size={16}/></button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:sd?"1fr 300px":"1fr",gap:16,alignItems:"start"}}>
        <div style={{background:"linear-gradient(135deg,rgba(2,5,20,.97),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.1)",borderRadius:20,overflow:"auto",boxShadow:"0 20px 50px rgba(0,0,0,.5)"}}>
          <div style={{minWidth:560}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,minmax(70px,1fr))"}}>
              {DAYS.map(function(d){return <div key={d} style={{padding:"10px 6px",textAlign:"center",fontSize:10,fontWeight:700,color:K.dim,textTransform:"uppercase",letterSpacing:".5px",borderBottom:"1px solid rgba(0,229,255,.12)",background:"rgba(0,229,255,.025)"}}>{d}</div>;})}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,minmax(70px,1fr))"}}>
              {Array.from({length:fd},function(_,i){return <div key={"e"+i} style={{padding:4,minHeight:90,borderBottom:"1px solid "+K.brd,borderRight:"1px solid "+K.brd,background:"rgba(0,0,0,.15)"}}/>;})}
              {Array.from({length:dm},function(_,i){
                var day=i+1,ev=gEv(day);
                var isT=day===NOW.getDate()&&mo===NOW.getMonth()&&yr===NOW.getFullYear();
                var isS=sd===day;
                var hasDest=ev.some(function(e){return e.destaque;});
                var topEv=ev[0]||null;
                var cellBg=isS?"rgba(0,229,255,.18)":hasDest&&topEv?CAL_TIPOS[topEv.tipo].bg:"transparent";
                var cellBrd=isS?"rgba(0,229,255,.5)":hasDest&&topEv?CAL_TIPOS[topEv.tipo].brd:K.brd;
                var cellShadow=hasDest&&topEv?"inset 0 0 0 2px "+CAL_TIPOS[topEv.tipo].brd+", 0 0 18px "+topEv.c+"30":"none";
                return(
                  <div key={day} className="cj-cal-cell" onClick={function(){sSd(day===sd?null:day);}} style={{padding:"4px 5px 5px",minHeight:90,borderBottom:"1px solid "+cellBrd,borderRight:"1px solid "+K.brd,background:cellBg,boxSizing:"border-box",boxShadow:cellShadow,transition:"all .18s",position:"relative",overflow:"hidden"}}>
                    {hasDest&&topEv&&<div style={{position:"absolute",inset:"0 0 auto 0",height:"3px",background:topEv.c,boxShadow:"0 0 8px "+topEv.c,borderRadius:"2px 2px 0 0",pointerEvents:"none"}}/>}
                    <div style={{fontSize:11,fontWeight:isT?800:400,color:isT?K.ac:hasDest&&topEv?topEv.c:K.txt,marginBottom:2,display:"flex",alignItems:"center",gap:2}}>
                      {isT&&<div style={{width:7,height:7,borderRadius:"50%",background:K.ac,boxShadow:"0 0 8px "+K.ac,flexShrink:0}}/>}
                      <span>{day}</span>
                      {ev.length>0&&<span style={{marginLeft:"auto",fontSize:9,fontWeight:800,color:hasDest&&topEv?topEv.c:K.dim,background:"rgba(0,0,0,.3)",borderRadius:5,padding:"0 4px",lineHeight:"14px"}}>{ev.length}</span>}
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:2}}>
                      {ev.slice(0,3).map(function(e,ei){
                        var tp=CAL_TIPOS[e.tipo];
                        var isBig=e.destaque&&ei===0;
                        return <div key={ei} style={{fontSize:isBig?9:8,padding:isBig?"2px 4px":"1px 3px",borderRadius:4,background:isBig?tp.bg:e.c+"18",color:e.c,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontWeight:isBig?800:600,borderLeft:(isBig?"3px":"2px")+" solid "+e.c,lineHeight:"14px",boxShadow:isBig?"0 0 6px "+e.c+"40":"none"}}>{e.emoji+" "+e.l}</div>;
                      })}
                      {ev.length>3&&<div style={{fontSize:8,color:K.dim2,paddingLeft:2}}>+{ev.length-3}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {sd&&<Bx className="cj-sc" style={{position:"sticky",top:0}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
            <h3 style={{margin:0,fontSize:16,fontWeight:600,color:K.txt}}>{sd} de {new Date(yr,mo).toLocaleDateString("pt-BR",{month:"long"})}</h3>
            <button onClick={()=>sSd(null)} style={{background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={16}/></button>
          </div>
          {gEv(sd).length?gEv(sd).map(function(e,i){
            var t=CAL_TIPOS[e.tipo];
            return(
              <div key={i} style={{padding:"12px 14px",marginBottom:8,borderRadius:12,background:t.bg,border:"1px solid "+t.brd,boxShadow:"0 0 14px "+e.c+"20"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <span style={{fontSize:18}}>{e.emoji}</span>
                  <span style={{fontSize:10,fontWeight:800,color:e.c,textTransform:"uppercase",letterSpacing:".5px",fontFamily:"Orbitron,sans-serif"}}>{t.label}</span>
                </div>
                <div style={{fontSize:13,fontWeight:700,color:K.txt,lineHeight:1.4}}>{e.l}</div>
              </div>
            );
          }):<div style={{textAlign:"center",padding:20,color:K.dim2,fontSize:12}}>Nenhum evento neste dia</div>}
        </Bx>}
      </div>
      <div style={{display:"flex",gap:14,marginTop:16,justifyContent:"center",flexWrap:"wrap"}}>
        {[["reuniao","Reunião"],["sust","Sustentação Oral"],["viagem","Viagem"],["lembrete","Lembrete"],["prazo_crit","Prazo Crítico"],["prazo_med","Prazo"]].map(function(item){
          var t=CAL_TIPOS[item[0]];
          return <div key={item[0]} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:K.dim}}>
            <div style={{width:18,height:12,borderRadius:3,background:t.bg,border:"2px solid "+t.brd,boxShadow:"0 0 6px "+t.cor+"40"}}/>
            <span>{t.emoji} {item[1]}</span>
          </div>;
        })}
      </div>
    </div>
  );
};

/* ANALYTICS */
const AnalPg=({st})=>{
  const all=[...st.adm,...st.jud];
  const phD=PHS.slice(0,6).map(f=>({name:f.length>12?f.slice(0,12)+"…":f,adm:st.adm.filter(p=>p.fase===f).length,jud:st.jud.filter(p=>p.fase===f).length}));
  const mt=[{l:"Tempo 1ª Prov.",v:"3.2d",c:K.ac},{l:"Conclusão Semanal",v:"72%",c:K.ac},{l:"Sem Movim. (>7d)",v:all.filter(p=>p.semMov>=7).length,c:K.wa},{l:"Prov. Pendentes",v:all.filter(p=>p.status==="Ativo").length,c:K.cr},{l:"Follow-ups",v:all.filter(p=>p.depTerc).length,c:K.wa},{l:"Conclusão Média",v:"18.5d",c:K.su}];
  /* v41 · TorresPrazo · top 8 prazos mais urgentes em topografia 3D */
  const cnTorres = all
    .filter(function(p){ return p.diasRestantes != null; })
    .sort(function(a,b){ return a.diasRestantes - b.diasRestantes; })
    .slice(0, 8)
    .map(function(p){
      return {
        l: p.diasRestantes + "du",
        t: (p.tipoPeca || "—").toString().slice(0, 10),
        s: (p.num || p.numeroSEI || "—").toString().slice(0, 14),
        v: p.diasRestantes,
      };
    });
  return(
  <div className="cj-pg"><h2 className="cj-up" style={{margin:"0 0 24px",fontSize:22,fontWeight:700,color:K.txt}}>Analytics</h2>
    <div className="cj-st" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(165px,1fr))",gap:12,marginBottom:24}}>{mt.map((m,i)=><Bx key={i} style={{padding:"14px 16px"}}><div style={{fontSize:11,color:K.dim,marginBottom:8,fontWeight:500,textTransform:"uppercase"}}>{m.l}</div><div style={{fontSize:26,fontWeight:700,color:m.c,fontFamily:"'JetBrains Mono',monospace"}}>{m.v}</div></Bx>)}</div>
    {/* v41 · TorresPrazo no Analytics · topografia 3D dos top 8 mais urgentes */}
    {cnTorres.length>0 && (
      <div style={{marginBottom:24}}>
        <TorresPrazo data={cnTorres}/>
      </div>
    )}
    <Bx><SH icon={BarChart3} title="Por Fase de Trabalho"/><ResponsiveContainer width="100%" height={250}><BarChart data={phD} layout="vertical" barSize={14}><XAxis type="number" tick={{fill:K.dim2,fontSize:10}} axisLine={false} tickLine={false}/><YAxis dataKey="name" type="category" tick={{fill:K.dim,fontSize:10}} width={100} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:K.modal,border:`1px solid ${K.brd}`,borderRadius:8,color:K.txt,fontSize:12}}/><Bar dataKey="adm" fill={K.ac} name="Admin" radius={[0,4,4,0]}/><Bar dataKey="jud" fill={K.pu} name="Judicial" radius={[0,4,4,0]}/></BarChart></ResponsiveContainer></Bx>
  </div>
)};

/* DETAIL MODAL */
function DetMod(dProps){var p=dProps.item,oc=dProps.onClose,dp=dProps.dp,onEdit=dProps.onEdit,setDjeProc=dProps.setDjeProc,st=dProps.st,ss=dProps.ss;if(!p)return null;const isJ=p.tipo==="jud",isA=p.tipo==="adm";const accent=uC(p.diasRestantes);return(
  <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(2,6,23,.78)",backdropFilter:"blur(10px)",zIndex:1000,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"34px 20px",overflowY:"auto"}} onClick={e=>{if(e.target===e.currentTarget)oc()}}>
    <div className="cj-sc cj-soft" style={{background:"linear-gradient(180deg,rgba(13,18,35,.98),rgba(8,12,24,.98))",border:`1px solid ${accent}28`,borderRadius:28,width:"100%",maxWidth:1080,padding:0,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:"0 0 auto 0",height:1,background:`linear-gradient(90deg,transparent,${accent},transparent)`}}/>
      <div style={{padding:"14px 18px 10px",borderBottom:`1px solid ${K.brd}55`,background:"rgba(2,6,16,.45)",display:"flex",justifyContent:"flex-end",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <DoneBtn onClick={()=>{dp({type:"COMPLETE_P",id:p.id});oc();}}/>
        {p.linkSEI&&<button onClick={function(){window.open(p.linkSEI,"_blank","noopener,noreferrer");}} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 12px",borderRadius:12,border:"1px solid rgba(0,229,255,.3)",background:"rgba(0,229,255,.08)",color:"#00e5ff",fontSize:13,fontWeight:700,cursor:"pointer",boxShadow:"0 0 14px rgba(0,229,255,.18)",textShadow:"0 0 6px rgba(0,229,255,.6)",fontFamily:"inherit"}}>🗂️ Processo SEI</button>}
        {!isJ&&React.createElement(function(){var[showP,sShowP]=useState(false);return React.createElement(React.Fragment,null,React.createElement("button",{onClick:function(){sShowP(true);},style:{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 12px",borderRadius:12,border:"1px solid rgba(184,77,255,.32)",background:"rgba(184,77,255,.08)",color:"#b84dff",fontSize:13,fontWeight:700,cursor:"pointer",boxShadow:"0 0 12px rgba(184,77,255,.16)",fontFamily:"inherit"}},"📋 Elaborar Parecer"),showP&&React.createElement(ParecerModal,{proc:p,onClose:function(){sShowP(false);}}));},null)}
        {React.createElement(function(){var[showTpl,sShowTpl]=useState(false);return(<><button onClick={()=>sShowTpl(true)} style={{...btnGhost,padding:"8px 12px",color:"#b84dff",borderColor:"rgba(184,77,255,.3)"}}><Zap size={14}/>IA Estrutura</button>{showTpl&&<IATplModal proc={p} onClose={()=>sShowTpl(false)}/>}</>);})}
        <button onClick={()=>onEdit(p)} style={{...btnGhost,padding:"8px 12px"}}><PenLine size={14}/>Editar</button>
        {/* ═══ DUPLICAR PROCESSO ═══ */}
        {React.createElement(function(){return React.createElement("button",{onClick:function(e){e.stopPropagation();dp({type:"DUP_P",id:p.id});oc();},style:{...btnGhost,padding:"8px 12px",color:"#22d3ee",borderColor:"rgba(34,211,238,.3)"}},React.createElement(Copy,{size:14}),"Duplicar");},null)}
        {/* ═══ RESUMO EXECUTIVO IA ═══ */}
        {React.createElement(function(){var[loading,sLoad]=useState(false);var[resumo,sResumo]=useState("");var[copied,sCopied]=useState(false);var gerar=function(){sLoad(true);sResumo("");var ctx="Processo: "+(p.num||"N/I")+" | SEI: "+(p.numeroSEI||"—")+" | Assunto: "+(p.assunto||"—")+" | Tipo: "+(p.tipoPeca||"—")+" | Tribunal: "+(p.tribunal||p.orgao||"—")+" | Parte contrária: "+(p.parteContraria||p.interessado||"—")+" | Prazo: "+fmt(p.prazoFinal)+" ("+p.diasRestantes+"du) | Status: "+p.status+" | Fase: "+p.fase+" | Próxima providência: "+(p.proxProv||"—")+" | Obs: "+(p.obs||"—");fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:300,messages:[{role:"user",content:"Gere um RESUMO EXECUTIVO de 3 a 5 linhas deste processo para compartilhar por email com um colega advogado. Seja conciso e objetivo. Sem travessão. Inclua: número, assunto, próxima providência e prazo.\n\n"+ctx}]})}).then(function(r){return r.json();}).then(function(d){var t=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("").trim();sResumo(t||"Sem resultado.");sLoad(false);}).catch(function(){sResumo("Erro ao gerar.");sLoad(false);});};if(resumo)return React.createElement("div",{style:{position:"absolute",top:60,right:18,zIndex:10,width:380,padding:16,borderRadius:14,background:K.modal,border:"1px solid "+K.brd,boxShadow:"0 20px 50px rgba(0,0,0,.7)"}},React.createElement("div",{style:{fontSize:10,color:K.ac,fontWeight:700,marginBottom:8,textTransform:"uppercase"}},"Resumo Executivo"),React.createElement("div",{style:{fontSize:12,color:K.txt,lineHeight:1.7,whiteSpace:"pre-wrap",marginBottom:10}},resumo),React.createElement("div",{style:{display:"flex",gap:6}},React.createElement("button",{onClick:function(){try{navigator.clipboard.writeText(resumo);sCopied(true);setTimeout(function(){sCopied(false);},2000);}catch(e){}},style:{...btnPrim,flex:1,justifyContent:"center",padding:"8px",fontSize:11,color:copied?"#00ff88":"#00e5ff"}},copied?"✅ Copiado!":"📋 Copiar"),React.createElement("button",{onClick:function(){sResumo("");},style:{...btnGhost,padding:"8px 12px",fontSize:11}},"Fechar")));return React.createElement("button",{onClick:loading?null:gerar,disabled:loading,style:{...btnGhost,padding:"8px 12px",color:"#ffb800",borderColor:"rgba(255,184,0,.3)"}},loading?"⏳":"📝","Resumo IA");},null)}
        {/* ═══ IA SUGESTÃO DE PROVIDÊNCIA ═══ */}
        {!p.proxProv&&React.createElement(function(){var[loading,sLoad]=useState(false);var sugerir=function(){sLoad(true);var ctx="Tipo: "+(p.tipoPeca||"—")+" | Fase: "+p.fase+" | Status: "+p.status+" | Tribunal: "+(p.tribunal||"—")+" | Assunto: "+(p.assunto||"—")+" | Obs: "+(p.obs||"—");fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:150,messages:[{role:"user",content:"Voce e advogado da COJUR/CFM. Baseado no contexto abaixo, sugira UMA próxima providência concisa (máx 1 frase) para este processo. Sem travessão.\n\n"+ctx}]})}).then(function(r){return r.json();}).then(function(d){var t=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("").trim();if(t)dp({type:"UPD",id:p.id,isAdm:p.tipo==="adm",ch:{proxProv:t}});sLoad(false);}).catch(function(){sLoad(false);});};return React.createElement("button",{onClick:loading?null:sugerir,disabled:loading,style:{...btnGhost,padding:"8px 12px",color:"#a855f7",borderColor:"rgba(168,85,247,.3)",animation:"cjPulse 2s ease infinite"}},loading?"⏳ Analisando...":"🤖 IA Sugerir Providência");},null)}
        <button onClick={function(){exportProcessPDF(p);}} style={{...btnGhost,padding:"8px 12px",color:K.su,borderColor:K.su+"33"}}><FileText size={14}/>PDF</button>
        <button onClick={oc} style={{background:"none",border:"none",color:K.dim,cursor:"pointer",padding:10,marginLeft:4}}><X size={20}/></button>
      </div>

      <div style={{padding:"28px 28px 20px",borderBottom:`1px solid ${K.brd}`,background:"linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,0))"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14,flexWrap:"wrap"}}>
          <CFMMark size={44}/>
          <div style={{minWidth:0,flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:8}}>
              <Bd color={isJ?K.pu:K.ac}>{isJ?"Processo Judicial":"Processo Administrativo"}</Bd>
              <Bd color={accent} glow={accent===K.cr?K.crG:accent===K.wa?K.waG:K.suG}>{uL(p.diasRestantes)}</Bd>
              {p.numeroSEI&&<Bd color={K.ac}>SEI {p.numeroSEI}</Bd>}
              {isJ&&<Bd color={K.pu}>{p.tribunal}</Bd>}
              {p.tipoPeca&&<Bd>{p.tipoPeca}</Bd>}
            </div>
            <div style={{fontSize:16,fontWeight:800,color:"#7dd3fc",fontFamily:"'JetBrains Mono',monospace",marginBottom:6}}>{p.num||"Sem nº principal"}</div>
            <h2 style={{margin:0,fontSize:26,fontWeight:800,color:K.txt,lineHeight:1.28}}>{p.assunto||"Sem assunto"}</h2>
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}} onClick={e=>e.stopPropagation()}>
          <UB d={p.diasRestantes} prazoFinal={p.prazoFinal}/><SB s={p.score}/>
          <IS value={p.status} options={STS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:isA,ch:{status:v}})}/>
          <IS value={p.fase} options={PHS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:isA,ch:{fase:v}})} color={K.ac}/>
          {p.linkRef&&<button onClick={e=>{e.stopPropagation();openRef(p.linkRef)}} style={{...btnGhost,padding:"6px 10px",fontSize:11,color:K.ac,borderColor:K.ac+"44"}}>Abrir link</button>}
        </div>
        {hasCustas(p)&&<div className="cj-custas-blink" style={{marginTop:12,display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:12,background:"rgba(245,158,11,.14)",border:"1px solid rgba(245,158,11,.5)"}}>
          <DollarSign size={16} color={K.wa}/><div style={{flex:1}}><div style={{fontSize:11,fontWeight:800,color:K.wa}}>RECOLHIMENTO DE CUSTAS OBRIGATÓRIO</div><div style={{fontSize:10,color:"#fde68a",marginTop:2}}>O recurso "{p.tipoAcao}" exige preparo judicial. Providencie GRU/DARF antes de protocolar, sob pena de deserção.</div>
          {(function(){var ci=getCustasInfo(p.tribunal);return ci?(<div style={{marginTop:6,padding:"6px 10px",borderRadius:8,background:"rgba(255,184,0,.12)",border:"1px solid rgba(255,184,0,.25)",fontSize:10}}>
            <div style={{color:"#fde68a",fontWeight:700}}>{ci.label}</div>
            <div style={{color:"#fbbf24",marginTop:2}}>Valor estimado: {ci.valor}</div>
            {ci.url&&<a href={ci.url} target="_blank" rel="noopener noreferrer" className="cj-link" style={{fontSize:10,color:"#fbbf24",marginTop:3,display:"inline-block"}}>Acessar sistema de GRU</a>}
          </div>):null;})()}
          </div>
        </div>}
        {p.tipoPeca==="Sustentação Oral"&&<div className="cj-pulse" style={{marginTop:12,display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:12,background:"rgba(184,77,255,.12)",border:"1px solid rgba(184,77,255,.45)",animation:"cjPulse 2s ease-in-out infinite"}}>
          <Gavel size={16} color="#b84dff"/><div><div style={{fontSize:11,fontWeight:800,color:"#b84dff"}}>INSCRIÇÃO PARA SUSTENTAÇÃO ORAL</div><div style={{fontSize:10,color:"#d8b4fe",marginTop:2}}>Verifique se a inscrição para sustentação oral foi realizada no tribunal. A inscrição deve ser feita antes do prazo limite de 48h úteis da sessão de julgamento.</div>
          {p.dataSustentacao&&<div style={{fontSize:10,color:"#c084fc",marginTop:4,fontWeight:700}}>Sessão: {(new Date(p.dataSustentacao)).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})} — Deadline de envio: {getSustDeadlineStr(p)||"definir data"}</div>}
          </div>
        </div>}
      </div>
      <div style={{padding:"0 28px"}} onClick={function(e){e.stopPropagation();}}>
        <StatusStepper current={p.status} onSet={function(v){dp({type:"UPD",id:p.id,isAdm:isA,ch:{status:v}});}}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1.15fr .85fr",gap:0}}>
        <div style={{padding:"24px 28px",borderRight:`1px solid ${K.brd}`}}>
          <div style={{marginBottom:22}}>
            <div style={lblSt}>Resumo executivo</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div style={{padding:"14px 16px",borderRadius:16,background:"rgba(255,255,255,.025)",border:`1px solid ${K.brd}`}}>
                <div style={{fontSize:10,color:K.dim,textTransform:"uppercase",fontWeight:700,marginBottom:6}}>Próxima providência</div>
                <div style={{fontSize:14,color:K.txt,fontWeight:800,lineHeight:1.45}}>{p.proxProv||"Não definida"}</div>
                <div style={{fontSize:11,color:K.dim,marginTop:6}}>Data: {p.dataProv?fmt(toD(p.dataProv)):"—"} · Estimativa: {p.estTempo||"—"}</div>
              </div>
              <div style={{padding:"14px 16px",borderRadius:16,background:`linear-gradient(180deg,${accent}12,rgba(255,255,255,.02))`,border:`1px solid ${accent}22`}}>
                <div style={{fontSize:10,color:K.dim,textTransform:"uppercase",fontWeight:700,marginBottom:6}}>Risco e prazo</div>
                <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:8}}>
                  <span style={{fontSize:28,fontWeight:800,color:accent,fontFamily:"'JetBrains Mono',monospace"}}>{p.diasRestantes}</span>
                  <span style={{fontSize:12,color:K.dim}}>dias corridos</span>
                </div>
                <PB value={Math.max(0,60-p.diasRestantes)} max={60} color={accent}/>
              </div>
            </div>
          </div>

          {p.destaque&&<div style={{marginBottom:22}}>
            <div style={lblSt}>Destaque do processo</div>
            <div className="cj-soft" style={{fontSize:13,color:K.txt,lineHeight:1.7,padding:16,background:`linear-gradient(180deg,${K.acG},rgba(255,255,255,.02))`,border:`1px solid ${K.ac}22`,borderRadius:18}}>{p.destaque}</div>
          </div>}

          {p.obs&&<div style={{marginBottom:22}}>
            <div style={lblSt}>Observações</div>
            <div style={{fontSize:13,color:K.txt,lineHeight:1.7,padding:16,background:"rgba(255,255,255,.025)",border:`1px solid ${K.brd}`,borderRadius:18}}>{p.obs}</div>
          </div>}

          {p.hist&&p.hist.length>0&&<div style={{marginBottom:22}}>
            <div style={{...lblSt,marginBottom:8}}>Histórico de Movimentações</div>
            <div style={{position:"relative",paddingLeft:24,maxHeight:280,overflowY:"auto"}}>
              {/* Vertical timeline line */}
              <div style={{position:"absolute",left:8,top:4,bottom:4,width:2,background:`linear-gradient(180deg,${K.ac}55,${K.pu}33,transparent)`,borderRadius:2}}/>
              {p.hist.slice().reverse().slice(0,15).map(function(h,i){var isFirst=i===0;return(
                <div key={i} style={{position:"relative",paddingBottom:14,paddingLeft:16}}>
                  {/* Timeline dot */}
                  <div style={{position:"absolute",left:-4,top:6,width:10,height:10,borderRadius:"50%",background:isFirst?K.ac:K.dim2,border:"2px solid "+(isFirst?K.ac+"88":K.brd),boxShadow:isFirst?"0 0 10px "+K.ac+"55":"none",zIndex:1}}/>
                  <div style={{padding:"10px 14px",borderRadius:12,background:isFirst?"rgba(0,229,255,.06)":"rgba(255,255,255,.02)",border:"1px solid "+(isFirst?"rgba(0,229,255,.18)":"rgba(255,255,255,.06)"),transition:"all .2s"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <div style={{fontSize:9,color:isFirst?K.ac:K.dim,fontFamily:"'JetBrains Mono',monospace",fontWeight:700}}>{h.data||h.d?fmt(toD(h.data||h.d)):"—"}</div>
                      <div style={{fontSize:9,color:K.dim2,background:"rgba(255,255,255,.04)",padding:"1px 6px",borderRadius:4}}>{h.user||"COJUR"}</div>
                    </div>
                    <div style={{fontSize:12,color:isFirst?K.txt:"#94a3b8",lineHeight:1.5}}>{h.txt||h.e||"—"}</div>
                  </div>
                </div>
              );})}
            </div>
            {/* Inline add movimentação */}
            {React.createElement(function(){
              var s=useState("");var novoMov=s[0],setNovoMov=s[1];
              var s2=useState(false);var added=s2[0],setAdded=s2[1];
              return React.createElement("div",{style:{display:"flex",gap:8,marginTop:8}},
                React.createElement("input",{
                  value:novoMov,
                  onChange:function(e){setNovoMov(e.target.value);setAdded(false);},
                  onKeyDown:function(e){if(e.key==="Enter"&&novoMov.trim()){dp({type:"ADD_MOV",id:p.id,isAdm:isA,txt:novoMov.trim()});setNovoMov("");setAdded(true);setTimeout(function(){setAdded(false);},2000);}},
                  placeholder:"Adicionar movimentação...",
                  style:{...inpSt,flex:1,padding:"8px 12px",fontSize:11}
                }),
                React.createElement("button",{
                  onClick:function(){if(!novoMov.trim())return;dp({type:"ADD_MOV",id:p.id,isAdm:isA,txt:novoMov.trim()});setNovoMov("");setAdded(true);setTimeout(function(){setAdded(false);},2000);},
                  style:{...btnGhost,padding:"8px 12px",fontSize:11,color:added?K.su:K.ac,borderColor:added?K.su+"55":K.brd}
                },added?"✅ Adicionado":"+ Registrar")
              );
            },null)}
          </div>}
          {/* Show add form even when hist is empty */}
          {(!p.hist||!p.hist.length)&&<div style={{marginBottom:22}}>
            <div style={{...lblSt,marginBottom:8}}>Histórico de Movimentações</div>
            <div style={{padding:"16px",textAlign:"center",borderRadius:12,border:"1px dashed "+K.brd,color:K.dim2,fontSize:12,marginBottom:8}}>Nenhuma movimentação registrada</div>
            {React.createElement(function(){
              var s=useState("");var novoMov=s[0],setNovoMov=s[1];
              var s2=useState(false);var added=s2[0],setAdded=s2[1];
              return React.createElement("div",{style:{display:"flex",gap:8}},
                React.createElement("input",{
                  value:novoMov,
                  onChange:function(e){setNovoMov(e.target.value);setAdded(false);},
                  onKeyDown:function(e){if(e.key==="Enter"&&novoMov.trim()){dp({type:"ADD_MOV",id:p.id,isAdm:isA,txt:novoMov.trim()});setNovoMov("");setAdded(true);setTimeout(function(){setAdded(false);},2000);}},
                  placeholder:"Primeira movimentação...",
                  style:{...inpSt,flex:1,padding:"8px 12px",fontSize:11}
                }),
                React.createElement("button",{
                  onClick:function(){if(!novoMov.trim())return;dp({type:"ADD_MOV",id:p.id,isAdm:isA,txt:novoMov.trim()});setNovoMov("");setAdded(true);setTimeout(function(){setAdded(false);},2000);},
                  style:{...btnGhost,padding:"8px 12px",fontSize:11,color:added?K.su:K.ac,borderColor:added?K.su+"55":K.brd}
                },added?"✅ Adicionado":"+ Registrar")
              );
            },null)}
          </div>}
          {isJ&&(function(){var prazo=p.pubDJe?calcPrazoDJe(p.pubDJe,p.intersticio||15):null;var du=prazo?diffD(prazo,NOW):null;var sys=getTribSistema(p.tribunal);return(
            <div style={{marginBottom:22}}>
              <div style={{...lblSt,cursor:isJ?"pointer":"default"}} onClick={function(){if(setDjeProc&&isJ)setDjeProc(p);}} title="Clique para buscar DJe automaticamente">Sistema · DJe · Protocolo {isJ?"(clique p/ buscar DJe)":""}</div>
              {p.num&&<div style={{marginBottom:8,padding:"8px 14px",borderRadius:10,background:"rgba(0,229,255,.07)",border:"1px solid rgba(0,229,255,.2)",display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:10,color:K.dim,textTransform:"uppercase",fontWeight:700,letterSpacing:".5px"}}>Nº Judicial</span>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",color:"#00e5ff",fontWeight:700,fontSize:13}}>{p.num}</span>
                  {React.createElement(function(){var s=useState(false);var ck=s[0],sCk=s[1];return React.createElement("button",{onClick:function(){try{navigator.clipboard.writeText(p.num).then(function(){sCk(true);setTimeout(function(){sCk(false);},2000);});}catch(e){var ta=document.createElement("textarea");ta.value=p.num;document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta);sCk(true);setTimeout(function(){sCk(false);},2000);}},style:{marginLeft:"auto",padding:"4px 12px",borderRadius:8,border:ck?"1px solid rgba(0,255,136,.5)":"1px solid rgba(0,229,255,.25)",background:ck?"rgba(0,255,136,.1)":"rgba(0,229,255,.06)",color:ck?"#00ff88":"#00e5ff",fontSize:10,fontWeight:700,cursor:"pointer",transition:"all .3s",fontFamily:"inherit"}},ck?"✅ Copiado!":"📋 Copiar nº");},null)}
                </div>}
              <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"stretch"}}>
                {sys&&<div style={{display:"flex",flexDirection:"column",gap:8}}>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {React.createElement(function(){var s=useState(false);var ck=s[0],sCk=s[1];return React.createElement("button",{onClick:function(){openTrib(p.tribunal,p.num);sCk(true);setTimeout(function(){sCk(false);},2000);},title:"Abre o sistema e copia o nº judicial",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"11px 16px",borderRadius:13,border:ck?"1px solid rgba(0,255,136,.5)":"1px solid rgba(0,229,255,.4)",background:ck?"linear-gradient(135deg,rgba(0,255,136,.14),rgba(0,255,136,.05))":"linear-gradient(135deg,rgba(0,229,255,.16),rgba(0,229,255,.06))",color:ck?"#00ff88":"#00e5ff",fontSize:12,fontWeight:800,cursor:"pointer",boxShadow:ck?"0 0 20px rgba(0,255,136,.25)":"0 0 20px rgba(0,229,255,.22)",textShadow:"0 0 8px currentColor",fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",animation:"neonPulse 3s ease-in-out infinite",transition:"all .3s"}},ck?"✅ Nº copiado! Abrindo...":sys.icone+" "+sys.sistema+" — 2º Grau");},null)}
                    {sys.url1g&&sys.url1g!==sys.url&&React.createElement(function(){var s=useState(false);var ck=s[0],sCk=s[1];return React.createElement("button",{onClick:function(){if(p.num){try{navigator.clipboard.writeText(p.num);}catch(e){var ta=document.createElement("textarea");ta.value=p.num;document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta);}}window.open(sys.url1g,"_blank","noopener,noreferrer");sCk(true);setTimeout(function(){sCk(false);},2000);},title:"Abre o sistema e copia o nº judicial",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"11px 16px",borderRadius:13,border:ck?"1px solid rgba(0,255,136,.5)":"1px solid rgba(168,85,247,.4)",background:ck?"linear-gradient(135deg,rgba(0,255,136,.12),rgba(0,255,136,.04))":"linear-gradient(135deg,rgba(168,85,247,.14),rgba(168,85,247,.06))",color:ck?"#00ff88":"#b84dff",fontSize:12,fontWeight:800,cursor:"pointer",boxShadow:ck?"0 0 18px rgba(0,255,136,.2)":"0 0 18px rgba(168,85,247,.2)",textShadow:"0 0 8px currentColor",fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",animation:"neonPulse 4s ease-in-out infinite",transition:"all .3s"}},ck?"✅ Nº copiado! Abrindo...":sys.icone+" "+sys.sistema+" — 1º Grau");},null)}
                    {sys.url2&&React.createElement(function(){var s=useState(false);var ck=s[0],sCk=s[1];return React.createElement("button",{onClick:function(){if(p.num){try{navigator.clipboard.writeText(p.num);}catch(e){var ta=document.createElement("textarea");ta.value=p.num;document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta);}}window.open(sys.url2,"_blank","noopener,noreferrer");sCk(true);setTimeout(function(){sCk(false);},2000);},title:"Abre eProc e copia o nº judicial",style:{display:"inline-flex",alignItems:"center",gap:8,padding:"11px 16px",borderRadius:13,border:ck?"1px solid rgba(0,255,136,.5)":"1px solid rgba(0,255,136,.35)",background:ck?"linear-gradient(135deg,rgba(0,255,136,.14),rgba(0,255,136,.04))":"linear-gradient(135deg,rgba(0,255,136,.12),rgba(0,255,136,.05))",color:"#00ff88",fontSize:12,fontWeight:800,cursor:"pointer",boxShadow:"0 0 14px rgba(0,255,136,.18)",fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",transition:"all .3s"}},ck?"✅ Nº copiado! Abrindo...":"⚙️ e-Proc");},null)}
                  </div>
                  {sys.info&&<div style={{fontSize:10,color:K.dim,padding:"8px 12px",borderRadius:10,background:"rgba(0,229,255,.04)",border:"1px solid rgba(0,229,255,.1)",lineHeight:1.6}}>ℹ️ {sys.info}</div>}
                </div>}
                {p.pubDJe&&prazo&&<div style={{padding:"12px 14px",borderRadius:14,background:du<=0?"rgba(255,46,91,.12)":du<=5?"rgba(255,184,0,.12)":"rgba(0,229,255,.08)",border:"1px solid "+(du<=0?"rgba(255,46,91,.4)":du<=5?"rgba(255,184,0,.4)":"rgba(0,229,255,.25)"),minWidth:160}}>
                  <div style={{fontSize:9,color:K.dim,textTransform:"uppercase",fontWeight:700,letterSpacing:".5px",marginBottom:4}}>Prazo DJe ({p.intersticio||15}du)</div>
                  <div style={{fontSize:18,fontWeight:800,color:du<=0?"#ff2e5b":du<=5?"#ffb800":"#00e5ff",fontFamily:"Orbitron,monospace",textShadow:"0 0 10px currentColor"}}>{du<=0?"VENCIDO":du+"du"}</div>
                  <div style={{fontSize:10,color:K.dim,marginTop:2}}>Vence: {fmt(prazo)} · Pub: {fmt(toD(p.pubDJe))}</div>
                </div>}
                {!p.pubDJe&&<div style={{padding:"12px 14px",borderRadius:14,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:11,color:K.dim}}>Preencha a data de publicação no DJe no formulário de edição para calcular o prazo automaticamente.</span>
                </div>}
              </div>
            </div>
          );})()}
          <ProcessLinkPanel proc={p} st={st} dp={dp} ss={ss}/>
          <div style={{marginBottom:22}}>
            <div style={lblSt}>Identificação e vínculo</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[["Nº Principal",p.num||"—"],["Nº SEI",p.numeroSEI||"—"],[isJ?"Órgão / Gabinete":"Órgão / Unidade",p.orgao||"—"],["Responsável",p.responsavel||"—"],[isJ?"Parte Contrária":"Interessado",isJ?p.parteContraria:p.interessado],...(isJ?[["Tipo de Ação",p.tipoAcao||"—"]]:[]),["Prazo Final",fmt(p.prazoFinal)],["Sem Movimentação",`${p.semMov}d`]].map(([l,v])=><div key={l} style={{padding:"12px 14px",borderRadius:16,background:"rgba(255,255,255,.022)",border:`1px solid ${K.brd}`}}><div style={{fontSize:10,color:K.dim,textTransform:"uppercase",fontWeight:700,marginBottom:5}}>{l}</div><div style={{fontSize:13,color:K.txt,fontWeight:700,lineHeight:1.45,wordBreak:"break-word"}}>{v||"—"}</div></div>)}
            </div>
          </div>

          {p.checklist&&p.checklist.length>0&&<div>
            <div style={lblSt}>Checklist da peça</div>
            <div style={{padding:16,borderRadius:18,background:"rgba(255,255,255,.022)",border:`1px solid ${K.brd}`}}>
              <CL items={p.checklist} onToggle={i=>dp({type:"TCLP",id:p.id,isAdm:isA,idx:i})}/>
            </div>
          </div>}
        </div>

        <div style={{padding:"24px 28px"}}>
          <div style={{marginBottom:18}}>
            <div style={lblSt}>Dossiê rápido</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {p.reuniao&&<Bd color={K.ac}><Calendar size={10}/>Reunião vinculada</Bd>}
              {p.sustentacao&&<Bd color={K.pu}><Gavel size={10}/>Sustentação</Bd>}
              {p.depTerc&&<Bd color={K.wa}><Users size={10}/>Depende de terceiros</Bd>}
              {p.linkRef&&<Bd color={K.ac}><FolderOpen size={10}/>Link disponível</Bd>}
              {p.linkSEI&&<Bd color={K.ac}>🗂️ SEI vinculado</Bd>}
            </div>
          </div>

          <div style={{marginBottom:20}}>
            <div style={lblSt}>Linha do tempo</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[...(p.hist||[])].map((h,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"20px 1fr",gap:10}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:i===0?accent:K.ac,boxShadow:`0 0 14px ${i===0?accent:K.ac}66`,marginTop:4}}/>
                  {i<(p.hist||[]).length-1&&<div style={{width:2,flex:1,background:`linear-gradient(180deg,${K.brd},transparent)`,marginTop:6}}/>}
                </div>
                <div style={{padding:"10px 12px",borderRadius:14,background:"rgba(255,255,255,.022)",border:`1px solid ${K.brd}`}}>
                  <div style={{fontSize:10,color:K.dim,textTransform:"uppercase",fontWeight:700,marginBottom:4}}>{fmt(toD(h.d))}</div>
                  <div style={{fontSize:12,color:K.txt,lineHeight:1.55}}>{h.e}</div>
                </div>
              </div>)}
              {(!p.hist||!p.hist.length)&&<div style={{padding:"18px 14px",borderRadius:16,background:"rgba(255,255,255,.02)",border:`1px solid ${K.brd}`,textAlign:"center",color:K.dim2,fontSize:12}}>Sem histórico registrado.</div>}
            </div>
          </div>

          <div style={{marginBottom:20}}>
            <div style={lblSt}>Vínculo SEI ↔ Judicial</div>
            {(function(){
              var linked = p.numeroSEI ? findBySEI({adm:st&&st.adm||[],jud:st&&st.jud||[]}, p.numeroSEI) : null;
              var linkedBySEI = linked && linked.id !== p.id ? linked : null;
              if(!linkedBySEI) return null;
              return(
                <div style={{padding:"10px 14px",borderRadius:12,background:"rgba(0,229,255,.07)",border:"1px solid rgba(0,229,255,.25)",marginBottom:8,cursor:"pointer"}} onClick={function(){if(ss)ss(linkedBySEI);}}>
                  <div style={{fontSize:9,color:"#00e5ff",fontWeight:700,textTransform:"uppercase",letterSpacing:".5px",marginBottom:4}}>Processo vinculado pelo SEI</div>
                  <div style={{fontSize:12,fontWeight:700,color:K.txt}}>{linkedBySEI.assunto}</div>
                  <div style={{fontSize:10,color:"#7dd3fc",fontFamily:"'JetBrains Mono',monospace",marginTop:2}}>{linkedBySEI.num||linkedBySEI.numeroSEI}</div>
                </div>
              );
            })()}
            <div style={lblSt}>Vínculo externo</div>
            <div style={{padding:"14px 16px",borderRadius:18,background:"rgba(255,255,255,.022)",border:`1px solid ${K.brd}`}}>
              <div style={{fontSize:10,color:K.dim,textTransform:"uppercase",fontWeight:700,marginBottom:6}}>Link de referência</div>
              {p.linkRef&&<div style={{marginBottom:8}}><div style={{fontSize:10,color:K.dim,marginBottom:4,textTransform:"uppercase",fontWeight:600}}>Link de Referência</div><a className="cj-link" href={p.linkRef} target="_blank" rel="noreferrer" style={{fontSize:13,fontWeight:700,wordBreak:"break-all"}}>{p.linkRef}</a></div>}
              {p.linkSEI&&<div style={{marginBottom:8}}><div style={{fontSize:10,color:K.dim,marginBottom:4,textTransform:"uppercase",fontWeight:600}}>Processo SEI</div><a className="cj-link" href={p.linkSEI} target="_blank" rel="noreferrer" style={{fontSize:13,fontWeight:700,wordBreak:"break-all",color:"#00e5ff"}}>{p.linkSEI}</a></div>}
              {!p.linkRef&&!p.linkSEI&&<div style={{fontSize:12,color:K.dim2}}>Sem links vinculados.</div>}
            </div>
          </div>

          {p.tags&&p.tags.length>0&&<div>
            <div style={lblSt}>Tags</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{p.tags.map(t=><Bd key={t} color={K.ac}><Tag size={9}/>{t}</Bd>)}</div>
          </div>}
        </div>
      </div>
    </div>
  </div>
)};
/* REALIZADOS */
const DonePg=({st,ss})=>{const itens=[...(st.realizados||[])].sort((a,b)=>toD(b.realizadoEm)-toD(a.realizadoEm));return(
  <div className="cj-pg">
    <div className="cj-up" style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
      <CFMMark size={34}/>
      <h2 style={{margin:0,fontSize:22,fontWeight:800,color:K.txt}}>Processos Realizados</h2>
      <Bd color={K.su}>{itens.length}</Bd>
    </div>
    <Bx style={{padding:0,overflow:"hidden"}}>
      <div style={{overflowX:"auto"}}>
        <table className="cj-table" style={{width:"100%",fontSize:12}}>
          <thead>
            <tr style={{borderBottom:`1px solid ${K.brd}`}}>
              {["Nº","Assunto","Tipo","Tribunal / Interessado","Realizado em","Status"].map(h=><th key={h} style={{padding:"12px 14px",textAlign:"left",color:K.dim,fontWeight:500,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {itens.map(p=><tr key={p.id+"-"+toISO(p.realizadoEm)} onClick={()=>ss(p)} style={{borderBottom:`1px solid ${K.brd}`,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.02)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <td style={{padding:"10px 14px",fontFamily:"'JetBrains Mono',monospace",color:K.ac}}>{p.num||"—"}</td>
              <td style={{padding:"10px 14px",color:K.txt}}>{p.assunto||"—"}</td>
              <td style={{padding:"10px 14px"}}><Bd color={p.tipo==="jud"?K.pu:K.ac}>{p.realizadoTipo|| (p.tipo==="jud"?"Judicial":"Administrativo")}</Bd></td>
              <td style={{padding:"10px 14px",color:K.dim}}>{p.tipo==="jud"?(p.tribunal||"—"):(p.interessado||"—")}</td>
              <td style={{padding:"10px 14px",color:K.txt,fontWeight:600}}>{fmt(toD(p.realizadoEm))}</td>
              <td style={{padding:"10px 14px"}}><Bd color={K.su} glow={K.suG}><CheckCircle size={10}/>Realizado</Bd></td>
            </tr>)}
          </tbody>
        </table>
      </div>
      {!itens.length&&<EmptyState icon="done" color={K.su} title="Nenhum processo concluído ainda" sub="Conclua processos para vê-los aqui"/>}
    </Bx>
  </div>
)};

/* SETTINGS */
const SettPg=({dp,st})=>{const[conf,sConf]=useState(false);const[notifStatus,setNotifStatus]=useState(typeof Notification!=="undefined"?Notification.permission:"unsupported");return(
  <div className="cj-pg"><h2 className="cj-up" style={{margin:"0 0 24px",fontSize:22,fontWeight:700,color:K.txt}}>Configurações</h2>
    {/* ═══ NOTIFICAÇÕES PUSH ═══ */}
    <Bx style={{marginBottom:16}}>
      <SH icon={Bell} title="Notificações Push"/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0"}}>
        <div><div style={{fontSize:13,color:K.txt}}>Alertas de prazo no navegador</div><div style={{fontSize:11,color:K.dim,marginTop:2}}>Receba alertas mesmo com a aba em background</div></div>
        <button onClick={function(){if(typeof Notification!=="undefined"){Notification.requestPermission().then(function(p){setNotifStatus(p);});}}} style={{...btnPrim,padding:"8px 16px",color:notifStatus==="granted"?"#00ff88":"#00e5ff",borderColor:notifStatus==="granted"?"rgba(0,255,136,.4)":"rgba(0,229,255,.4)"}}>
          {notifStatus==="granted"?"✅ Ativadas":notifStatus==="denied"?"❌ Bloqueadas":"🔔 Ativar"}
        </button>
      </div>
    </Bx>
    {/* ═══ TEMPO REAL — RESUMO ═══ */}
    <Bx style={{marginBottom:16}}>
      <SH icon={Timer} title="Tempo Real Registrado"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
        {(function(){var all=[...(st||{}).adm||[],...(st||{}).jud||[]];var totalMin=all.reduce(function(s,p){return s+(p.tempoReal||0);},0);var totalEst=all.reduce(function(s,p){var h=parseFloat(p.estTempo)||0;return s+h*60;},0);return[
          {l:"Total registrado",v:Math.floor(totalMin/60)+"h"+String(totalMin%60).padStart(2,"0"),c:K.ac},
          {l:"Total estimado",v:Math.floor(totalEst/60)+"h",c:K.wa},
          {l:"Eficiência",v:totalEst>0?Math.round(totalMin/totalEst*100)+"%":"—",c:totalEst>0&&totalMin<=totalEst?K.su:K.cr}
        ];})().map(function(m,i){return React.createElement("div",{key:i,style:{padding:"12px 14px",borderRadius:12,background:"rgba(255,255,255,.025)",border:"1px solid "+K.brd,textAlign:"center"}},
          React.createElement("div",{style:{fontSize:10,color:K.dim,marginBottom:4,textTransform:"uppercase",fontWeight:700}},m.l),
          React.createElement("div",{style:{fontSize:22,fontWeight:800,color:m.c,fontFamily:"Orbitron,monospace"}},m.v)
        );})}
      </div>
    </Bx>
    {/* ═══ CUSTAS ATUALIZÁVEIS ═══ */}
    <Bx style={{marginBottom:16}}>
      <SH icon={DollarSign} title="Valores de Custas Judiciais"/>
      <div style={{fontSize:12,color:K.dim,marginBottom:12,lineHeight:1.6}}>Valores baseados no Ato 51/TST e tabelas TRFs (2025/2026). Edite diretamente no código-fonte ou solicite atualização quando houver novo Ato.</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,maxHeight:200,overflowY:"auto"}}>
        {Object.entries(CUSTAS_VALORES).slice(0,8).map(function(entry){return React.createElement("div",{key:entry[0],style:{padding:"8px 10px",borderRadius:8,background:"rgba(255,255,255,.025)",border:"1px solid "+K.brd}},
          React.createElement("div",{style:{fontSize:10,color:K.ac,fontWeight:700,fontFamily:"Orbitron,monospace"}},entry[0]),
          React.createElement("div",{style:{fontSize:10,color:K.dim,marginTop:2}},entry[1].valor.substring(0,50)+"...")
        );})}
      </div>
    </Bx>
    {/* ═══ BACKUP & RESET ═══ */}
    <Bx>
      <SH icon={Shield} title="Dados e Backup"/>
      <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
        <button onClick={function(){exportState(st);}} style={{...btnPrim,padding:"9px 16px"}}><Download size={14}/>Exportar JSON</button>
        <button onClick={function(){exportCSV(st);}} style={{...btnGhost,padding:"9px 16px",color:K.su,borderColor:K.su+"33"}}><Download size={14}/>Exportar CSV</button>
        {React.createElement(function(){var ref=useRef(null);return React.createElement(React.Fragment,null,
          React.createElement("input",{ref:ref,type:"file",accept:".json",style:{display:"none"},onChange:function(e){importState(e.target.files[0],dp,function(r){if(r==="ok")alert("✅ Dados restaurados!");else alert("❌ Erro ao importar.");});}}),
          React.createElement("button",{onClick:function(){ref.current&&ref.current.click();},style:{...btnGhost,padding:"9px 16px",color:K.wa,borderColor:K.wa+"33"}},React.createElement(Upload,{size:14}),"Importar JSON")
        );},null)}
      </div>
    <div style={{padding:"10px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      {!conf?(<><span style={{fontSize:13,color:K.txt}}>Resetar todos os dados</span><button style={btnDanger} onClick={()=>sConf(true)}><Trash2 size={14}/>Resetar</button></>):(
        <><span style={{fontSize:13,color:K.cr}}>Tem certeza? Todos os dados serão perdidos.</span><div style={{display:"flex",gap:8}}><button style={btnDanger} onClick={()=>{dp({type:"RST"});sConf(false);try{storage.delete(STORE_KEY).catch(()=>{})}catch(e){}}}>Sim, resetar</button><button style={btnGhost} onClick={()=>sConf(false)}>Cancelar</button></div></>
      )}
    </div>
    <div style={{fontSize:13,color:K.dim,marginTop:16,lineHeight:1.8}}><strong style={{color:K.txt}}>COJUR Nexus v15</strong> · <span style={{color:"#00ff88"}}>Auditoria completa + hardening de datas</span>: proxy /api/llm para IA, recalc automatico de prazos a cada 60s, AnimatedCounter e ConfettiHost com cleanup, dp memoizado, sync check com dp0, ADD_MOV imutavel, Pomodoro robusto a aba inativa, rehydrate validado, fetchT com timeout, toD/bizDiff/diffD/sameDay/curDate null-safe (processos sem prazo nao aparecem mais como vencendo hoje). Todas melhorias v8 a v14 preservadas.</div>
  </Bx></div>
)};

/* ═══ v10 — COMMAND PALETTE (Cmd+K) ═══ */
function CommandPalette({st, dp, sPg, ss, onClose, setShowGmail, setShowDecisao, setShowQuickAdd, setShowShortcuts, exportState, exportCSV, handleExport}){
  var[q,sQ]=useState("");var[idx,sIdx]=useState(0);var inputRef=useRef(null);
  useEffect(function(){if(inputRef.current)inputRef.current.focus();},[]);
  var nav=[
    {label:"Dashboard",icon:"📊",action:function(){sPg("dashboard");onClose();},cat:"Navegar"},
    {label:"Hoje",icon:"🎯",action:function(){sPg("today");onClose();},cat:"Navegar"},
    {label:"Esta Semana",icon:"📅",action:function(){sPg("week");onClose();},cat:"Navegar"},
    {label:"Prioridades",icon:"🔥",action:function(){sPg("priorities");onClose();},cat:"Navegar"},
    {label:"IA Nexus",icon:"⚡",action:function(){sPg("ia");onClose();},cat:"Navegar"},
    {label:"Processos Administrativos",icon:"📁",action:function(){sPg("admin");onClose();},cat:"Navegar"},
    {label:"Prazos Judiciais",icon:"⚖️",action:function(){sPg("judicial");onClose();},cat:"Navegar"},
    {label:"Em Execução",icon:"⚡",action:function(){sPg("execucao");onClose();},cat:"Navegar"},
    {label:"Protocolar",icon:"📤",action:function(){sPg("protocolar");onClose();},cat:"Navegar"},
    {label:"Em Correção",icon:"✏️",action:function(){sPg("correcao");onClose();},cat:"Navegar"},
    {label:"Realizados",icon:"✅",action:function(){sPg("done");onClose();},cat:"Navegar"},
    {label:"Agenda",icon:"📆",action:function(){sPg("agenda");onClose();},cat:"Navegar"},
    {label:"Calendário",icon:"📅",action:function(){sPg("calendar");onClose();},cat:"Navegar"},
    {label:"Timeline",icon:"📊",action:function(){sPg("timeline");onClose();},cat:"Navegar"},
    {label:"Insights IA Agregados",icon:"🧠",action:function(){sPg("insights");onClose();},cat:"Navegar"},
    {label:"Lembretes",icon:"⏰",action:function(){sPg("lembretes");onClose();},cat:"Navegar"},
    {label:"Analytics",icon:"📈",action:function(){sPg("analytics");onClose();},cat:"Navegar"},
    {label:"Auditoria",icon:"🕐",action:function(){sPg("auditlog");onClose();},cat:"Navegar"},
    {label:"Configurações",icon:"⚙️",action:function(){sPg("settings");onClose();},cat:"Navegar"},
  ];
  var actions=[
    {label:"Novo processo (quick add)",icon:"➕",action:function(){setShowQuickAdd(true);onClose();},cat:"Ação"},
    {label:"Importar Email SEI",icon:"📧",action:function(){setShowGmail(true);onClose();},cat:"Ação"},
    {label:"Resumir decisão judicial",icon:"⚖️",action:function(){setShowDecisao(true);onClose();},cat:"Ação"},
    {label:"Exportar JSON",icon:"💾",action:function(){handleExport();onClose();},cat:"Ação"},
    {label:"Exportar CSV",icon:"📊",action:function(){exportCSV(st);onClose();},cat:"Ação"},
    {label:"Ver atalhos de teclado",icon:"⌨️",action:function(){setShowShortcuts(true);onClose();},cat:"Ação"},
  ];
  var all=[...st.adm,...st.jud];
  var procItems=all.map(function(p){return{label:(p.num||"Sem nº")+" — "+(p.assunto||"—").substring(0,60),icon:p.tipo==="jud"?"⚖️":"📁",action:function(){ss(p);onClose();},cat:"Processo",proc:p,_num:p.num,_ass:p.assunto};});
  var filtered=(function(){var qL=q.toLowerCase().trim();if(!qL)return[...nav,...actions,...procItems.slice(0,10)];var all2=[...nav,...actions,...procItems];return all2.filter(function(i){return i.label.toLowerCase().includes(qL)||(i._num&&i._num.includes(qL))||(i._ass&&i._ass.toLowerCase().includes(qL));}).slice(0,30);})();
  var execute=function(i){if(filtered[i])filtered[i].action();};
  var onKey=function(e){if(e.key==="ArrowDown"){e.preventDefault();sIdx(function(n){return Math.min(n+1,filtered.length-1);});}else if(e.key==="ArrowUp"){e.preventDefault();sIdx(function(n){return Math.max(n-1,0);});}else if(e.key==="Enter"){e.preventDefault();execute(idx);}};
  return React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(14px)",zIndex:3000,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"80px 16px"},onClick:function(e){if(e.target===e.currentTarget)onClose();}},
    React.createElement("div",{className:"cj-hud-tl cj-hud-br",style:{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.35)",borderRadius:20,width:"100%",maxWidth:640,padding:0,position:"relative",boxShadow:"0 0 60px rgba(0,229,255,.15),0 28px 70px rgba(0,0,0,.8)",overflow:"hidden"}},
      React.createElement("div",{style:{padding:"16px 20px",borderBottom:"1px solid "+K.brd,display:"flex",alignItems:"center",gap:12}},
        React.createElement("span",{style:{fontSize:18}},"⌘"),
        React.createElement("input",{ref:inputRef,value:q,onChange:function(e){sQ(e.target.value);sIdx(0);},onKeyDown:onKey,placeholder:"Buscar processo, navegar, executar ação...",style:{flex:1,background:"transparent",border:"none",outline:"none",color:K.txt,fontSize:15,fontFamily:"inherit"}}),
        React.createElement("span",{style:{fontSize:10,color:K.dim,border:"1px solid "+K.brd,borderRadius:4,padding:"2px 6px",fontFamily:"'JetBrains Mono',monospace"}},"esc")
      ),
      React.createElement("div",{style:{maxHeight:440,overflowY:"auto"}},
        filtered.length===0?React.createElement("div",{style:{padding:40,textAlign:"center",color:K.dim}},"Nenhum resultado"):
        (function(){var lastCat="";return filtered.map(function(it,i){var showCat=it.cat!==lastCat;lastCat=it.cat;return React.createElement(React.Fragment,{key:i},
          showCat&&React.createElement("div",{style:{padding:"10px 20px 4px",fontSize:9,color:K.dim,fontWeight:700,textTransform:"uppercase",letterSpacing:".8px",fontFamily:"Orbitron,sans-serif"}},it.cat),
          React.createElement("div",{onMouseEnter:function(){sIdx(i);},onClick:function(){execute(i);},style:{padding:"10px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,background:idx===i?"rgba(0,229,255,.1)":"transparent",borderLeft:"3px solid "+(idx===i?"#00e5ff":"transparent"),transition:"all .1s"}},
            React.createElement("span",{style:{fontSize:16}},it.icon),
            React.createElement("span",{style:{fontSize:13,color:idx===i?"#00e5ff":K.txt,flex:1}},it.label),
            idx===i&&React.createElement("span",{style:{fontSize:10,color:"#00e5ff",fontFamily:"'JetBrains Mono',monospace"}},"↵")
          )
        );});})()
      ),
      React.createElement("div",{style:{padding:"8px 16px",borderTop:"1px solid "+K.brd,fontSize:10,color:K.dim,display:"flex",gap:16,alignItems:"center"}},
        React.createElement("span",null,"↑↓ navegar"),
        React.createElement("span",null,"↵ selecionar"),
        React.createElement("span",null,"esc fechar")
      )
    )
  );
}

/* ═══ v10 — SHORTCUTS MODAL (?) ═══ */
function ShortcutsModal({onClose}){
  var shortcuts=[
    {cat:"Global",items:[["Cmd/Ctrl + K","Abrir Command Palette"],["Cmd/Ctrl + N","Novo processo (quick add)"],["Cmd/Ctrl + Z","Desfazer última ação"],["?","Abrir este modal"],["/","Focar na busca"],["Esc","Fechar modal ativo"]]},
    {cat:"Navegação",items:[["H","Ir para Hoje"],["P","Ir para Prioridades"],["I","Ir para IA Nexus"],["C","Ir para Calendário"],["T","Ir para Timeline"],["N","Alternar entre Administrativos/Judiciais"],["F","Modo foco (oculta sidebar)"]]},
  ];
  return React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:2500,display:"flex",justifyContent:"center",alignItems:"center",padding:"40px 20px"},onClick:function(e){if(e.target===e.currentTarget)onClose();}},
    React.createElement("div",{className:"cj-hud-tl cj-hud-br",style:{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.3)",borderRadius:20,maxWidth:540,width:"100%",padding:28,position:"relative",boxShadow:"0 0 40px rgba(0,229,255,.1),0 24px 60px rgba(0,0,0,.7)"}},
      React.createElement("button",{onClick:onClose,style:{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}},React.createElement(X,{size:20})),
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
        React.createElement("span",{style:{fontSize:24}},"⌨️"),
        React.createElement("div",null,
          React.createElement("h3",{style:{margin:0,fontSize:18,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif"}},"Atalhos de Teclado"),
          React.createElement("div",{style:{fontSize:11,color:K.dim,marginTop:2}},"Domine o COJUR Nexus sem tirar a mão do teclado")
        )
      ),
      shortcuts.map(function(sec,i){return React.createElement("div",{key:i,style:{marginBottom:i<shortcuts.length-1?18:0}},
        React.createElement("div",{style:{fontSize:10,color:"#00e5ff",fontWeight:700,textTransform:"uppercase",letterSpacing:".8px",marginBottom:10,fontFamily:"Orbitron,sans-serif"}},sec.cat),
        React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:6}},
          sec.items.map(function(sc,j){return React.createElement("div",{key:j,style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",borderRadius:10,background:"rgba(255,255,255,.025)",border:"1px solid "+K.brd}},
            React.createElement("span",{style:{fontSize:12,color:K.txt}},sc[1]),
            React.createElement("kbd",{style:{fontSize:10,color:"#00e5ff",background:"rgba(0,229,255,.08)",border:"1px solid rgba(0,229,255,.25)",borderRadius:5,padding:"3px 8px",fontFamily:"'JetBrains Mono',monospace",fontWeight:700}},sc[0])
          );})
        )
      );})
    )
  );
}

/* ═══ v10 — CONFLICT DETECTION ═══ */
var detectConflicts=function(st){
  var conflicts=[];
  var all=[...st.adm,...st.jud];
  /* 1. Sustentação + prazo crítico no mesmo dia */
  var sustProcs=all.filter(function(p){return p.dataSustentacao;});
  sustProcs.forEach(function(s){
    var sDate=toD(s.dataSustentacao);
    all.forEach(function(p){
      if(p.id===s.id)return;
      if(!p.prazoFinal||p.diasRestantes>3)return;
      var pDate=toD(p.prazoFinal);
      if(toISO(sDate)===toISO(pDate)){
        conflicts.push({type:"sust_prazo",severity:"crit",date:sDate,label:"Sustentação + Prazo crítico",procs:[s,p],msg:"Sustentação em "+(s.assunto||"processo").substring(0,40)+" e prazo crítico em "+(p.assunto||"processo").substring(0,40)});
      }
    });
  });
  /* 2. Reuniões sobrepostas no mesmo horário */
  (st.reun||[]).forEach(function(r1,i){
    (st.reun||[]).forEach(function(r2,j){
      if(j<=i)return;
      if(toISO(toD(r1.data))===toISO(toD(r2.data))&&r1.hora&&r2.hora){
        var h1=parseInt(r1.hora.split(":")[0]);
        var h2=parseInt(r2.hora.split(":")[0]);
        if(Math.abs(h1-h2)<=1){
          conflicts.push({type:"reun_reun",severity:"warn",date:toD(r1.data),label:"Reuniões sobrepostas",msg:r1.titulo+" ("+r1.hora+") e "+r2.titulo+" ("+r2.hora+")"});
        }
      }
    });
  });
  /* 3. Viagem sobrepondo com prazo crítico */
  (st.viag||[]).forEach(function(v){
    if(!v.dataIda||!v.dataVolta)return;
    var ini=toD(v.dataIda),fim=toD(v.dataVolta);
    all.forEach(function(p){
      if(!p.prazoFinal||p.diasRestantes<0)return;
      var pDate=toD(p.prazoFinal);
      if(pDate>=ini&&pDate<=fim){
        conflicts.push({type:"viag_prazo",severity:"warn",date:pDate,label:"Viagem + Prazo",msg:"Viagem a "+v.destino+" sobrepõe prazo de "+(p.assunto||"").substring(0,40)});
      }
    });
  });
  /* 4. Reunião + sustentação mesmo dia */
  (st.reun||[]).forEach(function(r){
    sustProcs.forEach(function(s){
      if(toISO(toD(r.data))===toISO(toD(s.dataSustentacao))){
        conflicts.push({type:"reun_sust",severity:"warn",date:toD(r.data),label:"Reunião + Sustentação",msg:r.titulo+" e sustentação em "+(s.assunto||"").substring(0,40)});
      }
    });
  });
  return conflicts.sort(function(a,b){return a.date-b.date;});
};

/* ═══ v10 — CONFLICT ALERT CARD (dashboard) ═══ */
function ConflictAlert({st,sp}){
  var conflicts=useMemo(function(){return detectConflicts(st);},[st]);
  if(!conflicts.length)return null;
  var crit=conflicts.filter(function(c){return c.severity==="crit";});
  var warn=conflicts.filter(function(c){return c.severity==="warn";});
  return React.createElement("div",{className:"cj-hud-tl cj-hud-br",style:{marginBottom:16,padding:"14px 18px",borderRadius:16,background:crit.length?"linear-gradient(135deg,rgba(255,46,91,.12),rgba(255,46,91,.04))":"linear-gradient(135deg,rgba(255,184,0,.1),rgba(255,184,0,.03))",border:"1px solid "+(crit.length?"rgba(255,46,91,.5)":"rgba(255,184,0,.4)"),cursor:"pointer"},onClick:function(){sp("calendar");}},
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:8}},
      React.createElement("span",{style:{fontSize:20,animation:crit.length?"textBlink .9s ease-in-out infinite":"none"}},"⚠️"),
      React.createElement("div",null,
        React.createElement("div",{style:{fontSize:11,color:crit.length?"#ff2e5b":"#ffb800",fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:".8px",textTransform:"uppercase"}},"Conflitos de Agenda Detectados"),
        React.createElement("div",{style:{fontSize:10,color:K.dim,marginTop:2}},conflicts.length+" conflito"+(conflicts.length>1?"s":"")+" identificado"+(conflicts.length>1?"s":"")+" — clique para ver no calendário")
      ),
      React.createElement("div",{style:{marginLeft:"auto",fontSize:24,fontWeight:800,color:crit.length?"#ff2e5b":"#ffb800",fontFamily:"Orbitron,monospace"}},conflicts.length)
    ),
    React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:6}},
      conflicts.slice(0,3).map(function(c,i){return React.createElement("div",{key:i,style:{padding:"6px 10px",borderRadius:8,background:c.severity==="crit"?"rgba(255,46,91,.08)":"rgba(255,184,0,.06)",border:"1px solid "+(c.severity==="crit"?"rgba(255,46,91,.2)":"rgba(255,184,0,.2)"),fontSize:11,color:c.severity==="crit"?"#ff2e5b":"#ffb800",display:"flex",gap:8,alignItems:"center"}},
        React.createElement("span",{style:{fontSize:9,fontWeight:800,padding:"2px 6px",borderRadius:4,background:c.severity==="crit"?"rgba(255,46,91,.2)":"rgba(255,184,0,.15)",fontFamily:"Orbitron,monospace",flexShrink:0}},fmtS(c.date)),
        React.createElement("span",{style:{flex:1}},c.msg)
      );}),
      conflicts.length>3&&React.createElement("div",{style:{fontSize:10,color:K.dim,marginTop:2,textAlign:"right"}},"+"+(conflicts.length-3)+" mais")
    )
  );
}

/* ═══ v10 — DRAFT AUTOSAVE STORAGE ═══ */
var DRAFTS_KEY="cojur_minuta_drafts";
var loadDrafts=function(){try{var s=localStorage.getItem(DRAFTS_KEY);return s?JSON.parse(s):[];}catch(e){return [];}};
var saveDraft=function(draft){try{var list=loadDrafts();var existing=list.findIndex(function(d){return d.id===draft.id;});if(existing>=0)list[existing]=draft;else list.unshift(draft);list=list.slice(0,50);localStorage.setItem(DRAFTS_KEY,JSON.stringify(list));}catch(e){}};
var deleteDraft=function(id){try{var list=loadDrafts().filter(function(d){return d.id!==id;});localStorage.setItem(DRAFTS_KEY,JSON.stringify(list));}catch(e){}};

/* ═══ v10 — AUTOCOMPLETE INPUT ═══ */
function Autocomplete({value,onChange,suggestions,placeholder,style}){
  var[show,sShow]=useState(false);var[hover,sHover]=useState(-1);var ref=useRef(null);
  useEffect(function(){var h=function(e){if(ref.current&&!ref.current.contains(e.target))sShow(false);};document.addEventListener("mousedown",h);return function(){document.removeEventListener("mousedown",h);};},[]);
  var q=(value||"").toLowerCase();
  var filtered=q?suggestions.filter(function(s){return s&&s.toLowerCase().includes(q)&&s.toLowerCase()!==q;}).slice(0,6):[];
  return React.createElement("div",{ref:ref,style:{position:"relative"}},
    React.createElement("input",{type:"text",value:value||"",onChange:function(e){onChange(e.target.value);sShow(true);sHover(-1);},onFocus:function(){sShow(true);},placeholder:placeholder,style:style}),
    show&&filtered.length>0&&React.createElement("div",{style:{position:"absolute",top:"100%",left:0,right:0,marginTop:4,background:K.modal,border:"1px solid "+K.brd,borderRadius:10,padding:4,zIndex:100,maxHeight:180,overflowY:"auto",boxShadow:"0 12px 32px rgba(0,0,0,.5)"}},
      filtered.map(function(s,i){return React.createElement("div",{key:i,onMouseEnter:function(){sHover(i);},onClick:function(){onChange(s);sShow(false);},style:{padding:"7px 10px",fontSize:12,color:K.txt,cursor:"pointer",background:hover===i?K.acG:"transparent",borderRadius:7,display:"flex",alignItems:"center",gap:6}},
        React.createElement("span",{style:{fontSize:10,color:K.dim}},"↵"),s
      );})
    )
  );
}

/* ═══ v10 — COMPARADOR (side-by-side) ═══ */
function ComparadorModal({ids,st,onClose,onRemove}){
  var procs=ids.map(function(id){return [...st.adm,...st.jud].find(function(p){return p.id===id;});}).filter(Boolean);
  if(!procs.length)return null;
  var rows=[
    ["Nº",function(p){return p.num||"—";}],
    ["SEI",function(p){return p.numeroSEI||"—";}],
    ["Tipo",function(p){return p.tipo==="jud"?"Judicial":"Administrativo";}],
    ["Assunto",function(p){return p.assunto||"—";}],
    ["Tipo de Peça",function(p){return p.tipoPeca||"—";}],
    ["Tribunal/Órgão",function(p){return p.tribunal||p.orgao||"—";}],
    ["Parte contrária",function(p){return p.parteContraria||p.interessado||"—";}],
    ["Status",function(p){return p.status;}],
    ["Fase",function(p){return p.fase;}],
    ["Prazo",function(p){return fmt(p.prazoFinal);}],
    ["Dias restantes",function(p){return p.diasRestantes+"du";}],
    ["Score",function(p){return p.score;}],
    ["Impacto",function(p){return (p.impacto||3)+"/5";}],
    ["Complexidade",function(p){return (p.complexidade||3)+"/5";}],
    ["Próxima providência",function(p){return p.proxProv||"—";}],
    ["Tempo estimado",function(p){return p.estTempo||"—";}],
    ["Responsável",function(p){return p.responsavel||"—";}],
  ];
  return React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(10px)",zIndex:1400,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"40px 16px",overflowY:"auto"},onClick:function(e){if(e.target===e.currentTarget)onClose();}},
    React.createElement("div",{className:"cj-hud-tl cj-hud-br",style:{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.3)",borderRadius:22,maxWidth:1100,width:"100%",padding:28,position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,.8)"}},
      React.createElement("button",{onClick:onClose,style:{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}},React.createElement(X,{size:20})),
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
        React.createElement("span",{style:{fontSize:24}},"⚖️"),
        React.createElement("div",null,
          React.createElement("h3",{style:{margin:0,fontSize:18,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif"}},"Comparador de Processos"),
          React.createElement("div",{style:{fontSize:11,color:K.dim,marginTop:2}},procs.length+" processo"+(procs.length>1?"s":"")+" em comparação")
        )
      ),
      React.createElement("div",{style:{overflowX:"auto"}},
        React.createElement("table",{style:{width:"100%",borderCollapse:"separate",borderSpacing:0,fontSize:12}},
          React.createElement("thead",null,
            React.createElement("tr",null,
              React.createElement("th",{style:{padding:"10px 12px",textAlign:"left",color:K.dim,fontSize:10,textTransform:"uppercase",fontWeight:700,borderBottom:"1px solid "+K.brd,width:160}},"Campo"),
              procs.map(function(p){return React.createElement("th",{key:p.id,style:{padding:"10px 12px",textAlign:"left",color:K.ac,fontSize:11,fontWeight:700,borderBottom:"1px solid "+K.brd,minWidth:200,fontFamily:"'JetBrains Mono',monospace"}},
                React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6,justifyContent:"space-between"}},
                  React.createElement("span",null,p.num||"Sem nº"),
                  React.createElement("button",{onClick:function(){onRemove(p.id);},style:{background:"none",border:"none",color:K.dim,cursor:"pointer",padding:2}},React.createElement(X,{size:12}))
                )
              );})
            )
          ),
          React.createElement("tbody",null,
            rows.map(function(r,i){return React.createElement("tr",{key:i,style:{borderBottom:"1px solid "+K.brd}},
              React.createElement("td",{style:{padding:"10px 12px",color:K.dim,fontSize:11,fontWeight:700,background:"rgba(255,255,255,.02)"}},r[0]),
              procs.map(function(p){return React.createElement("td",{key:p.id,style:{padding:"10px 12px",color:K.txt,fontSize:12,lineHeight:1.4,verticalAlign:"top"}},r[1](p));})
            );})
          )
        )
      )
    )
  );
}

/* ═══ v10 — INSIGHTS IA AGREGADOS (página nova) ═══ */
function InsightsPg({st}){
  var[loading,setLoad]=useState(false);var[insights,setInsights]=useState("");var[error,setError]=useState("");
  var gerar=function(){
    setLoad(true);setError("");setInsights("");
    var all=[...st.adm,...st.jud];
    var realizados=st.realizados||[];
    var stats={
      totalAtivos:all.length,
      totalConcluidos:realizados.length,
      porTipoPeca:{},
      porTribunal:{},
      porStatus:{},
      diasMedios:0,
      criticos:all.filter(function(p){return p.diasRestantes<=10;}).length,
      semMov:all.filter(function(p){return (p.semMov||0)>=7;}).length,
      semProxProv:all.filter(function(p){return !p.proxProv;}).length
    };
    all.forEach(function(p){
      stats.porTipoPeca[p.tipoPeca]=(stats.porTipoPeca[p.tipoPeca]||0)+1;
      stats.porTribunal[p.tribunal||p.orgao||"—"]=(stats.porTribunal[p.tribunal||p.orgao||"—"]||0)+1;
      stats.porStatus[p.status]=(stats.porStatus[p.status]||0)+1;
    });
    var dados=JSON.stringify(stats,null,2);
    var prompt="Voce e advogado senior da COJUR/CFM. Analise os dados agregados do acervo abaixo e retorne 5 INSIGHTS ACIONAVEIS em portugues. Cada insight deve ser: (1) baseado em dados concretos, (2) acionavel (sugerir o que fazer), (3) conciso (maximo 3 linhas). Use numeracao e bullet points. Sem travessao. Foque em: padroes de distribuicao, gargalos, recomendacoes de priorizacao, oportunidades de otimizacao.\n\nDados do acervo:\n"+dados;
    fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,messages:[{role:"user",content:prompt}]})})
    .then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.json();})
    .then(function(d){if(d.error){setError(d.error.message||"Erro");setLoad(false);return;}var t=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("").trim();setInsights(t||"Sem resultado.");setLoad(false);})
    .catch(function(e){setError("Erro: "+(e.message||""));setLoad(false);});
  };
  return React.createElement("div",{className:"cj-pg"},
    React.createElement("div",{className:"cj-up",style:{display:"flex",alignItems:"center",gap:14,marginBottom:24}},
      React.createElement("div",{style:{width:48,height:48,borderRadius:16,background:"linear-gradient(135deg,rgba(184,77,255,.22),rgba(0,229,255,.08))",border:"1px solid rgba(184,77,255,.4)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 18px rgba(184,77,255,.25)"}},
        React.createElement("span",{style:{fontSize:22}},"🧠")
      ),
      React.createElement("div",null,
        React.createElement("h2",{style:{margin:0,fontSize:22,fontWeight:800,color:"#b84dff",fontFamily:"Orbitron,sans-serif"}},"Insights IA Agregados"),
        React.createElement("div",{style:{fontSize:12,color:K.dim,marginTop:2}},"Análise do acervo completo por Claude Sonnet")
      )
    ),
    React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:20}},
      [{l:"Ativos",v:st.adm.length+st.jud.length,c:K.ac},{l:"Realizados",v:(st.realizados||[]).length,c:K.su},{l:"Administrativos",v:st.adm.length,c:K.ac},{l:"Judiciais",v:st.jud.length,c:K.pu}].map(function(m,i){return React.createElement(Bx,{key:i,style:{padding:14}},
        React.createElement("div",{style:{fontSize:10,color:K.dim,marginBottom:6,fontWeight:700,textTransform:"uppercase",letterSpacing:".5px"}},m.l),
        React.createElement("div",{style:{fontSize:26,fontWeight:800,color:m.c,fontFamily:"Orbitron,monospace"}},m.v)
      );})
    ),
    !insights&&!loading&&React.createElement(Bx,{style:{textAlign:"center",padding:40}},
      React.createElement("div",{style:{fontSize:42,marginBottom:16}},"🧠"),
      React.createElement("div",{style:{fontSize:15,fontWeight:700,color:K.txt,marginBottom:8}},"Gerar análise IA do acervo"),
      React.createElement("div",{style:{fontSize:12,color:K.dim,marginBottom:20,maxWidth:420,margin:"0 auto 20px"}},"A IA analisará todos os processos e retornará 5 insights acionáveis: gargalos, padrões, recomendações de priorização."),
      React.createElement("button",{onClick:gerar,style:{...btnPrim,padding:"13px 26px",fontSize:14}},"⚡ Analisar acervo")
    ),
    loading&&React.createElement(Bx,{style:{textAlign:"center",padding:40}},
      React.createElement("div",{className:"cj-pulse",style:{fontSize:38,marginBottom:14}},"🧠"),
      React.createElement("div",{style:{fontSize:13,color:"#b84dff",fontFamily:"Orbitron,sans-serif",letterSpacing:"1px"}},"Analisando acervo..."),
      React.createElement(SkeletonBlock,{lines:6,h:20})
    ),
    error&&React.createElement(Bx,{style:{padding:20,background:"rgba(255,46,91,.1)",border:"1px solid rgba(255,46,91,.3)"}},
      React.createElement("div",{style:{fontSize:12,color:"#ff2e5b"}},error)
    ),
    insights&&React.createElement(Bx,null,
      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}},
        React.createElement("div",{style:{fontSize:11,color:"#b84dff",fontWeight:700,fontFamily:"Orbitron,sans-serif",textTransform:"uppercase",letterSpacing:".5px"}},"Insights gerados"),
        React.createElement("button",{onClick:gerar,style:{...btnGhost,padding:"6px 14px",fontSize:11}},"Regenerar")
      ),
      React.createElement("div",{style:{fontSize:13,color:K.txt,lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:"inherit"}},insights)
    )
  );
}

/* ═══ MAIN ═══ */

/* ═══ BROWSER NOTIFICATIONS — prazos críticos ═══ */
var requestNotifPermission = function() {
  if (typeof Notification !== "undefined" && Notification.permission === "default") {
    Notification.requestPermission();
  }
};
var sendBrowserNotif = function(title, body) {
  if (typeof Notification !== "undefined" && Notification.permission === "granted") {
    try { new Notification(title, { body: body, icon: "⚖️", tag: "cojur-nexus" }); } catch(e) {}
  }
};

/* ═══ POMODORO TIMER COMPONENT ═══ */
function PomodoroTimer({proc, dp}) {
  var [running, setRunning] = useState(false);
  var [seconds, setSeconds] = useState(25 * 60);
  var [mode, setMode] = useState("focus"); // focus | break
  var [totalMin, setTotalMin] = useState(0);
  var intervalRef = useRef(null);

  useEffect(function() {
    if (!running) return function() { if (intervalRef.current) clearInterval(intervalRef.current); };
    /* B4: usa timestamp em vez de decremento, robusto a aba inativa (browser desacelera setInterval) */
    var startMs = Date.now();
    var startSeconds = seconds;
    intervalRef.current = setInterval(function() {
      var elapsed = Math.floor((Date.now() - startMs) / 1000);
      var remaining = Math.max(0, startSeconds - elapsed);
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        setRunning(false);
        if (mode === "focus") {
          setTotalMin(function(t) { return t + 25; });
          if (proc && dp) dp({ type: "ADD_TEMPO", id: proc.id, minutos: 25 });
          sendBrowserNotif("Pomodoro concluído!", proc ? proc.assunto : "Sessão finalizada");
          setMode("break");
          setSeconds(5 * 60);
        } else {
          sendBrowserNotif("Pausa encerrada!", "Hora de voltar ao foco");
          setMode("focus");
          setSeconds(25 * 60);
        }
      } else {
        setSeconds(remaining);
      }
    }, 500);
    return function() { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line
  }, [running, mode]);

  var min = Math.floor(seconds / 60);
  var sec = seconds % 60;
  var pct = mode === "focus" ? ((25 * 60 - seconds) / (25 * 60)) * 100 : ((5 * 60 - seconds) / (5 * 60)) * 100;
  var cor = mode === "focus" ? "#00e5ff" : "#00ff88";

  return React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderRadius: 14, background: "rgba(" + (mode === "focus" ? "0,229,255" : "0,255,136") + ",.06)", border: "1px solid rgba(" + (mode === "focus" ? "0,229,255" : "0,255,136") + ",.25)" } },
    React.createElement("div", { style: { position: "relative", width: 48, height: 48 } },
      React.createElement("svg", { width: 48, height: 48, viewBox: "0 0 48 48" },
        React.createElement("circle", { cx: 24, cy: 24, r: 20, fill: "none", stroke: "rgba(255,255,255,.08)", strokeWidth: 3 }),
        React.createElement("circle", { cx: 24, cy: 24, r: 20, fill: "none", stroke: cor, strokeWidth: 3, strokeLinecap: "round", strokeDasharray: 2 * Math.PI * 20, strokeDashoffset: 2 * Math.PI * 20 * (1 - pct / 100), transform: "rotate(-90 24 24)", style: { transition: "stroke-dashoffset 1s" } })
      ),
      React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: cor, fontFamily: "Orbitron,monospace" } }, String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0"))
    ),
    React.createElement("div", { style: { flex: 1 } },
      React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: cor, textTransform: "uppercase", letterSpacing: ".5px", fontFamily: "Orbitron,sans-serif" } }, mode === "focus" ? "Foco" : "Pausa"),
      totalMin > 0 && React.createElement("div", { style: { fontSize: 10, color: K.dim, marginTop: 2 } }, totalMin + " min registrados")
    ),
    React.createElement("div", { style: { display: "flex", gap: 6 } },
      React.createElement("button", { onClick: function() { setRunning(!running); if (!running) requestNotifPermission(); }, style: { padding: "6px 14px", borderRadius: 10, border: "1px solid " + cor + "44", background: running ? "rgba(255,46,91,.15)" : cor + "20", color: running ? "#ff2e5b" : cor, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, running ? "⏸ Pausar" : "▶ Iniciar"),
      React.createElement("button", { onClick: function() { setRunning(false); setSeconds(mode === "focus" ? 25 * 60 : 5 * 60); }, style: { padding: "6px 10px", borderRadius: 10, border: "1px solid rgba(255,255,255,.1)", background: "transparent", color: K.dim, fontSize: 11, cursor: "pointer", fontFamily: "inherit" } }, "↺")
    )
  );
}

/* ═══ WEEKLY EVOLUTION CHART ═══ */
function WeeklyEvolutionChart({st}) {
  var data = [];
  for (var i = 7; i >= 0; i--) {
    var weekStart = addD(NOW, -i * 7);
    var weekEnd = addD(weekStart, 6);
    var label = fmtS(weekStart);
    var created = [...st.adm, ...st.jud].filter(function(p) {
      if (!p.hist || !p.hist.length) return false;
      var firstDate = p.hist[0].d || p.hist[0].data;
      if (!firstDate) return false;
      var d = toD(firstDate);
      return d >= weekStart && d <= weekEnd;
    }).length;
    var concluded = (st.realizados || []).filter(function(p) {
      if (!p.realizadoEm) return false;
      var d = toD(p.realizadoEm);
      return d >= weekStart && d <= weekEnd;
    }).length;
    data.push({ sem: label, criados: created, concluidos: concluded });
  }
  return React.createElement(Bx, { style: { marginBottom: 20 } },
    React.createElement(SH, { icon: TrendingUp, title: "Evolução Semanal (8 semanas)" }),
    React.createElement(ResponsiveContainer, { width: "100%", height: 180 },
      React.createElement(BarChart, { data: data, barSize: 16 },
        React.createElement(XAxis, { dataKey: "sem", tick: { fill: K.dim2, fontSize: 9 }, axisLine: false, tickLine: false }),
        React.createElement(YAxis, { tick: { fill: K.dim2, fontSize: 10 }, axisLine: false, tickLine: false, allowDecimals: false }),
        React.createElement(Tooltip, { contentStyle: { background: K.modal, border: "1px solid " + K.brd, borderRadius: 8, color: K.txt, fontSize: 12 } }),
        React.createElement(Bar, { dataKey: "criados", fill: K.ac, name: "Criados", radius: [4, 4, 0, 0] }),
        React.createElement(Bar, { dataKey: "concluidos", fill: K.su, name: "Concluídos", radius: [4, 4, 0, 0] })
      )
    )
  );
}


/* ═══ LEMBRETES ═══ */
function LembretePg(props) {
  var st=props.st,dp=props.dp;
  var [novo,sNovo]=useState(""); var [data,sData]=useState("");
  var hoje=NOW.toISOString().slice(0,10);
  var lembs=(st.lembretes||[]).slice().sort(function(a,b){return (a.data||"")>(b.data||"")?1:-1;});
  var venc=lembs.filter(function(l){return !l.done&&l.data&&l.data<=hoje;});
  var pend=lembs.filter(function(l){return !l.done&&(!l.data||l.data>hoje);});
  var feitos=lembs.filter(function(l){return l.done;});
  var add=function(){
    if(!novo.trim())return;
    dp({type:"ADD_LEMBRETE",texto:novo.trim(),data:data});
    sNovo("");sData("");
  };
  var Blk=function(bProps){
    var titulo=bProps.titulo,cor=bProps.cor,items=bProps.items;
    if(!items.length)return null;
    return React.createElement("div",{style:{marginBottom:20}},
      React.createElement("div",{style:{fontSize:11,color:cor,fontWeight:700,letterSpacing:".8px",textTransform:"uppercase",marginBottom:8,fontFamily:"Orbitron,sans-serif"}},[bProps.emoji," ",titulo]),
      React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:8}},
        items.map(function(l){return(
          React.createElement("div",{key:l.id,style:{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:14,background:l.done?"rgba(255,255,255,.02)":"linear-gradient(135deg,rgba(2,5,22,.97),rgba(1,3,12,.99))",border:"1px solid "+(l.done?"rgba(255,255,255,.05)":cor+"33"),boxShadow:l.done?"none":"0 0 14px "+cor+"12",transition:"all .2s"}},
            React.createElement("button",{onClick:function(){dp({type:"UPD_LEMBRETE",id:l.id,ch:{done:!l.done}});},style:{width:20,height:20,borderRadius:6,border:"1.5px solid "+cor,background:l.done?cor:"transparent",flexShrink:0,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}},
              l.done&&React.createElement(CheckCircle,{size:12,color:"#fff"})
            ),
            React.createElement("div",{style:{flex:1,minWidth:0}},
              React.createElement("div",{style:{fontSize:13,fontWeight:700,color:l.done?K.dim2:K.txt,textDecoration:l.done?"line-through":"none",lineHeight:1.4}},[l.texto]),
              l.data&&React.createElement("div",{style:{fontSize:10,color:l.done?K.dim2:cor,marginTop:3,fontFamily:"'JetBrains Mono',monospace",fontWeight:700}},
                l.data<=hoje&&!l.done?"⚠️ "+new Date(l.data+"T12:00:00").toLocaleDateString("pt-BR"):"📅 "+new Date(l.data+"T12:00:00").toLocaleDateString("pt-BR")
              )
            ),
            React.createElement("button",{onClick:function(){dp({type:"DEL_LEMBRETE",id:l.id});},style:{background:"none",border:"none",color:K.dim2,cursor:"pointer",padding:4,flexShrink:0}},[React.createElement(X,{size:14})])
          )
        );})
      )
    );
  };
  return(
    React.createElement("div",{className:"cj-pg"},
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
        React.createElement("span",{style:{fontSize:24}},"⏰"),
        React.createElement("div",null,
          React.createElement("h2",{style:{margin:0,fontSize:20,fontWeight:800,color:K.txt,fontFamily:"Orbitron,sans-serif"}},"Lembretes"),
          React.createElement("div",{style:{fontSize:11,color:K.dim,marginTop:2}},"Atividades e compromissos a lembrar")
        ),
        venc.length>0&&React.createElement("div",{className:"cj-pulse",style:{marginLeft:"auto",padding:"4px 14px",borderRadius:999,background:"rgba(255,46,91,.15)",border:"1px solid rgba(255,46,91,.4)",color:"#ff2e5b",fontSize:12,fontWeight:800,fontFamily:"Orbitron,monospace"}},venc.length+" vencido"+(venc.length>1?"s":""))
      ),
      React.createElement(Bx,{style:{marginBottom:20}},
        React.createElement("div",{style:{display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-end"}},
          React.createElement("div",{style:{flex:1,minWidth:200}},
            React.createElement("label",{style:{...lblSt}},"Novo lembrete"),
            React.createElement("input",{style:{...inpSt},value:novo,onChange:function(e){sNovo(e.target.value);},onKeyDown:function(e){if(e.key==="Enter")add();},placeholder:"Descrição da atividade..."})
          ),
          React.createElement("div",null,
            React.createElement("label",{style:{...lblSt}},"Data (opcional)"),
            React.createElement("input",{style:{...inpSt,width:"auto"},type:"date",value:data,onChange:function(e){sData(e.target.value);}})
          ),
          React.createElement("button",{onClick:add,style:{...btnPrim,padding:"10px 18px",alignSelf:"flex-end"}},React.createElement(Plus,{size:16}),"Adicionar")
        )
      ),
      React.createElement(Bx,null,
        React.createElement(Blk,{emoji:"🔴",titulo:"Vencidos",cor:K.cr,items:venc}),
        React.createElement(Blk,{emoji:"🔵",titulo:"Pendentes",cor:K.ac,items:pend}),
        React.createElement(Blk,{emoji:"✅",titulo:"Concluídos",cor:K.dim2,items:feitos}),
        !lembs.length&&React.createElement("div",{style:{textAlign:"center",padding:40,color:K.dim2}},
          React.createElement("div",{style:{fontSize:36,marginBottom:10}},"⏰"),
          React.createElement("div",{style:{fontSize:14,color:K.txt,fontWeight:700}},"Nenhum lembrete cadastrado"),
          React.createElement("div",{style:{fontSize:12,color:K.dim,marginTop:6}},"Adicione lembretes para não esquecer atividades importantes")
        )
      )
    )
  );
}

/* ═══ IA PRIORITIZATION ENGINE ═══ */
const iaScore=p=>{
  if(isProtocolar(p)||isCorrecao(p))return 100;
  let s=0,dr=p.diasRestantes||0;
  if(dr<=0)s+=50;else if(dr<=3)s+=42;else if(dr<=7)s+=34;else if(dr<=10)s+=26;else if(dr<=20)s+=14;else if(dr<30)s+=6;
  s+=(p.impacto||3)*5+(p.complexidade||3)*3;
  if(p.reuniao)s+=12;if(p.sustentacao)s+=18;
  if((p.semMov||0)>14)s+=15;else if((p.semMov||0)>7)s+=8;
  if(p.depTerc)s+=10;if(!p.proxProv)s+=10;if(!p.responsavel)s+=8;
  if(hasCustas(p))s+=14;
  return Math.min(100,s);
};
const iaBadge=s=>{
  if(s>=75)return{cls:"cj-badge-fire",emoji:"🔥",txt:"Crítico"};
  if(s>=50)return{cls:"cj-badge-zap",emoji:"⚡",txt:"Urgente"};
  if(s>=30)return{cls:"cj-badge-ok",emoji:"🟡",txt:"Atenção"};
  return{cls:"cj-badge-ice",emoji:"🧊",txt:"Normal"};
};
const iaSugestao=p=>{
  if(isProtocolar(p))return{emoji:"📤",txt:"PROTOCOLAR NO TRIBUNAL — peça aprovada pelo chefe do contencioso"};
  if(isCorrecao(p))return{emoji:"✏️",txt:"CORRIGIR PEÇA — retornada pelo chefe do contencioso para revisão"};
  if(p.diasRestantes<=0)return{emoji:"🚨",txt:"Protocolar IMEDIATAMENTE — prazo vencido"};
  if(p.diasRestantes<=3&&!p.proxProv)return{emoji:"⚠️",txt:"Definir próxima providência urgente"};
  if(hasCustas(p)&&p.diasRestantes<=10)return{emoji:"💰",txt:"Verificar recolhimento de custas antes de protocolar"};
  if(p.sustentacao&&p.diasRestantes<=7)return{emoji:"⚖️",txt:"Preparar sustentação oral — sessão próxima"};
  if(p.reuniao&&p.diasRestantes<=5)return{emoji:"📅",txt:"Confirmar pauta da reunião vinculada"};
  if((p.semMov||0)>10)return{emoji:"📞",txt:"Cobrar movimentação — processo parado há muito tempo"};
  if(!p.proxProv)return{emoji:"🎯",txt:"Definir próxima providência"};
  if(p.depTerc)return{emoji:"🔗",txt:"Acompanhar retorno de terceiros"};
  return{emoji:"✅",txt:`Executar: ${p.proxProv||"—"}`};
};


/* ═══ IA NEXUS APRIMORADO ═══ */
function IAPainel({st,ss,sp}){
  var all=[...st.adm,...st.jud].map(function(p){return Object.assign({},p,{iaS:iaScore(p)});}).sort(function(a,b){return b.iaS-a.iaS;});
  var crit=all.filter(function(p){return p.iaS>=75;}),urg=all.filter(function(p){return p.iaS>=50&&p.iaS<75;});
  var atenc=all.filter(function(p){return p.iaS>=30&&p.iaS<50;}),norm=all.filter(function(p){return p.iaS<30;});
  var alertas=[];
  all.filter(function(p){return isProtocolar(p);}).forEach(function(p){alertas.push({emoji:"📤",cor:K.su,txt:(p.num||"—")+": PROTOCOLAR NO TRIBUNAL"});});
  all.filter(function(p){return isCorrecao(p);}).forEach(function(p){alertas.push({emoji:"✏️",cor:K.wa,txt:(p.num||"—")+": CORRIGIR ANTES DE PROTOCOLAR"});});
  all.filter(function(p){return p.diasRestantes<=0;}).forEach(function(p){alertas.push({emoji:"🚨",cor:K.cr,txt:(p.num||"—")+": PRAZO VENCIDO"});});
  all.filter(function(p){return p.diasRestantes>0&&p.diasRestantes<=3;}).forEach(function(p){alertas.push({emoji:"⏰",cor:K.wa,txt:(p.num||"—")+": apenas "+p.diasRestantes+"du restantes"});});
  all.filter(function(p){return hasCustas(p)&&p.diasRestantes<=14;}).forEach(function(p){alertas.push({emoji:"💰",cor:"#f59e0b",txt:(p.num||"—")+": verificar custas — "+p.tipoAcao});});

  /* Plano do dia */
  var sLoad=useState(false);var loading=sLoad[0],setLoad=sLoad[1];
  var sPlano=useState("");var plano=sPlano[0],setPlano=sPlano[1];
  var sCopied=useState(false);var copied=sCopied[0],setCopied=sCopied[1];
  var H_DIA=4,H_INI="15:00",H_FIM="19:00";

  var gerarPlano=function(){
    setLoad(true);setPlano("");
    var agora=new Date();
    var hojeStr=agora.toISOString().slice(0,10);
    var diaSem=agora.getDay();
    var isWorkDay=diaSem>=1&&diaSem<=5;
    var dataStr=agora.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
    var todaySust=st.sust.filter(function(s){return s.data&&toISO(toD(s.data))===hojeStr;});
    var todayReun=st.reun.filter(function(r){return r.data&&toISO(toD(r.data))===hojeStr;});
    var todayLemb=(st.lembretes||[]).filter(function(l){return !l.done&&l.data&&String(l.data).slice(0,10)===hojeStr;});
    var minBloqueados=(todaySust.length+todayReun.length)*60;
    var minDisp=Math.max(0,H_DIA*60-minBloqueados);
    var resumo="Data: "+dataStr+"\nHorário: "+H_INI+" às "+H_FIM+" ("+H_DIA+"h disponíveis";
    resumo+=minBloqueados>0?" — "+Math.round(minBloqueados/60)+"h em eventos fixos, "+Math.round(minDisp/60)+"h livres":")\n\n";
    resumo+="EVENTOS FIXOS HOJE:\n";
    if(todaySust.length)resumo+=todaySust.map(function(s){return "- Sustentação Oral: "+s.tema+" ("+s.hora+")";}).join("\n")+"\n";
    if(todayReun.length)resumo+=todayReun.map(function(r){return "- Reunião: "+r.titulo+" ("+r.hora+", "+r.local+")";}).join("\n")+"\n";
    if(todayLemb.length)resumo+=todayLemb.map(function(l){return "- Lembrete: "+l.texto;}).join("\n")+"\n";
    if(!todaySust.length&&!todayReun.length&&!todayLemb.length)resumo+="Nenhum evento fixo.\n";
    resumo+="\nTOP 10 PROCESSOS POR PRIORIDADE:\n";
    all.slice(0,10).forEach(function(p,i){
      var sug=iaSugestao(p);
      resumo+=(i+1)+". ["+p.iaS+"pts] "+p.assunto+" | "+p.tipoPeca+" | "+p.diasRestantes+"du | "+sug.txt+"\n";
    });
    if(!isWorkDay){resumo+="\n(Hoje é fim de semana — plano para próxima segunda-feira)";}
    var iaPrompt="Você é assistente jurídico da COJUR/CFM. Planeje o dia de João Gabriel.\n\n"+resumo+"\nREGRAS:\n- Horário fixo: "+H_INI+" às "+H_FIM+" ("+H_DIA+"h úteis)\n- Respeite eventos fixos que bloqueiam tempo\n- Estimativas: Parecer=2-3h, Agravo=2h, Contraminuta=2h, Manifestação=1-2h, Embargos=45min, Ofício=30min, Despacho=15min\n- Reserve 15min final para revisão\n- Sem travessão no texto. Seja direto.\n\nFormato obrigatório:\n📅 PLANO DO DIA — [data]\n🕒 "+H_INI+" às "+H_FIM+"\n\n[lista de tarefas]:\n⬜ HH:MM-HH:MM · [tarefa] · [tempo] · [prioridade]\n\n📊 RESUMO:\n- Tarefas: X\n- Tempo alocado: Xh\n- Críticos cobertos: X\n[alerta se houver críticos fora do horário]";
    fetch("/api/llm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:iaPrompt}]})})
    .then(function(r){return r.json();})
    .then(function(d){var txt=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("\n").trim();setPlano(txt||"Plano não gerado.");setLoad(false);})
    .catch(function(){setPlano("Erro ao gerar plano.");setLoad(false);});
  };
  var copiarPlano=function(){try{navigator.clipboard.writeText(plano).then(function(){setCopied(true);setTimeout(function(){setCopied(false);},2500);});}catch(e){}};

  /* Carga semanal */
  var EST={"Parecer Jurídico":2.5,"Agravo Interno":2,"Contraminuta":2,"Manifestação":1.5,"Embargos de Declaração":0.75,"Informações em MS":1.5,"Ofício":0.5,"Despacho de Andamento":0.25};
  var hTotal=all.slice(0,15).reduce(function(acc,p){return acc+(EST[p.tipoPeca]||1.5);},0);
  var cargaStatus=hTotal<=20?"OK":hTotal<=40?"ALTO":"CRÍTICO";
  var cargaCor=cargaStatus==="OK"?"#00ff88":cargaStatus==="ALTO"?"#ffb800":"#ff2e5b";

  return(
    <div className="cj-pg">
      <div className="cj-up" style={{display:"flex",alignItems:"center",gap:14,marginBottom:20,flexWrap:"wrap"}}>
        <span style={{fontSize:28}}>🧠</span>
        <div>
          <h2 style={{margin:0,fontSize:22,fontWeight:800,background:"linear-gradient(135deg,#00e5ff,#b84dff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontFamily:"Orbitron,sans-serif"}}>IA NEXUS</h2>
          <div style={{fontSize:11,color:K.dim,marginTop:2}}>Centro de Inteligência · COJUR/CFM · {H_INI}–{H_FIM} · Seg–Sex</div>
        </div>
        <div style={{marginLeft:"auto",padding:"6px 14px",borderRadius:10,background:cargaCor+"18",border:"1px solid "+cargaCor+"44",fontSize:11,fontWeight:700,color:cargaCor,fontFamily:"Orbitron,monospace"}}>
          Carga: {cargaStatus} · {hTotal.toFixed(1)}h pendentes
        </div>
      </div>

      {/* Plano do dia */}
      <div className="cj-ia-card" style={{marginBottom:20,borderColor:"rgba(0,229,255,.25)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <span style={{fontSize:22}}>📅</span>
          <div>
            <div style={{fontSize:14,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif",letterSpacing:".5px"}}>PLANO DO DIA COM IA</div>
            <div style={{fontSize:11,color:K.dim,marginTop:2}}>{H_INI}–{H_FIM} · {H_DIA}h/dia · gerado por Claude Sonnet</div>
          </div>
          {!loading&&<button onClick={gerarPlano} style={{...btnPrim,marginLeft:"auto",padding:"9px 18px",fontSize:12}}>{plano?"🔄 Replanejar":"⚡ Gerar Plano do Dia"}</button>}
        </div>
        {loading&&<div style={{textAlign:"center",padding:"24px 0",color:"#00e5ff"}}><div className="cj-pulse" style={{fontSize:34,marginBottom:10}}>🧠</div><div style={{fontSize:13,fontFamily:"Orbitron,sans-serif",letterSpacing:"1px"}}>Analisando e montando seu plano...</div><div style={{fontSize:11,color:K.dim,marginTop:6}}>Considerando prazos, tipos de peça e janela {H_INI}–{H_FIM}</div></div>}
        {plano&&!loading&&<div>
          <div style={{padding:"16px",borderRadius:13,background:"rgba(0,229,255,.04)",border:"1px solid rgba(0,229,255,.1)",fontSize:12,color:K.txt,lineHeight:1.85,whiteSpace:"pre-wrap",fontFamily:"inherit",maxHeight:380,overflowY:"auto",marginBottom:12}}>{plano}</div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={copiarPlano} style={{...btnPrim,padding:"9px 18px",fontSize:12,color:copied?"#00ff88":"#00e5ff",borderColor:copied?"rgba(0,255,136,.4)":"rgba(0,229,255,.35)",background:copied?"rgba(0,255,136,.1)":"rgba(0,229,255,.1)"}}>{copied?"✅ Copiado!":"📋 Copiar Plano"}</button>
            <button onClick={function(){var w=window.open("","_blank");if(w){w.document.write("<html><head><title>Plano COJUR</title><style>body{font-family:Arial;max-width:700px;margin:40px auto;line-height:1.8;font-size:13px;}pre{white-space:pre-wrap;}</style></head><body><pre>"+plano.replace(/</g,"&lt;")+"</pre><scr"+"ipt>window.print();</"+"script></body></html>");w.document.close();}}} style={{...btnGhost,padding:"9px 12px",fontSize:12}}>🖨️</button>
            <button onClick={gerarPlano} style={{...btnGhost,padding:"9px 14px",fontSize:12}}>🔄 Replanejar</button>
          </div>
        </div>}
        {!plano&&!loading&&<div style={{textAlign:"center",padding:"18px 0",color:K.dim,fontSize:12}}>Clique em "Gerar Plano do Dia" para que a IA organize suas {H_DIA}h considerando prazos, tipos de peça e eventos do dia.</div>}
      </div>

      {/* Score band */}
      <div className="cj-st" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
        {[{emoji:"🔥",lbl:"Críticos",val:crit.length,col:K.cr,cls:"cj-neon-cr"},{emoji:"⚡",lbl:"Urgentes",val:urg.length,col:K.wa,cls:"cj-neon-wa"},{emoji:"🟡",lbl:"Atenção",val:atenc.length,col:"#eab308",cls:""},{emoji:"🧊",lbl:"Normal",val:norm.length,col:K.ac,cls:""}].map(function(it){return(
          <div key={it.lbl} className={"cj-ia-card "+it.cls} style={{textAlign:"center",padding:"18px 12px"}}>
            <div style={{fontSize:26,marginBottom:6}}>{it.emoji}</div>
            <div style={{fontSize:30,fontWeight:800,color:it.col,fontFamily:"Orbitron,monospace",lineHeight:1}}>{it.val}</div>
            <div style={{fontSize:10,color:K.dim,fontWeight:700,textTransform:"uppercase",letterSpacing:".5px",marginTop:4}}>{it.lbl}</div>
          </div>
        );})}
      </div>

      {/* Carga 4 semanas */}
      <div className="cj-ia-card" style={{marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <span style={{fontSize:18}}>📊</span>
          <span style={{fontSize:14,fontWeight:800,color:K.txt}}>Carga de Trabalho · Próximas 4 Semanas</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:10}}>
          {[1,2,3,4].map(function(sem){
            var ini=(sem-1)*5+1,fim=sem*5;
            var procs=all.filter(function(p){return p.diasRestantes>=ini&&p.diasRestantes<=fim;});
            var horas=procs.reduce(function(acc,p){return acc+(EST[p.tipoPeca]||1.5);},0);
            var cap=20;var pct=Math.min(100,(horas/cap)*100);
            var cor=pct>90?"#ff2e5b":pct>65?"#ffb800":"#00ff88";
            return(
              <div key={sem} style={{padding:"12px 14px",borderRadius:12,background:"rgba(255,255,255,.025)",border:"1px solid rgba(0,229,255,.1)"}}>
                <div style={{fontSize:10,color:K.dim,fontWeight:700,marginBottom:6,textTransform:"uppercase"}}>Semana {sem}</div>
                <div style={{fontSize:22,fontWeight:800,color:cor,fontFamily:"Orbitron,monospace"}}>{horas.toFixed(0)}h</div>
                <div style={{height:4,borderRadius:999,background:"rgba(255,255,255,.06)",marginTop:6,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:999,background:cor,width:pct+"%",boxShadow:"0 0 6px "+cor,transition:"width .5s"}}/>
                </div>
                <div style={{fontSize:9,color:K.dim,marginTop:4}}>{procs.length} proc. · cap.{cap}h</div>
              </div>
            );
          })}
        </div>
        <div style={{fontSize:10,color:K.dim,padding:"6px 10px",borderRadius:8,background:"rgba(0,229,255,.03)",border:"1px solid rgba(0,229,255,.08)"}}>
          Parecer=2.5h · Agravo/Contraminuta=2h · Manifestação=1.5h · Embargos=45min · Ofício=30min · Despacho=15min
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:20,marginBottom:20}}>
        <div className="cj-ia-card">
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><span style={{fontSize:18}}>🏆</span><span style={{fontSize:14,fontWeight:800,color:K.txt}}>TOP 5 HOJE</span><span style={{marginLeft:"auto",fontSize:11,color:K.dim}}>Score IA</span></div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {all.slice(0,5).map(function(p,i){var b=iaBadge(p.iaS);var sug=iaSugestao(p);return(
              <div key={p.id} className="cj-rank-item" onClick={function(){ss(p);}}>
                <div style={{width:26,height:26,borderRadius:8,background:i===0?"linear-gradient(135deg,#ff2e5b,#b91c1c)":i<3?"linear-gradient(135deg,#ffb800,#b45309)":"rgba(0,229,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff",flexShrink:0}}>{i+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}><span className={b.cls}>{b.emoji} {b.txt}</span><span style={{fontSize:10,color:K.dim,fontFamily:"'JetBrains Mono',monospace",marginLeft:"auto"}}>{p.iaS}pts</span></div>
                  <div style={{fontSize:12,fontWeight:600,color:K.txt,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.assunto||p.num||"—"}</div>
                  <div style={{fontSize:10,color:K.dim,marginTop:1}}>{sug.emoji} {sug.txt}</div>
                </div>
                <div style={{fontSize:11,fontWeight:700,color:uC(p.diasRestantes),fontFamily:"'JetBrains Mono',monospace",flexShrink:0}}>{p.diasRestantes}du</div>
              </div>
            );})}
          </div>
        </div>
        <div className="cj-ia-card">
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><span style={{fontSize:18}}>🚨</span><span style={{fontSize:14,fontWeight:800,color:K.txt}}>Alertas</span>{alertas.length>0&&<span style={{marginLeft:"auto",background:K.cr,color:"#fff",borderRadius:999,fontSize:10,fontWeight:800,padding:"1px 8px"}}>{alertas.length}</span>}</div>
          <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:240,overflowY:"auto"}}>
            {alertas.length?alertas.map(function(a,i){return(<div key={i} style={{padding:"7px 10px",borderRadius:9,background:a.cor+"12",borderLeft:"3px solid "+a.cor,fontSize:11,color:K.txt,lineHeight:1.4}}><span style={{marginRight:5}}>{a.emoji}</span>{a.txt}</div>);}):(<div style={{padding:14,textAlign:"center",color:K.dim2,fontSize:12}}>✅ Nenhum alerta crítico</div>)}
          </div>
        </div>
      </div>

      <div className="cj-ia-card">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><span style={{fontSize:16}}>📋</span><span style={{fontSize:14,fontWeight:800,color:K.txt}}>Ranking Completo</span><span style={{fontSize:11,color:K.dim,marginLeft:"auto"}}>por score IA</span></div>
        <div style={{display:"flex",flexDirection:"column",gap:4,maxHeight:340,overflowY:"auto"}}>
          {all.map(function(p,i){var b=iaBadge(p.iaS);var sug=iaSugestao(p);return(
            <div key={p.id} className="cj-rank-item" onClick={function(){ss(p);}} style={{borderLeft:"2px solid "+(i<3?K.cr:i<8?K.wa:K.brd)}}>
              <div style={{width:22,fontSize:10,fontWeight:800,color:i<3?K.cr:i<8?K.wa:K.dim,fontFamily:"'JetBrains Mono',monospace",flexShrink:0,textAlign:"center"}}>#{i+1}</div>
              <div style={{flex:1,minWidth:0,display:"flex",gap:8,alignItems:"center"}}>
                <div style={{minWidth:0,flex:1}}>
                  <div style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",color:K.ac}}>{p.num||"—"} <span style={{color:K.dim}}>· {p.tipoPeca}</span></div>
                  <div style={{fontSize:12,fontWeight:600,color:K.txt,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.assunto}</div>
                </div>
                <span className={b.cls} style={{flexShrink:0}}>{b.emoji} {b.txt}</span>
                <span style={{fontSize:11,color:uC(p.diasRestantes),fontFamily:"'JetBrains Mono',monospace",flexShrink:0,fontWeight:700}}>{p.diasRestantes}du</span>
              </div>
            </div>
          );})}
          {!all.length&&<div style={{textAlign:"center",padding:20,color:K.dim2}}>Nenhum processo cadastrado</div>}
        </div>
      </div>
    </div>
  );
}


function ProtocolarPg({st,dp,ss}){
  const items=[...st.adm,...st.jud].filter(p=>isProtocolar(p)).sort((a,b)=>b.score-a.score);
  return(
    <div className="cj-pg">
      <div className="cj-up" style={{display:"flex",alignItems:"center",gap:14,marginBottom:24,flexWrap:"wrap"}}>
        <div style={{fontSize:28}}>📤</div>
        <div>
          <h2 style={{margin:0,fontSize:22,fontWeight:800,color:"#00ff88",fontFamily:"Orbitron,sans-serif",textShadow:"0 0 12px rgba(0,255,136,.6)"}}>PROTOCOLAR NO TRIBUNAL</h2>
          <div style={{fontSize:12,color:K.dim,marginTop:3}}>Peças aprovadas pelo chefe do contencioso — protocolo pendente</div>
        </div>
        <div className="cj-pulse" style={{marginLeft:"auto",fontSize:32,fontWeight:800,color:"#00ff88",fontFamily:"Orbitron,monospace",textShadow:"0 0 18px rgba(0,255,136,.8)"}}>{items.length}</div>
      </div>
      {!items.length&&<EmptyState icon="done" color={K.su} title="Nenhum processo pendente de protocolo" sub="Quando o chefe do contencioso aprovar uma peça, ela aparecerá aqui"/>}
      <div className="cj-st" style={{display:"flex",flexDirection:"column",gap:12}}>
        {items.map((p,i)=>{var sys=getTribSistema(p.tribunal);return(
          <div key={p.id} className="cj-hud-tl cj-hud-br" style={{padding:"16px 20px",borderRadius:18,background:"linear-gradient(135deg,rgba(0,255,136,.08),rgba(2,5,20,.97))",border:"1px solid rgba(0,255,136,.35)",boxShadow:"0 0 20px rgba(0,255,136,.08),0 16px 40px rgba(0,0,0,.4)",animation:"cjProtocolar 2s ease-in-out infinite",cursor:"pointer",transition:"transform .2s"}} onClick={()=>ss(p)} onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={function(e){e.currentTarget.style.transform="none";}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
              <div style={{width:44,height:44,borderRadius:14,background:"rgba(0,255,136,.15)",border:"1px solid rgba(0,255,136,.35)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 0 12px rgba(0,255,136,.3)"}}>
                <Upload size={20} color="#00ff88" style={{filter:"drop-shadow(0 0 5px rgba(0,255,136,.8))"}}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:6,alignItems:"center"}}>
                  <span style={{fontSize:10,color:"#00ff88",fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",textShadow:"0 0 6px rgba(0,255,136,.6)"}}>📤 PROTOCOLAR</span>
                  <span className="cj-badge-ok" style={{fontSize:9}}>#{i+1} PRIORIDADE</span>
                  {p.tipo==="jud"&&<Bd color={K.pu}><Scale size={9}/>{p.tribunal}</Bd>}
                  {hasCustas(p)&&<span style={{fontSize:9,padding:"2px 8px",borderRadius:999,background:"rgba(255,184,0,.15)",color:"#ffb800",border:"1px solid rgba(255,184,0,.35)",fontWeight:700}}>💰 EXIGE CUSTAS</span>}
                </div>
                <div style={{fontSize:13,fontFamily:"'JetBrains Mono',monospace",color:"#00e5ff",marginBottom:4}}>{p.num||"Sem nº"}</div>
                <div style={{fontSize:15,fontWeight:700,color:K.txt,lineHeight:1.4,marginBottom:8}}>{p.assunto}</div>
                <div style={{fontSize:11,color:K.dim}}>{p.tipoPeca} · {p.responsavel} · Prazo: {fmt(p.prazoFinal)}</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end",flexShrink:0}} onClick={function(e){e.stopPropagation();}}>
                <UB d={p.diasRestantes} prazoFinal={p.prazoFinal}/>
                {sys&&<button onClick={function(){window.open(sys.url,"_blank","noopener,noreferrer");}} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:12,border:"1px solid rgba(0,255,136,.4)",background:"linear-gradient(135deg,rgba(0,255,136,.18),rgba(0,255,136,.06))",color:"#00ff88",fontSize:11,fontWeight:800,cursor:"pointer",boxShadow:"0 0 14px rgba(0,255,136,.25)",textShadow:"0 0 6px rgba(0,255,136,.7)",fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",whiteSpace:"nowrap"}}>
                  {sys.icone} Abrir {sys.sistema}
                </button>}
                {sys&&sys.url1g&&sys.url1g!==sys.url&&<button onClick={function(){window.open(sys.url1g,"_blank","noopener,noreferrer");}} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 12px",borderRadius:12,border:"1px solid rgba(168,85,247,.35)",background:"linear-gradient(135deg,rgba(168,85,247,.12),rgba(168,85,247,.05))",color:"#b84dff",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"Orbitron,sans-serif",whiteSpace:"nowrap"}}>
                  {sys.icone} 1º Grau
                </button>}
                {React.createElement(function(){var[ck,sCk]=useState(false);return React.createElement("button",{onClick:function(){copyText(DESPACHO_PROTOCOLO,function(){sCk(true);setTimeout(function(){sCk(false);},2500);});},style:{display:"inline-flex",alignItems:"center",gap:5,padding:"7px 12px",borderRadius:10,border:ck?"1px solid rgba(0,255,136,.5)":"1px solid rgba(0,229,255,.25)",background:ck?"rgba(0,255,136,.08)":"rgba(0,229,255,.06)",color:ck?"#00ff88":"#00e5ff",fontSize:10,fontWeight:700,cursor:"pointer",transition:"all .3s",whiteSpace:"nowrap",fontFamily:"inherit"}},ck?"✅ Copiado!":"📋 Despacho Protocolo");},null)}
                <button onClick={function(){dp({type:"UPD",id:p.id,isAdm:p.tipo==="adm",ch:{status:"Concluído"}});dp({type:"COMPLETE_P",id:p.id});}} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 10px",borderRadius:10,border:"1px solid rgba(0,229,255,.2)",background:"rgba(0,229,255,.06)",color:"#00e5ff",fontSize:10,fontWeight:700,cursor:"pointer"}}>
                  <CheckCircle size={12}/>Protocolado
                </button>
              </div>
            </div>
          </div>
        );})}
      </div>
    </div>
  );
};

/* ═══ PÁGINA CORREÇÃO ═══ */
function CorrecaoPg({st,dp,ss}){
  const items=[...st.adm,...st.jud].filter(p=>isCorrecao(p)).sort((a,b)=>b.score-a.score);
  return(
    <div className="cj-pg">
      <div className="cj-up" style={{display:"flex",alignItems:"center",gap:14,marginBottom:24,flexWrap:"wrap"}}>
        <div style={{fontSize:28}}>✏️</div>
        <div>
          <h2 style={{margin:0,fontSize:22,fontWeight:800,color:"#ffb800",fontFamily:"Orbitron,sans-serif",textShadow:"0 0 12px rgba(255,184,0,.6)"}}>EM CORREÇÃO</h2>
          <div style={{fontSize:12,color:K.dim,marginTop:3}}>Retornadas pelo chefe do contencioso — revisar antes de protocolar</div>
        </div>
        <div className="cj-pulse" style={{marginLeft:"auto",fontSize:32,fontWeight:800,color:"#ffb800",fontFamily:"Orbitron,monospace",textShadow:"0 0 18px rgba(255,184,0,.8)"}}>{items.length}</div>
      </div>
      {!items.length&&<EmptyState icon="done" color={K.wa} title="Nenhuma peça em fase de correção" sub="Quando uma peça for retornada pelo chefe, ela aparecerá aqui"/>}
      <div className="cj-st" style={{display:"flex",flexDirection:"column",gap:12}}>
        {items.map((p,i)=>(
          <div key={p.id} className="cj-hud-tl cj-hud-br" style={{padding:"16px 20px",borderRadius:18,background:"linear-gradient(135deg,rgba(255,184,0,.08),rgba(2,5,20,.97))",border:"1px solid rgba(255,184,0,.38)",boxShadow:"0 0 20px rgba(255,184,0,.08),0 16px 40px rgba(0,0,0,.4)",animation:"cjCorrecao 2s ease-in-out infinite",cursor:"pointer",transition:"transform .2s"}} onClick={()=>ss(p)} onMouseEnter={function(e){e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={function(e){e.currentTarget.style.transform="none";}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
              <div style={{width:44,height:44,borderRadius:14,background:"rgba(255,184,0,.15)",border:"1px solid rgba(255,184,0,.38)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 0 12px rgba(255,184,0,.3)"}}>
                <PenLine size={20} color="#ffb800" style={{filter:"drop-shadow(0 0 5px rgba(255,184,0,.8))"}}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:6,alignItems:"center"}}>
                  <span style={{fontSize:10,color:"#ffb800",fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",textShadow:"0 0 6px rgba(255,184,0,.6)"}}>✏️ CORRIGIR</span>
                  <span className="cj-badge-zap" style={{fontSize:9}}>#{i+1} PRIORIDADE</span>
                  {p.tipo==="jud"&&<Bd color={K.pu}><Scale size={9}/>{p.tribunal}</Bd>}
                </div>
                <div style={{fontSize:13,fontFamily:"'JetBrains Mono',monospace",color:"#00e5ff",marginBottom:4}}>{p.num||"Sem nº"}</div>
                <div style={{fontSize:15,fontWeight:700,color:K.txt,lineHeight:1.4,marginBottom:8}}>{p.assunto}</div>
                {p.obs&&<div style={{fontSize:11,color:"#ffb800",padding:"6px 10px",borderRadius:8,background:"rgba(255,184,0,.08)",border:"1px solid rgba(255,184,0,.2)",marginBottom:6}}>📝 {p.obs}</div>}
                <div style={{fontSize:11,color:K.dim}}>{p.tipoPeca} · {p.responsavel} · Prazo: {fmt(p.prazoFinal)}</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end",flexShrink:0}} onClick={function(e){e.stopPropagation();}}>
                <UB d={p.diasRestantes} prazoFinal={p.prazoFinal}/>
                <button onClick={function(){dp({type:"UPD",id:p.id,isAdm:p.tipo==="adm",ch:{status:"Pronto p/ Protocolo"}});}} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"7px 12px",borderRadius:11,border:"1px solid rgba(0,255,136,.35)",background:"rgba(0,255,136,.08)",color:"#00ff88",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
                  <Upload size={12}/>Mover p/ Protocolar
                </button>
                <button onClick={()=>ss(p)} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 10px",borderRadius:10,border:"1px solid rgba(255,184,0,.25)",background:"rgba(255,184,0,.06)",color:"#ffb800",fontSize:10,fontWeight:700,cursor:"pointer"}}>
                  <PenLine size={12}/>Ver processo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══ MURAL DE POST-ITS ═══ */
const POSTIT_CORES=["#fbbf24","#34d399","#60a5fa","#f87171","#c084fc","#fb923c","#e879f9"];
const MuralPg=({st,dp})=>{
  const[txt,sTxt]=useState(""),[cor,sCor]=useState(POSTIT_CORES[0]),[editId,sEditId]=useState(null);
  const notas=st.notas||[];
  const addNota=()=>{if(!txt.trim())return;dp({type:"ADD_NOTA",d:{texto:txt,cor,criadoEm:NOW}});sTxt("");};
  return(
    <div className="cj-pg">
      <div className="cj-up" style={{display:"flex",alignItems:"center",gap:14,marginBottom:24,flexWrap:"wrap"}}>
        <StickyNote size={24} color={K.wa}/>
        <h2 style={{margin:0,fontSize:22,fontWeight:800,color:K.txt}}>Mural de Post-its</h2>
        <span style={{fontSize:13,color:K.dim}}>Lembretes rápidos e notas importantes</span>
      </div>
      <Bx className="cj-up" style={{marginBottom:24,padding:"16px 20px"}}>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"flex-end"}}>
          <div style={{flex:1,minWidth:220}}>
            <label style={lblSt}>Nova nota</label>
            <textarea style={{...inpSt,resize:"vertical",minHeight:54}} value={txt} onChange={e=>sTxt(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&e.ctrlKey)addNota();}} placeholder="Escreva um lembrete... (Ctrl+Enter para salvar)"/>
          </div>
          <div>
            <label style={{...lblSt,marginBottom:8}}>Cor</label>
            <div style={{display:"flex",gap:6}}>
              {POSTIT_CORES.map(c=><div key={c} onClick={()=>sCor(c)} style={{width:22,height:22,borderRadius:"50%",background:c,cursor:"pointer",border:cor===c?"3px solid #fff":"3px solid transparent",boxSizing:"border-box",transition:"all .15s"}}/>)}
            </div>
          </div>
          <button style={btnPrim} onClick={addNota}><Plus size={14}/>Adicionar</button>
        </div>
      </Bx>
      {!notas.length&&<div style={{textAlign:"center",padding:60,color:K.dim2}}>
        <div style={{fontSize:40,marginBottom:12}}>📌</div>
        <div style={{fontSize:14}}>Nenhum post-it ainda. Adicione lembretes acima.</div>
      </div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:20}}>
        {notas.map((n,idx)=>{
          const rot=((idx%5)-2)*1.8;
          return(
            <div key={n.id} className="cj-postit" style={{background:n.cor,borderRadius:4,padding:"18px 14px 26px",boxShadow:"4px 8px 20px rgba(0,0,0,.35),inset 0 -2px 0 rgba(0,0,0,.12)",transform:`rotate(${rot}deg)`,position:"relative",minHeight:130}}>
              <div style={{position:"absolute",top:-7,left:"50%",transform:"translateX(-50%)",width:18,height:18,borderRadius:"50%",background:"rgba(0,0,0,.22)",boxShadow:"0 2px 4px rgba(0,0,0,.3)"}}/>
              {editId===n.id
                ?<textarea autoFocus style={{width:"100%",background:"transparent",border:"none",outline:"none",fontSize:13,color:"#1a1a1a",fontFamily:"inherit",resize:"none",minHeight:70,fontWeight:600}} defaultValue={n.texto} onBlur={e=>{dp({type:"UPD_NOTA",id:n.id,ch:{texto:e.target.value}});sEditId(null);}}/>
                :<div onClick={()=>sEditId(n.id)} style={{fontSize:13,color:"#1a1a1a",fontWeight:600,lineHeight:1.6,minHeight:60,cursor:"text",wordBreak:"break-word"}}>{n.texto}</div>
              }
              <div style={{position:"absolute",bottom:6,right:8,display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontSize:9,color:"rgba(0,0,0,.4)",fontWeight:600}}>{n.criadoEm?fmt(toD(n.criadoEm)):""}</span>
                <button onClick={()=>dp({type:"DEL_NOTA",id:n.id})} style={{background:"rgba(0,0,0,.18)",border:"none",borderRadius:"50%",width:16,height:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(0,0,0,.5)",padding:0}}><X size={9}/></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};















const NAV=[{id:"dashboard",icon:LayoutDashboard,label:"Dashboard"},{id:"today",icon:Target,label:"Hoje"},{id:"week",icon:CalendarDays,label:"Esta Semana"},{id:"priorities",icon:Flame,label:"Prioridades"},{id:"ia",icon:Zap,label:"IA Nexus"},{id:"insights",icon:BarChart2,label:"Insights IA"},{id:"admin",icon:FolderOpen,label:"Administrativos"},{id:"judicial",icon:Scale,label:"Judiciais"},{id:"execucao",icon:Zap,label:"Em Execução"},{id:"acompanhamento",icon:Eye,label:"Em Acompanhamento"},{id:"protocolar",icon:Upload,label:"Protocolar"},{id:"correcao",icon:PenLine,label:"Em Correção"},{id:"done",icon:CheckCircle,label:"Realizados"},{id:"agenda",icon:Calendar,label:"Agenda"},{id:"calendar",icon:CalendarDays,label:"Calendário"},{id:"timeline",icon:Activity,label:"Timeline Prazos"},{id:"waiting",icon:Users,label:"Aguardando"},{id:"inbox",icon:Inbox,label:"Caixa de Entrada"},{id:"lembretes",icon:Bell,label:"Lembretes"},{id:"mural",icon:StickyNote,label:"Mural"},{id:"analytics",icon:BarChart3,label:"Analytics"},{id:"auditlog",icon:History,label:"Auditoria"},{id:"relacoes",icon:Layers,label:"Relações"},{id:"settings",icon:Settings,label:"Configurações"}];


/* === EMAIL ALERT MODAL === */
function EmailAlertModal({st, onClose}) {
  const [email, setEmail] = useState("joaogabriel0112@gmail.com");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const all = [...(st.adm||[]),...(st.jud||[])];
  const urgentes = all.filter(function(p){
    return p.prazoFinal && !["Concluído","Arquivado"].includes(p.status) &&
           p.diasRestantes >= 0 && p.diasRestantes <= 5;
  }).sort(function(a,b){return a.diasRestantes-b.diasRestantes;});

  const enviar = function(){
    if(!email.trim()) return;
    setLoading(true); setResult(null);
    // Build email HTML inline and send via edge function
    fetchT("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/email-alert", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email:email.trim(), processos: urgentes.map(function(p){return {
        assunto:p.assunto, tipoPeca:p.tipoPeca||"—",
        tribunal:p.tribunal||p.orgao||"—", diasRestantes:p.diasRestantes,
        prazoFinal:p.prazoFinal instanceof Date?p.prazoFinal.toISOString().split("T")[0]:p.prazoFinal
      };})})
    }, 20000).then(function(r){return r.json();}).then(function(d){
      setResult(d); setLoading(false);
    }).catch(function(){setResult({error:"Erro de conexão"});setLoading(false);});
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:1600,display:"flex",justifyContent:"center",alignItems:"center",padding:24}}
      onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.3)",borderRadius:22,width:"100%",maxWidth:460,padding:24,position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:"#4e6a8a",cursor:"pointer",fontSize:18}}>✕</button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
          <span style={{fontSize:22}}>📧</span>
          <div>
            <h3 style={{margin:0,fontSize:15,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif"}}>Alerta de Prazos por Email</h3>
            <div style={{fontSize:11,color:"#4e6a8a"}}>Enviar resumo dos {urgentes.length} processos críticos (≤5du)</div>
          </div>
        </div>
        <div style={{maxHeight:200,overflowY:"auto",marginBottom:14}}>
          {urgentes.length===0&&<div style={{textAlign:"center",padding:16,color:"#4e6a8a",fontSize:13}}>Nenhum processo com prazo crítico no momento.</div>}
          {urgentes.map(function(p){var cor=p.diasRestantes<=2?"#ff2e5b":"#ffb800"; return(
            <div key={p.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:8,marginBottom:4,background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)"}}>
              <span style={{fontSize:12,fontWeight:900,color:cor,fontFamily:"Orbitron,monospace",flexShrink:0,minWidth:32}}>{p.diasRestantes===0?"HOJE":p.diasRestantes+"du"}</span>
              <span style={{fontSize:11,color:"#e2e8f0",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.assunto}</span>
              <span style={{fontSize:10,color:"#4e6a8a",flexShrink:0}}>{p.tipoPeca}</span>
            </div>
          );})}
        </div>
        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontSize:11,fontWeight:600,color:"#4e6a8a",marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Seu email</label>
          <input style={{...inpSt}} value={email} onChange={function(e){setEmail(e.target.value);}} type="email" placeholder="joao@cfm.org.br" onKeyDown={function(e){if(e.key==="Enter")enviar();}}/>
        </div>
        {!loading&&!result&&<button onClick={enviar} style={{...btnPrim,width:"100%",justifyContent:"center",padding:"11px",fontSize:13}}>📧 Enviar alerta agora</button>}
        {loading&&<div style={{textAlign:"center",padding:16,color:"#00e5ff",fontSize:12,fontFamily:"Orbitron,monospace"}}>Enviando...</div>}
        {result&&<div style={{padding:"10px 14px",borderRadius:10,background:result.ok||result.preview?"rgba(0,255,136,.08)":"rgba(255,46,91,.08)",border:"1px solid "+(result.ok||result.preview?"rgba(0,255,136,.25)":"rgba(255,46,91,.25)"),fontSize:12,color:result.ok||result.preview?"#00ff88":"#ff2e5b"}}>
          {result.ok?"✅ Email enviado!":result.preview?"✅ Função ativa. Configure RESEND_API_KEY no Supabase para ativar envio real.":result.error||"Erro ao enviar"}
        </div>}
        <div style={{marginTop:12,fontSize:10,color:"#4e6a8a",lineHeight:1.5}}>
          Para envio automático diário às 7h30, configure RESEND_API_KEY + ALERT_EMAIL nos secrets do Supabase Edge Functions.
        </div>
      </div>
    </div>
  );
}

/* ═══ v11 — SYNC BADGE (cloud sync indicator) ═══ */
function SyncBadge(){
  var[status,setStatus]=useState(__lastSyncStatus||"idle");
  var[lastTime,setLastTime]=useState(__lastSyncTime);
  useEffect(function(){
    var unsub=onSyncChange(function(s,t){setStatus(s);setLastTime(t);});
    return unsub;
  },[]);
  var forceSync=function(){
    setStatus("syncing");
    supaFetchState().then(function(r){
      if(r&&r.value){try{localStorage.setItem(STORE_KEY,r.value);}catch(e){}}
      setSyncStatus("synced");
    }).catch(function(){setSyncStatus("offline");});
  };
  var config={
    idle:{cor:"#64748b",bg:"rgba(100,116,139,.08)",brd:"rgba(100,116,139,.25)",icon:"○",label:"Aguardando"},
    syncing:{cor:"#00e5ff",bg:"rgba(0,229,255,.08)",brd:"rgba(0,229,255,.35)",icon:"⟳",label:"Sincronizando"},
    synced:{cor:"#00ff88",bg:"rgba(0,255,136,.08)",brd:"rgba(0,255,136,.3)",icon:"✓",label:"Sincronizado"},
    offline:{cor:"#ffb800",bg:"rgba(255,184,0,.08)",brd:"rgba(255,184,0,.35)",icon:"◌",label:"Offline (cache local)"},
    error:{cor:"#ff2e5b",bg:"rgba(255,46,91,.08)",brd:"rgba(255,46,91,.35)",icon:"!",label:"Erro"}
  };
  var c=config[status]||config.idle;
  var tooltip="Status: "+c.label+(lastTime?" · Última sync: "+lastTime.toLocaleTimeString("pt-BR"):"")+" · Clique para forçar";
  return React.createElement("button",{onClick:forceSync,title:tooltip,style:{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 11px",borderRadius:10,border:"1px solid "+c.brd,background:c.bg,color:c.cor,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:".5px",transition:"all .2s"}},
    React.createElement("span",{style:{animation:status==="syncing"?"spin 1s linear infinite":"none",display:"inline-block"}},c.icon),
    React.createElement("span",{style:{textTransform:"uppercase",fontSize:9}},status==="synced"&&lastTime?"synced "+Math.max(0,Math.floor((Date.now()-lastTime.getTime())/1000))+"s":c.label)
  );
}

export default function App() {
  const [st, dp0] = useReducer(reducer, null, mkInit);
  /* M2: dp memoizado, evita recriar funcao a cada render e cascata de re-renders nos filhos */
  const dp = useCallback(function(action){
    setUndoStack(function(prev){return [...prev.slice(-9),{action,snapshot:st}];});
    dp0(action);
  }, [st]);
  const [pg, sPg] = useState("dashboard");
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [_tick, setTick] = useState(0);
  /* v41 · Notificacoes OS desabilitadas por padrao (problemas em iframe sandbox).
     Para ativar, descomentar o bloco abaixo. */
  // useEffect(function(){
  //   try {
  //     if (typeof Notification !== "undefined" && Notification.permission === "default") {
  //       Notification.requestPermission();
  //     }
  //   } catch(e) {}
  // }, []);
  useEffect(function(){
    /* A1: a cada 60s tick para forcar re-render + atualiza NOW + recalcula diasRestantes */
    var t = setInterval(function(){
      NOW = getNOW();
      setTick(function(n){return n+1;});
      dp0({type:"RECALC_ALL"});
    }, 60000);
    return function(){ clearInterval(t); };
  }, []);
  const [sel, sSel] = useState(null);
  const [editForm, sEF] = useState(null);
  const [sq, sSq] = useState("");
  const [so, sSo] = useState(false);
  const [col, sCol] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const importRef = useRef(null);
  // Switch theme object based on mode
  const Kref = darkMode ? KD : KL;
  // Sync global K (used by all components) — simple reassignment works for re-renders
  Object.assign(K, Kref);
  const [toast, setToast] = useState(null);
  const showToast = function(type, msg) { setToast({type: type, msg: msg}); setTimeout(function(){ setToast(null); }, 3000); };
  const handleExport = function() { try { exportState(st); showToast("ok", "JSON exportado com sucesso"); } catch(e) { showToast("err", "Erro ao exportar"); } };
  const handleExportCSV = function() { try { exportCSV(st); showToast("ok", "CSV exportado com sucesso"); } catch(e) { showToast("err", "Erro ao exportar CSV"); } };
  const handleImport = function(file) { importState(file, dp, function(res){ showToast(res === "ok" ? "ok" : "err", res === "ok" ? "Estado importado com sucesso" : "Arquivo JSON inválido"); }); };

  useEffect(() => { injectCSS(); injectCnCSS(); }, []);
  useEffect(() => {
    document.body.style.background = K.bg;
    document.body.style.color = K.txt;
  }, [darkMode]);

  // Load persisted state on mount
  // IMPORTANTE: começa em `false` para impedir que o effect de save sobrescreva
  // a nuvem com os dados mock iniciais antes do fetch remoto completar.
  const [loaded, setLoaded] = useState(false);
  const [showAutoBackup, setShowAutoBackup] = useState(false);
  useEffect(function(){
    var today=new Date();
    var isMonday=today.getDay()===1;
    var lastBackup=localStorage.getItem("cojur_last_backup");
    var lastBackupDate=lastBackup?new Date(lastBackup):null;
    var needsBackup=isMonday&&(!lastBackupDate||toISO(lastBackupDate)!==toISO(today));
    if(needsBackup) setShowAutoBackup(true);
  },[]);
  const [showGmail, setShowGmail] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [showDecisao, setShowDecisao] = useState(false);
  const [showRevisao, setShowRevisao] = useState(false);
  const [checklistProc, setChecklistProc] = useState(null);
  const [minutaProc, setMinutaProc] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [showSemanal, setShowSemanal] = useState(false);
  const [showBackup, setShowBackup] = useState(false);
  const [djeProc, setDjeProc] = useState(null);
  const [showIANovo, setShowIANovo] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [bulkSelected, setBulkSelected] = useState([]);
  /* ═══ v10 — NOVAS FEATURES ═══ */
  const [showPalette, setShowPalette] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [comparadorIds, setComparadorIds] = useState([]);
  const [savedFilters, setSavedFilters] = useState(function(){try{var s=localStorage.getItem("cojur_filters");return s?JSON.parse(s):[];}catch(e){return [];}});
  /* ═══ v41 — COJUR NEXUS UPGRADE PACK · estados ═══ */
  /* Boot desligado por padrao para evitar tela preta. Pode ser reativado
     descomentando: const [showBoot, setShowBoot] = useState(true); */
  const [showBoot, setShowBoot] = useState(false);
  const [showCommand, setShowCommand] = useState(false);
  const [showForceGraph, setShowForceGraph] = useState(false);
  /* desliga o splash assim que o app rendereiza pela primeira vez */
  useEffect(function(){
    if (!showBoot) return;
    var t = setTimeout(function(){ setShowBoot(false); }, 3300);
    return function(){ clearTimeout(t); };
  }, []);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        /* Timeout maior (5s) para permitir fetch da nuvem; cache local é fallback instantâneo */
        const result = await Promise.race([
          storage.get(STORE_KEY),
          new Promise(function(res){ setTimeout(function(){ res(null); }, 5000); })
        ]);
        if (!cancelled && result && result.value) {
          const restored = rehydrate(result.value);
          if (restored) dp({ type: "LOAD", state: restored });
        }
      } catch (e) {
        logErr("[COJUR sync] load inicial falhou:", e);
      } finally {
        /* Liberar saves só DEPOIS da tentativa de load — evita sobrescrever nuvem com mock */
        if (!cancelled) setLoaded(true);
      }
    })();
    return function(){ cancelled = true; };
  }, []);

  /* ═══ v11 — SYNC CHECK a cada 30s (detecta alterações feitas em outro navegador) ═══ */
  useEffect(() => {
    var interval = setInterval(async function() {
      try {
        var cloudResult = await supaFetchState();
        if (!cloudResult) return;
        var localStr = "";
        try { localStr = localStorage.getItem(STORE_KEY) || ""; } catch(e){}
        if (cloudResult.value && cloudResult.value !== localStr) {
          var cloudUpdated = new Date(cloudResult.updated_at);
          var localBackupRaw = "";
          try { localBackupRaw = localStorage.getItem(STORE_KEY+":ts") || "0"; } catch(e){}
          var localUpdated = new Date(parseInt(localBackupRaw) || 0);
          /* Se versão da nuvem é mais recente, aplicar */
          if (cloudUpdated > localUpdated) {
            var restored = rehydrate(cloudResult.value);
            if (restored) {
              try { localStorage.setItem(STORE_KEY, cloudResult.value); } catch(e){}
              dp0({ type: "LOAD", state: restored });
              setSyncStatus("synced");
            }
          }
        }
      } catch(e) {}
    }, 30000);
    return function(){ clearInterval(interval); };
  }, []);

  // Save state to persistent storage with debounce
  const saveTimer = useRef(null);
  /* v12: cooldown de 60s para o toast de erro de sync, evita spam quando a rede oscila */
  const lastSyncErrToast = useRef(0);
  const lastSyncOkToast = useRef(0);
  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async function(){
      var ok = false;
      try {
        ok = await storage.set(STORE_KEY, serialize(st));
        try { localStorage.setItem(STORE_KEY+":ts", String(Date.now())); } catch(e){}
      } catch (e) {
        ok = false;
      }
      var now = Date.now();
      if (ok === false) {
        if (now - lastSyncErrToast.current > 60000) {
          lastSyncErrToast.current = now;
          showToast("err", "Sync com a nuvem falhou. Trabalhando offline (cache local).");
        }
      } else {
        /* Se acabou de voltar de um estado de erro, avisa que reconectou. Cooldown de 60s. */
        if (lastSyncErrToast.current > 0 && (now - lastSyncOkToast.current > 60000)) {
          lastSyncOkToast.current = now;
          lastSyncErrToast.current = 0;
          showToast("ok", "Sync restabelecido. Dados na nuvem.");
        }
      }
    }, 400);
    return function(){ if(saveTimer.current) clearTimeout(saveTimer.current); };
  }, [st, loaded]);

  // Sync selected process with state
  useEffect(() => {
    if (!sel) return;
    const all = [...st.adm, ...st.jud];
    const u = all.find(p => p.id === sel.id);
    if (u) sSel(u);
  }, [st]);

  /* A1: NOW refresh agora unificado no setTick de 60s acima (que tambem dispatcha RECALC_ALL) */

  // Keyboard shortcuts
  useEffect(() => {
    const handler = function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      /* Ctrl+Z / Cmd+Z — undo (must be before the modifier guard) */
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        setUndoStack(function(prev){if(!prev.length){showToast("err","Nada para desfazer");return prev;}var last=prev[prev.length-1];dp0({type:'LOAD',state:last.snapshot});showToast("ok","Ação desfeita (Ctrl+Z)");return prev.slice(0,-1);});
        return;
      }
      /* ═══ v41 · Cmd+Shift+K — MODO COMANDO (NEXUS UPGRADE) ═══ */
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setShowCommand(function(v){return !v;});
        return;
      }
      /* ═══ Cmd+K / Ctrl+K — COMMAND PALETTE ═══ */
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowPalette(true);
        return;
      }
      /* Cmd+N — quick-add */
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        setShowQuickAdd(true);
        return;
      }
      if (e.metaKey || e.ctrlKey) return;
      /* ═══ ? — SHORTCUTS MODAL ═══ */
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowShortcuts(true);
        return;
      }
      switch(e.key) {
        case '/': e.preventDefault(); document.querySelector('input[placeholder*="Buscar"]') && document.querySelector('input[placeholder*="Buscar"]').focus(); break;
        case 'Escape': sSel(null); setShowGmail(false); setShowDecisao(false); setShowRevisao(false); setShowQuickAdd(false); setShowPalette(false); setShowShortcuts(false); setShowCommand(false); break;
        case 'p': case 'P': sPg('priorities'); break;
        case 'i': case 'I': sPg('ia'); break;
        case 'h': case 'H': sPg('today'); break;
        case 'c': case 'C': sPg('calendar'); break;
        case 't': case 'T': sPg('timeline'); break;
        case 'f': case 'F': setFocusMode(function(v){return !v;}); break;
        case 'n': case 'N': sPg(pg === 'judicial' ? 'judicial' : 'admin'); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handler);
    return function(){ window.removeEventListener('keydown', handler); };
  }, [pg]);

  const all = useMemo(() => [...st.adm, ...st.jud], [st.adm, st.jud]);
  const cn = useMemo(() => all.filter(p => p.diasRestantes <= 10).length, [all]);
  const prazoUrgente = useMemo(() => all.filter(function(p){return p.diasRestantes>=0&&p.diasRestantes<=2&&!["Concluído","Arquivado","Suspenso"].includes(p.status);}), [all]);
  /* ═══ DEBOUNCED SEARCH — evita recalcular a cada keystroke ═══ */
  const [debouncedSq, setDebouncedSq] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSq(sq), 200);
    return () => clearTimeout(timer);
  }, [sq]);
  const sr = useMemo(() => {
    if (!debouncedSq.trim()) return [];
    const q = debouncedSq;
    return all.filter(p => fuzzyMatch(p.num||"",q) || fuzzyMatch(p.numeroSEI||"",q) || fuzzyMatch(p.assunto||"",q) || fuzzyMatch(p.orgao||"",q) || fuzzyMatch(p.interessado||"",q) || fuzzyMatch(p.parteContraria||"",q) || (p.tags||[]).some(t=>fuzzyMatch(t,q))||fuzzyMatch(p.tipoPeca||"",q)||fuzzyMatch(p.tribunal||"",q)||fuzzyMatch(p.responsavel||"",q)).slice(0,12);
  }, [debouncedSq, all]);

  const handleEdit = p => { sEF(p); sSel(null); };
  const handleEditSave = form => { dp({ type: "UPD", id: editForm.id, isAdm: editForm.tipo === "adm", ch: form }); sEF(null); };
  const handleEditDel = () => { setConfirmAction({title:"Excluir processo",msg:"Tem certeza que deseja excluir \""+((editForm&&editForm.assunto)||"")+"\"? Esta ação não pode ser desfeita.",danger:true,fn:function(){dp({type:"DEL_P",id:editForm.id});sEF(null);}}); };

  // Sound alert for critical deadlines
  useEffect(function(){
    if(prazoUrgente&&prazoUrgente.length>0){
      /* ═══ BROWSER PUSH NOTIFICATIONS ═══ */
      requestNotifPermission();
      prazoUrgente.forEach(function(p){
        if(p.diasRestantes<=1) sendBrowserNotif("⚠️ PRAZO CRÍTICO — "+p.diasRestantes+"du",p.assunto+" ("+p.num+")");
      });
      /* Sustentações em 48h */
      var sustAlerta=[...st.adm,...st.jud].filter(isSustAlerta);
      sustAlerta.forEach(function(p){sendBrowserNotif("🎤 SUSTENTAÇÃO ORAL PRÓXIMA",p.assunto);});
      try{
        var ctx=new(window.AudioContext||window.webkitAudioContext)();
        var osc=ctx.createOscillator();
        var gain=ctx.createGain();
        osc.connect(gain);gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(880,ctx.currentTime);
        osc.frequency.setValueAtTime(660,ctx.currentTime+0.15);
        osc.frequency.setValueAtTime(880,ctx.currentTime+0.3);
        gain.gain.setValueAtTime(0.3,ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.5);
        osc.start(ctx.currentTime);osc.stop(ctx.currentTime+0.5);
      }catch(e){}
    }
  },[prazoUrgente&&prazoUrgente.length]);

  // Push notifications for critical deadlines
  useEffect(function(){
    requestPushPermission().then(function(granted){
      if(granted) checkAndNotifyDeadlines(all);
    });
  },[]);

  const rP = () => {
    const pp = { st, dp, ss: sSel, sp: sPg, compact: compactMode, bulkSelected, setBulkSelected, savedFilters, setSavedFilters, setComparadorIds };
    switch (pg) {
      case "dashboard": return <DashPg {...pp} />;
      case "today": return <TodayPg {...pp} />;
      case "week": return <WeekPg {...pp} />;
      case "priorities": return <PrioPg {...pp} />;
      case "ia": return <IAPainel {...pp} />;
      case "insights": return <InsightsPg {...pp} />;
      case "admin": return <ProcList type="admin" {...pp} />;
      case "judicial": return <ProcList type="judicial" {...pp} />;
      case "execucao": return <ExecucaoPg {...pp} />;
      case "acompanhamento": return <AcompanhamentoPg {...pp} />;
      case "protocolar": return <ProtocolarPg {...pp} />;
      case "correcao": return <CorrecaoPg {...pp} />;
      case "done": return <DonePg {...pp} />;
      case "agenda": return <AgendaPg {...pp} />;
      case "calendar": return <CalPg {...pp} />;
      case "timeline": return <TimelinePg {...pp} />;
      case "waiting": return <WaitPg {...pp} />;
      case "inbox": return <InboxPg {...pp} />;
      case "lembretes": return <LembretePg {...pp} />;
      case "mural": return <MuralPg {...pp} />;
      case "analytics": return <AnalPg {...pp} />;
      case "auditlog": return <AuditLogPg {...pp} />;
      case "relacoes": return <RelacoesPg {...pp} />;
      case "settings": return <SettPg {...pp} />;
      default: return <DashPg {...pp} />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: K.bg, fontFamily: "'Outfit','Segoe UI',system-ui,sans-serif", color: K.txt, overflow: "hidden", position:"relative", isolation:"isolate" }}>
      {/* ═══ v41 · COJUR NEXUS UPGRADE · STYLE INLINE + BOOT + AMBIENT + HUD ═══ */}
      <CnStyles />
      {showBoot && (
        <BootScreen
          duration={2400}
          ids={[...st.adm, ...st.jud].slice(0, 15).map(function(p){return p.num || p.assunto || "—";})}
        />
      )}
      <AmbientParticles count={20} />
      <HUDChassis />
      <CnVersionBadge />
      <ModoComando
        open={showCommand}
        onClose={function(){ setShowCommand(false); }}
        total={st.adm.length + st.jud.length}
        criticos={cn}
        jud={st.jud.length}
        adm={st.adm.length}
      />
      {/* v41 · ForceGraph · grafo de relacoes (modal) */}
      <ForceGraph
        open={showForceGraph}
        onClose={function(){ setShowForceGraph(false); }}
        processos={[...st.adm, ...st.jud]}
      />
      {/* ═══ ANIMATED MESH GRADIENT BACKGROUND ═══ */}
      <MeshBg/>
      {/* ═══ CONFETTI HOST (renders on triggerConfetti) ═══ */}
      <ConfettiHost/>
      {/* Ambient glow — 4 radial orbs like the finance app */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:"radial-gradient(ellipse at 15% 0%, rgba(0,255,136,.08), transparent 45%), radial-gradient(ellipse at 85% 5%, rgba(184,77,255,.07), transparent 40%), radial-gradient(ellipse at 50% 95%, rgba(0,229,255,.06), transparent 45%), radial-gradient(ellipse at 0% 50%, rgba(0,170,255,.04), transparent 35%)"}} />
      {/* Neon grid */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:"linear-gradient(rgba(0,229,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,.03) 1px, transparent 1px)",backgroundSize:"44px 44px",WebkitMaskImage:"radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)"}} />
      {/* Scan line — only in dark mode */}
      {showAutoBackup&&<div style={{position:"fixed",bottom:28,left:240,zIndex:2500,padding:"12px 18px",borderRadius:14,background:"rgba(0,255,136,.12)",border:"1px solid rgba(0,255,136,.4)",display:"flex",alignItems:"center",gap:12,boxShadow:"0 0 20px rgba(0,255,136,.15)"}}>
        <span style={{fontSize:12,fontWeight:700,color:"#00ff88"}}>Backup semanal recomendado</span>
        <button onClick={function(){handleExport();localStorage.setItem("cojur_last_backup",new Date().toISOString());setShowAutoBackup(false);}} style={{padding:"4px 10px",borderRadius:7,border:"1px solid rgba(0,255,136,.4)",background:"rgba(0,255,136,.1)",color:"#00ff88",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Exportar JSON</button>
        <button onClick={function(){setShowAutoBackup(false);}} style={{background:"none",border:"none",color:"rgba(0,255,136,.6)",cursor:"pointer",fontSize:14}}>x</button>
      </div>}
      {prazoUrgente&&prazoUrgente.length>0&&<div style={{position:"fixed",top:0,left:0,right:0,zIndex:3000,padding:"9px 20px",background:"rgba(200,20,60,.95)",display:"flex",alignItems:"center",gap:12,boxShadow:"0 4px 20px rgba(255,46,91,.4)"}}><span style={{fontSize:12,fontWeight:800,color:"#fff",flex:1,fontFamily:"Orbitron,sans-serif"}}>PRAZO CRITICO: {prazoUrgente[0].assunto} — {prazoUrgente[0].diasRestantes===0?"VENCE HOJE":prazoUrgente[0].diasRestantes+"du"}</span><button onClick={function(){sSel(prazoUrgente[0]);}} style={{padding:"4px 10px",borderRadius:7,border:"1px solid rgba(255,255,255,.4)",background:"rgba(255,255,255,.15)",color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Ver</button></div>}
      {darkMode&&<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:1,overflow:"hidden"}}><div style={{position:"absolute",left:0,right:0,height:"1px",background:"linear-gradient(90deg, transparent 10%, rgba(0,229,255,.28) 50%, transparent 90%)",animation:"scanLine 5s linear infinite"}} /></div>}
      <input ref={importRef} type="file" accept=".json" onChange={e => { const f = e.target.files && e.target.files[0]; if (f) handleImport(f); e.target.value = ""; }} style={{ display: "none" }} />
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* SIDEBAR */}
      <div style={{ width: focusMode ? 0 : col ? 64 : 220, overflow:"hidden", background: "linear-gradient(180deg, rgba(2,5,16,.99), rgba(3,7,22,.99))", borderRight: focusMode ? "none" : "1px solid rgba(0,212,255,.1)", boxShadow:"2px 0 24px rgba(0,0,0,.5), 1px 0 0 rgba(0,229,255,.06)", display: "flex", flexDirection: "column", transition: "width .3s ease", flexShrink: 0, position:"relative" }}>
        <div style={{ padding: col ? "18px 10px" : "18px 18px", borderBottom: "1px solid rgba(0,212,255,.1)", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", background:"linear-gradient(135deg, rgba(0,229,255,.06), rgba(168,85,247,.04))" }} onClick={() => sCol(!col)}>
          <CFMMark size={38} />
          {!col && <div style={{minWidth:0}}>
            <div style={{ fontSize: 15, fontWeight: 800, color: K.txt, textShadow:"0 0 12px rgba(0,229,255,.5)",fontFamily:"Orbitron, sans-serif",letterSpacing:"1px" }}>COJUR</div>
            <div style={{ fontSize: 9, color: "#00d4ff", fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", textShadow:"0 0 8px rgba(0,229,255,.7)",fontFamily:"Orbitron, sans-serif" }}>CFM · NEXUS</div>
          </div>}
        </div>
        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {NAV.map(({ id, icon: I, label: l }) => {
            const isAct = pg === id, isCrit = id === "priorities" && cn > 0;
            return (
              <button key={id} onClick={() => sPg(id)} className={isAct ? "cj-nav-active" : ""} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: col ? "10px 0" : "10px 12px", borderRadius: 10, border: "1px solid transparent", background: isAct ? "linear-gradient(90deg, rgba(0,212,255,.12), rgba(0,212,255,.04))" : "transparent", color: isAct ? "#00d4ff" : K.dim, fontSize: 13, fontWeight: isAct ? 700 : 400, cursor: "pointer", marginBottom: 2, transition: "all .2s", justifyContent: col ? "center" : "flex-start", position: "relative", fontFamily:"inherit" }}
                onMouseEnter={e => { if (!isAct) { e.currentTarget.style.background = "rgba(0,212,255,.05)"; e.currentTarget.style.color = K.txt; e.currentTarget.style.borderColor = "rgba(0,212,255,.12)"; } }}
                onMouseLeave={e => { if (!isAct) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = K.dim; e.currentTarget.style.borderColor = "transparent"; } }}>
                <I size={16} style={{filter:isAct?"drop-shadow(0 0 5px #00e5ff)":"none"}} />{!col && <span style={{fontFamily:isAct?"Orbitron,sans-serif":"inherit",fontSize:isAct?11:13,letterSpacing:isAct?".5px":"normal",textShadow:isAct?"0 0 8px rgba(0,229,255,.7)":"none"}}>{l}</span>}
                {isCrit && <div className="cj-pulse" style={{ position: "absolute", top: col ? 6 : 8, right: col ? 12 : 10, width: 18, height: 18, borderRadius: "50%", background: K.cr, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>{cn}</div>}
              </button>
            );
          })}
        </nav>
        {!col && <div style={{ padding: "14px 16px", borderTop: `1px solid ${K.brd}`, display: "flex", alignItems: "center", gap: 10, background:"linear-gradient(180deg,rgba(255,255,255,.02),rgba(255,255,255,0))" }}>
          <div style={{ width: 34, height: 34, borderRadius: 12, background: "linear-gradient(135deg, rgba(0,212,255,.25), rgba(168,85,247,.25))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#00d4ff", boxShadow:"0 0 12px rgba(0,212,255,.3), inset 0 1px 0 rgba(255,255,255,.1)", border:"1px solid rgba(0,212,255,.2)" }}>JG</div>
          <div><div style={{ fontSize: 12, fontWeight: 700, color: K.txt }}>João Gabriel</div><div style={{ fontSize: 10, color: K.dim2 }}>Workspace jurídico · COJUR · CFM</div></div>
        </div>}
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ minHeight: 68, borderBottom: "1px solid rgba(0,212,255,.12)", display: "flex", alignItems: "center", padding: "10px 22px", gap: 16, flexShrink: 0, background: "linear-gradient(180deg, rgba(2,5,16,.97), rgba(2,5,14,.88))", backdropFilter: "blur(24px)", boxShadow:"0 1px 0 rgba(0,212,255,.15), 0 4px 28px rgba(0,0,0,.5)", position:"relative", zIndex:1, flexWrap:"wrap" }}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginRight:4}}>
            <CFMMark size={34}/>
            <div style={{display:"flex",flexDirection:"column"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:14,fontWeight:800,background:"linear-gradient(90deg, #e2e8f0, #00d4ff, #a855f7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontFamily:"Orbitron, sans-serif",letterSpacing:"1px"}}>COJUR NEXUS v11</span>
                <SyncBadge/>
              </div>
              <span style={{fontSize:9,color:"#00e5ff",fontWeight:700,letterSpacing:"1.8px",textTransform:"uppercase",textShadow:"0 0 8px rgba(0,212,255,.6)"}}>CFM · Centro de Comando Jurídico</span>
            </div>
          </div>
          <div style={{ position: "relative", flex: 1, maxWidth: 520 }}>
            <Search size={16} color={K.dim2} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input style={{ ...inpSt, paddingLeft: 40, paddingRight: 80, height: 44, borderRadius: 14 }} value={sq} onChange={e => { sSq(e.target.value); sSo(true); }} onFocus={() => sSo(true)} placeholder="Buscar processos, prazos, SEI, parte, órgão..." onBlur={() => setTimeout(() => sSo(false), 200)} />
            {/* ═══ CMD+K INDICATOR ═══ */}
            <button onClick={function(){setShowPalette(true);}} title="Command Palette (Cmd+K / Ctrl+K)" style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",padding:"4px 10px",borderRadius:8,border:"1px solid "+K.brd,background:"rgba(0,229,255,.06)",color:K.ac,fontSize:10,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:4,letterSpacing:".5px"}}>⌘K</button>
            {so && sq && (
              <div className="cj-sc" style={{ position: "absolute", top: 44, left: 0, right: 0, background: K.modal, border: `1px solid ${K.brd}`, borderRadius: 12, padding: 8, zIndex: 100, maxHeight: 400, overflowY: "auto", boxShadow: "0 20px 40px rgba(0,0,0,.5)" }}>
                {sr.length > 0 ? (<>
                  <div style={{padding:"4px 12px 8px",fontSize:10,color:K.dim,fontWeight:700,letterSpacing:".5px",textTransform:"uppercase"}}>{sr.length} resultado{sr.length!==1?"s":""} encontrado{sr.length!==1?"s":""}</div>
                  {sr.map(p => {var pcor=getPecaCor(p.tipoPeca);return(
                  <div key={p.id} onClick={() => { sSel(p); sSo(false); sSq(""); }} style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    {p.tipo === "jud" ? <Scale size={14} color={K.pu} /> : <FolderOpen size={14} color={K.ac} />}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                        <div style={{ fontSize: 12, color: K.ac, fontFamily: "'JetBrains Mono',monospace" }}>{p.num||"Sem nº"}{p.numeroSEI?` · SEI ${p.numeroSEI}`:""}</div>
                        <div style={{padding:"1px 6px",borderRadius:4,background:pcor+"20",border:"1px solid "+pcor+"44",color:pcor,fontSize:8,fontWeight:800,fontFamily:"Orbitron,monospace"}}>{getPecaLabel(p.tipoPeca)}</div>
                      </div>
                      <div style={{ fontSize: 12, color: K.txt, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.assunto}</div>
                      <div style={{ fontSize: 10, color: K.dim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.tipo==="jud"?`${p.tribunal||"—"} · ${p.parteContraria||"—"}`:`${p.interessado||"—"} · ${p.orgao||"—"}`}</div>
                    </div>
                    <UB d={p.diasRestantes} />
                  </div>);})}
                </>) : (
                  <div style={{padding:"20px 16px",textAlign:"center"}}>
                    <Search size={24} color={K.dim2} style={{marginBottom:8}}/>
                    <div style={{fontSize:12,color:K.dim,fontWeight:600}}>Nenhum processo encontrado</div>
                    <div style={{fontSize:10,color:K.dim2,marginTop:4}}>Tente termos diferentes ou use a busca fuzzy</div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, flexWrap:"wrap", justifyContent:"flex-end" }}>
            <Bd color={K.ac}><Clock size={10}/>{NOW.toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" })}</Bd>
            <button style={{ ...btnGhost, padding: "7px 11px", fontSize:12, color: K.ac, borderColor: "rgba(6,182,212,.25)" }} onClick={handleExport}><Download size={14}/>JSON</button>
            <button style={{ ...btnGhost, padding: "7px 11px", fontSize:12, color: K.su, borderColor: "rgba(5,150,105,.25)" }} onClick={handleExportCSV}><Download size={14}/>CSV</button>
            <button style={{ ...btnGhost, padding: "7px 11px", fontSize:12, color: K.ac, borderColor: "rgba(6,182,212,.25)" }} onClick={() => importRef.current && importRef.current.click()}><Upload size={14}/>Importar</button>
            {/* divider */}
            <div style={{width:1,height:22,background:"rgba(127,184,216,.15)",margin:"0 2px"}}/>
            {/* IA cluster */}
            <button onClick={function(){setShowDecisao(true);}} title="Resumo de Decisão Judicial (IA)" style={{width:36,height:36,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(168,85,247,.18)",background:"rgba(168,85,247,.05)",cursor:"pointer",fontSize:15}}>⚖️</button>
            <button onClick={function(){setShowRevisao(true);}} title="Revisão de Peça (IA)" style={{width:36,height:36,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(0,255,136,.18)",background:"rgba(0,255,136,.05)",cursor:"pointer",fontSize:15}}>✏️</button>
            <button onClick={function(){setShowEmailAlert(true);}} title="Alerta diário por email" style={{width:36,height:36,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(0,229,255,.2)",background:"rgba(0,229,255,.05)",cursor:"pointer",fontSize:15}}>📧</button>
            <button onClick={function(){setShowGmail(true);}} title="Gmail SEI — Buscar e importar processos" style={{width:36,height:36,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(0,229,255,.18)",background:"rgba(0,229,255,.05)",cursor:"pointer",fontSize:15}}>📬</button>
            <button onClick={function(){setShowIANovo(true);}} title="Novo processo via IA" style={{width:36,height:36,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(0,229,255,.18)",background:"rgba(0,229,255,.05)",cursor:"pointer",fontSize:15}}>🤖</button>
            {/* v41 · Modo Comando NEXUS (Cmd+Shift+K) */}
            <button onClick={function(){setShowCommand(true);}} title="Modo Comando NEXUS (Cmd+Shift+K)" style={{width:36,height:36,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(0,229,255,.45)",background:"rgba(0,229,255,.10)",cursor:"pointer",fontSize:15,boxShadow:"0 0 12px rgba(0,229,255,.25)"}}>◉</button>
            {/* v41 · Force Graph · relacoes entre processos */}
            <button onClick={function(){setShowForceGraph(true);}} title="Grafo de Relações entre Processos (NEXUS)" style={{width:36,height:36,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(184,77,255,.45)",background:"rgba(184,77,255,.10)",cursor:"pointer",fontSize:15,color:"#b84dff",boxShadow:"0 0 12px rgba(184,77,255,.25)"}}>⌘</button>
            {/* divider */}
            <div style={{width:1,height:22,background:"rgba(127,184,216,.15)",margin:"0 2px"}}/>
            {/* view cluster */}
            <button onClick={function(){setFocusMode(function(v){return !v;});}} title="Modo Foco (F) — Oculta sidebar" style={{width:36,height:36,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",border:focusMode?"1px solid rgba(168,85,247,.5)":"1px solid rgba(168,85,247,.2)",background:focusMode?"rgba(168,85,247,.15)":"rgba(168,85,247,.05)",cursor:"pointer",fontSize:15}}>🎯</button>
            <button onClick={function(){setCompactMode(function(c){return !c;});}} title="Modo Compacto" style={{width:36,height:36,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",border:compactMode?"1px solid rgba(0,229,255,.5)":"1px solid rgba(0,229,255,.15)",background:compactMode?"rgba(0,229,255,.1)":"transparent",cursor:"pointer",fontSize:14}}>☰</button>
            <button onClick={function(){setDarkMode(function(d){return !d;});}} title={darkMode?"Modo Claro":"Modo Escuro"} style={{width:36,height:36,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",border:darkMode?"1px solid rgba(255,184,0,.3)":"1px solid rgba(2,132,199,.3)",background:darkMode?"rgba(255,184,0,.08)":"rgba(2,132,199,.08)",cursor:"pointer",boxShadow:darkMode?"0 0 14px rgba(255,184,0,.22)":"0 0 14px rgba(2,132,199,.22)"}}>
              {darkMode?<Sun size={15} color="#ffb800" style={{filter:"drop-shadow(0 0 5px rgba(255,184,0,.8))"}}/>:<Moon size={15} color="#0284c7" style={{filter:"drop-shadow(0 0 5px rgba(2,132,199,.8))"}}/> }
            </button>
            {React.createElement(function(){
              var sOpen=useState(false);var notifOpen=sOpen[0],setNotifOpen=sOpen[1];
              var ref=useRef(null);
              useEffect(function(){var h=function(e){if(ref.current&&!ref.current.contains(e.target))setNotifOpen(false);};document.addEventListener("mousedown",h);return function(){document.removeEventListener("mousedown",h);};},[]);
              var alerts=[];
              all.filter(function(p){return p.diasRestantes>=0&&p.diasRestantes<=5&&!["Concluído","Arquivado","Suspenso"].includes(p.status);}).forEach(function(p){alerts.push({type:"cr",icon:"🔴",title:p.diasRestantes===0?"PRAZO HOJE":"Prazo crítico: "+p.diasRestantes+"du",desc:p.assunto,proc:p});});
              all.filter(function(p){return isProtocolar(p);}).forEach(function(p){alerts.push({type:"su",icon:"📤",title:"Protocolar no tribunal",desc:p.assunto,proc:p});});
              all.filter(function(p){return isCorrecao(p);}).forEach(function(p){alerts.push({type:"wa",icon:"✏️",title:"Retornado para correção",desc:p.assunto,proc:p});});
              (st.lembretes||[]).filter(function(l){return !l.done&&l.data&&l.data<=NOW.toISOString().slice(0,10);}).forEach(function(l){alerts.push({type:"wa",icon:"⏰",title:"Lembrete vencido",desc:l.texto});});
              all.filter(function(p){return !p.proxProv&&p.status==="Ativo";}).forEach(function(p){alerts.push({type:"dim",icon:"⚠️",title:"Sem próxima providência",desc:p.num||p.assunto,proc:p});});
              return React.createElement("div",{ref:ref,style:{position:"relative"}},
                React.createElement("div",{onClick:function(){setNotifOpen(!notifOpen);},style:{cursor:"pointer",width:36,height:36,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(0,229,255,.18)",background:notifOpen?"rgba(0,229,255,.15)":"rgba(0,229,255,.06)",boxShadow:"0 0 12px rgba(0,229,255,.18)",transition:"all .2s"}},
                  React.createElement(Bell,{size:16,color:"#00e5ff",style:{filter:"drop-shadow(0 0 4px rgba(0,212,255,.7))"}}),
                  cn>0&&React.createElement("div",{className:"cj-pulse",style:{position:"absolute",top:-4,right:-2,minWidth:16,height:16,padding:"0 4px",borderRadius:999,background:K.cr,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:"#fff"}},cn)
                ),
                notifOpen&&React.createElement("div",{className:"cj-sc",style:{position:"absolute",top:48,right:0,width:360,maxHeight:440,overflowY:"auto",background:K.modal,border:"1px solid "+K.brd,borderRadius:16,padding:8,zIndex:200,boxShadow:"0 20px 60px rgba(0,0,0,.7)"}},
                  React.createElement("div",{style:{padding:"8px 12px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid "+K.brd,marginBottom:6}},
                    React.createElement("span",{style:{fontSize:13,fontWeight:700,color:K.txt}},"Notificações"),
                    React.createElement("span",{style:{fontSize:11,color:K.dim,fontFamily:"Orbitron,monospace"}},alerts.length)
                  ),
                  alerts.length?alerts.slice(0,12).map(function(a,i){
                    var bc=a.type==="cr"?K.crG:a.type==="su"?K.suG:a.type==="wa"?K.waG:"rgba(255,255,255,.03)";
                    var tc=a.type==="cr"?K.cr:a.type==="su"?K.su:a.type==="wa"?K.wa:K.dim;
                    return React.createElement("div",{key:i,onClick:function(){if(a.proc){sSel(a.proc);setNotifOpen(false);}},style:{padding:"10px 12px",borderRadius:10,background:bc,border:"1px solid "+tc+"22",marginBottom:4,cursor:a.proc?"pointer":"default",transition:"all .15s"},onMouseEnter:function(e){if(a.proc)e.currentTarget.style.borderColor=tc+"55";},onMouseLeave:function(e){e.currentTarget.style.borderColor=tc+"22";}},
                      React.createElement("div",{style:{display:"flex",gap:8,alignItems:"flex-start"}},
                        React.createElement("span",{style:{fontSize:14,flexShrink:0,marginTop:1}},a.icon),
                        React.createElement("div",{style:{flex:1,minWidth:0}},
                          React.createElement("div",{style:{fontSize:11,fontWeight:700,color:tc}},a.title),
                          React.createElement("div",{style:{fontSize:11,color:K.dim,marginTop:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},a.desc)
                        )
                      )
                    );
                  }):React.createElement("div",{style:{padding:"24px 16px",textAlign:"center",color:K.dim2,fontSize:12}},"Nenhuma notificação pendente")
                )
              );
            },null)}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>{rP()}</div>
      </div>

      {/* MODALS */}
      {showGmail&&<GmailSEIModal dp={dp} onClose={function(){setShowGmail(false);}}/>}
      {minutaProc!==null&&<MinutaModal proc={minutaProc} onClose={function(){setMinutaProc(null);}}/> }
      {showStats&&<StatsModal st={st} onClose={function(){setShowStats(false);}}/> }
      {showEmailAlert&&<EmailAlertModal st={st} onClose={function(){setShowEmailAlert(false);}}/> }
      {showSemanal&&<RelatorioSemanalModal st={st} onClose={function(){setShowSemanal(false);}}/> }
      {djeProc&&<DjeAutoModal proc={djeProc} dp={dp} onClose={function(){setDjeProc(null);}}/> }
      {showIANovo&&<IANovoProcessoModal dp={dp} onClose={function(){setShowIANovo(false);}}/> }
      {showQuickAdd&&<QuickAddModal dp={dp} st={st} onClose={function(){setShowQuickAdd(false);}}/>}
      {/* ═══ v10 — NEW MODALS ═══ */}
      {showPalette&&<CommandPalette st={st} dp={dp} sPg={sPg} ss={sSel} onClose={function(){setShowPalette(false);}} setShowGmail={setShowGmail} setShowDecisao={setShowDecisao} setShowQuickAdd={setShowQuickAdd} setShowShortcuts={setShowShortcuts} exportState={exportState} exportCSV={exportCSV} handleExport={handleExport}/>}
      {showShortcuts&&<ShortcutsModal onClose={function(){setShowShortcuts(false);}}/>}
      {comparadorIds.length>=2&&<ComparadorModal ids={comparadorIds} st={st} onClose={function(){setComparadorIds([]);}} onRemove={function(id){setComparadorIds(function(prev){return prev.filter(function(x){return x!==id;});});}}/>}
      {confirmAction&&<ConfirmDialog title={confirmAction.title} msg={confirmAction.msg} danger={confirmAction.danger} onConfirm={function(){confirmAction.fn();setConfirmAction(null);}} onCancel={function(){setConfirmAction(null);}}/>}
      <BulkActionBar selected={bulkSelected} onClear={function(){setBulkSelected([]);}} dp={dp} items={[...st.adm,...st.jud]}/>
      {checklistProc&&<ChecklistModal proc={checklistProc} onClose={function(){setChecklistProc(null);}} onConfirm={function(){dp({type:"COMPLETE_P",id:checklistProc.id});dp({type:"UPD",id:checklistProc.id,isAdm:checklistProc.tipo==="adm",ch:{status:"Concluído"}});setChecklistProc(null);}}/>}
      {showDecisao&&<DecisaoModal onClose={function(){setShowDecisao(false);}}/>}
      {showRevisao&&<RevisaoModal onClose={function(){setShowRevisao(false);}}/>}
      {sel && <DetMod item={sel} onClose={() => sSel(null)} dp={dp} onEdit={handleEdit} setDjeProc={setDjeProc} st={st} ss={sSel} />}
      {editForm && <FM key={editForm.id} title={`Editar: ${editForm.assunto || editForm.num || "Item"}`} fields={editForm.tipo === "adm" ? F_ADM : F_JUD} initial={editForm} onClose={() => sEF(null)} onSave={handleEditSave} onDelete={handleEditDel} suggestions={{
        responsavel:[...new Set([...st.adm,...st.jud].map(function(p){return p.responsavel;}).filter(Boolean))],
        orgao:[...new Set([...st.adm,...st.jud].map(function(p){return p.orgao;}).filter(Boolean))],
        interessado:[...new Set(st.adm.map(function(p){return p.interessado;}).filter(Boolean))],
        parteContraria:[...new Set(st.jud.map(function(p){return p.parteContraria;}).filter(Boolean))],
      }} />}
      {!focusMode&&<div style={{position:"fixed",bottom:14,left:col?80:230,zIndex:100,display:"flex",gap:8,flexWrap:"wrap"}}>
        {[["H","Hoje"],["P","Prioridades"],["I","IA Nexus"],["C","Calendário"],["T","Timeline"],["F","Foco"],["⌘Z","Desfazer"],["⌘N","Novo"],["/","Buscar"],["Esc","Fechar"]].map(function(k){return(
          <div key={k[0]} style={{display:"flex",alignItems:"center",gap:4,fontSize:9,color:K.dim2,background:"rgba(0,0,0,.4)",borderRadius:6,padding:"2px 6px",border:"1px solid rgba(255,255,255,.05)"}}>
            <kbd style={{fontSize:9,color:K.dim,background:"rgba(255,255,255,.06)",borderRadius:3,padding:"0 3px",fontFamily:"'JetBrains Mono',monospace"}}>{k[0]}</kbd>
            <span>{k[1]}</span>
          </div>
        );})}
      </div>}
      {toast && (
        <div style={{position:"fixed",bottom:28,right:28,zIndex:2000,padding:"14px 20px",borderRadius:16,background:toast.type==="ok"?"linear-gradient(135deg,rgba(0,229,160,.14),rgba(0,229,160,.06))":"linear-gradient(135deg,rgba(255,59,107,.14),rgba(255,59,107,.06))",border:"1px solid "+(toast.type==="ok"?"rgba(0,229,160,.5)":"rgba(255,59,107,.5)"),backdropFilter:"blur(20px)",boxShadow:toast.type==="ok"?"0 0 20px rgba(0,229,160,.18),0 16px 40px rgba(0,0,0,.5)":"0 0 20px rgba(255,59,107,.18),0 16px 40px rgba(0,0,0,.5)",display:"flex",alignItems:"center",gap:10,animation:"cjUp .3s ease both"}}>
          <span style={{fontSize:16}}>{toast.type==="ok"?"✅":"❌"}</span>
          <span style={{fontSize:13,fontWeight:700,color:K.txt}}>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}
function IATplModal({proc,onClose}){
  const[loading,sLoad]=useState(false),[result,sResult]=useState(""),[error,sErr]=useState("");
  const generate=function(){
    sLoad(true);sErr("");sResult("");
    var tp=proc.tipoPeca||"Manifestacao";
    var pn=proc.num||"N/I";
    var ta=proc.tipoAcao||"N/I";
    var tri=proc.tribunal||proc.orgao||"N/I";
    var ass=proc.assunto||"N/I";
    var pc=proc.parteContraria||proc.interessado||"N/I";
    var dest=proc.destaque?("- Contexto: "+proc.destaque+"\n"):"";
    var lines=[
      "Voce e advogado do CFM - Conselho Federal de Medicina.",
      "Gere a ESTRUTURA COMPLETA da peca: "+tp,
      "Processo: "+pn+" | Acao: "+ta+" | Tribunal: "+tri,
      "Assunto: "+ass+" | Parte contraria: "+pc,
      dest,
      "Forneca: 1) Estrutura com secoes numeradas 2) Instrucao por secao",
      "3) Argumentos juridicos centrais 4) Pedidos finais.",
      "Use linguagem juridica formal e seja preciso."
    ];
    var prompt=lines.join("\n");
    fetch("/api/llm",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2048,messages:[{role:"user",content:prompt}]})
    })
    .then(function(r){if(!r.ok) throw new Error("HTTP "+r.status);return r.json();})
    .then(function(d){
      if(d.error){sErr("Erro da API: "+(d.error.message||"desconhecido"));sLoad(false);return;}
      var txt=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("\n").trim();
      sResult(txt||"Nenhuma resposta gerada.");
      sLoad(false);
    })
    .catch(function(e){sErr("Erro ao conectar com a IA: "+(e.message||""));sLoad(false);});
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",backdropFilter:"blur(10px)",zIndex:1200,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"40px 20px",overflowY:"auto"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,20,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.2)",borderRadius:24,width:"100%",maxWidth:680,padding:28,position:"relative",boxShadow:"0 0 60px rgba(0,229,255,.08),0 24px 60px rgba(0,0,0,.8)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <div style={{fontSize:24}}>🤖</div>
          <div>
            <h3 style={{margin:0,fontSize:17,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif",textShadow:"0 0 10px rgba(0,229,255,.5)"}}>Gerador IA de Estrutura</h3>
            <div style={{fontSize:11,color:K.dim,marginTop:2}}>Claude Sonnet · {proc.tipoPeca||"Peça"} · {proc.num||"Sem nº"}</div>
          </div>
        </div>
        <div style={{padding:"12px 16px",borderRadius:14,background:"rgba(0,229,255,.06)",border:"1px solid rgba(0,229,255,.15)",marginBottom:16}}>
          <div style={{fontSize:11,color:"#00e5ff",fontWeight:700,marginBottom:4}}>Processo selecionado</div>
          <div style={{fontSize:13,color:K.txt,fontWeight:600}}>{proc.assunto}</div>
          <div style={{fontSize:11,color:K.dim,marginTop:4}}>{proc.tipoPeca} · {proc.tipoAcao||proc.orgao} · {proc.tribunal||"—"}</div>
        </div>
        {!result&&!loading&&<button onClick={generate} style={{...btnPrim,width:"100%",justifyContent:"center",padding:"12px",fontSize:14,marginBottom:16}}>
          <Zap size={16}/>Gerar estrutura da {proc.tipoPeca||"peça"}
        </button>}
        {loading&&<div style={{padding:"16px 0"}}><SkeletonBlock lines={5} h={24}/><div style={{textAlign:"center",fontSize:11,color:K.ac,fontFamily:"Orbitron,sans-serif",marginTop:8,letterSpacing:"1px"}}>Gerando estrutura...</div></div>}
        {error&&<div style={{padding:"12px 16px",borderRadius:12,background:"rgba(255,46,91,.12)",border:"1px solid rgba(255,46,91,.3)",color:"#ff2e5b",fontSize:12,marginBottom:12}}>{error}</div>}
        {result&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:11,color:"#00e5ff",fontWeight:700,fontFamily:"Orbitron,sans-serif"}}>Estrutura gerada</div>
            <button onClick={generate} style={{...btnGhost,padding:"4px 10px",fontSize:11,color:"#00e5ff"}}>Gerar novamente</button>
          </div>
          <div style={{padding:"16px",borderRadius:14,background:"rgba(255,255,255,.025)",border:"1px solid rgba(0,229,255,.12)",fontSize:12,color:K.txt,lineHeight:1.8,whiteSpace:"pre-wrap",maxHeight:360,overflowY:"auto",fontFamily:"inherit"}}>{result}</div>
          <button onClick={function(){try{navigator.clipboard.writeText(result);}catch(e){}}} style={{...btnGhost,marginTop:12,width:"100%",justifyContent:"center",fontSize:12,color:"#00e5ff"}}>📋 Copiar estrutura</button>
        </div>}
      </div>
    </div>
  );
};


/* ═══ PÁGINA PROTOCOLAR ═══ */

/* ═══ PÁGINA EM EXECUÇÃO ═══ */
const ExecucaoPg=({st,dp,ss})=>{
  const items=[...st.adm,...st.jud].map(function(p){return Object.assign({},p,{iaS:iaScore(p)});}).filter(function(p){return isExecucao(p);}).sort(function(a,b){return b.iaS-a.iaS;});
  return(
    <div className="cj-pg">
      <div className="cj-up" style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
        <div style={{width:48,height:48,borderRadius:16,background:"linear-gradient(135deg,rgba(0,229,255,.2),rgba(0,229,255,.06))",border:"1px solid rgba(0,229,255,.4)",display:"flex",alignItems:"center",justifyContent:"center"}}><Zap size={22} color="#00e5ff"/></div>
        <div>
          <h2 style={{margin:0,fontSize:22,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif"}}>Em Execução</h2>
          <div style={{fontSize:12,color:K.dim,marginTop:2}}>Processos que estou elaborando agora · {items.length} ativo{items.length!==1?"s":""}</div>
        </div>
        {items.length>0&&<div className="cj-pulse" style={{marginLeft:"auto",padding:"5px 14px",borderRadius:10,background:"rgba(0,229,255,.1)",border:"1px solid rgba(0,229,255,.4)",color:"#00e5ff",fontSize:13,fontWeight:800,fontFamily:"Orbitron,monospace"}}>{items.length}</div>}
      </div>
      {!items.length&&<EmptyState icon="rocket" color={K.ac} title="Nenhum processo em execução" sub="Altere o status de um processo para 'Em Execução'"/>}
      {/* ═══ POMODORO TIMER ═══ */}
      {items.length>0&&React.createElement(PomodoroTimer,{proc:items[0],dp:dp})}
      <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:14}}>
        {items.map(function(p){var cor=getPecaCor(p.tipoPeca);return(
          <div key={p.id} onClick={function(){ss(p);}} style={{padding:20,borderRadius:18,background:"linear-gradient(135deg,rgba(2,5,22,.97),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.22)",cursor:"pointer",transition:"all .2s",position:"relative",overflow:"hidden"}}
            onMouseEnter={function(e){e.currentTarget.style.borderColor="rgba(0,229,255,.5)";}} onMouseLeave={function(e){e.currentTarget.style.borderColor="rgba(0,229,255,.22)";}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:cor,boxShadow:"0 0 8px "+cor}}/>
            <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
                  <div style={{padding:"3px 8px",borderRadius:6,background:cor+"20",border:"1px solid "+cor+"55",color:cor,fontSize:9,fontWeight:900,fontFamily:"Orbitron,monospace",letterSpacing:".8px"}}>{getPecaLabel(p.tipoPeca)}</div>
                  <div style={{fontSize:10,color:"#7dd3fc",fontFamily:"'JetBrains Mono',monospace"}}>{p.num}</div>
                  {p.numeroSEI&&<div style={{fontSize:10,color:"#7dd3fc",fontFamily:"'JetBrains Mono',monospace",background:"rgba(125,211,252,.1)",borderRadius:5,padding:"1px 6px"}}>SEI {p.numeroSEI}</div>}
                  <div style={{marginLeft:"auto",fontSize:12,fontWeight:800,color:uC(p.diasRestantes),fontFamily:"Orbitron,monospace"}}>{p.diasRestantes}du</div>
                </div>
                <div style={{fontSize:15,fontWeight:700,color:K.txt,marginBottom:6}}>{p.assunto}</div>
                {p.proxProv&&<div style={{fontSize:12,color:K.ac,background:"rgba(0,229,255,.05)",borderRadius:8,padding:"6px 10px",border:"1px solid rgba(0,229,255,.1)"}}><span style={{fontSize:10,color:K.dim,marginRight:6}}>Próxima:</span>{p.proxProv}</div>}
                {(function(){var pct=Math.min(100,Math.max(0,Number(p.progresso)||0));var cor=pct>=100?"#00ff88":pct>=60?"#00e5ff":pct>=30?"#ffb800":"#ff2e5b";return(<div style={{marginTop:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <div style={{fontSize:9,color:K.dim,fontWeight:700,textTransform:"uppercase",letterSpacing:".5px"}}>Progresso da elaboração</div>
                    <div style={{fontSize:12,fontWeight:800,color:cor,fontFamily:"Orbitron,monospace"}}>{pct}%{pct>=100?" ✅":""}</div>
                  </div>
                  <div style={{height:6,borderRadius:999,background:"rgba(255,255,255,.06)",overflow:"hidden"}}>
                    <div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,"+cor+"88,"+cor+")",borderRadius:999,boxShadow:"0 0 8px "+cor,transition:"width .5s"}}/>
                  </div>
                  <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                    {[0,25,50,75,100].map(function(v){return(
                      <button key={v} onClick={function(e){e.stopPropagation();dp({type:"UPD",id:p.id,isAdm:p.tipo==="adm",ch:{progresso:v}});}} style={{padding:"3px 8px",borderRadius:6,border:"1px solid "+(pct===v?cor+"66":"rgba(255,255,255,.1)"),background:pct===v?cor+"20":"transparent",color:pct===v?cor:K.dim,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{v}%</button>
                    );})}
                  </div>
                </div>);})()}
              </div>
              <DoneBtn small onClick={function(){dp({type:"COMPLETE_P",id:p.id});dp({type:"UPD",id:p.id,isAdm:p.tipo==="adm",ch:{status:"Pronto p/ Protocolo"}});}}/>
            </div>
          </div>
        );})}
      </div>
    </div>
  );
};

/* ═══ PÁGINA EM ACOMPANHAMENTO ═══ */
const AcompanhamentoPg=({st,dp,ss})=>{
  const items=[...st.adm,...st.jud].map(function(p){return Object.assign({},p,{iaS:iaScore(p)});}).filter(function(p){return isAcompanhamento(p);}).sort(function(a,b){return b.iaS-a.iaS;});
  return(
    <div className="cj-pg">
      <div className="cj-up" style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
        <div style={{width:48,height:48,borderRadius:16,background:"linear-gradient(135deg,rgba(168,85,247,.2),rgba(168,85,247,.06))",border:"1px solid rgba(168,85,247,.4)",display:"flex",alignItems:"center",justifyContent:"center"}}><Eye size={22} color="#b84dff"/></div>
        <div>
          <h2 style={{margin:0,fontSize:22,fontWeight:800,color:"#b84dff",fontFamily:"Orbitron,sans-serif"}}>Em Acompanhamento</h2>
          <div style={{fontSize:12,color:K.dim,marginTop:2}}>Processos monitorados · {items.length} processo{items.length!==1?"s":""}</div>
        </div>
        {items.length>0&&<div style={{marginLeft:"auto",padding:"5px 14px",borderRadius:10,background:"rgba(168,85,247,.1)",border:"1px solid rgba(168,85,247,.4)",color:"#b84dff",fontSize:13,fontWeight:800,fontFamily:"Orbitron,monospace"}}>{items.length}</div>}
      </div>
      {!items.length&&<EmptyState icon="clock" color={K.pu} title="Nenhum processo em acompanhamento" sub="Altere o status e informe o motivo do acompanhamento"/>}
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {items.map(function(p){var cor=getPecaCor(p.tipoPeca);return(
          <div key={p.id} onClick={function(){ss(p);}} style={{padding:20,borderRadius:18,background:"linear-gradient(135deg,rgba(2,5,22,.97),rgba(1,3,12,.99))",border:"1px solid rgba(168,85,247,.2)",cursor:"pointer",transition:"all .2s",position:"relative",overflow:"hidden"}}
            onMouseEnter={function(e){e.currentTarget.style.borderColor="rgba(168,85,247,.5)";}} onMouseLeave={function(e){e.currentTarget.style.borderColor="rgba(168,85,247,.2)";}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"#b84dff",boxShadow:"0 0 8px #b84dff"}}/>
            <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
                  <div style={{padding:"3px 8px",borderRadius:6,background:cor+"20",border:"1px solid "+cor+"55",color:cor,fontSize:9,fontWeight:900,fontFamily:"Orbitron,monospace",letterSpacing:".8px"}}>{getPecaLabel(p.tipoPeca)}</div>
                  <div style={{fontSize:10,color:"#7dd3fc",fontFamily:"'JetBrains Mono',monospace"}}>{p.num}</div>
                  {p.numeroSEI&&<div style={{fontSize:10,color:"#7dd3fc",fontFamily:"'JetBrains Mono',monospace",background:"rgba(125,211,252,.1)",borderRadius:5,padding:"1px 6px"}}>SEI {p.numeroSEI}</div>}
                  <div style={{marginLeft:"auto",fontSize:12,fontWeight:800,color:uC(p.diasRestantes),fontFamily:"Orbitron,monospace"}}>{p.diasRestantes}du</div>
                </div>
                <div style={{fontSize:15,fontWeight:700,color:K.txt,marginBottom:8}}>{p.assunto}</div>
                {p.motivoAcompanhamento&&<div style={{fontSize:12,color:"#c4b5fd",background:"rgba(168,85,247,.08)",borderRadius:10,padding:"8px 12px",border:"1px solid rgba(168,85,247,.18)",marginBottom:6}}>
                  <div style={{fontSize:9,color:"#b84dff",fontWeight:700,textTransform:"uppercase",letterSpacing:".5px",marginBottom:3}}>Motivo do acompanhamento</div>
                  {p.motivoAcompanhamento}
                </div>}
                {p.proxProv&&<div style={{fontSize:12,color:K.dim}}><span style={{color:"#b84dff",marginRight:4}}>Próxima:</span>{p.proxProv}</div>}
              </div>
            </div>
          </div>
        );})}
      </div>
    </div>
  );
};

