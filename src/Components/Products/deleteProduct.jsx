import { useContext, useState } from 'react'
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
  // Global state
  const { setUserProducts } = useContext( MyState )
  const classes = useStyles();
  
  const [ loading, setLoading ] = useState( false )
  const handleDeleteProduct = async () => {
    try {
      let deletedProd = await axios({
        method:"DELETE",
        url:`${ SERVER_URL }/product/delete?id=${ props.id }`
      })
      // loading
      if ( deletedProd ){
        // refresh
        setUserProducts()
        // switch Loading on
        setLoading( true )
      } else {
        console.log( "Req sent but data not catch!" )
      }
    } catch (err) {
      if (err){
        console.log( err )
      }
    }
  }

  return (
    <IconButton
      aria-label="delete"
      className={ classes.margin }
      onClick={ () => { handleDeleteProduct() } }
      disabled={ loading }
    >
      <DeleteIcon fontSize={"default"} />
    </IconButton>
  )
}

export default DeleteProduct