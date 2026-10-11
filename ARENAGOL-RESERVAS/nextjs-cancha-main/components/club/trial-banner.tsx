"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import api from "@/lib/axios"
import { getMyClubMembership } from "@/lib/membership"
import { AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export function TrialBanner() {
  // El software es propiedad permanente del Polideportivo Emilio Gilbey (sin suscripciones ni bloqueos)
  return null
}
