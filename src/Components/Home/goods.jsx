import React, { useContext } from 'react'
//COMPONENTS
import Good from './good'
// LOADING
// import Loading from '../Loading/loading'
// GLOBAL STATE
import { MyState } from '../../GlobalState'

function Goods() {
  const { existProducts } = useContext( MyState )

  return (
    <>
      {
        existProducts.reverse(). map( (good, index) => {
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