import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';

import { useStyles } from './style/shoppingCardStyle'

function ItemsInfo(){
  const classes = useStyles()

  const [ addressValues, setAddressValues ] = useState({
    name:"",
    address1:"",
    address2:"",
    city:""
  })

  const handleSetAddress = e => {
    const { value, name } = e.target
    setAddressValues({
      ...addressValues,
      [name]:value
    })
    console.log( addressValues )
  }

  return(
    <Grid className={ classes.itemsCard } container>
      <Grid className={ classes.sideTitle } item xs={12}>
        <Typography className={ classes.sideTitleOwn }>Shipping</Typography>
      </Grid>
      <Grid className={ classes.sideAddress } item xs={6}>
        <div className={ classes.sideAddressCover }>
          <form className={ classes.sideAddressCoverForm }>
            <TextField
              className={classes.sideAddressCoverInput}
              onChange={ e => handleSetAddress(e) }
              name={"name"}
              value={ addressValues.name }
              label="Name"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              autoComplete={"off"}
            />
            <TextField
              className={classes.sideAddressCoverInput}
              onChange={ e => handleSetAddress(e) }
              name={"address1"}
              value={ addressValues.address1 }
              label="Address 1"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              autoComplete={"off"}
            />
            <TextField
              className={classes.sideAddressCoverInput}
              onChange={ e => handleSetAddress(e) }
              name={"address2"}
              value={ addressValues.address2 }
              label="Address 2"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              autoComplete={"off"}
            />
            <TextField
              className={classes.sideAddressCoverInput}
              onChange={ e => handleSetAddress(e) }
              name={"city"}
              value={ addressValues.city }
              label="City"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              autoComplete={"off"}
            />
          </form>
        </div>
      </Grid>
      <Grid className={ classes.sideCardInfo } item xs={6}></Grid>
    </Grid>
  )
}

export default ItemsInfo