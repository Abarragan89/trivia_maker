import './gamePage.css'
import '../../Components/GameBoard/gameBoard'
import GameBoard from '../../Components/GameBoard/gameBoard';
import { useRef, useEffect, useState } from 'react'
import { QUERY_GAME_INFO } from '../../utils/queries';
import { GameStart  } from '../../utils/gameStart';
import { useQuery } from '@apollo/client';
import { useParams, useLocation, Link } from 'react-router-dom';

function GamePage() {
    // pass this state to children to trigger rerender of parents
    const [scoreChange, setScoreChange] = useState(0)
    
    // Get game data and player data
    const gameId = useParams().gameId
    const players  = useLocation().state
    const { data } = useQuery(QUERY_GAME_INFO, {
        variables: { gameId }
    })
    const questionAmount = data?.getUserGames?.questionCount || 0; 
    const gameTopic = data?.getUserGames.gameTopic || '';
    const h1Text = useRef(null) 

    // Create Game 
    const [game, setGame] = useState(null)

    useEffect(() => {
        setGame(new GameStart(questionAmount, players))   
    },[questionAmount, players]) 

    return (
        <main id='main-gamepage'>
            <Link id='quit-game' to='/'>Quit</Link>
            <h1 id='game-title' ref={h1Text}>{gameTopic}</h1>
            <section id="gameBoard">
                <GameBoard 
                game={game} 
                h1ref={h1Text}
                scoreChange={scoreChange}
                setScoreChange={setScoreChange}   
                /> 
            </section>
            <section id='player-info'>
                <h2>Scoreboard</h2>
                <div id='players-score-div' className='flex-box-col-sb'>
                    {game && game.players.map((player, index) => (
                            <p key={index} className='player-score'>{player.name} <span>{player.score}</span></p>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default GamePage;