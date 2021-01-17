import { useState, useContext } from 'react'
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
// import { useStyles } from './style/productsStyle'

function EditProduct(props) {
  // styles
  // const classes = useStyles()

  const { setUserProducts } = useContext( MyState )
  const [ open, setOpen ] = useState(false);
  const [ editedProduct, setEditedProduct ] = useState({
    productName:"",
    productPrice:"",
    productAbout:"",
    productCategory:""
  })
  // setting editid values
  const handleSetEditValue = (e) => {
    const { value, name } = e.target
    setEditedProduct({
      ...editedProduct,
      [name]: value
    })
  }
  // errors
  const [ errors, setErrors ] = useState({
    productName:"",
    productPrice:"",
    productAbout:"",
    productCategory:""
  })
  // loading
  const [ loading, setLoading ] = useState( false )
  const handleAcceptEditInfo = async () => {
    try {
      // switch Loading on
      setLoading( true )
      let comeData = await axios({
        method:"PATCH",
        url:`${ SERVER_URL }/product/edit?id=${ props.id }`,
        data: editedProduct
      })
      if ( comeData ){
        // refresh
        setUserProducts()
        // switch Loading off
        setLoading( false )
        // clear inputs
        setEditedProduct({
          productName:"",
          productPrice:"",
          productAbout:"",
          productCategory:""
        })
        // close popup
        handleClose()
      } else {
        console.log("Req sent but data didn't come!")
      }
    } catch (err) {
      if ( err && err.response.data.data ){
        let { errors } = err.response.data.data
        let objectErrors = {}
        for( let i = 0; i < errors.length; i++ ){
          objectErrors[ errors[i].param ] = errors[i].msg
        }
        // set errors
        setErrors( objectErrors )
        // clear errors after 4s
        setTimeout( () => {
          setErrors({
            productName:"",
            productPrice:"",
            productAbout:"",
            productCategory:""
          })
        }, 4000 )
      } else {
        console.log("No errors found!")
      }
    }
  }
  // OPEN DIALOG
  const handleClickOpen = () => {
    setOpen(true);
  };
  // CLOSE DIALOG
  const handleClose = () => {
    setEditedProduct({
      productName:"",
      productPrice:"",
      productAbout:"",
      productCategory:""
    })
    setOpen(false);
  };

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
            id="productName"
            name="productName"
            label={ "New product name" }
            type="text"
            fullWidth
            disabled={ loading }
            error={ errors.productName !== "" }
            helperText={ errors.productName !== "" || errors.productName === undefined }
          />
          <TextField
            autoFocus
            margin="dense"
            onChange={ e => { handleSetEditValue(e) } }
            autoComplete={"off"}
            id="productPrice"
            name="productPrice"
            label={ "New Price ( $ )" }
            type="number"
            fullWidth
            disabled={ loading }
            error={ errors.productPrice !== "" }
            helperText={ errors.productPrice !== "" || errors.productPrice === undefined }
          />
          <TextField
            autoFocus
            margin="dense"
            onChange={ e => { handleSetEditValue(e) } }
            autoComplete={"off"}
            multiline
            rowsMax={ 6 }
            id="productAbout"
            name="productAbout"
            label={"About Product"}
            disabled={ loading }
            type="About Product"
            fullWidth
            error={ errors.productAbout !== "" }
            helperText={ errors.productAbout !== "" || errors.productAbout === undefined }
          />
          <Select
            fullWidth
            native
            placeholder={"Category"}
            onChange={e => handleSetEditValue(e)}
            inputProps={{
              name: 'productCategory',
              id: 'productCategory',
            }}
          >
            <option>Select the category</option>
            <option value={0}>Vegetables</option>
            <option value={1}>Fruits</option>
            <option value={2}>Fast Foods</option>
            <option value={3}>Dairy</option>
            <option value={4}>Bread</option>
            <option value={5}>Seasoning and Spicis</option>
            <option value={6}>Drinks</option>
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