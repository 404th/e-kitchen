import React, { useContext } from 'react'
//COMPONENTS
import Good from './good'
// LOADING
// import Loading from '../Loading/loading'
// GLOBAL STATE
import { MyState } from '../../GlobalState'

function Goods() {
  const { existProducts, searchedForClientHeader } = useContext( MyState )

  return (
    <>
      {
        searchedForClientHeader.length > 0 ?
        searchedForClientHeader.reverse().map( (good, index) => {
          return (
              <Good
                key={ index }
                info={ good }
              />
          )
        } ) : existProducts.reverse().map( (good, index) => {
          return (
              <Good
                key={ index }
                info={ good }
              />
          )
        } )
      }
    </>
  );
}

export default Goods