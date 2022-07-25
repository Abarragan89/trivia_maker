import { useState } from 'react';
import ConfirmGameModal from '../../Components/ConfirmGameModal/confirmGameModal';
import Header from '../../Components/Header/header';
import './playerInput.css';

function PlayerInput() {
    const [showPlayerNames, setShowPlayerNames] = useState(false);
    const [numberOfPlayers, setNumberOfPlayers] = useState(1);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    function handlePlayerCount(e) {
        e.preventDefault();
        const playerCount = document.getElementById('player-count').value
        if(isNaN(parseInt(playerCount))) {
            document.getElementById('error').innerHTML = 'Pick a number between 1 and 25.';
            return
        } else if (parseInt(playerCount) > 25) {
            document.getElementById('error').innerHTML = 'Pick a number between 1 and 25.';
            return
        }
        setNumberOfPlayers(playerCount)
        setShowPlayerNames(true);
    }

    // dynamically created player name inputs
    const playerInputElements = [];
    for (let i = 0; i < numberOfPlayers; i++) {
        playerInputElements.push(
            <div key={i}>
                <input data-player='name' className='player-names-input' placeholder={`player${i + 1}`} type='text' name={`player${i + 1}`} required></input>
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
            <Header />
            <section id='player-input-section'>
                {showConfirmationModal && 
                <ConfirmGameModal 
                players={playerNameArray} 
                setShowConfirmationModal={setShowConfirmationModal}
                showConfirmationModal={showConfirmationModal}    
                />}
                <h2>Players</h2>
                {showPlayerNames ?
                    <form id='player-names-form' onSubmit={handleGameStart}>
                        {playerInputElements}
                        <button className='player-input-button' type='submit'>Ready?</button>
                    </form>
                    :
                    <>
                        <form id='player-amount-form' onSubmit={handlePlayerCount}>
                            <label htmlFor='player-count'>How many players/teams?</label>
                            <input type='text' id='player-count' maxLength="2" required></input>
                            <span id='error'></span>
                            <button className='player-input-button' type='submit'>Continue</button>
                        </form>
                    </>
                }
            </section>
        </>
    )
}

export default PlayerInput