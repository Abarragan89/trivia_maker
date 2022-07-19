import Auth from '../../utils/auth';
import { QUERY_ME_BASIC } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

function MyGames() {
    const isLoggedIn = Auth.loggedIn()

    const { data } = useQuery(QUERY_ME_BASIC);

    // user information
    const userGames = data?.me.games || [];
    console.log(data)
    console.log(userGames)

    return (
        <>
            { isLoggedIn ?
            <>
                <p>My Games</p>
                {userGames.map((game, index) => (
                    <Link key={index} to={`/players/${game._id}`}>{game.gameTopic}</Link>
                ))}
            </>
            :
            <p>You need to be logged in to see this page</p>
            
            }
        </>
    )
}

export default MyGames;