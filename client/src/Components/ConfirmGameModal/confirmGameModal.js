import { Link, useParams } from 'react-router-dom';
import './confirmGame.css';
import { useQuery } from '@apollo/client';
import { QUERY_GAME_INFO } from '../../utils/queries'
import mouseClick from '../../assets/sounds/mouse-click.wav';
import useSound from 'use-sound';


function ConfirmGameModal({ ballSpeed, players, setShowConfirmationModal, showConfirmationModal, bonusTimer }) {
    // MouseClick Sound
    const [mouseClickSound] = useSound(mouseClick, { volume: .6 })

    const gameId = useParams().gameId

    const { data } = useQuery(QUERY_GAME_INFO, {
        variables: { gameId: gameId }
    });
    const confirmGameData = data?.getUserGames || ''

    return (
        <div className='confirmationModalBackdrop'>
            <div className='modalContainer'>
                <h2 id='confirmation-title'>{confirmGameData.gameTopic}</h2>
                <div className='flex-box-sa'>
                    {players.map((player, index) => (
                        <p key={index} className='player-names-confirmation'>{player}</p>
                    ))}
                </div>
                <Link onClick={() => mouseClickSound()} state={[players, ballSpeed, bonusTimer]} to={`/gamepage/${gameId}`}>Let's Play!</Link> <br />
                <Link id='cancel-confirmation' to='/my-games' onClick={() => setShowConfirmationModal(false)}>Cancel</Link>
            </div>
        </div>
    )
}

export default ConfirmGameModal; 