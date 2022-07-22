class Player {
    constructor(name) {
        this.name = name
        this.score = 0
    }
    addPoints(points) {  
        this.score += points
    }
    subtractPoints(points) {
        this.score -= points
    }
}

class GameStart {
    constructor(questions, players ) {
        this.players = players.map(player => {
            return new Player(player)
        })
        this.questions = questions
        this.currentPlayer = this.players[0]
    }
    subtractPlayerPoints(points) {
        this.currentPlayer.subtractPoints(points)
    }
    // switch players
    switchPlayer() {
        if(this.players.indexOf(this.currentPlayer) + 1 === this.players.length){
            this.currentPlayer = this.players[0];
        } else {
            this.currentPlayer = this.players[this.players.indexOf(this.currentPlayer) + 1]
        }
    }
    // decrease questions
    decreaseQuestions() {
        this.questions -= 1;
    }
    // end game
    endGame() {
        if (this.questions === 0) {
            alert('game ended')
        }
    }
}
export {GameStart, Player};