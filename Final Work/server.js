var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs'); 

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('home.html');
});
app.get('/home', function (req, res) {
    res.redirect('/home.html');
});


server.listen(3000);

function matrixGenerator(matrixSize, grass, grassEater, predator, human, killer, terminator) {
    var matrix = []

    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0)

        }
    }


    for (let i = 0; i < grass; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 1

    }

    for (let i = 0; i < grassEater; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 2

    }



    for (let i = 0; i < predator; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 3


    }


    for (let i = 0; i < human; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 4


    }
    for (let i = 0; i < killer; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 5


    }
    for (let i = 0; i < terminator; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 6


    }

    io.emit("sendmatrix",matrix)

    return matrix
}

matrix = matrixGenerator(30, 40, 15, 8, 10, 10, 10)

grassArr = []
grassEaterArr = []
predatorArr = []
humanArr = []
killerArr = []
terminatorArr = []

const Grass = require("./gr")
const GrassEater = require("./grEater")
const Predator = require("./predator")
const Human = require("./human")
const Killer = require("./killer")
const Terminator = require("./terminator")

function createObj() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {


            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)

            }
            else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)

            }
            else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y)
                predatorArr.push(pred)
            }
            else if (matrix[y][x] == 4) {
                var human = new Human(x, y)
                humanArr.push(human)

            }
            else if (matrix[y][x] == 5) {
                var killer = new Killer(x, y)
                killerArr.push(killer)
            }
            else if (matrix[y][x] == 6) {
                var terminator = new Terminator(x, y)
                terminatorArr.push(terminator)
            }

        }
    }
    io.emit("sendmatrix", matrix)

}

createObj()

function gameMove() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }

    for (let i in predatorArr) {
        predatorArr[i].eat()
    }

    for (let i in humanArr) {
        humanArr[i].eat()
    }

    for (let i in killerArr) {
        killerArr[i].eat()
    }

    for (let i in terminatorArr) {
        terminatorArr[i].eat()
    }

    io.emit("sendmatrix", matrix)
}

let i = setInterval(gameMove, 300)

var weather;



function Summer() {
    clearInterval(i)
    setInterval(gameMove, 500)
    weather = "summer";
    io.sockets.emit('Summer', weather);
}



function Winter() {
    clearInterval(i)
    setInterval(gameMove, 1000)
    weather = "winter";
    io.sockets.emit('Winter', weather);
}

function alldatas() {
    countd = {
        grass: grassArr.length,
        grassEater: grassEaterArr.length,
        predator: predatorArr.length,
        human: humanArr.length,
        killer: killerArr.length,
        terminator: terminatorArr.length

    }
    fs.writeFile("state.json", JSON.stringify(countd), function () {
        io.emit("send datas", countd)
    })

}

function addChar(n) {


    let x = Math.floor(Math.random() * 30)
    let y = Math.floor(Math.random() * 30)
    matrix[y][x] = n
    if (n == 1) {
        var gr = new Grass(x, y)
        grassArr.push(gr)
    }
    else if (n == 2) {
        var grEat = new GrassEater(x, y)
        grassEaterArr.push(grEat)
    }
    else if (n == 3) {
        var pred = new Predator(x, y)
        predatorArr.push(pred)
    }else if (n == 4) {
        var jur = new Human(x, y)
        humanArr.push(jur)
       
    }else if (n == 5) {
        var killer = new Killer(x, y)
        killerArr.push(killer)
    }
    else if (n == 6) {
        var terminator = new Terminator(x, y)
        terminatorArr.push(terminator)
    }
    
}
io.on('connection', function (socket) {

        socket.on("send button", addChar);
    })
    
setInterval(alldatas, 300);