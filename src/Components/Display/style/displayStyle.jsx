import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles( theme => ({
  display_first:{
    width:"100%",
    minHeight:"100%",
    boxSizing:"border-box",
    padding:"100px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    [theme.breakpoints.up('xs')]: {
      padding:"0",
    },
    [theme.breakpoints.up('sm')]: {
      padding:"100px",
    },
    [theme.breakpoints.up('md')]: {
      padding:"40px",
    },
  },
  display_first_img:{
    width:"100%",
    height:"100%",
    userSelect:"none",
  },
  display_second_cover:{
    width:"100%",
    padding:"50px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    textAlign:"center",
    boxSizing:"border-box",
  },
  display_title_p:{
    color:"#21209c",
    fontSize:"100px",
    userSelect:"none",
    fontFamily:"'Indie Flower', cursive ",
  },
  // button
  // display_button:{
    
  // },
  // LINK
  display_button_link:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    transition:"0.4s",
    userSelect:"none",
    textDecoration:"none",
    width:"80% !important",
    height:"160px",
    color:"#fff",
    fontSize:"40px",
    fontFamily:"cursive",
    fontWeight:"bold",
    padding:"0",
    borderRadius:"100px",
    backgroundColor:"#76ead7",
    "&:hover":{
      backgroundColor:"#12cad6",
      boxShadow:"1px 1px 20px 0px #12cad6",
    },
    [theme.breakpoints.up('xs')]: {
      fontSize:"25px",
      width: "80%",
    },
    [theme.breakpoints.up('sm')]: {
      fontSize:"35px",
      width: '70%',
    },
    [theme.breakpoints.up('md')]: {
      fontSize:"40px",
      width: '75%',
    },
  }
}) )