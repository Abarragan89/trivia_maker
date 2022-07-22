import { useState } from 'react';
import ConfirmGameModal  from '../../Components/ConfirmGameModal/confirmGameModal';
import { Player } from '../../utils/gameStart'

function PlayerInput() {
    const [showPlayerNames, setShowPlayerNames] = useState(false);
    const [numberOfPlayers, setNumberOfPlayers] = useState(1);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    function handlePlayerCount(e) {
        e.preventDefault();
        const playerCount = document.getElementById('player-count').value
        setNumberOfPlayers(playerCount)
        setShowPlayerNames(true);
    }

    // dynamically created player name inputs
    const playerInputElements = [];
    for (let i = 0; i < numberOfPlayers; i++) {
        playerInputElements.push(
            <div key={i}>
                <label htmlFor={`player${i + 1}`}>Player {i + 1}:</label>
                <input data-player='name' type='text' name={`player${i + 1}`} required></input>
            </div>
        )
    }


    // create the player objects
    const [playerNameArray, setPlayerNameArray] = useState([])
    function handleGameStart(e) {
        e.preventDefault();
        const names = document.querySelectorAll("[data-player]");
        for (let player of names) {

            setPlayerNameArray(playerNameArray => [...playerNameArray, (player.value)])
        }
        setShowConfirmationModal(true)
        console.log(playerNameArray)
    }

    return (
        <>
        {showConfirmationModal && <ConfirmGameModal players={playerNameArray} />}
            <h2>Players</h2>
            {showPlayerNames ?
                <form onSubmit={handleGameStart}>
                {playerInputElements}
                    <button type='submit'>Start Game</button>
                </form>
                :
                <>
                    <form onSubmit={handlePlayerCount}>
                        <label htmlFor='player-count'>How many players?</label>
                        <select name="player-count" id='player-count'>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                        </select>
                        <button type='submit'>Continue</button>
                    </form>
                </>
            }
        </>
    )
}

export default PlayerInput