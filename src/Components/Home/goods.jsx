import { useContext } from 'react'
import { MyState } from '../../GlobalState'
import Skeleton from '@material-ui/lab/Skeleton';
//COMPONENTS
import Good from './good'

import { useStyles } from './style/goodStyles'

function Goods() {
  const classes = useStyles()
  // GLOBAL STATE
  const { userProducts, filteredProduct, userHeaderSearched } = useContext( MyState )

  return (
    <>
      {
        userProducts.length > 0 ?
          filteredProduct.length > 0 ?
            userHeaderSearched.length > 0 ?
              userHeaderSearched.map( (good, index) => {
                return (
                  <Good
                    key={ index }
                    info={ good }
                  />
                )
              } ) : filteredProduct.map( (good, index) => {
                  return (
                    <Good
                      key={ index }
                      info={ good }
                    />
                  )
                } )
             : <p className={ classes.notFound }>Choose type from Filter ...</p>
           : [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map( good => {
          return (
            <div className={ classes.goodSkeletonCover } key={ good }>
              <div className={ classes.goodSkeletonPresser }>
                <Skeleton variant={"text"} width={"100%"} heigth={"35px"} />
                <Skeleton variant={"text"} width={"80%"} heigth={"35px"} />
              </div>
              <div className={ classes.goodSkeletonPresser }>
                <Skeleton variant={"rect"} width={"100%"} height={"250px"} />
              </div>
              <div className={ classes.goodSkeletonPresser }>
                <Skeleton variant={"text"} width={"80%"} heigth={"35px"} />
                <Skeleton variant={"text"} width={"100%"} heigth={"35px"} />
              </div>
            </div>
          )
        } )
      }
    </>
  );
}

export default Goods