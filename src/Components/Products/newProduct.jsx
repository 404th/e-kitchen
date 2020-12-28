import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';

import { useStyles } from './style/productsStyle'

// import axios from 'axios'
// import { SERVER_URL } from '../../store'

function NewProduct() {
  const classes = useStyles()

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
  };
  const handleClose = () => {
    setOpen(false);
    setNewProduct({
      productName:'',
      productPrice:'',
      productAbout:'',
      productCategory:''
    })
  };

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
    console.log( "New product added!" )
    console.log( newProduct )
    handleClose()
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
            autoFocus
            onChange={ e => { handleSetNewProductValue(e) } }
            value={ newProduct.productName }
            autoComplete={'off'}
            margin="dense"
            id="productName"
            name="productName"
            label={ "Product Name" }
            type="text"
            fullWidth
          />
          <TextField
            className={ classes.handleSetNewProductValue }
            autoFocus
            onChange={ e => { handleSetNewProductValue(e) } }
            value={ newProduct.productPrice }
            autoComplete={'off'}
            margin="dense"
            id="productPrice"
            name="productPrice"
            label={ "Price ( $ )" }
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