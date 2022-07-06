import './gameBoard.css'

function GameBoard() {
    const questionLog = [
        {
            category: 'math',
            clues: [
                {
                    question: 'what are you math?',
                    answer: 'coding',
                    points: '100',
                },
                {
                    question: 'what are you math?',
                    answer: 'coding',
                    points: '200',
                },
                {
                    question: 'what are you math?',
                    answer: 'coding',
                    points: '300',
                },
            ]
        },
        {
            category: 'Science',
            clues: [
                {
                    question: 'what are you science?',
                    answer: 'coding',
                    points: '100',
                },
                {
                    question: 'what are you science?',
                    answer: 'coding',
                    points: '200',
                },
                {
                    question: 'what are you science?',
                    answer: 'coding',
                    points: '300',
                },
            ]
        },
        {
            category: 'Social Studies',
            clues: [
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: '100',
                },
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: '200',
                },
                {
                    question: 'what are you ss?',
                    answer: 'coding',
                    points: '300',
                },
            ]
        },
    ]
    return (
        <div className='category-columns'>
            {questionLog.map((question, index) => (
                <div className='column'>
                    <h3>{question.category}</h3>
                    <ul>
                        {question.clues.map((set, index) => (
                            <li><button>{set.question}</button></li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default GameBoard;