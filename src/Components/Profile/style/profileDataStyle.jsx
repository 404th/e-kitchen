

import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles( () => ({
  card: {
    width:"100%",
    height:"100%",
    backgroundColor:"rgba( 0, 0, 0, 0.0001 )",
  },
  edit_profile_title:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    color:"#1a508b",
    fontFamily: "'Nunito', sans-serif"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  profileDataInfo:{
    width:"100%",
    marginBottom:"10px",
    display:"flex",
    flexDirection:"row",
    flexWrap:"noWrap",
    justifyContent:"space-between",
    alignItems:"center"
  },
  data_itself:{
    margin:"40px",
    boxSizing:"border-box"
  }
}) )