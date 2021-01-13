
import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles({
  root: {
    transition:"0.4s",
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  // delete and add buttons
  addToBasketButtonDialog:{
    width:"100%",
    color:"#fff",
    backgroundColor:"#ff7043",
    padding:"5px",
    fontFamily:"Perpetua !important",
    border:"0",
    "&:hover":{
      backgroundColor:"#f4511e"
    },
    "&:active":{
      backgroundColor:"#bf360c"
    }
  },
  deleteFromBasketButtonDialog:{
    width:"100%",
    color:"#fff",
    backgroundColor:"#aeea00",
    padding:"5px",
    fontFamily:"Perpetua !important",
    border:"0",
    "&:hover":{
      backgroundColor:"#cddc39"
    },
    "&:active":{
      backgroundColor:"#afb42b"
    },
  }
});