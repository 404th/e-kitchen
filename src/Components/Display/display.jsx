import { useStyles } from './style/displayStyle'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

function Display(){

  const classes = useStyles()

  return (
    <Grid container>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <div className={ classes.display_first }>
          <img className={ classes.display_first_img } src="./photos/display/display_1.svg" alt="Just emoji"/>
        </div>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <div className={ classes.display_second_cover }>
          <p className={ classes.display_title_p }> Welcome, <br/> to our shop! </p>
          <Link
            className={ classes.display_button_link }
            to={ "/user/signup" }
          >
            Get started
          </Link>
        </div>
      </Grid>
    </Grid>
  )
}

export default Display