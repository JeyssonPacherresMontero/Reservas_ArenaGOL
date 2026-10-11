"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DollarSign, FileText } from "lucide-react"

interface TermsModalProps {
  triggerText?: string
  className?: string
}

export function TermsModal({ triggerText = "Términos y Condiciones", className = "" }: TermsModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span
          className={`cursor-pointer text-primary underline hover:text-primary/80 font-medium inline ${className}`}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(true)
          }}
        >
          {triggerText}
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-6">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center gap-2 text-primary">
            <FileText className="h-6 w-6" />
            <DialogTitle className="text-xl font-bold">
              Términos, Condiciones y Políticas de Reservas
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm">
            Polideportivo Emilio Hilbick • Bellavista, Piura
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto pr-2 space-y-5 text-sm text-foreground/90 py-4 leading-relaxed">
          {/* Alerta de Transacciones Financieras */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
            <div className="flex items-start gap-2.5">
              <DollarSign className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-amber-900 dark:text-amber-100">
                  Política de Anticipo del 50%
                </p>
                <p>
                  Para confirmar tu turno en el Polideportivo Emilio Hilbick, se requiere abonar el 50% de anticipo mediante Yape o Plin al número <strong>972 536 586</strong>. El 50% restante se cancela en recepción al momento de ingresar a las canchas.
                </p>
              </div>
            </div>
          </div>

          <section className="space-y-2">
            <h4 className="font-bold text-foreground text-base">1. Naturaleza del Servicio</h4>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Polideportivo Emilio Hilbick ofrece servicios de alquiler de canchas deportivas sintéticas de fútbol (Fútbol 5, Fútbol 7 y Fútbol 11) en Bellavista, Piura, con disponibilidad diurna y nocturna con iluminación LED de alta potencia.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-foreground text-base">2. Precios y Tarifas Oficiales</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground text-xs sm:text-sm">
              <li>
                <strong>Horario Diurno (08:00 AM - 06:00 PM):</strong> S/ 35 por hora.
              </li>
              <li>
                <strong>Horario Nocturno (07:00 PM - 11:00 PM):</strong> S/ 70 por hora.
              </li>
              <li>
                <strong>Métodos de Pago:</strong> Yape y Plin al número <strong>972 536 586</strong> (Titular: Polideportivo Emilio Hilbick) o pago en recepción.
              </li>
              <li>
                <strong>Comprobantes:</strong> Los usuarios deben adjuntar el comprobante legítimo de pago al solicitar su reserva para su validación inmediata.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-foreground text-base">3. Puntualidad y Reprogramaciones</h4>
            <div className="rounded-lg bg-muted/60 p-3 text-xs sm:text-sm space-y-2 text-muted-foreground">
              <p>
                • <strong>Puntualidad:</strong> Se solicita a los equipos llegar 10 minutos antes de la hora pactada para un ingreso fluido.
              </p>
              <p>
                • <strong>Reprogramaciones:</strong> Avisar con al menos 12 horas de anticipación para coordinar un nuevo horario disponible dentro del mes.
              </p>
            </div>
          </section>
        </div>

        <div className="border-t pt-4 flex justify-end">
          <Button variant="default" size="sm" onClick={() => setIsOpen(false)}>
            He Leído y Comprendido los Términos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
