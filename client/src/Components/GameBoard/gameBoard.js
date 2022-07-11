import './gameBoard.css'
import Modal from '../Modal/modal';
import { useState } from 'react';

function GameBoard({ h1ref }) {
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
        {
            category: 'Philosophy',
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
        {
            category: 'Spanish',
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
        {
            category: 'PE',
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

    console.log('h1ref from child', h1ref)

    const [isModal, setIsModal] = useState(false)
    const [currentQuestionSet, setCurrentQuestionSet] = useState('')

    function toggleModal(project) {
        // h1ref.scrollIntoView();


        setCurrentQuestionSet(project)
        setIsModal(!isModal)
        disableButton(project.listEl)
    }

    function closeModal() {
        setIsModal(!isModal);
    }

    // disable the buttons that have been clicked
    function disableButton(listElId) {
        let listEl = document.getElementById(listElId)
            listEl.setAttribute('disabled', 'true')
    }
    return (
    <>
        <div className='category-columns flex-box-sa'>
            {isModal && <Modal questionData={currentQuestionSet} onClose={closeModal} />}
            {questionLog.map((question, index) => (
                <div className='column' key={index + question.category}>
                    <h3>{question.category}</h3>
                    <ul>
                        {question.clues.map((set, index) => {
                            {/* get the id of the button that will be disabled. */}
                            set.listEl = index + question.category
                            return (
                                <li
                                    key={index}
                                    onClick={() => toggleModal(set)}>
                                    <button id={index + question.category}>{set.points}</button>
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