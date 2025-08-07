import { useState, useRef, useEffect } from "react";
import Form from "./Form/Form"; // Formulario de contacto
import FloatingButton from "../../FloatingButton/FloatingButton";
import './Contact.css';


const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleForm = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handelClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handelClickOutside);

    return () => {
      document.removeEventListener("mousedown", handelClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <FloatingButton onClick={toggleForm} ref={buttonRef}/>

      {/* Panel flotante */}
      <div 
        className={`contactPanel ${isOpen ? 'open' : ''}`}
        ref={panelRef}
      >
        <Form />
      </div>
    </div>
  )
}

export default Contact