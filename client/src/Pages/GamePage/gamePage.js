import './gamePage.css'
import '../../Components/GameBoard/gameBoard'
import GameBoard from '../../Components/GameBoard/gameBoard';
import { useRef, useEffect, useState } from 'react'
import { QUERY_GAME_INFO } from '../../utils/queries';
import { GameStart } from '../../utils/gameStart';
import { useLazyQuery } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';

function GamePage() {
    // pass this state to children to trigger rerender of parents
    const [scoreChange, setScoreChange] = useState(0)

    // Get game data and player data
    const gameId = useParams().gameId
    const players = useLocation().state[0]
    const ballSpeed = useLocation().state[1]


    const [getGameInfo, { data }] = useLazyQuery(QUERY_GAME_INFO)

    useEffect(() => {
        getGameInfo({
            variables: { gameId }
        })
    },[])
    const questionAmount = data?.getUserGames?.questionCount || 0;
    const gameTopic = data?.getUserGames.gameTopic || '';
    const gameData = data?.getUserGames.gameData || [];
    const h1Text = useRef(null)

    // Create Game 
    const [gamePlayers, setGamePlayers] = useState(null)
    useEffect(() => {
        setGamePlayers(new GameStart(questionAmount, players))
    }, [questionAmount, players])

    return (
        <main id='main-gamepage'>
            <h1 id='game-title' ref={h1Text}><span>{gameTopic}</span></h1>
            <section id="gameBoard">
                <GameBoard
                    gamePlayers={gamePlayers}
                    gameData={gameData}
                    h1ref={h1Text}
                    scoreChange={scoreChange}
                    setScoreChange={setScoreChange}
                    ballSpeed={ballSpeed}
                />
            </section>
            <section id='player-info'>
                <h2>Scoreboard</h2>
                <div id='players-score-div' className='flex-box-col-sb'>
                    {gamePlayers && gamePlayers.players.map((player, index) => (
                        <p key={index} className='player-score'>{player.name} <span>{player.score}</span></p>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default GamePage;