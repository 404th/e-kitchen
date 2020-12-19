import TextField from '@material-ui/core/TextField';

import { useStyles } from './style/productsStyle'

function SearchProduct(){
  const classes = useStyles()
  return (
    <TextField
      className={ classes.searchProductInput }
      label="Search..."
      variant="outlined"
      id="mui-theme-provider-outlined-input"
    />
  )
}

export default SearchProduct