import { useState } from 'react'
//react-router-dom
import { Route, Switch } from 'react-router-dom'
//COMPONENTS
import Home from './Components/Home/home'

function Layout(){
  
  const [ Logged, setLogged ] = useState( true )
  
  return (
    <>
      {
        Logged ? <Switch>
          <Route path={"/"} component={ Home } />
        </Switch>
        : <div>"Nothing is here!"</div>
      }
    </>
  )
}

export default Layout