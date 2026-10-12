import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CookieTriggerButton } from "@/components/cookies/cookie-trigger-button"

export const metadata: Metadata = {
  title: `Política de Cookies | ${process.env.NEXT_PUBLIC_APP_NAME || "Polideportivo Emilio Hilbick"}`,
  description: "Información sobre el uso de cookies en el Polideportivo Emilio Hilbick",
}

export default function CookiesPage() {
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
          <div className="flex items-center gap-3">
            <CookieTriggerButton
              variant="default"
              className="text-xs font-semibold px-3 py-1.5 h-auto text-primary-foreground"
            />
            <Link href="/register">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container flex-1 max-w-4xl py-12 px-4 sm:px-6">
        <div className="space-y-4 border-b pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Cookie className="h-3.5 w-3.5" />
            Transparencia Digital
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Política de Cookies
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            En el Polideportivo Emilio Hilbick utilizamos únicamente las cookies técnicas estrictamente necesarias para el inicio de sesión y la reserva de tus turnos deportivos.
          </p>
        </div>

        {/* Panel para reabrir modal */}
        <div className="my-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-foreground text-base">¿Deseas modificar tus preferencias actuales?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Puedes cambiar tus elecciones o retirar tu consentimiento para cookies opcionales en cualquier momento.
            </p>
          </div>
          <CookieTriggerButton
            variant="default"
            className="text-sm font-bold px-4 py-2 text-primary-foreground h-auto shrink-0 shadow-sm"
          />
        </div>

        <div className="space-y-8 py-4 text-sm sm:text-base leading-relaxed text-foreground/90">
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-foreground">1. ¿Qué son las Cookies?</h3>
            <p className="text-muted-foreground">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo para recordar tu sesión activa y mantener la seguridad de tu cuenta mientras reservas tu cancha de fútbol.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-foreground">2. Cookies Técnicas</h3>
            <p className="text-muted-foreground">
              Utilizamos cookies para mantener autenticada la sesión del jugador o del administrador del polideportivo, y para recordar preferencias como el tema visual o el estado del panel.
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
