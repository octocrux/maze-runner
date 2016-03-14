(function (root) {
    var solutionState = {
      maze: root.maze.MAZE_Y,
      currentPoint: [1, 0],
      path: [],
      pathFound: false,
      currentDirection: root.maze.DOWN
    };

    setInterval(root.maze.solution, 10, solutionState);
})(this);
