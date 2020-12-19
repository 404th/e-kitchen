import { useState } from 'react'
//react-router-dom
import { Route, Switch } from 'react-router-dom'
//COMPONENTS
import Home from './Components/Home/home'
import ShoppingCard from './Components/ShoppingCard/shoppingCard'
import OrderSuccess from './Components/OrderSuccess/orderSuccess'
import Orders from './Components/Orders/orders'
import Products from './Components/Products/products'

function Layout(){
  
  const [ Logged, setLogged ] = useState( true )
  
  return (
    <>
      {
        Logged ? <Switch>
          <Route exact path={"/"} component={ Home } />
          <Route path={"/shopping-card"} component={ ShoppingCard } />
          <Route path={"/order-success"} component={ OrderSuccess } />
          <Route path={"/orders"} component={ Orders } />
          <Route path={"/products"} component={ Products } />
        </Switch>
        : <div>"Nothing is here!"</div>
      }
    </>
  )
}

export default Layout