import './modal.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import BonusRound from '../BonusRound/bonusRound';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSound from 'use-sound';
import correctAnswerSound from '../../assets/sounds/correct-answer.wav';
import wrongAnswerNotification from '../../assets/sounds/wrong-answer.wav';
import runnerUpWinning from '../../assets/sounds/runnerup-win.wav';
import '../Navigation/navigation.css';


function Modal({
    questionData,
    onClose,
    game,
    scoreChange,
    setScoreChange,
    stopSuspense,
    suspenseMusicSound,
    ballSpeed,
    muted, 
    setMuted
}) {
    const [correctAnswerNoise] = useSound(correctAnswerSound, { volume: '.5' });
    const [incorrectAnswer] = useSound(wrongAnswerNotification, { volume: '.5' });
    const [runnerUpWinSound] = useSound(runnerUpWinning, { volume: '.5' });

    const gameId = useParams().gameId
    // This triggers the bonus round
    const [correctAnswer, setCorrectAnswer] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const [pointValue, setPointValue] = useState(0)

    function bonusRound(points) {
        correctAnswerNoise();
        setPointValue(points)
        const modal = document.getElementById('modalContainer')
        modal.style.animation = 'bonusAppear 1s'
        setCorrectAnswer(true)
    }

    const [playerScore, setPlayerScore] = useState(game.currentPlayer.score)
    // this function works as a ticker to visually display the player's score increasing
    function increasePlayerScore(points) {
        game.decreaseQuestions();
        let playerIntegerScore = parseInt(playerScore)
        let counter = 0;
        const visualIncrease = setInterval(() => {
            setPlayerScore(playerIntegerScore++)
            counter++;
            if (counter > points) {
                clearInterval(visualIncrease)
            }
        }, 0)
    }

    // If the player gets the answer wrong
    function wrongAnswer(questionPoints) {
        incorrectAnswer();
        decreasePlayerScore(questionPoints);
        game.decreaseQuestions();
        game.currentPlayer.subtractPoints(questionPoints)

        setScoreChange(scoreChange + 1);
    }
    // visually display the score decreasing
    const [wrongAnswerChosen, setWrongAnswerChosen] = useState(false)

    function decreasePlayerScore(points) {
        setWrongAnswerChosen(true)
        let playerIntegerScore = parseInt(playerScore)
        let counter = 0;
        const visualIncrease = setInterval(() => {
            setPlayerScore(playerIntegerScore--)
            counter++;
            if (counter > points) {
                clearInterval(visualIncrease)
            }
        }, 0)
    }

    function skipQuestion() {
        game.decreaseQuestions();
        if (game.endGame()) {
            setWrongAnswerChosen(true)
        } else {
            onClose();
        }
    }
    function showAnswerFunction() {
        stopSuspense();
        setShowAnswer(true);
    }
    function hideAnswerFunction() {
        if (!muted) {
            suspenseMusicSound()
        }
        setShowAnswer(false);
    }


    // set random runner up
    const [runnerUp, setRunnerUp] = useState('')

    function addPointsToRunnerUp(e, points) {
        runnerUpWinSound();
        e.target.style.opacity = '0';
        e.target.disabled = true;
        let counter = 0;
        const visualIncrease = setInterval(() => {
            // setScoreChange is just state passed to trigger change in parent element
            setScoreChange(scoreChange++)
            setRunnerUp(player => {
                const updatedPlayer = { ...player };
                updatedPlayer.score += 1;
                return updatedPlayer
            })
            counter++;
            if (counter > points - 1) {
                clearInterval(visualIncrease)
                runnerUp.addPoints(points)
            }
        }, 4)

    }

    function muteSuspense () {
        setMuted(true)
        stopSuspense();
    }

    function unmuteSuspense () {
        setMuted(false)
        if(!correctAnswer && !showAnswer) {
            suspenseMusicSound();
        }
    }

    return (
        <div className='modalBackdrop'>
            <section className='modalContainer' id='modalContainer'>
                <div className='modalHeader flex-box-sb'>
                    <h4 className='player-info-in-modal'>{game.currentPlayer.name}</h4>
                    <h3 className='player-info-in-modal'>{playerScore}</h3>
                    {
                        muted ?
                            <p className='mute-speaker' onClick={unmuteSuspense}><BiVolumeMute /></p>
                            :
                            <p className='mute-speaker' onClick={muteSuspense}><BiVolumeFull /></p>
                    }
                </div>
                {correctAnswer ?
                    <BonusRound
                        game={game}
                        pointValue={pointValue}
                        scoreChange={scoreChange}
                        setScoreChange={setScoreChange}
                        closeModal={onClose}
                        increasePlayerScore={increasePlayerScore}
                        ballSpeed={ballSpeed}
                    />
                    :
                    <article className='questionContainer flex-box-col-sa'>
                        {showAnswer ? <p className='cardQuestionText'>{questionData.answer}</p>
                            : <p className='cardQuestionText'>{questionData.question}</p>}

                        <div id='modal-button-div' className='flex-box-se'>
                            {showAnswer ?
                                <>
                                    {wrongAnswerChosen ?
                                        game.endGame() ?
                                            <>
                                                {runnerUp &&
                                                    <div>
                                                        <button className='modal-buttons' onClick={(e) => addPointsToRunnerUp(e, questionData.points)}>Award to Runner-Up</button>
                                                        <div className='flex-box-sa'>
                                                            <p className='runnerup-name-adding'>{runnerUp.name}</p>
                                                            <p className='runnerup-name-adding'>{runnerUp.score}</p>
                                                        </div>
                                                    </div>
                                                }
                                                <Link state={game} to={`/winner-podium/${gameId}`}><button id='end-game-btn' className='modal-buttons'>End Game</button></Link>
                                            </>
                                            :
                                            <>
                                                {runnerUp &&
                                                    <div>
                                                        <button className='modal-buttons' onClick={(e) => addPointsToRunnerUp(e, questionData.points)}>Award to Runner-Up</button>
                                                        <div className='flex-box-sa'>
                                                            <p className='runnerup-name-adding'>{runnerUp.name}</p>
                                                            <p className='runnerup-name-adding'>{runnerUp.score}</p>
                                                        </div>
                                                    </div>
                                                }
                                                <button className='modal-buttons' id='next-player-btn' onClick={onClose}>Next Player</button>
                                            </>
                                        :
                                        <>
                                            <button className='modal-buttons' onClick={hideAnswerFunction}>Hide Answer</button>
                                            <button className='modal-buttons' onClick={skipQuestion}>Skip</button>
                                            <button id='wrong-answer' className='modal-buttons' onClick={() => wrongAnswer(questionData.points)}><FaTimes className='grading-icon' /></button>
                                            <button id='correct-answer' className='modal-buttons' onClick={() => bonusRound(questionData.points)}><FaCheck className='grading-icon' /></button>
                                        </>
                                    }
                                </>
                                :
                                <div id='show-answer-reveal-div'>
                                    {
                                        runnerUp ?
                                            <p id='runnerup-name'>{runnerUp.name}</p>
                                            :
                                            <button className='modal-buttons' id='runnerup-btn' onClick={() => setRunnerUp(game.pickRunnerUp())}>Reveal Runner-up</button>
                                    }
                                    <button className='modal-buttons' id='show-answer-btn' onClick={showAnswerFunction}>Show Answer</button>
                                </div>
                            }
                        </div>
                    </article>
                }
            </section>
        </div>
    )
}

export default Modal;