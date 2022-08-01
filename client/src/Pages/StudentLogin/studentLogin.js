import mouseClick from '../../assets/sounds/mouse-click.wav';
import Footer from '../../Components/Footer/footer.js';
import useSound from 'use-sound';
import Header from '../../Components/Header/header';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Components/Login/login.css';

function StudentLogin() {
    const [teacherName, setTeacherName] = useState('');
    const [mouseClickSound] = useSound(mouseClick, { volume: .6 })

    // update state based on form input changes
    const handleStudentLogin = (event) => {
        const { value } = event.target;
        setTeacherName(value);
    };
    return (
        <>
            <Header />
            <section>
                <form className='flex-box-col-se login-form'>
                    <legend><span>Student</span></legend>
                    <input
                        placeholder="Enter Teacher Username"
                        className="login-input"
                        name="teacher-username"
                        type="text"
                        id='forgot-password-input'
                        value={teacherName}
                        onChange={handleStudentLogin}
                    />
                    <Link className='login-btn' id='student-login-btn' onClick={mouseClickSound}  to={`/student-dashboard/${teacherName}`}>Enter</Link>

                </form>
            </section>
            <Footer />
        </>
    )
}

export default StudentLogin

