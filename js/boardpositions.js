const squarePositions = [ //x,y,pos
    [ //backmost row
        [false, false], [false, false], [false, false], [600, 0], [700, 50], [false, false], [false, false], [false, false], [false, false],
    ],
    [ //second back row
        [false, false], [false, false], [400, 0], [500, 50], [600, 100], [700, 150], [false, false], [false, false], [false, false],
    ],
    [ //third back row
        [false, false], [200, 0], [300, 50], [400, 100], [500, 150], [600, 200], [700, 250], [false, false], [false, false],
    ],
    [ //fourth back row
        [0, 0], [100, 50], [200, 100], [300, 150], [400, 200], [500, 250], [600, 300], [700, 350], [false, false],
    ],
    [ //fifth back row
        [false, false], [0, 100], [100, 150], [200, 200], [300, 250], [400, 300], [500, 350], [600, 400], [700, 450],
    ],
    [ //sixth back row
        [false, false], [false, false], [0, 200], [100, 250], [200, 300], [300, 350], [400, 400], [500, 450], [false, false],
    ],
    [ //seventh back row
        [false, false], [false, false], [false, false], [0, 300], [100, 350], [200, 400], [300, 450], [false, false], [false, false],
    ],
    [ //front row
        [false, false], [false, false], [false, false], [false, false], [0, 400], [100, 450], [false, false], [false, false], [false, false],
    ],
]

const levels = {
    1: {
        rowTextures: ['finish', 'grass', 'grass', 'slate', 'slate', 'grass', 'grass', 'grass'],
        enemies: [
            { character: 'sloth', row: 2, col: 1, speed: 5, direction: 'r', },
            { character: 'sloth', row: 2, col: 4, speed: 5, direction: 'r', },
            { character: 'ram', row: 3, col: 0, speed: 20, direction: 'r', },
            { character: 'ram', row: 3, col: 2, speed: 20, direction: 'r', },
            { character: 'ram', row: 3, col: 4, speed: 20, direction: 'r', },
            { character: 'fox', row: 4, col: 2, speed: 10, direction: 'l', },
            { character: 'fox', row: 4, col: 6, speed: 10, direction: 'l', },
        ],
        prizes: [
            {character: 'hotdog', row: 3, col: 1, value=100 }
        ],
        barriers: [
            {character: 'rock', row:5, col:6}
        ],
    },
    2: {
        rowTextures: ['finish', 'grass', 'grass', 'slate', 'slate', 'grass', 'grass', 'grass'],
        enemies: [
            { character: 'sloth', row: 2, col: 1, speed: 5, direction: 'r', },
            { character: 'sloth', row: 2, col: 4, speed: 5, direction: 'r', },
            { character: 'ram', row: 3, col: 0, speed: 20, direction: 'r', },
            { character: 'ram', row: 3, col: 2, speed: 20, direction: 'r', },
            { character: 'ram', row: 3, col: 4, speed: 20, direction: 'r', },
            { character: 'fox', row: 4, col: 2, speed: 10, direction: 'l', },
            { character: 'fox', row: 4, col: 6, speed: 10, direction: 'l', },
        ],
        prizes: [
            {character: 'hotdog', row: 3, col: 1, value=100 }
        ],
        barriers: [
            {character: 'rock', row:5, col:6}
        ],
    },
}