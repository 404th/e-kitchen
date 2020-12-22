import { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'

import { SERVER_URL } from '../../store'
import { MyState } from '../../GlobalState'

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function DeleteProduct( props ){
  const classes = useStyles();

  const { setExistProducts } = useContext( MyState )

  const handleDeleteProduct = async () => {
    
    try {
      axios.post( `${ SERVER_URL }/delete-product/${ props.id }`, {} )
        .then( async res => {
          axios.get( `${ SERVER_URL }/products` )
            .then( resp => {
              setExistProducts( resp.data.data )
            } )
            .catch( err => console.log( err ) )
        } )
        .catch( err => console.log( err ) )
    } catch (err) {
      if( err ) throw err
    }
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