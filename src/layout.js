import { Switch, Route, Redirect } from 'react-router-dom'
//COMPONENTS
import SignIn from './Components/Form/SignIn/SignIn'
import SignUp from './Components/Form/SignUp/SignUp'
import Home from './Components/Home/Home'

function useOurRoutes( isAuth=false ){
  
  if( isAuth ){
    return (
      <Switch>
        <Route exact path={"/profile/:id"} component={ Home } />
        <Route exact path={"/home"} component={ Home } />
        <Route exact path={"/signup"} component={ SignUp } />
        <Route exact path={"/signin"} component={ SignIn } />

        <Redirect to="/signup" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path={"/signin"} component={ SignIn } />
      <Route exact path={"/signup"} component={ SignUp } />

      <Redirect to="/signup" />
    </Switch>
  )
}

export default useOurRoutes