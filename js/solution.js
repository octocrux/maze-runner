(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */
    function solution(maze, x, y) {
        var path = [];
        var xMax = maze[0].length - 1;
        var yMax = maze.length - 1;

        function findExit(x, y) {
            if (maze[y][x] === CURRENT || maze[y][x] === WALL) return false;
            if (maze[y][x] === EMPTY) {
                maze[y][x] = CURRENT;
                if (y === yMax) {
                    path.push([x,y]);
                    return true;
                }
            }
            if ((x > 0) && findExit(x-1, y)) {
                path.push([x,y]);
                return true;
            }
            if ((y < yMax) && findExit(x, y+1)) {
                path.push([x,y]);
                return true;
            }
            if ((x < xMax) && findExit(x+1, y)) {
                path.push([x,y]);
                return true;
            }
            if ((y > 0) && findExit(x, y-1)) {
                path.push([x,y]);
                return true;
            }
            return false;
        }

        findExit(x, y);

        return path;
    }

    root.maze.solution = solution;
})(this);
