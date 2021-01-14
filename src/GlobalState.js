
import { createContext, useState } from 'react'
import axios from 'axios'
import { SERVER_URL } from './store'

// creating Context to use as a Global State
export const MyState = createContext()

function GlobalState( props ){
  // useStates
  const [ isLogged, setIsLogged ] = useState( false )
  const [ products, setProducts ] = useState([])
  const [ searched, setSearched ] = useState([])
  const [ filtered, setFiltered ] = useState([])
  const [ headerSearched, setHeaderSearcheds ] = useState([])
  const [ booked, setBooked ] = useState({})
  const [ prodBasket, setProdBasket ] = useState([])
  
  const state = {
    userBooked: booked,
    setUserBooked: props => { setBooked(props) },
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
    },
    // searched products
    searchedProduct: searched,
    setSearchedProduct: setSearched,
    // filtered products
    filteredProduct: filtered,
    setFilteredProduct: setFiltered,
    // header searched products
    userHeaderSearched: headerSearched,
    setUserHeaderSearched: setHeaderSearcheds,
    // get basket before updating
    setUserProdBasketUpdater: async () => {
      try {
        let payload = await axios.get( `${ SERVER_URL }/product/basket/payload?user_id=${ JSON.parse( localStorage.getItem("currentUser") )._id}` )
        if( payload ){
          setProdBasket( payload.data.data.basket )
        } else {
          setProdBasket([])
        }
      } catch (err) {
        if (err) {
          console.log( err )
        }
      }
    },
    // basket product
    userProdBasket: prodBasket,
    setUserProdBasket: async prodId => {
      console.log( document.getElementById( prodId ).getAttribute("added") )
      if ( document.getElementById( prodId ).getAttribute("added") === "no" ) {
        let cominData = await axios.post( `${SERVER_URL}/product/basket?user_id=${ JSON.parse( localStorage.getItem("currentUser") )._id}&prod_id=${ prodId }`,
          { actionType:"add" }
        )
        if ( cominData ) {
          setProdBasket( cominData.data.data.basket )
        }
      } else if ( document.getElementById( prodId ).getAttribute("added") === "yes" ) {
        let cominData = await axios.post(`${SERVER_URL}/product/basket?user_id=${ JSON.parse( localStorage.getItem("currentUser") )._id}&prod_id=${ prodId }`,
          { actionType:"delete" }
        )
        if ( cominData ) {
          setProdBasket( cominData.data.data.basket )
        }
      }
    }
    // like product
    // userProductLike: productLike,
    // setUserProductLike: async _id => {
    //   let liked = await axios.post(
    //     `${ SERVER_URL }/product/like?user_id=${ JSON.parse( localStorage.getItem('currentUser') )._id }&prod_id=${ _id }`,
    //     { like: productLike }
    //   )
    //   //
    //   setProductLike( liked.data )
    // }
  }

  return (
    <MyState.Provider value={ state }>
      { props.children }
    </MyState.Provider>
  )
}

export default GlobalState