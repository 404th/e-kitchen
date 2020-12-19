import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useStyles } from './style/productsStyle'

// import { Link } from 'react-router-dom'

import EditProduct from './editProduct'

function ProductsTable(){
  const classes = useStyles()

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

  function createData(num, name, price, about) {
    return { num, name, price, about };
  }
  
  const rows = [
    createData(1,'Frozen yoghurt', 159, "Very delecious food"),
    createData(2,'Ice cream sandwich', 237, "Unexpected lovely!"),
    createData(3,'Eclair', 262, "Very very very cool thing!"),
    createData(4,'Cupcake', 305, "What a beautiful!"),
    createData(5,'Gingerbread', 356, "Seriously tasty!"),
  ];

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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center">{row.num}</StyledTableCell>
              <StyledTableCell className={ classes.avatarItemInCard } component="th" scope="row">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.price}</StyledTableCell>
              <StyledTableCell className={ classes.editLinkProductCover } align="center">
                <EditProduct />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductsTable