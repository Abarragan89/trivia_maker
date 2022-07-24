import { QUERY_ME_BASIC } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import './header.css'


function Header() {
    const { data } = useQuery(QUERY_ME_BASIC);
    const username = data?.me?.username || ''

    const loggedIn = Auth.loggedIn();

    function goToLogin () {
        
    }
    return (

        <header id='main-header' className='flex-box-sb'>
            <div>
                <p>Logo</p>
            </div>
            {loggedIn &&
                <div>
                    <h2>{username}</h2>
                    <button onClick={() => Auth.logout()}>Log out</button>
                </div>
            }
        </header>
    )
}

export default Header;