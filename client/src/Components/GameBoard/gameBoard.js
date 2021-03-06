import './gameBoard.css';
import Modal from '../Modal/modal';
import { useState } from 'react';
import { QUERY_GAME_INFO } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import WinnerPodium from '../WinnerPodium/winnerPodium';

function GameBoard({ h1ref, game, scoreChange, setScoreChange }) {
    const gameId = useParams().gameId
    const { data } = useQuery(QUERY_GAME_INFO, {
        variables: { gameId }
    })
    const gameData = data?.getUserGames?.gameData || [];

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

    const [endGameData, setEndGameData] = useState(null)
    console.log(endGameData)
    function closeModal() {
        setIsModal(!isModal);
        if(game.endGame()) {
            setEndGameData(game.endGame())
        }
        game.switchPlayer();
    }

    // disable the buttons that have been clicked
    function disableButton(listElId) {
        let listEl = document.getElementById(listElId)
        listEl.setAttribute('disabled', 'true')
        listEl.removeAttribute('class', 'activeQuestions')
    }

    return (
        <>
            <div className='category-columns flex-box-sa'>
                {isModal && 
                <Modal 
                game={game} 
                questionData={currentQuestionSet} 
                onClose={closeModal} 
                scoreChange={scoreChange}
                setScoreChange={setScoreChange}    
                />}
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
            {endGameData &&
                <WinnerPodium endGameData={endGameData}/>
            }    
            </div>
        </>
    )
}

export default GameBoard;