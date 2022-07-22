import './gamePage.css'
import '../../Components/GameBoard/gameBoard'
import GameBoard from '../../Components/GameBoard/gameBoard';
import { useRef, useEffect, useState } from 'react'
import { QUERY_GAME_INFO } from '../../utils/queries';
import { GameStart  } from '../../utils/gameStart';
import { useQuery } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';

function GamePage() {
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
    // const game = useRef(null)
    const [game, setGame] = useState(null)
    useEffect(() => {
        setGame(new GameStart(questionAmount, players))   
    },[questionAmount, players]) 

    const [scoreChange, setScoreChange] = useState(0)

    return (
        <main>
            <h1 ref={h1Text}>{gameTopic}</h1>
            <section id="gameBoard">
                <GameBoard 
                game={game} 
                h1ref={h1Text}
                scoreChange={scoreChange}
                setScoreChange={setScoreChange}   
                /> 
            </section>
            <section>
                <p>{game && game.currentPlayer.name}'s turn</p>
                <h2>Players</h2>
                {game && game.players.map((player, index) => (
                    <p key={index}>{player.name}  {player.score}</p>
                ))}
            </section>
        </main>
    )
}

export default GamePage;