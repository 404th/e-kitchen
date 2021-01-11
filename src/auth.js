import { useContext } from 'react'
import { MyState } from './GlobalState'
import { SERVER_URL } from './store'
import axios from 'axios'
import Loading from './Components/Loading/loading'

function Auth( ComposedComp ){
  // Global State
  const { userIsLogged, setUserIsLogged } = useContext( MyState )

  // checking user if logged in or not
  
  axios.get( `${SERVER_URL}/user/is-logged` )
    .then( res => {
      // setTimeout( () => {
        setUserIsLogged( res.data.data.isLogged )
        if ( !userIsLogged ) {

        }
      // }, 2000 )
    } )
    .catch( err => console.log( err ) )

  if( userIsLogged ){
    return <ComposedComp />
  } else {
    return <Loading />
  }

}

export default Auth