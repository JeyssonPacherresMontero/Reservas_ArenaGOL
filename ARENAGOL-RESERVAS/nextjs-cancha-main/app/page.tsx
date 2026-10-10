import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  CheckCircle,
  MapPin,
  Clock,
  Users,
  Trophy,
  Zap,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  Coffee,
  Car
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AuthHeaderButtons } from "@/components/AuthHeaderButtons"
import { PublicSearchForm } from "@/components/public-search-form"
import { CookieTriggerButton } from "@/components/cookies/cookie-trigger-button"

export const revalidate = 3600

export default async function HomePage() {
  const appName = "Polideportivo Arena Gol"

  return (
    <div className="flex w-full min-h-screen flex-col bg-[#0a0e17] text-white selection:bg-[#00ff88] selection:text-[#0a0e17]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0e17]/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-2 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#00ff88]/15 border border-[#00ff88]/30 shadow-xs">
              <Trophy className="h-5 w-5 text-[#00ff88]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#00ff88] via-[#00b3ff] to-[#00ff88] bg-clip-text text-transparent">
                Arena Gol
              </span>
              <span className="text-[10px] text-[#8b9bb4] font-semibold tracking-wide uppercase -mt-1">
                Polideportivo Bellavista - Piura
              </span>
            </div>
          </Link>

          {/* Navegación Principal */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <Link href="#servicios" className="text-[#8b9bb4] hover:text-[#00ff88] transition-colors">
              Servicios
            </Link>
            <Link href="#instalaciones" className="text-[#8b9bb4] hover:text-[#00ff88] transition-colors">
              Canchas
            </Link>
            <Link href="#reservas" className="text-[#8b9bb4] hover:text-[#00ff88] transition-colors">
              Reservar Cancha
            </Link>
            <Link href="#ubicacion" className="text-[#8b9bb4] hover:text-[#00ff88] transition-colors">
              Ubicación
            </Link>
          </nav>

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
                <MapPin className="h-4 w-4 shrink-0 text-[#00ff88]" />
                <span>Bellavista, Piura • Pasión por el Deporte</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                El mejor grass y deporte en{" "}
                <span className="bg-gradient-to-r from-[#00ff88] to-[#00b3ff] bg-clip-text text-transparent">
                  Polideportivo Arena Gol
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-[#8b9bb4] max-w-2xl leading-relaxed">
                Vive la emoción del fútbol y el deporte con la mejor iluminación LED, canchas de grass sintético de máxima amortiguación, academias formativas y torneos en Bellavista, Piura.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row pt-2 w-full sm:w-auto">
                <Link href="#reservas" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-7 text-base font-bold gap-2 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00b3ff] hover:opacity-90 text-[#0a0e17] shadow-lg shadow-[#00ff88]/20 transition-all hover:-translate-y-0.5">
                    <Calendar className="h-5 w-5" />
                    Reservar Mi Turno
                  </Button>
                </Link>
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-6 text-base font-semibold gap-2 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all hover:-translate-y-0.5">
                    Crear Cuenta de Jugador
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Estadísticas / Puntos Fuertes */}
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
                  <p className="text-xs sm:text-sm text-[#8b9bb4] font-medium">Seguridad y Ambiente Familiar</p>
                </div>
              </div>
            </div>

            {/* Imagen Hero (Fachada Real del Polideportivo) */}
            <div className="relative lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff88]/20 to-[#00b3ff]/20 rounded-3xl blur-2xl transform rotate-2 scale-95" />
                <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#151a23]">
                  <Image
                    src="/arenagol-fachada.jpg"
                    alt="Polideportivo Arena Gol Bellavista Piura"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17]/80 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#151a23]/95 backdrop-blur border border-white/10 shadow-lg flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00ff88]/15 text-[#00ff88]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#8b9bb4]">Atención Todos los Días</p>
                      <p className="text-sm font-bold truncate text-white">Lunes a Domingo • 06:00 AM - 12:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Servicios de Polideportivo Arena Gol */}
        <section id="servicios" className="py-20 sm:py-24 border-t border-white/10 bg-[#0d121d]">
          <div className="container px-4 sm:px-6 space-y-14">
            <div className="mx-auto max-w-3xl text-center space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/10 px-3 py-1 text-xs font-semibold text-[#00ff88]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Nuestros Servicios Deportivos</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Todo lo que te ofrece Arena Gol
              </h2>
              <p className="text-base sm:text-lg text-[#8b9bb4] leading-relaxed">
                Diseñado para futbolistas, familias y empresas que buscan la mejor experiencia deportiva en Piura.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="rounded-2xl border-white/10 bg-[#151a23] hover:border-[#00ff88]/40 hover:shadow-xl transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff88]/15 text-[#00ff88] flex items-center justify-center">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Alquiler de Canchas Sintéticas</h3>
                  <p className="text-sm text-[#8b9bb4] leading-relaxed">
                    Canchas de Fútbol con césped sintético de alta tecnología, amortiguación óptima para proteger articulaciones y arcos reglamentarios.
                  </p>
                  <ul className="text-xs space-y-1.5 text-[#8b9bb4] font-medium pt-1">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#00ff88]" /> Turnos de 60 y 90 minutos</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#00ff88]" /> Balones y chalecos disponibles</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-white/10 bg-[#151a23] hover:border-[#00b3ff]/40 hover:shadow-xl transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00b3ff]/15 text-[#00b3ff] flex items-center justify-center">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Iluminación LED Profesional</h3>
                  <p className="text-sm text-[#8b9bb4] leading-relaxed">
                    Sistema de reflectores LED de alta potencia para partidos nocturnos nítidos y sin sombras molestas. Juega con total visibilidad.
                  </p>
                  <ul className="text-xs space-y-1.5 text-[#8b9bb4] font-medium pt-1">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#00b3ff]" /> Visibilidad 100% garantizada</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#00b3ff]" /> Horarios nocturnos hasta medianoche</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-white/10 bg-[#151a23] hover:border-[#00ff88]/40 hover:shadow-xl transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff88]/15 text-[#00ff88] flex items-center justify-center">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Torneos y Campeonatos</h3>
                  <p className="text-sm text-[#8b9bb4] leading-relaxed">
                    Organización de campeonatos corporativos, ligas libres, torneos relámpago e interbarriales con terna arbitral y premiación.
                  </p>
                  <ul className="text-xs space-y-1.5 text-[#8b9bb4] font-medium pt-1">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#00ff88]" /> Tablas y estadísticas en vivo</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#00ff88]" /> Trofeos y medallas</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-white/10 bg-[#151a23] hover:border-[#00b3ff]/40 hover:shadow-xl transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00b3ff]/15 text-[#00b3ff] flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Academia Formativa de Menores</h3>
                  <p className="text-sm text-[#8b9bb4] leading-relaxed">
                    Escuela deportiva formativa para niños y jóvenes con profesores de educación física calificados y metodología moderna.
                  </p>
                  <ul className="text-xs space-y-1.5 text-[#8b9bb4] font-medium pt-1">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#00b3ff]" /> Horarios de mañana y tarde</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#00b3ff]" /> Grupos divididos por edades</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-white/10 bg-[#151a23] hover:border-[#00ff88]/40 hover:shadow-xl transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff88]/15 text-[#00ff88] flex items-center justify-center">
                    <Coffee className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Snack Bar y Zona Social</h3>
                  <p className="text-sm text-[#8b9bb4] leading-relaxed">
                    Área de descanso con venta de bebidas hidratantes, piqueos, cafetería y pantallas de TV para ver los mejores partidos.
                  </p>
                  <ul className="text-xs space-y-1.5 text-[#8b9bb4] font-medium pt-1">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#00ff88]" /> Bebidas heladas e hidratación</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#00ff88]" /> Gradas y zona de espectadores</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-white/10 bg-[#151a23] hover:border-[#00b3ff]/40 hover:shadow-xl transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00b3ff]/15 text-[#00b3ff] flex items-center justify-center">
                    <Car className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Estacionamiento y Seguridad</h3>
                  <p className="text-sm text-[#8b9bb4] leading-relaxed">
                    Zona de estacionamiento vigilada para motos y autos, con cámaras de seguridad y personal para tu total tranquilidad.
                  </p>
                  <ul className="text-xs space-y-1.5 text-[#8b9bb4] font-medium pt-1">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#00b3ff]" /> Monitoreo y vigilancia permanente</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#00b3ff]" /> Vestuarios y duchas limpias</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sección: Instalaciones y Canchas */}
        <section id="instalaciones" className="py-20 border-t border-white/10 bg-[#0a0e17]">
          <div className="container px-4 sm:px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00b3ff]/20 bg-[#00b3ff]/10 px-3 py-1 text-xs font-semibold text-[#00b3ff]">
                <Trophy className="h-3.5 w-3.5" />
                <span>Nuestras Canchas</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                Canchas Disponibles en Arena Gol
              </h2>
              <p className="text-base text-[#8b9bb4]">
                Tarifas claras: Turno Diurno S/ 35/hr • Turno Nocturno (con reflectores LED) S/ 70/hr
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              <div className="rounded-2xl border border-white/10 bg-[#151a23] p-6 space-y-4 hover:border-[#00ff88]/50 transition-all">
                <div className="h-40 rounded-xl overflow-hidden relative bg-muted">
                  <Image src="/general.jpeg" alt="Cancha 1" fill className="object-cover" />
                  <div className="absolute top-3 right-3 bg-[#00ff88] text-[#0a0e17] px-2.5 py-0.5 rounded-full text-xs font-bold">
                    Fútbol 5
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Cancha 1 - Fútbol 5</h3>
                  <p className="text-xs text-[#8b9bb4] mt-1">Grass sintético monofilamento de alta amortiguación.</p>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs text-[#8b9bb4]">Desde:</span>
                  <span className="text-lg font-extrabold text-[#00ff88]">S/ 35 / hr</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#151a23] p-6 space-y-4 hover:border-[#00b3ff]/50 transition-all">
                <div className="h-40 rounded-xl overflow-hidden relative bg-muted">
                  <Image src="/arenagol-fachada.jpg" alt="Cancha 2" fill className="object-cover" />
                  <div className="absolute top-3 right-3 bg-[#00b3ff] text-[#0a0e17] px-2.5 py-0.5 rounded-full text-xs font-bold">
                    Fútbol 7
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Cancha 2 - Fútbol 7</h3>
                  <p className="text-xs text-[#8b9bb4] mt-1">Ideal para pichangas medianas y partidos de amigos.</p>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs text-[#8b9bb4]">Desde:</span>
                  <span className="text-lg font-extrabold text-[#00b3ff]">S/ 35 / hr</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#151a23] p-6 space-y-4 hover:border-[#00ff88]/50 transition-all">
                <div className="h-40 rounded-xl overflow-hidden relative bg-muted">
                  <Image src="/general.jpeg" alt="Cancha 3" fill className="object-cover" />
                  <div className="absolute top-3 right-3 bg-[#00ff88] text-[#0a0e17] px-2.5 py-0.5 rounded-full text-xs font-bold">
                    Fútbol 11
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Cancha 3 - Fútbol 11</h3>
                  <p className="text-xs text-[#8b9bb4] mt-1">Cancha reglamentaria para torneos y campeonatos.</p>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs text-[#8b9bb4]">Desde:</span>
                  <span className="text-lg font-extrabold text-[#00ff88]">S/ 35 / hr</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Buscar / Reservar Turnos (Componente Funcional Conectado a Supabase) */}
        <section id="reservas" className="py-20 border-t border-white/10 bg-[#0d121d]">
          <div className="container px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-3xl text-center space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/10 px-3 py-1 text-xs font-semibold text-[#00ff88]">
                <Calendar className="h-3.5 w-3.5" />
                <span>Consulta Disponibilidad en Vivo</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                Reserva tu Cancha en Arena Gol
              </h2>
              <p className="text-base sm:text-lg text-[#8b9bb4]">
                Selecciona la fecha, hora y cancha disponible. Paga el 50% de anticipo con Yape/Plin (972 536 586) o coordina directamente por WhatsApp.
              </p>
            </div>

            <div className="mx-auto max-w-4xl bg-[#151a23] rounded-2xl border border-white/10 shadow-2xl p-6 md:p-8">
              <PublicSearchForm />
            </div>
          </div>
        </section>

        {/* Sección: Ubicación y Contacto Directo */}
        <section id="ubicacion" className="py-20 border-t border-white/10 bg-[#0a0e17]">
          <div className="container px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/10 px-3 py-1 text-xs font-semibold text-[#00ff88]">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Encuéntranos en Piura</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                  Visítanos en Bellavista, Piura
                </h2>
                <p className="text-base text-[#8b9bb4] leading-relaxed">
                  Estamos ubicados en una zona accesible y segura de Bellavista. Ven con tus amigos, compañeros de trabajo o familia a disfrutar del mejor ambiente deportivo de Piura.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#00ff88]/10 text-[#00ff88] shrink-0 mt-0.5">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Dirección</h4>
                      <p className="text-sm text-[#8b9bb4]">Bellavista, Piura - Perú</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#00b3ff]/10 text-[#00b3ff] shrink-0 mt-0.5">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Horario de Atención</h4>
                      <p className="text-sm text-[#8b9bb4]">Lunes a Domingo: 06:00 AM – 12:00 AM (Medianoche)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#00ff88]/10 text-[#00ff88] shrink-0 mt-0.5">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">WhatsApp & Coordinación</h4>
                      <p className="text-sm text-[#8b9bb4]">972 536 586 • Atención rápida y confirmaciones directas</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="#reservas">
                    <Button size="lg" className="bg-gradient-to-r from-[#00ff88] to-[#00b3ff] text-[#0a0e17] font-bold rounded-xl gap-2 hover:opacity-90">
                      Ver Horarios Disponibles
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Tarjeta Visual de Instalaciones con la foto real */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#151a23] p-6 shadow-xl space-y-4">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted">
                  <Image
                    src="/arenagol-fachada.jpg"
                    alt="Instalaciones Arena Gol"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">Instalaciones Deportivas de Primer Nivel</h3>
                  <p className="text-xs text-[#8b9bb4]">
                    Diseñadas para partidos intensos, entrenamientos, escuelas de menores y campeonatos.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-xs font-semibold text-[#8b9bb4]">Tipo de Césped</p>
                    <p className="text-sm font-bold text-white">Grass Sintético Pro</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-xs font-semibold text-[#8b9bb4]">Anticipo Reserva</p>
                    <p className="text-sm font-bold text-[#00ff88]">50% (Yape / Plin)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0e17] py-10">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00ff88]/15 text-[#00ff88]">
                <Trophy className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                {appName}
              </span>
            </div>

            <div className="text-xs text-[#8b9bb4]">
              &copy; {new Date().getFullYear()} {appName}. Bellavista, Piura • Todos los derechos reservados.
            </div>

            <div className="flex items-center gap-4 text-xs text-[#8b9bb4]">
              <Link href="/terminos" className="hover:text-white hover:underline">
                Términos
              </Link>
              <Link href="/privacidad" className="hover:text-white hover:underline">
                Privacidad
              </Link>
              <CookieTriggerButton />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
