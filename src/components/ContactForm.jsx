import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ContactForm = ({ onSubmit, initialContact = {} }) => {
  const [name, setName] = useState(initialContact.name || '');
  const [phone, setPhone] = useState(initialContact.phone || '');
  const [saved, setSaved] = useState(false);

  const isFormValid = name.trim() !== '' && phone.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = { name, phone };

    if (onSubmit) {
      onSubmit(newContact);
    }

    setSaved(true);
    setName('');
    setPhone('');
  };

  return (
    <Card className="bg-neutral-200 w-full max-w-4xl mx-auto mb-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Agregar Contacto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSaved(false);
            }}
            required
          />
          <Input
            type="tel"
            placeholder="Número de Teléfono"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setSaved(false);
            }}
            required
          />
          <Button 
            type="submit"
            disabled={!isFormValid}
            className={`${isFormValid 
                ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}`}
          >
            {saved ? 'Guardado' : 'Guardar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
