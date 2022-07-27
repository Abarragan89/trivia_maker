import { QUERY_ME_BASIC } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import './header.css'
import { Link } from 'react-router-dom';
import '../../assets/photos/headerLogo.png';
import mouseClick from '../../assets/sounds/mouse-click.wav';


function Header() {

    // MouseClick Sound
    const mouseClickSound = new Audio(mouseClick);
    mouseClickSound.volume = .6;

    const { data } = useQuery(QUERY_ME_BASIC)
    const username = data?.me?.username || '';
    const loggedIn = Auth.loggedIn();


    return (
        <header id='main-header' className='flex-box-sb'>
            <div>
                <Link onClick={() => mouseClickSound.play()} to='/'>
                    <img id='home-logo' src={require('../../assets/photos/headerLogo.png')} alt='who knows that logo' />
                </Link>
            </div>
            {loggedIn ?
                <div>
                    <Link to='/my-games'>{username}</Link>
                    <button onClick={() => Auth.logout()}>Log out</button>
                </div>
                :
                <div>
                    <Link to='/login' onClick={() => mouseClickSound.play()}><button>Sign In</button></Link>
                </div>
            }
        </header>
    )
}

export default Header;