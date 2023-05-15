import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import { Board } from '../models/Board';
import BoardComponent from '../components/BoardComponent';

const GamePage = () => {
  const [myBoard, setMyBoard] = useState(new Board());
  const [hisBoard, setHisBoard] = useState(new Board());
  const [rivalName, setRivalName] = useState("");
  const [shipsReady, setShipsReady] = useState(false);
  const [canShoot, setCanShoot] = useState(false);

  const {gameId} = useParams()

  function restart() {
    const newMyBoard = new Board();
    const newHisBoard = new Board();
    newMyBoard.initCells()
    newHisBoard.initCells();
    setMyBoard(newMyBoard);
    setHisBoard(newHisBoard);
  }

  function shoot (x, y) {

  }

  useEffect(() => {
    restart()
  }, [])

  return (
    <div>
      <h2>Ласкаво просимо у гру</h2>
      <div className="boards-container">
        <div>
          <p className="nick">{localStorage.nickname}</p>
          <BoardComponent
            board={myBoard}
            isMyBoard
            setBoard={setMyBoard}
            canShoot={false}
            shipsReady={shipsReady}
          />
        </div>
        <div>
          <p className="nick">{rivalName || "Суперник невідомий"}</p>
          <BoardComponent
            board={hisBoard}
            setBoard={setHisBoard}
            canShoot={canShoot}
            shipsReady={shipsReady}
            shoot={shoot}
          />
        </div>
      </div>
    </div>
  );
}

export default GamePage