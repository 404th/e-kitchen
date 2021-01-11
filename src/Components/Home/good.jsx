import { useState, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useStyles } from './style/goodStyles'
import { NOT_IMAGE } from '../../store'
import GoodDialog from './goodDialog'

import { MyState } from '../../GlobalState'

function Good(props){
  const classes = useStyles();
  // Global state
  const { setUserProductLike, userProductLike } = useContext( MyState )

  // for dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Card className={classes.root}>
      <GoodDialog
        open={open}
        handleClose={ handleClose }
        prod={ props.info }
      />
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            D
          </Avatar>
        }
        title={ props.info.productName }
        subheader={ `Price: $${props.info.productPrice}` }
      />
      <CardMedia
        className={classes.media}
        // image={ props.imgSrc }
        image={ NOT_IMAGE }
        title={ props.info.productName }
        onClick={ handleClickOpen }
      />
      <CardContent>
        <Typography noWrap variant="body2" color="textSecondary" component="p">
          { props.info.productAbout ? props.info.productAbout : "Not info about it" }
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          name="checkedLike"
          checked={ userProductLike }
          onClick={ () => {setUserProductLike( props.info._id )} }
        />
        <Checkbox
          icon={<AddShoppingCartIcon />}
          checkedIcon={<AddShoppingCartIcon color={"primary"} />}
          name="checkedGood"
        />
      </CardActions>
    </Card>
  )
}

export default Good