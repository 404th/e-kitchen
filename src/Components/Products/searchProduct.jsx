
import { useContext, useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { useStyles } from './style/productsStyle'
// 
import { MyState } from '../../GlobalState'


function SearchProduct(){
  const { setSearchedProduct, userProducts } = useContext( MyState )
  const [ selectedProds, setSelectedProds ] = useState({
    elastic_search:""
  })
  // set searched products value
  const handleSearchProducts = e => setSelectedProds({ elastic_search: e.target.value })

  //
  useEffect( () => {
      let selected = userProducts.filter( item => {
        if( selectedProds.elastic_search !== "" ){
          return item.productName.match( selectedProds.elastic_search)
        } else {
          return false
        }
    })
    // set searched productions
    setSearchedProduct( selected )
  }, [ selectedProds ] )

  const classes = useStyles()
  return (
    <TextField
      className={ classes.searchProductInput }
      label="Search..."
      variant="outlined"
      id="elastic__search"
      name="elastic_search"
      value={ selectedProds.elastic_search }
      onChange={ e => { handleSearchProducts(e) } }
    />
  )
}

export default SearchProduct