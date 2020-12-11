import React from 'react';
import Grid from '@material-ui/core/Grid';
//COMPONENTS
import Sidebar from './sidebar'
import Goods from './goods'
import { useStyles } from './style/homeStyles'

function Home(){
  const classes = useStyles()

  return (
    <Grid container>
      <Sidebar />
      <Grid className={ classes.goodsContainer } item xs={10}>
        <Goods />
      </Grid>
    </Grid>
  )
}

export default Home