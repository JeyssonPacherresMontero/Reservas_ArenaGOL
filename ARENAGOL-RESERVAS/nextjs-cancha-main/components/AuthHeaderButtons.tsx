// components/AuthHeaderButtons.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/stores/userStore"

export const AuthHeaderButtons = () => {
  const user = useUserStore((state) => state.user)
  const router = useRouter()

  if (!user) {
    return (
      <Link href="/login">
        <Button size="sm" className="bg-[#00ff88] hover:bg-[#00ff88]/90 text-[#0a0e17] font-bold h-8 sm:h-9 px-4 sm:px-5 text-xs sm:text-sm rounded-lg shadow-sm transition-all hover:scale-105">
          Iniciar Sesión
        </Button>
      </Link>
    )
  }

  const handleRedirect = () => {
    if (user.role === "CLUB") {
      router.push("/club/dashboard")
    } else {
      router.push('/user/dashboard')
    }
  }

  return (
    <Button size="sm" onClick={handleRedirect} className="h-8 sm:h-9 px-4 text-xs sm:text-sm font-bold bg-[#00ff88] hover:bg-[#00ff88]/90 text-[#0a0e17] rounded-lg">
      Ir a mi Panel
    </Button>
  )
}
