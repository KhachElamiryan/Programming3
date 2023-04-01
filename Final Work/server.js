var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs')

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

function generateMatrix(MatrixLength, gr, grEater, predator, human, killer, terminator) {
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
    for (let i = 0; i < terminator; i++) {
        let x = Math.floor(Math.random() * MatrixLength)
        let y = Math.floor(Math.random() * MatrixLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
        }


    }
    io.emit("send matrix", matrix)
    return matrix

}

matrix = generateMatrix(60, 100, 100, 90, 5, 50, 50)
grassArr = []
grassEaterArr = []
PredatorArr = []
HumanArr = []
KillerArr = []
TerminatorArr = []

const Grass = require("./gr")
const GrassEater = require("./grEater")
const Predator = require("./predator")
const Human = require("./human")
const Killer = require("./killer")
const Terminator = require("./terminator")

function createObj() {
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
            else if (matrix[y][x] == 6) {
                let gr = new Terminator(x, y)
                TerminatorArr.push(gr)
            }

        }
    }
}


createObj()

function gameMove() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    } for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    } for (let i = 0; i < PredatorArr.length; i++) {
        PredatorArr[i].eat()
    } for (let i = 0; i < HumanArr.length; i++) {
        HumanArr[i].eat()
    } for (let i = 0; i < KillerArr.length; i++) {
        KillerArr[i].eat()
    }for (let i = 0; i < TerminatorArr.length; i++) {
        TerminatorArr[i].eat()
    }
    io.emit("send matrix", matrix)
}

function AllDatas(){
    countd = {
        grass:grassArr.length,
        GrassEater:grassEaterArr.length,
        predator:PredatorArr.length,
        human:HumanArr.length,
        killer:KillerArr.length,
        terminator:TerminatorArr.length

    }
    fs.writeFile("state.json",JSON.stringify(countd),function(){
        io.emit("send datas" ,countd)
    })
}
setInterval(AllDatas, 1000)
setInterval(gameMove, 1000)