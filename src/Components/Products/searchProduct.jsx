import TextField from '@material-ui/core/TextField';
import { useStyles } from './style/productsStyle'

function SearchProduct(){
  //LIVE SEARCH HERE
  const classes = useStyles()
  return (
    <TextField
      className={ classes.searchProductInput }
      label="Search..."
      variant="outlined"
      id="elastic__search"
      onChange={ e => { console.log(e.target.name) } }
    />
  )
}

export default SearchProduct