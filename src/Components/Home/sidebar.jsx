import { useState, useContext, useEffect } from 'react';
import { useStyles } from './style/homeStyles'
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { MyState } from '../../GlobalState'

// PROMISE
let items = ['Vegetables', 'Fruits', 'Fast Foods', 'Dairy', 'Bread', 'Seasoning and Spices', 'Drinks']

function Sidebar () {
  const classes = useStyles()
  // GLOBAL STATE
  const { setFilteredProduct, userProducts } = useContext( MyState )

  //SET FILTER ITEM
  const [filter, setFilter] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  // CHANGE FILTER
  const handleSetFilter = e => setFilter({ ...filter, [e.target.name]: e.target.checked })


  // set filtered products
  useEffect( () => {
    let filteredProductsToSend = []
    for ( let key in filter ){
      if ( filter[ key ] ) {
        for( let i = 0; i < userProducts.length; i++ ){
          if ( Number(key) === userProducts[i].productCategory ){
            filteredProductsToSend.push( userProducts[i] )
          } else {
            continue;
          }
        }
      } else {
        continue;
      }
    }
    // set filtered products
    setFilteredProduct( filteredProductsToSend )
  }, [ filter ] )

  //SET SELECT ALL
  const handleAllSetFilter = () => {
    setFilter({
      0: true,
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
    });
  };

  return (
    <>
      <Grid item xs={12} sm={4} md={3} lg={2} >
        <div className={classes.drawerContainer}>
          <List className={classes.sidebarHome}>
            <Typography className={ classes.filterTitle } align={"center"} color={"primary"} variant={"h3"}>Filter</Typography>
          </List>
          <Divider />
          <List className={classes.sidebarHome}>
            <Button
              variant="contained" 
              color="primary"
              onClick={ () => { handleAllSetFilter() } }
            >
              Select All
            </Button>
          </List>
          <Divider />
          {/* Filter category */}
          <FormGroup className={classes.sidebarHome} row>
            {items.map((text, index) => (
              <FormControlLabel
                className={ classes.categoryButtonTitle }
                key={ index }
                control={
                  <Switch
                    checked={ filter[ `${ index }` ] }
                    onChange={e => handleSetFilter(e)}
                    name={ `${ index }` }
                    color="primary"
                  />
                }
                label={ text }
              />
            ))}
          </FormGroup>
        </div>
      </Grid>
    </>
  )
}

export default Sidebar