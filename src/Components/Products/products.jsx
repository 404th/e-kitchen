import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { useStyles } from './style/productsStyle'

import NewProduct from './newProduct'
import SearchProduct from './searchProduct'
import ProductsTable from './productsTable'

function Products() {
  const classes = useStyles()
  return (

    <Container>
      <Grid container>
        <Grid className={ classes.newProductCover } item xs={12}>
          <NewProduct />
        </Grid>
        <Grid className={ classes.searchProductCover } item xs={12}>
          <SearchProduct />
        </Grid>
        <Grid className={ classes.productsCover } item xs={12}>
          <ProductsTable />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Products
