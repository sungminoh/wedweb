import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Snowfall from 'react-snowfall'


const Snow = () => {
  const { width, height } = useWindowSize()
  return (
    <Snowfall
      // Changes the snowflake color
      color="#F3CFC6"
      // Applied to the canvas element
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 9999
      }}
      // Controls the number of snowflakes that are created (default 150)
      snowflakeCount={50}
      speed={[0.2, 0.5]}
      wind={[-0.5, 0.5]}
    />
  )
}

export default  Snow