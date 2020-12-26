import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useStyles } from '../style/formStyle'

import { Link } from 'react-router-dom'

import axios from 'axios'
import { SERVER_URL } from '../../../store'

function Signup(props){
  const classes = useStyles()
  const [ signupUser, setSignupUser ] = useState({
    signupUsername:"",
    signupEmail:"",
    signupPhone:"",
    signupPassword:"",
    signupPasswordAgain:"",
  })
    // SIGN UP
    const handleSignupUser = e => {
      const { value, name } = e.target
      setSignupUser({
        ...signupUser,
        [name]:value
      })
    }
    // LOADING FOR NEW USER
    let [ isSavedUser, setIsSavedUser ] = useState( true )
    // SIGN UP NEW USER
    const handleSignupUserAxios = async () => {

      try {
        // setting loading ON
        setIsSavedUser( false )
        // catching SAVED USER
        let savedUser = await axios( `${ SERVER_URL }/user/signup`, {
          method:"POST",
          data:{...signupUser},
        }, err => {
          if( err ) {
            console.log( "ERROR IN AXIOS" )
            console.log(err)
          }
        } )
        // setting loading OFF
        if( savedUser ){
          props.history.push("/user/login")
          await setIsSavedUser( true )
          setSignupUser({
            signupUsername:"",
            signupEmail:"",
            signupPhone:"",
            signupPassword:"",
            signupPasswordAgain:"",
          })
          console.log( savedUser.user )
        }
      } catch (err) {
        if( err ) {
          setIsSavedUser( false )
          setSignupUser({
            signupUsername:"",
            signupEmail:"",
            signupPhone:"",
            signupPassword:"",
            signupPasswordAgain:"",
          })
        }
      }
    }

  return (
    <div className={ classes.cover__signup } >
      <Grid className={ classes.cover__signup__container }>
        <Grid className={ classes.cover__signup__container_header }>
          <Typography
            className={ classes.cover__signup__container_header_title }
            variant={"h4"}
          >SIGN UP</Typography>
        </Grid>
        <Grid className={ classes.cover__signup__container_ }>
          <form
            className={ classes.cover__signup__container_form }
            noValidate
            autoComplete="off"
          >
            <TextField
              className={ classes.cover__signup__container_form_ }
              disabled={ !isSavedUser }
              id="signupUsername"
              type={"text"}
              label="Username"
              variant="outlined"
              name={"signupUsername"}
              value={ signupUser.signupUsername }
              onChange={ e => handleSignupUser(e) }
            />
            <TextField
              className={ classes.cover__signup__container_form_ }
              disabled={ !isSavedUser }
              id="signupEmail"
              type={"email"}
              label="Email"
              variant="outlined"
              name={"signupEmail"}
              value={ signupUser.signupEmail }
              onChange={ e => handleSignupUser(e) }
            />
            <TextField
              className={ classes.cover__signup__container_form_ }
              disabled={ !isSavedUser }
              id="signupPhone"
              type={"number"}
              label="Phone number"
              variant="outlined"
              name={"signupPhone"}
              value={ signupUser.signupPhone }
              onChange={ e => handleSignupUser(e) }
            />
            <TextField
              className={ classes.cover__signup__container_form_ }
              disabled={ !isSavedUser }
              id="signupPassword"
              type={ "password" }
              label="Password"
              variant="outlined"
              name={"signupPassword"}
              value={ signupUser.signupPassword }
              onChange={ e => handleSignupUser(e) }
            />
            <TextField
              className={ classes.cover__signup__container_form_ }
              disabled={ !isSavedUser }
              id="signupPasswordAgain"
              type={ "password" }
              label="Password again"
              variant="outlined"
              name={"signupPasswordAgain"}
              value={ signupUser.signupPasswordAgain }
              onChange={ e => handleSignupUser(e) }
            />
            <Grid className={ classes.cover__signup__container_button }>
              <Button
                className={ classes.cover__signup__container_button_clear }
                disabled={ !isSavedUser }
                variant="contained"
                color="primary"
                onClick={ () => {
                  setSignupUser({
                    signupUsername:"",
                    signupEmail:"",
                    signupPhone:"",
                    signupPassword:"",
                    signupPasswordAgain:"",
                  })
                } }
              >
                Clear
              </Button>
              <Button
                className={ classes.cover__signup__container_button_signup }
                disabled={ !isSavedUser }
                variant="contained"
                color="primary"
                onClick={ handleSignupUserAxios }
              >
                Sign up
              </Button>
            </Grid>
            <Grid className={ classes.cover__signup__container_links }>
              <Typography className={ classes.cover__signup__container_links_typography }>Have you registered?</Typography>
              <Link
                className={ classes.cover__signup__container_links_link }
                disabled={ !isSavedUser }
                to={"/user/login"}
              >LOGIN</Link>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default Signup