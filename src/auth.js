import { useContext } from 'react'
import { MyState } from './GlobalState'
import { SERVER_URL } from './store'
import axios from 'axios'
import LoadingComponent from './Components/Loading/loading'

function Auth( ComposedComp ){
  // Global State
  const { userIsLogged, setUserIsLogged } = useContext( MyState )

  // checking user if logged in or not
  axios.post( `${SERVER_URL}/user/is-logged`, {
    userToken: JSON.parse( localStorage.getItem("userToken") )
  } )
  .then( res => {
    // setTimeout( () => {
    setUserIsLogged( res.data.data.isLogged )
    // }, 2000 )
  } )
  .catch( err => {
    console.error( err )
  } )

  if( userIsLogged ){
    return <ComposedComp />
  } else {
    return <LoadingComponent />
  }   
}

export default Auth