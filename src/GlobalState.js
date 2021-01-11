
import { createContext, useState } from 'react'
import axios from 'axios'
import { SERVER_URL } from './store'

// creating Context to use as a Global State
export const MyState = createContext()

function GlobalState( props ){
  // useStates
  const [ isLogged, setIsLogged ] = useState( false )
  const [ products, setProducts ] = useState([])
  const [ currentUser, setCurrentUser ] = useState({})
  const [ searched, setSearched ] = useState([])
  const [ filtered, setFiltered ] = useState([])
  const [ headerSearched, setHeaderSearcheds ] = useState([])
  const [ productLike, setProductLike ] = useState( false )
  const [ productBasket, setProductBasket ] = useState([])
  
  const state = {
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
    // like product
    userProductLike: productLike,
    setUserProductLike: async _id => {
      let liked = await axios.post(
        `${ SERVER_URL }/product/like?user_id=${ JSON.parse( localStorage.getItem('currentUser') )._id }&prod_id=${ _id }`,
        { like: productLike }
      )
      //
      setProductLike( liked.data.isLiked )
    }
  }

  return (
    <MyState.Provider value={ state }>
      { props.children }
    </MyState.Provider>
  )
}

export default GlobalState