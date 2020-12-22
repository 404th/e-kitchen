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

import { useStyles } from './style/productsStyle'
import { MyState } from '../../GlobalState'

// import { Link } from 'react-router-dom'
import axios from 'axios'
import { SERVER_URL } from '../../store'

import EditProduct from './editProduct'
import DeleteProduct from './deleteProduct'

function ProductsTable(){
  const classes = useStyles()
  const { setExistProducts, existProducts, searchedExistProducts } = useContext( MyState )

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    },
  }))(TableCell)
  // axios
  function createData(num, name, price, about) {
    return { num, name, price, about }
  }
  useEffect( () => {
    axios.get( `${ SERVER_URL }/products` )
      .then( res => setExistProducts( res.data.data ) )
      .catch( err => console.log( err ) )
  },[])

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
          { searchedExistProducts.length > 0 ? searchedExistProducts.reverse().map((pro, ind) => {
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
          }) : existProducts.reverse().map((pro, ind) => {
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
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductsTable