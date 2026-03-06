"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { ThemeToggle } from "./theme-toggle"
import { Calendar, LayoutDashboard, LogIn, UserPlus, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

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
              <Button variant="ghost" size="sm" asChild className="font-bold uppercase text-[10px] tracking-widest text-slate-600 dark:text-slate-400">
                <Link href="/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild className="font-bold uppercase text-[10px] tracking-widest h-8 bg-primary text-white hover:bg-primary/90">
                <Link href="/register">Cadastrar</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="hidden lg:inline text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">{user.email}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="h-8 font-bold uppercase text-[10px] tracking-widest border-black/10 dark:border-white/20">
                <LogOut className="w-3.5 h-3.5 mr-2" />
                <span>Sair</span>
              </Button>
            </div>
          )}
          <div className="ml-2 pl-2 border-l border-black/10 dark:border-white/10">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
