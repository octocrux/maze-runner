(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    function tracePath (maze, x, y) {
        var width = maze[0].length;
        var height = maze.length;
        var weight = maze[y][x];
        var path = [];

        while (weight > 1) {
            path.push([x, y]);
            weight = maze[y][x];
            if (y > 0 && maze[y - 1][x] === weight - 1){
                path.push([x, y - 1]);
                y -= 1;
                continue;
            }
            if (x > 0 && maze[y][x - 1] === weight - 1){
                path.push([x - 1, y]);
                x -= 1;
                continue;
            }
            if (y < height && maze[y + 1][x] === weight - 1){
                path.push([x, y + 1]);
                y += 1;
                continue;
            }
            if (x < width && maze[y][x + 1] === weight - 1){
                path.push([x + 1, y]);
                x += 1;
                continue;
            }
        }
        return path;
    }

    function solution (state) {
        var x;
        var y;
        var width = state.maze[0].length - 1;
        var height = state.maze.length - 1;
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

        if (x === state.startingPoint[0] && y === state.startingPoint[1]) {
            maze[y][x] = 1;
        }

        if(y === height) {
            state.pathFound = true;
            state.path = tracePath(state.maze, x, y);
            return;
        }

        state.currentWeight = maze[y][x];
        if (y > 0 && maze[y - 1][x] === EMPTY){
            state.checkList.push([x, y - 1]);
            maze[y - 1][x] = state.currentWeight + 1;
        }
        if (x > 0 && maze[y][x - 1] === EMPTY){
            state.checkList.push([x - 1, y]);
            maze[y][x - 1] = state.currentWeight + 1;
        }
        if (y < height && maze[y + 1][x] === EMPTY){
            state.checkList.push([x, y + 1]);
            maze[y + 1][x] = state.currentWeight + 1;
        }
        if (x < width && maze[y][x + 1] === EMPTY){
            state.checkList.push([x + 1, y]);
            maze[y][x + 1] = state.currentWeight + 1;
        }
        root.maze.redraw(state.maze);
    }

    root.maze.solutionDijkstra = solution;
})(this);
