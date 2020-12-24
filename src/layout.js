import { useState } from 'react'
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

function Layout(){
  
  const [ Logged, setLogged ] = useState( false )
  
  return (
    <>
      {
        Logged ? <Switch>
          <Route exact path={"/"} component={ Home } />
          <Route exact path={"/shopping-card"} component={ ShoppingCard } />
          <Route exact path={"/order-success"} component={ OrderSuccess } />
          <Route exact path={"/orders"} component={ Orders } />
          <Route exact path={"/products"} component={ Products } />
          <Route exact path={"/signup"} component={ Signup } />
          <Route exact path={"/login"} component={ Login } />

          <Redirect to={"/login"} />
        </Switch>
        : <Switch>
          <Route exact path={"/signup"} component={ Signup } />
          <Route exact path={"/login"} component={ Login } />
          <Redirect to={"/signup"} />
        </Switch>
      }
    </>
  )
}

export default Layout