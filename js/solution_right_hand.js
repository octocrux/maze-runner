(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;

    var UP = root.maze.UP;
    var RIGHT = root.maze.RIGHT;
    var DOWN = root.maze.DOWN;
    var LEFT = root.maze.LEFT;

    function moveUp (state) {
        state.currentPoint[1] -= 1;
    }

    function moveRight (state) {
        state.currentPoint[0] += 1;
    }

    function moveDown (state) {
        state.currentPoint[1] += 1;
    }

    function moveLeft (state) {
        state.currentPoint[0] -= 1;
    }

    function changeDirection (direction) {
        switch (direction) {
            case UP:
                return moveUp;
            case RIGHT:
                return moveRight;
            case DOWN:
                return moveDown;
            case LEFT:
                return moveLeft;
        }
    }

    function turnRight (state) {
        state.currentDirection = (state.currentDirection + 1) % 4;
        return changeDirection(state.currentDirection);
    }

    function turnLeft (state) {
        state.currentDirection = (state.currentDirection + 3) % 4;
        return changeDirection(state.currentDirection);
    }

    function obstacleMet (state, x, y) {
        switch (state.currentDirection) {
        case UP:
            return (state.maze[y - 1][x] === WALL);
        case RIGHT:
            return (state.maze[y][x + 1] === WALL);
        case DOWN:
            return (state.maze[y + 1][x] === WALL);
        case LEFT:
            return (state.maze[y][x - 1] === WALL);
        }
    }

    function feelWall (state, x, y) {
        switch ((state.currentDirection + 1) % 4) {
        case UP:
            return (state.maze[y - 1][x] === WALL);
        case RIGHT:
            return (state.maze[y][x + 1] === WALL);
        case DOWN:
            return (state.maze[y + 1][x] === WALL);
        case LEFT:
            return (state.maze[y][x - 1] === WALL);
        }
    }

    /**
     * Функция пошагово находит и отрисовывает путь к выходу лабиринта
     * с использованием правила правой руки
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
        var forward = changeDirection(state.currentDirection);
        var isEmptySpot;
        var isExitRow;

        function move () {
            state.maze[y][x] = PATH;
            forward(state);
            root.maze.redraw(state.maze);
        }

        if (state.pathFound) { return; }

        isEmptySpot = state.maze[y][x] === EMPTY;
        isExitRow = y === state.maze.length - 1;
        state.pathFound = isEmptySpot && isExitRow;

        if (state.pathFound) {
            state.maze[y][x] = PATH;
            root.maze.redraw(state.maze);
            return;
        }

        if (feelWall(state, x, y) && !obstacleMet(state, x, y)) {
            move();
            return;
        }

        if (!feelWall(state, x, y)) {
            forward = turnRight(state);
            move();
        } else {
            forward = turnLeft(state);
        }
    }

    root.maze.solutionRightHand = solution;
})(this);
