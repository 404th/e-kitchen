import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import axios from 'axios'
import { SERVER_URL } from '../../store'
import { MyState } from '../../GlobalState'

function EditProduct( props ) {
  const [open, setOpen] = useState(false);
  const [shouldBeInputted, setShouldBeInputted] = useState({});

  const [editedValue, setEditedValue] = useState({
    newProductName:"",
    newProductPrice:"",
    newProductAbout:"",
    newProductCategory:"",
  });

  const handleSetEditValue = (e) => {
    const { name, value } = e.target
    setEditedValue({
      ...editedValue,
      [name]:value
    })
  }

  // OPEN DIALOG
  const handleClickOpen = () => {
    setOpen(true);
  };
  // CLOSE DIALOG
  const handleClose = () => {
    setOpen(false);
    setEditedValue({
      newProductName:"",
      newProductPrice:"",
      newProductAbout:"",
      newProductCategory:"",
    })
    setShouldBeInputted({})
  };

  // GLOBAL STATE
  const { existProducts, setExistProducts } = useContext( MyState )
  // HANDLE SET DEFAULT VALUES
  const handleSetDefaultValues = async () => {

    let chosenProduct = await existProducts.find( item => item._id === props.id )
    if( chosenProduct ){
      setShouldBeInputted( chosenProduct )
      setEditedValue({
        newProductName: chosenProduct.productName,
        newProductPrice: chosenProduct.productPrice,
        newProductAbout: chosenProduct.productAbout,
        newProductCategory: chosenProduct.productCategory,
      })
      handleClickOpen()
    }
  }

  // SET ERRORS
  let [ errorHelps, setErrorHelps ] = useState({})

  const handleAcceptEditInfo = async () => {
    try {
      axios.patch( `${ SERVER_URL }/edit-product/${ props.id }`, { ...editedValue } )
        .then( async res => {
          axios.get( `${ SERVER_URL }/products` )
            .then( resp => setExistProducts( resp.data.data ) )
            .catch( err => console.log( err ) )
            handleClose()
          })
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
    } catch (err) {
      if (err) console.log( err )
    }
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={ () => handleSetDefaultValues() }
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
            error={ errorHelps.newProductName ? true : false }
            label={ errorHelps.newProductName ? errorHelps.newProductName : "New product name"}
            type="text"
            fullWidth
            defaultValue={ shouldBeInputted && shouldBeInputted.productName }
            value={ editedValue.editedProductName }
          />
          <TextField
            autoFocus
            margin="dense"
            onChange={ e => { handleSetEditValue(e) } }
            autoComplete={"off"}
            id="newProductPrice"
            name="newProductPrice"
            error={ errorHelps.newProductPrice ? true : false }
            label={ errorHelps.newProductPrice ? errorHelps.newProductPrice : "New Price ( $ )"}
            type="number"
            fullWidth
            defaultValue={ shouldBeInputted && shouldBeInputted.productPrice }
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
            label={"About Product"}
            type="About Product"
            fullWidth
            defaultValue={ shouldBeInputted && shouldBeInputted.productAbout }
            value={ editedValue.editedProductAbout }
          />
          <Select
            fullWidth
            native
            placeholder={"Category"}
            error={ errorHelps.newProductCategory ? true : false }
            value={editedValue.newProductCategory}
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