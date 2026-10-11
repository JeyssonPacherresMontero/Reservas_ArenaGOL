"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MapPinIcon, SearchIcon, MapIcon, ListIcon, Navigation, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { SearchResults } from "@/components/search-results-advanced"
import dynamic from 'next/dynamic'
const MapView = dynamic(() => import('@/components/map-view').then(mod => mod.MapView), { ssr: false, loading: () => <div className="h-[400px] w-full animate-pulse bg-muted rounded-xl" /> })
const GooglePlacesAutocomplete = dynamic(() => import('@/components/google-places-autocomplete').then(mod => mod.GooglePlacesAutocomplete), { ssr: false })
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Club } from "@/lib/types"
import { getAllClubs } from "@/lib/club"
import { usePathname } from "next/navigation"
import { sportTypes, timeSlots } from "@/lib/sports"
import { getAllCourts } from "@/lib/courts"
import { useUserStore } from "@/stores/userStore"
import { parseISO } from "date-fns"
import { toZonedTime } from 'date-fns-tz'
import { Loader2 } from "lucide-react"


// Datos de ejemplo

export function SearchInterface({ initialClubs = [] }: { initialClubs?: Club[] }) {
  const PERU_TZ = "America/Lima"
  const pathname = usePathname()
  const {user} = useUserStore((state) => state)
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  const { toast } = useToast()
  const [clubs, setClubs] = useState<Club[]>(initialClubs)
  const [searchQuery, setSearchQuery] = useState( "")
  const [selectedSport, setSelectedSport] = useState( "all")
  const [selectedSurface, setSelectedSurface] = useState<string>("all")
  const [selectedTime, setSelectedTime] = useState<string>( "")
  const [courtTypes, setCourtTypes] = useState<{ value: string; label: string }[]>([
    { value: "futbol_7", label: "Canchas de 7" },
    { value: "futbol_5", label: "Canchas de 5" },
    { value: "futbol_11", label: "Canchas de 11" },
  ])

  const [selectedPriceRange, setSelectedPriceRange] = useState("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    // new Date(),
    undefined
  )
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>( null)
  const [locationQuery, setLocationQuery] = useState("")
  const [view, setView] = useState<"list" | "map">("list")
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [pendingReservation, setPendingReservation] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)

  // Cargar dinámicamente los tipos de canchas creadas por el complejo deportivo
  useEffect(() => {
    async function loadCourtTypes() {
      try {
        const courts = await getAllCourts()
        if (Array.isArray(courts) && courts.length > 0) {
          const uniqueTypes = Array.from(
            new Set(courts.map((c: any) => c.type).filter(Boolean))
          )
          if (uniqueTypes.length > 0) {
            const list = uniqueTypes.map((typeVal: string) => {
              const matched = sportTypes.find(
                (s) => s.value.toLowerCase() === typeVal.toLowerCase()
              )
              return {
                value: typeVal,
                label: matched ? matched.label : typeVal.replace(/_/g, " "),
              }
            })
            setCourtTypes(list)
          }
        }
      } catch (e) {
        // Fallback a los tipos por defecto del complejo
      }
    }
    loadCourtTypes()
  }, [])




  useEffect(() => {
    const query = urlSearchParams.get("query") || ""
    const sport = urlSearchParams.get("sport") || "all"
    const surface = urlSearchParams.get("surface") || "all"
    const price = urlSearchParams.get("price") || "all"
    const dateStr = urlSearchParams.get("date")
    const lat = urlSearchParams.get("lat")
    const lng = urlSearchParams.get("lng")
    const location = urlSearchParams.get("location") || ""
    const time = urlSearchParams.get("time") || ""
  
    setSearchQuery(query)
    setSelectedSport(sport)
    setSelectedSurface(surface)
    setSelectedTime(time)
    setSelectedPriceRange(price)
    if(dateStr){
      const parsed    = dateStr ? parseISO(dateStr) : new Date();
      const zonedDate = toZonedTime(parsed, PERU_TZ); 
      // const randomDate = dateStr ? new Date(dateStr) : new Date()
      setSelectedDate(zonedDate)
    }

    if (lat && lng) {
      setCurrentLocation({ lat: parseFloat(lat), lng: parseFloat(lng) })
    }
    setLocationQuery(location)
    setIsSearching(false)
  }, [urlSearchParams])

  // Verificar reservas pendientes después del login
  useEffect(() => {
    if (user && typeof window !== "undefined") {
      const pending = localStorage.getItem("pendingReservation")
      if (pending) {
        try {
          const reservationData = JSON.parse(pending)
          setPendingReservation(reservationData)
          localStorage.removeItem("pendingReservation")

          toast({
            title: "¡Bienvenido de vuelta!",
            description: "Continuemos con tu reserva...",
          })
        } catch (error) {
          localStorage.removeItem("pendingReservation")
        }
      }
    }
  }, [user, toast])

  // Función para obtener ubicación actual
  const getCurrentLocation = useCallback(() => {
    setIsLoadingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentLocation({ lat: latitude, lng: longitude })
          setLocationQuery("Mi ubicación actual")
          setIsLoadingLocation(false)
          toast({
            title: "Ubicación obtenida",
            description: "Se ha obtenido tu ubicación actual correctamente",
          })
        },
        (error) => {
          setIsLoadingLocation(false)
          toast({
            title: "Error de ubicación",
            description: "No se pudo obtener tu ubicación. Verifica los permisos del navegador.",
            variant: "destructive",
          })
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      )
    } else {
      setIsLoadingLocation(false)
      toast({
        title: "Geolocalización no disponible",
        description: "Tu navegador no soporta geolocalización",
        variant: "destructive",
      })
    }
  }, [toast])

  // Manejar selección de lugar desde Google Places
  const handlePlaceSelect = useCallback(
    (place: any, coordinates: { lat: number; lng: number }) => {
      setCurrentLocation(coordinates)
      setLocationQuery(place)
      toast({
        title: "Ubicación seleccionada",
        description: `Buscando canchas cerca de ${place}`,
      })
    },
    [toast],
  )

  // Función para realizar búsqueda
 
  const handleSearch = 
    () => {
      setIsSearching(true)
    const params = new URLSearchParams()

    if (searchQuery) params.append("query", searchQuery)
    if (selectedSurface !== "all") params.append("surface", selectedSurface)
    if (selectedSport !== "all") params.append("sport", selectedSport)
    if (selectedPriceRange !== "all") params.append("price", selectedPriceRange)
    // if (selectedDate) params.append("date", selectedDate.toISOString().split("T")[0])
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd") // SIN ZONAS HORARIAS
      params.append("date", formattedDate)
    }
    if (currentLocation) {
      params.append("lat", currentLocation.lat.toString())
      params.append("lng", currentLocation.lng.toString())
    }
    if (locationQuery) params.append("location", locationQuery)
    if (selectedTime) params.append("time", selectedTime)
        // 👇 Parámetro falso para forzar navegación aunque sea igual
    params.append("refresh", Date.now().toString())

    router.push(`${pathname}?${params.toString()}`)
  }

  // Selección directa e instantánea de área (Grass vs Losa)
  const handleSelectSurface = (surface: "all" | "grass" | "losa") => {
    setSelectedSurface(surface)
    const params = new URLSearchParams(urlSearchParams.toString())
    if (surface === "all") {
      params.delete("surface")
    } else {
      params.set("surface", surface)
    }
    params.set("refresh", Date.now().toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  // Función para limpiar filtros
  const clearFilters = useCallback(() => {
    setSearchQuery("")
    setSelectedSurface("all")
    setSelectedSport("all")
    setSelectedTime("")
    setSelectedPriceRange("all")
    setSelectedDate(undefined)
    setCurrentLocation(null)
    setLocationQuery("")
    router.push(`${pathname}`)
  }, [router, pathname])

  // Obtener filtros activos
  const activeFilters = [
    searchQuery && { key: "query", label: `Búsqueda: ${searchQuery}` },
    selectedSurface !== "all" && {
      key: "surface",
      label: selectedSurface === "grass" ? "Área: Canchas de Grass" : "Área: Canchas de Losa",
    },
    selectedSport !== "all" && {
      key: "sport",
      label: `Tipo: ${courtTypes.find((s) => s.value === selectedSport)?.label || sportTypes.find((s) => s.value === selectedSport)?.label || selectedSport}`,
    },
    selectedPriceRange !== "all" && { key: "price", label: `Precio: ${selectedPriceRange}` },
    selectedDate && { key: "date", label: `Fecha: ${format(selectedDate, "dd/MM/yyyy", { locale: es })}` },
    currentLocation && { key: "location", label: locationQuery || "Ubicación seleccionada" },
  ].filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Formulario de búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle>
            Buscar Canchas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selector de Áreas del Polideportivo: Canchas de Grass vs Canchas de Losa */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-muted/60 border border-border">
            <div className="space-y-0.5">
              <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                Área del Polideportivo:
              </span>
              <p className="text-xs text-muted-foreground">
                Elige el área para ver sus respectivas canchas disponibles
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant={selectedSurface === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => handleSelectSurface("all")}
                className="font-medium text-xs sm:text-sm h-9"
              >
                Todas
              </Button>
              <Button
                type="button"
                variant={selectedSurface === "grass" ? "default" : "outline"}
                size="sm"
                onClick={() => handleSelectSurface("grass")}
                className={cn(
                  "font-medium text-xs sm:text-sm h-9 transition-all",
                  selectedSurface === "grass"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm"
                    : "border-emerald-600/30 hover:border-emerald-600 hover:text-emerald-600"
                )}
              >
                Canchas de Grass
              </Button>
              <Button
                type="button"
                variant={selectedSurface === "losa" ? "default" : "outline"}
                size="sm"
                onClick={() => handleSelectSurface("losa")}
                className={cn(
                  "font-medium text-xs sm:text-sm h-9 transition-all",
                  selectedSurface === "losa"
                    ? "bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-sm"
                    : "border-amber-600/30 hover:border-amber-600 hover:text-amber-600"
                )}
              >
                Canchas de Losa
              </Button>
            </div>
          </div>
          {/* Búsqueda por texto */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Buscar cancha</label>
              <Input
                placeholder="Nombre de cancha o características..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Buscar por ubicación</label>
              <GooglePlacesAutocomplete
                placeholder="Buscar distrito, dirección o lugar..."
                onPlaceSelect={handlePlaceSelect}
                value={locationQuery ?? ''}
                onChange={setLocationQuery}
              />
            </div>
          </div>

          {/* Botón de ubicación actual */}
          <div className="flex justify-start">
            <Button
              variant="outline"
              size="sm"
              onClick={getCurrentLocation}
              disabled={isLoadingLocation}
              className="gap-2"
            >
              <Navigation className="h-4 w-4" />
              {isLoadingLocation ? "Obteniendo ubicación..." : "Usar mi ubicación actual"}
            </Button>
          </div>

          {/* Filtros */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end">
            <div>
              <label className="mb-2 block text-sm font-medium">Fecha</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Tipo de Cancha</label>
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las canchas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las canchas</SelectItem>
                  {courtTypes.map((sport) => (
                    <SelectItem key={sport.value} value={sport.value}>
                      {sport.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
                <label className="mb-2 block text-sm font-medium">Hora</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar la hora" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem key={'all'} value={'all'}>
                            Todos los horarios
                      </SelectItem>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button onClick={handleSearch} className="flex-1" disabled={isSearching}>
              {isSearching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <SearchIcon className="mr-2 h-4 w-4" />

                Buscar
              </Button>
              {activeFilters.length > 0 && (
                <Button variant="outline" onClick={clearFilters}>
                  Limpiar
                </Button>
              )}
            </div>
          </div>

          {/* Filtros activos */}
          {activeFilters.length > 0 && (
            <div>
              <Separator className="mb-3" />
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium">Filtros activos:</span>
                {activeFilters.map((filter, index) =>
                  filter && typeof filter === "object" && "key" in filter ? (
                    <Badge key={filter.key} variant="secondary" className="gap-1">
                      {filter.label}
                    </Badge>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Ubicación actual */}
          {currentLocation && (
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPinIcon className="h-4 w-4 text-primary" />
                <span className="font-medium">Ubicación:</span>
                <span>{locationQuery || `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Resultados de búsqueda</h2>
        <Tabs value={view} onValueChange={(v) => setView(v as "list" | "map")}>
          <TabsList>
            <TabsTrigger value="list" className="gap-2">
              <ListIcon className="h-4 w-4" />
              Lista
            </TabsTrigger>
            <TabsTrigger value="map" className="gap-2">
              <MapIcon className="h-4 w-4" />
              Mapa
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={view} className="w-full">
        <TabsContent value="list" className="mt-0">
          <SearchResults
            searchQuery={searchQuery}
            selectedSport={selectedSport}
            selectedSurface={selectedSurface}
            selectedPriceRange={selectedPriceRange}
            selectedDate={selectedDate}
            currentLocation={currentLocation}
            user={user}
            pendingReservation={pendingReservation}
            onClearPendingReservation={() => setPendingReservation(null)}
          />
        </TabsContent>
        <TabsContent value="map" className="mt-0">
          <MapView
            searchQuery={searchQuery}
            selectedSport={selectedSport}
            // selectedTeamSize={selectedTeamSize}
            selectedPriceRange={selectedPriceRange}
            currentLocation={currentLocation}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
