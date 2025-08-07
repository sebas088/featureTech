import { useState } from "react";
import Form from "./Form/Form"; // Formulario de contacto
import FloatingButton from "../../FloatingButton/FloatingButton";
import './Contact.css';


const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => setIsOpen(!isOpen);

  return (
    <div>
      <FloatingButton onClick={toggleForm} />

      {/* Panel flotante */}
      <div className={`contactPanel ${isOpen ? 'open' : ''}`}>
        <Form />
      </div>
    </div>
  )
}

export default Contact