import { LOGIN_USER } from '../../utils/mutations';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import Header from '../Header/header';
import Auth from '../../utils/auth'
import { SIGN_UP } from '../../utils/mutations';
import { QUERY_USER_BY_EMAIL } from '../../utils/queries';
import './login.css'
import mouseClick from '../../assets/sounds/mouse-click.wav';
import Footer from '../Footer/footer';
import useSound from 'use-sound';

function Login() {

    // MouseClick Sound
    const [mouseClickSound] = useSound(mouseClick, {volume: .6})

    // const [signup] = useMutation(ADD_USER)
    const [login] = useMutation(LOGIN_USER);
    let [signup, { error }] = useMutation(SIGN_UP);
    const [successSignup, setSuccessSignup] = useState(false)

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
    };

    async function handleSubmitSignup(event) {
        event.preventDefault();
        try {
            await signup({
                variables: { ...formStateSignup }
            })
            setSuccessSignup(true)
        } catch (e) {
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
            const { data } = await login({
                variables: { ...formStateLogin }
            })
            Auth.login(data.login.token);
            window.location.replace('/')
        } catch (e) {
            const loginError = document.querySelector('.login-error')
            loginError.innerHTML = 'Incorrect Credentials'
            return;
        }
    };


    //////// FORGOT password variables and logic ////////////
    const [didReset, setDidReset] = useState(false);
    const [formStateForgot, setFormStateForgot] = useState({ email: '' });
    const [queryEmail] = useLazyQuery(QUERY_USER_BY_EMAIL);

    // update state based on form input changes
    const handleChangeForgot = (event) => {
        const { name, value } = event.target;
        setFormStateForgot({
            ...formStateForgot,
            [name]: value,
        });
    };

    const [error2, setError2] = useState(false);
    const [success, setSuccess] = useState(false)

    // submit forgot
    const handleFormSubmitForgot = async (event) => {
        event.preventDefault();
        try {
            const { data } = await queryEmail({
                variables: { ...formStateForgot }
            })
            if (!data.userByEmail) {
                setError2(true)
                setSuccess(false)
            } else {
                setSuccess(true)
                setError2(false)
            }
        } catch (error) {
            console.log(error)
        }
        // clear form values
        setFormStateForgot({
            email: '',
        });
    };




    return (
        <>
            <Header />
            <main>
                {!isUser ?
                    <>
                        {didReset ?
                            <section>
                                <form className='flex-box-col-se login-form'onSubmit={handleFormSubmitForgot}>
                                <legend><span>Oops!</span></legend>
                                        <input
                                            placeholder="Email"
                                            className="login-input"
                                            name="email"
                                            type="email"
                                            id='forgot-password-input'
                                            value={formStateForgot.email}
                                            onChange={handleChangeForgot}
                                        />
                                        {error2 && <div className="login-error">No account found with that email</div>}
                                        {success && <div className='success-signup'>Check your email to reset your password.</div>}
                                        <button onClick={() => mouseClickSound()} className='login-btn' type="submit">Reset Password</button>
                                        <p className='back-to-login' onClick={() => setDidReset(false)}>Back to Login</p>
                           
                                </form>
                            </section>
                            :
                            <>
                                <form onSubmit={handleSubmitLogin} className='flex-box-col-se login-form'>
                                    <legend><span>Login</span></legend>
                                    <p>Welcome Back</p>
                                    <input type='text' className='login-input' value={formStateLogin.email} placeholder='Email' name='email' onChange={handleChangeLogin}></input>
                                    <input type='password' className='login-input' value={formStateLogin.password} placeholder='Password' name='password' onChange={handleChangeLogin}></input>
                                    <span className='login-error'></span>
                                    <button onClick={() => mouseClickSound()} type='submit' className='login-btn'>Login</button>
                                    <p id='forgot-password' onClick={() => setDidReset(true)}>Forgot password?</p>
                                </form>
                                <p className='switch-login'>Or<span onClick={() => setIsUser(true)}>create an account.</span></p>
                            </>
                        }
                    </>
                    :
                    <>
                        <form onSubmit={handleSubmitSignup} className='flex-box-col-se login-form'>
                            <legend><span>Sign up</span></legend>
                            <p>Create a free account to start making trivia games!</p>
                            <input type='text' className='login-input' value={formStateSignup.username} placeholder='Username' name='username' onChange={handleChangeSignup} autoFocus required></input>
                            <input type='text' className='login-input' value={formStateSignup.email} placeholder='Email' name='email' onChange={handleChangeSignup} required></input>
                            <input type='password' className='login-input' value={formStateSignup.password} placeholder='Password' minLength='6' name='password' onChange={handleChangeSignup} required></input>
                            {error && error.message === "Response not successful: Received status code 400" &&
                                <div className="login-error">Invalid Credentials</div>
                            }
                            {error && error.message !== "Response not successful: Received status code 400" &&
                                <div className="login-error">{error.message}</div>}
                            {successSignup && !error && <div className='success-signup'>Check your email to verify your account.</div>}
                            <button onClick={() => mouseClickSound()} type='submit' className='login-btn'>Sign up</button>

                        </form>
                        <p className='switch-login'>Already have an accout?<span onClick={() => setIsUser(false)}>Login.</span></p>
                    </>
                }
            </main>
            <Footer />
        </>
    )
}

export default Login;