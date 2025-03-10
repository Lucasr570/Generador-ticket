
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function CalculadoraDeTicket({ onTicketGenerated }) {
  const [detalles, setDetalles] = useState([])
  const [siguienteId, setSiguienteId] = useState(1)

  const agregarNuevoDetalle = () => {
    const nuevoDetalle = {
      id: siguienteId,
      detalle: '',
      monto: 0,
      resultado: '',
      porcentaje: 0,
      subtotal: 0
    }
    setDetalles([...detalles, nuevoDetalle])
    setSiguienteId(siguienteId + 1)
  }

  const actualizarDetalle = (id, campo, valor) => {
    setDetalles(detalles.map(item => {
      if (item.id === id) {
        const itemActualizado = { ...item, [campo]: valor }
        return calcularItemDetalle(itemActualizado)
      }
      return item
    }))
  }

  const calcularItemDetalle = (item) => {
    const tasaPorcentaje = item.resultado === 'win' ? 0.10 : item.resultado === 'lose' ? 0.05 : 0;
    const montoPorcentaje = item.monto * tasaPorcentaje;
  
    let subtotal;
  
    if (item.resultado === 'win') {
      subtotal = (item.monto * 2) - montoPorcentaje; // Doble el monto menos el porcentaje
    } else if (item.resultado === 'lose') {
      subtotal = 0; // Cuando pierde, el subtotal es 0
    } else {
      subtotal = item.monto - montoPorcentaje; // Si no se ha seleccionado, calcula normalmente
    }
  
    return { ...item, porcentaje: montoPorcentaje, subtotal };
  }
  
  const montoTotal = detalles.reduce((suma, item) => suma + item.subtotal, 0)

  const generarTicket = () => {
    // Crear el objeto de ticket con los detalles y monto total
    const ticketGenerado = {
      detalles,
      montoTotal
    };

    // Llamar a la función onTicketGenerated para pasar el ticket generado al componente principal
    onTicketGenerated(ticketGenerado);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center"> Ticket</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Detalle</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Gana o Pierde</TableHead>
              <TableHead>Porcentaje</TableHead>
              <TableHead>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detalles.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Input
                    value={item.detalle}
                    onChange={(e) => actualizarDetalle(item.id, 'detalle', e.target.value)}
                    placeholder="Ingrese el detalle"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.monto || ''}
                    onChange={(e) => actualizarDetalle(item.id, 'monto', Number(e.target.value))}
                    placeholder="Monto"
                  />
                </TableCell>
                <TableCell>
                  <Select 
                    value={item.resultado} 
                    onValueChange={(valor) => actualizarDetalle(item.id, 'resultado', valor)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="win">Gana</SelectItem>
                      <SelectItem value="lose">Pierde</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.porcentaje.toFixed(2)}
                    readOnly
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.subtotal.toFixed(2)}
                    readOnly
                  />
                </TableCell>
              </TableRow>
            ))}
            {detalles.length > 0 && (
              <TableRow>
                <TableCell colSpan={4} className="font-bold text-right">Total:</TableCell>
                <TableCell className="font-bold">
                  <Input
                    type="number"
                    value={montoTotal.toFixed(2)}
                    readOnly
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Button onClick={agregarNuevoDetalle}>Agregar Detalle</Button>
        <Button onClick={generarTicket}>Generar Ticket</Button>
      </CardContent>
    </Card>
  )
}
