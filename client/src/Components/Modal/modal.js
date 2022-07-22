import './modal.css';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import BonusRound from '../BonusRound/bonusRound';
import { useState } from 'react';

function Modal({ questionData, onClose, game, scoreChange, setScoreChange }) {

    // This triggers the bonus round
    const [correctAnswer, setCorrectAnswer] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const [pointValue, setPointValue] = useState(0)

    function bonusRound(points) {
        setPointValue(points)
        const modal = document.getElementById('modalContainer')
        modal.style.animation = 'bonusAppear 1s'
        setCorrectAnswer(true)
    }

    const [playerScore, setPlayerScore] = useState(game.currentPlayer.score)
    // this function works as a ticker to visually display the player's score increasing
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

    // If the player gets the answer wrong
    function wrongAnswer(questionPoints) {
        decreasePlayerScore(questionPoints);
        game.decreaseQuestions();
        game.currentPlayer.subtractPoints(questionPoints)
        game.endGame();
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
                                    {wrongAnswerChosen ?
                                        <button onClick={onClose}>Next Player</button>
                                        :
                                        <>
                                            <button onClick={() => setShowAnswer(false)}>Hide Answer</button>
                                            <button onClick={() => wrongAnswer(questionData.points)}><FaTimes className='grading-icon' /></button>
                                            <button onClick={() => bonusRound(questionData.points)}><FaCheck className='grading-icon' /></button>
                                        </>
                                    }
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