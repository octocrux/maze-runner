//'use strict';
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
        // todo: построить правильный маршрут к выходу
        var UP = 0;
        var RIGHT = 1;
        var DOWN = 2;
        var LEFT = 3;
        var currentDirection = DOWN;
        var currentPoint = [x, y];
        var nextPoint;
        var path = [];
        var pathFound = false;
        var movingDirections = [
            function moveUp(){
                path.push(currentPoint);
                nextPoint = [currentPoint[0], currentPoint[1] - 1];
                currentPoint = nextPoint;
            },
            function moveRight(){
                path.push(currentPoint);
                nextPoint = [currentPoint[0] + 1, currentPoint[1]];
                currentPoint = nextPoint;
            },
            function moveDown(){
                path.push(currentPoint);
                nextPoint = [currentPoint[0], currentPoint[1] + 1];
                currentPoint = nextPoint;
            },
            function moveLeft(){
                path.push(currentPoint);
                nextPoint = [currentPoint[0] - 1, currentPoint[1]];
                currentPoint = nextPoint;
            }
        ];
        var forward = movingDirections[currentDirection];

        function move () {
            forward();
            pathFound = (maze[currentPoint[1]][currentPoint[0]] === EMPTY &&
                        currentPoint[1] === maze.length - 1);
        }

        function obstacleMet (direction) {
            switch(direction) {
            case UP:
                return maze[currentPoint[1] - 1][currentPoint[0]] === WALL;
            case RIGHT:
                return maze[currentPoint[1]][currentPoint[0] + 1] === WALL;
            case DOWN:
                return maze[currentPoint[1] + 1][currentPoint[0]] === WALL;
            case LEFT:
                return maze[currentPoint[1]][currentPoint[0] - 1] === WALL;
            default:
                return false;
            }
        }

        function feelWall (direction) {
            return obstacleMet((direction+1)%4);
        }

        function turnRight(){
            currentDirection = (currentDirection + 1) % 4;
            forward = movingDirections[currentDirection];
        }

        function turnLeft(){
            currentDirection = (currentDirection + 3) % 4;
            forward = movingDirections[currentDirection];
        }

        function renderMaze(){
            var mazeDiv = document.getElementsByClassName('maze')[0];
            if (mazeDiv) {
                mazeDiv.remove();
            }
            document.querySelector('.outer').appendChild(
                root.maze.render(maze, path)
            );
        }

        while (!pathFound) {
            while (!pathFound && feelWall(currentDirection) && 
                    !obstacleMet(currentDirection)) {
                move();
            }
            if (!feelWall(currentDirection)) {
                turnRight();
                move();
            }
            else {
                turnLeft();
            }
        }

        path.push(currentPoint);
        return path;
    }

    root.maze.solution = solution;
})(this);
