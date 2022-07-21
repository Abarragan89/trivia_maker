import './gameBoard.css';
import Modal from '../Modal/modal';
import { useState, useEffect, useRef } from 'react';
import { QUERY_GAME_INFO } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GameStart } from '../../utils/gameStart';

function GameBoard({ h1ref, players }) {
    const gameId = useParams().gameId

    console.log('player', players)

    const { data } = useQuery(QUERY_GAME_INFO, {
        variables: { gameId }
    })
    
    const gameData = data?.getUserGames?.gameData || [];
    const questionAmount = data?.getUserGames?.questionCount || 0; 

    const [isModal, setIsModal] = useState(false)
    const [currentQuestionSet, setCurrentQuestionSet] = useState('')

    function toggleModal(questionButton) {
        h1ref.current.scrollIntoView(
            {
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            }
        );
        setCurrentQuestionSet(questionButton)
        setIsModal(!isModal)
        disableButton(questionButton.listEl)
    }

    function closeModal() {
        setIsModal(!isModal);
    }

    // disable the buttons that have been clicked
    function disableButton(listElId) {
        let listEl = document.getElementById(listElId)
        listEl.setAttribute('disabled', 'true')
        listEl.removeAttribute('class', 'activeQuestions')
    }

    // Get count of active buttons to get a inital count of questions for Game Instance
    // const[game, setGame] = useState(null);

    const game = useRef(null)
    useEffect(() => {
        game.current = new GameStart( questionAmount, players) 
        console.log('new game created',game.current)  
    },[gameData, questionAmount]) 


    return (
        <>
            <div className='category-columns flex-box-sa'>
                {isModal && <Modal game={game} questionData={currentQuestionSet} onClose={closeModal} players={players}/>}
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
                                        <button className='activeQuestions questionButtons' id={index + question.category}>{set.points}</button>
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