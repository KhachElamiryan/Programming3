let LivingCreature = require("./LivingCreature")

module.exports = class Terminator extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 10;
        this.directions = [];

    }
    random(ch, ch1, ch2,ch3,ch4) {
        let found = this.chooseCell(ch);
        let found1 = this.chooseCell(ch1);
        let found2 = this.chooseCell(ch2);
        let found3 = this.chooseCell(ch3);
        let found4 = this.chooseCell(ch4);
        let finalfound = found.concat(found1,found2,found3,found4)
        let result = Math.floor(Math.random() * finalfound.length)

        return finalfound[result];
    }

    mul() {
        // let emptyCelss = this.chooseCell(0)
        let newCell = this.random(0)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 6
            let newGr = new Terminator(newX, newY)
            terminatorArr.push(newGr)
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
        let newCell2 = this.random(4)
        let newCell3 = this.random(1)
        let newCell4 = this.random(5)
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
            for (var i in humanArr) {
                if (newX == humanArr[i].x && newY == humanArr[i].y) {
                    humanArr.splice(i, 1);
                    break;
                }
            }
        } else if (newCell3) {
            this.energy++
            let newX = newCell3[0]
            let newY = newCell3[1]
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
        }else if (newCell4) {
            this.energy++
            let newX = newCell4[0]
            let newY = newCell4[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 25) {
                this.mul()
            }
            for (var i in killerArr) {
                if (newX == killerArr[i].x && newY == killerArr[i].y) {
                    killerArr.splice(i, 1);
                    break;
                }
            }
        }else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in terminatorArr) {
            if (this.x == terminatorArr[i].x && this.y == terminatorArr[i].y) {
                terminatorArr.splice(i, 1);
                break;
            }
        }
    }
}