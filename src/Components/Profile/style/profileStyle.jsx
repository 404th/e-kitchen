
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  profile:{
    position:"relative",
  },
  firstCover_div:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    boxSizing:"border-box",
    width:"100%",
    height:"100%",
    padding:"10px"
  },
  firstCover_image:{
    position:"absolute",
    top:"5%",
    left:"10%",
    zIndex:"-10",
    opacity:"0.4",
    width:"80%",
  },
  secondCover_div:{
    boxSizing:"border-box",
    width:"100%",
    height:"100%",
    padding:"10px"
  },
}));