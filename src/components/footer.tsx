import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-slate-500 py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            < Zap className="text-primary w-5 h-5 fill-current" />
            <span className="text-2xl font-black text-white tracking-tighter uppercase">Nexus<span className="text-primary italic">_</span></span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">High Performance Scheduling Interface</p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">Terms_of_Service</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">Privacy_Log</a>
            <a href="https://github.com/MauricioRFilho" className="text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">GitHub_Repo</a>
          </div>
          <p className="text-[9px] font-medium tracking-[0.1em] text-slate-700 uppercase">© 2026 Nexus Scheduler. Brutal Efficiency for Professionals.</p>
        </div>
      </div>
    </footer>
  )
}
