import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Search,
  Award,
  Clock,
  Phone,
  Mail,
  Trophy
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { PublicSearchForm } from "@/components/public-search-form"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AuthHeaderButtons } from "@/components/AuthHeaderButtons"
import { FacilitiesSection } from "@/components/facilities-section"
import { FaqSection } from "@/components/faq-section"
import { LandingNav } from "@/components/landing-nav"
import { CookieTriggerButton } from "@/components/cookies/cookie-trigger-button"

export const revalidate = 3600

export default async function HomePage() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Polideportivo Emilio Hilbick"

  return (
    <div className="flex w-full min-h-screen flex-col bg-[#0a0e17] text-white selection:bg-[#00ff88] selection:text-[#0a0e17]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0e17]/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-2 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity">
            <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[#00ff88]/15 border border-[#00ff88]/30">
              <Trophy className="h-5 w-5 text-[#00ff88]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#00ff88] via-[#00b3ff] to-[#00ff88] bg-clip-text text-transparent">
                Emilio Hilbick
              </span>
              <span className="text-[10px] text-[#8b9bb4] font-semibold tracking-wide uppercase -mt-1 hidden sm:inline">
                Polideportivo Bellavista - Piura
              </span>
            </div>
          </Link>

          <LandingNav />

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <AuthHeaderButtons />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00ff88]/15 via-[#0a0e17] to-[#0a0e17]">
          <div className="absolute inset-y-0 right-0 -z-10 w-full max-w-5xl bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00b3ff]/10 via-transparent to-transparent blur-3xl" />

          <div className="container grid gap-8 lg:grid-cols-12 lg:gap-8 px-4 sm:px-6 items-center">
            <div className="flex flex-col justify-center space-y-5 sm:space-y-6 lg:col-span-7">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 px-3.5 py-1 text-xs sm:text-sm font-semibold text-[#00ff88]">
                <Award className="h-4 w-4 shrink-0" />
                <span>Bellavista, Piura • Pasión por el Deporte</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                El mejor grass y deporte en{" "}
                <span className="bg-gradient-to-r from-[#00ff88] to-[#00b3ff] bg-clip-text text-transparent">
                  Polideportivo Emilio Hilbick
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-[#8b9bb4] max-w-2xl leading-relaxed">
                Encuentra, compara y reserva tus canchas sintéticas en tiempo real con la mejor iluminación LED, grass monofilamento y el mejor ambiente deportivo de Bellavista, Piura.
              </p>

              <div className="pt-2 w-full sm:w-auto">
                <Link href="#search" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-bold gap-2 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00b3ff] hover:opacity-90 text-[#0a0e17] shadow-lg shadow-[#00ff88]/20 transition-all hover:-translate-y-0.5">
                    <Search className="h-5 w-5" />
                    Reservar Cancha
                  </Button>
                </Link>
              </div>

              {/* Estadísticas / Indicadores */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10">
                <div className="space-y-0.5 sm:space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Grass Pro</h4>
                  <p className="text-xs sm:text-sm text-[#8b9bb4] font-medium">Sintético Monofilamento</p>
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00ff88]">LED Ultra</h4>
                  <p className="text-xs sm:text-sm text-[#8b9bb4] font-medium">Iluminación Nocturna HD</p>
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00b3ff]">100%</h4>
                  <p className="text-xs sm:text-sm text-[#8b9bb4] font-medium">Ambiente Familiar y Seguro</p>
                </div>
              </div>
            </div>

            {/* Fotografía de la Fachada Real del Polideportivo */}
            <div className="relative lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff88]/20 to-[#00b3ff]/20 rounded-3xl blur-2xl transform rotate-2 scale-95" />
                <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#151a23]">
                  <Image
                    src="/polideportivo-fachada.jpg"
                    alt="Polideportivo Emilio Hilbick Bellavista Piura"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17]/80 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#151a23]/95 backdrop-blur border border-white/10 shadow-lg flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00ff88]/15 text-[#00ff88]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#8b9bb4]">Horario de Atención</p>
                      <p className="text-sm font-bold truncate text-white">Lunes a Domingo • 06:00 AM - 12:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <FacilitiesSection />

        {/* Search & Booking Section */}
        <section id="search" className="py-20 border-t border-white/10 bg-[#0a0e17]">
          <div className="container px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-3xl text-center space-y-3">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                Reserva tu Cancha en Polideportivo Emilio Hilbick
              </h2>
              <p className="text-base text-[#8b9bb4]">
                Consulta la disponibilidad en vivo por fecha y hora. Garantiza tu turno abonando el 50% de anticipo con Yape o Plin.
              </p>
            </div>

            <div className="mx-auto max-w-4xl bg-[#151a23] rounded-2xl border border-white/10 shadow-2xl p-6 md:p-8">
              <PublicSearchForm />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="border-t border-white/10 bg-[#0d121d]">
          <FaqSection />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 border-t border-white/10 bg-[#0a0e17]">
          <TestimonialsSection />
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-20 text-white border-t border-white/10 bg-gradient-to-br from-[#0a0e17] via-[#101b2b] to-[#0a0e17]">
          <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-[#00ff88]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-[#00b3ff]/10 blur-3xl" />

          <div className="container relative px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                ¿Listo para tu próximo partido?
              </h2>
              <p className="text-base sm:text-lg text-[#8b9bb4] max-w-xl mx-auto leading-relaxed">
                Crea tu cuenta de jugador en segundos y reserva tu cancha favorita en el Polideportivo Emilio Hilbick.
              </p>
              <div className="flex justify-center pt-2 max-w-md sm:max-w-none mx-auto">
                <Link href="#search" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-bold bg-[#00ff88] hover:bg-[#00ff88]/90 text-[#0a0e17] rounded-xl shadow-lg transition-all hover:-translate-y-0.5">
                    Ver Horarios Disponibles
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0e17] py-12">
        <div className="container px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3 items-start">
            {/* Logo y descripción */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00ff88]/15 text-[#00ff88]">
                  <Trophy className="h-4 w-4" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  {appName}
                </span>
              </div>
              <p className="text-xs text-[#8b9bb4] leading-relaxed max-w-xs">
                Polideportivo Emilio Hilbick en Bellavista, Piura. Alquiler de canchas de fútbol con grass sintético de alta tecnología e iluminación LED profesional.
              </p>
            </div>

            {/* Contacto Directo */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Contacto Directo</h3>
              <ul className="space-y-2 text-xs text-[#8b9bb4]">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#00ff88]" />
                  <a href="https://wa.me/51972536586" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    WhatsApp: 972 536 586
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#00b3ff]" />
                  <span>emiliohilbick@polideportivo.pe</span>
                </li>
                <li className="text-[11px] text-[#8b9bb4]/80">
                  Bellavista, Piura • Atención de 06:00 AM a 12:00 AM
                </li>
              </ul>
            </div>

            {/* Enlaces Legales */}
            <div className="space-y-3 md:text-right">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Políticas y Privacidad</h3>
              <div className="flex flex-col md:items-end gap-1.5 text-xs text-[#8b9bb4]">
                <Link href="/terminos" className="hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
                <Link href="/privacidad" className="hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
                <div className="pt-1">
                  <CookieTriggerButton />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-[#8b9bb4]">
            &copy; {new Date().getFullYear()} {appName}. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
