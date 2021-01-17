import { useContext, useState, useEffect } from 'react'
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
  const {
    userProducts,
    userProdBasket,
    setUserProducts,
    setUserProdBasketUpdater
  } = useContext( MyState )

  // refresh
  useEffect( () => {
    setUserProducts()
    setUserProdBasketUpdater()
  }, [] )

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

  // for quantity
  const [ ta, setTa ] = useState({})
  // quantity
  function quantityFunc( id, price, type, name ){
    if( type === "quantity" ){
      if( ta[id] ){
        return ta[id].n
      } else {
        setTa({ ...ta, [id]:{ n:1, o: Number(price), name } })
        return 1
      }
    } else if ( type === "overall" ) {
      if( ta[id] ){
        return ta[id].o
      } else {
        setTa({ ...ta, [id]:{ n:1, o: Number(price), name } })
        setSumm( summ + Number(price) )
        return price
      }
    }
  }
  // onClick={ () => { handleIncrementQuantity( prod._id ) } }
  const handleChangeQuantity = (prodId, price, type, name) => {
    switch ( type ){
      case "inc" :
        setTa({
          ...ta,
          [prodId]:{
            n:Number([ta[prodId].n])+1,
            o:Number(ta[prodId].o)+Number( price ),
            name
          } 
        })
        setSumm( Number(summ) + Number( price ) )
        break;
      case "dec" :
        if ( ta[prodId].n > 1 ) {
          setTa({
            ...ta,
            [prodId]:{
              n:Number([ta[prodId].n])-1,
              o:Number(ta[prodId].o)-Number( price ),
              name
            }
          })
          setSumm( Number(summ) - Number(price) )
        } else {
          setTa( ta )
        }
        break;
      default :
        setTa( ta )
        break;
    }
  }
  // summ
  const [ summ, setSumm ] = useState(0)

  //

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
                let row = createData(
                    prod.productName,
                    prod.productPrice,
                    quantityFunc( prod._id, prod.productPrice, "quantity", prod.productName ),
                    quantityFunc( prod._id, prod.productPrice, "overall", prod.productName )
                )
                return <StyledTableRow key={row.name}>
                  <StyledTableCell className={ classes.avatarItemInCard } component="th" scope="row">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.price}</StyledTableCell>
                  <StyledTableCell align="center">
                  <Button
                    color="primary"
                    onClick={ () => { handleChangeQuantity( prod._id, prod.productPrice, "inc", prod.productName ) } }  
                  >
                    +
                  </Button>
                  <Typography className={ classes.quantityNum } variant={"body1"}>
                    { row.quantity }
                  </Typography>
                  <Button
                    color="secondary"
                    onClick={ () => { handleChangeQuantity( prod._id, prod.productPrice, "dec", prod.productName ) } }
                  >
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
        <Typography className={ classes.shoppingCardOverallSummPrice }> $ { summ } </Typography>
      </Grid>
      <Grid
        className={ classes.buyButtonContainer }
        item
        xs={12}
      >
        <BuyButton summ={summ} ta={ta} />
      </Grid>
    </TableContainer>
  )
}

export default ShoppingCardTable