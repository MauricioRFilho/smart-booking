import { NexusCalendar } from "@/components/nexus/nexus-calendar"
import { NexusDashboard } from "@/components/nexus/nexus-dashboard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, ShieldCheck, Zap, MessageCircle, TrendingUp, Calendar } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nexus | Protocolo de Performance Absolute",
  description: "Capture clientes com o fluxo de agendamento cirúrgico e direto da Nexus. Gestão bruta de performance para profissionais de elite.",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <main>
        {/* Hero Section - Asymmetric / Sharp but modern */}
        <section className="relative pt-32 pb-24 px-6 overflow-hidden border-b border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-10 z-10 text-center lg:text-left">
              <div className="inline-block border-l-4 border-primary bg-primary/5 px-4 py-1 text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                Protocolo_Nexus_v2.0
              </div>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
                Alta<br />
                Performance<br />
                <span className="text-primary italic">Absolute_</span>
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-muted-foreground font-bold tracking-tight leading-relaxed border-l border-black/10 dark:border-white/10 pl-6">
                Agendamento de elite. Gestão financeira bruta. WhatsApp direto. 
                Construído para profissionais que dominam o mercado.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
                <Button size="lg" asChild className="h-16 px-12 font-black uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-[10px_10px_0px_0px_rgba(var(--primary-rgb),0.2)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]">
                  <Link href="/#agendamento">Iniciar_Sistema</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="h-16 px-12 font-bold uppercase tracking-widest border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">
                  <Link href="/#features">Explorar_Logs</Link>
                </Button>
              </div>
            </div>
            
            <div className="flex-1 relative w-full aspect-square max-w-[500px] border-2 border-primary/20 bg-white dark:bg-slate-900 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden group rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
              <Calendar className="absolute inset-0 m-auto w-48 h-48 text-primary opacity-10 group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-0 right-0 p-6 bg-primary text-white font-black uppercase tracking-tighter text-4xl">
                99%
              </div>
              <div className="absolute bottom-0 left-0 p-6 bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-black/5 dark:border-white/10 w-full">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Eficiência_Confirmada</p>
              </div>
            </div>
          </div>
        </section>

        {/* Agendamento Section */}
        <section id="agendamento" className="py-32 bg-slate-50 dark:bg-slate-900/30 border-b border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col gap-12 lg:flex-row items-start">
              <div className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-6">
                <h2 className="text-5xl font-black uppercase tracking-tighter leading-none text-slate-900 dark:text-white">Agendas<br /><span className="text-primary italic">Ativas_</span></h2>
                <div className="h-2 w-24 bg-primary" />
                <p className="text-muted-foreground font-bold text-lg leading-snug">Capture clientes com um fluxo de agendamento cirúrgico e direto.</p>
              </div>
              <div className="flex-1 w-full bg-white dark:bg-background border-4 border-slate-200 dark:border-slate-800 shadow-[30px_30px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[30px_30px_0px_0px_rgba(0,0,0,0.3)] rounded-3xl overflow-hidden mt-8 lg:mt-0">
                <div className="py-2 bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-[0.5em] text-center text-slate-500 dark:text-white/60 border-b border-black/5 dark:border-white/5">
                  Nexus_UI_Terminal_v2
                </div>
                <div className="p-4 md:p-12">
                  <NexusCalendar />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="px-6 py-32 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b-2 border-black/5 dark:border-white/5 pb-10">
            <div className="space-y-2">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Command_Center</h2>
              <p className="text-primary font-black uppercase tracking-[0.4em] text-xs underline decoration-2 underline-offset-8">Feed de performance em Tempo-Real</p>
            </div>
            <p className="text-muted-foreground max-w-sm font-bold text-right uppercase text-xs leading-relaxed">
              Decisões brutas baseadas em dados absolutos. Sem distrações. Apenas resultados.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-950 border border-black/5 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden">
            <div className="p-8 md:p-16">
              <NexusDashboard />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-24 text-center lg:text-left">System_Log: Funcionalidades</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: MessageCircle, title: "WhatsApp Direto", desc: "Integração inteligente via links diretos. Zero taxas, resposta instantânea." },
                { icon: TrendingUp, title: "Fin_Analytics", desc: "Visualize seu faturamento e lucros em um dashboard técnico de alta precisão." },
                { icon: ShieldCheck, title: "Segurança de Vault", desc: "Seus dados protegidos por criptografia de nível militar e infraestrutura resiliente." },
              ].map((feat, i) => (
                <div key={i} className="group relative p-10 bg-slate-50 dark:bg-slate-900 border-l-2 border-black/5 dark:border-white/10 hover:border-primary transition-all duration-500 rounded-r-2xl">
                  <div className="absolute top-0 right-0 p-2 text-[10px] font-black text-black/5 dark:text-white/10 group-hover:text-primary transition-colors">
                    F_0{i+1}
                  </div>
                  <feat.icon className="text-primary w-10 h-10 mb-8" />
                  <h4 className="text-2xl font-black uppercase tracking-tight mb-4 text-slate-900 dark:text-white">{feat.title}</h4>
                  <p className="text-muted-foreground leading-relaxed font-bold text-sm">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
