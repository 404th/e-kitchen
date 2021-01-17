import { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import { useStyles } from './style/productsStyle'
import { MyState } from '../../GlobalState'

import axios from 'axios'
import { SERVER_URL } from '../../store'

function NewProduct() {
  // Global state
  const { setUserProducts } = useContext( MyState )
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
  // loading
  const [ loading, setLoading ] = useState( false )
  // errors
  const [ errors, setErrors ] = useState({
    productName:"",
    productCategory:"",
    productPrice:""
  })
  // SEND NEW Product
  const handleSendNewProduct = async () => {

    try {
      // switch Loading on
      setLoading( true )
      // send req
      let comeProd = await axios({
        method:"POST",
        url:`${ SERVER_URL }/product/add`,
        data: newProduct
      })
      // check if prod added
      if ( comeProd ){
        // refresh products
        setUserProducts()
        // switch Loading off
        setLoading( false )
        // clear new prod inputs
        setNewProduct({
          productName:'',
          productPrice:'',
          productAbout:'',
          productCategory:'',
        })
        // close after added
        handleClose()
      } else {
        // switch Loading off
        setLoading(false)
        console.log("Req sent but not added New Prod")
      }
    } catch (err) {
      if (err && err.response.data.data.errors.length > 0 ){
        // switch Loading off 
        setLoading(false)
        // catch errors
        let { errors } = err.response.data.data
        let objectErr = {}
        for( let i = 0; i < errors.length; i++ ){
          objectErr[ errors[i].param ] = errors[i].msg
        }
        setErrors( objectErr )
        // clear errors after 4s
        setTimeout( () => {
          setErrors({
            productName:"",
            productCategory:"",
            productPrice:""
          })
        }, 4000 )
      } else {
        // switch Loading off
        setLoading( false )
        console.log( "No errors!" )
      }
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
            error={ errors.productName !== "" }
            helperText={ errors.productName !== "" || errors.productName ? errors.productName : false }
            disabled={ loading }
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
            error={ errors.productPrice !== "" }
            helperText={ errors.productPrice !== "" || errors.productPrice ? errors.productPrice : false }
            disabled={ loading }
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
            disabled={ loading }
          />
          <FormControl
            className={classes.formControl}
            error={ errors.productCategory !== "" }
            fullWidth
          >
            <Select
              className={ classes.handleSetNewProductValue }
              fullWidth
              native
              value={newProduct.productCategory}
              onChange={e => handleSetNewProductValue(e)}
              inputProps={{
                name: 'productCategory',
                id: 'productCategory',
              }}
              disabled={ loading }
            >
              <option>Select the category</option>
              <option value={0}>Vegetables</option>
              <option value={1}>Fruits</option>
              <option value={2}>Fast Foods</option>
              <option value={3}>Dairy</option>
              <option value={4}>Bread</option>
              <option value={5}>Seasoning and Spicis</option>
              <option value={6}>Drinks</option>
              {/* <MenuItem value=""> <em>Select the category</em> </MenuItem>
              <MenuItem value={1}>Vegetables</MenuItem>
              <MenuItem value={2}>Fruits</MenuItem>
              <MenuItem value={3}>Fast Foods</MenuItem>
              <MenuItem value={4}>Dairy</MenuItem>
              <MenuItem value={5}>Bread</MenuItem>
              <MenuItem value={6}>Seasoning and Spicis</MenuItem>
              <MenuItem value={7}>Drinks</MenuItem> */}
            </Select>
            <FormHelperText>{ errors.productCategory && errors.productCategory }</FormHelperText>
          </FormControl>
          {/* <Select
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
            disabled={ loading }
          >
            <option>Select the category</option>
            <option value={1}>Vegetables</option>
            <option value={2}>Fruits</option>
            <option value={3}>Fast Foods</option>
            <option value={4}>Dairy</option>
            <option value={5}>Bread</option>
            <option value={6}>Seasoning and Spicis</option>
            <option value={7}>Drinks</option>
          </Select> */}
          {/* IMAGE ADDED SHOULD BE HERE */}
          {/* ///// */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            disabled={ loading }
          >
            Cancel
          </Button>
          <Button
            onClick={ handleSendNewProduct }
            color="primary"
            disabled={ loading }
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewProduct