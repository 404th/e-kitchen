import { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { notAvImage } from '../../../../storage'
import { GlobalState } from '../../../GlobalState'
import { useHttp } from '../../../../hook/useHttp'
import { SERVER_URL } from '../../../../storage'
//Aos
import "aos/dist/aos.css"
import AOS from 'aos'

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  }
})

function Item (props) {
  const { information } = useHttp()
  const { currentUser, setCurrentGoods } = useContext( GlobalState )

  const classes = useStyles()
  
  const [state, setState] = useState({
    checkedK: false,
    checkedJ: false
  })
  const handleSetValue = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleDeleteOwnItem = async () => {
    try {
      const notExist = await information(
        `${ SERVER_URL }/profile/items/delete/${ props._id }`,
        "POST",
        { storeId: props.storeId },
        { candidate_token: localStorage.getItem('cand_token') }
      )

      if( notExist ){
        setCurrentGoods()
      }
    } catch (err) {
      if ( err ) throw err
    }
  }

  //Aos
  useEffect( () => {
    AOS.init({
      offset: 200,
      duration: 400,
      easing: 'linear',
      delay: 100,
      disable: 'mobile'
    })
  }, [] )

  return (
    <Card className={`${classes.root} item_card`} data-aos="fade-up" data-aos-once="true" >
      <CardActionArea>
        <CardMedia
          className="p-3"
          component="img"
          alt="Laptop"
          width={"100%"}
          height={"350"}
          image={ props.good_imageURL !== "" ? props.good_imageURL : notAvImage }
          title="Just a laptop"
        />
        <CardContent>
          <Typography className={"descriptionGood"} gutterBottom variant="h4" component="h2">
            { props.name }
          </Typography>
          <Typography className={"descriptionGood"} variant="body2" color={"secondary"} component="p">
            { props.description }
          </Typography>
          <Typography variant="h5" component="h5">
            $ { props.price }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedK" />
        <Checkbox
          checked={state.checkedJ}
          onChange={handleSetValue}
          name="checkedJ"
        />
        {
          props.storeId === currentUser._id ? <IconButton
            aria-label="delete"
            onClick={ handleDeleteOwnItem }
          >
          <DeleteIcon />
        </IconButton> : ``
        }
      </CardActions>
    </Card>
  )
}

export default Item