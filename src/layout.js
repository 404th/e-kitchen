import { useState } from 'react'
//react-router-dom
import { Route, Switch, Redirect } from 'react-router-dom'
//COMPONENTS
import Home from './Components/Home/home'
import ShoppingCard from './Components/ShoppingCard/shoppingCard'
import OrderSuccess from './Components/OrderSuccess/orderSuccess'
import Orders from './Components/Orders/orders'
import Products from './Components/Products/products'
import Signup from './Components/Form/Signup/signup'
import Login from './Components/Form/Login/login'

function Layout(){

  const [ logged, setLogged ] = useState( false )
  
  return (
    <>
      {
        logged ? <Switch>
          <Route exact path={"/"} component={ Home } />
          <Route exact path={"/shopping-card"} component={ ShoppingCard } />
          <Route exact path={"/order-success"} component={ OrderSuccess } />
          <Route exact path={"/orders"} component={ Orders } />
          <Route exact path={"/products"} component={ Products } />
          <Route exact path={"/user/signup"} component={ Signup } />
          <Route exact path={"/user/login"} component={ Login } />

          <Redirect to={"/user/login"} />
        </Switch> : <Switch>
          <Route exact path={"/user/signup"} component={ Signup } />
          <Route exact path={"/user/login"} component={ Login } />

          <Redirect to={"/user/signup"} />
        </Switch>
      }
    </>
  )
}

export default Layout