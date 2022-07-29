import './gameBoard.css';
import Modal from '../Modal/modal';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import suspenseMusic from '../../assets/sounds/answer-question-suspense.wav'
// import { useEffect } from 'react';

function GameBoard({ h1ref, gamePlayers, gameData, scoreChange, setScoreChange }) {

    //////////// music set up and useEffect that is triggered by the hide question modal button press
    // const [suspenseMusicSound] = useState(new Audio(suspenseMusic))
    // suspenseMusicSound.volume = .4;
    // const [triggerSuspenseOff, setTriggerSuspenseOff] = useState(null)

    // useEffect(() => {
    //     if (triggerSuspenseOff === true) {
    //         suspenseMusicSound.pause();
    //         suspenseMusicSound.currentTime = 0;
    //     } else if (triggerSuspenseOff === false) {
    //         suspenseMusicSound.play();
    //     }
    // }, [triggerSuspenseOff])

    const gameId = useParams().gameId

    const [isModal, setIsModal] = useState(false)
    const [currentQuestionSet, setCurrentQuestionSet] = useState('')

    function toggleModal(questionButton) {
        // setTriggerSuspenseOff(false)
        h1ref.current.scrollIntoView(
            {
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            }
        );
        setCurrentQuestionSet(questionButton)
        setIsModal(!isModal)
        disableButton(questionButton.listEl)
    }

    // const [endGameData, setEndGameData] = useState(null)
    function closeModal() {
        setIsModal(!isModal);
        gamePlayers.switchPlayer();
        setScoreChange(scoreChange++)
    }

    // disable the buttons that have been clicked
    function disableButton(listElId) {
        let listEl = document.getElementById(listElId)
        listEl.setAttribute('disabled', 'true')
        listEl.removeAttribute('class', 'activeQuestions')
        listEl.setAttribute('class', 'deactivated-button')
    }

    return (
        <>
            <div className='category-columns flex-box-sa'>
                {isModal &&
                    <Modal
                        game={gamePlayers}
                        questionData={currentQuestionSet}
                        onClose={closeModal}
                        scoreChange={scoreChange}
                        setScoreChange={setScoreChange}
                        // triggerSuspenseOff={triggerSuspenseOff}
                        // setTriggerSuspenseOff={setTriggerSuspenseOff}
                    />}
                <div id='gameboard-header-info' className='flex-box-sb'>
                    <p id='upNext'>Up Next: <span>{gamePlayers && gamePlayers.currentPlayer.name}</span></p>
                    <Link id='quit-game' state={gamePlayers} to={`/winner-podium/${gameId}`}>End Game</Link>
                </div>
                {gameData.map((question, gameIndex) => (
                    <div className='column' key={gameIndex + question.category}>
                        <h3 className={question.category ? `font-cat-${Math.floor(question.category.length / 10) * 10}` : ''}>{question.category}</h3>
                        <ul>
                            {question.clues.map((set, index) => {
                                {/* get the id of the button that will be disabled. */ }
                                set.listEl = Math.random() * 2 + index + question.category
                                if (!set.points) {
                                    return (
                                        <li key={index}>
                                            <button className='deactivated-button' id={index + question.category} disabled>N/A</button>
                                        </li>
                                    )
                                }
                                return (
                                    <li
                                        key={index}
                                        onClick={() => toggleModal(set)}>
                                        <button className='activeQuestions questionButtons' id={set.listEl}>{set.points}</button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}

export default GameBoard;