import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContactList = ({ contacts, onDelete, selectedContact, setSelectedContact, ticket }) => {

  // Función para generar el mensaje de WhatsApp con el ticket
  const generateWhatsAppMessage = () => {
    if (!ticket || selectedContact === null || selectedContact < 0) {
      alert("Por favor, selecciona un contacto y genera un ticket.");
      return;
    }
    

    let message = `*Ticket para ${contacts[selectedContact].name}*\n\n`;

    ticket.detalles.forEach(item => {
      message += `Detalle: ${item.detalle}\nMonto: $${item.monto}\nResultado: ${item.resultado === 'win' ? 'Gana' : 'Pierde'}\nSubtotal: $${item.subtotal.toFixed(2)}\n\n`;
    });
    message += `Total: $${ticket.montoTotal.toFixed(2)}\n\n`;

    return message;
  };

  // Función para enviar el ticket por WhatsApp
  const sendTicketToWhatsApp = () => {
    console.log('selectedContact:', selectedContact);
    console.log("ticket en ContactList:", ticket);

    const message = generateWhatsAppMessage();
    if (message) {
      const phone = contacts[selectedContact].phone;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank"); // Abre WhatsApp con el mensaje
    } else {
      alert("Por favor, selecciona un contacto y genera un ticket.");
    }
  };
  

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Contactos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Desplegable para seleccionar un contacto */}
        <select
          id="contactSelect"
          value={selectedContact !== null ? contacts[selectedContact].phone : ""}
          onChange={(e) => {
            const selectedPhone = e.target.value;
            const selectedIndex = contacts.findIndex((contact) => contact.phone === selectedPhone);
            setSelectedContact(selectedIndex); // Actualizar el contacto seleccionado
          }}
        >

          <option value="">Selecciona un contacto</option>
          {contacts.map((contact, index) => (
            <option key={index} value={contact.phone}>
              {contact.name} - {contact.phone}
            </option>
          ))}
        </select>

        {/* Botón para eliminar el contacto seleccionado */}
        {contacts.length > 0 && selectedContact !== null && (
          <Button onClick={onDelete}>Eliminar</Button>
        )}

        {/* Botón para enviar el ticket por WhatsApp */}
        <Button onClick={sendTicketToWhatsApp}>
          Enviar Ticket
        </Button>
      </CardContent>
    </Card>
  );
};

// Validación de las propiedades
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedContact: PropTypes.number,  // Puede ser null si no se seleccionó nada
  setSelectedContact: PropTypes.func.isRequired,
  ticket: PropTypes.shape({
    detalles: PropTypes.arrayOf(
      PropTypes.shape({
        detalle: PropTypes.string.isRequired,
        monto: PropTypes.number.isRequired,
        resultado: PropTypes.oneOf(['win', 'lose']).isRequired,
        subtotal: PropTypes.number.isRequired,
      })
    ).isRequired,
    montoTotal: PropTypes.number.isRequired,
  }),
};

export default ContactList;
