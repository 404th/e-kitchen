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
import { MyState } from '../../GlobalState'
import { useStyles } from './style/ordersTableStyle'

function OrdersTable(){
  // style object
  const classes = useStyles()
  // GLOBAL STATE
  const { setUserProducts } = useContext( MyState )
  //
  useEffect( () => {
    setUserProducts()
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
  
  
  // BOUGHT TIME
  function boughtTimeStamper(){
    let day = new Date().getDay()
    let month = new Date().getMonth()
    let year = new Date().getFullYear()
    let hours = new Date().getHours()
    let mins = new Date().getMinutes()
    return ( `${ day }/${ month }/${ year } at ${hours}:${mins}` )
  }

  function createData(customerName, date, overallSumm) {
    return { customerName, date, overallSumm};
  }
  // SHOULD BE API HERE
  const rows = [
    createData('John Smith', boughtTimeStamper(), 999),
    createData('Ice cream sandwich', boughtTimeStamper(), 99),
    createData('Eclair', boughtTimeStamper(), 199),
    createData('Cupcake', boughtTimeStamper(), 69),
    createData('Gingerbread', boughtTimeStamper(), 89),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={ classes.avatarItemInCard }></StyledTableCell>
            <StyledTableCell align="center">Customer</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Overall</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 && rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell className={ classes.avatarItemInCard } component="th" scope="row">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </StyledTableCell>
              <StyledTableCell align="center">{row.customerName}</StyledTableCell>
              <StyledTableCell align="center">{row.date}</StyledTableCell>
              <StyledTableCell align="center">{row.overallSumm}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrdersTable