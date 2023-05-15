import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [invintationGame, setInvintationGame] = useState();
  const [gameId, setGameId] = useState("");
  const [nickname, setNickname] = useState("")

  const navigate = useNavigate()

  const startPlay = (e) => {
    e.preventDefault();
    if (nickname && gameId) {
      localStorage.nickname = nickname;
      navigate("/game" + gameId)
    }
  }

  return (
    <div>
      <h2>Авторизація</h2>
      <form onSubmit={startPlay}>
        <div className="field-group">
          <div>
            <label htmlFor="nickname">Ваше ім'я</label>
          </div>
          <input
            type="text"
            name="typeEnter"
            id="nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
          </div>
          <div
            onChange={(e) => setInvintationGame(e.target.id === "ingame")}
            className="field-group"
          >
            <input
              type="radio"
              name="typeEnter"
              id="gen"
              value={!invintationGame}
              defaultChecked={!invintationGame}
            />
            <label htmlFor="gen">Створити гру</label>
            <input
              type="radio"
              name="typeEnter"
              id="ingame"
              value={!invintationGame}
              defaultChecked={!invintationGame}
            />
            <label htmlFor="ingame">Увійти у гру за ідентифікатором</label>
          </div>
          <div className="field-group">
            {invintationGame ? (
              <>
              <div>
                <label htmlFor="gameId">Введіть індентифікатор гри</label>
              </div>
                <input
                  type="text"
                  name="gameId"
                  defaultValue=""
                  id="nickname"
                  onChange={(e) => setGameId(e.target.value)}
          />
              </>
            ) : (
              <>
                <button 
                  className='btn-gen'
                  onClick={(e) => {
                      e.preventDefault()
                      setGameId(Date.now())
                  }}
                >
                  Згенерувати ідентифікатор гри
                </button>
                <p>{gameId}</p>
              </>
            )}
        </div>
        <button type="submit" className='btn-ready'>ГРАТИ</button>
      </form>
    </div>
  );
}

export default Login