import './gameBoard.css';
import Modal from '../Modal/modal';
import { useState } from 'react';
import { QUERY_GAME_INFO } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

function GameBoard({ h1ref }) {
    const gameId = useParams().gameId
    console.log(gameId)
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

    const { data } = useQuery(QUERY_GAME_INFO, {
        variables: { gameId }
    })
    console.log(data)
    const answers = data?.getUserGames.answers || [];
    console.log('answers', answers)
    const questions = data?.getUserGames.questions || [];
    console.log('questions', questions)
    const categories = data?.getUserGames.categories || [];
    console.log('categories', categories)
    const topic = data?.getUserGames.gameTopic || '';
    console.log('topic ', topic)

    const questionsAnswers = {
        questions,
        answers,
    }

    console.log(questionsAnswers)


    const [isModal, setIsModal] = useState(false)
    const [currentQuestionSet, setCurrentQuestionSet] = useState('')

    function toggleModal(project) {
        h1ref.current.scrollIntoView(
            {
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            }
        );
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
        // <>
        //     <div className='category-columns flex-box-sa'>
        //         {isModal && <Modal questionData={currentQuestionSet} onClose={closeModal} />}
        //         {categories.map((category, index) => (
        //             <div className='column' key={index + category}>
        //                 <h3>{category}</h3>
        //             {answers.map((answer, aindex) => (
        //                 <p>{answer[index]}</p>
        //             ))}
        //             </div>
        //         ))}
        //     </div>

        // </>

    )
}

export default GameBoard;