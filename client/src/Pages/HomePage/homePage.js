import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { QUERY_ME_BASIC, QUERY_PUBLIC_GAMES, SEARCH_PUBLIC_GAMES } from '../../utils/queries'
import { useQuery, useLazyQuery } from '@apollo/client';
import { useState, useRef } from 'react';
import Header from '../../Components/Header/header';
import './homePage.css';
import { FaPlay } from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai';
import mouseClick from '../../assets/sounds/mouse-click.wav';
import LandingPage from '../LandingPage/landingPage';
import axios from 'axios'
import { useEffect } from 'react';
import Footer from '../../Components/Footer/footer';
import Pagination from '../../Components/Pagination/pagination';
import PaginationSearch from '../../Components/PaginationSearch/paginationSearch';

function HomePage() {

    // Scroll to Top of Page when user clicks pagination
    const upperPage = useRef(null);
    const handleScroll = (ref) => {
        window.scrollTo({
            top: ref.offsetTop,
            left: 0,
            behavior: "smooth",
        });
    };

    // random fact functionality
    const [randomFactText, setRandomFactText] = useState(null)
    function randomFact() {
        axios
            .get('https://api.api-ninjas.com/v1/facts?limit=1', {
                headers: {
                    'X-Api-Key': 'f4JX5j/Zg0wWIMYSF4L3qA==gS4WFyjnCm6T2RLs',
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
            .then(({ data }) => {
                setRandomFactText(data[0].fact);
            });
    }
    useEffect(() => {
        randomFact()
    }, [])


    // MouseClick Sound
    const mouseClickSound = new Audio(mouseClick);
    mouseClickSound.volume = .6;

    const { data: userInfo } = useQuery(QUERY_ME_BASIC)
    const username = userInfo?.me?.username

    // check if user is logged in
    const loggedIn = Auth.loggedIn()

    const [searchGames] = useLazyQuery(SEARCH_PUBLIC_GAMES);

    // query all of the public games to display
    let { data } = useQuery(QUERY_PUBLIC_GAMES)
    let gameData = data?.getPublicGames || [];

    const [publicGames, setPublicGames] = useState (gameData)
    useEffect(() => {
        setPublicGames(gameData)
    }, [gameData])


    /////////////Search functionality///////////////
    const [searchedGames, setSearchedGames] = useState('')
    const characters = useRef('')

    async function searchPublicGames(event) {
        characters.current = event.target.value
        let { data: searchedData } = await searchGames({
            variables: { name: characters.current }
        });
        setSearchedGames(searchedData.getGameByTitle);
    }

    ////////////Pagination/////////////////
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(7)
    // Get current posts of All Public
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentPublicGames = publicGames.slice(indexOfFirstGame, indexOfLastGame);
    //change page 
    function paginate(pageNumber) {
        setCurrentPage(pageNumber)
        handleScroll(upperPage.current)

    }

    ////////////Pagination Search/////////////////
    const [currentPageSearch, setCurrentPageSearch] = useState(1);
    const [searchedGamesPerPage] = useState(6)
    // Get current posts of All Public
    const indexOfLastGameSearch = currentPageSearch * searchedGamesPerPage;
    const indexOfFirstGameSearch = indexOfLastGameSearch - searchedGamesPerPage;
    const currentPublicGamesSearch = searchedGames.slice(indexOfFirstGameSearch, indexOfLastGameSearch);

    function paginateSearch(pageNumber) {
        setCurrentPageSearch(pageNumber)
        handleScroll(upperPage.current)
    }

    return (
        <>
            {loggedIn ?
                <>
                    <Header />
                    <main>
                        <form id='search-form'>
                            <input ref={upperPage} type='text' value={characters.current} onChange={searchPublicGames} placeholder='Search Public Games' id='search-public-games' name='search-public-games' />
                        </form>
                        <div id='homepage-feed' className='flex-box-sb'>
                            <section>
                                {publicGames && characters.current === '' ?
                                    <>
                                        <h1><span>Public Games</span></h1>
                                        {currentPublicGames.map((game, index) => (
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
                                        <Pagination currentPage={currentPage} paginate={paginate} gamesPerPage={gamesPerPage} totalGames={publicGames.length} />

                                    </>
                                    :
                                    <>
                                        <h1><span>{characters.current}</span></h1>
                                        {searchedGames && currentPublicGamesSearch.map((game, index) => (
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
                                        <PaginationSearch currentPage={currentPageSearch} paginate={paginateSearch} searchedGamesPerPage={searchedGamesPerPage} totalGames={searchedGames.length} />
                                    </>
                                }
                            </section>
                            <aside>
                                <div>
                                    <h2>Welcome</h2>
                                    <p>{username}</p>
                                </div>
                                <div>
                                    <h3 onClick={randomFact}>Get Nosey</h3>
                                    <p>{randomFactText}</p>
                                </div>
                            </aside>
                        </div>
                    </main>
                    <Footer />
                </>
                :
                <>
                    <Header />
                    <LandingPage />
                </>
            }
        </>
    )
}

export default HomePage;