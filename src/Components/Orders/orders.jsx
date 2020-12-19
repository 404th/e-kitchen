import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import OrdersTable from './ordersTable'

import { useStyles } from './style/ordersStyle'

function Orders(){
  const classes = useStyles()

  return (
    <Container className={ classes.ordersContainer }>
      <Grid container>
        <Grid className={ classes.titleOrders } item xs={12}>
          <Typography className={ classes.titleOrders } variant={"h2"}>
            Orders
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <OrdersTable />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Orders




