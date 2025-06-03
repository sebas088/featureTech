import { Element } from "react-scroll";
import { useState } from "react";


const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email', email, 'Message:', message);
    setEmail('');
    setMessage('');
  };

  return (
    <Element name="contact">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Mensaje:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
        </form>
      </div>
    </Element>
  )
}

export default Contact
