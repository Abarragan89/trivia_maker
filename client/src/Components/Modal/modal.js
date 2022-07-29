import './modal.css';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import BonusRound from '../BonusRound/bonusRound';
import { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSound from 'use-sound';
import correctAnswerSound from '../../assets/sounds/correct-answer.wav';
import wrongAnswerNotification from '../../assets/sounds/wrong-answer.wav';
import '../Navigation/navigation.css';


function Modal({ 
    questionData, 
    onClose, 
    game, 
    scoreChange, 
    setScoreChange,
    // triggerSuspenseOff,
    // setTriggerSuspenseOff,
    }) {

    const [correctAnswerNoise] = useSound(correctAnswerSound, { volume: '.5'});
    const [incorrectAnswer] = useSound(wrongAnswerNotification, { volume: '.5'})

    const gameId = useParams().gameId
    // This triggers the bonus round
    const [correctAnswer, setCorrectAnswer] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const [pointValue, setPointValue] = useState(0)

    function bonusRound(points) {
        correctAnswerNoise();
        setPointValue(points)
        const modal = document.getElementById('modalContainer')
        modal.style.animation = 'bonusAppear 1s'
        setCorrectAnswer(true)
    }

    const [playerScore, setPlayerScore] = useState(game.currentPlayer.score)
    // this function works as a ticker to visually display the player's score increasing
    function increasePlayerScore(points) {
        game.decreaseQuestions();
        let playerIntegerScore = parseInt(playerScore)
        let counter = 0;
        const visualIncrease = setInterval(() => {
            setPlayerScore(playerIntegerScore++)
            counter++;
            if (counter > points) {
                clearInterval(visualIncrease)
            }
        }, 0)
    }

    // If the player gets the answer wrong
    function wrongAnswer(questionPoints) {
        incorrectAnswer();
        decreasePlayerScore(questionPoints);
        game.decreaseQuestions();
        game.currentPlayer.subtractPoints(questionPoints)

        setScoreChange(scoreChange + 1);
    }
    // visually display the score decreasing
    const [wrongAnswerChosen, setWrongAnswerChosen] = useState(false)

    function decreasePlayerScore(points) {
        setWrongAnswerChosen(true)
        let playerIntegerScore = parseInt(playerScore)
        let counter = 0;
        const visualIncrease = setInterval(() => {
            setPlayerScore(playerIntegerScore--)
            counter++;
            if (counter > points) {
                clearInterval(visualIncrease)
            }
        }, 0)
    }

    function skipQuestion() {
        game.decreaseQuestions();
        if (game.endGame()){
            setWrongAnswerChosen(true)
        } else {
            onClose();
        }

    }   

    function showAnswerFunction() {
        // setTriggerSuspenseOff(true)
        setShowAnswer(true);
    }
    function hideAnswerFunction() {
        // setTriggerSuspenseOff(false)
        setShowAnswer(false);
    }

    return (
        <div className='modalBackdrop'>
            <section className='modalContainer' id='modalContainer'>
                <div className='modalHeader flex-box-sb'>
                    <h4 className='player-info-in-modal'>{game.currentPlayer.name}</h4>
                    <h3 className='player-info-in-modal'>{playerScore}</h3>
                </div>
                {correctAnswer ?
                    <BonusRound
                        game={game}
                        pointValue={pointValue}
                        scoreChange={scoreChange}
                        setScoreChange={setScoreChange}
                        closeModal={onClose}
                        increasePlayerScore={increasePlayerScore}
                    />
                    :
                    <article className='questionContainer flex-box-col-sa'>
                        {showAnswer ? <p className='cardQuestionText'>{questionData.answer}</p>
                            : <p className='cardQuestionText'>{questionData.question}</p>}

                        <div id='modal-button-div' className='flex-box-se'>
                            {showAnswer ?
                                <>
                                    {wrongAnswerChosen ?
                                        game.endGame() ? 
                                        <Link state={game} to={`/winner-podium/${gameId}`}><button className='modal-buttons'>End Game</button></Link>
                                        :
                                        <button className='modal-buttons' onClick={onClose}>Next Player</button>
                                        :
                                        <>
                                            <button className='modal-buttons' onClick={hideAnswerFunction}>Hide Answer</button>
                                            <button className='modal-buttons' onClick={skipQuestion}>Skip</button>
                                            <button id='wrong-answer' className='modal-buttons' onClick={() => wrongAnswer(questionData.points)}><FaTimes className='grading-icon' /></button>
                                            <button id='correct-answer' className='modal-buttons' onClick={() => bonusRound(questionData.points)}><FaCheck className='grading-icon' /></button>
                                        </>
                                    }
                                </>
                                :
                                <button className='modal-buttons' onClick={showAnswerFunction}>Show Answer</button>
                            }
                        </div>
                    </article>
                }
            </section>
        </div>
    )
}

export default Modal;