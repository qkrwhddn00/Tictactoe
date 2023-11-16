import React, { useState } from 'react'
import Square from './Square'
import "./board.css";

const Board = ({squares,onClick}) => {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     squares : Array(9).fill(null)
  //   }
  // }
  // const [squares,setSquares] = useState(Array(9).fill(null));
  const renderSquare= (i) => {
    return <Square value={squares[i]}
            onClick={()=> onClick(i)} />;
  }
  
  let status;
 
    return (
      <div className='board-box'> 
        <div className='statue'>{status}</div>
        <div className='board-row'>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className='board-row'>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className='board-row'>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    )
}

export default Board

// export default class Board extends Component {
//   renderSquare(i) {
//     return <Square value={i}/>;
//   }