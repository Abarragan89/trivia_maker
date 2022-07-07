import './modal.css';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import BonusRound from '../BonusRound/bonusRound';
import { useState } from 'react';

function Modal({ questionData, onClose }) {
    // remove points if user gets question wrong
    function removePoints(questionPoints) {
        console.log(500 - questionPoints);
    }

    const [correctAnswer, setCorrectAnswer] = useState(false)
    function bonusRound() {
        const modal = document.getElementById('modalContainer')
        modal.style.animation = 'bonusAppear 1s'
        setCorrectAnswer(true)
    }
    return (
        <div className='modalBackdrop'>
            <section className='modalContainer' id='modalContainer'>
                <div className='modalHeader flex-box-sb'>
                    <h4>Username</h4>
                    <p id='exitModal' onClick={onClose}><FaTimes /></p>
                </div>
                {correctAnswer ?
                    <BonusRound />
                    :
                    <article className='questionContainer flex-box-col-sa'>
                        <p className='cardQuestionText'>{questionData.question}</p>
                        <div className='flex-box-sb'>
                            <button onClick={() => removePoints(questionData.points)}><FaTimes className='grading-icon' /></button>
                            <button onClick={bonusRound}><FaCheck className='grading-icon' /></button>
                        </div>
                    </article>
                }
            </section>
        </div>
    )
}

export default Modal;