import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
// import { MyState } from '../../GlobalState'
import { useStyles } from './style/shoppingCardStyle'

import OrderedItems from './orderedItems'

function ItemsInfo(){
  // const { userBooked } = useContext( MyState )
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
  }

  return(
    <Grid container>
      <Grid className={ classes.sideTitle } item xs={12}>
        <Typography className={ classes.sideTitleOwn }>Shipping</Typography>
      </Grid>
      <Grid className={ classes.sideAddress } item xs={12} sm={12} md={6} lg={6}>
        <div className={ classes.sideAddressCover }>
          <form className={ classes.sideAddressCoverForm }>
            <TextField
              className={classes.sideAddressCoverInput}
              onChange={ e => handleSetAddress(e) }
              name={"name"}
              value={ addressValues.name }
              label="Name"
              variant="outlined"
              id="mui-theme-provider-outlined-input1"
              autoComplete={"off"}
            />
            <TextField
              className={classes.sideAddressCoverInput}
              onChange={ e => handleSetAddress(e) }
              name={"address1"}
              value={ addressValues.address1 }
              label="Address 1"
              variant="outlined"
              id="mui-theme-provider-outlined-input2"
              autoComplete={"off"}
            />
            <TextField
              className={classes.sideAddressCoverInput}
              onChange={ e => handleSetAddress(e) }
              name={"address2"}
              value={ addressValues.address2 }
              label="Address 2"
              variant="outlined"
              id="mui-theme-provider-outlined-input3"
              autoComplete={"off"}
            />
            <TextField
              className={classes.sideAddressCoverInput}
              onChange={ e => handleSetAddress(e) }
              name={"city"}
              value={ addressValues.city }
              label="City"
              variant="outlined"
              id="mui-theme-provider-outlined-input4"
              autoComplete={"off"}
            />
            <Button variant={"outlined"} color={"primary"} onClick={ () => setAddressValues({
              name:"",
              address1:"",
              address2:"",
              city:""
            }) } >CLEAR</Button>
          </form>
        </div>
      </Grid>
      <Grid className={ classes.sideCardInfo } item xs={12} sm={12} md={6} lg={6}>
        <div className={ classes.sideCardInfoCover }>
            <Typography variant={"h5"}>Order Summary</Typography>
            <OrderedItems />
        </div>
      </Grid>
    </Grid>
  )
}

export default ItemsInfo