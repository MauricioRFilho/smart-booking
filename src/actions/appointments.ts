"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getDashboardStats() {
  const session = await auth();
  if (!session?.user?.id) return null;

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        professional_id: session.user.id
      },
      include: {
        service: true
      }
    });

    return appointments;
  } catch (error) {
    console.error("Erro ao buscar stats:", error);
    return null;
  }
}

export async function createAppointment(data: {
  clientName: string;
  clientPhone: string;
  startTime: string;
  endTime: string;
  serviceName?: string; // For auto-creating a service if needed for the portfolio demo
}) {
  const session = await auth();
  
  // For the portfolio demo, if no session, we can use a "demo" professional or just fail.
  // Ideally, for a public booking page, the professional_id should be passed or fixed.
  // Let's find first user or a specific professional.
  
  const professional = await prisma.user.findFirst({
    where: { email: "m@exemplo.com" } // Fallback or first user
  }) || await prisma.user.findFirst();

  if (!professional) return { error: "Nenhum profissional configurado" };

  // Ensure a service exists
  let service = await prisma.service.findFirst();
  if (!service) {
    service = await prisma.service.create({
      data: {
        name: data.serviceName || "Sessão de Consultoria",
        price: 150.00,
        duration: 60,
        description: "Serviço padrão de consultoria Nexus"
      }
    });
  }

  try {
    await prisma.appointment.create({
      data: {
        professional_id: professional.id,
        service_id: service.id,
        client_name: data.clientName,
        client_phone: data.clientPhone,
        start_time: new Date(data.startTime),
        end_time: new Date(data.endTime),
        status: "confirmed"
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return { error: "Erro ao salvar agendamento" };
  }
}
