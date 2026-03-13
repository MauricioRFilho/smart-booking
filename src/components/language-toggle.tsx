"use client"

import * as React from "react"
import { Languages, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const [lang, setLang] = React.useState("pt-BR")

  const languages = [
    { code: "pt-BR", name: "Português", flag: "🇧🇷" },
    { code: "en-US", name: "English", flag: "🇺🇸" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative h-9 w-9 rounded-xl border-black/10 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md hover:bg-primary/10 transition-all duration-300 group"
        >
          <Languages className="h-[1.1rem] w-[1.1rem] text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors" />
          <span className="sr-only">Trocar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px] rounded-xl border-black/10 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg p-1">
        {languages.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code)}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg cursor-pointer focus:bg-primary/10 focus:text-primary transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{l.flag}</span>
              <span className="font-medium text-sm tracking-tight">{l.name}</span>
            </div>
            {lang === l.code && <Check className="h-4 w-4 text-primary animate-in zoom-in duration-300" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
