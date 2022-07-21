import './gamePage.css'
import '../../Components/GameBoard/gameBoard'
import GameBoard from '../../Components/GameBoard/gameBoard';
import { useRef, useState } from 'react'
import { QUERY_GAME_INFO } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';

function GamePage() {
    // Get game data and player data
    const gameId = useParams().gameId
    const players  = useLocation().state
    console.log('player names', players)
    
    const { data } = useQuery(QUERY_GAME_INFO, {
        variables: { gameId }
    })

    const gameTopic = data?.getUserGames.gameTopic || '';
    const h1Text = useRef(null) 

    return (
        <main>
            <h1 ref={h1Text}>{gameTopic}</h1>
            <section id="gameBoard">
                <GameBoard players={players} h1ref={h1Text} />
            </section>
            <section>
                <h2>Players</h2>
                {players.map((player, index) => (
                    <p key={index}>{player.name}  {player.score}</p>
                ))}
            </section>
        </main>
    )
}

export default GamePage;