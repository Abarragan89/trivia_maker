import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { UPDATE_PASSWORD } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import '../../Components/Login/login.css'
import './forgotPassword.css'

function ForgotPassword() {
    const userId = useParams().userId

    const [formState, setFromState] = useState({
        password: ''
    })

    const [updatePassword] = useMutation(UPDATE_PASSWORD)

    function handleChange(e) {
        const { value } = e.target
        setFromState({
            password: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await updatePassword({
            variables: {
                userId: userId,
                newPassword: formState.password
            }
        })
        window.location.replace('/login')
    }

    const [showPassword, setShowPassword] = useState(false)
    function togglePassword () {
        const checkbox = document.getElementById('show-password')
        if(checkbox.checked) {
            setShowPassword(true)
            return
        } 
        setShowPassword(false)
    }

    return (
        <section>
            <form className="flex-box-col-se login-form" id='password-reset-form' onSubmit={handleSubmit}>
            <legend><span>Password Reset</span></legend>
                <div>
                    <input
                        placeholder="New Password"
                        className="login-input"
                        name="password"
                        type={`${showPassword ? 'text' : 'password'}`}
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <div id="show-password-div">
                        <input onClick={togglePassword} type="checkbox" id="show-password" name="show-password" value="Bike" />
                        <label htmlFor="show-password">Show password</label><br></br>
                    </div>

                    <button className="login-btn" type="submit">Confirm Password</button>
                </div>
            </form>
        </section>
    )
}

export default ForgotPassword;