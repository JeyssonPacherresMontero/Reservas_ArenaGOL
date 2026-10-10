"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
    message: "Debes aceptar los Términos y Condiciones y la Política Financiera de Reservas.",
  }),
})

export type UserFormValues = z.infer<typeof userFormSchema>

export function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [showGoogleLoading, setShowGoogleLoading] = useState(false)

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

      toast.success("Registro exitoso. ¡Bienvenido a Arena Gol!")
      
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

  const handleGoogleSignUp = async () => {
    setShowGoogleLoading(true)
    try {
      const callbackUrl = searchParams.get("callbackUrl") || "/user/dashboard"
      await signIn("google", { callbackUrl })
      toast.success("Bienvenido a Arena Gol")
    } catch (error) {
      toast.error("Error al iniciar sesión con Google")
    } finally {
      setShowGoogleLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="mb-2 text-center">
        <h2 className="text-xl font-bold tracking-tight text-white">Crea tu cuenta de Jugador</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Reserva tus partidos al instante en el Polideportivo Arena Gol
        </p>
      </div>

      <Form {...userForm}>
        <form onSubmit={userForm.handleSubmit(onUserSubmit, onUserError)} className="space-y-4">
          <FormField
            control={userForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo *</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre completo" disabled={isLoading} {...field} />
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
                <strong>Aviso de Reserva:</strong> Para confirmar tu turno en Arena Gol, se requiere adelanto del 50% vía Yape/Plin o pago en recepción.
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

          <Button type="submit" className="w-full font-bold py-5 bg-[#00ff88] hover:bg-[#00ff88]/90 text-black" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Registrarse como Jugador
          </Button>
        </form>
      </Form>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        disabled={isLoading || showGoogleLoading}
        onClick={handleGoogleSignUp}
        className="w-full"
      >
        {showGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
        )}
        Google
      </Button>

      <p className="text-center text-xs text-muted-foreground mt-2">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="text-primary hover:underline font-semibold">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  )
}
