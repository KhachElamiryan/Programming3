var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

function generateMatrix(MatrixLength, gr, grEater, predator, human, killer) {
    let matrix = []
    for (let i = 0; i < MatrixLength; i++) {
        matrix.push([])
        for (let j = 0; j < MatrixLength; j++) {
            matrix[i].push(0)
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * MatrixLength)
        let y = Math.floor(Math.random() * MatrixLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEater; i++) {
        let x = Math.floor(Math.random() * MatrixLength)
        let y = Math.floor(Math.random() * MatrixLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }

    }
    for (let i = 0; i < predator; i++) {
        let x = Math.floor(Math.random() * MatrixLength)
        let y = Math.floor(Math.random() * MatrixLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }


    }
    for (let i = 0; i < human; i++) {
        let x = Math.floor(Math.random() * MatrixLength)
        let y = Math.floor(Math.random() * MatrixLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }


    }
    for (let i = 0; i < killer; i++) {
        let x = Math.floor(Math.random() * MatrixLength)
        let y = Math.floor(Math.random() * MatrixLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }


    }

    return matrix

}

matrix = generateMatrix(60, 100, 100, 90, 5, 50)
grassArr = []
grassEaterArr = []
PredatorArr = []
HumanArr = []
KillerArr = []

const Grass = require("./gr")
const GrassEater = require("./grEater")
const Predator = require("./predator")
const Human = require("./human")
const Killer = require("./killer")

function createObj(){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                PredatorArr.push(gr)
            }
            else if (matrix[y][x] == 4) {
                let gr = new Human(x, y)
                HumanArr.push(gr)
            }
            else if (matrix[y][x] == 5) {
                let gr = new Killer(x, y)
                KillerArr.push(gr)
            }

        }
    }
}


createObj()

function gameMove(){
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }

    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    } for (let i = 0; i < PredatorArr.length; i++) {
        PredatorArr[i].eat()
    }
    for (let i = 0; i < HumanArr.length; i++) {
        HumanArr[i].eat()
    }
    for (let i = 0; i < KillerArr.length; i++) {
        KillerArr[i].eat()
    }

}

setInterval(gameMove, 500)