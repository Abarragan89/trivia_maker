import Auth from '../../utils/auth';
import { QUERY_ME_BASIC } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/header'
import './myGames.css'

function MyGames() {
    const isLoggedIn = Auth.loggedIn()

    const { data } = useQuery(QUERY_ME_BASIC);

    // user information
    const userGames = data?.me?.games || [];

    console.log('usergames in my games', userGames)

    return (
        <>
            {isLoggedIn ?
                <>
                    <Header />
                    <main id='mygames-main'>
                        <h2>My Games</h2>
                        <div className='flex-box-col-sa'>
                            {userGames.map((game, index) => (
                                <div id='my-games-card'>
                                    <div className='flex-box-sb'>
                                        <p>{game.gameTopic}</p>
                                        <p>Questions:{game.questionCount}</p>
                                    </div>
                                    <div id='my-games-btn-div' className='flex-box-sa'>
                                        <Link key={index} to={`/players/${game._id}`}>Play</Link>
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </>
                :
                <p>You need to be logged in to see this page</p>

            }
        </>
    )
}

export default MyGames;