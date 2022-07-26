import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { QUERY_PUBLIC_GAMES } from '../../utils/queries'
import { useQuery } from '@apollo/client';
import Header from '../../Components/Header/header';
import './homePage.css';
import { FaPlay } from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai';

function HomePage() {
    // check if user is logged in
    const loggedIn = Auth.loggedIn()

    // query all of the public games to display
    const { data } = useQuery(QUERY_PUBLIC_GAMES)

    const publicGames = data?.getPublicGames || [];

    return (
        <>
            {loggedIn ?
                <>
                    <Header />
                    <main>
                        <form id='search-form'>
                            <input type='text' placeholder='Search Public Games' id='search-public-games' name='search-public-games' />
                        </form>
                        <div id='homepage-feed' className='flex-box-sb'>
                            <section>
                                <h1>Public Games</h1>
                                {publicGames &&
                                    publicGames.map((game, index) => (
                                        <article id='link-to-public' key={index} to={`/players/${game._id}`}>
                                            <div className='public-game-card'>
                                                <header className='flex-box-sb'>
                                                    <h2>{game.gameTopic}</h2>
                                                    <div>
                                                        <Link to={`/players/${game._id}`}
                                                        >
                                                        <button title='Play' className='public-feed-btns'><FaPlay /></button><br />
                                                        </Link>
                                                        <Link 
                                                        to={`/view-game/${game._id}`}
                                                        title='View questions' 
                                                        className='public-feed-btns'><AiFillEye />
                                                        </Link>
                                                    </div>
                                                </header>
                                                <div className='flex-box-sb'>
                                                    <p>Owner: {game.creator.username}</p>
                                                    <p>Questions: {game.questionCount}</p>
                                                    <p>Copied: {game.duplicates}</p>
                                                </div>
                                            </div>
                                        </article>
                                    ))
                                }
                            </section>
                            <aside>
                                <Link to={`/create-game`}>Create Game</Link>
                                <Link to={`/my-games`}>My Games</Link>
                            </aside>
                        </div>
                    </main>
                </>
                :
                <>
                <Header />
                <p>Infosession</p>
                </>
            }
        </>
    )
}

export default HomePage;