
import { makeStyles } from '@material-ui/core/styles'



export const useStyles = makeStyles( theme => ({
  edit_title:{
    width:"100%",
    minHeight:"160px",
    boxSizing:"border-box",
    padding:"20px",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    color:"#1a508b",
    fontFamily: "'Nunito', sans-serif"
  },
  formContainer:{
    width:"100%",
    minHeight:"400px",
    padding:"10px",
    boxSizing:"border-box",
    display:"flex",
    flexDirection:"column",
    flexWrap:"no-wrap",
    justifyContent:"center",
    alignItems:"center",
  },
  formContainer_textField:{
    width:"80%",
    margin:"10px",
  },
  buttonCover:{
    width:"100%",
    minHeight:"100px",
    boxSizing:"border-box",
    display:"flex",
    justifyContent:"space-around",
    alignItems:"center",
    padding:"10px 30px",
  }
}) ) 