import './gamePage.css'
import '../../Components/GameBoard/gameBoard'
import GameBoard from '../../Components/GameBoard/gameBoard';
import { useRef } from 'react'
import { QUERY_GAME_INFO } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';

function GamePage() {
    const gameId = useParams().gameId
    console.log(gameId)

    const players = useLocation().state
    console.log('player names', players)

    const { data } = useQuery(QUERY_GAME_INFO, {
        variables: { gameId }
    })
    console.log(data)
    const gameTopic = data?.getUserGames.gameTopic || '';
    console.log('gameTopic', gameTopic)
    const h1Text = useRef(null)

    return (
        <main>
            <h1 ref={h1Text}>{gameTopic}</h1>
            <section>
                <GameBoard h1ref={h1Text} />
            </section>
        </main>
    )
}

export default GamePage;