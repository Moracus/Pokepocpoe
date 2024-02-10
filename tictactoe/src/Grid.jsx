import Item from "./Item";
import "./Grid.css";
import phanpy from "./assets/phanpy.png";
import Jigglypuff from "./assets/Jigglypuff.png";
import { useEffect, useState } from "react";
export default function Grid() {
  const initialGridState = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
  }
  const changeColorFinal = (color) => {
    setBackgroundColor(color);
    document.body.style.backgroundColor = color;
  };
  // Define the state to hold the grid's data
  const [grid, setGrid] = useState(initialGridState);
  const { player1, player2 } = { player1: phanpy, player2: Jigglypuff };
  const [currPlayer, setCurrPlayer] = useState(player1);
  let [winner, setWinner] = useState(null);
  let [backgroundColor, setBackgroundColor] = useState("#2B5779");
  document.body.style.backgroundColor = backgroundColor;
  

  useEffect(() => {
    if (winner) {
      // Implementing the setInterval method
      const interval = setInterval(() => {
        backgroundColor = getRandomColor();
        changeColorFinal(backgroundColor);
      
      }, 100);

      //Clearing the interval
      return () => clearInterval(interval);
    }
  }, [winner]);

  const checkElements = (array) => {
    // Check if all elements in the array are the same and not null
    return array.every((element) => element !== null && element === array[0]);
  };
  const checkWinner = (grid) => {
    //checkrows
    for (let i = 0; i < grid.length; i++) {
      let row = grid[i];
      if (checkElements(row)) {
        return row[0];
      }
    }
    //check cols
    for (let j = 0; j < grid[0].length; j++) {
      let col = [];
      for (let i = 0; i < grid.length; i++) {
        col.push(grid[i][j]);
      }
      if (checkElements(col)) {
        return col[0];
      }
    }
    //check diagonal
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < grid.length; i++) {
      diagonal1.push(grid[i][i]);
      diagonal2.push(grid[i][grid.length - i - 1]);
    }
    if (checkElements(diagonal1)) return diagonal1[0];
    if (checkElements(diagonal2)) return diagonal2[0];
    //no winner
    return null;
  };
 
  const handleClick = (row, col) => {
    //row=rowIndex, col=colIndex
    if (!grid[row][col] && !winner) {
      //when the cell is empty
      const updateGrid = [...grid]; //create the copy of the old grid
      updateGrid[row][col] = currPlayer;
      const newWinner = checkWinner(updateGrid);
      setWinner(newWinner);
      setGrid(updateGrid);
      //switch between player
      setCurrPlayer(currPlayer === player1 ? player2 : player1);
      backgroundColor=getRandomColor();
      changeColorFinal(backgroundColor);
    }
  };
  const gameOver=(winner)=>{
    if(winner==phanpy){
        return <h1>phanpy wins</h1>
    }
    else if(winner==Jigglypuff){
        return <h1>Jigglypuff wins</h1>
    }
  }
  const restart = ()=>{
     setGrid(initialGridState);
     setCurrPlayer(player1);
     setWinner(null);
     changeColorFinal("#2B5779");
     
  }

  return (
    <>
      <h1>PokePocPoe</h1>
      <div
        className="Grid"
        style={{ animationDuration: winner ? "5000ms" : "" }}
      >
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} style={{ display: "flex" }}>
              {row.map((cell, colIndex) => {
                return (
                  <Item
                    key={colIndex}
                    value={cell}
                    onClick={() => handleClick(rowIndex, colIndex)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <div>{gameOver(winner)}
      </div>
      <div>
        { <button onClick={restart} className="restart">restart</button>}
      </div>
      <div className="footer">
        <a href="http://github.com/moracus">Made by harsh sharma</a>
      </div>
    </>
  );
}
