import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
// import { SERVER_URL } from '../../store'
// import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function DeleteProduct(){
  const classes = useStyles();
  
  const handleDeleteProduct = async () => {
    console.log( "Item deleted!" )
  }

  return (
    <IconButton
      aria-label="delete"
      className={classes.margin}
      onClick={ () => { handleDeleteProduct() } }  
    >
      <DeleteIcon
        fontSize={"default"}
      />
    </IconButton>
  )
}

export default DeleteProduct