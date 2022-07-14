import './createGame.css';
import Auth from '../../utils/auth';

function CreateGame() {
    // used to check if the user is logged in
    const loggedIn = Auth.loggedIn()

    // Create the Game
    function handleSubmit(e) {
        e.preventDefault();
        // loop through answers and make a 5 x 5 Array
        let allAnswers = [];
        let answer1 = [];
        let answer2 = [];
        // let answer3 = [];
        // let answer4 = [];
        // let answer5 = [];
        let formDataAnswers = document.querySelectorAll('.answer-input');
        formDataAnswers.forEach(answer => {
            if(answer.value && answer.dataset.category === 'c1') {
                answer1.push(answer.value)
            } else if (answer.value && answer.dataset.category === 'c2') {
                answer2.push(answer.value)
            }
        })

        allAnswers.push(answer1, answer2)
        console.log('answers ', allAnswers)

        // loop through questions and make a 5 x 5 Array
        let allQuestions = [];
        let question1 = [];
        let question2 = [];
        // let question3 = [];
        // let question4 = [];
        // let question5 = [];
        let formDataQuestions = document.querySelectorAll('.question-input');
        formDataQuestions.forEach(question => {
            if(question.value && question.dataset.category === 'c1') {
                question1.push(question.value)
            } else if (question.value && question.dataset.category === 'c2') {
                question2.push(question.value)
            }
        })
        allQuestions.push(question1, question2)
        console.log('questions ', allQuestions)

        // Get categories and place in array
        let allCategories = [];
        let categoryData = document.querySelectorAll('input[data-name="category"]')
        Array.from(categoryData).forEach(category => {
            if(category.value) {
                allCategories.push(category.value)
            }
        })
        console.log('categories ', allCategories)

        // Get game topic
        let topic = document.querySelector('#game-topic').value;
        console.log('topic ', topic)
        
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
                                <input type='text' data-name='category' name='category-one-name' />

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q1'>$100 Question</label>
                                    <textarea data-category='c1' name='c1-q1' className='question-input'></textarea>
                                    <label htmlFor='c1-a1'>Answer</label>
                                    <textarea data-category='c1' name='c1-a1' className='answer-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q2'>$200 Question</label>
                                    <textarea data-category='c1' name='c1-q2' className='question-input'></textarea>
                                    <label htmlFor='c1-a2'>Answer</label>
                                    <textarea data-category='c1' name='c1-a2' className='answer-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q3'>$300 Question</label>
                                    <textarea data-category='c1' name='c1-q3' className='question-input'></textarea>
                                    <label htmlFor='c1-a3'>Answer</label>
                                    <textarea data-category='c1' name='c1-a3' className='answer-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q4'>$400 Question</label>
                                    <textarea data-category='c1' name='c1-q4' className='question-input'></textarea>
                                    <label htmlFor='c1-a4'>Answer</label>
                                    <textarea data-category='c1' name='c1-a4' className='answer-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c1-q5'>$500 Question</label>
                                    <textarea data-category='c1' name='c1-q5' className='question-input'></textarea>
                                    <label htmlFor='c1-a5'>Answer</label>
                                    <textarea data-category='c1' name='c1-a5' className='answer-input'></textarea>
                                </div>
                            </section>
                        </li>
                        <li>
                            <label htmlFor='category-two-radio' className='flex-box-sb'>Category Two</label>
                            <input type='radio' id='category-two-radio' name='accordion'></input>
                            <section className='question-content'>

                                <label htmlFor='category-two-name'>Category</label>
                                <input type='text' data-name='category' name='category-two-name' />

                                <div className='single-question-div'>
                                    <label htmlFor='c2-q1'>$100 Question</label>
                                    <textarea data-category='c2' name='c2-q1'  className='question-input'></textarea>
                                    <label htmlFor='c2-a1'>Answer</label>
                                    <textarea data-category='c2' name='c2-a1' className='answer-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c2-q2'>$200 Question</label>
                                    <textarea data-category='c2' name='c2-q2'  className='question-input'></textarea>
                                    <label htmlFor='c2-a2'>Answer</label>
                                    <textarea data-category='c2' name='c2-a2' className='answer-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c2-q3'>$300 Question</label>
                                    <textarea data-category='c2' name='c2-q3'  className='question-input'></textarea>
                                    <label htmlFor='c2-a3'>Answer</label>
                                    <textarea data-category='c2' name='c2-a3' className='answer-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c4-q4'>$400 Question</label>
                                    <textarea data-category='c2' name='c4-q4'  className='question-input'></textarea>
                                    <label htmlFor='c4-a4'>Answer</label>
                                    <textarea data-category='c2' name='c4-a4' className='answer-input'></textarea>
                                </div>

                                <div className='single-question-div'>
                                    <label htmlFor='c5-q5'>$500 Question</label>
                                    <textarea data-category='c2' name='c5-q5'  className='question-input'></textarea>
                                    <label htmlFor='c5-a5'>Answer</label>
                                    <textarea data-category='c2' name='c5-a5' className='answer-input'></textarea>
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