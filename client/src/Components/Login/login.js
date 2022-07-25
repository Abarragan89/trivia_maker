import { ADD_USER, LOGIN_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/header';
import Auth from '../../utils/auth'
import './login.css'


function Login() {
    const [signup] = useMutation(ADD_USER)
    const [login] = useMutation(LOGIN_USER);
    
    //////////////////////////////signup //////////////////////////
    const [formStateSignup, setFormStateSignup] = useState({
        username: '',
        password: '',
        email: ''
    })
    const [isUser, setIsUser] = useState(false)

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
            window.location.replace('/dashboard')
        } catch (e) {
            console.log(e);
            const loginError = document.querySelector('.login-error')
            loginError.innerHTML = 'Username must be unique and email valid'
        }
    };


    ////////////////////////////////////////////Login//////////////////////////////
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
            window.location.replace('/dashboard')
        } catch (e) {
            console.log(e);
            const loginError = document.querySelector('.login-error')
            console.log('span el', loginError)
            loginError.innerHTML = 'Incorrect Credentials'
            return;
        }
    };

    
    return (
        <>
            <Header />
            <main>
                <aside>
                    {isUser ?
                        <>
                            <form onSubmit={handleSubmitLogin} className='flex-box-col-se login-form'>
                                <legend><span>Login</span></legend>
                                <p>Welcome Back</p>
                                <input type='text' className='login-input' value={formStateLogin.email} placeholder='Email' name='email' onChange={handleChangeLogin}></input>
                                <input type='password' className='login-input' value={formStateLogin.password} placeholder='Password' name='password' onChange={handleChangeLogin}></input>
                                <span className='login-error'></span>
                                <button type='submit' className='login-btn'>Login</button>
                                <p id='forgot-password'>Forgot password?</p>
                            </form>
                            <p className='switch-login'>Or<span onClick={() => setIsUser(false)}>create an account.</span></p>
                        </>
                        :
                        <>
                            <form onSubmit={handleSubmitSignup} className='flex-box-col-se login-form'>
                                <legend><span>Sign up</span></legend>
                                <p>Create a free account to start making trivia games!</p>
                                <input type='text' className='login-input' value={formStateSignup.username} placeholder='Username' name='username' onChange={handleChangeSignup} autoFocus required></input>
                                <input type='text' className='login-input' value={formStateSignup.email} placeholder='Email' name='email' onChange={handleChangeSignup} required></input>
                                <input type='password' className='login-input' value={formStateSignup.password} placeholder='Password' minLength='6' name='password' onChange={handleChangeSignup} required></input>
                                <span className='login-error'></span>
                                <button type='submit' className='login-btn'>Sign up</button>
                                
                            </form>
                            <p className='switch-login'>Already have an accout?<span onClick={() => setIsUser(true)}>Login.</span></p>
                        </>
                    }
                </aside>
            </main>

        </>
    )
}

export default Login;