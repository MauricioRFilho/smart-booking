# Projeto: Nexus Scheduler - Gestão e Agendamento SaaS

## 1. Objetivo
Oferecer uma solução completa de agendamento para profissionais liberais, com foco em redução de "no-shows" e gestão financeira simplificada.

## 2. Público-Alvo
Personal trainers, nutricionistas e consultores.

## 3. Funcionalidades Principais
- **Agenda Interativa:** Interface drag-and-drop para marcação de horários.
- **WhatsApp Automation:** Envio automático de lembretes e confirmações via API.
- **Painel de Conversão:** Dashboard com métricas de faturamento e taxas de ocupação.
- **Check-out Integrado:** Pagamento de caução ou valor integral no ato do agendamento.

## 4. Arquitetura Técnica
- **Stack:** Fullstack Next.js ou Remix.run.
- **Auth & DB:** Supabase (PostgreSQL + Auth + Edge Functions).
- **Pagamentos:** Stripe ou Stripe Connect para split de pagamentos.
- **UI:** Tailwind CSS + Shadcn/ui para uma interface limpa e profissional.

## 5. Estratégia Vibe Coding
Utilize o Supabase para pular toda a configuração de infraestrutura de backend. Peça para a IA gerar o componente de calendário e foque seus esforços na integração da API de mensagens e na segurança dos webhooks de pagamento.