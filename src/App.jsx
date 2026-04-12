import React from 'react';
import { useState, useMemo, useEffect, useReducer, useRef } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Search, Bell, Calendar, Upload, Sun, Moon, Clock, AlertTriangle, CheckCircle, Users, TrendingUp, ChevronRight, ChevronLeft, Plus, Filter, Inbox, Settings, BarChart3, Zap, Shield, Target, Activity, Layers, MapPin, Plane, Gavel, X, ChevronDown, CalendarDays, Scale, FolderOpen, LayoutDashboard, Timer, Tag, Flame, Edit3, Trash2, Columns3, LayoutGrid, Table2, GripVertical, Save, PenLine, Download, StickyNote, DollarSign, Eye, Link, Pencil, BarChart2 } from "lucide-react";

/* ═══ CUSTAS ═══ */
const CUSTAS_TIPOS=["Apelação","Agravo de Instrumento","Recurso Especial","Agravo em Recurso Especial","Recurso Extraordinário","Agravo em Recurso Extraordinário"];
const hasCustas=p=>CUSTAS_TIPOS.some(t=>(p?.tipoAcao||"").toLowerCase()===t.toLowerCase());

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
@keyframes cjSc{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes cjPulse{0%,100%{opacity:1}50%{opacity:.35}}
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
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes slideIn{from{transform:translateX(40px);opacity:0}to{transform:none;opacity:1}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes ringPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,46,91,.4)}50%{box-shadow:0 0 0 6px rgba(255,46,91,0)}}
@keyframes countDown{0%{opacity:1}50%{opacity:.6}100%{opacity:1}}
.cj-page-enter{animation:fadeInUp .2s ease}
.cj-card-hover:hover{transform:translateY(-2px)!important;transition:all .18s ease!important}
.cj-ring-pulse{animation:ringPulse 1.5s ease-in-out infinite}
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
.cj-soft{box-shadow:0 20px 50px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.04)}
.cj-dot{width:8px;height:8px;border-radius:50%;display:inline-block}
.cj-kd{outline:2px dashed rgba(0,229,255,.45);background:rgba(0,229,255,.06)!important}

/* ═══ MISC ═══ */
.cj-glass{background:rgba(0,229,255,.04);backdrop-filter:blur(14px);border:1px solid rgba(0,229,255,.12);border-radius:16px;padding:14px 16px}`;
  document.head.appendChild(s);
};

/* ═══ THEME ═══ */
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
const inpSt={width:"100%",padding:"10px 12px",borderRadius:12,border:"1px solid rgba(0,229,255,.12)",background:"rgba(0,229,255,.04)",color:"#e2e8f0",fontSize:13,outline:"none",fontFamily:"inherit",transition:"border-color .2s"};
const lblSt={display:"block",fontSize:11,fontWeight:600,color:K.dim,textTransform:"uppercase",letterSpacing:".5px",marginBottom:4};
const btnPrim={padding:"9px 18px",borderRadius:12,border:"1px solid rgba(0,229,255,.3)",background:"linear-gradient(135deg,rgba(0,229,255,.18),rgba(184,77,255,.18))",boxShadow:"0 0 22px rgba(0,229,255,.28),0 12px 32px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.1)",color:"#00e5ff",fontSize:13,fontWeight:700,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6,fontFamily:"inherit",textShadow:"0 0 8px rgba(0,229,255,.7)"};
const btnGhost={padding:"8px 14px",borderRadius:12,border:"1px solid rgba(0,229,255,.1)",background:"rgba(0,229,255,.04)",color:"#4e6a8a",fontSize:13,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6,transition:"all .18s",fontFamily:"inherit"};
const btnDanger={...btnGhost,borderColor:K.cr,color:K.cr};

/* ═══ DATE ═══ */
const curDate=(base)=>{const d=base?new Date(base):new Date();return new Date(d.getFullYear(),d.getMonth(),d.getDate(),12,0,0,0)};
const NOW=curDate();
const addD=(d,n)=>{const r=new Date(d);r.setDate(r.getDate()+n);return r};
const diffD=(a,b)=>Math.ceil((a-b)/86400000);
const isBiz=d=>{const w=curDate(d).getDay();return w!==0&&w!==6};
const bizDiff=(a,b)=>diffD(curDate(a),curDate(b));
const fmt=d=>(d instanceof Date?d.toLocaleDateString("pt-BR"):"");
const fmtS=d=>(d instanceof Date?d.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"}):"");
const toD=v=>(v instanceof Date?v:v?new Date(v):new Date());
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
  // ── Atos iniciais / defesa ──
  "Contestação","Reconvenção","Exceção de Incompetência","Impugnação ao Valor da Causa",
  // ── Recursos ordinários 1G→2G ──
  "Apelação","Apelação Adesiva","Agravo de Instrumento","Agravo Retido",
  // ── Recursos internos tribunais ──
  "Agravo Interno","Embargos de Declaração","Embargos Infringentes","Embargos de Divergência",
  // ── Recursos excepcionais ──
  "Recurso Especial","Agravo em Recurso Especial","Recurso Extraordinário","Agravo em Recurso Extraordinário","Recurso Ordinário Constitucional",
  // ── Incidentes e ações autônomas ──
  "Informações em MS","Contrarrazões","Contraminuta","Impugnação ao Cumprimento de Sentença",
  "Exceção de Pré-Executividade","Embargos à Execução","Embargos de Terceiro",
  // ── Tutelas e cautelares ──
  "Manifestação sobre Tutela","Pedido de Efeito Suspensivo","Petição Cautelar",
  // ── Manifestações gerais ──
  "Manifestação","Petição Simples","Memorial","Memoriais",
  "Alegações Finais","Razões de Recurso","Contrarrazões de Recurso",
  // ── Orais ──
  "Sustentação Oral",
  // ── Cumprimento de sentença ──
  "Cumprimento de Sentença","Impugnação ao Cumprimento","Cálculos de Liquidação",
  // ── Admin CFM ──
  "Parecer Jurídico","Ofício","Nota Técnica","Despacho de Andamento",
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
    "Outro":["Definir objetivo da peça","Listar pontos obrigatórios","Separar fundamentos normativos","Checar documentos de apoio","Revisar clareza e pedido final"]
  };
  return (base[tipo]||base["Outro"]).map(text=>({text,done:false}));
};

/* ═══ SCORE ═══ */
const calcScore=p=>{let s=0,dr=p.diasRestantes||0;if(isProtocolar(p)||isCorrecao(p))return 100;if(dr<=3)s+=40;else if(dr<=5)s+=34;else if(dr<=10)s+=26;else if(dr<=20)s+=16;else if(dr<30)s+=8;s+=(p.impacto||3)*5+(p.complexidade||3)*3;if(p.reuniao)s+=10;if(p.sustentacao)s+=15;if((p.semMov||0)>10)s+=10;if(p.depTerc)s+=8;if(!p.proxProv)s+=8;if(!p.responsavel)s+=6;return Math.min(100,s)};
const recalc=p=>{const pf=toD(p.prazoFinal);const dr=bizDiff(pf,NOW);const tipoPeca=inferTipoPeca(p);return{...p,prazoFinal:pf,diasRestantes:dr,tipoPeca,checklist:(p.checklist&&p.checklist.length?p.checklist:buildChecklist(tipoPeca,p)),score:calcScore({...p,diasRestantes:dr,tipoPeca})}};

/* ═══ DATA ═══ */
let _nid=100;const nid=()=>"N"+(++_nid);
const mkA=ov=>recalc({id:nid(),num:"",numeroSEI:"",assunto:"",interessado:"",orgao:"CFM",responsavel:"João Gabriel",linkRef:"",linkSEI:"",prazoFinal:addD(NOW,30),status:"Ativo",fase:"Triagem",impacto:3,complexidade:3,tipoPeca:"Parecer Jurídico",obs:"",ultMov:NOW,proxProv:"",dataProv:null,estTempo:"",depTerc:false,reuniao:false,sustentacao:false,tags:[],semMov:0,hist:[],checklist:[],tipo:"adm",progresso:0,...ov});
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

/* ═══ PERSISTENCE ═══ */
const STORE_KEY = "cojur-nexus-state";
const STATE_URL = "https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/state-proxy";

/* === STORAGE: Edge Function + localStorage fallback === */
var dbGet = async function(){
  var local = null;
  try { local = localStorage.getItem(STORE_KEY); } catch(e) {}
  try {
    var r = await Promise.race([
      fetch(STATE_URL, {method:"GET", headers:{"Content-Type":"application/json"}}),
      new Promise(function(res){ setTimeout(function(){ res(null); }, 4000); })
    ]);
    if (r && r.ok) {
      var d = await r.json();
      if (d && d.data) {
        try { localStorage.setItem(STORE_KEY, d.data); } catch(e) {}
        return d.data;
      }
    }
  } catch(e) {}
  return local;
};

var dbSet = async function(value){
  try { localStorage.setItem(STORE_KEY, value); } catch(e) {}
  try {
    fetch(STATE_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({data: value})
    }).catch(function(){});
  } catch(e) {}
};

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
  const parsed = reviveDates(JSON.parse(raw));
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
const storage = (typeof window !== "undefined" && window.storage) ? window.storage : {
  async get(key){ try { const value = localStorage.getItem(key); return value ? { value } : null; } catch(e){ return null; } },
  async set(key, value){ try { localStorage.setItem(key, value); return true; } catch(e){ return false; } },
  async delete(key){ try { localStorage.removeItem(key); return true; } catch(e){ return false; } }
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
const mkInit=()=>({adm:D_ADM,jud:D_JUD,reun:D_REUN,sust:D_SUST,viag:D_VIAG,inbox:D_INBOX,realizados:[],notas:[],lembretes:[],etiquetas:[]});
function reducer(st,a){
  switch(a.type){
    case "LOAD": return {...mkInit(), ...a.state, realizados: a.state?.realizados || [], notas: a.state?.notas || [], lembretes: a.state?.lembretes || [], etiquetas: a.state?.etiquetas || []};
    case "UPD":{
      const k=a.isAdm?"adm":"jud";
      const list=st[k];
      const updated=list.map(p=>{
        if(p.id!==a.id) return p;
        const merged={...p,...a.ch};
        if(a.ch?.tipoPeca && a.ch.tipoPeca!==p.tipoPeca) merged.checklist=buildChecklist(a.ch.tipoPeca, merged);
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
      var listM=(a.isAdm?[...st.adm]:[...st.jud]);
      var idxM=listM.findIndex(function(p){return p.id===a.id;});
      if(idxM<0)return st;
      var p2=Object.assign({},listM[idxM]);
      p2.hist=[...(p2.hist||[]),{data:toISO(new Date()),txt:a.txt}];
      listM[idxM]=p2;
      return a.isAdm?{...st,adm:listM}:{...st,jud:listM};
    }
    case "ADD_LEMBRETE": { var nls=[...(st.lembretes||[])]; nls.push({id:nid(),texto:a.texto,data:a.data||"",done:false}); return {...st,lembretes:nls}; }
    case "UPD_LEMBRETE": { return {...st,lembretes:(st.lembretes||[]).map(function(l){return l.id===a.id?{...l,...a.ch}:l;})}; }
    case "DEL_LEMBRETE": { return {...st,lembretes:(st.lembretes||[]).filter(function(l){return l.id!==a.id;})}; }
    case "RST":return mkInit();
    default:return st;
  }
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
const UB=({d})=><Bd color={uC(d)} glow={uG(d)} style={{padding:"6px 10px"}}>{d<=10&&<Flame size={11}/>}{uL(d)} · {d}du</Bd>;
const SB=({s})=>{const c=s>=70?K.cr:s>=45?K.wa:K.ac;return <Bd color={c} glow={s>=70?K.crG:s>=45?K.waG:K.acG} style={{padding:"6px 10px"}}><Zap size={11}/>{s}</Bd>};
const SC=({icon:I,label:l,value:v,color:c,sub,onClick})=>{
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
    <div style={{fontSize:33,fontWeight:800,color:col,fontFamily:"'Orbitron','JetBrains Mono',monospace",lineHeight:1,textShadow:"0 0 18px "+col+"70, 0 0 40px "+col+"30",animation:"textGlow 2.5s ease-in-out infinite"}}>{v}</div>
    {sub&&<span style={{fontSize:10,color:K.dim2,fontFamily:"'JetBrains Mono',monospace"}}>{sub}</span>}
  </div>
);};
const SH=({icon:I,title:t,right})=>(
  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,gap:10}}>
    <div style={{display:"flex",alignItems:"center",gap:10,minWidth:0}}>
      {I&&<div style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,229,255,.08)",border:"1px solid rgba(0,229,255,.25)",boxShadow:"0 0 14px rgba(0,229,255,.22)",animation:"neonPulse 4s ease-in-out infinite"}}><I size={16} color="#00e5ff" style={{filter:"drop-shadow(0 0 6px rgba(0,229,255,.9))"}}/></div>}
      <h3 style={{margin:0,fontSize:14,fontWeight:700,color:K.txt,letterSpacing:".2px"}}>{t}</h3>
    </div>
    {right}
  </div>
);
const Bx=({children,style:sx,className:cn,onClick,role,title})=><div className={"cj-shimmer cj-hud-tl cj-hud-br "+(cn||"")} title={title} role={onClick?role||"button":undefined} tabIndex={onClick?0:undefined} onClick={onClick} onKeyDown={e=>{if(onClick&&(e.key==="Enter"||e.key===" ")){e.preventDefault();onClick();}}} style={{background:"linear-gradient(135deg, rgba(2,5,20,.97), rgba(1,3,12,.99))",backdropFilter:"blur(24px)",border:"1px solid rgba(0,229,255,.1)",boxShadow:"0 20px 50px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.02), inset 0 1px 0 rgba(0,229,255,.06)",borderRadius:20,padding:20,position:"relative",overflow:"hidden",transition:"all .28s",cursor:onClick?"pointer":"default",animation:onClick?"neonPulse 5s ease-in-out infinite":"none",...sx}} onMouseEnter={e=>{if(onClick){e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.borderColor="rgba(0,229,255,.3)";e.currentTarget.style.boxShadow="0 0 36px rgba(0,229,255,.1), 0 24px 56px rgba(0,0,0,.55), inset 0 1px 0 rgba(0,229,255,.12)";}}} onMouseLeave={e=>{if(onClick){e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="rgba(0,229,255,.1)";e.currentTarget.style.boxShadow="0 20px 50px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.02), inset 0 1px 0 rgba(0,229,255,.06)";}}}>{children}</div>;
const AC=({icon:I,color:c,title:t,desc})=><div className="cj-soft" style={{background:`linear-gradient(180deg,${c}10,rgba(255,255,255,.02))`,border:`1px solid ${c}22`,borderRadius:14,padding:"12px 14px",display:"flex",gap:10}}><I size={16} color={c} style={{marginTop:2,flexShrink:0}}/><div><div style={{fontSize:12,fontWeight:700,color:c}}>{t}</div><div style={{fontSize:11,color:K.dim,marginTop:2,lineHeight:1.5}}>{desc}</div></div></div>;
const PB=({value:v,max:m,color:c})=><div style={{height:8,borderRadius:999,background:"rgba(255,255,255,.05)",overflow:"hidden",boxShadow:"inset 0 1px 0 rgba(255,255,255,.03)"}}><div style={{height:"100%",borderRadius:999,background:`linear-gradient(90deg,${c},${c}aa)`,boxShadow:`0 0 22px ${c}55`,width:`${Math.min(100,(v/m)*100)}%`,transition:"width .6s ease"}}/></div>;
const DoneBtn=({onClick,small})=><button onClick={e=>{e.stopPropagation();onClick?.()}} style={{display:"inline-flex",alignItems:"center",gap:6,padding:small?"6px 9px":"8px 12px",borderRadius:12,border:`1px solid ${K.su}33`,background:`linear-gradient(180deg,${K.suG},rgba(16,185,129,.08))`,boxShadow:"inset 0 1px 0 rgba(255,255,255,.04)",color:K.su,fontSize:small?11:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}><CheckCircle size={small?12:14}/>Feito</button>;

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
    fetch("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/ai-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({max_tokens:1200,messages:[{role:"user",content:[{type:"document",source:{type:"base64",media_type:mime,data:b64}},{type:"text",text:"Voce e advogado senior da COJUR/CFM. Analise este documento e forneca:\n\n1. RESUMO: O que e este documento (2 frases)\n2. PROXIMA PROVIDENCIA: Acao concreta e imediata\n3. PRAZO: Se ha prazo no documento, qual e\n4. ARGUMENTOS: Se for peca da parte contraria, quais os pontos a rebater\n5. RISCO: Critico/Medio/Baixo e justificativa\n\nContexto: "+ctx+"\n\nSeja direto e tecnico. Sem travesSao."}]}]})})
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
        {loading&&<div style={{textAlign:"center",padding:"36px 0",color:"#b84dff"}}><div className="cj-pulse" style={{fontSize:36,marginBottom:12}}>🧠</div><div style={{fontSize:13,fontFamily:"Orbitron,sans-serif"}}>Analisando...</div><div style={{fontSize:11,color:K.dim,marginTop:6}}>{fname}</div></div>}
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
    fetch("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/ai-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({max_tokens:600,messages:[{role:"user",content:prompt}]})})
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
    fetch("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/ai-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
      max_tokens:3000,
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
          {loading&&<div style={{textAlign:"center",padding:"20px 0",color:"#00e5ff"}}><div className="cj-pulse" style={{fontSize:30,marginBottom:8}}>🧠</div><div style={{fontSize:12,fontFamily:"Orbitron,sans-serif"}}>Extraindo informações...</div></div>}
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
          {loading&&<div style={{textAlign:"center",padding:"32px 0",color:"#00e5ff"}}><div className="cj-pulse" style={{fontSize:36,marginBottom:10}}>📧</div><div style={{fontSize:13,fontFamily:"Orbitron,sans-serif"}}>Acessando Gmail...</div></div>}
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
    fetch("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/ai-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({max_tokens:1000,messages:[{role:"user",content:"Voce e advogado senior da COJUR/CFM. Gere Relatorio de Producao Mensal formal para o Coordenador da COJUR. Sem travesSao.\n\nDados:\n"+dados+"\n\nProcessos concluidos:\n"+lista+"\n\nEstrutura: (1) Cabecalho com periodo; (2) Quadro-resumo; (3) Principais atividades; (4) Observacoes; (5) Situacao do acervo. Seja objetivo e institucional."}]})})
    .then(function(r){return r.json();}).then(function(d){var t=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("\n").trim();sResult(t||"Sem relatorio.");sLoad(false);}).catch(function(){sResult("Erro ao gerar.");sLoad(false);});
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
        {loading&&<div style={{textAlign:"center",padding:"32px 0",color:"#00e5ff"}}><div className="cj-pulse" style={{fontSize:36,marginBottom:10}}>📊</div><div style={{fontSize:13,fontFamily:"Orbitron,sans-serif"}}>Gerando relatório...</div></div>}
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
    fetch("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/ai-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({max_tokens:1200,messages:[{role:"user",content:prompt}]})})
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
        {loading&&<div style={{textAlign:"center",padding:"20px 0",color:"#b84dff"}}><div className="cj-pulse" style={{fontSize:30,marginBottom:8}}>⚖️</div><div style={{fontSize:12,fontFamily:"Orbitron,sans-serif"}}>Analisando decisão...</div></div>}
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
    fetch("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/ai-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({max_tokens:1400,messages:[{role:"user",content:prompt}]})})
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
        {loading&&<div style={{textAlign:"center",padding:"20px 0",color:"#00ff88"}}><div className="cj-pulse" style={{fontSize:30,marginBottom:8}}>✏️</div><div style={{fontSize:12,fontFamily:"Orbitron,sans-serif"}}>Revisando peça...</div></div>}
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
  return(
    <div className="cj-pg">
      <div className="cj-up" style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <span style={{fontSize:24}}>📅</span>
        <div>
          <h2 style={{margin:0,fontSize:20,fontWeight:800,color:K.txt,fontFamily:"Orbitron,sans-serif"}}>Timeline de Prazos</h2>
          <div style={{fontSize:11,color:K.dim,marginTop:2}}>Próximos 30 dias úteis · {all.length} processo{all.length!==1?"s":""} com prazo</div>
        </div>
      </div>
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
                  <div key={p.id} onClick={function(){ss(p);}} className={"cj-card-hover"+(p.diasRestantes===0?" cj-ring-pulse":"")} style={{padding:"12px 14px",borderRadius:14,background:"linear-gradient(135deg,rgba(2,5,22,.97),rgba(1,3,12,.99))",border:"1px solid "+(p.diasRestantes===0?"#ff2e5b":cor+"33"),cursor:"pointer",transition:"all .18s",position:"relative",overflow:"hidden"}} onMouseEnter={function(e){e.currentTarget.style.borderColor=cor+"77";e.currentTarget.style.background="linear-gradient(135deg,rgba(3,7,28,.98),rgba(2,5,18,.99))";}} onMouseLeave={function(e){e.currentTarget.style.borderColor=cor+"33";}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:cor,boxShadow:"0 0 6px "+cor}}/>
                    <div style={{position:"absolute",bottom:0,left:0,right:0,height:3,borderRadius:"0 0 14px 14px",background:p.status==="Concluído"?"#00ff88":p.status==="Em Elaboração"?"#ffb800":p.status==="Arquivado"?"#4e6a8a":p.diasRestantes<=2?"#ff2e5b":p.diasRestantes<=5?"#fb923c":"rgba(0,229,255,.25)"}}/>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <div style={{fontSize:10,color:K.dim,fontFamily:"'JetBrains Mono',monospace"}}>{p.num||"Adm"}</div>
                      <div style={{fontSize:12,fontWeight:800,color:cor,fontFamily:"Orbitron,monospace",animation:p.diasRestantes===0?"countDown 2s ease-in-out infinite":"none"}}>
                        {p.diasRestantes===0?(function(){var h=17-liveTime.getHours();var m=60-liveTime.getMinutes();if(h<0||h>8)return"HOJE";return h+"h"+String(m).padStart(2,"0")+"min";})():p.diasRestantes+"du"}
                      </div>
                    </div>
                    <div style={{fontSize:13,fontWeight:700,color:K.txt,marginBottom:4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.assunto}</div>
                    <div style={{fontSize:10,color:K.dim}}>{p.tipoPeca} · {p.tipo==="jud"?p.tribunal:"Adm"}</div>
                      {(p.progresso!=null&&p.progresso>0)&&(
                        <div style={{marginTop:6}}>
                          <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,.06)",overflow:"hidden"}}>
                            <div style={{height:"100%",width:Math.min(100,Number(p.progresso)||0)+"%",background:Number(p.progresso)>=100?"#00ff88":cor,borderRadius:2,transition:"width .4s ease"}}/>
                          </div>
                        </div>
                      )}
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
var CHECKLIST_ITEMS = [
  {id:"num",label:"Número do processo correto e completo"},
  {id:"cab",label:"Cabeçalho com destinatário correto"},
  {id:"qual",label:"Qualificação do CFM como réu/interessado"},
  {id:"req",label:"Pedido (requerimento) claro e fundamentado"},
  {id:"ref",label:"Referências legais corretas (Lei, art., §)"},
  {id:"ass",label:"Assinatura digital do advogado responsável"},
  {id:"cus",label:"Custas processuais verificadas"},
  {id:"ane",label:"Documentos anexos conferidos"},
  {id:"pra",label:"Prazo processual ainda vigente"},
  {id:"trav",label:"Sem uso de travessão no texto"},
];
function ChecklistModal({proc,onConfirm,onClose}) {
  var sCheck=useState({});var checks=sCheck[0],setCheck=sCheck[1];
  var all_ok=CHECKLIST_ITEMS.every(function(it){return checks[it.id];});
  var ok_count=CHECKLIST_ITEMS.filter(function(it){return checks[it.id];}).length;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:1600,display:"flex",justifyContent:"center",alignItems:"center",padding:"28px 16px"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,255,136,.25)",borderRadius:22,width:"100%",maxWidth:520,padding:24,position:"relative",boxShadow:"0 28px 70px rgba(0,0,0,.8)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
          <span style={{fontSize:22}}>📋</span>
          <div><h3 style={{margin:0,fontSize:15,fontWeight:800,color:"#00ff88",fontFamily:"Orbitron,sans-serif"}}>Checklist Pré-Protocolo</h3>
          <div style={{fontSize:11,color:K.dim,marginTop:2}}>{proc&&(proc.num||proc.assunto)}</div></div>
          <div style={{marginLeft:"auto",fontSize:14,fontWeight:800,color:all_ok?"#00ff88":"#ffb800",fontFamily:"Orbitron,monospace"}}>{ok_count}/{CHECKLIST_ITEMS.length}</div>
        </div>
        <div style={{height:4,borderRadius:999,background:"rgba(255,255,255,.06)",marginBottom:18,overflow:"hidden"}}>
          <div style={{height:"100%",width:(ok_count/CHECKLIST_ITEMS.length*100)+"%",background:all_ok?"#00ff88":"#ffb800",boxShadow:"0 0 8px "+(all_ok?"#00ff88":"#ffb800"),transition:"width .3s"}}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
          {CHECKLIST_ITEMS.map(function(it){return(
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



/* ═══ FERIADOS NACIONAIS ═══ */
var FERIADOS = [
  "2025-01-01","2025-04-18","2025-04-21","2025-05-01","2025-06-19",
  "2025-09-07","2025-10-12","2025-11-02","2025-11-15","2025-11-20",
  "2025-12-25",
  "2026-01-01","2026-04-03","2026-04-21","2026-05-01","2026-06-04",
  "2026-09-07","2026-10-12","2026-11-02","2026-11-15","2026-11-20",
  "2026-12-25",
  "2027-01-01","2027-03-26","2027-04-21","2027-05-01","2027-05-27",
  "2027-09-07","2027-10-12","2027-11-02","2027-11-15","2027-11-20",
  "2027-12-25"
];
var isDU = function(d) {
  var ds = d.toISOString().split('T')[0];
  var dow = d.getDay();
  return dow !== 0 && dow !== 6 && FERIADOS.indexOf(ds) === -1;
};
var addDU = function(start, n) {
  var d = new Date(start);
  var count = 0;
  while (count < n) {
    d.setDate(d.getDate() + 1);
    if (isDU(d)) count++;
  }
  return d.toISOString().split('T')[0];
};
var calcPrazoDJeFull = function(pubDJe, intersticio) {
  if (!pubDJe) return null;
  var days = intersticio || 15;
  return addDU(new Date(pubDJe + 'T12:00:00'), days);
};

/* ═══ TIPO DE PEÇA — mapa de cores ═══ */
var PECA_COR = {
  // Defesa/inicial
  "Contestação":"#00e5ff","Reconvenção":"#00e5ff","Exceção de Incompetência":"#94a3b8",
  // Recursos 1G→2G
  "Apelação":"#f59e0b","Apelação Adesiva":"#f59e0b","Agravo de Instrumento":"#fb923c","Agravo Retido":"#fb923c",
  // Recursos tribunais
  "Agravo Interno":"#f97316","Embargos de Declaração":"#a78bfa","Embargos Infringentes":"#a78bfa","Embargos de Divergência":"#a78bfa",
  // Recursos excepcionais
  "Recurso Especial":"#c084fc","Agravo em Recurso Especial":"#c084fc",
  "Recurso Extraordinário":"#e879f9","Agravo em Recurso Extraordinário":"#e879f9","Recurso Ordinário Constitucional":"#e879f9",
  // MS e incidentes
  "Informações em MS":"#06b6d4","Contrarrazões":"#38bdf8","Contraminuta":"#38bdf8",
  "Impugnação ao Cumprimento de Sentença":"#f43f5e","Exceção de Pré-Executividade":"#f43f5e",
  "Embargos à Execução":"#f43f5e","Embargos de Terceiro":"#fb7185",
  // Tutelas
  "Manifestação sobre Tutela":"#34d399","Pedido de Efeito Suspensivo":"#34d399","Petição Cautelar":"#6ee7b7",
  // Manifestações gerais
  "Manifestação":"#64748b","Petição Simples":"#64748b","Memorial":"#8b5cf6","Memoriais":"#8b5cf6",
  "Alegações Finais":"#8b5cf6","Razões de Recurso":"#f59e0b","Contrarrazões de Recurso":"#38bdf8",
  // Orais
  "Sustentação Oral":"#b84dff",
  // Execução
  "Cumprimento de Sentença":"#f43f5e","Impugnação ao Cumprimento":"#f43f5e","Cálculos de Liquidação":"#fb7185",
  // Admin
  "Parecer Jurídico":"#00ff88","Ofício":"#22d3ee","Nota Técnica":"#86efac","Despacho de Andamento":"#94a3b8",
  // Outro
  "Outro":"#64748b"
};
var getPecaCor=function(tp){return PECA_COR[tp]||"#64748b";};
var getPecaLabel=function(tp){
  var abbrev={"Contestação":"CONTEST.","Apelação":"APEL.","Apelação Adesiva":"APEL.ADES.","Agravo de Instrumento":"AG.INST.","Agravo Retido":"AG.RET.","Agravo Interno":"AG.INT.","Embargos de Declaração":"EMBS.DEC.","Embargos Infringentes":"EMBS.INF.","Embargos de Divergência":"EMBS.DIV.","Recurso Especial":"RESP","Agravo em Recurso Especial":"AG.RESP","Recurso Extraordinário":"RE","Agravo em Recurso Extraordinário":"AG.RE","Recurso Ordinário Constitucional":"ROC","Informações em MS":"INFO.MS","Contrarrazões":"CTR.RAZ.","Contraminuta":"CTR.MIN.","Impugnação ao Cumprimento de Sentença":"IMP.CUM.","Exceção de Pré-Executividade":"EXC.PRE.","Embargos à Execução":"EMBS.EX.","Embargos de Terceiro":"EMBS.TER.","Manifestação sobre Tutela":"TUTE.","Pedido de Efeito Suspensivo":"EF.SUSP.","Petição Cautelar":"CAU.","Manifestação":"MANIF.","Petição Simples":"PET.","Memorial":"MEM.","Memoriais":"MEM.","Alegações Finais":"ALEG.FIN.","Razões de Recurso":"RAZ.REC.","Contrarrazões de Recurso":"CTR.REC.","Sustentação Oral":"SUST.","Cumprimento de Sentença":"CUM.SENT.","Impugnação ao Cumprimento":"IMP.CUM.","Cálculos de Liquidação":"CALC.","Parecer Jurídico":"PARECER","Ofício":"OFÍCIO","Nota Técnica":"NT","Despacho de Andamento":"DESP.","Reconvenção":"RECONV.","Exceção de Incompetência":"EXC.INC."};
  return abbrev[tp]||tp.substring(0,8).toUpperCase();
};


/* ═══ GERADOR DE MINUTA COMPLETA ═══ */
function MinutaModal({proc, onClose}) {
  var sTipo=useState(proc&&proc.tipoPeca||"Contestação");var tipoMinuta=sTipo[0],setTipoMinuta=sTipo[1];
  var sLoad=useState(false);var loading=sLoad[0],setLoad=sLoad[1];
  var sMinuta=useState("");var minuta=sMinuta[0],setMinuta=sMinuta[1];
  var sCopied=useState(false);var copied=sCopied[0],setCopied=sCopied[1];
  var sObs=useState("");var obsExtra=sObs[0],setObs=sObs[1];

  var gerar=function(){
    setLoad(true);setMinuta("");
    var ctx="";
    if(proc){
      ctx="Processo: "+(proc.num||"—")+" | SEI: "+(proc.numeroSEI||"—")+" | Assunto: "+proc.assunto+" | Parte contrária: "+(proc.parteContraria||"—")+" | Tribunal: "+(proc.tribunal||"—")+" | Tipo de ação: "+(proc.tipoAcao||"—")+" | Próxima providência: "+(proc.proxProv||"—")+" | Observações: "+(proc.obs||"—");
    }
    var instrucoes="REGRAS OBRIGATÓRIAS DE ESTILO COJUR/CFM:\n1. PROIBIDO travessão (use vírgula ou ponto)\n2. Use estrutura: RELATÓRIO, FUNDAMENTOS e CONCLUSÃO\n3. Cite NORMA + FATO + CONSEQUÊNCIA JURÍDICA em cada argumento\n4. Linguagem técnica, objetiva, sem redundâncias\n5. Parágrafos numerados quando houver mais de 3\n6. Endereçamento formal ao tribunal correspondente";
    var prompt="Você é advogado sênior do Conselho Federal de Medicina (CFM) especializado em Direito Administrativo e Processual Civil. Redija uma minuta completa de "+tipoMinuta+" seguindo rigorosamente as regras da COJUR/CFM.\n\n"+instrucoes+"\n\nContexto do processo:\n"+ctx+(obsExtra?"\n\nInstruções adicionais:\n"+obsExtra:"")+"\n\nRedija a peça completa, incluindo cabeçalho formal, qualificação das partes, fundamentos jurídicos (indicando os artigos aplicáveis) e pedido final. A peça deve estar pronta para revisão e protocolo.";
    fetch("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/ai-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({max_tokens:4000,messages:[{role:"user",content:prompt}]})})
    .then(function(r){return r.json();})
    .then(function(d){var t=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("").trim();setMinuta(t||"Sem resultado.");setLoad(false);})
    .catch(function(){setMinuta("Erro ao gerar. Verifique sua conexão.");setLoad(false);});
  };

  var copy=function(){try{navigator.clipboard.writeText(minuta).then(function(){setCopied(true);setTimeout(function(){setCopied(false);},2500);});}catch(e){}};

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.87)",backdropFilter:"blur(14px)",zIndex:1600,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"24px 16px",overflowY:"auto"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div className="cj-hud-tl cj-hud-br" style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.25)",borderRadius:22,width:"100%",maxWidth:820,padding:26,position:"relative",boxShadow:"0 32px 80px rgba(0,0,0,.9)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}><X size={20}/></button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
          <span style={{fontSize:24}}>📝</span>
          <div>
            <h3 style={{margin:0,fontSize:16,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif"}}>Gerador de Minuta Completa</h3>
            <div style={{fontSize:11,color:K.dim,marginTop:2}}>{proc&&proc.assunto||"Peça jurídica"} · {proc&&proc.num||"Novo processo"}</div>
          </div>
        </div>
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
        <div style={{padding:"10px 14px",borderRadius:11,background:"rgba(0,229,255,.05)",border:"1px solid rgba(0,229,255,.12)",marginBottom:14,fontSize:11,color:K.dim,lineHeight:1.6}}>
          <span style={{color:"#00e5ff",fontWeight:700}}>Padrão COJUR: </span>
          Sem travessão · NORMA+FATO+CONSEQUÊNCIA · Estrutura: Relatório / Fundamentos / Conclusão · Linguagem técnica CFM
        </div>
        {!loading&&!minuta&&<button onClick={gerar} style={{...btnPrim,width:"100%",justifyContent:"center",padding:"13px",fontSize:14,letterSpacing:".3px"}}>
          📝 Gerar Minuta Completa de {tipoMinuta}
        </button>}
        {loading&&<div style={{textAlign:"center",padding:"32px 0",color:"#00e5ff"}}>
          <div className="cj-pulse" style={{fontSize:38,marginBottom:12}}>📝</div>
          <div style={{fontSize:13,fontFamily:"Orbitron,sans-serif",letterSpacing:"1px"}}>Redigindo {tipoMinuta}...</div>
          <div style={{fontSize:11,color:K.dim,marginTop:6}}>Pode levar 20-30 segundos — peça completa sendo gerada</div>
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
    fetch("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/ai-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({max_tokens:400,messages:[{role:"user",content:prompt}]})})
    .then(function(r){return r.json();}).then(function(d){var txt=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("").replace(/```json|```/g,"").trim();try{setResult(JSON.parse(txt));setLoad(false);}catch(e){setErr("Não encontrado. Verifique o número.");setLoad(false);}}).catch(function(){setErr("Erro de conexão.");setLoad(false);});
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
    fetch("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/ai-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({max_tokens:600,messages:[{role:"user",content:prompt}]})})
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
        {loading&&<div style={{textAlign:"center",padding:"20px 0",color:"#00e5ff"}}><div className="cj-pulse" style={{fontSize:30,marginBottom:8}}>IA</div><div style={{fontSize:13,fontFamily:"Orbitron,sans-serif"}}>Analisando...</div></div>}
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
    fetch("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/ai-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({max_tokens:600,messages:[{role:"user",content:prompt}]})})
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
  var s1p=React.useState("resumo");var prodTab=s1p[0],setProdTab=s1p[1];
  var getMonthLabel=function(k){var months=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];var p=k.split("-");return months[parseInt(p[1])-1]+"/"+p[0].slice(2);};
  var monthlyProd=(function(){
    var real=st.realizados||[];
    var months={};
    real.forEach(function(r){
      var dt=r.data||r.dt||r.updatedAt;
      if(!dt)return;
      var k=dt.toString().slice(0,7);
      if(!months[k])months[k]={mes:k,label:"",total:0};
      months[k].total++;
      months[k].label=getMonthLabel(k);
    });
    return Object.values(months).sort(function(a,b){return a.mes>b.mes?1:-1;}).slice(-6);
  })();
  var maxProd=monthlyProd.length?Math.max.apply(null,monthlyProd.map(function(m){return m.total;})):1;
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
              <div style={{fontSize:11,color:K.dim,marginBottom:6,textTransform:"uppercase",fontSize:9,letterSpacing:".5px",fontWeight:700}}>{item[0]}</div>
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
      
        <div style={{marginTop:20,padding:"14px 16px",borderRadius:14,background:"rgba(0,229,255,.04)",border:"1px solid rgba(0,229,255,.12)"}}>
          <div style={{fontSize:11,color:K.dim,fontWeight:700,textTransform:"uppercase",letterSpacing:".5px",marginBottom:12}}>📊 Produção Mensal (últimos 6 meses)</div>
          {monthlyProd.length===0&&<div style={{fontSize:12,color:K.dim,textAlign:"center",padding:"12px 0"}}>Nenhuma peça concluída registrada ainda.</div>}
          <div style={{display:"flex",gap:8,alignItems:"flex-end",height:80}}>
            {monthlyProd.map(function(m){var pct=maxProd>0?Math.round((m.total/maxProd)*100):0;return(
              <div key={m.mes} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{fontSize:11,fontWeight:800,color:"#00e5ff"}}>{m.total}</div>
                <div style={{width:"100%",height:Math.max(4,Math.round(pct*0.6))+"px",background:"linear-gradient(180deg,#00e5ff,#0891b2)",borderRadius:"4px 4px 0 0"}}/>
                <div style={{fontSize:9,color:K.dim,whiteSpace:"nowrap"}}>{m.label}</div>
              </div>
            );})}
          </div>
        </div></div>
    </div>
  );
}


/* === CADASTRO RÁPIDO === */
function QuickAddModal(qP) {
  var dp=qP.dp, onClose=qP.onClose;
  var s1=React.useState("jud"); var tipo=s1[0],setTipo=s1[1];
  var s2=React.useState(""); var sei=s2[0],setSei=s2[1];
  var s3=React.useState(""); var assunto=s3[0],setAssunto=s3[1];
  var s4=React.useState(""); var prazo=s4[0],setPrazo=s4[1];
  var s5=React.useState(""); var peca=s5[0],setPeca=s5[1];

  var salvar = function() {
    if (!assunto.trim()) return;
    var proc = tipo==="jud"
      ? mkJ({assunto:assunto.trim(), numeroSEI:sei.trim(), prazoFinal:prazo||addD(NOW,30), tipoPeca:peca||"Manifestação"})
      : mkA({assunto:assunto.trim(), numeroSEI:sei.trim(), prazoFinal:prazo||addD(NOW,30), tipoPeca:peca||"Parecer Jurídico"});
    dp({type: tipo==="jud" ? "ADD_J" : "ADD_A", proc: proc});
    onClose();
  };

  return React.createElement("div", {
    style:{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:1600,display:"flex",justifyContent:"center",alignItems:"center",padding:"24px"},
    onClick:function(e){if(e.target===e.currentTarget)onClose();}
  },
    React.createElement("div", {style:{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.3)",borderRadius:22,width:"100%",maxWidth:480,padding:24,position:"relative",boxShadow:"0 32px 80px rgba(0,0,0,.9)"}},
      React.createElement("button",{onClick:onClose,style:{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}, React.createElement(X,{size:20})),
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
        React.createElement("span",{style:{fontSize:22}}, "⚡"),
        React.createElement("div",null,
          React.createElement("h3",{style:{margin:0,fontSize:15,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif"}},"Cadastro Rápido"),
          React.createElement("div",{style:{fontSize:11,color:K.dim}},"Campos mínimos — edite depois")
        )
      ),
      React.createElement("div",{style:{display:"flex",gap:8,marginBottom:14}},
        ["jud","adm"].map(function(t){return React.createElement("button",{key:t,onClick:function(){setTipo(t);},style:{flex:1,padding:"8px",borderRadius:11,border:tipo===t?"1px solid rgba(0,229,255,.5)":"1px solid rgba(255,255,255,.08)",background:tipo===t?"rgba(0,229,255,.1)":"transparent",color:tipo===t?K.txt:K.dim,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}},t==="jud"?"⚖️ Judicial":"📁 Administrativo");})
      ),
      React.createElement("div",{style:{marginBottom:10}},
        React.createElement("label",{style:lblSt},"Assunto *"),
        React.createElement("input",{style:{...inpSt,marginTop:4},value:assunto,onChange:function(e){setAssunto(e.target.value);},placeholder:"Ex: Impugnação ao edital REVALIDA",autoFocus:true,
          onKeyDown:function(e){if(e.key==="Enter")salvar();}})
      ),
      React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}},
        React.createElement("div",null,
          React.createElement("label",{style:lblSt},"Nº SEI"),
          React.createElement("input",{style:{...inpSt,marginTop:4},value:sei,onChange:function(e){setSei(e.target.value);},placeholder:"26.0.000000-0"})
        ),
        React.createElement("div",null,
          React.createElement("label",{style:lblSt},"Prazo Final"),
          React.createElement("input",{type:"date",style:{...inpSt,marginTop:4},value:prazo,onChange:function(e){setPrazo(e.target.value);}})
        )
      ),
      React.createElement("div",{style:{marginBottom:16}},
        React.createElement("label",{style:lblSt},"Tipo de Peça"),
        React.createElement("select",{style:{...inpSt,marginTop:4},value:peca,onChange:function(e){setPeca(e.target.value);}},
          React.createElement("option",{value:""},"Selecionar..."),
          TIPOS_PECA.map(function(t){return React.createElement("option",{key:t,value:t},t);})
        )
      ),
      React.createElement("div",{style:{display:"flex",gap:10}},
        React.createElement("button",{onClick:salvar,style:{flex:1,...btnPrim,justifyContent:"center",padding:"12px",fontSize:13,fontWeight:800}},"⚡ Cadastrar"),
        React.createElement("button",{onClick:onClose,style:{...btnGhost,padding:"12px 16px",fontSize:12}},"Cancelar")
      )
    )
  );
}


/* === EXPORT FICHA PROCESSO === */
var exportProcPDF = function(p) {
  var isJ = p.tipo === "jud";
  var fmt = function(d){ if(!d)return "-"; try{return new Date(d+"T12:00:00").toLocaleDateString("pt-BR");}catch(e){return d;} };
  var html = [
    "<html><head><meta charset='UTF-8'>",
    "<style>body{font-family:Arial,sans-serif;font-size:12px;margin:32px;color:#111;}",
    "h1{font-size:16px;font-weight:bold;margin-bottom:4px;}",
    "h2{font-size:13px;color:#444;font-weight:normal;margin-top:0;}",
    ".grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;margin:16px 0;}",
    ".field{border-bottom:1px solid #e5e7eb;padding:4px 0;}",
    ".label{font-size:10px;color:#666;text-transform:uppercase;font-weight:bold;}",
    ".value{font-size:12px;}",
    ".obs{background:#f9fafb;border-radius:6px;padding:10px;margin-top:12px;font-size:11px;color:#444;}",
    "@media print{@page{margin:20mm;}}",
    "</style></head><body>",
    "<h1>"+(isJ?"⚖️ Processo Judicial":"📁 Processo Administrativo")+"</h1>",
    "<h2>"+p.assunto+"</h2>",
    "<hr style='border:none;border-top:2px solid #111;margin:8px 0'/>",
    "<div class='grid'>",
    p.num?"<div class='field'><div class='label'>Nº Judicial</div><div class='value'>"+p.num+"</div></div>":"",
    p.numeroSEI?"<div class='field'><div class='label'>Nº SEI</div><div class='value'>"+p.numeroSEI+"</div></div>":"",
    isJ&&p.tribunal?"<div class='field'><div class='label'>Tribunal</div><div class='value'>"+p.tribunal+"</div></div>":"",
    isJ&&p.tipoAcao?"<div class='field'><div class='label'>Tipo de Ação</div><div class='value'>"+p.tipoAcao+"</div></div>":"",
    p.tipoPeca?"<div class='field'><div class='label'>Tipo de Peça</div><div class='value'>"+p.tipoPeca+"</div></div>":"",
    isJ&&p.parteContraria?"<div class='field'><div class='label'>Parte Contrária</div><div class='value'>"+p.parteContraria+"</div></div>":"",
    p.prazoFinal?"<div class='field'><div class='label'>Prazo Final</div><div class='value'>"+fmt(p.prazoFinal)+"</div></div>":"",
    p.pubDJe?"<div class='field'><div class='label'>Pub. DJe</div><div class='value'>"+fmt(p.pubDJe)+"</div></div>":"",
    p.status?"<div class='field'><div class='label'>Status</div><div class='value'>"+p.status+"</div></div>":"",
    p.fase?"<div class='field'><div class='label'>Fase</div><div class='value'>"+p.fase+"</div></div>":"",
    p.responsavel?"<div class='field'><div class='label'>Responsável</div><div class='value'>"+p.responsavel+"</div></div>":"",
    p.horasTrabalhadas?"<div class='field'><div class='label'>Horas Trabalhadas</div><div class='value'>"+p.horasTrabalhadas+"h</div></div>":"",
    "</div>",
    p.proxProv?"<div class='obs'><strong>Próxima Providência:</strong> "+p.proxProv+"</div>":"",
    p.obs?"<div class='obs'><strong>Observações:</strong> "+p.obs+"</div>":"",
    "<div style='margin-top:24px;font-size:10px;color:#999;text-align:right'>Gerado em "+new Date().toLocaleString("pt-BR")+" · COJUR/CFM</div>",
    "</body></html>"
  ].join("");
  var w = window.open("","_blank");
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(function(){ w.print(); }, 500);
};


/* === ETIQUETAS MODAL === */
function EtiquetasModal(eP){
  var st=eP.st,dp=eP.dp,onClose=eP.onClose;
  var s1=React.useState("");var nome=s1[0],setNome=s1[1];
  var s2=React.useState("#00e5ff");var cor=s2[0],setCor=s2[1];
  var CORES=["#00e5ff","#00ff88","#ffb800","#ff2e5b","#b84dff","#fb923c","#f472b6","#38bdf8","#a3e635","#94a3b8"];

  var criar=function(){
    if(!nome.trim())return;
    dp({type:"ADD_ETIQUETA",nome:nome.trim(),cor:cor});
    setNome("");
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:1600,display:"flex",justifyContent:"center",alignItems:"center",padding:"24px"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(168,85,247,.3)",borderRadius:22,width:"100%",maxWidth:500,padding:24,position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}>{React.createElement(X,{size:20})}</button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <span style={{fontSize:22}}>🏷️</span>
          <div>
            <h3 style={{margin:0,fontSize:15,fontWeight:800,color:"#b84dff",fontFamily:"Orbitron,sans-serif"}}>Etiquetas Personalizadas</h3>
            <div style={{fontSize:11,color:K.dim}}>Organize seus processos com etiquetas coloridas</div>
          </div>
        </div>

        {/* Create new */}
        <div style={{marginBottom:16,padding:"14px",borderRadius:14,border:"1px solid rgba(168,85,247,.2)",background:"rgba(168,85,247,.04)"}}>
          <div style={{fontSize:11,color:K.dim,fontWeight:700,textTransform:"uppercase",letterSpacing:".5px",marginBottom:10}}>Nova etiqueta</div>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <input style={{...inpSt,flex:1}} value={nome} onChange={function(e){setNome(e.target.value);}} placeholder="Ex: REVALIDA, Aguardando MPF..." onKeyDown={function(e){if(e.key==="Enter")criar();}}/>
            <button onClick={criar} style={{...btnPrim,padding:"0 16px",flexShrink:0}}>Criar</button>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {CORES.map(function(c){return(
              <div key={c} onClick={function(){setCor(c);}} style={{width:24,height:24,borderRadius:6,background:c,cursor:"pointer",border:cor===c?"3px solid #fff":"2px solid transparent",boxSizing:"border-box"}}/>
            );})}
          </div>
        </div>

        {/* Existing labels */}
        <div style={{maxHeight:300,overflowY:"auto"}}>
          {(!st.etiquetas||!st.etiquetas.length)&&<div style={{textAlign:"center",padding:"24px",color:K.dim,fontSize:13}}>Nenhuma etiqueta criada ainda.</div>}
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {(st.etiquetas||[]).map(function(e){
              var count=[...st.adm,...st.jud].filter(function(p){return (p.tags||[]).includes(e.id);}).length;
              return(
                <div key={e.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:11,border:"1px solid rgba(255,255,255,.07)",background:"rgba(255,255,255,.025)"}}>
                  <div style={{width:14,height:14,borderRadius:4,background:e.cor,flexShrink:0}}/>
                  <span style={{flex:1,fontSize:13,fontWeight:600,color:K.txt}}>{e.nome}</span>
                  <span style={{fontSize:11,color:K.dim}}>{count} processo{count!==1?"s":""}</span>
                  <button onClick={function(){if(window.confirm("Remover etiqueta '"+e.nome+"'?"))dp({type:"DEL_ETIQUETA",id:e.id});}} style={{background:"none",border:"none",color:K.dim,cursor:"pointer",padding:"2px 6px",borderRadius:6,fontSize:12}}>✕</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


/* === EMAIL ALERT MODAL === */
function EmailAlertModal(eaP){
  var onClose=eaP.onClose,st=eaP.st;
  var s1=React.useState("");var email=s1[0],setEmail=s1[1];
  var s2=React.useState(false);var loading=s2[0],setLoad=s2[1];
  var s3=React.useState(null);var result=s3[0],setResult=s3[1];

  var enviar=function(){
    if(!email.trim())return;
    setLoad(true);setResult(null);
    fetch("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/email-alert",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email:email.trim()})
    }).then(function(r){return r.json();}).then(function(d){
      setResult(d);setLoad(false);
    }).catch(function(){
      setResult({error:"Erro de conexao"});setLoad(false);
    });
  };

  var all=[...(st.adm||[]),...(st.jud||[])];
  var urgentes=all.filter(function(p){return p.diasRestantes!=null&&p.diasRestantes>=0&&p.diasRestantes<=5&&!["Concluido","Arquivado"].includes(p.status);});

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:1600,display:"flex",justifyContent:"center",alignItems:"center",padding:"24px"}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:"linear-gradient(135deg,rgba(2,5,22,.99),rgba(1,3,12,.99))",border:"1px solid rgba(0,229,255,.3)",borderRadius:22,width:"100%",maxWidth:460,padding:24,position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:K.dim,cursor:"pointer"}}>{React.createElement(X,{size:20})}</button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
          <span style={{fontSize:22}}>📧</span>
          <div>
            <h3 style={{margin:0,fontSize:15,fontWeight:800,color:"#00e5ff",fontFamily:"Orbitron,sans-serif"}}>Alerta de Prazos por Email</h3>
            <div style={{fontSize:11,color:K.dim}}>Envia agora um resumo dos prazos críticos</div>
          </div>
        </div>

        <div style={{padding:"12px 14px",borderRadius:11,background:"rgba(0,229,255,.06)",border:"1px solid rgba(0,229,255,.15)",marginBottom:16}}>
          <div style={{fontSize:12,color:K.txt,fontWeight:700,marginBottom:4}}>
            {urgentes.length} processo{urgentes.length!==1?"s":""} com prazo crítico (≤5du)
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:4,maxHeight:120,overflowY:"auto"}}>
            {urgentes.slice(0,5).map(function(p){return(
              <div key={p.id} style={{fontSize:11,color:K.dim,display:"flex",justifyContent:"space-between"}}>
                <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.assunto}</span>
                <span style={{flexShrink:0,marginLeft:8,color:p.diasRestantes<=2?"#ff2e5b":"#ffb800",fontWeight:700}}>{p.diasRestantes===0?"HOJE":p.diasRestantes+"du"}</span>
              </div>
            );})}
          </div>
        </div>

        <div style={{marginBottom:12}}>
          <label style={lblSt}>Seu email</label>
          <input style={{...inpSt,marginTop:4}} value={email} onChange={function(e){setEmail(e.target.value);}} placeholder="joao@cfm.org.br" type="email" onKeyDown={function(e){if(e.key==="Enter")enviar();}}/>
        </div>

        {!loading&&!result&&<button onClick={enviar} style={{...btnPrim,width:"100%",justifyContent:"center",padding:"11px"}}>
          📧 Enviar alerta agora
        </button>}

        {loading&&<div style={{textAlign:"center",padding:"16px",color:"#00e5ff",fontSize:12,fontFamily:"Orbitron,monospace"}}>Enviando...</div>}

        {result&&<div style={{padding:"12px 14px",borderRadius:11,background:result.ok||result.preview?"rgba(0,255,136,.08)":"rgba(255,46,91,.08)",border:"1px solid "+(result.ok||result.preview?"rgba(0,255,136,.25)":"rgba(255,46,91,.25)"),fontSize:12,color:result.ok||result.preview?"#00ff88":"#ff2e5b"}}>
          {result.ok?"✅ Email enviado com sucesso!":result.preview?"✅ Serviço ativo ("+result.urgentes+" processos). Configure RESEND_API_KEY no Supabase para ativar envio real.":result.error||"Erro ao enviar"}
        </div>}

        <div style={{marginTop:14,fontSize:10,color:K.dim,lineHeight:1.5}}>
          Para envio automático diário às 7h30, configure RESEND_API_KEY + ALERT_EMAIL nos secrets do Supabase Edge Functions e ative um cron job.
        </div>
      </div>
    </div>
  );
}


/* === TOAST NOTIFICATIONS === */
var _toastId = 0;
var _toastSetFn = null;
var showToast = function(msg, type) {
  if (!_toastSetFn) return;
  var id = ++_toastId;
  var cor = type === 'success' ? '#00ff88' : type === 'error' ? '#ff2e5b' : type === 'warn' ? '#ffb800' : '#00e5ff';
  var icon = type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warn' ? '⚠' : 'ℹ';
  _toastSetFn(function(prev) { return [...prev, {id, msg, cor, icon}]; });
  setTimeout(function() {
    _toastSetFn(function(prev) { return prev.filter(function(t) { return t.id !== id; }); });
  }, 3000);
};

function ToastContainer() {
  var s = React.useState([]); var toasts = s[0], setToasts = s[1];
  React.useEffect(function() { _toastSetFn = setToasts; return function() { _toastSetFn = null; }; }, []);
  if (!toasts.length) return null;
  return React.createElement('div', {
    style: {position:'fixed', bottom:24, right:24, zIndex:9999, display:'flex', flexDirection:'column', gap:8, pointerEvents:'none'}
  }, toasts.map(function(t) {
    return React.createElement('div', {key: t.id, style: {
      display:'flex', alignItems:'center', gap:10, padding:'10px 16px',
      background:'rgba(2,5,22,.97)', border:'1px solid '+t.cor+'44',
      borderRadius:12, minWidth:260, maxWidth:380,
      boxShadow:'0 8px 32px rgba(0,0,0,.6)',
      animation:'slideIn .2s ease'
    }},
      React.createElement('span', {style:{color:t.cor, fontWeight:800, fontSize:14, flexShrink:0}}, t.icon),
      React.createElement('span', {style:{color:'#e2e8f0', fontSize:12, fontFamily:'inherit', lineHeight:1.4}}, t.msg)
    );
  }));
}


/* === COMMAND PALETTE === */
function CmdPalette(cpP) {
  var st=cpP.st, dp=cpP.dp, onClose=cpP.onClose, sPg=cpP.sPg, sSel=cpP.sSel, setShowQuickAdd=cpP.setShowQuickAdd;
  var s1=React.useState(""); var q=s1[0],setQ=s1[1];
  var s2=React.useState(0); var sel=s2[0],setSel=s2[1];
  var ref=React.useRef(null);
  React.useEffect(function(){ if(ref.current) ref.current.focus(); }, []);

  var all=[...(st.adm||[]),...(st.jud||[])];
  var PAGES=[
    {icon:"⊞",label:"Dashboard",action:function(){sPg("dashboard");onClose();}},
    {icon:"⚖️",label:"Processos Judiciais",action:function(){sPg("jud");onClose();}},
    {icon:"📁",label:"Processos Administrativos",action:function(){sPg("adm");onClose();}},
    {icon:"🏃",label:"Em Execução",action:function(){sPg("exec");onClose();}},
    {icon:"📅",label:"Calendário",action:function(){sPg("cal");onClose();}},
    {icon:"📊",label:"Estatísticas",action:function(){sPg("stats");onClose();}},
  ];
  var ACTIONS=[
    {icon:"⚡",label:"Cadastro rápido de processo",action:function(){setShowQuickAdd(true);onClose();}},
    {icon:"🏷️",label:"Gerenciar etiquetas",action:function(){cpP.setShowEtiquetas(true);onClose();}},
    {icon:"💾",label:"Salvar agora no Supabase",action:function(){try{cpP.syncToSupabase(serialize(st));}catch(e){}onClose();}},
    {icon:"🕐",label:"Histórico de versões",action:function(){cpP.setShowHistory(true);onClose();}},
  ];

  var qLow=q.toLowerCase();
  var filteredProcs=q.length>1?all.filter(function(p){return (p.assunto||"").toLowerCase().includes(qLow)||(p.num||"").toLowerCase().includes(qLow)||(p.numeroSEI||"").toLowerCase().includes(qLow);}).slice(0,5):[];
  var filteredPages=PAGES.filter(function(p){return p.label.toLowerCase().includes(qLow);});
  var filteredActions=ACTIONS.filter(function(a){return a.label.toLowerCase().includes(qLow);});
  var items=[
    ...filteredProcs.map(function(p){return {icon:p.tipo==="jud"?"⚖️":"📁",label:p.assunto,hint:p.tipoPeca,action:function(){sSel(p);sPg(p.tipo==="jud"?"jud":"adm");onClose();}};}),
    ...filteredPages,
    ...filteredActions
  ];

  var handleKey=function(e){
    if(e.key==="ArrowDown"){setSel(function(s){return Math.min(s+1,items.length-1);});}
    if(e.key==="ArrowUp"){setSel(function(s){return Math.max(s-1,0);});}
    if(e.key==="Enter"&&items[sel]){items[sel].action();}
    if(e.key==="Escape"){onClose();}
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",backdropFilter:"blur(8px)",zIndex:9000,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:80}} onClick={function(e){if(e.target===e.currentTarget)onClose();}}>
      <div style={{width:"100%",maxWidth:560,background:"rgba(2,5,22,.98)",border:"1px solid rgba(0,229,255,.25)",borderRadius:16,overflow:"hidden",boxShadow:"0 24px 64px rgba(0,0,0,.8)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",borderBottom:"1px solid rgba(0,229,255,.1)"}}>
          <span style={{color:"#4e6a8a",fontSize:14}}>⌕</span>
          <input ref={ref} value={q} onChange={function(e){setQ(e.target.value);setSel(0);}} onKeyDown={handleKey}
            placeholder="Buscar processos, páginas, ações..."
            style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#e2e8f0",fontSize:14,fontFamily:"inherit"}}/>
          <span style={{fontSize:11,color:"#4e6a8a",background:"rgba(255,255,255,.06)",padding:"2px 6px",borderRadius:5}}>ESC</span>
        </div>
        <div style={{maxHeight:360,overflowY:"auto"}}>
          {!items.length&&<div style={{padding:"24px",textAlign:"center",color:"#4e6a8a",fontSize:13}}>Digite para buscar processos, páginas ou ações</div>}
          {items.length>0&&(
            <div>
              {filteredProcs.length>0&&<div style={{padding:"6px 16px 2px",fontSize:10,color:"#4e6a8a",textTransform:"uppercase",letterSpacing:".05em",fontWeight:700}}>Processos</div>}
              {items.map(function(item,i){return(
                <div key={i} onClick={item.action}
                  style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",cursor:"pointer",background:sel===i?"rgba(0,229,255,.08)":"transparent",borderLeft:sel===i?"2px solid #00e5ff":"2px solid transparent"}}
                  onMouseEnter={function(){setSel(i);}}>
                  <span style={{fontSize:14,flexShrink:0}}>{item.icon}</span>
                  <span style={{flex:1,fontSize:13,color:"#e2e8f0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.label}</span>
                  {item.hint&&<span style={{fontSize:11,color:"#4e6a8a",flexShrink:0}}>{item.hint}</span>}
                  {sel===i&&<span style={{fontSize:10,color:"#00e5ff",flexShrink:0}}>↵</span>}
                </div>
              );})}
            </div>
          )}
        </div>
        <div style={{padding:"8px 16px",borderTop:"1px solid rgba(0,229,255,.08)",display:"flex",gap:16,fontSize:10,color:"#4e6a8a"}}>
          <span>↑↓ navegar</span><span>↵ selecionar</span><span>ESC fechar</span>
        </div>
      </div>
    </div>
  );
}


/* === SKELETON LOADING === */
function SkeletonCard() {
  return React.createElement("div", {
    style: {padding:"12px 14px",borderRadius:14,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",animation:"pulse 1.5s infinite"}
  },
    React.createElement("div", {style:{height:10,borderRadius:4,background:"rgba(255,255,255,.08)",marginBottom:8,width:"30%"}}),
    React.createElement("div", {style:{height:13,borderRadius:4,background:"rgba(255,255,255,.08)",marginBottom:6,width:"80%"}}),
    React.createElement("div", {style:{height:10,borderRadius:4,background:"rgba(255,255,255,.06)",width:"50%"}})
  );
}

function SkeletonDashboard() {
  return React.createElement("div", {style:{padding:"18px 20px"}},
    React.createElement("div", {style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}},
      [1,2,3,4].map(function(i){return React.createElement("div",{key:i,style:{padding:16,borderRadius:14,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",animation:"pulse 1.5s infinite"}},
        React.createElement("div",{style:{height:10,borderRadius:4,background:"rgba(255,255,255,.08)",marginBottom:8,width:"60%"}}),
        React.createElement("div",{style:{height:28,borderRadius:4,background:"rgba(255,255,255,.1)",width:"40%"}})
      );})
    ),
    React.createElement("div", {style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}},
      [1,2,3,4,5,6].map(function(i){return React.createElement(SkeletonCard,{key:i});})
    )
  );
}

/* ═══ FORM MODAL ═══ */
const FM=({title,fields,initial,onSave,onClose,onDelete})=>{
  const[form,setForm]=useState(()=>({...(initial||{})}));
  const[confirmDel,setCD]=useState(false);
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));

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
                ):f.type==="date"?(
                  <input style={inpSt} type="date" value={form[f.key] instanceof Date ? toISO(form[f.key]) : (form[f.key]||"")} onChange={e=>set(f.key,e.target.value?new Date(e.target.value+"T12:00:00"):null)}/>
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
            <button style={btnPrim} onClick={()=>onSave(form)}><Save size={14}/>Salvar</button>
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
const PC=({item:p,onClick:oc,dp,compact})=>{const isA=p.tipo==="adm";const side=extValue(p);const accent=uC(p.diasRestantes);return(
  <div onClick={e=>{e.stopPropagation();oc?.(p)}} className="cj-soft" style={{background:"linear-gradient(180deg,rgba(18,24,42,.92),rgba(11,15,29,.94))",border:"1px solid "+(p.iaS>=75?"rgba(255,46,91,.35)":p.iaS>=50?"rgba(255,184,0,.28)":accent+"22"),borderRadius:20,padding:"0",cursor:"pointer",transition:"all .25s",overflow:"hidden",position:"relative"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.borderColor=accent+"55"}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor=accent+"22"}}>
    <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:`linear-gradient(180deg,${accent},transparent 88%)`}}/>
    <div style={{padding:compact?"8px 12px 6px":"14px 16px 10px",borderBottom:`1px solid ${K.brd}`,background:"linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0))"}}>
      <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"flex-start"}}>
        <div style={{display:"flex",gap:10,minWidth:0}}>
          <div style={{width:42,height:42,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",background:p.tipo==="jud"?K.puG:K.acG,border:`1px solid ${p.tipo==="jud"?K.pu:K.ac}22`,flexShrink:0}}>
            {p.tipo==="jud"?<Scale size={18} color={K.pu}/>:<FolderOpen size={18} color={K.ac}/>}
          </div>
          <div style={{minWidth:0}}>
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:4}}>
              <Bd color={p.tipo==="jud"?K.pu:K.ac}>{p.tipo==="jud"?"Judicial":"Administrativo"}</Bd>
              {p.tipoPeca&&<div style={{display:"inline-flex",alignItems:"center",padding:"3px 8px",borderRadius:6,background:getPecaCor(p.tipoPeca)+"20",border:"1px solid "+getPecaCor(p.tipoPeca)+"55",color:getPecaCor(p.tipoPeca),fontSize:9,fontWeight:900,letterSpacing:".8px",fontFamily:"Orbitron,monospace",textTransform:"uppercase",flexShrink:0,boxShadow:"0 0 8px "+getPecaCor(p.tipoPeca)+"30"}}>{getPecaLabel(p.tipoPeca)}</div>}
            </div>
            <div style={{fontSize:14,fontWeight:800,color:K.txt,fontFamily:"'JetBrains Mono',monospace",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.num||"Novo cadastro"}</div>
            {p.numeroSEI&&<div onClick={function(e){e.stopPropagation();if(navigator.clipboard)navigator.clipboard.writeText(p.numeroSEI).then(function(){showCopyToast("SEI "+p.numeroSEI);});}} title={"Clique para copiar SEI: "+p.numeroSEI} style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",color:"#7dd3fc",marginTop:3,cursor:"pointer",padding:"2px 6px",borderRadius:5,background:"rgba(125,211,252,.1)",border:"1px solid rgba(125,211,252,.15)",display:"inline-flex",alignItems:"center",gap:4,userSelect:"none"}}>🗂 SEI {p.numeroSEI}</div>}
          </div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"}}>
          <UB d={p.diasRestantes}/><SB s={p.score}/><DoneBtn small onClick={()=>dp({type:"COMPLETE_P",id:p.id})}/>
        </div>
      </div>
      {isExecucao(p)&&<div className="cj-pulse" style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(0,229,255,.15)",border:"1px solid rgba(0,229,255,.5)",borderRadius:8,padding:"3px 8px",fontSize:9,color:"#00e5ff",fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:".5px"}}>⚡ EM EXECUÇÃO</div>}
      {isAcompanhamento(p)&&<div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(168,85,247,.12)",border:"1px solid rgba(168,85,247,.45)",borderRadius:8,padding:"3px 8px",fontSize:9,color:"#b84dff",fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:".5px"}}>👁 EM ACOMPANHAM.</div>}
      {isProtocolar(p)&&<div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:8,background:"rgba(0,255,136,.12)",border:"1px solid rgba(0,255,136,.45)",color:"#00ff88",fontSize:10,fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",marginTop:8,textShadow:"0 0 6px rgba(0,255,136,.7)"}}>📤 PROTOCOLAR NO TRIBUNAL</div>}
      {isCorrecao(p)&&<div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:8,background:"rgba(255,184,0,.12)",border:"1px solid rgba(255,184,0,.45)",color:"#ffb800",fontSize:10,fontWeight:800,fontFamily:"Orbitron,sans-serif",letterSpacing:".5px",marginTop:8,textShadow:"0 0 6px rgba(255,184,0,.7)"}}>✏️ AGUARDANDO CORREÇÃO</div>}
      <div style={{fontSize:15,fontWeight:800,color:K.txt,marginTop:8,lineHeight:1.45}}>{p.assunto||"Sem assunto"}</div>
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
        <DollarSign size={13} color={K.wa}/><div><div style={{fontSize:10,fontWeight:800,color:K.wa}}>⚠️ RECOLHIMENTO DE CUSTAS OBRIGATÓRIO</div><div style={{fontSize:9,color:"#fde68a",marginTop:1}}>Este recurso exige preparo antes do protocolo.</div></div>
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
    </div>
  </div>
)};
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
      {cols.map(function(ph){var col=items.filter(function(p){return p.fase===ph;}).sort(function(a,b){return b.score-a.score;});var isO=oc===ph;return(
        <div key={ph} className={isO?"cj-kd":""} onDragOver={function(e){e.preventDefault();sOc(ph);}} onDragLeave={function(){sOc(null);}} onDrop={function(e){e.preventDefault();sOc(null);if(!did)return;var pr=items.find(function(p){return p.id===did;});if(pr&&pr.fase!==ph)dp({type:"UPD",id:did,isAdm:pr.tipo==="adm",ch:{fase:ph}});sDid(null);}} style={{minWidth:260,flex:"0 0 270px",background:"rgba(0,229,255,.02)",borderRadius:14,padding:12,border:"1px solid "+(isO?K.ac+"55":K.brd),boxShadow:isO?"0 0 20px rgba(0,229,255,.12)":"none",transition:"all .2s"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,padding:"0 4px",alignItems:"center"}}>
            <span style={{fontSize:11,fontWeight:700,color:K.txt,letterSpacing:".2px"}}>{ph}</span>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:10,fontWeight:700,color:K.dim,fontFamily:"'JetBrains Mono',monospace",background:"rgba(0,229,255,.08)",border:"1px solid rgba(0,229,255,.15)",borderRadius:10,padding:"2px 8px"}}>{col.length}</span>
              <button onClick={function(){removeCol(ph);}} style={{background:"none",border:"none",color:K.dim2,cursor:"pointer",padding:"2px",lineHeight:1}} title="Remover coluna"><X size={10}/></button>
            </div>
          </div>
          <div className="cj-st" style={{display:"flex",flexDirection:"column",gap:8,minHeight:60}}>
            {col.map(function(p){return(
              <div key={p.id} draggable onDragStart={function(e){sDid(p.id);e.dataTransfer.effectAllowed="move";}} style={{opacity:did===p.id?0.4:1,cursor:"grab"}}>
                <div onClick={function(){ss(p);}} style={{background:K.card,border:"1px solid "+K.brd,borderRadius:12,padding:"10px 12px",borderLeft:"3px solid "+uC(p.diasRestantes),transition:"all .2s",boxShadow:"0 4px 12px rgba(0,0,0,.2)"}} onMouseEnter={function(e){e.currentTarget.style.background=K.cardH;e.currentTarget.style.boxShadow="0 0 14px rgba(0,229,255,.08), 0 4px 16px rgba(0,0,0,.3)";}} onMouseLeave={function(e){e.currentTarget.style.background=K.card;e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,.2)";}}>
                  <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:4}}><GripVertical size={12} color={K.dim2}/><span style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",color:K.ac}}>{p.num||"Novo"}</span></div>
                  <div style={{fontSize:12,fontWeight:600,color:K.txt,marginBottom:6,lineHeight:1.4}}>{p.assunto||"Sem assunto"}</div>
                  <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}><UB d={p.diasRestantes}/><SB s={p.score}/><DoneBtn small onClick={function(){dp({type:"COMPLETE_P",id:p.id});}}/></div>
                </div>
              </div>
            );})}
            {!col.length&&<div style={{padding:"20px 10px",textAlign:"center",color:K.dim2,fontSize:11,border:"1px dashed rgba(0,229,255,.1)",borderRadius:10}}>Arraste processos aqui</div>}
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
const applyF=(items,f)=>{let r=items;if(f.urg&&f.urg!=="all")r=r.filter(p=>uL(p.diasRestantes)===f.urg);if(f.st&&f.st!=="all")r=r.filter(p=>p.status===f.st);if(f.ph&&f.ph!=="all")r=r.filter(p=>p.fase===f.ph);if(f.peca&&f.peca!=="all")r=r.filter(p=>p.tipoPeca===f.peca);if(f.tr&&f.tr!=="all")r=r.filter(p=>p.tribunal===f.tr);if(f.dtIni)r=r.filter(p=>p.prazoFinal&&toISO(toD(p.prazoFinal))>=f.dtIni);if(f.dtFim)r=r.filter(p=>p.prazoFinal&&toISO(toD(p.prazoFinal))<=f.dtFim);if(f.semMov)r=r.filter(p=>(p.semMov||0)>=Number(f.semMov));if(f.dep==="Sim")r=r.filter(p=>p.depTerc);if(f.dep==="Não")r=r.filter(p=>!p.depTerc);if(f.reun==="Sim")r=r.filter(p=>p.reuniao);if(f.reun==="Não")r=r.filter(p=>!p.reuniao);if(f.sust==="Sim")r=r.filter(p=>p.sustentacao);if(f.sust==="Não")r=r.filter(p=>!p.sustentacao);if(f.semAcao==="Sim")r=r.filter(p=>!p.proxProv);if(f.semAcao==="Não")r=r.filter(p=>!!p.proxProv);if(f.semResp==="Sim")r=r.filter(p=>!p.responsavel);if(f.semResp==="Não")r=r.filter(p=>!!p.responsavel);if(f.resp){const q=f.resp.toLowerCase();r=r.filter(p=>(p.responsavel||"").toLowerCase().includes(q))}if(f.sq){const q=f.sq.toLowerCase();r=r.filter(p=>(p.num||"").toLowerCase().includes(q)||(p.numeroSEI||"").toLowerCase().includes(q)||(p.assunto||"").toLowerCase().includes(q)||(p.responsavel||"").toLowerCase().includes(q)||(p.orgao||"").toLowerCase().includes(q)||(p.interessado||"").toLowerCase().includes(q)||(p.parteContraria||"").toLowerCase().includes(q))}return r};

/* ═══════════════════════════════════════ */
/* ═══ PAGES ═══ */
/* ═══════════════════════════════════════ */

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
  return(
    <div className="cj-pg">
      {React.createElement(function(){var s=useState(false);var showR=s[0],sShowR=s[1];return React.createElement(React.Fragment,null,React.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:8,gap:8,flexWrap:"wrap"}},React.createElement("button",{onClick:function(){sp("timeline");},style:{...btnGhost,padding:"6px 12px",fontSize:11,color:"#00e5ff",borderColor:"rgba(0,229,255,.22)"}},"📅 Timeline"),React.createElement("button",{onClick:function(){sShowR(true);},style:{...btnGhost,padding:"6px 12px",fontSize:11,color:"#00e5ff",borderColor:"rgba(0,229,255,.22)"}},"📊 Relatório")),showR&&React.createElement(RelatorioModal,{st:st,onClose:function(){sShowR(false);}}));},null)}
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
        <SC icon={Upload} label="Protocolar" value={all.filter(p=>isProtocolar(p)).length} color={K.su} sub="Aprovado pelo chefe" onClick={()=>sp("protocolar")}/>
        <SC icon={PenLine} label="Em Correção" value={all.filter(p=>isCorrecao(p)).length} color={K.wa} sub="Retornado p/ revisão" onClick={()=>sp("correcao")}/>
        <SC icon={Layers} label="Ativos" value={all.filter(p=>p.status==="Ativo").length} color={K.ac} onClick={()=>sp("priorities")}/>
        <SC icon={FolderOpen} label="Admin" value={st.adm.length} color={K.ac} onClick={()=>sp("admin")}/>
        <SC icon={Scale} label="Judiciais" value={st.jud.length} color={K.pu} onClick={()=>sp("judicial")}/>
        <SC icon={CheckCircle} label="Realizados" value={(st.realizados||[]).length} color={K.su} onClick={()=>sp("done")}/>
        <SC icon={Flame} label="Críticos" value={crit.length} color={K.cr} onClick={()=>sp("priorities")}/>
        <SC icon={Target} label="Prov. Hoje" value={all.filter(p=>p.dataProv&&diffD(toD(p.dataProv),NOW)<=0).length} color={K.ac} onClick={()=>sp("today")}/>
        <SC icon={Users} label="Aguardando" value={all.filter(p=>p.depTerc).length} color={K.wa} onClick={()=>sp("waiting")}/>
        <SC icon={Gavel} label="Sust. Oral" value={st.sust.length} color={K.pu} sub={st.sust.length?`Próxima: ${fmtS(toD(st.sust[0].data))}`:"—"} onClick={()=>sp("agenda")}/>
        <SC icon={Calendar} label="Reuniões" value={st.reun.length} color={K.ac} sub={`Hoje: ${st.reun.filter(r=>diffD(toD(r.data),NOW)===0).length}`} onClick={()=>sp("agenda")}/>
        <SC icon={Plane} label="Viagens" value={st.viag.length} color={K.su} sub={st.viag.length?`Próxima: ${fmtS(toD(st.viag[0].dataIda))}`:"Nenhuma"} onClick={()=>sp("agenda")}/>
      </div>
      {(function(){var procs=[...st.adm,...st.jud].map(function(p){return Object.assign({},p,{iaS:iaScore(p)});}).sort(function(a,b){return b.iaS-a.iaS;});var top=procs[0];if(!top)return null;var b=iaBadge(top.iaS);var sug=iaSugestao(top);return(
        <div onClick={function(){sp("ia");}} style={{marginBottom:16,padding:"10px 18px",borderRadius:14,background:"linear-gradient(135deg, rgba(168,85,247,.12), rgba(0,212,255,.07))",border:"1px solid rgba(168,85,247,.25)",display:"flex",alignItems:"center",gap:14,cursor:"pointer",transition:"all .2s"}} onMouseEnter={function(e){e.currentTarget.style.borderColor="rgba(168,85,247,.5)";}} onMouseLeave={function(e){e.currentTarget.style.borderColor="rgba(168,85,247,.25)";}}>
          <span style={{fontSize:22}}>🧠</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:"#a78bfa",fontWeight:700,marginBottom:2,letterSpacing:".5px",textTransform:"uppercase"}}>IA Nexus · Prioridade #1</div>
            <div style={{fontSize:13,fontWeight:700,color:K.txt,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{top.assunto}</div>
            <div style={{fontSize:11,color:K.dim,marginTop:1}}>{sug.emoji} {sug.txt}</div>
          </div>
          <span className={b.cls}>{b.emoji} {b.txt}</span>
          <span style={{fontSize:11,color:K.dim,flexShrink:0}}>Ver painel →</span>
        </div>
      );})()}
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
    </div>
  );
};

/* PROCESS LIST PAGE */

const ProcList=({type,st,dp,ss,compact})=>{
  const[vw,sVw]=useState("cards"),[sb,sSb]=useState("score"),[fil,sFil]=useState({}),[showForm,sSF]=useState(null),[chipF,setChipF]=useState("todos");
  const isA=type==="admin",isJ=!isA,raw=isA?st.adm:st.jud;
  const filtered=applyF(raw,fil);
  const chipFiltered = chipF==="todos" ? filtered : chipF==="critico" ? filtered.filter(function(p){return p.diasRestantes>=0&&p.diasRestantes<=2;}) : chipF==="urgente" ? filtered.filter(function(p){return p.diasRestantes>=0&&p.diasRestantes<=5;}) : filtered.filter(function(p){return p.status===chipF;});
  const sorted=[...chipFiltered].sort((a,b)=>sb==="score"?b.score-a.score:sb==="urgency"?a.diasRestantes-b.diasRestantes:toD(a.prazoFinal)-toD(b.prazoFinal));
  const doSave=form=>{if(showForm==="new")dp({type:isA?"ADD_A":"ADD_J",d:form});else dp({type:"UPD",id:showForm.id,isAdm:isA,ch:form});sSF(null)};
  const doDelete=()=>{dp({type:"DEL_P",id:showForm.id});sSF(null)};

  return(
    <div className="cj-pg">
      <div className="cj-up" style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,flexWrap:"wrap"}}>
        <h2 style={{margin:0,fontSize:22,fontWeight:700,color:K.txt}}>{isA?"Processos Administrativos SEI":"Prazos Judiciais"}</h2>
        <Bd color={K.ac}>{chipFiltered.length}/{raw.length}</Bd>
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
        {[["todos","Todos",null],["critico","🚨 Críticos",raw.filter(function(p){return p.diasRestantes>=0&&p.diasRestantes<=2;}).length],["urgente","⚠️ Urgentes",raw.filter(function(p){return p.diasRestantes>=0&&p.diasRestantes<=5;}).length],["Ativo","● Ativos",null],["Em Elaboração","✍ Em Elaboração",null]].map(function(ch){
          var isActive=chipF===ch[0];
          var count=ch[2]!=null?ch[2]:raw.filter(function(p){return p.status===ch[0];}).length;
          if(ch[2]===0&&ch[0]!=="todos")return null;
          return React.createElement("button",{key:ch[0],onClick:function(){setChipF(ch[0]);},style:{padding:"5px 12px",borderRadius:20,border:isActive?"1px solid rgba(0,229,255,.5)":"1px solid rgba(255,255,255,.1)",background:isActive?"rgba(0,229,255,.12)":"transparent",color:isActive?K.txt:K.dim,fontSize:11,fontWeight:isActive?700:400,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",display:"inline-flex",alignItems:"center",gap:5}},
            ch[1], count>0?React.createElement("span",{style:{background:isActive?"rgba(0,229,255,.2)":"rgba(255,255,255,.08)",borderRadius:10,padding:"0 5px",fontSize:10}},count):null
          );
        })}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:0,flexWrap:"wrap"}}>
        <span></span>
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
      </div>
      {vw==="cards"&&<div className="cj-st" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(380px,1fr))",gap:12}}>{sorted.map(p=><PC key={p.id} item={p} onClick={ss} dp={dp} compact={compact}/>)}</div>}
      {vw==="kanban"&&<KanbanV items={sorted} dp={dp} ss={ss}/>}
      {vw==="table"&&<Bx style={{padding:0,overflow:"hidden"}}><div style={{overflowX:"auto"}}><table className="cj-table" style={{width:"100%",fontSize:12}}><thead><tr style={{borderBottom:`1px solid ${K.brd}`}}>{["Nº / SEI","Assunto","Resumo","Prazo","Dias","Score","Status","Fase","Ações"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",color:K.dim,fontWeight:500,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}</tr></thead><tbody>{sorted.map(p=><tr key={p.id} onClick={()=>ss(p)} style={{borderBottom:`1px solid ${K.brd}`,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.02)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        <td style={{padding:"10px 14px",cursor:"pointer"}}><div style={{fontFamily:"'JetBrains Mono',monospace",color:K.ac}}>{p.num||"—"}</div>{p.numeroSEI&&<div style={{fontSize:10,color:K.dim,fontFamily:"'JetBrains Mono',monospace",marginTop:2}}>SEI {p.numeroSEI}</div>}</td>
        <td style={{padding:"10px 14px",color:K.txt,maxWidth:200,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",cursor:"pointer"}}>{p.assunto||"—"}</td>
        <td style={{padding:"10px 14px",color:K.dim,maxWidth:220}}><div style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{isA?(p.interessado||"—"):(p.tribunal||"—")}</div><div style={{fontSize:10,color:K.dim2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginTop:2}}>{isA?(p.orgao||"—"):(p.parteContraria||"—")}</div></td>
        <td style={{padding:"10px 14px",color:K.dim}}>{fmt(p.prazoFinal)}</td>
        <td style={{padding:"10px 14px",fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:uC(p.diasRestantes)}}>{p.diasRestantes}</td>
        <td style={{padding:"10px 14px"}}><SB s={p.score}/></td>
        <td style={{padding:"10px 14px"}}><IS value={p.status} options={STS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:isA,ch:{status:v}})}/></td>
        <td style={{padding:"10px 14px"}}><IS value={p.fase} options={PHS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:isA,ch:{fase:v}})} color={K.ac}/></td>
        <td style={{padding:"10px 14px"}} onClick={e=>e.stopPropagation()}><div style={{display:"flex",gap:8,alignItems:"center"}}><DoneBtn small onClick={()=>dp({type:"COMPLETE_P",id:p.id})}/><button onClick={()=>sSF(p)} style={{background:"none",border:"none",color:K.dim,cursor:"pointer"}}><PenLine size={14}/></button></div></td>
      </tr>)}</tbody></table></div></Bx>}
      {showForm!==null&&<FM key={showForm==="new"?"new":showForm.id} title={showForm==="new"?`Novo ${isA?"Processo":"Prazo"}`:`Editar: ${showForm.assunto||showForm.num||"Item"}`} fields={isA?F_ADM:F_JUD} initial={showForm==="new"?{prazoFinal:addD(NOW,30)}:showForm} onClose={()=>sSF(null)} onSave={doSave} onDelete={showForm!=="new"?doDelete:undefined}/>}
    </div>
  );
};

/* TODAY */
const TodayPg=({st,dp,ss,sp})=>{const all=[...st.adm,...st.jud];const tdI=all.filter(p=>p.dataProv&&diffD(toD(p.dataProv),NOW)<=0).sort((a,b)=>b.score-a.score);const dueToday=all.filter(p=>p.diasRestantes<=0).sort((a,b)=>b.score-a.score);const next3=all.filter(p=>p.diasRestantes>=0&&p.diasRestantes<=3).sort((a,b)=>a.diasRestantes-b.diasRestantes);const tdM=st.reun.filter(r=>diffD(toD(r.data),NOW)===0);const nextS=st.sust.filter(s=>{const d=diffD(toD(s.data),NOW);return d>=0&&d<=7});const noAction=all.filter(p=>!p.proxProv).sort((a,b)=>b.score-a.score);const stale=all.filter(p=>(p.semMov||0)>=7).sort((a,b)=>b.semMov-a.semMov);return(
  <div className="cj-pg">
    <div className="cj-up" style={{display:"flex",alignItems:"center",gap:16,marginBottom:24,flexWrap:"wrap"}}><h2 style={{margin:0,fontSize:22,fontWeight:700,color:K.txt}}>Hoje</h2><span style={{fontSize:14,color:K.dim}}>{NOW.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})}</span></div>
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
      <Bx onClick={()=>wI[0]?ss(wI[0]):sp("priorities")} title="Abrir ranking/prioridades"><SH icon={Flame} title="Ranking"/><div className="cj-st" style={{display:"flex",flexDirection:"column",gap:8}}>{wI.slice(0,8).map((p,i)=><div key={p.id} onClick={e=>{e.stopPropagation();ss(p)}} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",background:i===0?K.crG:"transparent",borderRadius:10,cursor:"pointer"}} onMouseEnter={e=>{if(i)e.currentTarget.style.background="rgba(255,255,255,.03)"}} onMouseLeave={e=>{if(i)e.currentTarget.style.background="transparent"}}><div style={{width:24,height:24,borderRadius:6,background:i<3?K.cr+"20":K.ac+"15",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:i<3?K.cr:K.ac,fontFamily:"'JetBrains Mono',monospace"}}>#{i+1}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:600,color:K.txt,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.assunto}</div></div><div style={{display:"flex",alignItems:"center",gap:6}}><UB d={p.diasRestantes}/><DoneBtn small onClick={()=>dp({type:"COMPLETE_P",id:p.id})}/></div></div>)}</div></Bx>
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
      <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end",flexShrink:0}} onClick={e=>e.stopPropagation()}><SB s={p.score}/><UB d={p.diasRestantes}/><DoneBtn small onClick={()=>dp({type:"COMPLETE_P",id:p.id})}/><IS value={p.fase} options={PHS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:p.tipo==="adm",ch:{fase:v}})} color={K.ac}/></div>
    </div>)}</div>
  </div>
)};

/* WAITING */
const WaitPg=({st,dp,ss})=>{const all=[...st.adm,...st.jud].filter(p=>p.depTerc).sort((a,b)=>b.semMov-a.semMov);return(
  <div className="cj-pg"><div className="cj-up" style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}><h2 style={{margin:0,fontSize:22,fontWeight:700,color:K.txt}}>Aguardando Terceiros</h2><Bd color={K.wa}>{all.length}</Bd></div>
    <div className="cj-st" style={{display:"flex",flexDirection:"column",gap:10}}>{all.map(p=><div key={p.id} onClick={e=>{e.stopPropagation();ss(p)}} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",background:K.card,border:`1px solid ${K.brd}`,borderRadius:12,borderLeft:`3px solid ${p.semMov>=15?K.cr:K.wa}`,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=K.cardH} onMouseLeave={e=>e.currentTarget.style.background=K.card}>
      <div style={{width:48,height:48,borderRadius:10,background:p.semMov>=15?K.crG:K.waG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}><div style={{fontSize:18,fontWeight:800,color:p.semMov>=15?K.cr:K.wa,fontFamily:"'JetBrains Mono',monospace"}}>{p.semMov}</div><div style={{fontSize:9,color:K.dim,textTransform:"uppercase"}}>dias</div></div>
      <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontFamily:"'JetBrains Mono',monospace",color:K.ac}}>{p.num}</div><div style={{fontSize:14,fontWeight:600,color:K.txt,marginTop:2}}>{p.assunto}</div></div>
      <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end"}} onClick={e=>e.stopPropagation()}><UB d={p.diasRestantes}/><DoneBtn small onClick={()=>dp({type:"COMPLETE_P",id:p.id})}/>{p.semMov>=10&&<Bd color={K.cr}><AlertTriangle size={10}/>Cobrar</Bd>}<IS value={p.status} options={STS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:p.tipo==="adm",ch:{status:v}})}/></div>
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

  const sameDay=function(d1,d2){return d1.getFullYear()===d2.getFullYear()&&d1.getMonth()===d2.getMonth()&&d1.getDate()===d2.getDate();};

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
const AnalPg=({st})=>{const all=[...st.adm,...st.jud];const phD=PHS.slice(0,6).map(f=>({name:f.length>12?f.slice(0,12)+"…":f,adm:st.adm.filter(p=>p.fase===f).length,jud:st.jud.filter(p=>p.fase===f).length}));const mt=[{l:"Tempo 1ª Prov.",v:"3.2d",c:K.ac},{l:"Conclusão Semanal",v:"72%",c:K.ac},{l:"Sem Movim. (>7d)",v:all.filter(p=>p.semMov>=7).length,c:K.wa},{l:"Prov. Pendentes",v:all.filter(p=>p.status==="Ativo").length,c:K.cr},{l:"Follow-ups",v:all.filter(p=>p.depTerc).length,c:K.wa},{l:"Conclusão Média",v:"18.5d",c:K.su}];return(
  <div className="cj-pg"><h2 className="cj-up" style={{margin:"0 0 24px",fontSize:22,fontWeight:700,color:K.txt}}>Analytics</h2>
    <div className="cj-st" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(165px,1fr))",gap:12,marginBottom:24}}>{mt.map((m,i)=><Bx key={i} style={{padding:"14px 16px"}}><div style={{fontSize:11,color:K.dim,marginBottom:8,fontWeight:500,textTransform:"uppercase"}}>{m.l}</div><div style={{fontSize:26,fontWeight:700,color:m.c,fontFamily:"'JetBrains Mono',monospace"}}>{m.v}</div></Bx>)}</div>
    <Bx><SH icon={BarChart3} title="Por Fase de Trabalho"/><ResponsiveContainer width="100%" height={250}><BarChart data={phD} layout="vertical" barSize={14}><XAxis type="number" tick={{fill:K.dim2,fontSize:10}} axisLine={false} tickLine={false}/><YAxis dataKey="name" type="category" tick={{fill:K.dim,fontSize:10}} width={100} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:K.modal,border:`1px solid ${K.brd}`,borderRadius:8,color:K.txt,fontSize:12}}/><Bar dataKey="adm" fill={K.ac} name="Admin" radius={[0,4,4,0]}/><Bar dataKey="jud" fill={K.pu} name="Judicial" radius={[0,4,4,0]}/></BarChart></ResponsiveContainer></Bx>
  </div>
)};

/* DETAIL MODAL */
function DetMod(dProps){var p=dProps.item,oc=dProps.onClose,dp=dProps.dp,onEdit=dProps.onEdit,setDjeProc=dProps.setDjeProc,st=dProps.st,ss=dProps.ss;if(!p)return null;const isJ=p.tipo==="jud",isA=p.tipo==="adm";const accent=uC(p.diasRestantes);return(
  <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(2,6,23,.78)",backdropFilter:"blur(10px)",zIndex:1000,display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"34px 20px",overflowY:"auto"}} onClick={e=>{if(e.target===e.currentTarget)oc()}}>
    <div className="cj-sc cj-soft" style={{background:"linear-gradient(180deg,rgba(13,18,35,.98),rgba(8,12,24,.98))",border:`1px solid ${accent}28`,borderRadius:28,width:"100%",maxWidth:1080,padding:0,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:"0 0 auto 0",height:1,background:`linear-gradient(90deg,transparent,${accent},transparent)`}}/>
      <div style={{position:"absolute",top:18,right:18,display:"flex",gap:8,zIndex:2}}>
        <DoneBtn onClick={()=>{dp({type:"COMPLETE_P",id:p.id});oc();}}/>
        {p.linkSEI&&<button onClick={function(){window.open(p.linkSEI,"_blank","noopener,noreferrer");}} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 12px",borderRadius:12,border:"1px solid rgba(0,229,255,.3)",background:"rgba(0,229,255,.08)",color:"#00e5ff",fontSize:13,fontWeight:700,cursor:"pointer",boxShadow:"0 0 14px rgba(0,229,255,.18)",textShadow:"0 0 6px rgba(0,229,255,.6)",fontFamily:"inherit"}}>🗂️ Processo SEI</button>}
        {!isJ&&React.createElement(function(){var[showP,sShowP]=useState(false);return React.createElement(React.Fragment,null,React.createElement("button",{onClick:function(){sShowP(true);},style:{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 12px",borderRadius:12,border:"1px solid rgba(184,77,255,.32)",background:"rgba(184,77,255,.08)",color:"#b84dff",fontSize:13,fontWeight:700,cursor:"pointer",boxShadow:"0 0 12px rgba(184,77,255,.16)",fontFamily:"inherit"}},"📋 Elaborar Parecer"),showP&&React.createElement(ParecerModal,{proc:p,onClose:function(){sShowP(false);}}));},null)}
        {React.createElement(function(){var[showTpl,sShowTpl]=useState(false);return(<><button onClick={()=>sShowTpl(true)} style={{...btnGhost,padding:"8px 12px",color:"#b84dff",borderColor:"rgba(184,77,255,.3)"}}><Zap size={14}/>IA Estrutura</button>{showTpl&&<IATplModal proc={p} onClose={()=>sShowTpl(false)}/>}</>);})}
        <button onClick={()=>onEdit(p)} style={{...btnGhost,padding:"8px 12px"}}><PenLine size={14}/>Editar</button>
        <button onClick={oc} style={{background:"none",border:"none",color:K.dim,cursor:"pointer",padding:10}}><X size={20}/></button>
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
            <h2 style={{margin:0,fontSize:26,fontWeight:800,color:K.txt,lineHeight:1.28,maxWidth:"82%"}}>{p.assunto||"Sem assunto"}</h2>
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}} onClick={e=>e.stopPropagation()}>
          <UB d={p.diasRestantes}/><SB s={p.score}/>
          <IS value={p.status} options={STS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:isA,ch:{status:v}})}/>
          <IS value={p.fase} options={PHS} onChange={v=>dp({type:"UPD",id:p.id,isAdm:isA,ch:{fase:v}})} color={K.ac}/>
          {p.linkRef&&<button onClick={e=>{e.stopPropagation();openRef(p.linkRef)}} style={{...btnGhost,padding:"6px 10px",fontSize:11,color:K.ac,borderColor:K.ac+"44"}}>Abrir link</button>}
        </div>
        {hasCustas(p)&&<div className="cj-custas-blink" style={{marginTop:12,display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:12,background:"rgba(245,158,11,.14)",border:"1px solid rgba(245,158,11,.5)"}}>
          <DollarSign size={16} color={K.wa}/><div><div style={{fontSize:11,fontWeight:800,color:K.wa}}>⚠️ ATENÇÃO: RECOLHIMENTO DE CUSTAS OBRIGATÓRIO</div><div style={{fontSize:10,color:"#fde68a",marginTop:2}}>O recurso "{p.tipoAcao}" exige preparo judicial. Providencie GRU/DARF antes de protocolar, sob pena de deserção.</div></div>
        </div>}
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
            <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:180,overflowY:"auto"}}>
              {p.hist.slice().reverse().slice(0,10).map(function(h,i){return(
                <div key={i} style={{padding:"8px 12px",borderRadius:10,background:"rgba(0,229,255,.04)",border:"1px solid rgba(0,229,255,.08)",fontSize:11}}>
                  <div style={{color:K.dim,fontSize:9,marginBottom:3,fontFamily:"'JetBrains Mono',monospace"}}>{h.data||"—"} · {h.user||"COJUR"}</div>
                  <div style={{color:K.txt}}>{h.txt}</div>
                </div>
              );})}
            </div>
          </div>}
          {isJ&&(function(){var prazo=p.pubDJe?calcPrazoDJe(p.pubDJe,p.intersticio||15):null;var du=prazo?diffD(prazo,NOW):null;var sys=getTribSistema(p.tribunal);return(
            <div style={{marginBottom:22}}>
              <div style={lblSt} onClick={function(){if(setDjeProc&&isJ)setDjeProc(p);}} title="Clique para buscar DJe automaticamente" style={{cursor:isJ?"pointer":"default"}}>Sistema · DJe · Protocolo {isJ?"(clique p/ buscar DJe)":""}</div>
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
      {!itens.length&&<div style={{padding:30,textAlign:"center",color:K.dim2}}>Nenhum processo concluído ainda.</div>}
    </Bx>
  </div>
)};

/* SETTINGS */
const SettPg=({dp})=>{const[conf,sConf]=useState(false);return(
  <div className="cj-pg"><h2 className="cj-up" style={{margin:"0 0 24px",fontSize:22,fontWeight:700,color:K.txt}}>Configurações</h2><Bx>
    <div style={{padding:"10px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      {!conf?(<><span style={{fontSize:13,color:K.txt}}>Resetar todos os dados</span><button style={btnDanger} onClick={()=>sConf(true)}><Trash2 size={14}/>Resetar</button></>):(
        <><span style={{fontSize:13,color:K.cr}}>Tem certeza? Todos os dados serão perdidos.</span><div style={{display:"flex",gap:8}}><button style={btnDanger} onClick={()=>{dp({type:"RST"});sConf(false);try{storage.delete(STORE_KEY).catch(()=>{})}catch(e){}}}>Sim, resetar</button><button style={btnGhost} onClick={()=>sConf(false)}>Cancelar</button></div></>
      )}
    </div>
    <div style={{fontSize:13,color:K.dim,marginTop:16,lineHeight:1.8}}><strong style={{color:K.txt}}>COJUR Nexus v6</strong> — Painel operacional do dia, prazos em dias corridos, checklist por tipo de peça, campos SEI/link/responsável, filtros rápidos e alertas inteligentes.</div>
  </Bx></div>
)};

/* ═══ MAIN ═══ */


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
    fetch("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/ai-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({max_tokens:1000,messages:[{role:"user",content:iaPrompt}]})})
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
      {!items.length&&<div style={{textAlign:"center",padding:60,color:K.dim2}}>
        <div style={{fontSize:48,marginBottom:12}}>✅</div>
        <div style={{fontSize:15,fontWeight:700,color:K.txt}}>Nenhum processo pendente de protocolo</div>
        <div style={{fontSize:12,color:K.dim,marginTop:6}}>Quando o chefe do contencioso aprovar uma peça, ela aparecerá aqui</div>
      </div>}
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
                <UB d={p.diasRestantes}/>
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
      {!items.length&&<div style={{textAlign:"center",padding:60,color:K.dim2}}>
        <div style={{fontSize:48,marginBottom:12}}>✅</div>
        <div style={{fontSize:15,fontWeight:700,color:K.txt}}>Nenhuma peça em fase de correção</div>
        <div style={{fontSize:12,color:K.dim,marginTop:6}}>Quando uma peça for retornada pelo chefe, ela aparecerá aqui</div>
      </div>}
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
                <UB d={p.diasRestantes}/>
                <button onClick={function(){dp({type:"UPD",id:p.id,isAdm:p.tipo==="adm",ch:{status:"Pronto p/ Protocolo"}});}} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"7px 12px",borderRadius:11,border:"1px solid rgba(0,255,136,.35)",background:"rgba(0,255,136,.08)",color:"#00ff88",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
                  <Upload size={12}/>Mover p/ Protocolar
                </button>
                <button onClick={function(){}} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 10px",borderRadius:10,border:"1px solid rgba(255,184,0,.25)",background:"rgba(255,184,0,.06)",color:"#ffb800",fontSize:10,fontWeight:700,cursor:"pointer"}} onClick={()=>ss(p)}>
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

const NAV=[{id:"dashboard",icon:LayoutDashboard,label:"Dashboard"},{id:"today",icon:Target,label:"Hoje"},{id:"week",icon:CalendarDays,label:"Esta Semana"},{id:"priorities",icon:Flame,label:"Prioridades"},{id:"ia",icon:Zap,label:"IA Nexus"},{id:"admin",icon:FolderOpen,label:"Administrativos"},{id:"judicial",icon:Scale,label:"Judiciais"},{id:"execucao",icon:Zap,label:"Em Execução"},{id:"acompanhamento",icon:Eye,label:"Em Acompanhamento"},{id:"protocolar",icon:Upload,label:"Protocolar"},{id:"correcao",icon:PenLine,label:"Em Correção"},{id:"done",icon:CheckCircle,label:"Realizados"},{id:"agenda",icon:Calendar,label:"Agenda"},{id:"calendar",icon:CalendarDays,label:"Calendário"},{id:"timeline",icon:Activity,label:"Timeline Prazos"},{id:"waiting",icon:Users,label:"Aguardando"},{id:"inbox",icon:Inbox,label:"Caixa de Entrada"},{id:"lembretes",icon:Bell,label:"Lembretes"},{id:"mural",icon:StickyNote,label:"Mural"},{id:"analytics",icon:BarChart3,label:"Analytics"},{id:"settings",icon:Settings,label:"Configurações"}];

export default function App() {
  const [st, dp0] = useReducer(reducer, null, mkInit);
  const dp = function(action){
    setUndoStack(function(prev){return [...prev.slice(-9),{action,snapshot:st}];});
    dp0(action);
    if(action.type==="ADD_J"||action.type==="ADD_A") showToast("Processo cadastrado com sucesso","success");
    if(action.type==="UPD"&&action.ch&&action.ch.status==="Concluído") showToast("Processo marcado como concluído","success");
    if(action.type==="DEL") showToast("Processo removido","warn");
  };
  const [pg, sPg] = useState("dashboard");
  const [sel, sSel] = useState(null);
  const [editForm, sEF] = useState(null);
  const [sq, sSq] = useState("");
  const [fChip, setFChip] = React.useState("todos");
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
  const handleImport = function(file) { importState(file, dp, function(res){ showToast(res === "ok" ? "ok" : "err", res === "ok" ? "Estado importado com sucesso" : "Arquivo JSON inválido"); }); };

  useEffect(() => { injectCSS(); }, []);
  useEffect(() => {
    document.body.style.background = K.bg;
    document.body.style.color = K.txt;
  }, [darkMode]);

  // Load persisted state on mount
  const [loaded, setLoaded] = useState(false);
  const [showCmdPalette, setShowCmdPalette] = React.useState(false);
  const [syncStatus, setSyncStatus] = useState('ok'); // 'ok' | 'saving' | 'error'
  const [liveTime, setLiveTime] = React.useState(new Date());
  var lastSyncRef = React.useRef(null);
  const [showQuickAdd, setShowQuickAdd] = React.useState(false);
  const [showEtiquetas, setShowEtiquetas] = React.useState(false);
  const [showEmailAlert, setShowEmailAlert] = React.useState(false);
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
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await Promise.race([
          dbGet(),
          new Promise(function(res){ setTimeout(function(){ res(null); }, 3000); })
        ]);
        if (!cancelled && result) {
          const restored = rehydrate(typeof result === 'string' ? result : JSON.stringify(result));
          dp({ type: "LOAD", state: restored });
        }
      } catch (e) {}
      if (!cancelled) setLoaded(true);
    })();
    return function(){ cancelled = true; };
  }, []);

  // Save to localStorage on every change (fast, synchronous)
  useEffect(() => {
    if (!loaded) return;
    try {
      var data = serialize(st);
      localStorage.setItem(STORE_KEY, data);
    } catch(e) {}
  }, [st, loaded]);

  // Sync to Supabase every 10 seconds
  var syncToSupabase = function(stateData) {
    setSyncStatus('saving');
    fetch(STATE_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({data: stateData})
    }).then(function(r) {
      setSyncStatus(r.ok ? 'ok' : 'error');
      if (r.ok) { lastSyncRef.current = new Date(); showToast("Dados sincronizados com Supabase","success"); }
      else showToast("Erro ao sincronizar com Supabase","error");
    }).catch(function() { setSyncStatus('error'); showToast("Erro de conexão ao salvar","error"); });
  };

  useEffect(() => {
    if (!loaded) return;
    var interval = setInterval(function() {
      try { syncToSupabase(serialize(st)); } catch(e) {}
    }, 10000);
    return function() { clearInterval(interval); };
  }, [st, loaded]);

  // Live clock for countdown
  useEffect(() => {
    var tick = setInterval(function(){ setLiveTime(new Date()); }, 60000);
    return function(){ clearInterval(tick); };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    var handleKey = function(e) {
      var isInput = ['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName);
      if ((e.ctrlKey||e.metaKey) && e.key === 'k') { e.preventDefault(); setShowCmdPalette(function(v){return !v;}); }
      if ((e.ctrlKey||e.metaKey) && e.key === 'n') { e.preventDefault(); setShowQuickAdd(true); }
      if ((e.ctrlKey||e.metaKey) && e.key === 's') { e.preventDefault(); try{syncToSupabase(serialize(st));}catch(ex){} }
      if (!isInput && e.key === 'f') { setFocusMode(function(v){return !v;}); }
      if (e.key === 'Escape') { setShowCmdPalette(false); setShowQuickAdd(false); setShowEtiquetas(false); setShowEmailAlert(false); setShowHistory(false); }
    };
    window.addEventListener('keydown', handleKey);
    return function() { window.removeEventListener('keydown', handleKey); };
  }, [st]);

  // Save to Supabase on page close
  useEffect(() => {
    var saveNow = function() {
      try {
        var data = serialize(st);
        localStorage.setItem(STORE_KEY, data);
        navigator.sendBeacon(STATE_URL, new Blob([JSON.stringify({data: data})], {type:'application/json'}));
      } catch(e) {}
    };
    window.addEventListener('beforeunload', saveNow);
    return function() { window.removeEventListener('beforeunload', saveNow); };
  }, [st]);

  // Sync selected process with state
  useEffect(() => {
    if (!sel) return;
    const all = [...st.adm, ...st.jud];
    const u = all.find(p => p.id === sel.id);
    if (u) sSel(u);
  }, [st]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      if (e.metaKey || e.ctrlKey) return;
      switch(e.key) {
        case 'z': if(e.metaKey||e.ctrlKey){e.preventDefault();setUndoStack(function(prev){if(!prev.length)return prev;var last=prev[prev.length-1];dp0({type:'LOAD',state:last.snapshot});return prev.slice(0,-1);});} break;
        case '/': e.preventDefault(); document.querySelector('input[placeholder*="Buscar"]') && document.querySelector('input[placeholder*="Buscar"]').focus(); break;
        case 'Escape': sSel(null); setShowGmail(false); setShowDecisao(false); setShowRevisao(false); break;
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

  const all = useMemo(() => [...st.adm, ...st.jud], [st]);
  const cn = all.filter(p => p.diasRestantes <= 10).length;
  const prazoUrgente = all.filter(function(p){return p.diasRestantes>=0&&p.diasRestantes<=2&&!["Concluído","Arquivado","Suspenso"].includes(p.status);});
  const sr = useMemo(() => {
    if (!sq.trim()) return [];
    const q = sq.toLowerCase();
    return all.filter(p => (p.num||"").toLowerCase().includes(q) || (p.numeroSEI||"").toLowerCase().includes(q) || (p.assunto||"").toLowerCase().includes(q) || (p.orgao||"").toLowerCase().includes(q) || (p.interessado||"").toLowerCase().includes(q) || (p.parteContraria||"").toLowerCase().includes(q) || (p.tags||[]).some(t=>t.includes(q))||(p.tipoPeca||"").toLowerCase().includes(q)||(p.tribunal||"").toLowerCase().includes(q)).slice(0,10);
  }, [sq, all]);

  const handleEdit = p => { sEF(p); sSel(null); };
  const handleEditSave = form => { dp({ type: "UPD", id: editForm.id, isAdm: editForm.tipo === "adm", ch: form }); sEF(null); };
  const handleEditDel = () => { dp({ type: "DEL_P", id: editForm.id }); sEF(null); };

  // Sound alert for critical deadlines
  useEffect(function(){
    if(prazoUrgente&&prazoUrgente.length>0){
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


  // Breadcrumb label
  var PAGE_LABELS = {dashboard:"Dashboard","today":"Plano do Dia",week:"Semana",priorities:"Prioridades",ia:"IA Nexus",admin:"Processos Adm.",judicial:"Processos Jud.",execucao:"Em Execução",acompanhamento:"Acompanhamento",protocolar:"A Protocolar",correcao:"Em Correção",done:"Realizados",agenda:"Agenda",calendar:"Calendário",timeline:"Timeline",stats:"Estatísticas"};
  var currentPageLabel = PAGE_LABELS[pg] || pg;
  const rP = () => {
    const pp = { st, dp, ss: sSel, sp: sPg, compact: compactMode };
    switch (pg) {
      case "dashboard": return <DashPg {...pp} />;
      case "today": return <TodayPg {...pp} />;
      case "week": return <WeekPg {...pp} />;
      case "priorities": return <PrioPg {...pp} />;
      case "ia": return <IAPainel {...pp} />;
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
      case "settings": return <SettPg {...pp} />;
      default: return <DashPg {...pp} />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: K.bg, fontFamily: "'Outfit','Segoe UI',system-ui,sans-serif", color: K.txt, overflow: "hidden", position:"relative", isolation:"isolate" }}>
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

      {/* PRAZO URGENTE BANNER */}
      {prazoUrgente && prazoUrgente.length > 0 && (
        <div style={{position:"absolute",top:60,left:0,right:0,zIndex:200,background:"linear-gradient(90deg,rgba(255,46,91,.95),rgba(220,38,68,.95))",borderBottom:"1px solid rgba(255,100,130,.4)",padding:"6px 20px",display:"flex",alignItems:"center",gap:12,animation:"pulse 2s infinite"}}>
          <span style={{fontSize:14}}>🚨</span>
          <span style={{fontSize:12,fontWeight:700,color:"#fff",fontFamily:"Orbitron,sans-serif",letterSpacing:".3px"}}>
            {prazoUrgente.length} PROCESSO{prazoUrgente.length>1?"S":""} COM PRAZO CRÍTICO:
          </span>
          <div style={{display:"flex",gap:8,flex:1,overflowX:"auto"}}>
            {prazoUrgente.slice(0,3).map(function(p){return(
              <span key={p.id} onClick={function(){sS(p);}} style={{whiteSpace:"nowrap",fontSize:11,color:"rgba(255,255,255,.9)",background:"rgba(0,0,0,.2)",padding:"2px 8px",borderRadius:6,cursor:"pointer"}}>
                {p.assunto.slice(0,30)}... ({p.diasRestantes===0?"HOJE":p.diasRestantes+"du"})
              </span>
            );})}
          </div>
          <span style={{fontSize:10,color:"rgba(255,255,255,.7)",whiteSpace:"nowrap"}}>Clique para abrir</span>
        </div>
      )}

      {/* SIDEBAR */}
      <div style={{ width: focusMode ? 0 : col ? 64 : 220, overflow:"hidden", background: "linear-gradient(180deg, rgba(2,5,16,.99), rgba(3,7,22,.99))", borderRight: focusMode ? "none" : "1px solid rgba(0,212,255,.1)", boxShadow:"2px 0 24px rgba(0,0,0,.5), 1px 0 0 rgba(0,229,255,.06)", display: "flex", flexDirection: "column", transition: "width .3s ease", flexShrink: 0, overflow: "hidden", position:"relative" }}>
        <div style={{ padding: col ? "18px 10px" : "18px 18px", borderBottom: "1px solid rgba(0,212,255,.1)", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", background:"linear-gradient(135deg, rgba(0,229,255,.06), rgba(168,85,247,.04))" }} onClick={() => sCol(!col)}>
          <CFMMark size={38} />
          {!col && <div style={{minWidth:0}}>
            <div style={{ fontSize: 15, fontWeight: 800, color: K.txt, letterSpacing:".15px", textShadow:"0 0 12px rgba(0,229,255,.5)",fontFamily:"Orbitron, sans-serif",letterSpacing:"1px" }}>COJUR</div>
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
        <div style={{ height: 68, borderBottom: "1px solid rgba(0,212,255,.12)", display: "flex", alignItems: "center", padding: "0 24px", gap: 16, flexShrink: 0, background: "linear-gradient(180deg, rgba(2,5,16,.97), rgba(2,5,14,.88))", backdropFilter: "blur(24px)", boxShadow:"0 1px 0 rgba(0,212,255,.15), 0 4px 28px rgba(0,0,0,.5)", position:"relative", zIndex:1 }}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginRight:4}}>
            <CFMMark size={34}/>
            <div style={{display:"flex",flexDirection:"column"}}>
              <span style={{fontSize:14,fontWeight:800,background:"linear-gradient(90deg, #e2e8f0, #00d4ff, #a855f7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontFamily:"Orbitron, sans-serif",letterSpacing:"1px"}}>COJUR NEXUS</span>
              <span style={{fontSize:9,color:"#00e5ff",fontWeight:700,letterSpacing:"1.8px",textTransform:"uppercase",textShadow:"0 0 8px rgba(0,212,255,.6)"}}>CFM · Centro de Comando Jurídico</span>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#4e6a8a",fontFamily:"Orbitron,sans-serif",letterSpacing:".5px"}}>
            <span style={{color:"rgba(0,229,255,.4)"}}>COJUR</span>
            <span style={{color:"rgba(0,229,255,.2)"}}>›</span>
            <span style={{color:"#00e5ff",fontWeight:700}}>{currentPageLabel}</span>
          </div>
          <div style={{ position: "relative", flex: 1, maxWidth: 520 }}>
            <Search size={16} color={K.dim2} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input style={{ ...inpSt, paddingLeft: 40, height: 44, borderRadius: 14 }} value={sq} onChange={e => { sSq(e.target.value); sSo(true); }} onFocus={() => sSo(true)} placeholder="Buscar processos, prazos, SEI, parte, órgão..." onBlur={() => setTimeout(() => sSo(false), 200)} />
            {so && sq && sr.length > 0 && (
              <div className="cj-sc" style={{ position: "absolute", top: 44, left: 0, right: 0, background: K.modal, border: `1px solid ${K.brd}`, borderRadius: 12, padding: 8, zIndex: 100, maxHeight: 400, overflowY: "auto", boxShadow: "0 20px 40px rgba(0,0,0,.5)" }}>
                {sr.map(p => (
                  <div key={p.id} onClick={() => { sSel(p); sSo(false); sSq(""); }} style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    {p.tipo === "jud" ? <Scale size={14} color={K.pu} /> : <FolderOpen size={14} color={K.ac} />}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: K.ac, fontFamily: "'JetBrains Mono',monospace" }}>{p.num}{p.numeroSEI?` · SEI ${p.numeroSEI}`:""}</div>
                      <div style={{ fontSize: 12, color: K.txt, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.assunto}</div>
                      <div style={{ fontSize: 10, color: K.dim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.tipo==="jud"?`${p.tribunal||"—"} · ${p.parteContraria||"—"}`:`${p.interessado||"—"} · ${p.orgao||"—"}`}</div>
                    </div>
                    <UB d={p.diasRestantes} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, flexWrap:"wrap", justifyContent:"flex-end" }}>
            <Bd color={K.ac}><Clock size={10}/>{NOW.toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" })}</Bd>
            <button style={{ ...btnGhost, padding: "8px 12px", color: K.ac, borderColor: "rgba(6,182,212,.25)" }} onClick={handleExport}><Download size={14}/>Exportar JSON</button>
            <button style={{ ...btnGhost, padding: "8px 12px", color: K.ac, borderColor: "rgba(6,182,212,.25)" }} onClick={() => importRef.current && importRef.current.click()}><Upload size={14}/>Importar JSON</button>
            <button onClick={function(){setShowDecisao(true);}} title="Resumo de Decisão Judicial (IA)" style={{width:40,height:40,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(168,85,247,.18)",background:"rgba(168,85,247,.05)",cursor:"pointer",fontSize:17}}>⚖️</button>
            <button onClick={function(){setShowRevisao(true);}} title="Revisão de Peça (IA)" style={{width:40,height:40,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(0,255,136,.18)",background:"rgba(0,255,136,.05)",cursor:"pointer",fontSize:17}}>✏️</button>
            <button onClick={function(){setFocusMode(function(v){return !v;});}} title="Salvar agora no Supabase" onClick={function(){try{syncToSupabase(serialize(st));}catch(e){}}} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 10px",borderRadius:12,border:"1px solid "+(syncStatus==="ok"?"rgba(0,255,136,.25)":syncStatus==="saving"?"rgba(255,184,0,.35)":"rgba(255,46,91,.35)"),background:syncStatus==="ok"?"rgba(0,255,136,.06)":syncStatus==="saving"?"rgba(255,184,0,.06)":"rgba(255,46,91,.06)",cursor:"pointer",flexShrink:0}}>
              <span style={{fontSize:10,fontWeight:700,fontFamily:"Orbitron,monospace",color:syncStatus==="ok"?"#00ff88":syncStatus==="saving"?"#ffb800":"#ff2e5b"}}>
                {syncStatus==="ok"?"💾":syncStatus==="saving"?"⏳":"⚠️"}
              </span>
            </button>
            <button title="Modo Foco (F) — Oculta sidebar" style={{width:40,height:40,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",border:focusMode?"1px solid rgba(168,85,247,.5)":"1px solid rgba(168,85,247,.2)",background:focusMode?"rgba(168,85,247,.15)":"rgba(168,85,247,.05)",cursor:"pointer",fontSize:17}}>🎯</button>
            <button onClick={function(){setShowGmail(true);}} title="Gmail SEI — Buscar e importar processos" style={{width:40,height:40,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(0,229,255,.18)",background:"rgba(0,229,255,.05)",cursor:"pointer",fontSize:17}}>📧</button>
            <button onClick={function(){setShowEmailAlert(true);}} title="Alerta de prazos por email" style={{width:40,height:40,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(34,211,238,.2)",background:"rgba(34,211,238,.05)",cursor:"pointer",fontSize:17}}>📧</button>
            <button onClick={function(){setShowEtiquetas(true);}} title="Etiquetas personalizadas" style={{width:40,height:40,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(168,85,247,.2)",background:"rgba(168,85,247,.05)",cursor:"pointer",fontSize:17}}>🏷️</button>
            <button onClick={function(){setShowQuickAdd(true);}} title="Cadastro rápido ⚡" style={{width:40,height:40,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(0,229,255,.2)",background:"rgba(0,229,255,.05)",cursor:"pointer",fontSize:17}}>⚡</button>
            <button onClick={function(){setShowIANovo(true);}} title="Novo processo via IA" style={{width:40,height:40,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(0,229,255,.18)",background:"rgba(0,229,255,.05)",cursor:"pointer",fontSize:17}}>>🤖</button>
            <button onClick={function(){setCompactMode(function(c){return !c;});}} title="Modo Compacto" style={{width:40,height:40,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",border:compactMode?"1px solid rgba(0,229,255,.5)":"1px solid rgba(0,229,255,.15)",background:compactMode?"rgba(0,229,255,.1)":"transparent",cursor:"pointer",fontSize:15}}>☰</button>
            <button onClick={function(){setDarkMode(function(d){return !d;});}} title={darkMode?"Modo Claro":"Modo Escuro"} style={{width:40,height:40,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",border:darkMode?"1px solid rgba(255,184,0,.3)":"1px solid rgba(2,132,199,.3)",background:darkMode?"rgba(255,184,0,.08)":"rgba(2,132,199,.08)",cursor:"pointer",boxShadow:darkMode?"0 0 14px rgba(255,184,0,.22)":"0 0 14px rgba(2,132,199,.22)"}}>
              {darkMode?<Sun size={17} color="#ffb800" style={{filter:"drop-shadow(0 0 5px rgba(255,184,0,.8))"}}/>:<Moon size={17} color="#0284c7" style={{filter:"drop-shadow(0 0 5px rgba(2,132,199,.8))"}}/> }
            </button>
            <div style={{ position: "relative", cursor: "pointer", width:40, height:40, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid rgba(0,229,255,.18)", background:"rgba(0,229,255,.06)", boxShadow:"0 0 12px rgba(0,229,255,.18)" }}>
              <Bell size={18} color="#00e5ff" style={{filter:"drop-shadow(0 0 4px rgba(0,212,255,.7))"}} />
              {cn > 0 && <div className="cj-pulse" style={{ position: "absolute", top: -4, right: -2, minWidth: 16, height: 16, padding:"0 4px", borderRadius: 999, background: K.cr, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#fff" }}>{cn}</div>}
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>{loaded ? React.createElement("div",{key:pg,className:"cj-page-enter",style:{width:"100%",height:"100%"}},rP()) : React.createElement(SkeletonDashboard, null)}</div>
      </div>

      {/* MODALS */}
      {showGmail&&<GmailSEIModal dp={dp} onClose={function(){setShowGmail(false);}}/>}
      {minutaProc!==null&&<MinutaModal proc={minutaProc} onClose={function(){setMinutaProc(null);}}/> }
      {showStats&&<StatsModal st={st} onClose={function(){setShowStats(false);}}/> }
      {showSemanal&&<RelatorioSemanalModal st={st} onClose={function(){setShowSemanal(false);}}/> }}
      {djeProc&&<DjeAutoModal proc={djeProc} dp={dp} onClose={function(){setDjeProc(null);}}/> }
      {showIANovo&&<IANovoProcessoModal dp={dp} onClose={function(){setShowIANovo(false);}}/> }
      {showQuickAdd&&<QuickAddModal dp={dp} onClose={function(){setShowQuickAdd(false);}}/> }
      {showEtiquetas&&<EtiquetasModal st={st} dp={dp} onClose={function(){setShowEtiquetas(false);}}/> }
      {showEmailAlert&&<EmailAlertModal st={st} onClose={function(){setShowEmailAlert(false);}}/> }
      <ToastContainer/>
      {showCmdPalette&&<CmdPalette st={st} dp={dp} sPg={sPg} sSel={sSel} setShowQuickAdd={setShowQuickAdd} setShowEtiquetas={setShowEtiquetas} setShowHistory={setShowHistory} syncToSupabase={syncToSupabase} onClose={function(){setShowCmdPalette(false);}}/> }
      {checklistProc&&<ChecklistModal proc={checklistProc} onClose={function(){setChecklistProc(null);}} onConfirm={function(){dp({type:"COMPLETE_P",id:checklistProc.id});dp({type:"UPD",id:checklistProc.id,isAdm:checklistProc.tipo==="adm",ch:{status:"Concluído"}});setChecklistProc(null);}}/>}
      {showDecisao&&<DecisaoModal onClose={function(){setShowDecisao(false);}}/>}
      {showRevisao&&<RevisaoModal onClose={function(){setShowRevisao(false);}}/>}
      {sel && <DetMod item={sel} onClose={() => sSel(null)} dp={dp} onEdit={handleEdit} setDjeProc={setDjeProc} st={st} ss={sSel} />}
      {editForm && <FM key={editForm.id} title={`Editar: ${editForm.assunto || editForm.num || "Item"}`} fields={editForm.tipo === "adm" ? F_ADM : F_JUD} initial={editForm} onClose={() => sEF(null)} onSave={handleEditSave} onDelete={handleEditDel} />}
      {!focusMode&&<div style={{position:"fixed",bottom:14,left:col?80:230,zIndex:100,display:"flex",gap:8,flexWrap:"wrap"}}>
        {[["H","Hoje"],["P","Prioridades"],["I","IA Nexus"],["C","Calendário"],["T","Timeline"],["F","Foco"],["Z","Desfazer"],["Esc","Fechar"]].map(function(k){return(
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
    fetch("https://vcxastdcsbzdsfcdbtan.supabase.co/functions/v1/ai-proxy",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})
    })
    .then(function(r){return r.json();})
    .then(function(d){
      var txt=(d.content||[]).map(function(b){return b.type==="text"?b.text:"";}).join("\n").trim();
      sResult(txt||"Nenhuma resposta gerada.");
      sLoad(false);
    })
    .catch(function(e){sErr("Erro ao conectar com a IA.");sLoad(false);});
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
        {loading&&<div style={{textAlign:"center",padding:"32px 0",color:"#00e5ff"}}>
          <div className="cj-pulse" style={{fontSize:32,marginBottom:12}}>🧠</div>
          <div style={{fontSize:13,fontFamily:"Orbitron,sans-serif",letterSpacing:"1px"}}>Gerando estrutura...</div>
        </div>}
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
      {!items.length&&<div style={{textAlign:"center",padding:60}}><Zap size={48} color={K.dim2}/><div style={{fontSize:16,fontWeight:700,color:K.txt,marginTop:16,marginBottom:8}}>Nenhum processo em execução</div><div style={{fontSize:12,color:K.dim}}>Altere o status de um processo para "Em Execução"</div></div>}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
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
      {!items.length&&<div style={{textAlign:"center",padding:60}}><Eye size={48} color={K.dim2}/><div style={{fontSize:16,fontWeight:700,color:K.txt,marginTop:16,marginBottom:8}}>Nenhum processo em acompanhamento</div><div style={{fontSize:12,color:K.dim}}>Altere o status e informe o motivo do acompanhamento</div></div>}
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

