(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    var UP = root.maze.UP;
    var RIGHT = root.maze.RIGHT;
    var DOWN = root.maze.DOWN;
    var LEFT = root.maze.LEFT;

    /**
     * Функция находит путь к выходу лабиринта и отрисовывает его
     *
     * @param {Object} state объект, содержащий описание текущего состояния решения
     * @param {number[][]} state.maze карта лабиринта, представленная двумерной матрицей чисел
     * @param {[number, number]} state.currentPoint текущая точка искомого пути
     * @param {number} state.currentDirection текущее направление обхода лабиринта
     * @param {[number, number][]} state.path массив точек пройденного пути
     * @param {boolean} state.pathFound флаг успешного окончания поиска
     */
    function solution (state) {
        var x = state.currentPoint[0];
        var y = state.currentPoint[1];
        var movingDirections = [
            function moveUp(){
                state.currentPoint = [x, y - 1];
            },
            function moveRight(){
                state.currentPoint = [x + 1, y];
            },
            function moveDown(){
                state.currentPoint = [x, y + 1];
            },
            function moveLeft(){
                state.currentPoint = [x - 1, y];
            }
        ];
        var forward = movingDirections[state.currentDirection];

        function turnRight () {
            state.currentDirection = (state.currentDirection + 1) % 4;
            forward = movingDirections[state.currentDirection];
        }

        function turnLeft () {
            state.currentDirection = (state.currentDirection + 3) % 4;
            forward = movingDirections[state.currentDirection];
        }

        function move () {
            state.path.push([x, y]);
            forward();
            root.maze.redraw(state.maze, state.path);
        }

        function obstacleMet (direction) {
            switch(direction) {
            case UP:
                return (state.maze[y - 1][x] === WALL);
            case RIGHT:
                return (state.maze[y][x + 1] === WALL);
            case DOWN:
                return (state.maze[y + 1][x] === WALL);
            case LEFT:
                return (state.maze[y][x - 1] === WALL);
            default:
                return false;
            }
        }

        function feelWall (direction) {
            return obstacleMet((direction+1)%4);
        }

        if (state.pathFound) { return; }

        state.pathFound = (state.maze[y][x] === EMPTY &&
                            y === state.maze.length - 1);

        if (state.pathFound)
        {
            state.path.push([x, y]);
            root.maze.redraw(state.maze, state.path);
            return;
        }

        if (feelWall(state.currentDirection) &&
            !obstacleMet(state.currentDirection)) {
            move();
            return;
        }

        if (!feelWall(state.currentDirection)) {
            turnRight();
            move();
        }
        else {
            turnLeft();
        }
    }

    root.maze.solutionRightHand = solution;
})(this);
