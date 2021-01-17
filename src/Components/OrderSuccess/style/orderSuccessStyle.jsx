import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles( theme => ({
  orderSuccessCover:{
    padding:"30px",
    height:"50vh"
  },
  orderSuccessHeaderTitle:{
    fontSize:"100px",
    color:"#21209c",
    fontFamily: "'Langar', cursive",
    [theme.breakpoints.up('md')]: {
      fontSize:"75px",
    },
    [theme.breakpoints.up('sm')]: {
      fontSize:"50px"  
    },
    [theme.breakpoints.up('xs')]: {
      fontSize:"40px"  
    },
  },
  orderSuccessTitle:{
    fontSize:"35px",
    color:"#fc8621",
    [theme.breakpoints.up('md')]: {
      fontSize:"30px",
    },
    [theme.breakpoints.up('sm')]: {
      fontSize:"25px"  
    },
    [theme.breakpoints.up('xs')]: {
      fontSize:"20px"  
    },
  },
  backgroundOrderSuccess:{
    position:"absolute",
    top:"5%",
    right:"0",
    zIndex:"-10",
    width:"60%",
    height:"60vh",
    backgroundPosition:"center",
  },
  orderSuccessButtonToHome:{
    width:"100%",
    height:"50px",
    fontSize:"24px",
    fontFamily: "'Langar', cursive",
  }
}) )