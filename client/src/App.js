import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Login from "./pages/Login";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/game">
          <Route path=":gameId" element={<GamePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
