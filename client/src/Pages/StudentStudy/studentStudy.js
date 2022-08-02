import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_STUDY_SET } from '../../utils/queries';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/header';
import './studentStudy.css';
import { useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import useSound from 'use-sound';
import mouseClick from '../../assets/sounds/mouse-click.wav';
import flipCard from '../../assets/sounds/flip-card.wav';
import wrongAnswer from '../../assets/sounds/wrong-answer-flashcard.wav';


function StudentStudy() {
    // MouseClick Sound
    const [mouseClickSound] = useSound(mouseClick, { volume: .3 })
    const [wrongAnswerSound] = useSound(wrongAnswer, { volume: .3 })
    const [flipCardSound] = useSound(flipCard, { volume: .3 })


    const gameId = useParams().gameId
    const navigate = useNavigate();
    const { data } = useQuery(QUERY_SINGLE_STUDY_SET, {
        variables: { gameId }
    })

    const studyTopic = data?.getUserGames?.gameTopic || '';
    const studyData = data?.getUserGames?.gameData || [];

    // extract Q and A fom query
    const studySet = [];
    studyData.forEach((set) => {
        for (let i = 0; i < 5; i++) {
            if (set.clues[i].answer && set.clues[i].question) {
                let flashcard = {
                    question: set.clues[i].question,
                    answer: set.clues[i].answer
                }
                studySet.push(flashcard)
            }
        }
    })

    const [currentCard, setCurrentCard] = useState(0)
    const [flip, setFlip] = useState(false)

    function nextCard(number) {
        mouseClickSound();
        setFlip(false)
        const allStudyCards = document.querySelectorAll('.study-card');
        if (number > allStudyCards.length - 1) {
            return;
        }
        setCurrentCard(currentCard + 1);
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
        setCurrentCard(currentCard - 1)
        for (let i = 0; i < allStudyCards.length; i++) {
            if (number === i) {
                allStudyCards[i].style.display = 'flex'
            } else {
                allStudyCards[i].style.display = 'none'
            }
        }
    }

    function flipCardFunct() {
        flipCardSound();
        setFlip(!flip)
    }

    // adding score function
    const [score, setScore] = useState(0)

    function scoreResponse(e, answer) {
        e.preventDefault();
        console.log(e.target.firstChild.value)
        let response = e.target.firstChild.value;
        if (response.toLowerCase() === answer.toLowerCase()){ 
            setScore(score + 1)
            flipCardFunct();
        } else {
            wrongAnswerSound()        }
    }
    // need to remove card once correct

    return (
        <>
            <Header />
            <main id='student-study'>
                <button className='study-set-back-btn' onClick={() => navigate(-1)}>Back to Study Sets</button>
                <h1>{studyTopic}</h1>
                <h2>Score: <span>{score}</span></h2>
                <section className='flex-box-sa card-line'>
                    {studySet.map((card, index) => (
                        <div
                            onClick={flipCardFunct}
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
                    <p>{currentCard + 1} / {studySet.length}</p>
                    <button className='move-card' onClick={() => nextCard(currentCard + 1)}><AiOutlineArrowRight /></button>
                </div>
                <div>
                    <form onSubmit={(e) => scoreResponse(e, studySet[currentCard].answer)}>
                        <input type='text' id='answer-flashcard' />
                    </form>
                </div>
            </main>
        </>
    )
}

export default StudentStudy;