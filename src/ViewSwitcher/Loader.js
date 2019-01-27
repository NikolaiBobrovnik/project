import React from 'react'
import svg from './_assets/concern_logo.svg'

const Loader = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    background: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <img src={svg} alt='Загрузка' style={{ height: '20vh' }} />
  </div>
)

export default Loader
