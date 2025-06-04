import { Element } from "react-scroll";
import Form from "./Form/Form";
import Logo from "../../Logo/Logo";
import './Contact.css';


const Contact = () => {
  

  return (
    <Element name="contact">
      <div className="contactContainer">
        <div>
          <Logo to="#"/>
        </div>
        <Form/>
        
      </div>
    </Element>
  )
}

export default Contact
