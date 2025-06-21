import { Element } from "react-scroll";  // Componente que marca un "ancla" para scroll suave
import Form from "./Form/Form"; // Formulario de contacto
import './Contact.css';


const Contact = () => {
  return (
    // Este "Element" permite que otros botones (NavButton) hagan scroll hasta aqui
    <Element name="contact">
      <div className="contactContainer">
        <Form />
      </div>
    </Element>
  )
}

export default Contact