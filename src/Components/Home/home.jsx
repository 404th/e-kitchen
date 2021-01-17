import { useContext, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
//COMPONENTS
import Sidebar from './sidebar'
import Goods from './goods'
import { useStyles } from './style/homeStyles'
import { MyState } from '../../GlobalState'

function Home(){
  // GLOBAL STATE
  const { setUserProducts, setUserProdBasketUpdater } = useContext( MyState )
  // get all products
  useEffect( () => {
    setUserProducts()
    setUserProdBasketUpdater()
  }, [] )
  // Styles
  const classes = useStyles()

  return (
    <Grid container>
      <Sidebar />
      <Grid className={ classes.goodsContainer } item xs={12} sm={8} md={9} lg={10}>
        <img className={ classes.home_background_img } src="./photos/profile/backgrouund_2.svg" alt="home_background"/>
        <Goods />
      </Grid>
    </Grid>
  )
}

export default Home