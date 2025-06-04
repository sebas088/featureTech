import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import './Form.css';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const formRef = useRef(null);
    const isInView = useInView(formRef, { once:true });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }

        console.log('Data sent:', { name, email, subject, message });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

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
                <button type="submit">Send</button>
            </form>

            <AnimatePresence>
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
