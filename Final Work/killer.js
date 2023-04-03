let LivingCreature = require("./LivingCreature")

module.exports = class Killer extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 20;
        this.directions = [];

    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(char) {
        this.getNewCoordinates()
        return super.chooseCell(char)
    }
    random(ch){
        let found = this.chooseCell(ch);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
        }

    mul() {
        // let emptyCelss = this.chooseCell(0)
        let newCell = this.random(0)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 5
            let newGr = new Killer(newX, newY)
            killerArr.push(newGr)
            this.energy = 10
        }
    }

    move() {
        this.energy--
        // let emptyCelss = this.chooseCell(0)
        let newCell = this.random(0)
        if (newCell && this.energy >= 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }

    eat() {
        // let emptyCelss = this.chooseCell(4)
        let newCell = this.random(4)
        if (newCell) {
            this.energy++
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 5) {
                this.mul()
            }
            for (var i in humanArr) {
                if (newX == humanArr[i].x && newY == humanArr[i].y) {
                    humanArr.splice(i, 1);
                    break;
                }
            }

        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in killerArr) {
            if (this.x == killerArr[i].x && this.y == killerArr[i].y) {
                killerArr.splice(i, 1);
                break;
            }
        }
    }

}