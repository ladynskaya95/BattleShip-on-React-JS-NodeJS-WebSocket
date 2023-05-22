import React from 'react'

const ActionsInfo = ({shipsReady = false, canShoot = false, ready}) => {
  if (!shipsReady) {
    return <button className='btn-ready' onClick={ready}>Кораблі готові!</button>
  }

  return <div>{canShoot 
    ? <p>Стріляй!</p> 
    : <p>Вистріл суперника</p>
    }
    </div>;
}

export default ActionsInfo