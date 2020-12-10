import { useState, useContext } from 'react'
import EditInput from './EditInput'
import { GlobalState } from '../../GlobalState'
import { useHttp } from '../../../hook/useHttp'
import { SERVER_URL } from '../../../storage'

// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';

function Edit (props) {
  const { loading, information } = useHttp()
  const { currentUser, setCurrentUser } = useContext(GlobalState)
  // // Edited titled snackbar green when successfully edited popup
  // function Alert(props) {
  //   return <MuiAlert elevation={6} variant="filled" {...props} />;
  // }
  // const [openEdited, setOpenEdited] = useState(false);
  // const handleCloseEdited = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpenEdited(false);
  // };

  const [ editVal, setEditVal ] = useState({
    firstname:"",
    username:"",
    email:"",
    password:"",
    imageURL:""
  })

  //ERROR HELPER WORDS
  const [ errorHelps, setErrorHelps ] = useState({
    firstname:"",
    username:"",
    email:"",
    password:""
  })

  const handleEditData = (props) => {
    const { name, value } = props.target
    setEditVal({
      ...editVal,
      [name]:value
    })
  }

  const handleSendEditData = async editedItem => {
    
    try {
      const newItem = await information(
        `${ SERVER_URL }/api/auth/profile/${currentUser._id}`,
        "PATCH",
        editedItem,
        { "candidate_token": await localStorage.getItem('cand_token') }
      )
      await localStorage.setItem("UserInfo", JSON.stringify( newItem.data.data ))
      await localStorage.setItem("cand_token", newItem.data.message )
      document.getElementById("resetButton").click()
      document.getElementById("exitModal").click()
      // setOpenEdited(true)
      setCurrentUser( newItem.data.data )
    } catch (err) {
      // Catching errors
      if( err.response ){
        const errors = err.response.data.errors
        const errorObj = {}
        if( errors ){
          for( let i=0; i<errors.length; i++ ){
            errorObj[errors[i].param] = errors[i].msg
          }
        }
        setErrorHelps(errorObj)
        // Setting errors
        if( errors === "User unauthorized!" ){
          setErrorHelps({
            password:"Unauthorized email or password!"
          })
        }
        // Clearing errors
        setTimeout( () => setErrorHelps({
          firstname:"",
          username:"",
          email:"",
          password:""
        }) , 8000 )
      }
    }
  }

  return (
    <div {...props}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">Edit settings</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <EditInput
              onChange={ handleEditData }
              disabled={loading}
              value={editVal.firstname}
              name={"firstname"}
              forEnter={"Firstname"}
              inputId={"editInputFirstname"}
              type={"text"}
              classNames={`form-control ${ errorHelps.firstname && `inputBorderError` }`}
              ariaDescribedBy={"firstnameHelp"}
              pholder={"Enter firstname"}
              smId={"firstnameHelp"}
              smClassNames={"form-text truncate text-muted"}
              smField={ currentUser.firstname }
            />
            <EditInput
              onChange={ handleEditData }
              disabled={loading}
              value={editVal.username}
              name={"username"}
              forEnter={"Username"}
              inputId={"editInputUsername"}
              type={"text"}
              classNames={`form-control ${ errorHelps.username && `inputBorderError` }`}
              ariaDescribedBy={"usernameHelp"}
              pholder={"Enter username"}
              smId={"usernameHelp"}
              smClassNames={"form-text truncate text-muted"}
              smField={ currentUser.username }
            />
            <EditInput
              onChange={ handleEditData }
              disabled={loading}
              value={editVal.email}
              name={"email"}
              forEnter={"Email address"}
              inputId={"editInputEmail"}
              type={"text"}
              classNames={`form-control ${ errorHelps.email && `inputBorderError` }`}
              ariaDescribedBy={"emailHelp"}
              pholder={"Enter email"}
              smId={"emailHelp"}
              smClassNames={"form-text truncate text-muted"}
              smField={ currentUser.email }
            />
            <EditInput
              onChange={ handleEditData }
              disabled={loading}
              value={editVal.password}
              name={"password"}
              forEnter={"Password"}
              inputId={"editInputPassword"}
              type={"password"}
              classNames={`form-control ${ errorHelps.password && `inputBorderError` }`}
              ariaDescribedBy={"passwordHelp"}
              pholder={"Enter password"}
              smId={"passwordHelp"}
              smClassNames={"form-text truncate text-muted"}
              smField={ currentUser.password }
            />
            <EditInput
              onChange={ handleEditData }
              disabled={loading}
              value={editVal.imageURL}
              name={"imageURL"}
              forEnter={"URL avatar image"}
              inputId={"editInputImage"}
              type={"text"}
              classNames={`form-control`}
              ariaDescribedBy={"imageHelp"}
              pholder={"Enter URL image"}
              smId={"imageHelp"}
              smClassNames={"form-text truncate text-muted"}
              smField={ currentUser.imageURL }
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              id={"resetButton"}
              className="btn btn-secondary"
              onClick={ () => {
                setEditVal({
                  firstname:"",
                  username:"",
                  email:"",
                  password:"",
                  imageURL:""
                })
              } }
            >
              Reset
            </button>
            <button
              id={"exitModal"}
              disabled={loading}
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Exit
            </button>
            <button
              disabled={loading}
              type="button"
              className="btn btn-primary"
              onClick={ () => { handleSendEditData(editVal) } }
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
      {/* <Snackbar open={openEdited} autoHideDuration={6000} onClose={handleCloseEdited}>
        <Alert onClose={handleCloseEdited} severity="success">
          This is a success message!
        </Alert>
      </Snackbar> */}
    </div>
  )
}

export default Edit