import { useState } from 'react'
import { createContext } from 'react'
// import axios from 'axios'

export const MyState = createContext()

function GlobalState( props ){
  // STATES
  const [ products, setProducts ] = useState([])
  
  const state = {
    existProducts: products,
    setExistProducts: prods => setProducts(prods)
  }
  
  return (
    <MyState.Provider value={ state }>
      { props.children }
    </MyState.Provider>
  )
}

export default GlobalState