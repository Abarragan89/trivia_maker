import { ADD_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Auth from '../../utils/auth'


function Login() {
    const [signup] = useMutation(ADD_USER)
    const [formStateSignup, setFormStateSignup] = useState({
        username: '',
        password: '',
        email: ''
    })
    const [isUser, setIsUser] = useState(false)


    // update state based on form input changes
    const handleChangeSignup = (event) => {
        const { name, value } = event.target;
        setFormStateSignup({
            ...formStateSignup,
            [name]: value,
        });
        console.log(formStateSignup)
    };

    async function handleSubmitSignup(event) {
        event.preventDefault();
        try {
            console.log(formStateSignup)
            const { data } = await signup({
                variables: { ...formStateSignup }
            })
            Auth.login(data.addUser.token);
        } catch (e) {
            console.log(e);
        }
        // clear form values
        setFormStateSignup({
            email: '',
            password: '',
            username: ''
        });
    };

    return (
        <>
            {isUser ?
                <p>Login</p>
                :
                <form onSubmit={handleSubmitSignup}>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' onChange={handleChangeSignup}></input>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' onChange={handleChangeSignup}></input>
                    <label htmlFor='password'>Password</label>
                    <input type='text' name='password' onChange={handleChangeSignup}></input>
                    <button type='submit'>Sign up</button>
                    <p onClick={() => setIsUser(true)}>Already have an accout?</p>
                </form>
            }
        </>
    )
}

export default Login;