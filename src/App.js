import './App.css';
import Board from './components/Board';
import Test from './Test';
import React, { useState } from 'react';

function App() {
  const[history,setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [stepNext, setStepNext] =useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const calculationWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  const current = history[stepNext];
  const winner = calculationWinner(current.squares);
  let status;
  if(winner){
    status = 'Winner'+winner;
  }else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNext + 1);
    const newCurrent = newHistory[newHistory.length -1];
    const newSquares = newCurrent.squares.slice();
    if(calculationWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory,{squares:newSquares}]);
    setXIsNext(current => !current);
    setStepNext(newHistory.length);
  }

  const moves = history.map((step,move)=> {
    const desc= move?
    'Go to move #' + move:
    'Go to game start';
    return (
      <li>
        <button  className="box-list" onClick={()=> jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  const jumpTo = (step) => {
    setStepNext(step);
    setXIsNext((step%2) === 0);
  }
  return (
    <div className="game">
      <Test aprops='A'/>
      <div className='game-board'>
        <Board squares={current.squares} onClick={(i)=>handleClick(i)}/>
      </div>
      <div className='game-info'>
        <div className='status'>{status}</div>
        <ol className='move-box'>{moves}</ol>
      </div>
    </div>
  
  );
}

export default App;
// 전개 연산자
// 특정객체 또는 배열값을 다른객체, 배열로 복제해서 옮길 때 사용

// 형태:...setHistory([...history,{squares:newSquares}])

// 1. 배열 조합 가능
// 2. 객체 조합 가능
// 3. 기존배열 보존 역할

// 1.배열 조합 가능
// const arr1 = [1,2,3];
// const arr2 = [4,5,6];
// const arr3 = [...arr1, ...arr2];
// console.log(arr3);

// 2.객체 조합 가능
// object 조합을 가능하게 객체 자체 X 각각 O

// 3.기존배열을 보존할 때 사용가능
// 전개 연산자 사용 X -> 매쏘드로 기존 배열에 변화 => 원본배열에 변화 반영
// 전개 연산자 사용 O -> 매쏘드로 기존 배열에 변화 => 원본배열 유지

// map : 배열 내의 있는 리스트 나열 메쏘드
// - 배열 내의 모든 요소 각각의 대해 주어진 함수로 호출한 결과를 모아서
// 새로운 배열을 반환해줌

// -형태 : array.map(callbackFunction, [thisArg]);
// - const arr1 = [1,2,3];
// const map = arr1.map(x => x*2);