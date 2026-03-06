"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, Users, DollarSign, CalendarCheck } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { format, subDays, startOfDay, endOfDay } from "date-fns"

export function NexusDashboard() {
  const supabase = createClient()
  const [stats, setStats] = useState({
    totalRevenue: 0,
    newClients: 0,
    totalAppointments: 0,
    conversionRate: 24.5,
    chartData: [] as any[]
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch appointments with service price
        const { data: appointments, error } = await supabase
          .from("appointments")
          .select(`
            *,
            services (price)
          `)

        if (error) throw error

        if (appointments) {
          const totalRevenue = appointments.reduce((acc, curr) => acc + (Number(curr.services?.price) || 0), 0)
          const totalAppointments = appointments.length
          const uniqueClients = new Set(appointments.map(a => a.client_phone)).size

          // Generate last 7 days chart data
          const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = subDays(new Date(), 6 - i)
            const dayLabel = format(date, "EEE")
            const dayAppointments = appointments.filter(a => {
              const aDate = new Date(a.start_time)
              return aDate.getDate() === date.getDate() && aDate.getMonth() === date.getMonth()
            })
            const dayRevenue = dayAppointments.reduce((acc, curr) => acc + (Number(curr.services?.price) || 0), 0)
            
            return {
              name: dayLabel,
              agendamentos: dayAppointments.length,
              faturamento: dayRevenue
            }
          })

          setStats({
            totalRevenue,
            totalAppointments,
            newClients: uniqueClients,
            conversionRate: 24.5 + (totalAppointments > 0 ? 5 : 0), // Mocked logic for demo
            chartData: last7Days
          })
        }
      } catch (err) {
        console.error("Erro dashboard:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Faturamento", value: `R$ ${stats.totalRevenue.toLocaleString("pt-BR")}`, icon: DollarSign, sub: "Feed de Dados Real" },
          { title: "Clientes", value: `+${stats.newClients}`, icon: Users, sub: "Rede Ativa" },
          { title: "Sessões", value: stats.totalAppointments, icon: CalendarCheck, sub: "Fluxo de Agendas" },
          { title: "Conversão", value: `${stats.conversionRate}%`, icon: TrendingUp, sub: "Meta de Performance" },
        ].map((item, i) => (
          <Card key={i} className="rounded-none border-0 bg-slate-900 border-l-2 border-primary shadow-[4px_4px_0px_0px_rgba(var(--primary-rgb),0.1)] hover:shadow-primary/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">{item.title}</CardTitle>
              <item.icon className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tighter uppercase">{item.value}</div>
              <p className="text-[9px] uppercase tracking-widest text-primary/60 font-bold mt-1">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4 rounded-none border-0 bg-slate-900 shadow-xl overflow-hidden">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="uppercase tracking-widest text-xs font-black">Log_de_Performance</CardTitle>
            <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground">Trajetória financeira - Janela de 7 dias</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} tickFormatter={(value: number) => `R$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "0px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "10px 10px 0px 0px rgba(0,0,0,0.5)" }}
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  itemStyle={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}
                />
                <Bar dataKey="faturamento" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 rounded-none border-0 bg-slate-900 shadow-xl overflow-hidden">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="uppercase tracking-widest text-xs font-black">Volume_de_Sessões</CardTitle>
            <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground">Métricas de intensidade de tráfego</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.chartData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                   contentStyle={{ backgroundColor: "#0f172a", borderRadius: "0px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "10px 10px 0px 0px rgba(0,0,0,0.5)" }}
                   itemStyle={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}
                />
                <Line 
                  type="stepAfter" 
                  dataKey="agendamentos" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={4} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
