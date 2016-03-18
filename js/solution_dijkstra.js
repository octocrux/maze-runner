(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    function setPointWeight (state, x, y) {
        state.checkList.push([x, y]);
        state.maze[y][x] = state.currentWeight + 1;
    }

    /**
     * Функция строит маршрут от найденного выхода к началу пути,
     * выбирая одну из подходящих последовательностей проверенных
     * точек лабиринта
     *
     * @param {number[][]} state.maze карта лабиринта
     * @param {number} x координата точки выхода
     * @param {number} y координата точки выхода
     * @returns {[number, number][]} path построенный маршрут
     */
    function tracePath (maze, x, y) {
        var width = maze[0].length;
        var height = maze.length;
        var weight = maze[y][x];
        var path = [];

        while (weight > 1) {
            path.push([x, y]);
            weight = maze[y][x];
            if (y > 0 && maze[y - 1][x] === weight - 1) {
                path.push([x, y - 1]);
                y -= 1;
                continue;
            }
            if (x > 0 && maze[y][x - 1] === weight - 1) {
                path.push([x - 1, y]);
                x -= 1;
                continue;
            }
            if (y < height && maze[y + 1][x] === weight - 1) {
                path.push([x, y + 1]);
                y += 1;
                continue;
            }
            if (x < width && maze[y][x + 1] === weight - 1) {
                path.push([x + 1, y]);
                x += 1;
                continue;
            }
        }

        return path;
    }

    /**
     * Функция пошагово находит и отрисовывает путь к выходу из лабиринта
     * с использованием алгоритма Дейкстры
     *
     * @param {Object} state объект, содержащий описание текущего состояния решения
     * @param {number[][]} state.maze карта лабиринта, представленная двумерной матрицей чисел
     * @param {[number, number]} state.startingPoint начальная точка пути
     * @param {[number, number][]} state.checkList набор точек для последующей проверки
     * @param {number} state.currentWeight удаленность проверяемой ячейки от начальной точки
     * @param {[number, number][]} state.path массив точек пройденного пути
     * @param {boolean} state.pathFound флаг успешного окончания поиска
     */
    function solution (state) {
        var x;
        var y;
        var x0;
        var y0;
        var maxX = state.maze[0].length - 1;
        var maxY = state.maze.length - 1;
        var maze = state.maze;
        var checkList = state.checkList;
        var currentPoint;

        if (checkList.length === 0 || state.pathFound) {
            root.maze.redraw(state.maze, state.path);
            return;
        }

        currentPoint = checkList.pop();
        x = currentPoint[0];
        y = currentPoint[1];
        x0 = state.startingPoint[0];
        y0 = state.startingPoint[1];

        if (x === x0 && y === y0) {
            maze[y][x] = 1;
        }

        if(y === maxY) {
            state.pathFound = true;
            state.path = tracePath(state.maze, x, y);
            return;
        }

        state.currentWeight = maze[y][x];

        if (y > 0 && maze[y - 1][x] === EMPTY) {
            setPointWeight(state, x, y - 1);
        }
        if (x > 0 && maze[y][x - 1] === EMPTY) {
            setPointWeight(state, x - 1, y);
        }
        if (y < maxY && maze[y + 1][x] === EMPTY) {
            setPointWeight(state, x, y + 1);
        }
        if (x < maxX && maze[y][x + 1] === EMPTY) {
            setPointWeight(state, x + 1, y);
        }

        root.maze.redraw(state.maze);
    }

    root.maze.solutionDijkstra = solution;
})(this);
