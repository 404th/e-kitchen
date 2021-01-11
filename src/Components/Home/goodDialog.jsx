
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './style/goodDialogStyle'

function GoodDialog(props){

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={ props.open }
        onClose={ props.handleClose }
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{ props.prod.productName }</DialogTitle>
        <DialogContent>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {`${ props.prod.productName }'s price:`}
              </Typography>
              <Typography variant="h5" component="h2">
                {`$ ${ props.prod.productPrice }`}
              </Typography>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Likes:
              </Typography>
              <Typography variant="h5" component="h2">
                39
              </Typography>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Sold:
              </Typography>
              <Typography variant="h5" component="h2">
                102
              </Typography>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Remained:
              </Typography>
              <Typography variant="h5" component="h2">
                9
              </Typography>
            </CardContent>
            <CardActions>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                name="checkedLike"
              />
              <Checkbox
                icon={<AddShoppingCartIcon />}
                checkedIcon={<AddShoppingCartIcon color={"primary"} />}
                name="checkedGood"
              />
            </CardActions>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={ props.handleClose } color="primary">
            Cancel
          </Button>
          <Button onClick={ props.handleClose } color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GoodDialog