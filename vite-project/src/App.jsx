import { useState, useEffect } from 'react';
import CalculadoraDeTicket from './Ticket';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // Estado del ticket
  const [ticket, setTicket] = useState(null);

  const handleTicketGenerated = (generatedTicket) => {
    setTicket(generatedTicket);
  };

  // Cargar los contactos desde localStorage cuando el componente se monta
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(savedContacts);
  }, []);

  // Función para agregar un nuevo contacto
  const handleAddContact = (contact) => {
    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  // Función para eliminar un contacto
  const handleDeleteContact = () => {
    if (selectedContact !== null) {
      const updatedContacts = contacts.filter((_, index) => index !== selectedContact);
      setContacts(updatedContacts);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      setSelectedContact(null); // Resetear selección
    }
  };

  return (
    <div>
      <CalculadoraDeTicket onTicketGenerated={handleTicketGenerated} />
      <ContactForm onSubmit={handleAddContact} />
      <ContactList 
        contacts={contacts} 
        onDelete={handleDeleteContact} 
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact} 
        ticket={ticket}
      />
    </div>
  );
};

export default App;
