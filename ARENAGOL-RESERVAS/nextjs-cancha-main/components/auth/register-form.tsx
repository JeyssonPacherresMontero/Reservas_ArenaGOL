"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Loader2, DollarSign } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { registerUser } from "@/lib/auth"
import { signIn } from "next-auth/react"
import { TermsModal } from "@/components/legal/terms-modal"

// Esquema para jugador/usuario
const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
  phone: z.string().min(6, {
    message: "Por favor ingresa un número de teléfono válido.",
  }),
  role: z.literal("USER"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los Términos y Condiciones y la Política de Reservas.",
  }),
})

export type UserFormValues = z.infer<typeof userFormSchema>

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Formulario para usuario/jugador
  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "USER",
      termsAccepted: false,
    },
  })

  async function onUserSubmit(values: UserFormValues) {
    setIsLoading(true)

    try {
      const { termsAccepted, ...userData } = values
      await registerUser({
        ...userData,
        role: "USER",
      })

      toast.success("Registro exitoso. ¡Bienvenido a Polideportivo Emilio Hilbick!")
      
      // Auto-login con credenciales
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      })

      if (result?.ok) {
        router.push("/user/dashboard")
      } else {
        router.push("/login")
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Error al registrar. Por favor intenta nuevamente."
      toast.error(typeof msg === "object" ? JSON.stringify(msg) : msg)
    } finally {
      setIsLoading(false)
    }
  }

  const onUserError = (errors: any) => {
    const errorKeys = Object.keys(errors)
    if (errorKeys.length > 0) {
      const firstError = errors[errorKeys[0]]?.message || "Por favor completa todos los campos obligatorios."
      toast.error(String(firstError))
    }
  }

  return (
    <div className="grid gap-4">
      <Form {...userForm}>
        <form onSubmit={userForm.handleSubmit(onUserSubmit, onUserError)} className="space-y-4">
          <FormField
            control={userForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo *</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre y apellido" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={userForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="correo@ejemplo.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={userForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono / WhatsApp *</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 987654321" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={userForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="•••••••• (mínimo 6 caracteres)"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Casillero de Términos y Políticas */}
          <div className="rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-3">
            <div className="flex items-start gap-2.5 text-xs text-amber-950 dark:text-amber-200 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
              <DollarSign className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <span className="leading-tight">
                <strong>Aviso de Reserva:</strong> Para confirmar tu turno en Polideportivo Emilio Hilbick, se abona el 50% de anticipo vía Yape/Plin o pago en recepción.
              </span>
            </div>

            <FormField
              control={userForm.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2.5 space-y-0 pt-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="mt-0.5"
                      id="user-terms-checkbox"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <div className="text-xs font-normal text-muted-foreground leading-relaxed select-none">
                      <label
                        htmlFor="user-terms-checkbox"
                        className="cursor-pointer hover:text-foreground transition-colors mr-1 inline"
                      >
                        He leído y acepto los
                      </label>
                      <TermsModal triggerText="Términos y Condiciones" />{" "}
                      <label
                        htmlFor="user-terms-checkbox"
                        className="cursor-pointer hover:text-foreground transition-colors mx-1 inline"
                      >
                        y la
                      </label>
                      <Link
                        href="/privacidad"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="text-primary underline hover:text-primary/80 font-medium inline"
                      >
                        Política de Privacidad
                      </Link>
                      <label
                        htmlFor="user-terms-checkbox"
                        className="cursor-pointer hover:text-foreground transition-colors ml-1 inline"
                      >
                        . Reconozco y acepto las políticas de reserva y puntualidad. *
                      </label>
                    </div>
                    <FormMessage className="text-[11px]" />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full font-bold py-5 bg-[#00ff88] hover:bg-[#00ff88]/90 text-black text-sm" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Completar Registro
          </Button>
        </form>
      </Form>

      {/* 
        NOTA: Para habilitar el registro con Google, configurar GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET en .env
        y descomentar el bloque siguiente:
        <Button variant="outline" type="button" onClick={handleGoogleSignUp} className="w-full">
          Continuar con Google
        </Button> 
      */}
    </div>
  )
}
