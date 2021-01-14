import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles( theme => ({
  titleShoppingCard:{
    fontFamily: "'Langar', cursive",
    fontWeight: 1000,
    color:"#fdb827",
    marginBottom: "20px",
    userSelect:"none"
  },
  quantityNum:{
    margin: "0 10px !important",
    [theme.breakpoints.up('xs')]: {
      margin: 0
    }
  },
  shoppingCardOverallSumm: {
    display: "flex",
    flexDirection: "row",
    padding:"15px",
    backgroundColor:"#000",
    justifyContent: "space-between",
    alignItems:"center"
  },
  shoppingCardOverallSummTitle: {
    fontFamily: "'Langar', cursive",
    color:"#fff",
    fontSize: "25px",
    fontWeight: "bolder",
    userSelect:"none"
  },
  shoppingCardOverallSummPrice: {
    color:"#fff",
    fontSize: "25px",
    fontWeight: "bolder",
    userSelect:"none"
  },
  buyButtonContainer:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"20px"
  },
  buyLinkButton:{
    padding:"0 10px",
    backgroundColor:"#fdb827",
  },
  buyLink:{
    userSelect:"none",
    textDecoration:"none",
    color:"#fff",
    fontWeight:"bolder",
    fontSize:"35px",
  },
  //
  dialogAppBar: {
    position: 'relative',
  },
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  placeOrderButton: {
    backgroundColor:"#000",
    userSelect:'none!important',
    textDecoration:"none",
    fontSize:"1.3em",
    fontFamily: "'Langar', cursive",
    padding:"8px",
    borderRadius:"8px",
    color:"#fff",
    transition:"0.3s",
    "&:hover":{
      backgroundColor:"#fdb827",
      color:"#000"
    }
  },
  sideTitleOwn:{
    color:"#fdb827",
    fontWeight:"bolder",
    fontSize:"40px",
    fontFamily: "'Langar', cursive",
  },
  sideAddress:{
    padding:"30px"
  },
  sideAddressCover:{
    display:"inline-block !important",
    width:"100%",
    height:"100%",
    padding:"0px",
  },
  sideAddressCoverInput:{
    width:"90%",
    margin:"15px !important"
  },
  sideCardInfo:{
    padding:"30px",
    border:"1px solid #efefef",
    borderRadius:"15px"
  },
}))