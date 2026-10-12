"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Sparkles,
  Zap,
  Users,
  Clock,
  Smartphone,
  Phone,
  Car,
  Bath,
  Coffee,
  Shirt,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface FacilityCard {
  icon: React.ElementType
  title: string
  description: string
  highlight?: boolean
  isDraft?: boolean
}

const mainFacilities: FacilityCard[] = [
  {
    icon: Sparkles,
    title: "Grass sintético monofilamento",
    description: "Fibra de alta calidad y amortiguación superior, diseñada para la comodidad del jugador y menor impacto articular.",
    highlight: true,
  },
  {
    icon: Zap,
    title: "Iluminación LED profesional",
    description: "Excelente visibilidad nocturna sin puntos ciegos para que tu pichanga no se detenga al caer la noche.",
    highlight: true,
  },
  {
    icon: Users,
    title: "Ambiente familiar y seguro",
    description: "Espacio deportivo acogedor y vigilado, ideal para jugar con amigos, torneos de fin de semana y academias.",
    highlight: true,
  },
  {
    icon: Clock,
    title: "Horario amplio de atención",
    description: "Atención de lunes a domingo de 06:00 AM a 12:00 AM para que encuentres tu turno ideal a cualquier hora.",
  },
  {
    icon: Smartphone,
    title: "Reserva en línea con 50% de anticipo",
    description: "Garantiza tu turno en segundos abonando tu seña del 50% mediante Yape o Plin de forma rápida y segura.",
  },
  {
    icon: Phone,
    title: "Atención por WhatsApp",
    description: "Coordinación rápida y soporte directo al número 972 536 586 para resolver cualquier consulta al instante.",
  },
  // Servicios complementarios estándar de polideportivo con [EDITAR]
  {
    icon: Car,
    title: "Estacionamiento para clientes",
    description: "[EDITAR: Capacidad aproximada para autos y motos con vigilancia privada durante tu partido]",
    isDraft: true,
  },
  {
    icon: Bath,
    title: "Vestidores y servicios higiénicos",
    description: "[EDITAR: Baños limpios, cambiadores y duchas con agua disponibles para todos los jugadores]",
    isDraft: true,
  },
  {
    icon: Coffee,
    title: "Venta de bebidas e hidratación",
    description: "[EDITAR: Kiosco / cafetería con venta de agua mineral, bebidas rehidratantes y snacks fríos]",
    isDraft: true,
  },
  {
    icon: Shirt,
    title: "Alquiler de chalecos y balones",
    description: "[EDITAR: Balones oficiales N° 5 y chalecos deportivos disponibles para diferenciar equipos]",
    isDraft: true,
  },
]

const galleryImages = [
  {
    src: "/arenagol-fachada.jpg",
    alt: "Fachada e ingreso principal del Polideportivo Emilio Hilbick en Bellavista, Piura",
    title: "Ingreso Principal",
    badge: "Sede Oficial",
  },
  {
    src: "/recomendacion-01.jpeg",
    alt: "Cancha de fútbol sintético con iluminación LED en Polideportivo Emilio Hilbick",
    title: "Cancha Principal de Grass Pro",
    badge: "[EDITAR: Medida / Tipo de Cancha]",
  },
  {
    src: "/recomendacion-02.jpeg",
    alt: "Instalaciones deportivas y campo de juego en Polideportivo Emilio Hilbick",
    title: "Campo Deportivo Iluminado",
    badge: "[EDITAR: Cancha 2 o Techada]",
  },
  {
    src: "/recomendacion-03.jpeg",
    alt: "Zona de juego y partido de noche en Polideportivo Emilio Hilbick",
    title: "Partidos Nocturnos en Vivo",
    badge: "[EDITAR: Torneos y Academias]",
  },
  {
    src: "/recomendacion-04.jpeg",
    alt: "Vista de las instalaciones para eventos deportivos y familiares",
    title: "Área Deportiva y Recreación",
    badge: "[EDITAR: Área de descanso]",
  },
  {
    src: "/general.jpeg",
    alt: "Ambiente deportivo y áreas generales en Bellavista, Piura",
    title: "Complejo Polideportivo",
    badge: "[EDITAR: Zona general]",
  },
]

export function FacilitiesSection() {
  return (
    <section id="features" className="py-20 sm:py-24 border-t border-white/10 bg-[#0d121d] relative overflow-hidden">
      {/* Luces de fondo decorativas sutiles */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#00b3ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container px-4 sm:px-6 space-y-16 relative">
        {/* 1. Encabezado */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 px-3.5 py-1 text-xs font-semibold text-[#00ff88]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Instalaciones</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
            Conoce nuestras canchas y servicios
          </h2>

          <p className="text-base sm:text-lg text-[#8b9bb4] leading-relaxed max-w-2xl mx-auto">
            La mejor infraestructura deportiva de Bellavista, Piura, pensada para jugar con amigos, disputar torneos y potenciar academias de fútbol.
          </p>
        </div>

        {/* 2. Grid de tarjetas de instalaciones (3 columnas en desktop, 1 en móvil) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {mainFacilities.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-white/10 bg-[#151a23]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#00ff88]/40 hover:bg-[#151a23] hover:shadow-xl hover:shadow-[#00ff88]/5 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20 group-hover:scale-110 group-hover:bg-[#00ff88]/20 transition-all duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    {item.isDraft && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        [EDITAR]
                      </span>
                    )}
                    {item.highlight && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20">
                        Destacado
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00ff88] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#8b9bb4] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* 3. Galería de fotos de las canchas */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#00ff88]">
                Galería Visual
              </p>
              <h3 className="text-2xl font-extrabold text-white">
                Nuestras Instalaciones en Fotos
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#8b9bb4]">
              Fotos reales del complejo deportivo • Bellavista, Piura
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#151a23] shadow-lg transition-all duration-300 hover:border-[#00ff88]/40 hover:shadow-2xl hover:shadow-[#00ff88]/10"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Badge superior */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#0a0e17]/85 backdrop-blur-md text-white border border-white/15">
                      {img.badge}
                    </span>
                  </div>

                  {/* Título inferior */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-sm font-bold text-white group-hover:text-[#00ff88] transition-colors truncate">
                      {img.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Botón de llamada a la acción hacia #search */}
        <div className="pt-8 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[#151a23]/90 border border-white/10 shadow-xl max-w-xl mx-auto w-full justify-between">
            <div className="text-left space-y-0.5">
              <p className="text-sm font-bold text-white">¿Quieres asegurar tu horario para hoy?</p>
              <p className="text-xs text-[#8b9bb4]">Consulta los turnos libres y separa con el 50% por Yape o Plin.</p>
            </div>
            <Link href="#search" className="w-full sm:w-auto shrink-0">
              <Button
                size="lg"
                className="w-full sm:w-auto h-11 px-6 font-bold bg-[#00ff88] hover:bg-[#00ff88]/90 text-[#0a0e17] rounded-xl shadow-lg shadow-[#00ff88]/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <CalendarCheck className="h-4 w-4" />
                <span>Reservar Cancha</span>
                <ArrowRight className="h-4 w-4 ml-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
