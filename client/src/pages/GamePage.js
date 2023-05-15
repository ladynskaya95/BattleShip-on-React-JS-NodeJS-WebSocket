import React from 'react';
import { useParams } from 'react-router-dom';

const GamePage = () => {
  const {gameId} = useParams()

  return (
    <div>
      <h2>Ласкаво просимо у гру</h2>
      <div className='boards-container'>
        <div>
          
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default GamePage