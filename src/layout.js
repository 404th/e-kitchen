//react-router-dom
import { Route, Switch } from 'react-router-dom'
//COMPONENTS
import Home from './Components/Home/home'
import ShoppingCard from './Components/ShoppingCard/shoppingCard'
import OrderSuccess from './Components/OrderSuccess/orderSuccess'
import Orders from './Components/Orders/orders'
import Profile from './Components/Profile/profile'
import Products from './Components/Products/products'
import Signup from './Components/Form/Signup/signup'
import Login from './Components/Form/Login/login'
import Error404th from './Components/Error404th/error404th'
import Display from './Components/Display/display'
// Auther for protected Components
import Auth from './auth'

function Layout(){
  return (
    <Switch>
      <Route exact path={"/"} component={ Display } />
      <Route exact path={"/home"} component={ () => Auth(Home) } />
      <Route exact path={"/profile"} component={ () => Auth(Profile) } />
      <Route exact path={"/shopping-card"} component={ () => Auth(ShoppingCard) } />
      <Route exact path={"/order-success"} component={ () => Auth(OrderSuccess) } />
      <Route exact path={"/orders"} component={ () => Auth(Orders) } />
      <Route exact path={"/products"} component={ () => Auth(Products) } />
      <Route exact path={"/user/signup"} component={ Signup } />
      <Route exact path={"/user/login"} component={ Login } />
      <Route component={ Error404th } />
    </Switch>
  )
}

export default Layout