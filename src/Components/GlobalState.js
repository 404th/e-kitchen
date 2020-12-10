import { useState } from 'react'
import { createContext } from "react"
import { useHttp } from '../hook/useHttp'
import { SERVER_URL } from '../storage'

export const GlobalState = createContext()

function Cover(props){

  const [ currentUserData, setCurrentUserData ] = useState({})
  const [ goodsData, setGoodsData ] = useState({})
  const [ isAuth, setIsAuth ] = useState(false)
  
  const [ allStoresIn, setAllStoresIn ] = useState([])
  const [filter, setFilter] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
    checkedE: true
  });
  const [ availableGoods, setAvailableGoods ] = useState([])
  
  // axios
  const { loading, information } = useHttp()
  
  // GLOBAL STATE
  const state = {
    currentGoods:goodsData,
    setCurrentGoods: async () => {
      try {
        const cominGoodsData = await information(
          `${ SERVER_URL }/profile/items`,
          "POST",
          { storeId: currentUserData._id },
          { "candidate_token": localStorage.getItem('cand_token') }
        )
        setGoodsData({ loading, data:cominGoodsData})
      } catch (err) {
        if(err) throw err
      }
    },
    currentUser: currentUserData,
    setCurrentUser: props => {
      setCurrentUserData(props)
    },
    isAuthUser: isAuth,
    setIsAuthUser: props => {
      setIsAuth(props)
    },
    allStores: allStoresIn,
    setAllStores: props => {
      setAllStoresIn( props )
    },
    goodsFilter:filter,
    setGoodsFilter: async (e) => {
      await setFilter({ ...filter, [e.target.name]: e.target.checked });
    },
    setGoodsFilterAll: (e) => {
      if( e.target.checked ){
        setFilter({ 
          checkedA: true,
          checkedB: true,
          checkedC: true,
          checkedD: true,
          checkedE: true
        })
      } else {
        setFilter({
          checkedA: false,
          checkedB: false,
          checkedC: false,
          checkedD: false,
          checkedE: false
        })
    }
    },
    nowAvailable: availableGoods,
    setNowAvailable: (props) => {
      setAvailableGoods(props)
    }
  }

  return (
    <GlobalState.Provider value={state} >
      { props.children }
    </GlobalState.Provider>
  )
}

export default Cover






