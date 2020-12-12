import React, { useState } from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import Grid from '@material-ui/core/Grid';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { useStyles } from './style/homeStyles'


function Sidebar () {
  
  const classes = useStyles()

  let [ textToFilter, setTextToFilter ] = useState( window.innerWidth < 600 ? false : true )

  window.addEventListener( 'resize', () => { window.innerWidth > 600 ? setTextToFilter(  true ) : setTextToFilter(  false ) } )

  return (
    <>
      <Grid item xs={2} >
        <div className={classes.drawerContainer}>
          <List className={classes.sidebarHome}>
            <Typography align={"center"} color={"primary"} variant={"h3"}>Filter</Typography>
          </List>
          <Divider />
          <List className={classes.sidebarHome}>
            <ListItem button key={"All categories"}>
              <ListItemIcon>
                <SelectAllIcon />
              </ListItemIcon>
              <ListItemText primary={ textToFilter ? "All categories" : ""  } />
            </ListItem>
          </List>
          <Divider />
          <List className={classes.sidebarHome}>
            {['Vegetables', 'Fruits', 'Fast Foods', 'Dairy', 'Bread', 'Seasoning and Spices', 'Drinks'].map((text, index) => (
              <ListItem button key={index}>
                <ListItemIcon>
                  <StorefrontIcon />
                </ListItemIcon>
                <ListItemText primary={ textToFilter ? text : ""  } />
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    </>
  )
}

export default Sidebar