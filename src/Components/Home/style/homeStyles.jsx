import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  home_background_img:{
    position:"absolute",
    width:"80%",
    zIndex:"-10",
    opacity:"0.1",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    height:"100vh",
    zIndex:"-1",
    borderRight: "2px solid #efefef",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sidebarHome: {
    overflow:"hidden",
    display:"flex !important",
    flexDirection:"column !important",
    flexWrap:"no-wrap !important",
    padding:"15px",
    minHeight:"1px"
  },
  filterTitle:{
    fontFamily: "'Langar', cursive !important",
  },
  goodsContainer: {
    padding:"20px",
    display:"flex",
    flexDirection:"row",
    flexWrap:'wrap',
    justifyContent:"center",
    alignItems:"center"
  },
  categoryButton:{
    backgroundColor:"#98acf8"
  },
  categoryButtonTitle: {
    fontFamily: "'Langar', cursive",
    fontWeight:"1000",
  },
  truncate: {
    overflow: "hidden!important",
    textOverflow: "ellipsis!important",
    whiteSpace: "nowrap!importan"
  }
}));