import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_STUDY_SET } from '../../utils/queries';
import { useParams, Link } from 'react-router-dom';
import Header from '../../Components/Header/header';
import './studentStudy.css';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import useSound from 'use-sound';
import mouseClick from '../../assets/sounds/mouse-click.wav';
import flipCard from '../../assets/sounds/flip-card.wav';
import wrongAnswer from '../../assets/sounds/wrong-answer-flashcard.wav';
import correctAnswer from '../../assets/sounds/correct-answer-flashcard.wav';
import endGame from '../../assets/sounds/end-game-study-set.wav';
import { useEffect, useState } from 'react';


function StudentStudy() {
    //saved highscore
    const highScore = localStorage.getItem('highscore')

    // Sounds
    const [mouseClickSound] = useSound(mouseClick, { volume: .3 })
    const [wrongAnswerSound] = useSound(wrongAnswer, { volume: .3 })
    const [flipCardSound] = useSound(flipCard, { volume: .3 })
    const [correctAnswerSound] = useSound(correctAnswer, { volume: .3 })
    const [endGameSound] = useSound(endGame, { volume: .3 })


    const gameId = useParams().gameId
    const teacherName = useParams().teacher
    const { data } = useQuery(QUERY_SINGLE_STUDY_SET, {
        variables: { gameId }
    })

    const studyTopic = data?.getUserGames?.gameTopic || '';
    const studyData = data?.getUserGames?.gameData || [];

    const [studySet, setStudySet] = useState([]);
    useEffect(() => {
        studyData.forEach((set) => {
            for (let i = 0; i < 5; i++) {
                if (set.clues[i].answer && set.clues[i].question) {
                    setStudySet(studySet => [...studySet, {
                        question: set.clues[i].question,
                        answer: set.clues[i].answer
                    }])
                }
            }
        })
    }, [studyData])

    const [currentCard, setCurrentCard] = useState(0,)
    const [flip, setFlip] = useState(false)

    function nextCard(number) {
        mouseClickSound();
        setFlip(false)
        const allStudyCards = document.querySelectorAll('.study-card');
        if (number > allStudyCards.length - 1) {
            return;
        }
        setCurrentCard(currentCard => currentCard + 1);
        for (let i = 0; i < allStudyCards.length; i++) {
            if (number === i) {
                allStudyCards[i].style.display = 'flex';
            } else {
                allStudyCards[i].style.display = 'none';
            }
        }
    }

    function previousCard(number) {
        mouseClickSound();
        setFlip(false);
        const allStudyCards = document.querySelectorAll('.study-card')
        if (number < 0) {
            return;
        }
        setCurrentCard(currentCard => currentCard - 1)
        for (let i = 0; i < allStudyCards.length; i++) {
            if (number === i) {
                allStudyCards[i].style.display = 'flex'
            } else {
                allStudyCards[i].style.display = 'none'
            }
        }
    }

    function flipCardFunct(deduce) {
        flipCardSound();
        setFlip(!flip);
        if (!flip && !deduce) {
            setScore(score - 1)
        }
    }

    // adding score function
    const [score, setScore] = useState(100)
    function scoreResponse(e, answer) {
        e.preventDefault();
        const inputEl = document.querySelector('#answer-flashcard');
        let response = e.target.firstChild.value;
        if (response.toLowerCase() === answer.toLowerCase()) {
            correctAnswerSound();
            flipCardFunct(true);
            correctAnswerAnimation();
            return;
        } else {
            inputEl.style.animation = 'turnRed 1.8s'
            inputEl.style.color = 'white'
            wrongAnswerSound()
            setScore(score => score - 1)
            setTimeout(() => {
                inputEl.style.animation = '';
                inputEl.style.color = 'black';
            }, 1800)
            return
        }
    }

    // winning variable that will trigger another view
    const [hasWon, setHasWon] = useState(false)

    // need to remove card once correct
    function correctAnswerAnimation() {
        const flashcardArray = document.querySelectorAll('.study-card');
        const flashcardEl = flashcardArray[currentCard];
        flashcardEl.style.animation = 'flyAway 2s .5s both';
        setTimeout(() => {
            setStudySet((studySet) => studySet.filter((_, index) => index !== currentCard))
            flashcardEl.style.animation = 'none'
            if (studySet.length === 1) {
                if (score > highScore) {
                    localStorage.setItem('highscore', score)
                }
                setHasWon(true)
                endGameSound();
            } else if (studySet.length === 2 && currentCard === 0) {
                // I have to decrement the card value because it will increase in the nextCard function and be out of order
                setCurrentCard(currentCard - 1)
                nextCard(0)
            } else if (currentCard === 0) {
                // I have to decrement the card value because it will increase in the nextCard function and be out of order
                setCurrentCard(currentCard - 1)
                nextCard(0)
            } else {
                previousCard(currentCard - 1)
            }
        }, 1800)
    }

    return (
        <>
            <Header />
            <main id='student-study'>
                {
                    hasWon ?
                        <>
                            <div className='flex-box-sb-wrap'>
                                <Link className='study-set-back-btn' to={`/student-dashboard/${teacherName}`}>Quit</Link>
                                <p className='studySet-highscore'>Highscore: <span>{highScore}</span></p>
                            </div>
                                <h1>{studyTopic}</h1>

                            {score === 100 ?
                                <div className='end-game-div'>
                                    <h2 className='end-game-text'>Way to Go!! You kept it <span>💯</span></h2>
                                    <p className='study-set-back-btn retry-btn' onClick={() => window.location.reload()}>retry</p>

                                </div>
                                :
                                score >= highScore ?
                                    <div className='end-game-div'>
                                        <p className='end-game-text'>Score: <span>{score}</span></p>
                                        <h3 className=''>You set a new high score!</h3>
                                        <p className='study-set-back-btn retry-btn'  onClick={() => window.location.reload()}>retry</p>

                                    </div>
                                    :
                                    <div className='end-game-div'>
                                        <p className='end-game-text'>Score: <span>{score}</span></p>
                                        <h3 className=''>Nice try, Keep practicing!</h3>
                                        <p className='study-set-back-btn retry-btn' onClick={() => window.location.reload()}>retry</p>
                                    </div>
                            }
                        </>
                        :
                        <>
                            <div className='flex-box-sb-wrap'>
                                <Link className='study-set-back-btn' to={`/student-dashboard/${teacherName}`}>Quit</Link>
                                <h2 className='studySet-highscore'>Score: <span>{score}</span></h2>
                            </div>
                                <h1>{studyTopic}</h1>

                            <section className='flex-box-sa card-line'>
                                {studySet && studySet.map((card, index) => (
                                    <div
                                        onClick={() => flipCardFunct(false)}
                                        className={`study-card ${flip ? 'flip' : ''}`}
                                        key={index}>
                                        <div className='study-info card-front'>
                                            <p>{card.question}</p>
                                        </div>
                                        <div className='study-info card-back'>
                                            <p>{card.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </section>
                            <div className='flex-box-sa studyset-btns'>
                                <button className='move-card' onClick={() => previousCard(currentCard - 1)}><AiOutlineArrowLeft /></button>
                                <p>{studySet.length === 1 ? 1 : currentCard + 1} / {studySet.length}</p>
                                <button className='move-card' onClick={() => nextCard(currentCard + 1)}><AiOutlineArrowRight /></button>
                            </div>
                            <div>
                                {!flip &&
                                    <form onSubmit={(e) => scoreResponse(e, studySet[currentCard].answer)}>
                                        <input type='text' id='answer-flashcard' autoComplete='off' className='search-public-games' />
                                        <button className='submit-answer'>Submit</button>
                                    </form>
                                }
                            </div>
                        </>
                }
            </main>
        </>
    )
}

export default StudentStudy;