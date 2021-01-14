import { useState, forwardRef, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { MyState } from '../../GlobalState'
import ItemsInfo from './itemsInfo'

import { useStyles } from './style/shoppingCardStyle'

import { Link } from 'react-router-dom'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BuyButton(props){
  const classes = useStyles()
  // Global State
  const { setUserBooked } = useContext( MyState )

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setUserBooked( props )
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
  };

  // sending items to BACK
  const handleOrderItems = e => {
    handleClose()
  }

  return (
    <>
      <Button
        className={ classes.buyLinkButton }
        onClick={handleClickOpen}
        variant="contained"
      > Buy </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.dialogAppBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.dialogTitle}>
              Shopping Check
            </Typography>
            <Link
              className={ classes.placeOrderButton }
              autoFocus
              color="inherit"
              onClick={ e => { handleOrderItems(e) }}
              to={ "/order-success" }
            >
              Place order
            </Link>
          </Toolbar>
        </AppBar>
        <Container>
          <ItemsInfo />
        </Container>
      </Dialog>
    </>
  )
}

export default BuyButton