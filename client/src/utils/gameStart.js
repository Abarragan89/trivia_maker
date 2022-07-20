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
    constructor(players) {
        this.players = [players]
    }
    displayScores () {

    }
    // switch turns
    // end game
}

export {GameStart, Player};