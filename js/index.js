(function (root) {
    var timer;
    var renderDelay = 100;
    var isFast = false;
    var isPaused = true;
    var isStarted = false;
    var algorithm;
    var solutionState;
    var algorithmSelector = document.querySelector('.controls__algorithm');
    var mazeSelector = document.querySelector('.controls__pattern');
    var speedButton = document.querySelector('.controls__speed');
    var pauseButton = document.querySelector('.controls__pause');
    var runButton = document.querySelector('.controls__run');

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
        var selectedMaze = mazeSelector.value;
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
        var selectedAlgorithm = algorithmSelector.value;
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

    function toggleRenderSpeed () {
        isFast = !isFast;
        if (isFast) {
            renderDelay = 5;
            speedButton.textContent = 'Медленнее';
        } else {
            renderDelay = 100;
            speedButton.textContent = 'Быстрее';
        }
        if (!isPaused) {
            clearInterval(timer);
            timer = setInterval(algorithm, renderDelay, solutionState);
        }
    }

    function togglePause () {
        isPaused = !isPaused;
        if (isPaused){
            clearInterval(timer);
            pauseButton.textContent = 'Дальше';
        }
        else {
            timer = setInterval(algorithm, renderDelay, solutionState);
            pauseButton.textContent = 'Пауза';
        }
    }

    function toggleSelectorsState (isRunning) {
        mazeSelector.disabled = isRunning;
        algorithmSelector.disabled = isRunning;
    }

    function toggleVisibility (element, visible) {
        element.style.visibility = visible ? 'visible' : 'hidden';
    }

    function runSolution () {
        isStarted = !isStarted;
        if (isStarted) {
            solutionState = resetState();
            runButton.textContent = 'Стоп';
            timer = setInterval(algorithm, renderDelay, solutionState);
            pauseButton.textContent = 'Пауза';
        } else {
            runButton.textContent = 'Старт';
            root.maze.redraw(selectMaze());
        }
        isPaused = !isStarted;
        toggleSelectorsState(isStarted);
        toggleVisibility(pauseButton, isStarted);
    }

    function registerEventHandlers () {
        algorithmSelector.addEventListener('change', function () {
            algorithm = selectAlgorithm();
        });

        mazeSelector.addEventListener('change', function () {
            solutionState.maze = copyMaze(selectMaze());
            root.maze.redraw(solutionState.maze);
        });

        speedButton.addEventListener('click', function () {
            toggleRenderSpeed();
        });

        pauseButton.addEventListener('click', function() {
            togglePause();
        });

        runButton.addEventListener('click', function () {
            clearInterval(timer);
            runSolution();
        });
    }

    registerEventHandlers();
    toggleVisibility(pauseButton, false);
    solutionState = resetState();
    algorithm = selectAlgorithm();
    root.maze.redraw(solutionState.maze);
})(this);
