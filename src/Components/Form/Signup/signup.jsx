import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useStyles } from '../style/formStyle'

import { Link } from 'react-router-dom'

import axios from 'axios'
import { SERVER_URL } from '../../../store'

function Signup( props ){
  const classes = useStyles()
  const [ signupUser, setSignupUser ] = useState({
    username:"",
    email:"",
    password:"",
    passwordAgain:""
  })
  // ERRORS
  const [ errors, setErrors ] = useState({
    username:"",
    email:"",
    password:"",
    passwordAgain:""
  })
  // LOADING
  const [ loading, setLoading ] = useState( false )

  // SIGN UP
  const handleSignupUser = e => {
    const { value, name } = e.target
    setSignupUser({
      ...signupUser,
      [name]:value
    })
  }
  // SIGN UP NEW USER
  const handleSignupUserAxios = async () => {
    if ( signupUser.password === signupUser.passwordAgain ){
      try {
        // switch Loading on
        setLoading( true )
        // sign up user 
        const signedUser = await axios({
          method:"POST",
          url:`${SERVER_URL}/user/signup`,
          data: signupUser
        } )
        if ( signedUser ){
          // switch Loading off
          setLoading( false )
          // clear inputs
          setSignupUser({
            username:"",
            email:"",
            password:"",
            passwordAgain:"",
          })
        }
        // changing pathname
        props.history.push("/user/login")
        
      } catch (err) {
        console.log( err.response )
        if (err.response && err.response.data.data ) {
          // switch Loading off
          setLoading( false )
          //errors array
          let comeErrors = err.response.data.data.errors
          let errorObj = {}
          // setErrors
          for( let i = 0 ; i < comeErrors.length ; i++ ){
            errorObj[ comeErrors[i].param ] = comeErrors[i].msg
          }
          setErrors( errorObj )
        }
        // clear errors
        setTimeout( () => {
          setErrors({
            username:"",
            email:"",
            password:"",
            passwordAgain:""
          })
        }, 4000 )
      }
    } else {
      // sets error if confirmation passwords failed!
      setErrors({
        ...errors,
        passwordAgain:"Confirm password failed!"
      })
      // clear error in 4000 ms
      setTimeout( () => {
        setErrors({
          username:"",
          email:"",
          password:"",
          passwordAgain:"",
        })
      }, 4000 )
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
              id="username"
              type={"text"}
              label="Username"
              variant="outlined"
              name={"username"}
              value={ signupUser.username }
              onChange={ e => handleSignupUser(e) }
              error={ errors.username !== "" }
              helperText={ errors.username !== "" || errors.username !== undefined ? errors.username : false }
              disabled={ loading }
            />
            <TextField
              className={ classes.cover__signup__container_form_ }
              id="email"
              type={"email"}
              label="Email"
              variant="outlined"
              name={"email"}
              value={ signupUser.email }
              onChange={ e => handleSignupUser(e) }
              error={ errors.email !== "" }
              helperText={ errors.email !== "" || errors.email !== undefined ? errors.email : false }
              disabled={ loading }
            />
            <TextField
              className={ classes.cover__signup__container_form_ }
              id="password"
              type={ "password" }
              label="Password"
              variant="outlined"
              name={"password"}
              value={ signupUser.password }
              onChange={ e => handleSignupUser(e) }
              error={ errors.password !== "" }
              helperText={ errors.password !== "" || errors.password !== undefined ? errors.password : false }
              disabled={ loading }
            />
            <TextField
              className={ classes.cover__signup__container_form_ }
              id="passwordAgain"
              type={ "password" }
              label="Password again"
              variant="outlined"
              name={"passwordAgain"}
              value={ signupUser.passwordAgain }
              onChange={ e => handleSignupUser(e) }
              error={ errors.passwordAgain !== "" }
              helperText={ errors.passwordAgain !== "" || errors.passwordAgain !== undefined ? errors.passwordAgain : false }
              disabled={ loading }
            />
            <Grid className={ classes.cover__signup__container_button }>
              <Button
                className={ classes.cover__signup__container_button_clear }
                variant="contained"
                color="primary"
                onClick={ () => {
                  setSignupUser({
                    username:"",
                    email:"",
                    password:"",
                    passwordAgain:"",
                  })
                } }
                disabled={ loading }
              >
                Clear
              </Button>
              <Button
                className={ classes.cover__signup__container_button_signup }
                variant="contained"
                color="primary"
                onClick={ handleSignupUserAxios }
                disabled={ loading }
              >
                Sign up
              </Button>
            </Grid>
            <Grid className={ classes.cover__signup__container_links }>
              <Typography
                className={ classes.cover__signup__container_links_typography }
              >Have you registered?</Typography>
              <Link
                className={ classes.cover__signup__container_links_link }
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