# Arquitetura do Sistema: Smart Booking (Nexus)

Este documento detalha a arquitetura técnica, fluxo de dados e estrutura de componentes do ecossistema Nexus.

## Visão Geral Técnica

Nexus é uma plataforma de agendamento de alta performance construída com tecnologias modernas de 2026, focada em velocidade, design minimalista (Absolute) e integração resiliente.

### Tech Stack
- **Frontend:** Next.js 15 (App Router), React 19.
- **Styling:** Tailwind CSS v4 (Modern Engine).
- **Componentes:** Radix UI (Unstyled primitives).
- **Backend-as-a-Service:** Supabase (PostgreSQL, Auth).
- **Icons:** Lucide-React.

## Diagrama de Arquitetura

```mermaid
graph TD
    User((Usuário))
    
    subgraph Client_Side [Next.js Client]
        UI[Nexus UI Components]
        Context[Theme/Language Context]
        AuthClient[Supabase Auth Client]
    end
    
    subgraph Server_Side [Next.js Server]
        API[Edge API Routes]
        Layout[Server Layouts]
    end
    
    subgraph Data_Layer [Infrastructure]
        Supabase[(Supabase DB)]
        AuthService[Supabase Auth]
    end
    
    User -->|Interage| UI
    UI -->|Lê/Grava| AuthClient
    AuthClient <-->|Session| AuthService
    UI -->|Query| API
    API <-->|SQL| Supabase
    
    subgraph Core_Engine [Nexus Engine]
        NexusCalendar[NexusCalendar Engine]
        NexusDashboard[Performance Analytics]
    end
    
    UI --> NexusCalendar
    UI --> NexusDashboard
```

## Fluxo de Agendamento

```mermaid
sequenceDiagram
    participant U as Usuário
    participant C as NexusCalendar
    participant S as Supabase
    participant W as WhatsApp API
    
    U->>C: Seleciona Data/Hora
    C->>S: Verifica Disponibilidade
    S-->>C: Status: Disponível
    U->>C: Confirma Dados
    C->>S: Salva Agendamento
    C->>W: Gera Link Direto (No-Fee)
    W-->>U: Confirmação via WhatsApp
```

## Estrutura de Diretórios
- `src/app/`: Rotas e layouts do sistema.
- `src/components/nexus/`: Componentes core da engine Nexus.
- `src/components/ui/`: Primitivas de interface (shadcn-like).
- `src/lib/`: Utilitários, configurações do Supabase e hooks customizados.
