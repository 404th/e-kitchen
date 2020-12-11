import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  textOfFilter: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    }
  },
  sidebarHome: {
    overflow:"hidden"
  },
  goodsContainer: {
    padding:"20px",
    display:"flex",
    flexDirection:"row",
    flexWrap:'wrap',
    justifyContent:"center",
    alignItems:"center"
  }
}));