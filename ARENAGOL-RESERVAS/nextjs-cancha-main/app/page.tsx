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
    <div className="flex w-full min-h-screen flex-col bg-background text-foreground selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between gap-2 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/20 shadow-xs">
              <Trophy className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 bg-clip-text text-transparent">
                Arena Gol
              </span>
              <span className="text-[10px] text-muted-foreground font-semibold tracking-wide uppercase -mt-1">
                Polideportivo Bellavista - Piura
              </span>
            </div>
          </Link>

          {/* Navegación Principal */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#servicios" className="text-muted-foreground hover:text-emerald-600 transition-colors">
              Servicios
            </Link>
            <Link href="#instalaciones" className="text-muted-foreground hover:text-emerald-600 transition-colors">
              Canchas
            </Link>
            <Link href="#reservas" className="text-muted-foreground hover:text-emerald-600 transition-colors">
              Reservar Cancha
            </Link>
            <Link href="#ubicacion" className="text-muted-foreground hover:text-emerald-600 transition-colors">
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
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/15 via-background to-background">
          <div className="absolute inset-y-0 right-0 -z-10 w-full max-w-5xl bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent blur-3xl" />

          <div className="container grid gap-8 lg:grid-cols-12 lg:gap-8 px-4 sm:px-6 items-center">
            <div className="flex flex-col justify-center space-y-5 sm:space-y-6 lg:col-span-7">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Bellavista, Piura &bull; Pasión por el Deporte</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                El mejor grass y deporte en{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-green-500 bg-clip-text text-transparent">
                  Polideportivo Arena Gol
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Vive la emoción del fútbol y el deporte con la mejor iluminación LED, canchas de grass sintético de máxima amortiguación, academias formativas y torneos exclusivos en Bellavista, Piura.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row pt-2 w-full sm:w-auto">
                <Link href="#reservas" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-7 text-base gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5">
                    <Calendar className="h-5 w-5" />
                    Reservar Mi Turno
                  </Button>
                </Link>
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-6 text-base gap-2 rounded-xl border-border hover:bg-muted transition-all hover:-translate-y-0.5">
                    Crear Cuenta de Jugador
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Estadísticas / Puntos Fuertes */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-border/40">
                <div className="space-y-0.5 sm:space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Grass Pro</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Sintético Monofilamento</p>
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">LED Ultra</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Iluminación Nocturna HD</p>
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">100%</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Seguridad y Ambiente Familiar</p>
                </div>
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="relative lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[460px] aspect-square">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl transform rotate-3 scale-95" />
                <div className="relative h-full w-full rounded-2xl overflow-hidden border border-border/60 shadow-2xl bg-muted">
                  <Image
                    src="/general.jpeg"
                    alt="Polideportivo Arena Gol Bellavista Piura"
                    fill
                    sizes="(max-width: 768px) 100vw, 460px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-background/90 backdrop-blur border border-border/40 shadow-lg flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-muted-foreground">Atención Todos los Días</p>
                      <p className="text-sm font-bold truncate text-foreground">Lunes a Domingo &bull; 6:00 AM - 12:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Servicios de Polideportivo Arena Gol */}
        <section id="servicios" className="py-20 sm:py-24 border-t border-border/40 bg-muted/20">
          <div className="container px-4 sm:px-6 space-y-14">
            <div className="mx-auto max-w-3xl text-center space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Nuestros Servicios Deportivos</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Todo lo que te ofrece Arena Gol
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Diseñado para futbolistas, familias y empresas que buscan la mejor experiencia deportiva en Piura.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="rounded-2xl border-border/60 hover:border-emerald-500/40 hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Alquiler de Canchas Sintéticas</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Canchas de Fútbol 6, 7 y 8 con césped sintético de última generación, amortiguación óptima para proteger articulaciones y arcos reglamentarios.
                  </p>
                  <ul className="text-xs space-y-1.5 text-muted-foreground font-medium pt-1">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Turnos de 60 y 90 minutos</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Balones y chalecos disponibles</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-border/60 hover:border-emerald-500/40 hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Iluminación LED Profesional</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sistema de reflectores LED de alta potencia para partidos nocturnos nítidos y sin sombras molestas. Juega como en un estadio profesional.
                  </p>
                  <ul className="text-xs space-y-1.5 text-muted-foreground font-medium pt-1">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Visibilidad 100% garantizada</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Horarios nocturnos hasta medianoche</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-border/60 hover:border-emerald-500/40 hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Torneos y Campeonatos</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Organización integral de campeonatos corporativos, ligas libres, torneos relámpago e interbarriales con terna arbitral y premiación.
                  </p>
                  <ul className="text-xs space-y-1.5 text-muted-foreground font-medium pt-1">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Tablas y estadísticas</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Trofeos y medallas</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-border/60 hover:border-emerald-500/40 hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Academia Formativa de Menores</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Escuela deportiva formativa para niños y jóvenes con profesores de educación física calificados y metodología moderna.
                  </p>
                  <ul className="text-xs space-y-1.5 text-muted-foreground font-medium pt-1">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Horarios de mañana y tarde</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Grupos divididos por edades</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-border/60 hover:border-emerald-500/40 hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                    <Coffee className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Snack Bar y Zona Social</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Área de descanso con venta de bebidas hidratantes, piqueos, cafetería y pantallas de TV para ver los mejores partidos internacionales.
                  </p>
                  <ul className="text-xs space-y-1.5 text-muted-foreground font-medium pt-1">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Bebidas heladas e hidratación</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Terraza de espectadores</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-border/60 hover:border-emerald-500/40 hover:shadow-lg transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                    <Car className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Estacionamiento y Seguridad</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Zona de estacionamiento vigilada para motos y autos, con cámaras de seguridad y personal las 24 horas para tu total tranquilidad.
                  </p>
                  <ul className="text-xs space-y-1.5 text-muted-foreground font-medium pt-1">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Monitoreo y vigilancia permanente</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Vestuarios y duchas limpias</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sección: Buscar / Reservar Turnos */}
        <section id="reservas" className="py-20 border-t border-border/40">
          <div className="container px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-3xl text-center space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <Calendar className="h-3.5 w-3.5" />
                <span>Consulta Disponibilidad en Vivo</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Reserva tu Cancha en Arena Gol
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Selecciona la fecha, hora y cancha disponible. Paga de manera práctica con Yape, Plin o coordina directamente por WhatsApp.
              </p>
            </div>

            <div className="mx-auto max-w-4xl bg-background rounded-2xl border border-border shadow-xl p-6 md:p-8">
              <PublicSearchForm />
            </div>
          </div>
        </section>

        {/* Sección: Ubicación y Contacto Directo */}
        <section id="ubicacion" className="py-20 border-t border-border/40 bg-muted/30">
          <div className="container px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Encuéntranos en Piura</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Visítanos en Bellavista, Piura
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Estamos ubicados en una zona accesible y segura de Bellavista. Ven con tus amigos, compañeros de trabajo o familia a disfrutar del mejor ambiente deportivo de Piura.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0 mt-0.5">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Dirección</h4>
                      <p className="text-sm text-muted-foreground">Bellavista, Piura - Perú</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0 mt-0.5">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Horario de Atención</h4>
                      <p className="text-sm text-muted-foreground">Lunes a Domingo: 06:00 AM – 12:00 AM (Medianoche)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0 mt-0.5">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Contacto Directo</h4>
                      <p className="text-sm text-muted-foreground">Atención rápida y reservas directas por WhatsApp</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="#reservas">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2">
                      Ver Horarios Disponibles
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Tarjeta Visual de Instalaciones */}
              <div className="relative rounded-2xl overflow-hidden border border-border bg-card p-6 shadow-xl space-y-4">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted">
                  <Image
                    src="/general.jpeg"
                    alt="Instalaciones Arena Gol"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">Canchas Reglamentarias con Grass Sintético</h3>
                  <p className="text-xs text-muted-foreground">
                    Instalaciones de alto rendimiento diseñadas para partidos intensos, entrenamientos y campeonatos.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-muted/60 border text-center">
                    <p className="text-xs font-semibold text-muted-foreground">Tipo de Césped</p>
                    <p className="text-sm font-bold text-foreground">Fibras Monofilamento</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/60 border text-center">
                    <p className="text-xs font-semibold text-muted-foreground">Métodos de Pago</p>
                    <p className="text-sm font-bold text-foreground">Yape / Plin / Efectivo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-10">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                <Trophy className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                {appName}
              </span>
            </div>

            <div className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {appName}. Bellavista, Piura &bull; Todos los derechos reservados.
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="/terminos" className="hover:text-foreground hover:underline">
                Términos
              </Link>
              <Link href="/privacidad" className="hover:text-foreground hover:underline">
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
