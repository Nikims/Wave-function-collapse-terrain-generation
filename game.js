grid = [];
//0 green
//1 blue
//2 yellow
//3 brown
//4 red
//5 is snow

for (let i = 0; i < 100; i++) {
  grid[i] = [];
  for (let j = 0; j < 100; j++) {
    grid[i][j] = [0, 1, 2, 3, 4, 5];
  }
}
neighborsMap = [];
neighborsMap[0] = [0, 3, 4, 1];
neighborsMap[1] = [1];
neighborsMap[2] = [2, 1, 3];
neighborsMap[3] = [3, 0, 2, 5];
neighborsMap[4] = [0];
neighborsMap[5] = [5, 0, 3];

function crossSection(...arrs) {
  result = [];
  resultcleared = [];
  resultCross = [];

  for (let i = 0; i < arrs.length; i++) {
    result = result.concat(arrs[i]);
  }

  resultcleared = [...new Set(result)];

  for (let i = 0; i < resultcleared.length; i++) {
    count = 0;
    for (let j = 0; j < result.length; j++) {
      if (result[j] == resultcleared[i]) {
        count++;
      }
    }
    if (count == arrs.length) {
      resultCross.push(resultcleared[i]);
    }
  }
  if (resultCross.length > 0) {
    return resultCross;
  } else {
    return arrs[0];
  }
}
//https://pastebin.com/jZyfENWr
function collapseLeastOrRandom() {
  min = [];
  minCount = 999;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].length > 1) {
        try {
          if (grid[i][j].length < minCount) {
            minCount = grid[i][j].length;
            min = [];
            min.push({ x: i, y: j });
          }
          if (grid[i][j].length == minCount) {
            min.push({ x: i, y: j });
          }
        } catch (e) {}
      }
    }
  }
  // console.log(minCount);
  indexToCollapse = Math.floor(Math.random() * min.length);
  cellToCollapse = grid[min[indexToCollapse].x][min[indexToCollapse].y];
  // console.log(min[indexToCollapse].x, min[indexToCollapse].y);
  grid[min[indexToCollapse].x][min[indexToCollapse].y] = [
    grid[min[indexToCollapse].x][min[indexToCollapse].y][
      Math.floor(
        Math.random() *
          grid[min[indexToCollapse].x][min[indexToCollapse].y].length
      )
    ],
  ];
  //GRID[2][2]==[]
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      try {
        if (j != i) {
          if (
            grid[min[indexToCollapse].x + i][min[indexToCollapse].y + j]
              .length > 1
          ) {
            grid[min[indexToCollapse].x + i][min[indexToCollapse].y + j] =
              crossSection(
                neighborsMap[
                  grid[min[indexToCollapse].x][min[indexToCollapse].y]
                ],
                grid[min[indexToCollapse].x + i][min[indexToCollapse].y + j]
              );
          }
        }
      } catch (e) {}
    }
  }
  // console.log(grid[min[indexToCollapse].x][min[indexToCollapse].y]);
}

function update() {
  try {
    for (i = 0; i < 20; i++) {
      collapseLeastOrRandom();
    }
  } catch (e) {}
}
function draw() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      try {
        if (grid[i][j].length > 0) {
          if (grid[i][j][0] == 0) {
            context.fillStyle = "green";
          }
          if (grid[i][j][0] == 1) {
            context.fillStyle = "blue";
          }
          if (grid[i][j][0] == 2) {
            context.fillStyle = "yellow";
          }
          if (grid[i][j][0] == 3) {
            context.fillStyle = "brown";
          }
          if (grid[i][j][0] == 4) {
            context.fillStyle = "red";
          }
          if (grid[i][j][0] == 5) {
            context.fillStyle = "gray";
          }
          context.fillRect(i * 6, j * 6, 6, 6);
          // context.fillText(grid[i][j].length, i * 5 + 5, j * 5 + 5, 5, 5);
        } else {
          context.filLStyle = "black";

          context.fillText(grid[i][j].length, i * 5 + 5, j * 5 + 5, 5, 5);
        }
      } catch (e) {}
    }
  }
}
