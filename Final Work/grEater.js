let LivingCreature = require("./LivingCreature")

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 10;
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
        let newCell = this.random(0)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 2
            let newGr = new GrassEater(newX, newY)
            grassEaterArr.push(newGr)
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
        // let emptyCelss = this.chooseCell(1)
        let newCell = this.random(1)
        if (newCell) {
            this.energy++
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 15) {
                this.mul()
            }
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}