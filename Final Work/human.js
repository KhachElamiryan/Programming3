let LivingCreature = require("./LivingCreature")

module.exports = class Human extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 10;
        this.directions = [];

    }
    random(ch, ch1, ch2) {
        let found = this.chooseCell(ch);
        let found1 = this.chooseCell(ch1);
        let found2 = this.chooseCell(ch2)
        let finalfound = found.concat(found1,found2)
        let result = Math.floor(Math.random() * finalfound.length)

        return finalfound[result];
    }

    mul() {
        // let emptyCelss = this.chooseCell(0)
        let newCell = this.random(0)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 4
            let newGr = new Human(newX, newY)
            humanArr.push(newGr)
            this.energy = 10
        }
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
        let newCell = this.random(2)
        let newCell1 = this.random(3)
        let newCell2 = this.random(1)
        if (newCell) {
            this.energy++
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 25) {
                this.mul()
            }
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

        } else if (newCell1) {
            this.energy++
            let newX = newCell1[0]
            let newY = newCell1[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 25) {
                this.mul()
            }
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (newCell2) {
            this.energy++
            let newX = newCell2[0]
            let newY = newCell2[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 25) {
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
        for (var i in humanArr) {
            if (this.x == humanArr[i].x && this.y == humanArr[i].y) {
                humanArr.splice(i, 1);
                break;
            }
        }
    }
}