(function (root) {
    var continueSimulation = false;
    var started = false;
    var timer;
    var interval = 100;
    var speedUp = false;
    var solution;
    var solutionState;

    function resetState () {
        var state = {
            currentPoint: [1, 0],
            currentDirection: root.maze.DOWN,
            currentWeight: 0,
            startingPoint: [1, 0],
            checkList: [[1, 0]],
            path: [],
            pathFound: false,
            maze: copyMaze(selectMaze())
        };
        return state;
    }

    function copyMaze (maze) {
        var newMaze = [];
        for (var i = 0; i < maze.length; i++) {
            newMaze[i] = [];
            for (var j = 0; j < maze[0].length; j++) {
                newMaze[i].push(maze[i][j]);
            }
        }
        return newMaze;
    }

    function selectMaze () {
        var selectedMaze = document.getElementById('pattern').value;
        var maze;
        switch (selectedMaze) {
            case 'maze21':
                maze = root.maze.MAZE_21;
                break;

            case 'maze31':
                maze = root.maze.MAZE_31;
                break;

            case 'maze51':
                maze = root.maze.MAZE_51;
                break;

            default:
                maze = root.maze.MAZE_Y;
                break;
        }
        return maze;
    }

    function selectAlgorithm () {
        var selectedAlgorithm = document.getElementById('algorithm').value;
        var algorithm;
        switch (selectedAlgorithm) {
            case 'dijkstra':
                algorithm = root.maze.solutionDijkstra;
                break;

            default:
                algorithm = root.maze.solutionRightHand;
                break;
        }
        return algorithm;
    }

    var algorithmSelector = document.getElementById('algorithm');
    algorithmSelector.onchange = function () {
        solution = selectAlgorithm();
    };

    var mazeSelector = document.getElementById('pattern');
    mazeSelector.onchange = function () {
        solutionState.maze = copyMaze(selectMaze());
        root.maze.redraw(solutionState.maze);
    };

    var speedButton = document.getElementById('speed');
    speedButton.onclick = function () {
        speedUp = !speedUp;
        if (speedUp) {
            interval = 5;
            speedButton.textContent = 'Медленнее';
        } else {
            interval = 100;
            speedButton.textContent = 'Быстрее';
        }
        if (continueSimulation) {
            clearInterval(timer);
            timer = setInterval(solution, interval, solutionState);
        }
    };

    var runButton = document.getElementById('run');
    runButton.onclick = function() {
        continueSimulation = !continueSimulation;
        if (continueSimulation){
            timer = setInterval(solution, interval, solutionState);
            runButton.textContent = 'Пауза';
        }
        else {
            clearInterval(timer);
            runButton.textContent = 'Дальше';
        }
    };

    var restartButton = document.getElementById('restart');
    restartButton.onclick = function () {
        started = !started;
        clearInterval(timer);

        if (started) {
            continueSimulation = true;
            solutionState = resetState();

            mazeSelector.disabled = true;
            algorithmSelector.disabled = true;
            runButton.style.display = 'inline';
            runButton.textContent = 'Пауза';
            restartButton.textContent = 'Стоп';

            timer = setInterval(solution, interval, solutionState);
        } else {
            continueSimulation = false;

            mazeSelector.disabled = false;
            algorithmSelector.disabled = false;
            runButton.style.display = 'none';
            restartButton.textContent = 'Старт';
            root.maze.redraw(selectMaze());
        }
    };

    runButton.style.display = 'none';
    solutionState = resetState();
    solution = selectAlgorithm();
    root.maze.redraw(solutionState.maze);
})(this);
