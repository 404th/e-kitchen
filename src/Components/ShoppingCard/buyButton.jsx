import React, { useState, forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import ItemsInfo from './itemsInfo'

import { useStyles } from './style/shoppingCardStyle'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function BuyButton(){
  const classes = useStyles()

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        className={ classes.buyLinkButton }
        onClick={handleClickOpen}
        variant="contained"
        // color="primary"
      > Buy </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.dialogAppBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.dialogTitle}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Place order
            </Button>
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