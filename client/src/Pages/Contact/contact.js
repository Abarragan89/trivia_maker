import { useState, useRef } from 'react';
import { validateEmail } from '../../utils/helpers';
import emailjs from 'emailjs-com';
import './contact.css'
import Header from '../../Components/Header/header';


function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' })
    const { name, email, message } = formState
    const [errorMessage, setErrorMessage] = useState('');

    // handle error handling and on change events in the form elements
    function handleChange(e) {
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            if (!isValid) {
                setErrorMessage('Your email is invalid')
            } else {
                setErrorMessage('');
            }
        } else {
            if (!e.target.value.length) {
                setErrorMessage(`${e.target.name} is required.`)
            } else {
                setErrorMessage('');
            }
        }
        setFormState({ ...formState, [e.target.name]: e.target.value })
        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value })
        }
    }
    // target the form
    const form = useRef()
    function handleSubmit(e) {
        e.preventDefault();
        emailjs.sendForm('service_i8eq2u9', 'template_qks17rp', form.current, 'aoRfgHLPWPCI6Cu6w')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
        setFormState({ name: '', email: '', message: '' })
    }

    return (
        <>
            <Header />
            <section className=' section contact-page'>
                <h1><span>Contact  Me</span></h1>
                <form ref={form} id='contact-form' onSubmit={handleSubmit}>
                <p>Feedback is welcomed. I am always looking for ways to improve user experience.</p>
                    <div className="form-div">
                        <label htmlFor='name'>Name:</label><br />
                        <input type='text' defaultValue={name} name='name' id='name' onBlur={handleChange} required/>
                    </div>
                    <div className="form-div">
                        <label htmlFor='email'>Email:</label><br />
                        <input type='email' defaultValue={email} name='email' id='email' onBlur={handleChange} required/>
                    </div>
                    <div className="form-div">
                        <label htmlFor='message'>Message:</label><br />
                        <textarea type='message' defaultValue={message} rows='5' name='message' id='message' onBlur={handleChange} required/>
                    </div>
                    {errorMessage && (
                        <div>
                            <p className="error-text">{errorMessage}</p>
                        </div>
                    )}
                    <div className="form-div">
                        <button type='submit' id='contact-submit'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Contact;