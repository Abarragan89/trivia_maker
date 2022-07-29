import { QUERY_ME_BASIC } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import './header.css'
import { Link } from 'react-router-dom';
import '../../assets/photos/headerLogo.png';
import mouseClick from '../../assets/sounds/mouse-click.wav';
import Navigation from '../Navigation/';
import MobileNav from '../MobileNav';
import useSound from 'use-sound';


function Header() {
    const loggedIn = Auth.loggedIn();

    const [mouseClickSound] = useSound(mouseClick, {volume: .6})


    return (
        <header id='main-header' className='flex-box-sb'>
            <div>
                <Link onClick={() => mouseClickSound()} to='/'>
                    <img id='home-logo' src={require('../../assets/photos/headerLogo.png')} alt='who knows that logo' />
                </Link>
            </div>
            {loggedIn ?
                <nav>
                    <MobileNav />
                    <Navigation />
                </nav>
            :
            <div>
                <Link to='/login' onClick={() => mouseClickSound()}><button>Sign In</button></Link>
            </div>
            }
        </header>
    )
}

export default Header;