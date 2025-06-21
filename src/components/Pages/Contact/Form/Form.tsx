import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
// import Logo from "../../../Logo/Logo";
import './Form.css';

const Form = () => {
    // Estados locales para los campos del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    // Estados para controlar la animacion de mensaje enviado
    const [submitted, setSubmitted] = useState(false);

    // Ref para detectar cuadno el formulario entra en el viewport
    const formRef = useRef(null);
    const isInView = useInView(formRef, { once: true });

    // URL base de la API (se toma desde variables de entorno)
    const API_URL = import.meta.env.VITE_API_URL;
    
    // Maneja el envio del formulario (POST al backend)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validacion basica de email
        if (!email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        try {
            console.log("=========", API_URL);
            const response = await fetch(`${API_URL}/form/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, subject, message }),
            });

            if (response.status === 201) {
                // Si el backend responde con exito: limpiamos el formulario
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
                setSubmitted(true);

                // Ocultamos el mensaje de exito despues de 4 segundos
                setTimeout(() => setSubmitted(false), 4000);
            } else {
                // Si ocurre un error: mostramos el mensaje del backend
                const errorText = await response.text();
                console.log("Error status:", response.status);
                console.log("Respuesta del backend:", errorText);
                alert(`Error: ${errorText}`);
            }
        } catch (err) {
            console.error(err);
            alert("Hubo un error al enviar el mensaje. Inténtalo más tarde.")
        }

    }

    return (
        <motion.div
            ref={formRef}
            className="formContainer"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
        >
            {/* <Logo to="#" /> */}
            <h2>Contact us:</h2>
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="name">Name: </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label>Email: </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label>Subject: </label>
                    <input
                        id="subject"
                        type="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label>Message: </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={4}
                    />
                </div>
                <div className="formGroup buttonGroup">
                    <button type="submit">Send</button>
                </div>
            </form>

            <AnimatePresence>
                {/* Mensaje de exito que aparece temporalmente */}
                {submitted && (
                    <motion.p
                        className="successMessage"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                    >
                        Message sent successfully!
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Form
