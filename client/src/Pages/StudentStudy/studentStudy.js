import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_STUDY_SET } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header/header';
import './studentStudy.css';
import { useState } from 'react';

function StudentStudy() {
    const gameId = useParams().gameId

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
        setFlip(false)
        const allStudyCards = document.querySelectorAll('.study-card');
        if(number > allStudyCards.length - 1) {
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
        setFlip(false);
        const allStudyCards = document.querySelectorAll('.study-card')
        if(number < 0) {
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

    return (
        <>
            <Header />
            <main id='student-study'>
                <h1>{studyTopic}</h1>
                <section className='flex-box-sa card-line'>
                    {studySet.map((card, index) => (
                        <div
                            onClick={() => setFlip(!flip)}
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
                    <button className='move-card' onClick={() => previousCard(currentCard - 1)}>Back</button>
                    <p>{currentCard + 1} / {studySet.length}</p>
                    <button className='move-card' onClick={() => nextCard(currentCard + 1)}>Next</button>
                </div>
            </main>
        </>
    )
}

export default StudentStudy;