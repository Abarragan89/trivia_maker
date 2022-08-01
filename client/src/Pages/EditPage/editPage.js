import './editPage.css';
import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GAME_INFO } from '../../utils/queries';
import { UPDATE_GAME, DELETE_GAME } from '../../utils/mutations';
import { useParams, Link } from 'react-router-dom';
import Header from '../../Components/Header/header';
import { useState } from 'react';

function EditGame() {
    // used to check if the user is logged in
    const loggedIn = Auth.loggedIn()

    const gameId = useParams().gameId
    const { data } = useQuery(QUERY_GAME_INFO, {
        variables: { gameId }
    })

    const [updateGame] = useMutation(UPDATE_GAME)

    async function handleSubmit(e) {
        e.preventDefault();
        // loop through answers and make a 5 x 5 Array
        let allAnswers = [];
        // Set variables for clue set #1
        let c1s1 = {};
        let c1s2 = {};
        let c1s3 = {};
        let c1s4 = {};
        let c1s5 = {};
        // Set variables for clue set #2
        let c2s1 = {};
        let c2s2 = {};
        let c2s3 = {};
        let c2s4 = {};
        let c2s5 = {};
        // Set variables for clue set #3
        let c3s1 = {};
        let c3s2 = {};
        let c3s3 = {};
        let c3s4 = {};
        let c3s5 = {};
        // Set variables for clue set #4
        let c4s1 = {};
        let c4s2 = {};
        let c4s3 = {};
        let c4s4 = {};
        let c4s5 = {};
        // Set variables for clue set #5
        let c5s1 = {};
        let c5s2 = {};
        let c5s3 = {};
        let c5s4 = {};
        let c5s5 = {};

        // Series of switch statements to organzie questions/answers/points into individual objects
        let formDataAnswers = document.querySelectorAll('.question-input');
        formDataAnswers.forEach((answer, index) => {
            if (answer.value && answer.dataset.category === 'c0') {
                switch (answer.name) {
                    case 'q1':
                        c1s1.question = answer.value;
                        break;
                    case 'a1':
                        c1s1.answer = answer.value;
                        c1s1.points = 100;
                        break;
                    case 'q2':
                        c1s2.question = answer.value;
                        break;
                    case 'a2':
                        c1s2.answer = answer.value;
                        c1s2.points = 200;
                        break;
                    case 'q3':
                        c1s3.question = answer.value;
                        break;
                    case 'a3':
                        c1s3.answer = answer.value;
                        c1s3.points = 300
                        break;
                    case 'q4':
                        c1s4.question = answer.value;
                        break;
                    case 'a4':
                        c1s4.answer = answer.value;
                        c1s4.points = 400;
                        break;
                    case 'q5':
                        c1s5.question = answer.value;
                        break;
                    case 'a5':
                        c1s5.answer = answer.value;
                        c1s5.points = 500;
                        break;
                    default:
                        break;
                }
            }
            if (answer.value && answer.dataset.category === 'c1') {
                switch (answer.name) {
                    case 'q1':
                        c2s1.question = answer.value;
                        break;
                    case 'a1':
                        c2s1.answer = answer.value;
                        c2s1.points = 100;
                        break;
                    case 'q2':
                        c2s2.question = answer.value;
                        break;
                    case 'a2':
                        c2s2.answer = answer.value;
                        c2s2.points = 200;
                        break;
                    case 'q3':
                        c2s3.question = answer.value;
                        break;
                    case 'a3':
                        c2s3.answer = answer.value;
                        c2s3.points = 300;
                        break;
                    case 'q4':
                        c2s4.question = answer.value;
                        break;
                    case 'a4':
                        c2s4.answer = answer.value;
                        c2s4.points = 400;
                        break;
                    case 'q5':
                        c2s5.question = answer.value;
                        break;
                    case 'a5':
                        c2s5.answer = answer.value;
                        c2s5.points = 500;
                        break;
                    default:
                        break;
                }
            }
            if (answer.value && answer.dataset.category === 'c2') {
                switch (answer.name) {
                    case 'q1':
                        c3s1.question = answer.value;
                        break;
                    case 'a1':
                        c3s1.answer = answer.value;
                        c3s1.points = 100;
                        break;
                    case 'q2':
                        c3s2.question = answer.value;
                        break;
                    case 'a2':
                        c3s2.answer = answer.value;
                        c3s2.points = 200
                        break;
                    case 'q3':
                        c3s3.question = answer.value;
                        break;
                    case 'a3':
                        c3s3.answer = answer.value;
                        c3s3.points = 300;
                        break;
                    case 'q4':
                        c3s4.question = answer.value;
                        break;
                    case 'a4':
                        c3s4.answer = answer.value;
                        c3s4.points = 400;
                        break;
                    case 'q5':
                        c3s5.question = answer.value;
                        break;
                    case 'a5':
                        c3s5.answer = answer.value;
                        c3s5.points = 500;
                        break;
                    default:
                        break;
                }
            }
            if (answer.value && answer.dataset.category === 'c3') {
                switch (answer.name) {
                    case 'q1':
                        c4s1.question = answer.value;
                        break;
                    case 'a1':
                        c4s1.answer = answer.value;
                        c4s1.points = 100;
                        break;
                    case 'q2':
                        c4s2.question = answer.value;
                        break;
                    case 'a2':
                        c4s2.answer = answer.value;
                        c4s2.points = 200;
                        break;
                    case 'q3':
                        c4s3.question = answer.value;
                        break;
                    case 'a3':
                        c4s3.answer = answer.value;
                        c4s3.points = 300;
                        break;
                    case 'q4':
                        c4s4.question = answer.value;
                        break;
                    case 'a4':
                        c4s4.answer = answer.value;
                        c4s4.points = 400;
                        break;
                    case 'q5':
                        c4s5.question = answer.value;
                        break;
                    case 'a5':
                        c4s5.answer = answer.value;
                        c4s5.points = 500;
                        break;
                    default:
                        break;
                }
            }
            if (answer.value && answer.dataset.category === 'c4') {
                switch (answer.name) {
                    case 'q1':
                        c5s1.question = answer.value;
                        break;
                    case 'a1':
                        c5s1.answer = answer.value;
                        c5s1.points = 100;
                        break;
                    case 'q2':
                        c5s2.question = answer.value;
                        break;
                    case 'a2':
                        c5s2.answer = answer.value;
                        c5s2.points = 200;
                        break;
                    case 'q3':
                        c5s3.question = answer.value;
                        break;
                    case 'a3':
                        c5s3.answer = answer.value;
                        c5s3.points = 300;
                        break;
                    case 'q4':
                        c5s4.question = answer.value;
                        break;
                    case 'a4':
                        c5s4.answer = answer.value;
                        c5s4.points = 400;
                        break;
                    case 'q5':
                        c5s5.question = answer.value;
                        break;
                    case 'a5':
                        c5s5.answer = answer.value;
                        c5s5.points = 500;
                        break;
                    default:
                        break;
                }
            }
        })


        let category1 = {};
        let category2 = {};
        let category3 = {};
        let category4 = {};
        let category5 = {};

        //Create categories arrays. The clues sets will be added to these objects
        let categoryData = document.querySelectorAll('input[data-name="category"]')
        Array.from(categoryData).forEach(category => {
            if (category.value && category.dataset.category === 'c0') {
                category1.category = category.value;
            } else if (category.value && category.dataset.category === 'c1') {
                category2.category = category.value;
            } else if (category.value && category.dataset.category === 'c2') {
                category3.category = category.value;
            } else if (category.value && category.dataset.category === 'c3') {
                category4.category = category.value;
            } else if (category.value && category.dataset.category === 'c4') {
                category5.category = category.value;
            }
        })

        // add clue sets to category objects
        let clues1Array = [c1s1, c1s2, c1s3, c1s4, c1s5]
        category1.clues = clues1Array

        let clues2Array = [c2s1, c2s2, c2s3, c2s4, c2s5]
        category2.clues = clues2Array

        let clues3Array = [c3s1, c3s2, c3s3, c3s4, c3s5]
        category3.clues = clues3Array

        let clues4Array = [c4s1, c4s2, c4s3, c4s4, c4s5]
        category4.clues = clues4Array

        let clues5Array = [c5s1, c5s2, c5s3, c5s4, c5s5]
        category5.clues = clues5Array

        if (category1.clues.length !== 0) {
            allAnswers.push(category1)
        }
        if (category2.clues.length !== 0) {
            allAnswers.push(category2)
        }
        if (category3.clues.length !== 0) {
            allAnswers.push(category3)
        }
        if (category4.clues.length !== 0) {
            allAnswers.push(category4)
        }
        if (category5.clues.length !== 0) {
            allAnswers.push(category5)
        }
        // Get game topic and check to see if it's public
        let topic = document.querySelector('#game-topic').value;
        let publicGame = document.querySelector('#public-game').checked
        let isStudySet = document.querySelector('#study-set').checked

        await updateGame({
            variables: {
                gameId: gameId,
                gameData: allAnswers,
                topic: topic,
                isStudySet: isStudySet,
                public: publicGame
            }
        })
        window.location.replace('/my-games')
    }

    const [deleteGame] = useMutation(DELETE_GAME);

    async function deleteGameFun(gameId) {
        const message = 'Are you sure you want to delete this game? This is irreversible.'
        const confirmation = window.confirm(message)
        if (confirmation) {
            try {
                await deleteGame({
                    variables: { gameId: gameId }
                })
                window.location.replace('/my-games')
            } catch (e) {
                console.log('game could not be found')
            }
        }
    }
    
    const [category1, setCategory1] = useState('Empty')
    function cat1OnChange(e) {
        const { value } = e.target
        setCategory1(value)
    }
    const [category2, setCategory2] = useState('Empty')
    function cat2OnChange(e) {
        const { value } = e.target
        setCategory2(value)
    }
    const [category3, setCategory3] = useState('Empty')
    function cat3OnChange(e) {
        const { value } = e.target
        setCategory3(value)
    }
    const [category4, setCategory4] = useState('Empty')
    function cat4OnChange(e) {
        const { value } = e.target
        setCategory4(value)
    }
    const [category5, setCategory5] = useState('Empty')
    function cat5OnChange(e) {
        const { value } = e.target
        setCategory5(value)
    }

    const arrayOfCats = [category1, category2, category3, category4, category5]
    const arrayOfCatFuncts = [cat1OnChange, cat2OnChange, cat3OnChange, cat4OnChange, cat5OnChange]


    return (
        <>
            <Header />
            {loggedIn && data ?
                <>
                    <form id='create-game-form-edit' onSubmit={handleSubmit}>
                        <div className='flex-box-sb'>
                            <input type='text' className='create-game-txt-input' defaultValue={data.getUserGames.gameTopic}
                                placeholder='Game Title' id='game-topic' name='game-topic' autoFocus required></input>
                            <div>
                                <input type='checkbox' id='study-set' name='study-set'></input>
                                <label htmlFor='study-set'>Generate Study Set</label>
                            </div>
                            <div>
                                <input type='checkbox' id='public-game' name='public-game'></input>
                                <label htmlFor='public-game'>Make Public</label>
                            </div>
                        </div>
                        <ul id='question-accordion-edit'>

                            {data.getUserGames.gameData.map((gameSet, gameIndex) => (
                                <li key={gameIndex} id={`form-el-edit-${gameIndex + 1}`}>
                                    <label htmlFor={`category-${gameIndex}-radio`} className='flex-box-sb category-label'
                                    defaultValue={!gameSet.category ? arrayOfCats[gameIndex] : gameSet.category}
                                    >
                                    {gameSet.category && arrayOfCats[gameIndex] === 'Empty' ? `#${gameIndex + 1} ` +  gameSet.category : `#${gameIndex + 1} ` + arrayOfCats[gameIndex]}
                                    </label>

                                    <input type='radio' defaultValue={gameSet.category ? gameSet.category : 'Empty'} id={`category-${gameIndex}-radio`} name='accordion'></input>
                                    <section className='question-content'>

                                        <input type='text'
                                            data-category={`c${gameIndex}`}
                                            defaultValue={!gameSet.category ? arrayOfCats[gameIndex] : gameSet.category}
                                            placeholder='Enter Topic'
                                            onChange={arrayOfCatFuncts[gameIndex]}
                                            data-name='category' className='question-input' name='category-name' maxLength='115' />



                                        {gameSet.clues.map((clues, index) => (
                                            <div className='single-question-div' key={index + gameIndex}>
                                                <p className='point-label'>{`${index += 1}00`} Points</p>
                                                <textarea data-category={`c${gameIndex}`} placeholder='Question'
                                                    defaultValue={clues.question} name={`q${index}`} className='question-input'></textarea>
                                                <textarea data-category={`c${gameIndex}`} placeholder='Answer'
                                                    defaultValue={clues.answer} name={`a${index}`} className='question-input'></textarea>
                                            </div>
                                        ))}
                                    </section>
                                </li>
                            ))}
                        </ul>
                        <button type='submit' className='edit-game-btns'>Update Game</button>
                        <p onClick={() => deleteGameFun(gameId)} id='delete-game-btn' className='edit-game-btns'>Delete Game</p>
                    </form>
                </>
                :
                <p>You need to be <Link to='/login'>logged in</Link> to view this page</p>
            }
        </>
    )
}

export default EditGame;