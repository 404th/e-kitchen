import { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
// import axios from 'axios'
// import { SERVER_URL } from '../../store'

function EditProduct() {
  const [open, setOpen] = useState(false);

  const handleSetEditValue = (e) => {
    console.log( e.target )
  }

  // OPEN DIALOG
  const handleClickOpen = () => {
    setOpen(true);
  };
  // CLOSE DIALOG
  const handleClose = () => {
    setOpen(false);
  };

  const handleAcceptEditInfo = async () => {
    handleClose()
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={ () => { handleClickOpen() } }
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            onChange={ e => { handleSetEditValue(e) } }
            autoComplete={"off"}
            id="newProductName"
            name="newProductName"
            label={ "New product name" }
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            onChange={ e => { handleSetEditValue(e) } }
            autoComplete={"off"}
            id="newProductPrice"
            name="newProductPrice"
            label={ "New Price ( $ )" }
            type="number"
            fullWidth
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
            label={"About Product"}
            type="About Product"
            fullWidth
          />
          <Select
            fullWidth
            native
            placeholder={"Category"}
            onChange={e => handleSetEditValue(e)}
            inputProps={{
              name: 'newProductCategory',
              id: 'newProductCategory',
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
          {/* ADD IMG HERE */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={ () => handleAcceptEditInfo() }
            color="primary"
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProduct