import './createGame.css';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client'
import { CREATE_GAME } from '../../utils/mutations'
import Header from '../../Components/Header/header';
import mouseClick from '../../assets/sounds/mouse-click.wav';
import useSound from 'use-sound';
import { useState } from 'react';

function CreateGame() {

    // MouseClick Sound
    const [mouseClickSound] = useSound(mouseClick, { volume: .6})

    // used to check if the user is logged in
    const loggedIn = Auth.loggedIn()

    // Set up mutation
    const [createGame] = useMutation(CREATE_GAME)

    // Create the Game
    async function handleSubmit(e) {
        e.preventDefault();
        // loop through answers and make a 5 x 5 Array
        let allAnswers = [];
        // Set variables for clue set #1
        let c1s1 = {};
        let c1s2 = {}
        let c1s3 = {}
        let c1s4 = {}
        let c1s5 = {}
        // Set variables for clue set #2
        let c2s1 = {};
        let c2s2 = {}
        let c2s3 = {}
        let c2s4 = {}
        let c2s5 = {}
        // Set variables for clue set #3
        let c3s1 = {};
        let c3s2 = {}
        let c3s3 = {}
        let c3s4 = {}
        let c3s5 = {}
        // Set variables for clue set #4
        let c4s1 = {};
        let c4s2 = {}
        let c4s3 = {}
        let c4s4 = {}
        let c4s5 = {}
        // Set variables for clue set #5
        let c5s1 = {};
        let c5s2 = {}
        let c5s3 = {}
        let c5s4 = {}
        let c5s5 = {}

        // Series of switch statements to organzie questions/answers/points into individual objects
        let formDataAnswers = document.querySelectorAll('.question-input');
        formDataAnswers.forEach((answer, index) => {
            if (answer.value && answer.dataset.category === 'c1') {
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
            if (answer.value && answer.dataset.category === 'c2') {
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
            if (answer.value && answer.dataset.category === 'c3') {
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
            if (answer.value && answer.dataset.category === 'c4') {
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
            if (answer.value && answer.dataset.category === 'c5') {
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
            if (category.value && category.dataset.category === 'c1') {
                category1.category = category.value;
            } else if (category.value && category.dataset.category === 'c2') {
                category2.category = category.value;
            } else if (category.value && category.dataset.category === 'c3') {
                category3.category = category.value;
            } else if (category.value && category.dataset.category === 'c4') {
                category4.category = category.value;
            } else if (category.value && category.dataset.category === 'c5') {
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

        await createGame({
            variables: {
                gameData: allAnswers,
                topic: topic,
                public: publicGame
            }
        })
        window.location.replace('/my-games')
    }

    const [category1, setCategory1] = useState('')
    function cat1OnChange (e) {
        const { value } = e.target
        setCategory1( value)
    }
    const [category2, setCategory2] = useState('')
    function cat2OnChange (e) {
        const { value } = e.target
        setCategory2( value)
    }
    const [category3, setCategory3] = useState('')
    function cat3OnChange (e) {
        const { value } = e.target
        setCategory3( value)
    }
    const [category4, setCategory4] = useState('')
    function cat4OnChange (e) {
        const { value } = e.target
        setCategory4( value)
    }
    const [category5, setCategory5] = useState('')
    function cat5OnChange (e) {
        const { value } = e.target
        setCategory5( value)
    }
    return (
        <>
            <Header />
            {loggedIn ?
                <form id='create-game-form' onSubmit={handleSubmit}>
                    <div className='flex-box-sb' id='form-el-1'>
                        <input type='text' className='create-game-txt-input' placeholder='Game Title' id='game-topic' name='game-topic' required></input>
                        <div>
                            <input type='checkbox' id='public-game' name='public-game'></input>
                            <label htmlFor='public-game'>Make Public</label>
                        </div>
                    </div>
                    <ul id='question-accordion'>
                        <li id='form-el-2'>
                            <label htmlFor='category-one-radio' className='flex-box-sb category-label'>{`${!category1 ? 'Category One': category1}`}</label>
                            <input type='radio' id='category-one-radio' name='accordion'></input>
                            <section className='question-content'>
                                <input type='text' data-category='c1' value={category1} onChange={cat1OnChange} placeholder='Enter Topic' data-name='category' className='question-input' name='category-name' maxLength='115' />

                                <div className='single-question-div'>
                                    <p className='point-label'>100 Points</p>
                                    <textarea data-category='c1' placeholder='Question' name='q1' className='question-input'></textarea>
                                    <textarea data-category='c1' placeholder='Answer' name='a1' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p htmlFor='c1-q2' className='point-label'>200 Points</p>
                                    <textarea data-category='c1' placeholder='Question' name='q2' className='question-input'></textarea>
                                    <textarea data-category='c1' placeholder='Answer' name='a2' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p htmlFor='c1-q3' className='point-label'>300 Points</p>
                                    <textarea data-category='c1' placeholder='Question' name='q3' className='question-input'></textarea>
                                    <textarea data-category='c1' placeholder='Answer' name='a3' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p htmlFor='c1-q4' className='point-label'>400 Points</p>
                                    <textarea data-category='c1' placeholder='Question' name='q4' className='question-input'></textarea>
                                    <textarea data-category='c1' placeholder='Answer' name='a4' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p htmlFor='c1-q5' className='point-label'>500 Points</p>
                                    <textarea data-category='c1' placeholder='Question' name='q5' className='question-input'></textarea>
                                    <textarea data-category='c1' placeholder='Answer' name='a5' className='question-input'></textarea>
                                </div>
                            </section>
                        </li>

                        {/* Category Two */}
                        <li id='form-el-3'>
                            <label htmlFor='category-two-radio' className='flex-box-sb category-label'>{`${!category2 ? 'Category Two': category2}`}</label>
                            <input type='radio' id='category-two-radio' name='accordion'></input>
                            <section className='question-content'>
                                <input type='text' data-name='category' placeholder='Enter Topic' value={category2} onChange={cat2OnChange} className='question-input' data-category='c2' name='category-name' maxLength='115' />

                                <div className='single-question-div'>
                                    <p className='point-label'>100 Points</p>
                                    <textarea data-category='c2' placeholder='Question' name='q1' className='question-input'></textarea>
                                    <textarea data-category='c2' placeholder='Answer' name='a1' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>200 Points</p>
                                    <textarea data-category='c2' placeholder='Question' name='q2' className='question-input'></textarea>
                                    <textarea data-category='c2' placeholder='Answer' name='a2' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>300 Points</p>
                                    <textarea data-category='c2' placeholder='Question' name='q3' className='question-input'></textarea>
                                    <textarea data-category='c2' placeholder='Answer' name='a3' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>400 Points</p>
                                    <textarea data-category='c2' placeholder='Question' name='q4' className='question-input'></textarea>
                                    <textarea data-category='c2' placeholder='Answer' name='a4' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>500 Points</p>
                                    <textarea data-category='c2' placeholder='Question' name='q5' className='question-input'></textarea>
                                    <textarea data-category='c2' placeholder='Answer' name='a5' className='question-input'></textarea>
                                </div>
                            </section>
                        </li>

                        {/* Category Three */}
                        <li id='form-el-4' >
                            <label htmlFor='category-three-radio' className='flex-box-sb category-label'>{`${!category3 ? 'Category Three': category3}`}</label>
                            <input type='radio' id='category-three-radio' name='accordion'></input>
                            <section className='question-content'>
                                <input type='text' data-category='c3' value={category3} onChange={cat3OnChange} placeholder='Enter Topic' data-name='category' className='question-input' name='category-name' maxLength='115' />

                                <div className='single-question-div'>
                                    <p className='point-label'>100 Points</p>
                                    <textarea data-category='c3' placeholder='Question' name='q1' className='question-input'></textarea>
                                    <textarea data-category='c3' placeholder='Answer' name='a1' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>200 Points</p>
                                    <textarea data-category='c3' placeholder='Question' name='q2' className='question-input'></textarea>
                                    <textarea data-category='c3' placeholder='Answer' name='a2' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>300 Points</p>
                                    <textarea data-category='c3' placeholder='Question' name='q3' className='question-input'></textarea>
                                    <textarea data-category='c3' placeholder='Answer' name='a3' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>400 Points</p>
                                    <textarea data-category='c3' placeholder='Question' name='q4' className='question-input'></textarea>
                                    <textarea data-category='c3' placeholder='Answer' name='a4' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>500 Points</p>
                                    <textarea data-category='c3' placeholder='Question' name='q5' className='question-input'></textarea>
                                    <textarea data-category='c3' placeholder='Answer' name='a5' className='question-input'></textarea>
                                </div>
                            </section>
                        </li>
                        {/* category four */}
                        <li id='form-el-5'>
                            <label htmlFor='category-four-radio' className='flex-box-sb category-label'>{`${!category4 ? 'Category Four': category4}`}</label>
                            <input type='radio' id='category-four-radio' name='accordion'></input>
                            <section className='question-content'>
                                <input type='text' data-category='c4' value={category4} onChange={cat4OnChange} placeholder='Enter Topic' data-name='category' className='question-input' name='category-name' maxLength='115' />

                                <div className='single-question-div'>
                                    <p className='point-label'>100 Points</p>
                                    <textarea data-category='c4' placeholder='Question' name='q1' className='question-input'></textarea>
                                    <textarea data-category='c4' placeholder='Answer' name='a1' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>200 Points</p>
                                    <textarea data-category='c4' placeholder='Question' name='q2' className='question-input'></textarea>
                                    <textarea data-category='c4' placeholder='Answer' name='a2' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>300 Points</p>
                                    <textarea data-category='c4' placeholder='Question' name='q3' className='question-input'></textarea>
                                    <textarea data-category='c4' placeholder='Answer' name='a3' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>400 Points</p>
                                    <textarea data-category='c4' placeholder='Question' name='q4' className='question-input'></textarea>
                                    <textarea data-category='c4' placeholder='Answer' name='a4' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>500 Points</p>
                                    <textarea data-category='c4' placeholder='Question' name='q5' className='question-input'></textarea>
                                    <textarea data-category='c4' placeholder='Answer' name='a5' className='question-input'></textarea>
                                </div>
                            </section>
                        </li>
                        {/* Category Five */}
                        <li id='form-el-6'>
                            <label htmlFor='category-five-radio' className='flex-box-sb category-label'>{`${!category5 ? 'Category Five': category5}`}</label>
                            <input type='radio' id='category-five-radio' name='accordion'></input>
                            <section className='question-content'>
                                <input type='text' data-category='c5' value={category5} onChange={cat5OnChange} placeholder='Enter Topic' data-name='category' className='question-input' name='category-name' maxLength='115' />

                                <div className='single-question-div'>
                                    <p className='point-label'>100 Points</p>
                                    <textarea data-category='c5' placeholder='Question' name='q1' className='question-input'></textarea>
                                    <textarea data-category='c5' placeholder='Answer' name='a1' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>200 Points</p>
                                    <textarea data-category='c5' placeholder='Question' name='q2' className='question-input'></textarea>
                                    <textarea data-category='c5' placeholder='Answer' name='a2' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>300 Points</p>
                                    <textarea data-category='c5' placeholder='Question' name='q3' className='question-input'></textarea>
                                    <textarea data-category='c5' placeholder='Answer' name='a3' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>400 Points</p>
                                    <textarea data-category='c5' placeholder='Question' name='q4' className='question-input'></textarea>
                                    <textarea data-category='c5' placeholder='Answer' name='a4' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <p className='point-label'>500 Points</p>
                                    <textarea data-category='c5' placeholder='Question' name='q5' className='question-input'></textarea>
                                    <textarea data-category='c5' placeholder='Answer' name='a5' className='question-input'></textarea>
                                </div>
                            </section>
                        </li>
                    </ul>
                    <button onClick={() => mouseClickSound()} type='submit' id='create-game-btn'>Create Game</button>
                </form>
                :
                <p>404: You must be signed in to see this page</p>
            }
            {/* <Footer /> */}
        </>
    )
}

export default CreateGame;