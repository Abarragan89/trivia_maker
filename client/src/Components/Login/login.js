import { ADD_USER, LOGIN_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Auth from '../../utils/auth'
import './login.css'


function Login() {
    const [signup] = useMutation(ADD_USER)
    const [login] = useMutation(LOGIN_USER);
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


    ////////////////////////////////////////////
    const [formStateLogin, setFormStateLogin] = useState({
        password: '',
        email: ''
    })
    // update state based on form input changes
    const handleChangeLogin = (event) => {
        const { name, value } = event.target;
        setFormStateLogin({
            ...formStateLogin,
            [name]: value,
        });
    };

    async function handleSubmitLogin(event) {
        event.preventDefault();
        try {
            console.log(formStateLogin)
            const { data } = await login({
                variables: { ...formStateLogin }
            })
            Auth.login(data.login.token);
        } catch (e) {
            console.log(e);
        }
        // clear form values
        setFormStateLogin({
            email: '',
            password: '',
        });
    };

    return (
        <>
            {isUser ?
                <>
                    <form onSubmit={handleSubmitLogin} className='flex-box-col-se login-form'>
                        <legend><span>Login</span></legend>
                        <p>Welcome Back</p>
                        <input type='text' className='login-input' placeholder='Email' name='email' onChange={handleChangeLogin}></input>
                        <input type='password' className='login-input' placeholder='Password' name='password' onChange={handleChangeLogin}></input>
                        <button type='submit' className='login-btn'>Login</button>
                    </form>
                    <p className='switch-login'>Or<span onClick={() => setIsUser(false)}>create an account.</span></p>
                </>
                :
                <>
                    <form onSubmit={handleSubmitSignup} className='flex-box-col-se login-form'>
                        <legend><span>Sign up</span></legend>
                        <p>Create a free account to start making trivia games!</p>
                        <input type='text' className='login-input' placeholder='Username' name='username' onChange={handleChangeSignup} autoFocus></input>
                        <input type='text' className='login-input' placeholder='Email' name='email' onChange={handleChangeSignup}></input>
                        <input type='password' className='login-input' placeholder='Password' name='password' onChange={handleChangeSignup}></input>
                        <button type='submit' className='login-btn'>Sign up</button>
                    </form>
                    <p className='switch-login'>Already have an accout?<span onClick={() => setIsUser(true)}>Sign in.</span></p>
                </>
            }
        </>
    )
}

export default Login;