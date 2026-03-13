"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { ThemeToggle } from "./theme-toggle"
import { LanguageToggle } from "./language-toggle"
import { Calendar, LayoutDashboard, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase text-slate-900 dark:text-white">
            <div className="bg-primary p-1 shrink-0 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span>Nexus<span className="text-primary font-light">_</span></span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-slate-600 dark:text-slate-400">
          <Link href="/#features" className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary">
            Funcionalidades
          </Link>
          <Link href="/dashboard" className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary flex items-center gap-2">
            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {!user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex font-bold uppercase text-[10px] tracking-widest text-slate-600 dark:text-slate-400">
                <Link href="/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild className="font-bold uppercase text-[10px] tracking-widest h-8 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20">
                <Link href="/register">Cadastrar</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-tight text-slate-600 dark:text-slate-400">{user.name || user.email?.split('@')[0]}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/" })} className="h-8 font-bold uppercase text-[10px] tracking-widest border-black/10 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                <LogOut className="w-3.5 h-3.5 sm:mr-2" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          )}
          
          <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-black/10 dark:border-white/10">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
