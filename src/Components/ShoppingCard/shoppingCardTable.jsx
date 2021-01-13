import { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import { MyState } from '../../GlobalState'
import { useStyles } from './style/shoppingCardStyle'

import BuyButton from './buyButton'

function ShoppingCardTable(){
  const classes = useStyles()
  const { userProducts, userProdBasket } = useContext( MyState )

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function createData(name, price, quantity, summ) {
    return { name, price, quantity, summ };
  }
  
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={ classes.avatarItemInCard }>
              You have 3 items
            </StyledTableCell>
            <StyledTableCell align="center">Products</StyledTableCell>
            <StyledTableCell align="center">Price( $ )</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Summ</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { userProdBasket.length > 0 && userProducts.length > 0 ? userProducts.map( prod => {
              if ( userProdBasket.includes( prod._id ) ) {
                let row = createData( prod.productName, prod.productPrice, 1, prod.productPrice*1, 12 )
                return <StyledTableRow key={row.name}>
                  <StyledTableCell className={ classes.avatarItemInCard } component="th" scope="row">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.price}</StyledTableCell>
                  <StyledTableCell align="center">
                  <Button color="primary">
                    +
                  </Button>
                  <Typography className={ classes.quantityNum } variant={"body1"}>
                    { row.quantity }
                  </Typography>
                  <Button color="secondary">
                    -
                  </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.summ}</StyledTableCell>
                </StyledTableRow>
              }
            }) : [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map(pro => {
                <StyledTableRow key={ pro }>
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
              }
            )
          }
        </TableBody>
      </Table>
      <Grid className={ classes.shoppingCardOverallSumm } item xs={12}>
          <Typography className={ classes.shoppingCardOverallSummTitle }> Overall: </Typography>
          <Typography className={ classes.shoppingCardOverallSummPrice }> $199 </Typography>
      </Grid>
      <Grid className={ classes.buyButtonContainer } item xs={12}>
        <BuyButton />
      </Grid>
    </TableContainer>
  )
}

export default ShoppingCardTable