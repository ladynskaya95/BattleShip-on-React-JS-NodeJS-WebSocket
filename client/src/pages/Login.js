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
    <div>Login</div>
  )
}

export default Login