"use client"

import { usePathname } from "next/navigation"
import {
  CalendarIcon,
  CreditCardIcon,
  HomeIcon,
  LayoutDashboardIcon,
  ListIcon,
  MapPinIcon,
  PlusCircleIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BanknoteIcon,
} from "lucide-react"

import { UserNav } from "@/components/layout/user-nav"
import Link from "next/link"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import type { User } from "@/lib/types"

interface AppSidebarProps {
  user: User
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const clubId = (user as any)?.clubId || (user as any)?.club?.id

  // Menú para usuarios normales
  const userMenu = [
    {
      title: "Dashboard",
      icon: LayoutDashboardIcon,
      href: "/user/dashboard",
      active: isActive("/user/dashboard"),
    },
    {
      title: "Buscar Canchas",
      icon: SearchIcon,
      href: "/user/search",
      active: isActive("/user/search"),
    },
    {
      title: "Mis Reservas",
      icon: CalendarIcon,
      href: "/user/bookings",
      active: isActive("/user/bookings"),
    },
  ]

  // Menú para Polideportivo Emilio Gilbey (acceso total permanente y sin candados)
  const polideportivoMenu = [
    {
      title: "Dashboard",
      icon: LayoutDashboardIcon,
      href: "/club/dashboard",
      active: isActive("/club/dashboard"),
      locked: false,
    },
    {
      title: "Pagos y Cobros",
      icon: CreditCardIcon,
      href: "/club/payments",
      active: isActive("/club/payments"),
      locked: false,
    },
    {
      title: "Transacciones",
      icon: BanknoteIcon,
      href: "/club/transactions",
      active: isActive("/club/transactions"),
      locked: false,
    },
    {
      title: "Horarios",
      icon: CalendarIcon,
      href: "/club/schedules",
      active: isActive("/club/schedules"),
      locked: false,
    },
    {
      title: "Eventos y Bloqueos",
      icon: SparklesIcon,
      href: "/club/events",
      active: isActive("/club/events"),
      locked: false,
    },
    {
      title: "Canchas",
      icon: HomeIcon,
      href: "/club/courts",
      active: isActive("/club/courts"),
      locked: false,
    },
    {
      title: "Reservas",
      icon: ListIcon,
      href: "/club/bookings",
      active: isActive("/club/bookings"),
      locked: false,
    },
  ]

  // Determinar qué menú mostrar según el rol del usuario (Solo Polideportivo o Usuario)
  const menuItems = user.role === "CLUB" ? polideportivoMenu : userMenu

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/" onClick={() => isMobile && setOpenMobile(false)} className="flex items-center gap-2">
                <span className="text-base font-semibold">{process.env.NEXT_PUBLIC_APP_NAME}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {menuItems.map((item: any) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title} isActive={item.active}>
                      <Link
                        href={item.href}
                        onClick={() => isMobile && setOpenMobile(false)}
                        className="flex items-center justify-between w-full"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                        {item.highlight && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-destructive text-white animate-pulse">
                            Pagar
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <UserNav user={{name:user.name ?? 'C', email:user.email ?? 'C', image:''}} />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
