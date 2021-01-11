import { useContext, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Avatar from '@material-ui/core/Avatar'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Skeleton from '@material-ui/lab/Skeleton';
import { useStyles } from './style/productsStyle'
import { MyState } from '../../GlobalState'

import EditProduct from './editProduct'
import DeleteProduct from './deleteProduct'

function ProductsTable(){
  // GLOBAL STATE
  const { userProducts, searchedProduct, setUserProducts } = useContext( MyState )
  const classes = useStyles()
  //  refresh products table
  useEffect( () => {
    setUserProducts()
  }, [] )

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    },
  }))(TableCell)

  function createData(num, name, price, about) {
    return { num, name, price, about }
  }

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    }
  }))(TableRow)

  return (
    <TableContainer className={ classes.productsTable } component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="center">Products</StyledTableCell>
            <StyledTableCell align="center">Price( $ )</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            userProducts.length > 0 ? searchedProduct.length > 0 ? searchedProduct.map((pro, ind) => {
              let row = createData( [ind+1], pro.productName, pro.productPrice, pro.productAbout )
              return (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">{row.num}</StyledTableCell>
                  <StyledTableCell className={ classes.avatarItemInCard } component="th" scope="row">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </StyledTableCell>
                  <StyledTableCell align="center" id={ pro.productName } >{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.price}</StyledTableCell>
                  <StyledTableCell className={ classes.editLinkProductCover } align="center">
                    <EditProduct id={ pro._id } />
                  </StyledTableCell>
                  <StyledTableCell className={ classes.editLinkProductCover } align="center">
                    <DeleteProduct id={ pro._id } />
                  </StyledTableCell>
                </StyledTableRow>
              )
            }) : userProducts.map((pro, ind) => {
              let row = createData( [ind+1], pro.productName, pro.productPrice, pro.productAbout )
              return (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">{row.num}</StyledTableCell>
                  <StyledTableCell className={ classes.avatarItemInCard } component="th" scope="row">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </StyledTableCell>
                  <StyledTableCell align="center" id={ pro.productName } >{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.price}</StyledTableCell>
                  <StyledTableCell className={ classes.editLinkProductCover } align="center">
                    <EditProduct id={ pro._id } />
                  </StyledTableCell>
                  <StyledTableCell className={ classes.editLinkProductCover } align="center">
                    <DeleteProduct id={ pro._id } />
                  </StyledTableCell>
                </StyledTableRow>
              )
            }) : [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map(pro => {
              return <StyledTableRow key={ pro }>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell className={ classes.avatarItemInCard } component="th" scope="row">
                <Skeleton variant={"text"} width={"100%"} height={"100%"} />
              </StyledTableCell>
              <StyledTableCell align="center">
                <Skeleton variant={"text"} width={"100%"} height={"100%"} />
              </StyledTableCell>
              <StyledTableCell align="center">
                <Skeleton variant={"text"} width={"100%"} height={"100%"} />
              </StyledTableCell>
              <StyledTableCell className={ classes.editLinkProductCover } align="center">
                <Skeleton variant={"text"} width={"100%"} height={"100%"} />
              </StyledTableCell>
              <StyledTableCell className={ classes.editLinkProductCover } align="center">
                <Skeleton variant={"text"} width={"100%"} height={"100%"} />
              </StyledTableCell>
            </StyledTableRow>
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductsTable