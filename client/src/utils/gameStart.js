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
            let winner = [];
            let highscore = null;
            this.players.forEach(player => {
                console.log('in class', player.name)
                if (!highscore) {
                    highscore = parseInt(player.score);
                    winner.push(player.name)
                    return;
                } else if (player.score >= highscore) {
                    highscore = parseInt(player.score);
                    winner.push(player.name) 
                    return;
                }
            })
            return {winner, highscore};
        }
    }
}
export {GameStart, Player};