import { Element } from "react-scroll";
import Form from "./Form/Form";
import './Contact.css';


const Contact = () => {


  return (
    <Element name="contact">
      <div className="contactContainer">
        <Form />
      </div>
    </Element>
  )
}

export default Contact