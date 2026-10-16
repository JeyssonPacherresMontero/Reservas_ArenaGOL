"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const playerFaqs = [
  {
    question: "¿Qué pasa si no subo mi comprobante a tiempo al reservar?",
    answer: "El horario se libera automáticamente si no subes la foto de tu comprobante de pago (Yape/Plin) dentro del tiempo límite de gracia indicado en la pantalla."
  },
  {
    question: "¿Qué pasa si ya pagué pero el club demora en confirmar?",
    answer: "Tu reserva está asegurada. Nunca pierdes un horario por el que ya realizaste y adjuntaste el pago exitosamente."
  },
  {
    question: "¿Cómo sé qué métodos de pago acepta una cancha?",
    answer: "Los métodos de pago disponibles (Yape, Plin o Pago con Tarjeta) se muestran de manera muy visible antes de que confirmes tu reserva."
  },
  {
    question: "¿Mis datos y pagos están seguros?",
    answer: "Sí, absolutamente. Toda la información y transacciones viajan a través de una conexión encriptada SSL de alta seguridad y los pagos con tarjeta son procesados por pasarelas certificadas."
  },
  {
    question: "¿Puedo reservar varias fechas a la vez?",
    answer: "Sí, puedes reservar todos los horarios que necesites para tus partidos realizando el proceso de reserva fácil y rápido para cada fecha deseada."
  }
]

export function FaqSection() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
            <HelpCircle className="h-4 w-4 shrink-0" />
            <span>Centro de Ayuda</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Resolvemos tus principales dudas sobre el Polideportivo Emilio Hilbick para que aproveches al máximo nuestras instalaciones deportivas.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full border-t border-border/40">
            {playerFaqs.map((faq, index) => (
              <AccordionItem key={`player-${index}`} value={`player-${index}`} className="border-b border-border/40 py-1">
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:text-primary transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-base pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

