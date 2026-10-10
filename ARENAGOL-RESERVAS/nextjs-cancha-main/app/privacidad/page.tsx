import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: `Política de Privacidad | ${process.env.NEXT_PUBLIC_APP_NAME || "Polideportivo Arena Gol"}`,
  description: "Tratamiento ético y protección de datos en Polideportivo Arena Gol",
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Logo" width={24} height={24} className="object-contain" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              {process.env.NEXT_PUBLIC_APP_NAME || "Polideportivo Arena Gol"}
            </span>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al Registro
            </Button>
          </Link>
        </div>
      </header>

      <main className="container flex-1 max-w-4xl py-12 px-4 sm:px-6">
        <div className="space-y-4 border-b pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Shield className="h-3.5 w-3.5" />
            Protección de Datos Personales
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Política de Privacidad y Tratamiento de Datos
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Polideportivo Arena Gol garantiza la confidencialidad y el uso responsable de tus datos para la gestión de tus partidos y reservas deportivas.
          </p>
        </div>

        <div className="space-y-10 py-8 text-sm sm:text-base leading-relaxed text-foreground/90">
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-foreground">1. Finalidad del Tratamiento de Datos</h3>
            <p className="text-muted-foreground">
              En Polideportivo Arena Gol recopilamos únicamente los datos necesarios (nombre, número telefónico y correo) para confirmar tus horarios de juego, emitir tus comprobantes de reserva y notificarte vía WhatsApp sobre tus turnos. No compartimos ni vendemos tu información a terceros.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-foreground">2. Seguridad de Pagos y Reservas</h3>
            <p className="text-muted-foreground">
              Toda la información ingresada en el sistema se transfiere con cifrado SSL de alta seguridad. Los comprobantes de Yape/Plin subidos por los usuarios son revisados únicamente por el personal administrativo del polideportivo para validar el adelanto correspondiente.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-foreground">3. Canales de Contacto</h3>
            <p className="text-muted-foreground">
              Si deseas actualizar tus datos o solicitar la eliminación de tu cuenta, puedes contactarnos directamente al correo <a href="mailto:arenagol@polideportivo.pe" className="text-primary underline">arenagol@polideportivo.pe</a> o vía WhatsApp al <a href="https://wa.me/51972536586" target="_blank" rel="noopener noreferrer" className="text-primary underline font-semibold">+51 972 536 586</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME || "Polideportivo Arena Gol"}. Todos los derechos reservados. Bellavista, Piura.
      </footer>
    </div>
  )
}
