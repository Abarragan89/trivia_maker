import './modal.css';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import BonusRound from '../BonusRound/bonusRound';
import { useState } from 'react';

function Modal({ questionData, onClose, players }) {
    // remove points if user gets question wrong
    function removePoints(questionPoints) {
        console.log(500 - questionPoints);
    }

    const [correctAnswer, setCorrectAnswer] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    function bonusRound() {
        const modal = document.getElementById('modalContainer')
        modal.style.animation = 'bonusAppear 1s'
        setCorrectAnswer(true)

    // Make function for subtracting points

    // Make function for transfering points to the bonus round

    // Not here, but multiply points by x landed

    // How do I incorporate the game class to start and end a game? 
    }
    return (
        <div className='modalBackdrop'>
            <section className='modalContainer' id='modalContainer'>
                <div className='modalHeader flex-box-sb'>
                    <h4>Username</h4>
                    <p id='exitModal' onClick={onClose}><FaTimes /></p>
                </div>
                {correctAnswer ?
                    <BonusRound players={players}/>
                    :
                    <article className='questionContainer flex-box-col-sa'>
                        {showAnswer ? <p className='cardQuestionText'>{questionData.answer}</p>
                            : <p className='cardQuestionText'>{questionData.question}</p>}

                        <div className='flex-box-sb'>
                            {showAnswer ?
                                <>
                                    <button onClick={() => setShowAnswer(false)}>Hide Answer</button>
                                    <button onClick={() => removePoints(questionData.points)}><FaTimes className='grading-icon' /></button>
                                    <button onClick={bonusRound}><FaCheck className='grading-icon' /></button>
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