import { useContext, useEffect } from 'react'
import Item from './OneItem/item'
import ItemsSkeleton from './itemsSkeleton'
import "./items.css"
import { GlobalState } from '../../GlobalState'

export default function Items() {
  const { currentGoods, setCurrentGoods } = useContext( GlobalState ) 

  useEffect( () => {
    setCurrentGoods()
  }, [] )

  return (
    <>
      {
        (!currentGoods.loading && currentGoods.data) ?
          <>
            {
              currentGoods.data.data.data.slice(0).reverse().map( item => {
                // console.log( shouldBeShowed )
                return <Item key={ item._id } {...item} />
              } )
            }
          </> :
          <ItemsSkeleton />
      }
    </>
  );
}