import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, DollarSign, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: `Términos y Condiciones | ${process.env.NEXT_PUBLIC_APP_NAME || "Polideportivo Emilio Hilbick"}`,
  description: "Términos, condiciones de uso y políticas de reservas en el Polideportivo Emilio Hilbick",
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Logo" width={24} height={24} className="object-contain" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              {process.env.NEXT_PUBLIC_APP_NAME || "Polideportivo Emilio Hilbick"}
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
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <FileText className="h-3.5 w-3.5" />
            Marco Legal y Normativo
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Términos y Condiciones del Servicio
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Polideportivo Emilio Hilbick - Bellavista, Piura. Por favor, lee con detenimiento este documento antes de realizar reservas de turnos deportivos.
          </p>
        </div>

        {/* Resumen Financiero Clave */}
        <div className="my-8 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">
                Política de Reservas y Anticipo del 50%
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                El Polideportivo Emilio Hilbick ofrece alquiler de canchas sintéticas de Fútbol 5, Fútbol 7 y Fútbol 11. Para garantizar la reserva de cualquier turno, se requiere un anticipo del 50% mediante Yape o Plin al número oficial <strong>972 536 586</strong>, liquidando el 50% restante al ingresar a nuestras instalaciones.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-10 py-6 text-sm sm:text-base leading-relaxed text-foreground/90">
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs font-bold">1</span>
              Aceptación de los Términos
            </h3>
            <p className="text-muted-foreground">
              Al registrarte como usuario o solicitar una reserva en el Polideportivo Emilio Hilbick, declaras tener capacidad legal y aceptas de forma expresa estos Términos y Condiciones, así como nuestra Política de Privacidad.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs font-bold">2</span>
              Tarifas y Horarios
            </h3>
            <p className="text-muted-foreground">
              Nuestras tarifas oficiales aplican de lunes a domingo:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-sm">
              <li><strong>Horario Diurno (08:00 AM - 06:00 PM):</strong> S/ 35 por hora.</li>
              <li><strong>Horario Nocturno (07:00 PM - 11:00 PM con iluminación LED):</strong> S/ 70 por hora.</li>
              <li>El alquiler incluye el uso de la cancha seleccionada, chalecos de juego y balón reglamentario en custodia.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs font-bold">3</span>
              Métodos de Pago y Validación
            </h3>
            <p className="text-muted-foreground">
              Aceptamos pagos a través de <strong>Yape</strong> y <strong>Plin</strong> al número <strong>972 536 586</strong> (Titular: Polideportivo Emilio Hilbick) y pago directo en recepción.
            </p>
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-xs sm:text-sm text-destructive">
              <strong>Validación de Pagos:</strong> El usuario debe registrar comprobantes fidedignos. Cualquier comprobante adulterado será reportado y anulará de forma inmediata el derecho a la reserva.
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs font-bold">4</span>
              Puntualidad y Cancelaciones
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border p-4 bg-muted/20">
                <h4 className="font-bold text-sm text-foreground mb-1">Reprogramaciones (con más de 12h)</h4>
                <p className="text-xs text-muted-foreground">
                  Se permite reprogramar el turno dentro del mismo mes previa coordinación al WhatsApp de administración.
                </p>
              </div>
              <div className="rounded-xl border p-4 bg-muted/20">
                <h4 className="font-bold text-sm text-foreground mb-1">Inasistencia o Cancelación</h4>
                <p className="text-xs text-muted-foreground">
                  La inasistencia sin aviso previo genera la pérdida del anticipo abonado para cubrir el costo del turno bloqueado.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs font-bold">5</span>
              Contacto y Atención al Cliente
            </h3>
            <p className="text-muted-foreground">
              Para cualquier consulta, atención de eventos corporativos o dudas sobre tus reservas, contáctanos a través de WhatsApp al <a href="https://wa.me/51972536586" target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline">+51 972 536 586</a> o al correo <a href="mailto:emiliohilbick@polideportivo.pe" className="text-primary underline">emiliohilbick@polideportivo.pe</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME || "Polideportivo Emilio Hilbick"}. Todos los derechos reservados. Bellavista, Piura.
      </footer>
    </div>
  )
}
