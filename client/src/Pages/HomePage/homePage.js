import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Login from '../../Components/Login/login';

function HomePage() {
    // check if user is logged in
    const loggedIn = Auth.loggedIn()
    return (
        <>
            {loggedIn ?
                <section>
                    <Link to={`/create-game`}>Create Game</Link>
                    <Link to={`/my-games`}>My Games</Link>
                </section>
                :
                <Login />
            }
        </>
    )
}

export default HomePage;