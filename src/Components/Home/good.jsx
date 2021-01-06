import React from 'react';
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
function Good(props){

  const classes = useStyles();

  //CHECKBOXES
  // const [state, setState] = useState({
  //   checkedLike: false,
  //   checkedGood: false
  // });

  const handleChange = e => {
    console.log( e )
    // console.log( state )
    // setState({ ...state, [e.target.name]: e.target.checked });
  };
  
  return (
    <Card className={classes.root}>
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
      />
      <CardContent>
        <Typography noWrap variant="body2" color="textSecondary" component="p">
          { props.info.productAbout ? props.info.productAbout : "Not info about it" }
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Checkbox
          onChange={ e => { handleChange(e) } }
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          name="checkedLike"
        />
        <Checkbox
          onChange={ e => { handleChange(e) } }
          icon={<AddShoppingCartIcon />}
          checkedIcon={<AddShoppingCartIcon color={"primary"} />}
          name="checkedGood"
        />
      </CardActions>
    </Card>
  )
}

export default Good