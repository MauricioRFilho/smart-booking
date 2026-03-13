"use client"

import { useState } from "react"
import { format, setHours, setMinutes } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { User, Phone, CheckCircle2, Zap, ArrowRight } from "lucide-react"
import { createAppointment } from "@/actions/appointments"
import { Input } from "@/components/ui/input"

const AVAILABLE_HOURS = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
]

const DEFAULT_PROFESSIONAL_ID = "d6b7b2a0-4b1a-4b1a-8b1a-1a2b3c4d5e6f"
const DEFAULT_SERVICE_ID = "e7c8c3b1-5c2b-5c2b-9c2b-2b3c4d5e6f7a"
const WHATSAPP_NUMBER = "5541998240536"

export function NexusCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const formatPhone = (value: string) => {
    const raw = value.replace(/\D/g, "")
    if (raw.length <= 11) {
      return raw
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .substring(0, 15)
    }
    return value.substring(0, 15)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientPhone(formatPhone(e.target.value))
  }

  const handleBooking = async () => {
    if (!date || !selectedTime || !clientName || !clientPhone) return
    
    setIsLoading(true)
    
    try {
      const [hours, minutes] = selectedTime.split(":").map(Number)
      const startTime = setMinutes(setHours(date, hours), minutes)
      const endTime = setMinutes(setHours(date, hours + 1), minutes)

      const result = await createAppointment({
        clientName,
        clientPhone,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString()
      })

      if (result.error) throw new Error(result.error)

      setIsSuccess(true)
      
      const message = encodeURIComponent(
        `Olá Maurício! Acabei de realizar um agendamento pelo Nexus Scheduler.\n\n` +
        `👤 Nome: ${clientName}\n` +
        `📅 Data: ${format(date, "dd/MM/yyyy")}\n` +
        `⏰ Horário: ${selectedTime}`
      )
      
      setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
      }, 1500)

    } catch (err: any) {
      console.error("Erro ao agendar:", err)
      alert(err.message || "Erro ao realizar agendamento. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="border-0 bg-white dark:bg-slate-900 shadow-2xl p-16 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center gap-8">
          <div className="w-24 h-24 border-2 border-primary bg-primary/10 flex items-center justify-center rounded-3xl">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <div className="space-y-4">
            <h3 className="text-4xl font-black uppercase tracking-tighter">Agendamento_OK!</h3>
            <p className="text-muted-foreground font-bold max-w-sm">Estamos te redirecionando para o WhatsApp para confirmar sua sessão.</p>
          </div>
          <Button variant="outline" className="border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 font-bold uppercase tracking-widest px-8" onClick={() => setIsSuccess(false)}>Agendar outro horário</Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-slate-50 dark:bg-slate-900 shadow-2xl overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Calendar Picker Area */}
        <div className="p-8 border-r border-black/5 dark:border-white/5 bg-white dark:bg-slate-950/50">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Selecionar_Data</h4>
            <Badge variant="outline" className="border-primary/30 text-[9px] uppercase font-bold text-primary">v2.0</Badge>
          </div>
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border-0 pointer-events-auto"
            locale={ptBR}
          />
        </div>

        {/* Time Picker area */}
        <div className="p-8 bg-white dark:bg-slate-900 flex flex-col">
          <div className="mb-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Horários_Disp</h4>
            <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">GTM-3 São Paulo Time</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-8">
            {AVAILABLE_HOURS.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                className={cn(
                  "h-12 font-black text-xs transition-all tracking-widest",
                  selectedTime === time 
                    ? "bg-primary text-white border-primary" 
                    : "bg-transparent border-black/10 dark:border-white/10 hover:border-primary/50 text-slate-900 dark:text-white"
                )}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>

          <div className="space-y-6 mt-auto pt-6 border-t border-black/5 dark:border-white/5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <User className="w-3 h-3 text-primary" /> Nome_Completo
              </label>
              <Input 
                placeholder="EX: JOÃO SILVA" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="border-black/5 dark:border-white/10 bg-black/5 dark:bg-black/40 h-12 uppercase font-bold text-xs tracking-widest focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Phone className="w-3 h-3 text-primary" /> WhatsApp_ID
              </label>
              <Input 
                placeholder="(00) 00000-0000" 
                value={clientPhone}
                onChange={handlePhoneChange}
                maxLength={15}
                className="border-black/5 dark:border-white/10 bg-black/5 dark:bg-black/40 h-12 font-bold text-xs tracking-widest focus-visible:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-6 bg-slate-100 dark:bg-black border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border border-primary flex items-center justify-center bg-primary/5">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Sessão_Pronta</p>
            <p className="text-sm font-black uppercase tracking-tighter">
              {date ? format(date, "MMM dd, yyyy", { locale: ptBR }) : "---"} _ {selectedTime || "--:--"}
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleBooking}
          disabled={!date || !selectedTime || !clientName || !clientPhone || isLoading}
          className="w-full sm:w-auto h-14 px-12 font-black uppercase tracking-[0.2em] bg-primary text-white hover:bg-primary/90 disabled:opacity-30 flex items-center gap-3"
        >
          {isLoading ? "Sincronizando..." : "Confirmar_Agendamento"}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  )
}
