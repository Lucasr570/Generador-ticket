import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContactForm = ({ onSubmit, initialContact = {} }) => {
  // Si `initialContact` tiene valores, usa sus propiedades, sino inicializa en vacío
  const [name, setName] = useState(initialContact.name || '');
  const [phone, setPhone] = useState(initialContact.phone || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear el objeto de contacto
    const newContact = { name, phone };

    // Llamar a la función onSubmit para notificar el contacto agregado
    if (onSubmit) {
      onSubmit(newContact);  // Pasa el nuevo contacto al componente padre
    }

    // Limpiar el formulario después de agregar el contacto
    setName('');
    setPhone('');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Agregar Contacto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Número de Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button type="submit">Guardar</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
