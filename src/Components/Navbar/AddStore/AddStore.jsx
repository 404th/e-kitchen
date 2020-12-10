import { useEffect } from 'react'
// MATERIAL-UI
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
//Hooks
import { useHttp } from '../../../hook/useHttp'

// CONSTS
import { SERVER_URL } from '../../../storage'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function AddStore () {
  const { information } = useHttp()

  useEffect( async () => {
    try {
      await information( `${SERVER_URL}/users`, "GET", "", JSON.parse( localStorage.getItem("UserInfo") ) )
    } catch (err) {
      if( err ) throw err
    }
  }, [] )

  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

export default AddStore