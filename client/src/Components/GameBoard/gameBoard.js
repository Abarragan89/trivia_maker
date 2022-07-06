import { useState } from 'react';
import { Link } from 'react-router-dom'
import Question from '../Question/question'
import './gameBoard.css'


function GameBoard() {
    const questionLog = [
        {
            category: 'math',
            clues: [
                {
                    question: 'what is multiplication?',
                    answer: 'coding',
                    points: 100,
                },
                {
                    question: 'what is division?',
                    answer: 'coding',
                    points: 200,
                },
                {
                    question: 'what is addition?',
                    answer: 'coding',
                    points: 300,
                },
            ]
        },
        {
            category: 'Science',
            clues: [
                {
                    question: 'what are you science?',
                    answer: 'coding',
                    points: 100,
                },
                {
                    question: 'what are you science?',
                    answer: 'coding',
                    points: 200,
                },
                {
                    question: 'what are you science?',
                    answer: 'coding',
                    points: 300,
                },
            ]
        },
        {
            category: 'Social Studies',
            clues: [
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: 100,
                },
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: 200,
                },
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: 300,
                },
            ]
        },
        {
            category: 'Science',
            clues: [
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: 100,
                },
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: 200,
                },
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: 300,
                },
            ]
        },
        {
            category: 'PE',
            clues: [
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: 100,
                },
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: 200,
                },
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: 300,
                },
            ]
        },
    ];
    // function disableButtons(ElementId) {
    //     console.log('disabling')
    //     const buttonEl = document.getElementById(ElementId)
    //     console.log(buttonEl)
    //     buttonEl.setAttribute('class', 'disabledButton');
    // }

    const [disabledBtnList, setDisabledBtn] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [currentAnswer, setCurrentAnswer] = useState('')
    const [currentPoints, setCurrentPoints] = useState(0);

    const [showQuestion, setShowQuestion] = useState(false)

    
    function renderQuestion (question) {
        setDisabledBtn(...disabledBtnList, question.liEl);
        setCurrentAnswer(question.answer);
        setCurrentQuestion(question.question);
        setCurrentPoints(question.point);

        // disableButtons(disabledBtnList)
        setShowQuestion(true)
    }


    return (
        <>
            {
                showQuestion ?
                    <Question 
                    question={currentQuestion} 
                    answer={currentAnswer}
                    points={currentPoints}
                    liEl={disabledBtnList}  
                    showQuestion={showQuestion}
                    setShowQuestion={setShowQuestion}  
                    />
                    :
                    <div className='category-columns'>
                        {questionLog.map((questionSect, index) => (
                            <div className='column' key={index}>
                                <h3>{questionSect.category}</h3>
                                <ul>
                                    {questionSect.clues.map((questionData, index) => {
                                        {/* put the id of the list element into the state variable to disable it */}
                                        questionData.liEl = index + questionSect.category
                                        return (
                                        <li key={index + questionSect.category} id={index + questionSect.category}>

                                            {/* <Link to='/question'
                                                state={questionData}>
                                                <button>{questionData.points}</button>
                                            </Link> */}
                                            <button onClick={() => renderQuestion(questionData)}>
                                                {questionData.points}
                                            </button>
                                        </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
            }
        </>
    )
}

export default GameBoard;