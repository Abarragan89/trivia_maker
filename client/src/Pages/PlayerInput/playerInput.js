import { useState } from 'react';
import ConfirmGameModal from '../../Components/ConfirmGameModal/confirmGameModal';
import Header from '../../Components/Header/header';
import './playerInput.css';
import mouseClick from '../../assets/sounds/mouse-click.wav';

function PlayerInput() {

    // MouseClick Sound
    const mouseClickSound = new Audio(mouseClick);
    mouseClickSound.volume = .6;

    const [showPlayerNames, setShowPlayerNames] = useState(false);
    const [numberOfPlayers, setNumberOfPlayers] = useState(1);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    function handlePlayerCount(e) {
        e.preventDefault();
        const playerCount = document.getElementById('player-count').value
        if (isNaN(parseInt(playerCount))) {
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
        // auto focus the first input
        if (i === 0) {
            playerInputElements.push(
                <div key={i}>
                    <input data-player='name' autoComplete='off' className='player-names-input' placeholder={`player${i + 1}`} type='text' name={`player${i + 1}`} required></input>
                </div>
            )
        } else {
            playerInputElements.push(
                <div key={i}>
                    <input data-player='name' autoComplete='off' className='player-names-input' placeholder={`player${i + 1}`} type='text' name={`player${i + 1}`} required></input>
                </div>
            )
        }
    }


    // create the player objects and ball speed
    const [ballSpeed, setBallSpeed] = useState(null)
    const [playerNameArray, setPlayerNameArray] = useState([])
    const [bonusTimer, setBonusTimer] = useState(false)
    function handleGameStart(e) {
        e.preventDefault();
        const names = document.querySelectorAll("[data-player]");
        for (let player of names) {
            setPlayerNameArray(playerNameArray => [...playerNameArray, (player.value)])
        }
        setShowConfirmationModal(true)
    }
    function ballSpeedSetter(e) {
        setBallSpeed(e.target.value);
    }
    function setBonusTimerFunction(e) {
        setBonusTimer(e.target.value)
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
                        ballSpeed={ballSpeed}
                        bonusTimer={bonusTimer}
                    />}
                <h2>Players</h2>
                {showPlayerNames ?
                    <form id='player-names-form' onSubmit={handleGameStart}>
                        {playerInputElements}
                        <h2 htmlFor='ball-speed' id='ball-speed-title'>Ball Speed</h2>
                        <div onChange={ballSpeedSetter} className='flex-box-se-wrap'>
                            <div className='radio-div-ball-speed'>
                                <input type='radio' id='easy' name='ball-speed' value='2' required />
                                <label htmlFor='easy'>Easy</label>
                            </div>
                            <div className='radio-div-ball-speed'>
                                <input type='radio' id='medium' name='ball-speed' value='6' required />
                                <label htmlFor='medium'>Medium</label>
                            </div>
                            <div className='radio-div-ball-speed'>
                                <input type='radio' id='hard' name='ball-speed' value='10' required />
                                <label htmlFor='hard'>Hard</label>
                            </div>
                            <div className='radio-div-ball-speed'>
                                <input type='radio' id='insane' name='ball-speed' value='46' required />
                                <label htmlFor='insane'>Insane!</label>
                            </div>
                        </div>
                        <div className='radio-div-ball-speed' onChange={ballSpeedSetter}>
                            <input type='radio' id='no-bonus' name='ball-speed' value='0' required />
                            <label htmlFor='no-bonus'>No Bonus Round</label>
                        </div>


                        {ballSpeed !== '0' &&
                            <>
                                <h2>Bonus Timer</h2>
                                <div onChange={setBonusTimerFunction} className='bonus-timer'>
                                    <input type='checkbox' id='bonus-timer' name='bonus-timer'></input>
                                    <label htmlFor='bonus-timer'>Enable Timer</label>
                                </div>

                            </>

                        }

                        <button onClick={() => mouseClickSound.play()} className='player-input-button' type='submit'>Ready?</button>
                    </form>
                    :
                    <>
                        <form id='player-amount-form' onSubmit={handlePlayerCount}>
                            <label htmlFor='player-count'>How many players/teams?</label>
                            <input type='text' id='player-count' autoComplete='off' maxLength='2' autoFocus required></input>
                            <span id='error'></span>
                            <button onClick={() => mouseClickSound.play()} className='player-input-button' type='submit'>Continue</button>
                        </form>
                    </>
                }
            </section>
        </>
    )
}

export default PlayerInput