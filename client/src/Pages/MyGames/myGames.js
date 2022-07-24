import Auth from '../../utils/auth';
import { QUERY_ME_BASIC } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/header'
import './myGames.css'
import { MdEdit } from 'react-icons/md'
import { FaPlay } from 'react-icons/fa'
 
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
                                <div id='my-games-card' key={index}>
                                    <div className='flex-box-sb'>
                                        <h4>{game.gameTopic}</h4>
                                        <div>
                                        <Link id='play-btn' to={`/players/${game._id}`}><FaPlay/></Link>
                                        <button id='edit-btn'><MdEdit/></button>
                                        </div>
                                    </div>
                                    <div id='my-games-info-div' className='flex-box-sb'>
                                        <p>Questions:{game.questionCount}</p>
                                        <p>Creator: {game.creator.username}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </>
                :
                <p>You need to be <span><Link to='/'>logged in </Link></span>to see this page</p>

            }
        </>
    )
}

export default MyGames;