var socket = io()

// function generateMatrix(MatrixLength, gr, grEater, predator, human, killer) {
//     let matrix = []
//     for (let i = 0; i < MatrixLength; i++) {
//         matrix.push([])
//         for (let j = 0; j < MatrixLength; j++) {
//             matrix[i].push(0)
//         }
//     }
//     for (let i = 0; i < gr; i++) {
//         let x = Math.floor(Math.random() * MatrixLength)
//         let y = Math.floor(Math.random() * MatrixLength)
//         if (matrix[y][x] == 0) {
//             matrix[y][x] = 1
//         }
//     }
//     for (let i = 0; i < grEater; i++) {
//         let x = Math.floor(Math.random() * MatrixLength)
//         let y = Math.floor(Math.random() * MatrixLength)
//         if (matrix[y][x] == 0) {
//             matrix[y][x] = 2
//         }

//     }
//     for (let i = 0; i < predator; i++) {
//         let x = Math.floor(Math.random() * MatrixLength)
//         let y = Math.floor(Math.random() * MatrixLength)
//         if (matrix[y][x] == 0) {
//             matrix[y][x] = 3
//         }


//     }
//     for (let i = 0; i < human; i++) {
//         let x = Math.floor(Math.random() * MatrixLength)
//         let y = Math.floor(Math.random() * MatrixLength)
//         if (matrix[y][x] == 0) {
//             matrix[y][x] = 4
//         }


//     }
//     for (let i = 0; i < killer; i++) {
//         let x = Math.floor(Math.random() * MatrixLength)
//         let y = Math.floor(Math.random() * MatrixLength)
//         if (matrix[y][x] == 0) {
//             matrix[y][x] = 5
//         }


//     }

//     return matrix

// }






// let matrix = generateMatrix(60, 100, 100, 90, 5, 50)
var side = 10;
// let grassArr = []
// let grassEaterArr = []
// let PredatorArr = []
// let HumanArr = []
// let KillerArr = []


function setup() {
    frameRate(5);
    createCanvas(50 * side, 50 * side);
    background('#acacac');

    // for (var y = 0; y < matrix.length; y++) {
    //     for (var x = 0; x < matrix[y].length; x++) {
    //         if (matrix[y][x] == 1) {
    //             let gr = new Grass(x, y)
    //             grassArr.push(gr)
    //         } else if (matrix[y][x] == 2) {
    //             let gr = new GrassEater(x, y)
    //             grassEaterArr.push(gr)
    //         } else if (matrix[y][x] == 3) {
    //             let gr = new Predator(x, y)
    //             PredatorArr.push(gr)
    //         }
    //         else if (matrix[y][x] == 4) {
    //             let gr = new Human(x, y)
    //             HumanArr.push(gr)
    //         }
    //         else if (matrix[y][x] == 5) {
    //             let gr = new Killer(x, y)
    //             KillerArr.push(gr)
    //         }

    //     }
    // }

}

function changecolor(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }else if (matrix[y][x] == 6) {
                fill("cyan");
            }

            rect(x * side, y * side, side, side);
        }
    }
//     for (let i = 0; i < grassArr.length; i++) {
//         grassArr[i].mul()
//     }

//     for (let i = 0; i < grassEaterArr.length; i++) {
//         grassEaterArr[i].eat()
//     } for (let i = 0; i < PredatorArr.length; i++) {
//         PredatorArr[i].eat()
//     }
//     for (let i = 0; i < HumanArr.length; i++) {
//         HumanArr[i].eat()
//     }
//     for (let i = 0; i < KillerArr.length; i++) {
//         KillerArr[i].eat()
//     }

}

socket.on("send datas" ,function(counts){
    document.getElementById("grass").innerHTML = counts.grass;
    document.getElementById("grasseater").innerHTML = counts.GrassEater;
    document.getElementById("predator").innerHTML = counts.predator;
    document.getElementById("human").innerHTML = counts.human;
    document.getElementById("killer").innerHTML = counts.killer;
    document.getElementById("Terminator").innerHTML = counts.terminator;


})


socket.on("send matrix",changecolor)