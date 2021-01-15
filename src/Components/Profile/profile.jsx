import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './style/profileStyle'

import ProfileData from './profileData'
import EditProfile from './editProfile'

function Profile() {

  const classes = useStyles()

  return (
    <Grid container className={ classes.profileCover }>
      <img className={ classes.firstCover_image } src="./photos/profile/backgrouund_1.svg" alt="bg_image"/>
      <Grid item className={ classes.firstCover } xs={12} sm={12} md={6} lg={6}>
        <div className={ classes.firstCover_div }>
          <ProfileData />
        </div>
      </Grid>
      <Grid item className={ classes.secondCover } xs={12} sm={12} md={6} lg={6}>
        <div className={ classes.secondCover_div }>
          <EditProfile/>
        </div>
      </Grid>
    </Grid>
  )
}

export default Profile
