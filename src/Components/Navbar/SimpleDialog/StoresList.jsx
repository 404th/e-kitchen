import { useContext } from 'react'
import { useHttp } from '../../../hook/useHttp'
import { GlobalState } from '../../GlobalState'
//MATERIAL-UI
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { SERVER_URL } from '../../../storage'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function StoresList(props) {
  const { allStores, setCurrentGoods } = useContext( GlobalState )
  const { information } = useHttp()

  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  //Adding item to DB
  const handleListItemClick = async (item) => {
    try {
      await information(
        `${ SERVER_URL }/stores/add`,
        "PATCH",
        {
          storeId:item._id
        },
        { "candidate_token": localStorage.getItem('cand_token') }
      )
    } catch( err ) {
      if( err ) throw err
    }

    onClose()
  };

  // Removing store from DB
  const handleListItemClickRemove = async (item) => {
    try {
      const removedStore = await information(
        `${ SERVER_URL }/stores/remove`,
        "PATCH",
        {
          storeId:item._id
        },
        { "candidate_token": localStorage.getItem('cand_token') }
      )
      if( removedStore ){
        await setCurrentGoods()
      }

    } catch( err ) {
      if( err ) throw err
    }
    onClose()
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Tap to add new Store</DialogTitle>
      <List className={"px-5"}>
        {allStores.map((item) => {
          if ( item.candidateType.includes( "admin" ) ){
            return <ListItem button key={item._id} onClick={ () => { handleListItemClickRemove(item) } } >
              <ListItemAvatar disabled={true} >
                <Avatar className={classes.avatar} src={item.imageURL} />
              </ListItemAvatar>
              <ListItemText className={"text-success mr-5"} primary={item.username} />
              <DeleteOutlineIcon />
            </ListItem>
          } else if( item.candidateType.includes("creator") ) {
            return <ListItem button disabled={true} onClick={() => handleListItemClick(item)} key={item._id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar} src={item.imageURL} />
            </ListItemAvatar>
            <ListItemText primary={item.username} />
          </ListItem>
          } else {
            return <ListItem button onClick={() => handleListItemClick(item)} key={item._id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar} src={item.imageURL} />
            </ListItemAvatar>
            <ListItemText primary={item.username} />
          </ListItem>
          }

        })}
      </List>
    </Dialog>
  )
}

export default StoresList