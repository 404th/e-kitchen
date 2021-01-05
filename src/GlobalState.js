
import { createContext, useState } from 'react'
import axios from 'axios'
import { SERVER_URL } from './store'

export const MyState = createContext()


function GlobalState( props ){
  // useStates
  const [ isLogged, setIsLogged ] = useState( false )
  const [ products, setProducts ] = useState({})
  
  const state = {
    // permission for User after Login
    userIsLogged: isLogged,
    setUserIsLogged: e => { setIsLogged( e ) },
    // products
    userProducts: products,
    setUserProducts: async () => {
      try {
        let comeProducts = await axios.get(`${SERVER_URL}/product`)
        if ( comeProducts ) {
          setProducts( comeProducts.data.data )
        } else {
          console.log("Products not found!")
        }
      } catch (err) {
        if ( err ) console.log( err )
      }
    }
  }
  
  return (
    <MyState.Provider value={ state }>
      { props.children }
    </MyState.Provider>
  )
}

export default GlobalState