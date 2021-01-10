import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles( () => ({
  error_cover:{
    width:"100%",
    height:"80vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"10px",
    boxSizing:"border-box",
  },
  error_img:{
    width:"100%",
    height:"100%",
  }
}) )