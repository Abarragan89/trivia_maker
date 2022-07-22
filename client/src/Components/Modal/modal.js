import './modal.css';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import BonusRound from '../BonusRound/bonusRound';
import { useState } from 'react';

function Modal({ questionData, onClose, game, scoreChange, setScoreChange }) {
    // If the player gets the answer wrong
    function wrongAnswer(questionPoints) {
        game.decreaseQuestions();
        game.currentPlayer.subtractPoints(questionPoints)
        onClose();
        game.endGame();
        setScoreChange(scoreChange + 1);
    }

    const [correctAnswer, setCorrectAnswer] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)

    const [pointValue, setPointValue] = useState(0)
    function bonusRound(points) {
        setPointValue(points)
        const modal = document.getElementById('modalContainer')
        modal.style.animation = 'bonusAppear 1s'
        setCorrectAnswer(true)
    }


    let [playerScore, setPlayerScore] = useState(game.currentPlayer.score)
    
    console.log('playerscore', playerScore)
    function increasePlayerScore(points) {
        let playerIntegerScore = parseInt(playerScore)
        let counter = 0;
        const visualIncrease = setInterval(() => {
                setPlayerScore(playerIntegerScore++)
                counter++;
                if (counter > points) {
                    clearInterval(visualIncrease)
                }
        }, 15)
    }
    

    return (
        <div className='modalBackdrop'>
            <section className='modalContainer' id='modalContainer'>
                <div className='modalHeader flex-box-sb'>
                    <h4>{game.currentPlayer.name}<span>{playerScore}</span></h4>
                    <p id='exitModal' onClick={onClose}><FaTimes /></p>
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

                        <div className='flex-box-sb'>
                            {showAnswer ?
                                <>
                                    <button onClick={() => setShowAnswer(false)}>Hide Answer</button>
                                    <button onClick={() => wrongAnswer(questionData.points)}><FaTimes className='grading-icon' /></button>
                                    <button onClick={() => bonusRound(questionData.points)}><FaCheck className='grading-icon' /></button>
                                </>
                                :
                                <button onClick={() => setShowAnswer(true)}>Show Answer</button>
                            }
                        </div>
                    </article>
                }
            </section>
        </div>
    )
}

export default Modal;