import React, { useEffect } from 'react'
//COMPONENTS
import Good from './good'
import Loading from '../Loading/loading'
// REDUX
import { foodAction } from '../../actions/foodAction'

import { useSelector, useDispatch } from 'react-redux'

function Goods() {

  const food = useSelector( state => state.food )
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch( foodAction() )
  }, [] )
  
  console.log( food )
  return (
    <>
      {
        food && food.map( (good, index) => {
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