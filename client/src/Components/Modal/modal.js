import './modal.css';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Modal({ questionData, onClose }) {
    console.log(questionData)
    // remove points if user gets question wrong
    function removePoints(questionPoints) {
        console.log(500 - questionPoints);
        onClose();

    }

    // function disableButton(ListElId) {
    //     console.log('disabling')
    //     for (let i = 0; i < ListElId.length; i++) {
    //         let listEl = document.getElementById(ListElId).setAttribute('class', 'disabledButton');
    //         console.log(listEl)
    //     }
    //     // window.location.replace('/question')
    // }
    // disableButton(liEl)

    return (
        <div className='modalBackdrop'>
        <section>
            <div className='flex-box-sa mt-4'>
                <h4>Username</h4>
                <button onClick={onClose}><FaTimes /></button>
            </div>
            <article className='questionContainer flex-box-col-sa'>
                <div>
                    <p className='cardQuestion'>{questionData.question}</p>
                </div>
                <div className='flex-box-sa'>
                    <button onClick={() => removePoints(questionData.points)}><FaTimes className='grading-icon' /></button>
                    <button><FaCheck className='grading-icon' /></button>
                </div>
            </article>
        </section>
        </div>
    )
}

export default Modal;