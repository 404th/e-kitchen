import React from 'react'
//COMPONENTS
import Good from './good'
// LOADING
// import Loading from '../Loading/loading'

function Goods() {

  // axiosdan kelgan ma'lumotlar
  let existProducts = [
    { productName:"Prod 1", productAbout:"About Prod 1", productPrice:199 },
    { productName:"Prod 2", productAbout:"About Prod 2", productPrice:299 },
    { productName:"Prod 3", productAbout:"About Prod 3", productPrice:399 },
    { productName:"Prod 4", productAbout:"About Prod 4", productPrice:499 },
  ]

  return (
    <>
      {
        existProducts.reverse().map( (good, index) => {
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