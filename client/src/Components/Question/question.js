import './question.css';
import '../GameBoard/gameBoard.css';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Question({
    question,
    answer,
    points,
    liEl,
    showQuestion,
    setShowQuestion
}) {
    console.log(points)
    console.log(liEl)
    console.log(answer)
    console.log(question)
    // remove points if user gets question wrong
    function removePoints(questionPoints) {
        console.log(500 - questionPoints);
        setShowQuestion(false);
    }

    function disableButton(ListElId) {
        console.log('disabling')
        for(let i = 0; i < ListElId.length; i++){
            let listEl = document.getElementById(ListElId).setAttribute('class', 'disabledButton');
            console.log(listEl)
        }
        // window.location.replace('/question')
    }
    disableButton(liEl)

    return (
        <>
            <div className='flex-box-sa mt-4'>
                <h4>Username</h4>
                <Link to='/gamepage'><FaTimes /></Link>
            </div>
            <article className='questionContainer flex-box-col-sa'>
                <div>
                    <p className='cardQuestion'>{question}</p>
                </div>
                <div className='flex-box-sa'>
                    <button onClick={() => removePoints(points)}><FaTimes className='grading-icon' /></button>
                    <button><FaCheck className='grading-icon' /></button>
                </div>
            </article>
        </>
    )
}

export default Question;