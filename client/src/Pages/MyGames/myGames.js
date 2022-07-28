import Auth from '../../utils/auth';
import { QUERY_ME_BASIC } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/header';
import './myGames.css';
import { MdEdit } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa';
import mouseClick from '../../assets/sounds/mouse-click.wav';
import Footer from '../../Components/Footer/footer';
 
function MyGames() {

    // MouseClick Sound
    const mouseClickSound = new Audio(mouseClick);
    mouseClickSound.volume = .6;
    
    
    const isLoggedIn = Auth.loggedIn()

    const { data } = useQuery(QUERY_ME_BASIC);

    // user information
    const userGames = data?.me?.games || [];

    return (
        <>
            {isLoggedIn ?
                <>
                    <Header />
                    <main id='mygames-main'>
                        <h1><span>Library</span></h1>
                        <div className='flex-box-col-sa'>
                            {userGames.map((game, index) => (
                                <div id='my-games-card' key={index}>
                                    <div className='flex-box-sb'>
                                        <h4>{game.gameTopic}</h4>
                                        <div>
                                        <Link onClick={() => mouseClickSound.play()} title='Play game' id='play-btn' to={`/players/${game._id}`}><FaPlay/></Link>
                                        <Link onClick={() => mouseClickSound.play()} title='Edit game' id='edit-btn' to={`/edit/${game._id}`}><MdEdit/></Link>
                                        </div>
                                    </div>
                                    <div id='my-games-info-div' className='flex-box-sb'>
                                        <p>Questions:{game.questionCount}</p>
                                        <p>Owner: {game.creator.username}</p>
                                        <p>Copied: {game.duplicates}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </>
                :
                <p>You need to be <span><Link to='/'>logged in </Link></span>to see this page</p>
            }
            <Footer />
        </>
    )
}

export default MyGames;