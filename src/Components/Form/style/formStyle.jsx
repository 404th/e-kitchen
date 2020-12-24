import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles( theme => ({
  cover__signup:{
    width:"100%",
    height:"92vh"
  },
  cover__signup__container:{
    width:"100%",
    height:"100%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center"
  },
  cover__signup__container_header:{
    marginBottom:"10px",
    color:"#a7c5eb"
  },
  cover__signup__container_header_title:{
    padding:"10px",
    fontFamily: "'Mukta', sans-serif",
  },
  cover__signup__container_:{
    width:"450px",
    [theme.breakpoints.up('xs')]: {
      width: '340px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '360px',
    },
    [theme.breakpoints.up('md')]: {
      width: '400px',
    },
  },
  cover__signup__container_form:{
    display:"flex",
    flexDirection:"column",
    flexWrap:"no-wrap",
    justifyContent:"space-between",
    padding:"20px",
    boxShadow:"-1px 0px 28px 0px rgba(0, 0, 244, 0.33)"
  },
  cover__signup__container_form_:{
    margin:"10px",
  },
  cover__signup__container_button:{
    padding:"20px",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
  },
  // LINKS
  cover__signup__container_links:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"10px"
  },
  cover__signup__container_links_typography:{
    userSelect:'none',
    fontSize:"0.9em",
    color:"#9a9a9a"
  },
  cover__signup__container_links_link:{
    color:"#e5707e",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontSize:"0.8em"
  }
}) )