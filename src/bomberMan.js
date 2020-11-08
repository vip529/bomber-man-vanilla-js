/**
 * Represents a grid based BomberMan game;
 * @constructor
 * @method renderGrid() - will render the game grid and
 *                        make it playable.
 * @method resetGrid() - resets the grid in order to
 *                        restart the game.
 */

function BomberMan() {
  let bombCells = []; /* Random array of cells which contain bomb*/
  let score = 0; /* score of the player*/

  /**
   * Build the grid and attach click event-listeners to each cell.
   */

  this.renderGrid = function () {
    for (let i = 0; i < 10; i++) {
      bombCells.push(parseInt(Math.random() * 81 + 1, 10));
    }
  
    let grid = document.getElementById("grid");
    for (let i = 0; i < 9; i++) {
      let row = document.createElement("div");
      row.id = `${i + 1}`;
      row.className = "row";

      for (let j = 0; j < 9; j++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        let cellValue = 9 * i + (j + 1);
        cell.id = `cell${cellValue}`;
        cell.addEventListener("click", () => {
          handleClick(cellValue);
        });
        row.appendChild(cell);
      }
      grid.appendChild(row);
    }
  };

  /**
   * Resets the grid to its initial render in order
   * to let user play again, if he wishes so.
   *
   */

  this.resetGrid = function () {
    let gridElement = document.getElementById("grid");
    for (let i = 0; i < 9; i++) {
      let item = document.getElementById(`${i + 1}`);
      gridElement.removeChild(item);
    }
    gridElement.style.pointerEvents = "auto";
    let replayButtonElement = document.getElementById("replay");
    replayButtonElement.style.display = "none";
    let scoreElement = document.getElementById("score");
    scoreElement.innerHTML = "";
    scoreElement.style.color = "white";
    bombCells = [];
    score = 0;
    this.renderGrid();
  };

  /**
   *Handles the after-events of a cell-click by the user.
   * @param {number} cellValue
   */

  function handleClick(cellValue) {
    if (bombCells.includes(cellValue)) {
      handleBombCellClick(cellValue);
    } else {
      handleCorrectCellClick(cellValue);
    }
  }

  /**
   * handles the scenario when correct cell is clicked by the user.
   * Also adds a replay button when user's score reaches 71.
   * @param {number} cellValue
   */

  function handleCorrectCellClick(cellValue) {
    let cell = document.getElementById(`cell${cellValue}`);
    cell.style.backgroundColor = "bisque";
    cell.innerHTML = "✔️";
    cell.style.fontSize = "20px";
    cell.style.color = "transparent";
    cell.style.textShadow = "0 0 0 green";
    cell.style.pointerEvents = "none";
    cell.style.fontWeight = 300;

    score++;

    let scoreElement = document.getElementById("score");
    scoreElement.innerHTML = `Score: ${score}`;
    if (score === 71) {
      console.log("Congratulations you won the game");
      let grid = document.getElementById("grid");
      grid.style.pointerEvents = "none";
      scoreElement.innerHTML = "Congratulations you won the game";
      let replayButtonElement = document.getElementById("replay");
      replayButtonElement.style.display = "block";
    }
  }

  /**
   * handles the scenario when the user clicks on a bomb cell.
   */

  function handleBombCellClick() {
    for (let cellValue of bombCells) {
      let cell = document.getElementById(`cell${cellValue}`);
      cell.style.backgroundColor = "grey";
      cell.innerHTML = "&#128165;";
      cell.style.fontSize = "25px";
    }
    let grid = document.getElementById("grid");
    grid.style.pointerEvents = "none";
    let scoreElement = document.getElementById("score");
    scoreElement.innerHTML = `Game Over. You scored ${score}`;
    scoreElement.style.color = "red";
    let replayButtonElement = document.getElementById("replay");
    replayButtonElement.style.display = "block";
  }
}

let myBomberMan = new BomberMan();
myBomberMan.renderGrid();
