import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useStyles } from './style/productsStyle'

function NewProduct() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({
    productName:'',
    productPrice:'',
    productAbout:'',
  });

  const handleClickOpen = () => {
    setOpen(true);
    setNewProduct({
      productName:'',
      productPrice:'',
      productAbout:'',
    })
  };

  const handleClose = () => {
    setOpen(false);
    setNewProduct({
      productName:'',
      productPrice:'',
      productAbout:'',
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
            label="Product name"
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
            label="Price ( $ )"
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
          {/* IMAGE ADDED SHOULD BE HERE */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewProduct