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
        if(this.score <= 0) {
            this.score = 0;
        }
    }
}

class GameStart {
    constructor(questions, players ) {
        // create an array of player instances
        this.players = players.map(player => {
            return new Player(player)
        })
        this.questions = questions
        // set player one as the default current player
        this.currentPlayer = this.players[0]
    }
    subtractPlayerPoints(points) {
        this.currentPlayer.subtractPoints(points)
    }
    // Pick random runner up
    pickRunnerUp() {
        const randomPlayerArray = this.players.filter((player) => {
            return player.name !== this.currentPlayer.name 
        });
        return randomPlayerArray[Math.floor(Math.random() * randomPlayerArray.length)]
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
            return 'done';
        }
    }
}
export {GameStart, Player};