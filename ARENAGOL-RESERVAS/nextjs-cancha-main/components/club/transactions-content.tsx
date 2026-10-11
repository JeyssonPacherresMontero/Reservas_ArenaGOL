"use client"

import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  CalendarIcon,
  ReceiptIcon,
  CheckCircle2Icon,
  ClockIcon,
  EyeIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getTransactions, getTransactionMetrics, Transaction } from "@/lib/transactions"
import { confirmManualPayment } from "@/lib/payments"
import { Skeleton } from "@/components/ui/skeleton"

export function TransactionsContent() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [dateStr, setDateStr] = useState<string>("")
  const limit = 10
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [methodFilter, setMethodFilter] = useState<string>("ALL")
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL")

  // Modal comprobante
  const [selectedVoucherTx, setSelectedVoucherTx] = useState<Transaction | null>(null)
  const [isAuditing, setIsAuditing] = useState(false)

  // Si hay fecha seleccionada, filtramos desde las 00:00 hasta las 23:59 de ese día local (convertimos a ISO)
  const startDate = dateStr ? new Date(`${dateStr}T00:00:00`).toISOString() : undefined
  const endDate = dateStr ? new Date(`${dateStr}T23:59:59`).toISOString() : undefined

  const activeStatus = statusFilter === 'ALL' ? undefined : statusFilter
  const activeMethod = methodFilter === 'ALL' ? undefined : methodFilter
  const activeCategory = categoryFilter === 'ALL' ? undefined : categoryFilter

  const { data: metricsData, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['transaction-metrics', startDate, endDate, activeMethod, activeCategory],
    queryFn: () => getTransactionMetrics(startDate, endDate, activeMethod, activeCategory),
  })

  const { data: txData, isLoading } = useQuery({
    queryKey: ['transactions', page, limit, startDate, endDate, activeStatus, activeMethod, activeCategory],
    queryFn: () => getTransactions(page, limit, startDate, endDate, activeStatus, activeMethod, activeCategory),
  })

  const handleAuditVoucher = async (tx: Transaction, action: 'CONFIRMAR' | 'RECHAZAR') => {
    try {
      setIsAuditing(true)
      const targetId = tx.reservationId || tx.sourceId.split(':')[0]
      await confirmManualPayment(targetId, action)
      toast.success(action === 'CONFIRMAR' ? 'Pago confirmado exitosamente' : 'Pago rechazado')
      setSelectedVoucherTx(null)
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['transaction-metrics'] })
      queryClient.invalidateQueries({ queryKey: ['club-payment-metrics'] })
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Error al procesar el comprobante')
    } finally {
      setIsAuditing(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED': return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Aprobado</Badge>
      case 'PENDING': return <Badge variant="secondary" className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">Pendiente</Badge>
      case 'REJECTED': return <Badge variant="destructive">Rechazado</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'RESERVATION_FULL': return 'Reserva (Completo)'
      case 'RESERVATION_ADVANCE': return 'Reserva (Adelanto)'
      case 'RESERVATION_BALANCE': return 'Reserva (Saldo)'
      default: return cat
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(amount)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <ReceiptIcon className="w-8 h-8" />
          Transacciones
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Historial detallado de cobros e ingresos de reservas y eventos.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Ingresos Confirmados */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Ingresos Confirmados</CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            {isLoadingMetrics ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(metricsData?.totalIngresosConfirmados ?? metricsData?.totalIngresosNetos ?? 0)}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {metricsData?.countConfirmados ?? 0} cobro(s) verificado(s)
            </p>
          </CardContent>
        </Card>

        {/* 2. Cobros Pendientes (en espera de auditoría/revisión) */}
        <Card className={(metricsData?.totalPendiente || 0) > 0 ? "border-amber-500/40 bg-amber-500/5" : ""}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Cobros Pendientes</CardTitle>
            <ClockIcon className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            {isLoadingMetrics ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {formatCurrency(metricsData?.totalPendiente || 0)}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {metricsData?.countPendientes ?? 0} pago(s) en espera de revisión
            </p>
          </CardContent>
        </Card>

        {/* 3. Total Registrado (Confirmados + Pendientes) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Registrado</CardTitle>
            <ReceiptIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {isLoadingMetrics ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold">
                {formatCurrency(metricsData?.totalRegistrado ?? 0)}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">Suma confirmados y en proceso</p>
          </CardContent>
        </Card>

        {/* 4. Ingresos Eventos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">Ingresos Eventos</CardTitle>
            <CalendarIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {isLoadingMetrics ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(metricsData?.totalIngresosEventos || 0)}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">Total recaudado por eventos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 pb-4">
          <div>
            <CardTitle>Historial de Movimientos</CardTitle>
            <CardDescription>Visualiza y filtra todas las transacciones generadas en tu club.</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Fecha:</span>
              <Input 
                type="date" 
                value={dateStr}
                onChange={(e) => { setDateStr(e.target.value); setPage(1); }}
                className="w-[140px] h-9"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[140px] h-9"><SelectValue placeholder="Estado" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos (Estado)</SelectItem>
                <SelectItem value="APPROVED">Aprobados</SelectItem>
                <SelectItem value="PENDING">Pendientes</SelectItem>
                <SelectItem value="REJECTED">Rechazados</SelectItem>
              </SelectContent>
            </Select>

            <Select value={methodFilter} onValueChange={(v) => { setMethodFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[150px] h-9"><SelectValue placeholder="Método" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos (Método)</SelectItem>
                <SelectItem value="YAPE">Yape</SelectItem>
                <SelectItem value="PLIN">Plin</SelectItem>
                <SelectItem value="TRANSFERENCIA">Transferencia</SelectItem>
                <SelectItem value="CASH">Efectivo</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setPage(1); }}>
              <SelectTrigger className="w-[180px] h-9"><SelectValue placeholder="Concepto" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos (Concepto)</SelectItem>
                <SelectItem value="RESERVATION_FULL">Reserva (Completo)</SelectItem>
                <SelectItem value="RESERVATION_ADVANCE">Reserva (Adelanto)</SelectItem>
                <SelectItem value="RESERVATION_BALANCE">Reserva (Saldo)</SelectItem>
              </SelectContent>
            </Select>

            {(dateStr || statusFilter !== 'ALL' || methodFilter !== 'ALL' || categoryFilter !== 'ALL') && (
              <Button variant="ghost" size="sm" onClick={() => {
                setDateStr("");
                setStatusFilter("ALL");
                setMethodFilter("ALL");
                setCategoryFilter("ALL");
                setPage(1);
              }} className="text-xs h-9">
                Limpiar Filtros
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Origen / Método</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="text-center">Comprobante</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16 mx-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : txData?.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No hay transacciones registradas.
                    </TableCell>
                  </TableRow>
                ) : (
                  txData?.data.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium whitespace-nowrap">
                        {tx.occurredAt ? format(new Date(tx.occurredAt), "dd MMM yyyy, HH:mm", { locale: es }) : format(new Date(tx.submittedAt || new Date()), "dd MMM yyyy, HH:mm", { locale: es })}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{getCategoryLabel(tx.category)}</span>
                          <span className="text-xs text-muted-foreground">{tx.description}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="capitalize font-medium">{tx.paymentMethod.toLowerCase()}</span>
                          <span className="text-xs text-muted-foreground">{tx.origin}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(tx.status)}</TableCell>
                      <TableCell className={`text-right font-bold ${tx.direction === 'OUT' ? 'text-red-600' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        {tx.direction === 'OUT' ? '-' : '+'}{formatCurrency(tx.netAmount || tx.grossAmount)}
                      </TableCell>
                      <TableCell className="text-center">
                        {tx.voucherRef ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1.5 px-3 text-xs"
                            onClick={() => setSelectedVoucherTx(tx)}
                          >
                            <EyeIcon className="h-3.5 w-3.5" />
                            {tx.status === 'PENDING' ? 'Revisar' : 'Ver'}
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {txData && txData.totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Anterior
              </Button>
              <div className="text-sm text-muted-foreground">
                Página {page} de {txData.totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(txData.totalPages, p + 1))}
                disabled={page === txData.totalPages}
              >
                Siguiente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal para ver y validar comprobante */}
      <Dialog open={!!selectedVoucherTx} onOpenChange={(open) => !open && setSelectedVoucherTx(null)}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ReceiptIcon className="h-5 w-5 text-primary" />
              Comprobante de Pago
            </DialogTitle>
          </DialogHeader>
          {selectedVoucherTx && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-2 p-3 bg-muted/40 rounded-lg text-sm border">
                <div>
                  <p className="font-semibold">{selectedVoucherTx.description}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Método: <span className="font-medium capitalize">{selectedVoucherTx.paymentMethod.toLowerCase()}</span> • Origen: {selectedVoucherTx.origin}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    +{formatCurrency(selectedVoucherTx.netAmount || selectedVoucherTx.grossAmount)}
                  </p>
                  <div>{getStatusBadge(selectedVoucherTx.status)}</div>
                </div>
              </div>

              {selectedVoucherTx.voucherRef && (
                <div className="relative border rounded-lg overflow-hidden bg-black/5 dark:bg-white/5 flex items-center justify-center min-h-[220px] max-h-[380px]">
                  <img
                    src={selectedVoucherTx.voucherRef}
                    alt="Comprobante de pago"
                    className="max-h-[380px] w-auto object-contain rounded"
                  />
                </div>
              )}

              {selectedVoucherTx.status === 'PENDING' ? (
                <div className="space-y-3 pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Verifica que el monto coincida en tu cuenta bancaria o billetera digital antes de confirmar la reserva.
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={isAuditing}
                      onClick={() => handleAuditVoucher(selectedVoucherTx, 'RECHAZAR')}
                    >
                      Rechazar
                    </Button>
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      size="sm"
                      disabled={isAuditing}
                      onClick={() => handleAuditVoucher(selectedVoucherTx, 'CONFIRMAR')}
                    >
                      Confirmar Pago
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end pt-2 border-t">
                  <Button variant="outline" size="sm" onClick={() => setSelectedVoucherTx(null)}>
                    Cerrar
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
