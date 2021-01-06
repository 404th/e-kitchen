import { useStyles } from './style/footerStyle'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// import { MY_HOME_LOCATION } from '../../store'

import { Link } from 'react-router-dom'

function Footer(){
  const classes = useStyles()
  return (
    <Grid className={ classes.footerContainer } container>
      <Grid className={ classes.footerItem1 } item xs={12} sm={12} md={6} lg={6}>
        <Link className={ classes.footerLinks } to={"#"}>Menu</Link>
        <Link className={ classes.footerLinks } to={"#"}>Order</Link>
        <Link className={ classes.footerLinks } to={"#"}>Contact us</Link>
        <Link className={ classes.footerLinks } to={"#"}>Location</Link>
        <Link className={ classes.footerLinks } to={"#"}>FAQ</Link>
        <Grid className={ classes.footerPhoneNumsCover }>
          <Typography className={ classes.footerPhoneNum }>+998 93 464 20 01</Typography>
          <Typography className={ classes.footerPhoneNum }>+998 99 030 98 73</Typography>
        </Grid>
      </Grid>
      <Grid className={ classes.footerItem2 } item xs={12} sm={12} md={6} lg={6}>
        {/* <iframe
          title={ MY_HOME_LOCATION }
          className={ classes.geolocationOurHome }
          src={ MY_HOME_LOCATION }
          width="500"
          height="450"
          aria-hidden="false"
        ></iframe> */}
      </Grid>
    </Grid>
  )
}

export default Footer