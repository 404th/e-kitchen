import React, { useContext } from 'react'
//COMPONENTS
import Good from './good'
// LOADING
// import Loading from '../Loading/loading'
// GLOBAL STATE
import { MyState } from '../../GlobalState'

function Goods() {
  const { foods } = useContext( MyState )

  return (
    <>
      {
        foods.map( (good, index) => {
          return (
              <Good
                key={ index }
                imgSrc={ good.imgSrc }
                aboutMeal={ good.aboutMeal }
              />
          )
        } )
      }
    </>
  );
}

export default Goods