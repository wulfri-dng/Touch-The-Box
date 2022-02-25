import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [selectedTile, setSelectedTile] = useState(0)
  const [clickedTile, setClickedTile] = useState()
  const [gameSpeed, setGameSpeed] = useState(550)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isFirstRun, setIsFirstRun] = useState(true)
  const [isRetry, setIsRetry] = useState(false)

  useEffect(() => {
    if(!gameOver) {
      setTimeout(() => {
        let randomNo = selectedTile
        while (randomNo === selectedTile) {
          randomNo = Math.floor(Math.random() * 12)
        }
        if(!gameOver) {
          setSelectedTile(randomNo)
        } else{
          setSelectedTile(-1)
        }
      }, gameSpeed)
      const currentTile = document.getElementById(`innerBox${selectedTile + 1}`)
      currentTile.classList.add("selectedTile", setTimeout(() => {
        currentTile.classList.remove("selectedTile")
      }, gameSpeed))
    } 
  }, [selectedTile, gameOver])

  useEffect(() => {
    if(!isRetry) {
      setGameSpeed(gameSpeed - 1)
    } else{
      setGameSpeed(550)
    }
  }, [score])

  useEffect(() => {
    if(selectedTile === clickedTile) {
      correctTileClicked(selectedTile)
      setScore(score + 1)
    } else if(!isFirstRun) {
      incorrectTileClicked(clickedTile)
      setScore(score - 1)
    }
    setIsFirstRun(false)
  }, [clickedTile])

  function retry() {
    setGameOver(false)
    for(let i = 0; i < 12 ;i ++) {
      let currentTile = document.getElementById(`innerBox${i + 1}`)
      currentTile.classList.remove("incorrectTileClicked")
    }
    setIsRetry(true)
    setScore(0)
  }

  function tileClick(numb) {
    setClickedTile(numb)
  }

  function correctTileClicked(tile) {
    const correctTile = document.getElementById(`innerBox${tile + 1}`)
    correctTile.classList.add("correctTileClicked", setTimeout(() => {
      correctTile.classList.remove("correctTileClicked")
    }, gameSpeed - 20))
  }

  function incorrectTileClicked(tile) {
    const incorrectTile = document.getElementById(`innerBox${tile + 1}`)
    incorrectTile.classList.add("incorrectTileClicked", setTimeout(() => {
      for(let i = 0; i < 12 ;i ++) {
        let currentTile = document.getElementById(`innerBox${i + 1}`)
        currentTile.classList.add("incorrectTileClicked")
      }
    }, gameSpeed - 20))
    setGameOver(true)
  }

  return (
    <div className="App">
      <div className='outerBox'>
        <button id='innerBox1' className='innerBox' onClick={() => tileClick(0)}></button>
        <button id='innerBox2' className='innerBox' onClick={() => tileClick(1)}></button>
        <button id='innerBox3' className='innerBox' onClick={() => tileClick(2)}></button>
        <button id='innerBox4' className='innerBox' onClick={() => tileClick(3)}></button>
      </div>
      <div className='outerBox'>
        <button id='innerBox5' className='innerBox' onClick={() => tileClick(4)}></button>
        <button id='innerBox6' className='innerBox' onClick={() => tileClick(5)}></button>
        <button id='innerBox7' className='innerBox' onClick={() => tileClick(6)}></button>
        <button id='innerBox8' className='innerBox' onClick={() => tileClick(7)}></button>
      </div>
      <div className='outerBox'>
        <button id='innerBox9' className='innerBox' onClick={() => tileClick(8)}></button>
        <button id='innerBox10' className='innerBox' onClick={() => tileClick(9)}></button>
        <button id='innerBox11' className='innerBox' onClick={() => tileClick(10)}></button>
        <button id='innerBox12' className='innerBox' onClick={() => tileClick(11)}></button>
      </div>
      <p>{selectedTile}</p>
      <p>{clickedTile}</p>
      <p>Game Speed: {gameSpeed}</p>
      <p>Player's Score: {score}</p>
      <button onClick={retry}>Retry</button>
    </div>
  );
}

export default App;