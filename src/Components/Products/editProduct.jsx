import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function EditProduct() {
  const [open, setOpen] = React.useState(false);
  const [editedValue, setEditedValue] = React.useState({
    newProductName:"",
    newProductPrice:"",
    newProductAbout:"",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log( editedValue )
    setEditedValue({
      newProductName:"",
      newProductPrice:"",
      newProductAbout:"",
    })
  };

  const handleSetEditValue = (e) => {
    const { name, value } = e.target
    setEditedValue({
      ...editedValue,
      [name]:value
    })
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            onChange={ e => { handleSetEditValue(e) } }
            autoComplete={"off"}
            id="newProductName"
            name="newProductName"
            label="New product name"
            type="text"
            fullWidth
            value={ editedValue.editedProductName }
          />
          <TextField
            autoFocus
            margin="dense"
            onChange={ e => { handleSetEditValue(e) } }
            autoComplete={"off"}
            id="newProductPrice"
            name="newProductPrice"
            label="New Price ( $ )"
            type="number"
            fullWidth
            value={ editedValue.editedProductPrice }
          />
          <TextField
            autoFocus
            margin="dense"
            onChange={ e => { handleSetEditValue(e) } }
            autoComplete={"off"}
            multiline
            rowsMax={ 6 }
            id="newProductAbout"
            name="newProductAbout"
            label="About Product"
            type="About Product"
            fullWidth
            value={ editedValue.editedProductAbout }
          />
          {/* ADD IMG HERE */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProduct