import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useStyles } from './style/editProfileStyle'

function EditProfile() {
  // classes of style
  const classes = useStyles()

  // setting values of the form
  const [ editedProfileData, setEditedProfileData ] = useState({
    username:"",
    email:"",
    password:""
  })
  const handleSetEditedProfileData = e => {
    const { name, value } = e.target
    setEditedProfileData({
      ...editedProfileData,
      [name]: value
    })
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={ classes.edit_title }>
          <h1>Edit profile data</h1>
        </div>
      </Grid>
      <Grid item xs={12}>
        <form className={classes.formContainer} noValidate autoComplete="off">
          <TextField
            id="editedUsername"
            label="Username"
            type={"text"}
            value={ editedProfileData.username }
            name={"username"}
            className={ classes.formContainer_textField }
            onChange={ e => {handleSetEditedProfileData(e)} }
            variant="outlined"
          />
          <TextField
            id="editedEmail"
            label="Email"
            type={"email"}
            value={ editedProfileData.email }
            name={"email"}
            className={ classes.formContainer_textField }
            onChange={ e => {handleSetEditedProfileData(e)} }
            variant="outlined"
          />
          <TextField
            id="editedPassword"
            label="Password"
            type={"password"}
            value={ editedProfileData.password }
            name={"password"}
            onChange={ e => {handleSetEditedProfileData(e)} }
            className={ classes.formContainer_textField }
            variant="outlined"
          />
          <TextField
            id="checkEditedPassword"
            label="Password again"
            type={"password"}
            name={"checkEditedPassword"}
            className={ classes.formContainer_textField }
            onChange={ e => {handleSetEditedProfileData(e)} }
            variant="outlined"
          />
        </form>
      </Grid>
      <Grid item xs={12}>
        <div className={ classes.buttonCover }>
          <Button
            variant={"outlined"}
            color={"secondary"}
            onClick={ () => {
              setEditedProfileData({
                username:"",
                email:"",
                password:""
              })}
            }
          >Clear</Button>
          <Button variant={"contained"} color={"primary"}>Submit</Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default EditProfile
