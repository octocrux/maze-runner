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
        var element = document.createElement(type);
        element.className = className;

        return element;
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
        }
    }

    /**
     * Создает визуализацию лабиринта по его схеме
     *
     * @param {number[][]} maze схема лабиринта
     * @returns {HTMLElement} HTML элемент
     */
    function render(maze) {
        var containerElem = element('div', 'maze'),
            rowElem,
            type,
            row, 
            cell,
            x, 
            y;

        for (y = 0; y < maze.length; y++) {
            row = maze[y];
            rowElem = element('div', 'maze__row');

            for (x = 0; x < row.length; x++) {
                cell = row[x];

                switch (cell) {
                    case EMPTY:
                        type = 'undefined';
                        break;

                    case WALL:
                        type = 'wall';
                        break;

                    case PATH:
                        type = 'path';
                        break;

                    default:
                        type = 'current';
                }

                rowElem.appendChild(
                    element('div', 'maze__cell' + (type ? ' maze__cell_' + type : ''))
                );
            }

            containerElem.appendChild(rowElem);
        }

        return containerElem;
    }

    /**
     * Перерисовывает схему лабиринта в заданном элементе
     * с возможностью наложения маршрута
     *
     * @param {number[][]} maze схема лабиринта
     * @param {[number, number][]} [path] маршрут
     */
    function redraw (maze, path) {
        var node = document.querySelector('.maze');

        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }

        if (path && path.length) {
            applyPath(maze, path);
        }

        document.querySelector('.outer').appendChild(
            render(maze, path)
        );
    }

    root.maze.redraw = redraw;
})(this);
