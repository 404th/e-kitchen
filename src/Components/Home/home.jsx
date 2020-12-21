import React from 'react';
import Grid from '@material-ui/core/Grid';
//COMPONENTS
import Sidebar from './sidebar'
import Goods from './goods'
import { useStyles } from './style/homeStyles'
import { MyState } from '../../GlobalState'
import { SERVER_URL } from '../../store'
import axios from 'axios'

function Home(){
  const classes = useStyles()
  const { setExistProducts, existProducts } = React.useContext( MyState )

  React.useEffect( () => {
    axios.get( `${ SERVER_URL }/products` )
      .then( res => setExistProducts( res.data.data ) )
      .catch( err => console.log( err ) )
  },[])

  return (
    <Grid container>
      <Sidebar />
      <Grid className={ classes.goodsContainer } item xs={12} sm={8} md={9} lg={10}>
        <Goods />
      </Grid>
    </Grid>
  )
}

export default Home