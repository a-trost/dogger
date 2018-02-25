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
const edgeBorders = {
    0: [600, 700],
    1: [400, 700],
    2: [200, 700],
    3: [0, 700],
    4: [0, 700],
    5: [0, 500],
    6: [0, 300],
    7: [0, 100],
}
const edgeStartingCoordinates = {
    // Named for the row and direction traveling: 2r is row 2 with an enemy traveling right.
    '0r': [600, 0],
    '0l': [700, 50],
    '1r': [400, 0],
    '1l': [700, 150],
    '2r': [200, 0],
    '2l': [700, 250],
    '3r': [0, 0],
    '3l': [700, 350],
    '4r': [0, 100],
    '4l': [700, 450],
    '5r': [0, 200],
    '5l': [500, 450],
    '6r': [0, 300],
    '6l': [300, 450],
    '7r': [0, 400],
    '7l': [100, 450],
}

const levels = {
    1: {
        world: 'House',
        rowTextures: ['finish', 'carpet2', 'carpet1', 'carpet1', 'carpet1', 'carpet1', 'carpet1', 'carpet1'],
        enemies: [
            { character: 'hamster', row: 2, col: 5, speed: 50, direction: 'r', },
            { character: 'cat', row: 3, col: 4, speed: 40, direction: 'r', },
            { character: 'roomba', row: 4, col: 2, speed: 10, direction: 'l', },
            { character: 'roomba', row: 4, col: 6, speed: 10, direction: 'l', },
        ],
        prizes: [
            { character: 'hotdog', row: 3, col: 1, value: 100 },
        ],
        barriers: [
            { character: 'washer', row: 5, col: 5 },
            { character: 'tv', row: 5, col: 6 }
            ],
    },

    2: {
        world: 'House',
        rowTextures: ['finish', 'kitchen', 'kitchen', 'kitchen', 'carpet2', 'carpet2', 'carpet2', 'carpet2'],
        enemies: [
            { character: 'hamster', row: 2, col: 2, speed: 50, direction: 'r', },
            
            { character: 'hamster', row: 2, col: 5, speed: 50, direction: 'r', },
            { character: 'cat', row: 3, col: 4, speed: 40, direction: 'r', },
            { character: 'cat', row: 3, col: 0, speed: 40, direction: 'r', },
            
            { character: 'roomba', row: 4, col: 2, speed: 10, direction: 'l', },
            { character: 'roomba', row: 4, col: 6, speed: 10, direction: 'l', },
        ],
        prizes: [
            { character: 'hotdog', row: 3, col: 1, value: 100 },
        ],
        barriers: [
            { character: 'washer', row: 5, col: 5 },
            { character: 'toaster', row: 1, col: 3 }
            ],
    },








}