import { QUERY_ME_BASIC } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import './header.css'
import { Link } from 'react-router-dom';
import '../../assets/photos/headerLogo.png';
import { useState } from 'react';


function Header() {
    const [goToLogin, setGoToLogin] = useState(true)
    const loggedIn = Auth.loggedIn();
    const loginOrSignup = {
        goToLogin, 
        setGoToLogin
    }

    return (
        <header id='main-header' className='flex-box-sb'>
            <div>
                <Link to='/'>
                <img id='home-logo' src={require('../../assets/photos/headerLogo.png')} alt='who knows that logo'/>
                </Link>
            </div>
            {loggedIn ?
                <div>
                    <Link to='/dashboard'>Dashboard</Link>
                    <button onClick={() => Auth.logout()}>Log out</button>
                </div>
                :
                <div>
                    <Link to='/login'>Sign In</Link>
                </div>
            }
        </header>
    )
}

export default Header;