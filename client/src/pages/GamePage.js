import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Board } from '../models/Board';
import BoardComponent from '../components/BoardComponent';
import ActionsInfo from '../components/ActionsInfo';

const wsServer = new WebSocket("ws://localhost:4000")

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

  const navigate = useNavigate()

  function shoot (x, y) {
    wsServer.send(JSON.stringify({event: "shoot", payload: {username: localStorage.nickname, x, y, gameId}}))
  }

  wsServer.onmessage = function(response) {
    const {type, payload} = JSON.parse(response.data)
    const {username, x, y, canStart, rivalName, success} = payload;

    switch (type) {
      case "connectToPlay":
        if (!success) {
          return navigate("/");
        }
        setRivalName(rivalName);
        break;
      case "readyToPlay":
        if (payload.username === localStorage.nickname && canStart) {
          setCanShoot(true);
        }
        break;
        case "afterShootByMe":
          if (username !==localStorage.nickname) {
            const isPerfectHit = myBoard.cells[y][x].mark?.name === "ship"
            changeBoardAfterShoot(myBoard, setMyBoard, x, y, isPerfectHit)
            wsServer.send(JSON.stringify({event: "checkShoot", payload: {...payload, isPerfectHit}}))
            if (!isPerfectHit) {
              setCanShoot(true)
            }
          }
          break;
          case "isPerfectHit":
            if (username === localStorage.nickname) {
              changeBoardAfterShoot(hisBoard, setHisBoard, x, y, payload.isPerfectHit);
              payload.isPerfectHit ? setCanShoot(true) : setCanShoot(false)
            }
            break;
      default:
        break;
    }
  }

  function changeBoardAfterShoot(board, setBoard, x, y, isPerfectHit) {
    isPerfectHit ? board.addDamage(x,y) : board.addMiss(x, y)
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  function ready() {
    wsServer.send(JSON.stringify({event: "ready", payload: {username: localStorage.nickname, gameId}}))
    setShipsReady(true)
  }

  useEffect(() => {
    wsServer.send(JSON.stringify({event: "connect", payload: {username : localStorage.nickname, gameId}}))
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
      <ActionsInfo ready={ready} canShoot={canShoot} shipsReady={shipsReady}/>
    </div>
  );
}

export default GamePage