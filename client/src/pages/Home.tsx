import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  GraduationCap,
  Home as HomeIcon,
  Lock,
  LogOut,
  Menu,
  Play,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

const IMAGE_BASE = "https://tojwhfywmvrkvyipsndy.supabase.co/storage/v1/object/public/module-images/";
const modules = [
  ["Nível A1", "1782047494712-28fml4vdtch.webp", true],
  ["Nível A2", "1782047766603-0reuzaiwbxvk.webp", true],
  ["Nível B1", "1782047777861-yljq3y1cikr.webp", true],
  ["Nível B2", "1782047787212-yvzfpe0hzr.webp", true],
  ["Nível C1", "1782047799326-wyp5etp3w7.webp", false, "Libera em 3 dias"],
  ["Nível C2", "1782047821193-ur1jcysxjy.webp", false, "Libera em 4 dias"],
  ["82 Ebooks e Audiobooks", "1782048281110-ahb5vkme35w.webp", true],
  ["500 Frases em Inglês", "1782048296067-dwiokvyvlu6.webp", true],
  ["Rota da Fluência", "1782048312315-gkhulcttogd.webp", true],
  ["100 Phrasal Verbs", "1782048326667-9ma8ykp3a2g.webp", true],
  ["150 Expressões e Gírias", "1782048338226-pu5b5ixk24.webp", true],
  ["100 Exercícios Nível A1-A2", "1782309376520-fvne52bkxva.webp", true],
  ["100 Exercícios Nível B1-B2", "1783009004003-guvfw9tfjz6.png", true],
  ["100 Exercícios Nível C1-C2", "1783171857768-8n7y1c8if6y.jpg", true],
] as const;
const shorts = [
  ["Nível A1", "1774958958138-35j1sovqpra.jpg", true],
  ["Nível A1+", "1774967033482-2a3p2bzu2zm.jpg", true],
  ["Nível B1", "1774967066873-6glr2qrpchb.jpg", true],
  ["Nível B1+", "1774967097687-4ld5bijikx2.jpg", true],
  ["Nível B2", "1774967141669-lwhcv2qk8tl.jpg", false, "Libera em 1 dia"],
  ["Nível B2+", "1774967190558-q9y6yz2lfq8.jpg", false, "Libera em 2 dias"],
  ["Nível C1", "1774967222494-dmy8oohxca.jpg", false, "Libera em 4 dias"],
] as const;

function Header({ onMenu }: { onMenu: () => void }) {
  const [, navigate] = useLocation();
  return <header className="topbar">
    <div className="topbar-inner">
      <button className="mobile-menu" onClick={onMenu} aria-label="Abrir menu"><Menu size={20} /></button>
      <Link href="/dashboard" className="brand"><span className="brand-mark"><GraduationCap size={20} /></span><strong>Fluente com Legenda</strong></Link>
      <nav className="nav-links"><Link href="/dashboard"><HomeIcon size={15} /> Início</Link><Link href="/modules"><BookOpen size={15} /> Módulos</Link><Link href="/ajuda"><CircleHelp size={15} /> Ajuda</Link></nav>
      <button className="profile" onClick={() => navigate("/auth")}><span className="avatar">FD</span><span><b>Fernando</b><small>Student</small></span><ChevronRight size={15} /></button>
    </div>
  </header>;
}

function MobileNav({ close }: { close: () => void }) { return <div className="mobile-overlay"><div className="mobile-drawer"><button onClick={close} className="drawer-close"><X size={21}/></button><div className="brand drawer-brand"><span className="brand-mark"><GraduationCap size={20}/></span><strong>Fluente com Legenda</strong></div><Link onClick={close} href="/dashboard"><HomeIcon size={18}/> Início</Link><Link onClick={close} href="/modules"><BookOpen size={18}/> Módulos</Link><Link onClick={close} href="/ajuda"><CircleHelp size={18}/> Ajuda</Link><button className="drawer-logout" onClick={() => { close(); window.location.href = "/auth"; }}><LogOut size={18}/> Sair</button></div></div>; }

function ModuleCard({ item, index }: { item: readonly [string, string, boolean, string?]; index: number }) {
  const [title, image, open, release] = item;
  return <Link href={open ? `/lesson/${index + 1}` : "/modules"} className={`module-card ${!open ? "is-locked" : ""}`}>
    <div className="module-image"><img src={IMAGE_BASE + image} alt={title} />{!open && <div className="lock-layer"><Lock size={22}/><span>{release}</span></div>}<span className="module-number">{String(index + 1).padStart(2,"0")}</span></div>
    <div className="module-meta"><b>{title}</b><span>{open ? <><Play size={12} fill="currentColor"/> Assistir</> : <><Lock size={12}/> Bloqueado</>}</span></div>
  </Link>;
}

function Section({ title, items, start = 0 }: { title: string; items: readonly (readonly [string,string,boolean,string?])[]; start?: number }) { return <section className="content-section"><div className="section-title"><h2>{title}</h2><span>{items.length} módulos</span></div><div className="module-grid">{items.map((item, i) => <ModuleCard key={item[0]} item={item} index={start + i}/>)}</div></section>; }

function Dashboard() { return <><Header onMenu={() => {}} /><main className="page dashboard-page"><div className="hero-row"><div><span className="eyebrow-pill"><Sparkles size={12}/> Área do Aluno</span><h1>Olá, Fernando!</h1><p>Continue sua jornada de aprendizado de onde parou hoje.</p><div className="hero-actions"><Link href="/modules" className="primary-btn"><Play size={16} fill="currentColor"/> Continuar estudando</Link><Link href="/modules" className="outline-btn"><BookOpen size={16}/> Ver módulos</Link></div></div><div className="progress-card"><div className="progress-card-head"><span>SEU PROGRESSO</span><b>0%</b></div><strong>0 <small>/ 117 aulas</small></strong><div className="progress-track"><i style={{width:"0%"}} /></div><span>117 aulas restantes</span></div></div>
  <Link href="/quiz/english-level" className="feature-banner level-banner"><span className="feature-icon"><GraduationCap size={20}/></span><div><small>NOVO</small><b>Descubra seu nível de inglês</b><p>Faça um quiz rápido de 15 perguntas (~5 min) e veja onde você está no CEFR.</p></div><ArrowRight size={17}/></Link>
  <Link href="/bonus" className="feature-banner bonus-banner"><span className="feature-icon"><Sparkles size={20}/></span><div><small>CONTEÚDOS EXCLUSIVOS</small><b>Seus bônus do curso</b><p>Desafio dos 5 minutos · 10 Frases Universais</p></div><ArrowRight size={17}/></Link>
  <div className="stats-row"><div className="stat stat-green"><CheckCircle2 size={20}/><div><strong>0</strong><span>Concluídas</span></div></div><div className="stat stat-yellow"><Sparkles size={20}/><div><strong>0%</strong><span>Progresso</span></div></div></div>
  <div className="overall"><div><b>Progresso geral do curso</b><strong>0%</strong></div><p>0 de 117 aulas concluídas</p><div className="progress-track"><i style={{width:"0%"}} /></div></div>
  <Section title="Mapas Mentais" items={modules} /><Section title="Vídeos Curtos" items={shorts} start={14}/></main></>; }

function Modules() { return <><Header onMenu={() => {}} /><main className="page modules-page"><div className="page-heading"><div><span className="eyebrow">CONTEÚDO</span><h1>Módulos do curso</h1></div><span className="available">21 módulos disponíveis</span></div><Section title="Mapas Mentais" items={modules}/><Section title="Vídeos Curtos" items={shorts} start={14}/></main></>; }

function Login() { const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); return <main className="auth-page"><div className="auth-box"><div className="auth-logo"><GraduationCap size={28}/></div><h1>Fluente com Legenda</h1><p>Entre para acessar suas aulas</p><form onSubmit={(e) => {e.preventDefault(); window.location.href=`${import.meta.env.BASE_URL}dashboard`;}}><label>Email<input type="email" placeholder="seu@email.com" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Senha<input type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button className="primary-btn" type="submit">Entrar na plataforma</button></form><small>© Fluente com Legenda. Todos os direitos reservados.</small></div></main>; }

export default function Home({ view = "dashboard" }: { view?: string }) { const [open, setOpen] = useState(false); if (view === "auth") return <Login/>; return <div>{open && <MobileNav close={() => setOpen(false)}/>} {view === "modules" ? <Modules/> : <Dashboard/>}</div>; }
export { Header, Login, Dashboard, Modules };
