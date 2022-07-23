import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Login from '../../Components/Login/login';
import { QUERY_PUBLIC_GAMES } from '../../utils/queries'
import { useQuery } from '@apollo/client';
import Header from '../../Components/Header/header';
import './homePage.css';


function HomePage() {
    // check if user is logged in
    const loggedIn = Auth.loggedIn()

    // query all of the public games to display
    const { data } = useQuery(QUERY_PUBLIC_GAMES)

    const publicGames = data?.getPublicGames || [];
    console.log(publicGames)

    return (
        <>
            {loggedIn ?
                <>
                    <Header />
                    <main>
                        <form id='search-form'>
                            <input type='text' placeholder='Search' id='search-public-games' name='search-public-games' />
                        </form>
                        <div id='homepage-feed' className='flex-box-sb'>
                            <section>
                                {publicGames &&
                                    publicGames.map((game, index) => (
                                        <Link id='link-to-public' key={index} to={`/players/${game._id}`}>
                                            <div className='public-game-card'>
                                                <header>
                                                    {game.gameTopic}
                                                </header>
                                                <div className='flex-box-sb'>
                                                    <p>Creator: {game.creator.username}</p>
                                                    <p>Questions: {game.questionCount}</p>
                                                </div>
                                            </div>
                                        </Link>
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
                <Login />
            }
        </>
    )
}

export default HomePage;