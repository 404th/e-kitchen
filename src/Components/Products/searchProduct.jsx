import { useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import { useStyles } from './style/productsStyle'
import { MyState } from '../../GlobalState'

function SearchProduct(){
  let { existProducts, setSearchedExistProducts } = useContext( MyState )

  const classes = useStyles()

  // LIVE SEARCH
  const handleLiveSearch = e => {
    let { value } = e.target

    if( value !== "" ){
      let searchedProds = existProducts.filter( item => item.productName.indexOf( value ) > -1  )
      setSearchedExistProducts( searchedProds )
    } else {
      setSearchedExistProducts([])
    }
  }

  return (
    <TextField
      className={ classes.searchProductInput }
      label="Search..."
      variant="outlined"
      id="elastic__search"
      onChange={ e => { handleLiveSearch(e) } }
    />
  )
}

export default SearchProduct