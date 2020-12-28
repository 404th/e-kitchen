
import { createContext } from 'react'
// import axios from 'axios'

export const MyState = createContext()

function GlobalState( props ){
  
  const state = {}
  
  return (
    <MyState.Provider value={ state }>
      { props.children }
    </MyState.Provider>
  )
}

export default GlobalState