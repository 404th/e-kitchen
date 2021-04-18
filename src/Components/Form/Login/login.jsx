import { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useStyles } from '../style/formStyle'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { SERVER_URL } from '../../../store'
import { MyState } from '../../../GlobalState'

function Login (props) {
  // GLOBAL STATE
  const { setUserIsLogged, setUserProducts } = useContext( MyState )
  const classes = useStyles()
  const [ loginUser, setLoginUser ] = useState({
    email:"",
    password:"",
  })
  // LOGIN
  const handleLoginUser = e => {
    const { value, name } = e.target
    setLoginUser({
      ...loginUser,
      [name]:value
    })
  }
  // errors
  const [ errors, setErrors ] = useState({
    email:"",
    password:""
  })
  // loading
  const [ loading, setLoading ] = useState( false )
  const handleLoginUserAxios = async () => {
    try {
      // clear errors
      setErrors({
        email:"",
        password:""
      })
      // switch loading on
      setLoading( true )
      let loggedUser = await axios({
        method:"POST",
        url:`${SERVER_URL}/user/login`,
        data: loginUser
      })

      if ( loggedUser ) {
        console.log( loggedUser.data )
        localStorage.setItem( "currentUser", JSON.stringify( loggedUser.data.data ) )
        localStorage.setItem( "userToken", JSON.stringify( loggedUser.data.token ) )
        setUserIsLogged( true )
        // switch loading off
        setLoading( false )
        setUserProducts()
        // redirect to <HOME />
        props.history.push('/home')
        // clear inputs after logging in
        setLoginUser({
          email:"",
          password:""
        })
      }
    } catch (err) {
      if ( err.response && err.response.data.data.errors ){
        // switch loading off
        setLoading( false )
        let comeErrors = err.response.data.data.errors
        let errorObj = {}
        for( let i = 0; i < comeErrors.length; i++ ){
          errorObj[ comeErrors[i].param ] = comeErrors[i].msg
        }
        //set errors
        setErrors( errorObj )
        // clear errors in 4s
        setTimeout( () => {
          setErrors({
            email:"",
            password:""
          })
        }, 4000 )
      } else {
        console.log( err )
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
              name="email"
              type={"email"}
              label="Email"
              variant="outlined"
              value={ loginUser.email }
              onChange={ e => { handleLoginUser(e) } }
              error={ errors.email !== "" || errors.email === undefined }
              helperText={ errors.email !== "" || errors.email !== undefined ? errors.email : false }
              disabled={ loading }
            />
            <TextField
              className={ classes.cover__signup__container_form_ }
              id="loginPassword"
              name="password"
              type={"password"}
              label="Password"
              variant="outlined"
              value={ loginUser.password }
              onChange={ e => { handleLoginUser(e) } }
              error={ errors.password !== "" || errors.password === undefined }
              helperText={ errors.password !== "" || errors.password !== undefined ? errors.password : false }
              disabled={ loading }
            />
            <Grid className={ classes.cover__signup__container_button }>
              <Button
                className={ classes.cover__signup__container_button_clear }
                variant="contained"
                color="primary"
                onClick={ () => {
                  setLoginUser({
                    email:"",
                    password:"",
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
                onClick={ handleLoginUserAxios  }
                disabled={ loading }
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