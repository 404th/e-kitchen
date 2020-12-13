import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import ShoppingCardTable from './shoppingCardTable'

import { useStyles } from './style/shoppingCardStyle'

function ShoppingCard(){
  const classes = useStyles()

  return (
    <Container>
      <Grid container>
        <Grid className={ classes.titleShoppingCard } item xs={12}>
          <Typography className={ classes.titleShoppingCard } variant={"h2"}>
            Shopping Cart
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ShoppingCardTable />
        </Grid>
      </Grid>
    </Container>
  )
}

export default ShoppingCard