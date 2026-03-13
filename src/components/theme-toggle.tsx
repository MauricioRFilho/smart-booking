"use client"

import * as React from "react"
import { Moon, Sun, Check } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative h-9 w-9 rounded-xl border-black/10 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md hover:bg-primary/10 transition-all duration-300 group"
        >
          <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-slate-600 group-hover:text-primary" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-400 group-hover:text-primary" />
          <span className="sr-only">Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px] rounded-xl border-black/10 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg p-1">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="flex items-center justify-between py-2.5 px-3 rounded-lg cursor-pointer focus:bg-primary/10 focus:text-primary transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <Sun className="h-4 w-4" />
            <span className="font-medium text-sm tracking-tight">Claro</span>
          </div>
          {theme === "light" && <Check className="h-3 w-3 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between py-2.5 px-3 rounded-lg cursor-pointer focus:bg-primary/10 focus:text-primary transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <Moon className="h-4 w-4" />
            <span className="font-medium text-sm tracking-tight">Escuro</span>
          </div>
          {theme === "dark" && <Check className="h-3 w-3 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="flex items-center justify-between py-2.5 px-3 rounded-lg cursor-pointer focus:bg-primary/10 focus:text-primary transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold border border-current rounded px-1">AUTO</span>
            <span className="font-medium text-sm tracking-tight">Sistema</span>
          </div>
          {theme === "system" && <Check className="h-3 w-3 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
