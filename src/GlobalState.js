import { useState } from 'react'
import { createContext } from 'react'
// import axios from 'axios'

export const MyState = createContext()

function GlobalState( props ){
  // STATES
  const [ products, setProducts ] = useState([])
  const [ searchedProducts, setSearchedProducts ] = useState([])
  const [ searchedForClient, setSearchedForClient ] = useState([])
  
  const state = {
    existProducts: products,
    setExistProducts: prods => setProducts(prods),
    // FOR SEARCH
    searchedExistProducts: searchedProducts,
    setSearchedExistProducts: prods => setSearchedProducts(prods),
    // SEARCH FOR CLIENT
    searchedForClientHeader: searchedForClient,
    setSearchedForClientHeader: prods => setSearchedForClient(prods),
  }
  
  return (
    <MyState.Provider value={ state }>
      { props.children }
    </MyState.Provider>
  )
}

export default GlobalState