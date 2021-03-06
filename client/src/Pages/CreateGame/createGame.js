import './createGame.css';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client'
import { CREATE_GAME } from '../../utils/mutations'

function CreateGame() {
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

        if(category1.clues.length !==0) {
            allAnswers.push(category1)
        }
        if(category2.clues.length !==0) {
            allAnswers.push(category2)
        }
        if(category3.clues.length !==0) {
            allAnswers.push(category3)
        }
        if(category4.clues.length !==0) {
            allAnswers.push(category4)
        }
        if(category5.clues.length !==0) {
            allAnswers.push(category5)
        }

        console.log('answers ', allAnswers)
        // Get game topic
        let topic = document.querySelector('#game-topic').value;
        console.log('topic ', topic)


        const {data} = await createGame({
            variables: {
                gameData: allAnswers,
                topic: topic
            }
        })
        console.log('data', data)
        window.location.replace('/')
    }
    return (
        <>
            {loggedIn ?
                <form id="create-game-form" onSubmit={handleSubmit}>
                    <label htmlFor='game-topic'>Topic</label>
                    <input type='text' id='game-topic' name='game-topic'></input>
                    <ul id='question-accordion'>
                        <li>
                            <label htmlFor='category-one-radio' className='flex-box-sb'>Category One</label>
                            <input type='radio' id='category-one-radio' name='accordion'></input>
                            <section className='question-content'>

                                <label htmlFor='category-one-name'>Category</label>
                                <input type='text' data-category='c1' data-name='category' className='question-input' name='category-name' />

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q1'>$100 Question</label>
                                    <textarea data-category='c1' name='q1' className='question-input'></textarea>
                                    <label htmlFor='c1-a1'>Answer</label>
                                    <textarea data-category='c1' name='a1' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q2'>$200 Question</label>
                                    <textarea data-category='c1' name='q2' className='question-input'></textarea>
                                    <label htmlFor='c1-a2'>Answer</label>
                                    <textarea data-category='c1' name='a2' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q3'>$300 Question</label>
                                    <textarea data-category='c1' name='q3' className='question-input'></textarea>
                                    <label htmlFor='c1-a3'>Answer</label>
                                    <textarea data-category='c1' name='a3' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q4'>$400 Question</label>
                                    <textarea data-category='c1' name='q4' className='question-input'></textarea>
                                    <label htmlFor='c1-a4'>Answer</label>
                                    <textarea data-category='c1' name='a4' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q5'>$500 Question</label>
                                    <textarea data-category='c1' name='q5' className='question-input'></textarea>
                                    <label htmlFor='c1-a5'>Answer</label>
                                    <textarea data-category='c1' name='a5' className='question-input'></textarea>
                                </div>
                            </section>
                        </li>
                        <li>
                            <label htmlFor='category-two-radio' className='flex-box-sb'>Category Two</label>
                            <input type='radio' id='category-two-radio' name='accordion'></input>
                            <section className='question-content'>

                                <label htmlFor='category-two-name'>Category</label>
                                <input type='text' data-name='category' className='question-input' data-category='c2' name='category-name' />

                                <div className='single-question-div'>
                                    <label htmlFor='c2-q1'>$100 Question</label>
                                    <textarea data-category='c2' name='q1' className='question-input'></textarea>
                                    <label htmlFor='c2-a1'>Answer</label>
                                    <textarea data-category='c2' name='a1' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c2-q2'>$200 Question</label>
                                    <textarea data-category='c2' name='q2' className='question-input'></textarea>
                                    <label htmlFor='c2-a2'>Answer</label>
                                    <textarea data-category='c2' name='a2' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c2-q3'>$300 Question</label>
                                    <textarea data-category='c2' name='q3' className='question-input'></textarea>
                                    <label htmlFor='c2-a3'>Answer</label>
                                    <textarea data-category='c2' name='a3' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c4-q4'>$400 Question</label>
                                    <textarea data-category='c2' name='q4' className='question-input'></textarea>
                                    <label htmlFor='c4-a4'>Answer</label>
                                    <textarea data-category='c2' name='a4' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c5-q5'>$500 Question</label>
                                    <textarea data-category='c2' name='q5' className='question-input'></textarea>
                                    <label htmlFor='c5-a5'>Answer</label>
                                    <textarea data-category='c2' name='a5' className='question-input'></textarea>
                                </div>
                            </section>
                        </li>
                        <li>
                            <label htmlFor='category-three-radio' className='flex-box-sb'>Category Three</label>
                            <input type='radio' id='category-three-radio' name='accordion'></input>
                            <section className='question-content'>

                                <label htmlFor='category-three-name'>Category</label>
                                <input type='text' data-category='c3' data-name='category' className='question-input' name='category-name' />

                                <div className='single-question-div'>
                                    <label htmlFor='c3-q1'>$100 Question</label>
                                    <textarea data-category='c3' name='q1' className='question-input'></textarea>
                                    <label htmlFor='c3-a1'>Answer</label>
                                    <textarea data-category='c3' name='a1' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c3-q2'>$200 Question</label>
                                    <textarea data-category='c3' name='q2' className='question-input'></textarea>
                                    <label htmlFor='c3-a2'>Answer</label>
                                    <textarea data-category='c3' name='a2' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c3-q3'>$300 Question</label>
                                    <textarea data-category='c3' name='q3' className='question-input'></textarea>
                                    <label htmlFor='c3-a3'>Answer</label>
                                    <textarea data-category='c3' name='a3' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c3-q4'>$400 Question</label>
                                    <textarea data-category='c3' name='q4' className='question-input'></textarea>
                                    <label htmlFor='c3-a4'>Answer</label>
                                    <textarea data-category='c3' name='a4' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c3-q5'>$500 Question</label>
                                    <textarea data-category='c3' name='q5' className='question-input'></textarea>
                                    <label htmlFor='c3-a5'>Answer</label>
                                    <textarea data-category='c3' name='a5' className='question-input'></textarea>
                                </div>
                            </section>
                        </li>
                        <li>
                            <label htmlFor='category-four-radio' className='flex-box-sb'>Category Four</label>
                            <input type='radio' id='category-four-radio' name='accordion'></input>
                            <section className='question-content'>

                                <label htmlFor='category-four-name'>Category</label>
                                <input type='text' data-category='c4' data-name='category' className='question-input' name='category-name' />

                                <div className='single-question-div'>
                                    <label htmlFor='c4-q1'>$100 Question</label>
                                    <textarea data-category='c4' name='q1' className='question-input'></textarea>
                                    <label htmlFor='c4-a1'>Answer</label>
                                    <textarea data-category='c4' name='a1' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c4-q2'>$200 Question</label>
                                    <textarea data-category='c4' name='q2' className='question-input'></textarea>
                                    <label htmlFor='c4-a2'>Answer</label>
                                    <textarea data-category='c4' name='a2' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c4-q3'>$300 Question</label>
                                    <textarea data-category='c4' name='q3' className='question-input'></textarea>
                                    <label htmlFor='c4-a3'>Answer</label>
                                    <textarea data-category='c4' name='a3' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c4-q4'>$400 Question</label>
                                    <textarea data-category='c4' name='q4' className='question-input'></textarea>
                                    <label htmlFor='c4-a4'>Answer</label>
                                    <textarea data-category='c4' name='a4' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c4-q5'>$500 Question</label>
                                    <textarea data-category='c4' name='q5' className='question-input'></textarea>
                                    <label htmlFor='c4-a5'>Answer</label>
                                    <textarea data-category='c4' name='a5' className='question-input'></textarea>
                                </div>
                            </section>
                        </li>
                        <li>
                            <label htmlFor='category-five-radio' className='flex-box-sb'>Category One</label>
                            <input type='radio' id='category-five-radio' name='accordion'></input>
                            <section className='question-content'>

                                <label htmlFor='category-five-name'>Category</label>
                                <input type='text' data-category='c5' data-name='category' className='question-input' name='category-name' />

                                <div className='single-question-div'>
                                    <label htmlFor='c5-q1'>$100 Question</label>
                                    <textarea data-category='c5' name='q1' className='question-input'></textarea>
                                    <label htmlFor='c5-a1'>Answer</label>
                                    <textarea data-category='c5' name='a1' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c5-q2'>$200 Question</label>
                                    <textarea data-category='c5' name='q2' className='question-input'></textarea>
                                    <label htmlFor='c5-a2'>Answer</label>
                                    <textarea data-category='c5' name='a2' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c5-q3'>$300 Question</label>
                                    <textarea data-category='c5' name='q3' className='question-input'></textarea>
                                    <label htmlFor='c5-a3'>Answer</label>
                                    <textarea data-category='c5' name='a3' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c5-q4'>$400 Question</label>
                                    <textarea data-category='c5' name='q4' className='question-input'></textarea>
                                    <label htmlFor='c5-a4'>Answer</label>
                                    <textarea data-category='c5' name='a4' className='question-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c5-q5'>$500 Question</label>
                                    <textarea data-category='c5' name='q5' className='question-input'></textarea>
                                    <label htmlFor='c5-a5'>Answer</label>
                                    <textarea data-category='c5' name='a5' className='question-input'></textarea>
                                </div>
                            </section>
                        </li>
                    </ul>
                    <button type='submit'>Create Game</button>
                </form>
                :
                <p>404: You must be signed in to see this page</p>
            }
        </>
    )
}

export default CreateGame;