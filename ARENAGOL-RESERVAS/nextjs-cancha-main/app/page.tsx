import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Coffee,
  ShowerHead,
  AlertTriangle,
  ChevronRight,
  Phone,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  ShieldCheck,
  Sun,
  Moon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AuthHeaderButtons } from "@/components/AuthHeaderButtons"
import { PublicSearchForm } from "@/components/public-search-form"
import { CookieTriggerButton } from "@/components/cookies/cookie-trigger-button"

export const revalidate = 3600

export default async function HomePage() {
  return (
    <div className="flex w-full min-h-screen flex-col bg-[#0a0e17] text-[#ffffff] font-sans selection:bg-[#00ff88] selection:text-[#0a0e17]">
      {/* Navbar con estilo Cyber-Sport del boceto */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0e17]/85 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between gap-4 px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-wider">
            <span>Arena<span className="text-[#00ff88]">Gol</span></span>
          </Link>

          {/* Enlaces de Navegación del Boceto */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link href="#home" className="text-white/80 hover:text-[#00ff88] transition-colors">
              Inicio
            </Link>
            <Link href="#instalaciones" className="text-white/80 hover:text-[#00ff88] transition-colors">
              Instalaciones
            </Link>
            <Link href="#horarios" className="text-white/80 hover:text-[#00ff88] transition-colors">
              Horarios
            </Link>
            <Link href="#reservas" className="text-white/80 hover:text-[#00ff88] transition-colors">
              Reservas
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white font-semibold text-xs sm:text-sm rounded-lg transition-all hover:-translate-y-0.5"
              >
                Panel de Control
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#00ff88] to-[#00b3ff] hover:opacity-90 text-[#0a0e17] font-extrabold text-xs sm:text-sm rounded-lg shadow-lg shadow-[#00ff88]/20 transition-all hover:-translate-y-0.5"
              >
                Registrarme
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section id="home" con Gradiente Radial del Boceto */}
        <section
          id="home"
          className="relative min-h-[90vh] flex items-center justify-between px-4 sm:px-12 py-16 sm:py-24 overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(0,255,136,0.12),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(0,179,255,0.12),transparent_50%)]"
        >
          <div className="container grid gap-12 lg:grid-cols-12 items-center">
            <div className="flex flex-col justify-center space-y-6 lg:col-span-7">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-[#00ff88]">
                <MapPin className="h-4 w-4" />
                <span>Bellavista &bull; Piura &bull; Complejo Deportivo</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.08] tracking-tight text-white">
                Vive el <span className="bg-gradient-to-r from-[#00ff88] to-[#00b3ff] bg-clip-text text-transparent">Fútbol</span> al Máximo Nivel
              </h1>

              <p className="text-base sm:text-xl text-[#8b9bb4] max-w-xl leading-relaxed">
                Canchas sintéticas de última generación, torneos, academia y el mejor ambiente deportivo para ti y tus amigos en Bellavista, Piura.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link href="#reservas">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-lg font-extrabold rounded-full bg-gradient-to-r from-[#00ff88] to-[#00b3ff] text-[#0a0e17] shadow-xl shadow-[#00ff88]/25 hover:shadow-[#00ff88]/40 hover:-translate-y-1 transition-all"
                  >
                    Reserva tu Cancha
                  </Button>
                </Link>
                <Link href="#horarios">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base font-bold rounded-full border-white/20 hover:bg-white/10 text-white transition-all hover:-translate-y-1"
                  >
                    Ver Precios y Turnos
                  </Button>
                </Link>
              </div>
            </div>

            {/* Imagen Hero con perspectiva del boceto */}
            <div className="relative lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
                <img
                  src="https://tse4.mm.bing.net/th/id/OIP.AIITV1e9S3lB-B4zqec7FQHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Cancha de futbol sintetica Arena Gol"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#151a23]/90 backdrop-blur-md border border-[#00ff88]/30 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#8b9bb4]">Ubicación</p>
                    <p className="text-sm font-bold text-white">Bellavista, Piura &bull; Atención Inmediata</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#00ff88]/15 border border-[#00ff88]/40 text-[#00ff88] text-xs font-black">
                    Abierto
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Instalaciones id="instalaciones" */}
        <section id="instalaciones" className="py-24 px-4 sm:px-8 text-center border-t border-white/5">
          <div className="container max-w-6xl space-y-12">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Nuestras Instalaciones</h2>
              <p className="text-[#8b9bb4] text-base sm:text-lg">Infraestructura de primer nivel diseñada para una experiencia futbolera completa.</p>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
              {/* Tarjeta 1 */}
              <div className="p-8 rounded-2xl bg-[#151a23] border border-white/5 hover:border-[#00ff88]/40 hover:-translate-y-2 transition-all duration-300 text-left space-y-4 shadow-xl">
                <div className="text-5xl">⚽</div>
                <h3 className="text-2xl font-extrabold text-[#00ff88]">Canchas Sintéticas</h3>
                <p className="text-[#8b9bb4] text-sm leading-relaxed">
                  Canchas techadas y al aire libre con césped de calidad FIFA, amortiguación óptima y arcos reglamentarios.
                </p>
              </div>

              {/* Tarjeta 2 */}
              <div className="p-8 rounded-2xl bg-[#151a23] border border-white/5 hover:border-[#00ff88]/40 hover:-translate-y-2 transition-all duration-300 text-left space-y-4 shadow-xl">
                <div className="text-5xl">🍔</div>
                <h3 className="text-2xl font-extrabold text-[#00ff88]">Zona de Refrescos</h3>
                <p className="text-[#8b9bb4] text-sm leading-relaxed">
                  Área social, cafetería y bar para hidratarse y disfrutar con los amigos después de cada partido.
                </p>
              </div>

              {/* Tarjeta 3 */}
              <div className="p-8 rounded-2xl bg-[#151a23] border border-white/5 hover:border-[#00ff88]/40 hover:-translate-y-2 transition-all duration-300 text-left space-y-4 shadow-xl">
                <div className="text-5xl">🚿</div>
                <h3 className="text-2xl font-extrabold text-[#00ff88]">Vestuarios y Duchas</h3>
                <p className="text-[#8b9bb4] text-sm leading-relaxed">
                  Vestuarios amplios, limpios y seguros con duchas de agua caliente y lockers disponibles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Horarios id="horarios" del boceto */}
        <section id="horarios" className="py-20 px-4 sm:px-8 flex justify-center border-t border-white/5 bg-[#0d121c]/50">
          <div className="w-full max-w-4xl rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#00ff88]/10 via-[#151a23] to-[#00b3ff]/10 border border-[#00ff88]/30 shadow-2xl text-center space-y-8">
            <h2 className="text-3xl sm:text-5xl font-black text-[#00ff88]">Horarios de Atención</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-14">
              <div className="text-7xl animate-bounce">⏰</div>
              <div className="space-y-6 text-left w-full max-w-md">
                <h3 className="text-2xl font-black text-white text-center md:text-left">Lunes a Domingo</h3>

                <div className="flex flex-col gap-4">
                  {/* Turno Día */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/10 gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">☀️</span>
                      <div>
                        <span className="text-xs font-bold text-[#8b9bb4] block uppercase">Turno Día</span>
                        <span className="text-sm sm:text-base font-extrabold text-white">8:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                    <span className="bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-black px-3.5 py-1.5 rounded-full text-xs sm:text-sm">
                      S/ 35 x hora
                    </span>
                  </div>

                  {/* Turno Noche */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/10 gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🌙</span>
                      <div>
                        <span className="text-xs font-bold text-[#8b9bb4] block uppercase">Turno Noche</span>
                        <span className="text-sm sm:text-base font-extrabold text-white">7:00 PM - 11:00 PM</span>
                      </div>
                    </div>
                    <span className="bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-black px-3.5 py-1.5 rounded-full text-xs sm:text-sm">
                      S/ 70 x hora
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Reservas id="reservas" con la alerta de 50% y Yape del boceto */}
        <section id="reservas" className="py-24 px-4 sm:px-8 border-t border-white/5">
          <div className="container max-w-4xl space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black text-white">Reserva tu Horario</h2>
              <p className="text-[#8b9bb4] text-base sm:text-lg">
                Selecciona tu cancha y horario preferido. ¡No te quedes sin jugar!
              </p>
            </div>

            {/* Alerta de pago del 50% del boceto de la cliente */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#ffab00]/10 border border-[#ffab00]/30 text-[#ffab00] text-sm sm:text-base leading-relaxed">
              <span className="text-3xl">⚠️</span>
              <div>
                <strong>Atención:</strong> Reserva la cancha pagando el <strong>50% por adelantado</strong>.<br />
                📲 <strong>Yape / WhatsApp:</strong> <span className="font-bold underline">972 536 586</span>
              </div>
            </div>

            {/* Buscador y Gestor de Reservas Interactivo Conectado al Polideportivo */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#151a23] border border-white/10 shadow-2xl">
              <PublicSearchForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer del boceto */}
      <footer className="py-12 px-4 sm:px-8 border-t border-white/5 bg-black/40 text-center space-y-6">
        <div className="space-y-1">
          <div className="text-2xl font-black">
            Arena<span className="text-[#00ff88]">Gol</span>
          </div>
          <p className="text-xs text-[#8b9bb4]">El mejor lugar para vivir tu pasión &bull; Bellavista, Piura</p>
        </div>
        <div className="text-xs text-[#8b9bb4] border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          <span>&copy; {new Date().getFullYear()} Arena Gol. Todos los derechos reservados.</span>
          <div className="flex items-center gap-4">
            <Link href="/terminos" className="hover:text-white transition-colors">Términos</Link>
            <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
            <CookieTriggerButton />
          </div>
        </div>
      </footer>
    </div>
  )
}
