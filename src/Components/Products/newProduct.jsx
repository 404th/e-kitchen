import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';

import { useStyles } from './style/productsStyle'
import { MyState } from '../../GlobalState'

import axios from 'axios'

import { SERVER_URL } from '../../store'

function NewProduct() {
  const classes = useStyles()
  const { setExistProducts } = useContext( MyState )

  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName:'',
    productPrice:'',
    productAbout:'',
    productCategory:'',
  });
  const handleClickOpen = () => {
    setOpen(true);
    setNewProduct({
      productName:'',
      productPrice:'',
      productAbout:'',
      productCategory:''
    })
    setErrorHelps({})
  };
  const handleClose = () => {
    setOpen(false);
    setNewProduct({
      productName:'',
      productPrice:'',
      productAbout:'',
      productCategory:''
    })
    setErrorHelps({})
  };

  // handle errors
  let [ errorHelps, setErrorHelps ] = useState({})

  // handling new Product information
  const handleSetNewProductValue = e => {
    const { value, name } = e.target
    setNewProduct({
      ...newProduct,
      [name]:value
    })
  }
  // SEND NEW Product
  const handleSendNewProduct = async () => {
    try {
      await axios.post( `${ SERVER_URL }/products`, { ...newProduct } )
        .then( async res => {
          // REFRESH PRODUCTS
          await axios.get( `${ SERVER_URL }/products` )
            .then( resp => setExistProducts( resp.data.data ) )
            .catch( err => err )
          handleClose()
        } )
        .catch( err => {
          if( err.response.data.errors.length > 0 ){
            let errors = {}
            err.response.data.errors.map( async (i) => {
              errors[ i.param ] = i.msg
            } )
            setErrorHelps( errors )
            setTimeout( () => {
              setErrorHelps({})
            }, 5000 )
          }
        } )
    } catch (err){
      if (err) return err
    }
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        New Product
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new product</DialogTitle>
        <DialogContent>
          <TextField
            className={ classes.handleSetNewProductValue }
            error={ errorHelps.productName ? true : false }
            autoFocus
            onChange={ e => { handleSetNewProductValue(e) } }
            value={ newProduct.productName }
            autoComplete={'off'}
            margin="dense"
            id="productName"
            name="productName"
            label={ errorHelps.productName ? errorHelps.productName : "Product Name" }
            type="text"
            fullWidth
          />
          <TextField
            className={ classes.handleSetNewProductValue }
            error={ errorHelps.productPrice ? true : false }
            autoFocus
            onChange={ e => { handleSetNewProductValue(e) } }
            value={ newProduct.productPrice }
            autoComplete={'off'}
            margin="dense"
            id="productPrice"
            name="productPrice"
            label={ errorHelps.productPrice ? errorHelps.productPrice : "Price ( $ )" }
            type="number"
            fullWidth
          />
          <TextField
            className={ classes.handleSetNewProductValue }
            autoFocus
            onChange={ e => { handleSetNewProductValue(e) } }
            value={ newProduct.productAbout }
            autoComplete={'off'}
            multiline
            rowsMax={6}
            margin="dense"
            id="productAbout"
            name="productAbout"
            label="About product..."
            type="text"
            fullWidth
          />
          <Select
            className={ classes.handleSetNewProductValue }
            error={ errorHelps.productCategory ? true : false }
            fullWidth
            native
            placeholder={"Category"}
            value={newProduct.productCategory}
            onChange={e => handleSetNewProductValue(e)}
            inputProps={{
              name: 'productCategory',
              id: 'productCategory',
            }}
          >
            <option>Select the category</option>
            <option value={1}>Vegetables</option>
            <option value={2}>Fruits</option>
            <option value={3}>Fast Foods</option>
            <option value={4}>Dairy</option>
            <option value={5}>Bread</option>
            <option value={6}>Seasoning and Spicis</option>
            <option value={7}>Drinks</option>
          </Select>
          {/* IMAGE ADDED SHOULD BE HERE */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={ handleSendNewProduct }
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewProduct