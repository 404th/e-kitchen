import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useStyles } from '../style/formStyle'

import { Link } from 'react-router-dom'


function Login(){
  const classes = useStyles()
  const [ loginUser, setLoginUser ] = useState({
    loginEmail:"",
    loginPassword:"",
  })
  // LOGIN
  const handleLoginUser = e => {
    const { value, name } = e.target
    setLoginUser({
      ...loginUser,
      [name]:value
    })
  }

  return (
    <div className={ classes.cover__signup } >
      <Grid className={ classes.cover__signup__container }>
        <Grid className={ classes.cover__signup__container_header }>
          <Typography
            className={ classes.cover__signup__container_header_title }
            variant={"h4"}
          >LOGIN</Typography>
        </Grid>
        <Grid className={ classes.cover__signup__container_ }>
          <form
            className={ classes.cover__signup__container_form }
            noValidate
            autoComplete="off"
          >
            <TextField
              className={ classes.cover__signup__container_form_ }
              id="loginEmail"
              name="loginEmail"
              type={"email"}
              label="Email"
              variant="outlined"
              value={ loginUser.loginEmail }
              onChange={ e => { handleLoginUser(e) } }
            />
            <TextField
              className={ classes.cover__signup__container_form_ }
              id="loginPassword"
              name="loginPassword"
              type={"password"}
              label="Password"
              variant="outlined"
              value={ loginUser.loginPassword }
              onChange={ e => { handleLoginUser(e) } }
            />
            <Grid className={ classes.cover__signup__container_button }>
              <Button
                className={ classes.cover__signup__container_button_clear }
                variant="contained"
                color="primary"
                onClick={ () => {
                  setLoginUser({
                    loginEmail:"",
                    loginPassword:"",
                  })
                } }
              >
                Clear
              </Button>
              <Button
                className={ classes.cover__signup__container_button_signup }
                variant="contained"
                color="primary"
                onClick={ () => { console.log( loginUser ) } }
              >
                Login
              </Button>
            </Grid>
            <Grid className={ classes.cover__signup__container_links }>
              <Typography className={ classes.cover__signup__container_links_typography }>Have not you registered yet?</Typography>
              <Link className={ classes.cover__signup__container_links_link } to={"/user/signup"}>SIGN UP</Link>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default Login