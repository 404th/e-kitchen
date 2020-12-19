import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles( () => ({
  footerContainer:{
    backgroundColor:"#153e90",
  },
  footerItem1:{
    padding:"35px",
    display:"flex",
    flexDirection:'column',
    flexWrap:"nowrap",
    alignItems:"center",
    justifyContent:"space-around",
    backgroundColor:"transparent",
  },
  footerLinks:{
    userSelect:"none",
    textDecoration:"none",
    fontSize:"20px",
    padding:"12px",
    color:"#fff",
    "&:hover":{
      color:"#fc8621"
    },
    "&:active":{
      color:"#c24914"
    },
  },
  footerPhoneNums:{},
  footerPhoneNum:{
    color:"#fff",
    fontWeight:"bolder",
  },
  footerItem2:{
    backgroundColor:"transparent",
    padding:"15px",
    display:"flex",
    justifyContent:'center',
    alignItems:"center"
  },
  geolocationOurHome:{
    boxSizing:"border-box",
    width:"90%",
    minHeight:"100%",
    borderRadius:'10px'
  },

}) )

