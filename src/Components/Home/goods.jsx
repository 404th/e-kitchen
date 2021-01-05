import { useContext } from 'react'
import { MyState } from '../../GlobalState'
//COMPONENTS
import Good from './good'

function Goods() {
  // GLOBAL STATE
  const { userProducts } = useContext( MyState )

  return (
    <>
      {
        userProducts.length > 0 ? userProducts.reverse().map( (good, index) => {
          return (
            <Good
              key={ index }
              info={ good }
            />
          )
        } ) : <h2>Loading!</h2>
      }
    </>
  );
}

export default Goods