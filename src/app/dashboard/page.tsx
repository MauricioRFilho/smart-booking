"use client"

import { NexusDashboard } from "@/components/nexus/nexus-dashboard"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LayoutDashboard } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="flex flex-col gap-2 border-l-4 border-primary pl-6 py-2">
          <div className="flex items-center gap-2 text-primary font-bold tracking-tighter uppercase text-xs">
            <LayoutDashboard className="w-4 h-4" /> System Control
          </div>
          <h1 className="text-4xl font-black tracking-tight uppercase">Dashboard<span className="text-primary">_</span></h1>
          <p className="text-muted-foreground font-medium">
            Métricas de performance e gestão de fluxo Nexus.
          </p>
        </div>

        <NexusDashboard />
      </div>
    </div>
  )
}
