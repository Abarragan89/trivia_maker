import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { QUERY_PUBLIC_GAMES, SEARCH_PUBLIC_GAMES } from '../../utils/queries'
import { useQuery, useLazyQuery } from '@apollo/client';
import { useState, useRef } from 'react';
import Header from '../../Components/Header/header';
import './homePage.css';
import { FaPlay } from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai';
import mouseClick from '../../assets/sounds/mouse-click.wav';



function HomePage() {

    // MouseClick Sound
    const mouseClickSound = new Audio(mouseClick);
    mouseClickSound.volume = .6;


    // check if user is logged in
    const loggedIn = Auth.loggedIn()

    const [searchGames] = useLazyQuery(SEARCH_PUBLIC_GAMES);

    // query all of the public games to display
    let { data } = useQuery(QUERY_PUBLIC_GAMES)
    let publicGames = data?.getPublicGames || [];



    /////////////Search functionality///////////////
    const [searchedGames, setSearchedGames] = useState('')
    const characters = useRef('')
    async function searchPublicGames(event) {
        characters.current = event.target.value
        let { data: searchedData } = await searchGames({
            variables: { name: characters.current }
        });
        setSearchedGames(searchedData.getGameByTitle);
        console.log('searched Games', searchedGames)
    }

    return (
        <>
            {loggedIn ?
                <>
                    <Header />
                    <main>
                        <form id='search-form'>
                            <input type='text' value={characters.current} onChange={searchPublicGames} placeholder='Search Public Games' id='search-public-games' name='search-public-games' />
                        </form>
                        <div id='homepage-feed' className='flex-box-sb'>
                            <section>
                                {publicGames && characters.current === '' ?
                                    <>
                                        <h1>Public Games</h1>
                                        {publicGames.map((game, index) => (
                                            <article id='link-to-public' key={index} to={`/players/${game._id}`}>
                                                <div className='public-game-card'>
                                                    <header className='flex-box-sb'>
                                                        <h2>{game.gameTopic}</h2>
                                                        <div>
                                                            <Link onClick={() => mouseClickSound.play()} to={`/players/${game._id}`}
                                                            >
                                                                <button title='Play' className='public-feed-btns'><FaPlay /></button><br />
                                                            </Link>
                                                            <Link
                                                                onClick={() => mouseClickSound.play()}
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
                                        ))}
                                    </>
                                    :
                                    <>
                                        <h1>{characters.current}</h1>
                                        {searchedGames && searchedGames.map((game, index) => (
                                            <article id='link-to-public' key={index} to={`/players/${game._id}`}>
                                                <div className='public-game-card'>
                                                    <header className='flex-box-sb'>
                                                        <h2>{game.gameTopic}</h2>
                                                        <div>
                                                            <Link onClick={() => mouseClickSound.play()} to={`/players/${game._id}`}
                                                            >
                                                                <button title='Play' className='public-feed-btns'><FaPlay /></button><br />
                                                            </Link>
                                                            <Link
                                                                onClick={() => mouseClickSound.play()}
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
                                        ))}
                                    </>
                                }
                            </section>
                            <aside>
                                <Link onClick={() => mouseClickSound.play()} to={`/create-game`}>Create Game</Link>
                                <Link onClick={() => mouseClickSound.play()} to={`/my-games`}>My Games</Link>
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