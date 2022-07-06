import './gameBoard.css'
import Modal from '../Modal/modal';
import { useState } from 'react';

function GameBoard() {
    const questionLog = [
        {
            category: 'math',
            clues: [
                {
                    question: 'what are you math?',
                    answer: 'coding',
                    points: '100',
                },
                {
                    question: 'what are you math?',
                    answer: 'coding',
                    points: '200',
                },
                {
                    question: 'what are you math?',
                    answer: 'coding',
                    points: '300',
                },
            ]
        },
        {
            category: 'Science',
            clues: [
                {
                    question: 'what are you science?',
                    answer: 'coding',
                    points: '100',
                },
                {
                    question: 'what are you science?',
                    answer: 'coding',
                    points: '200',
                },
                {
                    question: 'what are you science?',
                    answer: 'coding',
                    points: '300',
                },
            ]
        },
        {
            category: 'Social Studies',
            clues: [
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: '100',
                },
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: '200',
                },
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: '300',
                },
            ]
        },
    ]
    
    const [isModal, setIsModal] = useState(false)
    const [currentQuestionSet, setCurrentQuestionSet] = useState('')

    function toggleModal(project) {
        setCurrentQuestionSet(project)
        setIsModal(!isModal)
    }

    function closeModal() {
        setIsModal(!isModal);
    }
    return (
        <div className='category-columns'>
            {isModal && <Modal questionData={currentQuestionSet} onClose={closeModal} />}
            {questionLog.map((question, index) => (
                <div className='column' key={index + question.category}>
                    <h3>{question.category}</h3>
                    <ul>
                        {question.clues.map((set, index) => (
                            <li 
                            key={index}
                            onClick={() => toggleModal(set)}>
                            <button>{set.question}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default GameBoard;