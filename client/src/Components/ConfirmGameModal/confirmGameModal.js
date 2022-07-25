import { Link, useParams } from 'react-router-dom';
import './confirmGame.css';
import { useQuery } from '@apollo/client';
import { QUERY_GAME_INFO } from '../../utils/queries'

function ConfirmGameModal({ players, setShowConfirmationModal, showConfirmationModal }) {
    const gameId = useParams().gameId

    const { data } = useQuery(QUERY_GAME_INFO, {
        variables: { gameId: gameId}
    });
    const confirmGameData = data?.getUserGames || ''
    console.log(players)

    return (
        <div className='confirmationModalBackdrop'>
            <div className='modalContainer'>
                <h2>{confirmGameData.gameTopic}</h2>
                <div className='flex-box-sa'>
                    {players.map((player, index) => (
                        <p key={index} className='player-names-confirmation'>{player}</p>
                    ))}
                </div>
                <Link state={players} to={`/gamepage/${gameId}`}>Let's Play!</Link> <br/>
                <Link id='cancel-confirmation' to={`/players/${gameId}`} onClick={() => setShowConfirmationModal(false)}>Cancel</Link>
            </div>
        </div>
    )
}

export default ConfirmGameModal; 