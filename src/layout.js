import { useContext } from 'react'
//react-router-dom
import { Redirect, Route, Switch } from 'react-router-dom'
//COMPONENTS
import Home from './Components/Home/home'
import ShoppingCard from './Components/ShoppingCard/shoppingCard'
import OrderSuccess from './Components/OrderSuccess/orderSuccess'
import Orders from './Components/Orders/orders'
import Products from './Components/Products/products'
import Signup from './Components/Form/Signup/signup'
import Login from './Components/Form/Login/login'
import Error404th from './Components/Error404th/error404th'
import Display from './Components/Display/display'

import { MyState } from './GlobalState'

function Layout(){
  // Global State
  const { userIsLogged } = useContext( MyState )

  {
    return userIsLogged ? <Switch>
      <Route exact path={"/"} component={ Display } />
      <Route exact path={"/home"} component={ Home } />
      <Route exact path={"/shopping-card"} component={ ShoppingCard } />
      <Route exact path={"/order-success"} component={ OrderSuccess } />
      <Route exact path={"/orders"} component={ Orders } />
      <Route exact path={"/products"} component={ Products } />
      <Route component={ Error404th } />
    </Switch> : <Switch>
      <Route exact path={"/user/signup"} component={ Signup } />
      <Route exact path={"/user/login"} component={ Login } />

      <Redirect to={ "/user/login" } />
    </Switch>
  }
}

export default Layout