
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { useStyles } from './style/profileDataStyle'

function ProfileData() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent className={ classes.edit_profile_title }>
        <h1>Hello world!</h1>
      </CardContent>
      <CardContent>
        <div className={ classes.profileDataInfo }>
          <Typography className={ classes.data_itself } color="textSecondary">
            Username :
          </Typography>
          <Typography  variant="h5" component="h2">
            Doniyor
          </Typography>
        </div>
        <div className={ classes.profileDataInfo }>
          <Typography className={ classes.data_itself } color="textSecondary">
            Email :
          </Typography>
          <Typography  variant="h5" component="h2">
            umarov@gmail.com
          </Typography>
        </div>
        <div className={ classes.profileDataInfo }>
          <Typography className={ classes.data_itself } color="textSecondary">
            Password :
          </Typography>
          <Typography  variant="h5" component="h2">
            test123
          </Typography>
        </div>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default ProfileData
