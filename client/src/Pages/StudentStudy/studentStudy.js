import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_STUDY_SET } from '../../utils/queries';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/header';
import './studentStudy.css';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import useSound from 'use-sound';
import mouseClick from '../../assets/sounds/mouse-click.wav';
import flipCard from '../../assets/sounds/flip-card.wav';
import wrongAnswer from '../../assets/sounds/wrong-answer-flashcard.wav';
import correctAnswer from '../../assets/sounds/correct-answer-flashcard.wav';
import { useEffect, useState } from 'react';


function StudentStudy() {
    // MouseClick Sound
    const [mouseClickSound] = useSound(mouseClick, { volume: .3 })
    const [wrongAnswerSound] = useSound(wrongAnswer, { volume: .3 })
    const [flipCardSound] = useSound(flipCard, { volume: .3 })
    const [correctAnswerSound] = useSound(correctAnswer, { volume: .3 })


    const gameId = useParams().gameId
    const navigate = useNavigate();
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

    // Fisher-Yates shuffle function 
    // function shuffle(array) {
    //     let currentIndex = array.length,  randomIndex;

    //     // While there remain elements to shuffle.
    //     while (currentIndex != 0) {

    //       // Pick a remaining element.
    //       randomIndex = Math.floor(Math.random() * currentIndex);
    //       currentIndex--;

    //       // And swap it with the current element.
    //       [array[currentIndex], array[randomIndex]] = [
    //         array[randomIndex], array[currentIndex]];
    //     }

    //     return array;
    //   }


    const [currentCard, setCurrentCard] = useState(0, )
    const [flip, setFlip] = useState(false)

    function nextCard(number) {
        console.log('currentCard next ', currentCard)
        console.log('studySet next', studySet)
        console.log('length in Next', studySet.length)
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
        console.log('currentCard previous', currentCard)
        console.log('studySet previous', studySet)
        console.log('length in previous', studySet.length)
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
        if (!flip && deduce) {
            setScore(score - 1)
        }
    }

    // adding score function
    const [score, setScore] = useState(100)
    function scoreResponse(e, answer) {
        e.preventDefault();
        let response = e.target.firstChild.value;
        if (response.toLowerCase() === answer.toLowerCase()) {
            correctAnswerSound();
            setScore(score + 1) 
            flipCardFunct(true);
            correctAnswerAnimation();
            return;
        } else {
            wrongAnswerSound()
            return
        }
    }

    // winning variable that will trigger another view
    const [hasWon, setHasWon] = useState(false)

    // need to remove card once correct
    function correctAnswerAnimation() {
        const flashcardArray = document.querySelectorAll('.study-card')
        const flashcardEl = flashcardArray[currentCard]
        flashcardEl.style.animation = 'flyAway 2s .5s both';
        setTimeout(() => {
            setStudySet((studySet) => studySet.filter((_, index) => index !== currentCard))
            flashcardEl.style.animation = 'none'
            if (studySet.length === 1) {
                winningScreen()
            } else if (studySet.length === 2 && currentCard === 0) {
                // I have to decrement the card value because it will increase in the nextCard function and be out of order
                setCurrentCard(currentCard - 1)
                nextCard(0) 
            } else if (currentCard === 0 ) {
                // I have to decrement the card value because it will increase in the nextCard function and be out of order
                setCurrentCard(currentCard - 1)
                nextCard(0)
            } else {
                previousCard(currentCard - 1)
            }
        }, 1500)
    }

    function winningScreen() {

    }
    return (
        <>
            <Header />
            <main id='student-study'>
                <div className='flex-box-sb-wrap'>
                    <button className='study-set-back-btn' onClick={() => navigate(-1)}>Quit</button>
                    <h1>{studyTopic}</h1>
                    <h2>Score: <span>{score}</span></h2>
                </div>

                <section className='flex-box-sa card-line'>
                    {studySet && studySet.map((card, index) => (
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
            </main>
        </>
    )
}

export default StudentStudy;