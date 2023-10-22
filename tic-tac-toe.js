var board;
var rows = 3;
var columns = 3;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    
    for (let r = 0; r < rows; r++) {
        board.push([]);
        for (let c = 0; c < columns; c++) {
            board[r].push(0); // Initialize each cell to 0
            
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            updateTile(tile, board[r][c]);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; // Clear the classList
    if (num > 0) {
        tile.innerText = num.toString();
        
    }
}
