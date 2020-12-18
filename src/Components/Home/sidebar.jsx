import { useStyles } from './style/homeStyles'
import React, { useState } from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


// PROMISE
let items = ['Vegetables', 'Fruits', 'Fast Foods', 'Dairy', 'Bread', 'Seasoning and Spices', 'Drinks']

function Sidebar () {
  const classes = useStyles()

  //SET FILTER ITEM
  const [filter, setFilter] = useState({
    checked_0: false,
    checked_1: false,
    checked_2: false,
    checked_3: false,
    checked_4: false,
    checked_5: false,
    checked_6: false,
  });

  const handleSetFilter = e => {
    setFilter({ ...filter, [e.target.name]: e.target.checked });
  };

  //SET SELECT ALL
  const handleAllSetFilter = () => {
    setFilter({
      checked_0: true,
      checked_1: true,
      checked_2: true,
      checked_3: true,
      checked_4: true,
      checked_5: true,
      checked_6: true,
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
                    checked={ filter.[`checked_${ index }`] }
                    onChange={e => handleSetFilter(e)}
                    name={ `checked_${ index }` }
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