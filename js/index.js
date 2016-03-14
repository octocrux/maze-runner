(function (root) {
    var continueSimulation = false;
    var timer;
    var solutionState = {
        maze: root.maze.MAZE_Y,
        currentPoint: [1, 0],
        path: [],
        pathFound: false,
        currentDirection: root.maze.DOWN
    };

    function selectMaze () {
        var selectedMaze = document.querySelector('.controls__selector').value;

        switch (selectedMaze) {
        case 'mazeY':
            solutionState.maze = root.maze.MAZE_Y;
            break;
        case 'maze21':
            solutionState.maze = root.maze.MAZE_21;
            break;
        case 'maze31':
            solutionState.maze = root.maze.MAZE_31;
            break;
        case 'maze51':
            solutionState.maze = root.maze.MAZE_51;
            break;
        default:
            solutionState.maze = root.maze.MAZE_Y;
            break;
        }
    }

    var mazeSelector = document.getElementById('pattern');
    mazeSelector.onchange = function () {
        debugger;
        selectMaze();
        root.maze.redraw(solutionState.maze);
    }

    var runButton = document.getElementById('run');
    runButton.onclick = function() {
        continueSimulation = !continueSimulation;
        if (continueSimulation){
            timer = setInterval(root.maze.solution, 50, solutionState);
            runButton.textContent = 'Пауза';
        }
        else {
            clearInterval(timer);
            runButton.textContent = 'Дальше';
        }
    };

    var restartButton = document.getElementById('restart');
    var started = false;
    restartButton.onclick = function () {
        started = !started;

        if (started) {
            clearInterval(timer);
            continueSimulation = true;

            solutionState.currentPoint = [1, 0];
            solutionState.path = [];
            solutionState.pathFound = false;
            solutionState.currentDirection = root.maze.DOWN;

            selectMaze();
            mazeSelector.disabled = true;
            timer = setInterval(root.maze.solution, 50, solutionState);
            runButton.style.display = 'inline';
            runButton.textContent = 'Пауза';

            restartButton.textContent = 'Стоп';
        } else {
            clearInterval(timer);
            continueSimulation = false;
            mazeSelector.disabled = false;
            runButton.style.display = 'none';
            restartButton.textContent = 'Старт';
            root.maze.redraw(solutionState.maze);
        }
    };

    runButton.style.display = 'none';
    root.maze.redraw(solutionState.maze);
})(this);
