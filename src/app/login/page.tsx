"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push("/dashboard")
      router.refresh()
    } catch (err: any) {
      alert(err.message || "Credenciais inválidas")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-[calc(100vh-4rem)] w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-[400px] border-none shadow-2xl bg-white/50 backdrop-blur-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-2 rounded-xl">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Bem-vindo de volta</CardTitle>
          <CardDescription className="text-center">
            Acesse seu painel de agendamentos
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@exemplo.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Acessar Painel"}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-primary hover:underline underline-offset-4">
                Criar conta
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
