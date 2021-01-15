import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  // truncate: {
  //     width:"80% !important",
  //     overflow: "hidden !important",
  //     textOverflow: "ellipsis !important",
  //     whiteSpace: "nowrap !important"
  // },
  root: {
    boxShadow: "0 0 15px 10px #efefef",
    width: "380px",
    minHeight: "320px",
    margin: "7px 15px",

    [theme.breakpoints.up('md')]: {
      width:"325px",
      margin: "6px 12px"
    },
    [theme.breakpoints.up('sm')]: {
      width:"300px",
      margin: "5px 10px"
    },
  },
  media: {
    position:"relative",
    paddingTop: '56.25%', // 16:9
    transition:'1s',
    "&::before":{
      content:"''",
      width:"100%",
      height:0,
      position:"absolute",
      top:0,
      left:0,
    },
    "&:hover":{
      "&::before":{
        content:"''",
        width:"100%",
        height:"100%",
        position:"absolute",
        top:0,
        left:0,
        backgroundColor: "rgba( 0, 0, 0, 0.3 )"
      }
    }
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  // for skeleton
  goodSkeletonCover:{
    width:"300px",
    minHeight:"350px",
    display:"flex",
    flexDirection:'column',
    padding:"5px",
    margin:"20px",
  },
  goodSkeletonPresser:{
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"space-between",
    margin:"10px",
  },
  //
  notFound:{
    fontSize:"80px",
    fontWeight:"bold",
    color:"#0e49b5",
    userSelect:"none",
    fontFamily: "'Nunito', sans-serif"
  },
  // delete and add buttons
  addToBasketButton:{
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
  deleteFromBasketButton:{
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
}));