const squarePositions = [ //x,y position for each rendered square. 'false' squares put in just to help with level design
    [ //backmost row
        [false, false], [false, false], [500, -50], [600, 0], [700, 50], [800, 100], [false, false], [false, false], [false, false],
    ],
    [ //second back row
        [false, false], [300, -50], [400, 0], [500, 50], [600, 100], [700, 150], [800, 200], [false, false], [false, false],
    ],
    [ //third back row
        [100, -50], [200, 0], [300, 50], [400, 100], [500, 150], [600, 200], [700, 250], [800, 300], [false, false],
    ],
    [ //fourth back row
        [0, 0], [100, 50], [200, 100], [300, 150], [400, 200], [500, 250], [600, 300], [700, 350], [800, 400],
    ],
    [ //fifth back row
        [false, false], [0, 100], [100, 150], [200, 200], [300, 250], [400, 300], [500, 350], [600, 400], [700, 450], [800, 500],
    ],
    [ //sixth back row
        [false, false], [false, false], [0, 200], [100, 250], [200, 300], [300, 350], [400, 400], [500, 450], [600, 500],
    ],
    [ //seventh back row
        [false, false], [false, false], [false, false], [0, 300], [100, 350], [200, 400], [300, 450], [400, 500], [false, false],
    ],
    [ //front row
        [false, false], [false, false], [false, false], [false, false], [0, 400], [100, 450], [200, 500], [false, false], [false, false],
    ],
]

const edgeBorders = { // x,y coordinates of the edge borders used for detecting the edge of the board
    0: [600, 800],
    1: [300, 800],
    2: [100, 800],
    3: [0, 800],
    4: [0, 800],
    5: [0, 600],
    6: [0, 400],
    7: [0, 200],
}

const edgeStartingCoordinates = { // Used to 'teleport' enemies to other side of the screen once they reach the edge.
    // Named for the row and direction traveling: 2r is row 2 with an enemy traveling right.
    '0r': [500, -50],
    '0l': [800, 100],
    '1r': [300, -50],
    '1l': [800, 200],
    '2r': [100, -50],
    '2l': [800, 300],
    '3r': [0, 0],
    '3l': [800, 400],
    '4r': [0, 100],
    '4l': [800, 500],
    '5r': [0, 200],
    '5l': [600, 500],
    '6r': [0, 300],
    '6l': [400, 500],
    '7r': [0, 400],
    '7l': [200, 500],
}

const levels = { // Contains the information for all the levels
    1: {
        world: 'House',
        rowTextures: ['finish', 'carpet1', 'carpet1', 'carpet1', 'carpet1', 'carpet1', 'carpet1', 'carpet1'],
        enemies: [
            { character: 'hamster', row: 2, col: 2, speed: 50, direction: 'r', },
            { character: 'hamster', row: 2, col: 5, speed: 50, direction: 'r', },
            { character: 'cat', row: 3, col: 4, speed: 40, direction: 'r', },
            { character: 'roomba', row: 4, col: 2, speed: 10, direction: 'l', },
            { character: 'tricycle', row: 5, col: 3, speed: 60, direction: 'r', },
            { character: 'tricycle', row: 5, col: 7, speed: 60, direction: 'l', },
            
        ],
        prizes: [
            // { character: 'hotdog', row: 3, col: 1, value: 100 },
        ],
        barriers: [
        ],
    },

    2: {
        world: 'House',
        rowTextures: ['finish', 'carpet2', 'carpet2', 'carpet2', 'carpet2', 'carpet2', 'carpet2', 'carpet2'],
        enemies: [
            { character: 'hamster', row: 2, col: 2, speed: 50, direction: 'l', },
            { character: 'cat', row: 3, col: 4, speed: 60, direction: 'r', },
            { character: 'roomba', row: 4, col: 2, speed: 20, direction: 'l', },
            { character: 'roomba', row: 4, col: 6, speed: 20, direction: 'l', },
        ],
        prizes: [
            { character: 'hotdog1', row: 3, col: 1, value: 100 },
        ],
        barriers: [
            { character: 'chair', row: 5, col: 3 },
            { character: 'chair', row: 5, col: 7 },

        ],
    },

    3: {
        world: 'House',
        rowTextures: ['finish', 'carpet3', 'carpet3', 'carpet3', 'carpet3', 'carpet3', 'carpet3', 'carpet3'],
        enemies: [
            { character: 'cat', row: 2, col: 3, speed: 50, direction: 'l', },
            { character: 'hamster', row: 2, col: 2, speed: 50, direction: 'l', },
            { character: 'cat', row: 3, col: 4, speed: 50, direction: 'r', },
            { character: 'hamster', row: 3, col: 5, speed: 50, direction: 'r', },
            { character: 'roomba', row: 4, col: 2, speed: 10, direction: 'l', },
            { character: 'roomba', row: 4, col: 6, speed: 10, direction: 'l', },
            { character: 'tricycle', row: 5, col: 3, speed: 40, direction: 'r', },
            
        ],
        prizes: [
            { character: 'hotdog1', row: 4, col: 3, value: 100 },
        ],
        barriers: [
            { character: 'tv', row: 6, col: 5 },

        ],
    },
    4: {
        world: 'House',
        rowTextures: ['finish', 'wood', 'wood', 'wood', 'wood', 'wood', 'wood', 'wood'],
        enemies: [
            { character: 'tricycle', row: 2, col: 1, speed: 40, direction: 'l', },
            { character: 'tricycle', row: 2, col: 3, speed: 40, direction: 'l', },
            { character: 'tricycle', row: 2, col: 5, speed: 40, direction: 'l', },
            { character: 'tricycle', row: 3, col: 2, speed: 40, direction: 'r', },
            { character: 'tricycle', row: 3, col: 4, speed: 40, direction: 'r', },
            { character: 'tricycle', row: 3, col: 6, speed: 40, direction: 'r', },
            { character: 'tricycle', row: 4, col: 3, speed: 40, direction: 'r', },
            { character: 'tricycle', row: 4, col: 5, speed: 40, direction: 'r', },
            { character: 'tricycle', row: 4, col: 7, speed: 40, direction: 'r', },
            
        ],
        prizes: [
            { character: 'hotdog1', row: 4, col: 3, value: 100 },
            { character: 'hotdog1', row: 4, col: 7, value: 100 },
            
        ],
        barriers: [
            { character: 'chair', row: 5, col: 3 },
            { character: 'chair', row: 5, col: 4 },

            { character: 'chair', row: 5, col: 6 },
            { character: 'chair', row: 5, col: 7 },

        ],
    },
    5: {
        world: 'House',
        rowTextures: ['finish', 'grass', 'kitchen', 'kitchen', 'kitchen', 'kitchen', 'kitchen', 'kitchen'],
        enemies: [
            { character: 'tricycle', row: 1, col: 4, speed: 60, direction: 'l', },

            { character: 'cat', row: 3, col: 4, speed: 40, direction: 'r', },
            { character: 'cat', row: 3, col: 0, speed: 40, direction: 'r', },
            { character: 'roomba', row: 4, col: 2, speed: 10, direction: 'l', },
            { character: 'roomba', row: 4, col: 6, speed: 10, direction: 'l', },
            { character: 'hamster', row: 5, col: 2, speed: 60, direction: 'r', },
            { character: 'hamster', row: 5, col: 5, speed: 60, direction: 'r', },
        ],
        prizes: [
            { character: 'hotdog2', row: 5, col: 3, value: 100 },
            { character: 'hotdog1', row: 1, col: 5, value: 100 },
            
        ],
        barriers: [
            { character: 'fridge', row: 2, col: 5 },
            { character: 'chair', row: 2, col: 4 },
            { character: 'chair', row: 2, col: 3 },

        ],
    },

    6: {
        world: 'Forest',
        rowTextures: ['finish', 'darkgrass', 'darkgrass', 'darkgrass', 'darkgrass', 'darkgrass', 'darkgrass', 'darkgrass'],
        enemies: [
            { character: 'fox', row: 2, col: 2, speed: 50, direction: 'r', },
            { character: 'fox', row: 2, col: 5, speed: 50, direction: 'r', },
            { character: 'ram', row: 3, col: 4, speed: 40, direction: 'r', },
            { character: 'deer', row: 3, col: 0, speed: 40, direction: 'r', },
            { character: 'sloth', row: 4, col: 2, speed: 10, direction: 'l', },
            { character: 'sloth', row: 4, col: 6, speed: 10, direction: 'l', },
        ],
        prizes: [
            { character: 'hotdog2', row: 4, col: 3, value: 100 },
        ],
        barriers: [
            { character: 'rock1', row: 1, col: 2 },            
            { character: 'rock2', row: 1, col: 3 }, 
            { character: 'rock2', row: 1, col: 6 },                                   
            { character: 'appletree1', row: 6, col: 3 },            
            { character: 'appletree1', row: 6, col: 7 },            
            { character: 'appletree1', row: 6, col: 4 },  
            { character: 'appletree1', row: 6, col: 6 },            
            { character: 'appletree2', row: 7, col: 4 },
            { character: 'appletree2', row: 7, col: 6 },
            
        ],
    },


    7: { // Border of trees around outside
        world: 'Forest',
        rowTextures: ['finish', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        enemies: [
            { character: 'sloth', row: 1, col: 2, speed: 10, direction: 'r', },
            
            { character: 'fox', row: 2, col: 2, speed: 90, direction: 'l', },
            { character: 'fox', row: 2, col: 3, speed: 90, direction: 'l', },
            { character: 'fox', row: 2, col: 4, speed: 90, direction: 'l', },
            
            { character: 'ram', row: 3, col: 4, speed: 50, direction: 'r', },
            { character: 'deer', row: 3, col: 0, speed: 50, direction: 'r', },
            { character: 'ferret', row: 4, col: 2, speed: 20, direction: 'l', },
            { character: 'ferret', row: 4, col: 6, speed: 20, direction: 'l', },
        ],
        prizes: [
            { character: 'hotdog1', row: 3, col: 2, value: 100 },
            { character: 'hotdog2', row: 4, col: 7, value: 100 },
            
        ],
        barriers: [
            // Right Side Border
            { character: 'pinetree2', row: 7, col: 6 },
            { character: 'pinetree1', row: 6, col: 7 },
            { character: 'pinetree2', row: 5, col: 8 },
            { character: 'pinetree1', row: 4, col: 8 },
            { character: 'pinetree1', row: 4, col: 9 },
            { character: 'pinetree2', row: 3, col: 8 },
            { character: 'pinetree1', row: 2, col: 7 },
            { character: 'pinetree2', row: 1, col: 6 },
            { character: 'pinetree1', row: 0, col: 5 },
            // Left Side Border
            { character: 'pinetree1', row: 7, col: 4 },
            { character: 'pinetree2', row: 6, col: 3 },
            { character: 'pinetree1', row: 5, col: 2 },
            { character: 'pinetree2', row: 4, col: 1 },
            { character: 'pinetree1', row: 3, col: 0 },
            { character: 'pinetree2', row: 2, col: 0 },
            { character: 'pinetree1', row: 1, col: 1 },
            { character: 'pinetree2', row: 0, col: 2 },
            
        ],
    },

    8: { // Rocky paths
        world: 'Forest',
        rowTextures: ['finish', 'darkgrass', 'darkgrass', 'darkgrass', 'darkgrass', 'darkgrass', 'darkgrass', 'darkgrass'],
        enemies: [
            { character: 'fox', row: 1, col: 2, speed: 100, direction: 'r', },
            { character: 'fox', row: 1, col: 3, speed: 100, direction: 'r', },
            
            { character: 'ram', row: 3, col: 2, speed: 90, direction: 'l', },
            { character: 'ram', row: 3, col: 4, speed: 90, direction: 'l', },
            { character: 'ram', row: 3, col: 6, speed: 90, direction: 'l', },
            

            { character: 'ferret', row: 5, col: 2, speed: 80, direction: 'r', },
            { character: 'ferret', row: 5, col: 6, speed: 80, direction: 'r', },
        ],
        prizes: [
            { character: 'hotdog1', row: 3, col: 0, value: 100 },
            { character: 'hotdog2', row: 1, col: 6, value: 100 },
            
        ],
        barriers: [
            { character: 'rock3', row: 0, col: 2 },
            { character: 'rock4', row: 0, col: 3 },
            
            { character: 'rock4', row: 2, col: 0 },
            
            { character: 'rock3', row: 2, col: 2 },
            { character: 'rock4', row: 2, col: 3 },
            { character: 'rock3', row: 2, col: 4 },
            { character: 'rock4', row: 2, col: 5 },
            { character: 'rock3', row: 2, col: 6 },
            { character: 'rock4', row: 2, col: 7 },

            { character: 'rock3', row: 4, col: 1 },
            { character: 'rock4', row: 4, col: 2 },
            { character: 'rock3', row: 4, col: 3 },
            { character: 'rock4', row: 4, col: 4 },
            { character: 'rock3', row: 4, col: 5 },
            { character: 'rock4', row: 4, col: 6 },
            { character: 'rock3', row: 4, col: 7 },

            { character: 'rock2', row: 6, col: 3},
            { character: 'rock1', row: 6, col: 5 },
            { character: 'rock2', row: 6, col: 6 },
            { character: 'rock1', row: 6, col: 7 },

            
        ],
    },


    9: { // Reindeer Herd
        world: 'Forest',
        rowTextures: ['finish', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        enemies: [
            { character: 'deer', row: 3, col: 6, speed: 100, direction: 'r', },
            { character: 'deer', row: 4, col: 6, speed: 100, direction: 'r', },
            { character: 'deer', row: 2, col: 5, speed: 100, direction: 'r', },
            { character: 'deer', row: 5, col: 5, speed: 100, direction: 'r', },
            { character: 'deer', row: 6, col: 4, speed: 100, direction: 'r', },
            { character: 'deer', row: 1, col: 4, speed: 100, direction: 'r', },

        ],
        prizes: [
            { character: 'hotdog1', row: 2, col: 2, value: 100 },
            { character: 'hotdog2', row: 4, col: 2, value: 100 },
            
        ],
        barriers: [
            { character: 'pinetree2', row: 5, col: 8 },
            { character: 'pinetree1', row: 1, col: 6 },
            { character: 'pinetree2', row: 4, col: 1 },

            
        ],
    },


    10: { // Grid of apple trees
        world: 'Forest',
        rowTextures: ['finish', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
        enemies: [
            { character: 'sloth', row: 1, col: 2, speed: 10, direction: 'r', },
            { character: 'sloth', row: 1, col: 4, speed: 10, direction: 'r', },
            { character: 'ram', row: 3, col: 4, speed: 100, direction: 'l', },
            { character: 'ram', row: 3, col: 6, speed: 100, direction: 'l', },
            { character: 'ram', row: 3, col: 8, speed: 100, direction: 'l', },
            { character: 'fox', row: 5, col: 4, speed: 90, direction: 'r', },
            { character: 'fox', row: 5, col: 6, speed: 90, direction: 'l', },
        ],
        prizes: [
            { character: 'hotdog1', row: 2, col: 0, value: 100 },
            { character: 'hotdog2', row: 5, col: 2, value: 100 },
        ],
        barriers: [
            { character: 'pinetree2', row: 2, col:  1},
            { character: 'pinetree1', row: 2, col: 3 },
            { character: 'pinetree2', row: 2, col: 5 },
            { character: 'pinetree1', row: 2, col: 7 },
            { character: 'pinetree1', row: 4, col: 2 },
            { character: 'pinetree2', row: 4, col: 4 },
            { character: 'pinetree1', row: 4, col: 6 },
            { character: 'pinetree2', row: 4, col: 8 },
            { character: 'pinetree1', row: 6, col: 3 },
            { character: 'pinetree2', row: 6, col: 5 },
            { character: 'pinetree1', row: 6, col: 7 },
            { character: 'rock2', row: 4, col: 9 },
        ],
    },

    11: {
        world: 'City',
        rowTextures: ['finish', 'sidewalk-r', 'road-l', 'road-r', 'road-l', 'road-r', 'sidewalk-l', 'sidewalk-l'],
        enemies: [
            { character: 'carw', row: 2, col: 2, speed: 50, direction: 'l', },
            { character: 'vanb', row: 2, col: 5, speed: 50, direction: 'l', },
            { character: 'vang', row: 3, col: 4, speed: 40, direction: 'r', },
            { character: 'vanw', row: 3, col: 0, speed: 40, direction: 'r', },
            { character: 'copcar', row: 4, col: 4, speed: 130, direction: 'l', },
            { character: 'vanb', row: 4, col: 2, speed: 130, direction: 'l', },
            { character: 'carb', row: 5, col: 2, speed: 50, direction: 'r', },
            { character: 'carr', row: 5, col: 4, speed: 50, direction: 'r', },
        ],
        prizes: [
            { character: 'hotdog2', row: 4, col: 5, value: 100 },
        ],
        barriers: [
            { character: 'firehydrant', row: 6, col: 6 },
            { character: 'trashcan1', row: 6, col: 4 },
            { character: 'trashcan2', row: 1, col: 3 },
            { character: 'bicycle', row: 1, col: 6 },                        
        ],
    },

    12: {
        world: 'City',
        rowTextures: ['finish', 'sidewalk-r', 'road-l', 'road-r', 'sidewalk-l', 'road-l', 'road-r', 'sidewalk-l'],
        enemies: [
            { character: 'carr', row: 2, col: 0, speed: 60, direction: 'l', },
            { character: 'vanb', row: 2, col: 1, speed: 60, direction: 'l', },
            { character: 'carw', row: 2, col: 2, speed: 60, direction: 'l', },
            { character: 'vang', row: 2, col: 3, speed: 60, direction: 'l', },
            { character: 'vanw', row: 2, col: 4, speed: 60, direction: 'l', },
            { character: 'carb', row: 3, col: 5, speed: 130, direction: 'r', },
            { character: 'copcar', row: 3, col: 3, speed: 130, direction: 'r', },
            { character: 'copcar', row: 5, col: 2, speed: 130, direction: 'l', },
            { character: 'carr', row: 5, col: 6, speed: 130, direction: 'l', },
            { character: 'carb', row: 6, col: 4, speed: 20, direction: 'r', },
        ],
        prizes: [
            { character: 'hotdog1', row: 4, col: 5, value: 100 },
        ],
        barriers: [
            { character: 'trashcan1', row: 1, col: 2 },
            { character: 'trashcan2', row: 1, col: 3 },
            { character: 'bicycle', row: 4, col: 4 },    
            { character: 'firehydrant', row: 4, col: 9 },            
                    
            
        ],
    },


    13: {
        world: 'City',
        rowTextures: ['finish', 'sidewalk-r', 'road-l', 'road-r', 'sidewalk-l', 'road-l', 'road-r', 'sidewalk-l'],
        enemies: [
            { character: 'carr', row: 2, col: 0, speed: 60, direction: 'l', },
            { character: 'vang', row: 2, col: 2, speed: 60, direction: 'l', },
            { character: 'vanw', row: 2, col: 4, speed: 60, direction: 'l', },
            { character: 'carb', row: 3, col: 5, speed: 90, direction: 'r', },
            { character: 'carw', row: 3, col: 3, speed: 90, direction: 'r', },
            { character: 'vanw', row: 5, col: 2, speed: 90, direction: 'l', },
            { character: 'carr', row: 5, col: 6, speed: 90, direction: 'l', },
            { character: 'scooter', row: 6, col: 5, speed: 80, direction: 'r', },
            { character: 'raccoon', row: 4, col: 2, speed: 70, direction: 'r', },
            { character: 'raccoon', row: 4, col: 4, speed: 70, direction: 'r', },
            { character: 'raccoon', row: 4, col: 6, speed: 70, direction: 'r', },
        ],
        prizes: [
            { character: 'hotdog2', row: 1, col: 2, value: 100 },
            { character: 'hotdog1', row: 1, col: 5, value: 100 },
        ],
        barriers: [
            // { character: 'trashcan1', row: 1, col: 2 },
            { character: 'trashcan2', row: 1, col: 4 },
            { character: 'firehydrant', row: 1, col: 3 },    
        ],
    },

    14: {
        world: 'City',
        rowTextures: ['finish', 'sidewalk-r', 'road-l', 'road-r', 'sidewalk-l', 'road-l', 'road-r', 'sidewalk-l'],
        enemies: [
            { character: 'carr', row: 2, col: 0, speed: 150, direction: 'l', },
            { character: 'carb', row: 2, col: 2, speed: 150, direction: 'l', },
            { character: 'vanw', row: 3, col: 5, speed: 150, direction: 'r', },
            { character: 'vanb', row: 3, col: 2, speed: 150, direction: 'r', },

            { character: 'vang', row: 5, col: 2, speed: 150, direction: 'l', },

            { character: 'carb', row: 6, col: 6, speed: 150, direction: 'r', },

            { character: 'scooter', row: 4, col: 6, speed: 60, direction: 'r', },
            
        ],
        prizes: [
            { character: 'hotdog1', row: 4, col: 2, value: 100 },
        ],
        barriers: [
            { character: 'firehydrant', row: 1, col: 1 },
            // { character: 'trashcan2', row: 1, col: 3 },
            // { character: 'firehydrant', row: 4, col: 4 },    
        ],
    },

    15: {
        world: 'City',
        rowTextures: ['finish', 'sidewalk-r', 'road-l', 'road-r', 'road-l', 'road-r', 'sidewalk-l', 'sidewalk-l'],
        enemies: [
            { character: 'carr', row: 2, col: 0, speed: 150, direction: 'l', },
            { character: 'carb', row: 2, col: 2, speed: 150, direction: 'l', },
            { character: 'vanw', row: 3, col: 5, speed: 150, direction: 'r', },
            { character: 'vanb', row: 3, col: 2, speed: 150, direction: 'r', },

            { character: 'vang', row: 5, col: 2, speed: 150, direction: 'r', },
            { character: 'carb', row: 4, col: 4, speed: 120, direction: 'l', },

            { character: 'scooter', row: 4, col: 6, speed: 120, direction: 'l', },
            { character: 'raccoon', row: 6, col: 3, speed: 20, direction: 'r', },
            
        ],
        prizes: [
            { character: 'hotdog2', row: 6, col: 3, value: 100 },
            { character: 'hotdog2', row: 1, col: 6, value: 100 },
            { character: 'hotdog1', row: 1, col: 4, value: 100 },
            
            
        ],
        barriers: [
            { character: 'firehydrant', row: 1, col: 1 },
            { character: 'trashcan2', row: 1, col: 2 },
            { character: 'trashcan1', row: 1, col: 3 },
            { character: 'trashcan2', row: 1, col: 5 },
            
            // { character: 'firehydrant', row: 4, col: 4 },    
        ],
    },


    16: {
        world: 'End',
        rowTextures: [],
        enemies: [],
        prizes: [],
        barriers: [],
    },

}