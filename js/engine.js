let scaleRatio = (window.innerWidth > 1000) ? 1 : (window.innerWidth > 700) ? .7 : .5;
var Engine = (function (global) {
    // Predefine the variables we'll be using within this scope,
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    // Width/Height will keep a 10:7 ratio
    canvas.width = 1000 * scaleRatio;
    canvas.height = 700 * scaleRatio;

    doc.querySelector('#game-board').appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        if (player.collision === true || score.lives === 0) {
            stopKeyboardListener();
            if (score.lives === 0) {
                setTimeout(() => {
                    gameOver(false); //win=false
                    restartGame();
                    main(); // Continue this Game loop
                }, 2000);
            } else { //Player collision
                setTimeout(() => {
                    player.resetPosition(); // Subtracts a life, puts player back
                    startLevel(false, false, true); //restartlevel=true
                    main(); // Continue this Game loop
                }, 2000);
            }
        } else {
            // Get our time delta information
            var now = Date.now(),
                dt = (now - lastTime) / 1000.0;
            /* Call our update/render functions, pass along the time delta to
             * our update function since it may be used for smooth animation.
             */
            update(dt);
            render();
            /* Set our lastTime variable which is used to determine the time delta
             * for the next time this function is called.
             */
            lastTime = now;
            /* Use the browser's requestAnimationFrame function to call this
             * function again as soon as the browser is able to draw another frame.*/
            win.requestAnimationFrame(main);
        }
    }

    function init() {
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
    }

    function updateEntities(dt) {

        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. 
     */
    function render() {

        // Before drawing, clear existing canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        renderEntities();
    }

    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allSquares.forEach(square => square.render());
        allPrizes.forEach(prize => prize.render());
        let allObjects = [...allEnemies, ...allBarriers, player]
        allObjects.sort(function (a, b) {
            return a.y - b.y;
        });
        allObjects.forEach(item => item.render());
    }
    Resources.load(worldTextures);
    Resources.onReady(init);
    global.ctx = ctx;
});
