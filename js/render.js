(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Создает HTML элемент заданного типа с заданным CSS классом
     *
     * @param {string} type тип создаваемого HTML элемента
     * @param {string} className CSS класс
     * @returns {HTMLElement} HTML элемент
     */
    function element(type, className) {
        var elem = document.createElement(type);
        elem.className = className;
        return elem;
    }

    /**
     * Накладывает точки маршрута на схему лабиринта
     *
     * @param {number[][]} maze схема лабиринта
     * @param {[number, number][]} [path] маршрут
     */
    function applyPath(maze, path) {
        var point, i;

        if (path && path.length) {
            for (i = 0; i < path.length; i++) {
                point = path[i];
                maze[point[1]][point[0]] = PATH;
            }
            point = path[path.length - 1];
            maze[point[1]][point[0]] = CURRENT;
        }
    }

    /**
     * Стирает точки маршрута со схемы лабиринта
     *
     * @param {number[][]} maze схема лабиринта
     * @param {[number, number][]} [path] маршрут
     */
    function erasePath(maze, path) {
        var point, i;

        if (path && path.length) {
            for (i = 0; i < path.length; i++) {
                point = path[i];
                maze[point[1]][point[0]] = EMPTY;
            }
        }
    }

    /**
     * Создает визуализацию лабиринта по его схеме с возможностью наложения маршрута
     *
     * @param {number[][]} maze схема лабиринта
     * @param {[number, number][]} [path] маршрут
     * @returns {HTMLElement} HTML элемент
     */
    function render(maze, path) {
        var containerElem = element('div', 'maze'),
            rowElem,
            type,
            row, 
            cell,
            x, 
            y;

        applyPath(maze, path);

        for (y = 0; y < maze.length; y++) {
            row = maze[y];
            rowElem = element('div', 'maze__row');

            for (x = 0; x < row.length; x++) {
                cell = row[x];

                switch (cell) {
                    case WALL:
                        type = 'wall';
                        break;

                    case PATH:
                        type = 'path';
                        break;

                    case CURRENT:
                        type = 'current';
                        break;

                    default:
                        type = undefined;
                }

                rowElem.appendChild(
                    element('div', 'maze__cell' + (type ? ' maze__cell_' + type : ''))
                );
            }

            containerElem.appendChild(rowElem);
        }
        erasePath(maze, path);

        return containerElem;
    }

    root.maze.render = render;
})(this);
