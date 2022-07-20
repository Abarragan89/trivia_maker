import './gameBoard.css';
import Modal from '../Modal/modal';
import { useState } from 'react';
import { QUERY_GAME_INFO } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

function GameBoard({ h1ref, players }) {
    const gameId = useParams().gameId
    const { data } = useQuery(QUERY_GAME_INFO, {
        variables: { gameId }
    })
    const gameData = data?.getUserGames.gameData || [];

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
                {isModal && <Modal questionData={currentQuestionSet} onClose={closeModal} players={players}/>}
                {gameData.map((question, index) => (
                    <div className='column' key={index + question.category}>
                        <h3>{question.category}</h3>
                        <ul>
                            {question.clues.map((set, index) => {
                                {/* get the id of the button that will be disabled. */}
                                set.listEl = index + question.category
                                if (!set.points) {
                                   return (
                                    <li key={index}>
                                        <p>NA</p>
                                    </li>
                                   ) 
                                }
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