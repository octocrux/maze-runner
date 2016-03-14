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
     * @param {number} state.currentDirection направление обхода лабиринта
     * @param {[number, number][]} state.path пройденный путь
     * @param {boolean} state.pathFound флаг успешного окончания поиска
     */
    function solution (state) {
        var currentPoint = state.currentPoint;
        var nextPoint;
        var movingDirections = [
            function moveUp(){
                state.path.push(currentPoint);
                nextPoint = [currentPoint[0], currentPoint[1] - 1];
                state.currentPoint = nextPoint;
            },
            function moveRight(){
                state.path.push(currentPoint);
                nextPoint = [currentPoint[0] + 1, currentPoint[1]];
                state.currentPoint = nextPoint;
            },
            function moveDown(){
                state.path.push(currentPoint);
                nextPoint = [currentPoint[0], currentPoint[1] + 1];
                state.currentPoint = nextPoint;
            },
            function moveLeft(){
                state.path.push(currentPoint);
                nextPoint = [currentPoint[0] - 1, currentPoint[1]];
                state.currentPoint = nextPoint;
            }
        ];
        var forward = movingDirections[state.currentDirection];

        function move () {
            forward();
            redrawMaze();
        }

        function obstacleMet (direction) {
            switch(direction) {
            case UP:
                return (state.maze[currentPoint[1] - 1][currentPoint[0]] === WALL);
            case RIGHT:
                return (state.maze[currentPoint[1]][currentPoint[0] + 1] === WALL);
            case DOWN:
                return (state.maze[currentPoint[1] + 1][currentPoint[0]] === WALL);
            case LEFT:
                return (state.maze[currentPoint[1]][currentPoint[0] - 1] === WALL);
            default:
                return false;
            }
        }

        function feelWall (direction) {
            return obstacleMet((direction+1)%4);
        }

        function turnRight () {
            state.currentDirection = (state.currentDirection + 1) % 4;
            forward = movingDirections[state.currentDirection];
        }

        function turnLeft () {
            state.currentDirection = (state.currentDirection + 3) % 4;
            forward = movingDirections[state.currentDirection];
        }

        function redrawMaze () {
            var mazeDiv = document.getElementsByClassName('maze')[0];
            if (mazeDiv) {
                mazeDiv.remove();
            }
            document.querySelector('.outer').appendChild(
                root.maze.render(state.maze, state.path)
            );
        }

        if (state.pathFound) { return; }

        state.pathFound = (state.maze[currentPoint[1]][currentPoint[0]] === EMPTY &&
                        currentPoint[1] === state.maze.length - 1);

        if (state.pathFound)
        {
            state.path.push(state.currentPoint);
            redrawMaze();
            return;
        }

        if (feelWall(state.currentDirection) && !obstacleMet(state.currentDirection)) {
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

    root.maze.solution = solution;
})(this);
