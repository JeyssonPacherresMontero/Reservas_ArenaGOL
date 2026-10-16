"use client"

import { Shield, Lock, CreditCard, CheckCircle2, Zap } from "lucide-react"

export function TestimonialsSection() {
  return (
    <div className="container">
      {/* Sección: Confianza y Seguridad */}
      <div id="testimonials" className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <Shield className="h-4.5 w-4.5" />
            Plataforma 100% Confiable
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Seguridad y transparencia para tu negocio
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Diseñamos una infraestructura robusta que protege la información de tus clientes y garantiza que tus ingresos lleguen a su destino sin intermediarios.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Conexión Encriptada SSL</h4>
                <p className="text-sm text-muted-foreground mt-1 font-medium">Todos los datos transmitidos entre el usuario, el club y nuestros servidores viajan de forma segura y encriptada.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Pagos Directos a tu Cuenta</h4>
                <p className="text-sm text-muted-foreground mt-1 font-medium">No retenemos tus ganancias. Los cobros en línea entran directamente a tu cuenta de Mercado Pago.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de Garantías Gráficas */}
        <div className="lg:col-span-7 bg-background border border-border/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-500" />
            Garantías operativas
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Soporte 24/7 vía WhatsApp",
              "Sin cargos ocultos ni comisiones extra",
              "Cancelación de plan en cualquier momento",
              "Copias de seguridad diarias de tus datos",
              "Exportación de reportes a Excel/PDF",
              "Validación automática de comprobantes"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
                <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border/60 pt-6">
            <p className="text-xs text-muted-foreground text-center">
              Tecnología de pago soportada por pasarelas líderes a nivel mundial:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
              <span className="text-sm font-bold tracking-wider">MERCADO PAGO</span>
              <span className="text-sm font-bold tracking-wider">VISA</span>
              <span className="text-sm font-bold tracking-wider">MASTERCARD</span>
              <span className="text-sm font-bold tracking-wider">YAPE / PLIN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
