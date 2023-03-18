let LivingCreature = require("./LivingCreature")

module.exports = class Human extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 10;
        this.directions = [];

    }

    mul() {
        let emptyCelss = this.chooseCell(0)
        let newCell = random(emptyCelss)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 4
            let newGr = new Human(newX, newY)
            HumanArr.push(newGr)
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
        let emptyCelss = this.chooseCell(0)
        let newCell = random(emptyCelss)
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
        let emptyCelss = this.chooseCell(2)
        let newCell = random(emptyCelss)
        let emptyCelss1 = this.chooseCell(3)
        let newCell1 = random(emptyCelss1)
        let emptyCelss2 = this.chooseCell(1)
        let newCell2 = random(emptyCelss2)
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
            for (var i in PredatorArr) {
                if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
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
        for (var i in HumanArr) {
            if (this.x == HumanArr[i].x && this.y == HumanArr[i].y) {
                HumanArr.splice(i, 1);
                break;
            }
        }
    }
}