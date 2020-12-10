import { useState, useCallback, useEffect, useContext } from 'react'
import { useHttp } from '../../../hook/useHttp'
// import { useCompDidMount } from '../../../hook/useCompDidMount'
import { GlobalState } from '../../GlobalState'

//CSS
import "./signUp.css"
// React-Router-Dom
import { NavLink } from 'react-router-dom'
import { SERVER_URL } from '../../../storage'

function SignUp(a){
  // Deleting cand_token for user
  if( localStorage.getItem("cand_token") ){
    localStorage.removeItem("cand_token")
  }
  
  const [ malumot, setMalumot ] = useState({
    firstname:"",
    username:"",
    email:"",
    password:""
  })

  const [ errorHelps, setErrorHelps ] = useState({
    firstname:"",
    username:"",
    email:"",
    password:""
  })

  const { isAuthUser, setCurrentUser } = useContext(GlobalState)

  useEffect(() => {
    if(  localStorage.getItem("UserInfo") ){
      const userInfo = JSON.parse(localStorage.getItem("UserInfo"))
      setMalumot({
        ...userInfo,
        password:""
      })
    }
    if( !isAuthUser ){
      setCurrentUser({})
    } 
  }, [ a.history ])

  // Getting input values
  const handleGetData = (e) => {
    const {name, value} = e.target
    setMalumot({
      ...malumot,
      [name]:value
    })
  }
  ///////// axios Hooks
  const { loading, information } = useHttp()

  const handlePostUser = useCallback(
    async (props) => {
      try {
        await information(
          `${SERVER_URL}/api/auth/register`,
          "POST",
          {...props}
        )
        localStorage.setItem( "UserInfo", JSON.stringify({...props, password:"*"}) )
        a.history.push("/signin")
      } catch(err) {
        // Catching errors
        if( err.response ){
          const errors = err.response.data.errors
          const errorObj = {}
          if( errors ){
            for( let i=0; i<errors.length; i++ ){
              errorObj[errors[i].param] = errors[i].msg
            }
          }
          // Setting errors
          setErrorHelps(errorObj)
          if( err.response.data.message === "This email was registered!" ){
            setErrorHelps({
              ...errorHelps,
              email:err.response.data.message
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
    },
    [ information, a.history, setErrorHelps, errorHelps ]
  )

  const helperClasses = `form-text text-muted helperErrorText`

  return (
    <div  className="container signUp_container p-lg-5 p-md-3 p-sm-1">
      <div className="signUp_container_cover">
        <form className="p-lg-5 p-md-4 p-sm-4">
          <div className="form-group">
            <label>First name</label>
            <input
              autoComplete={"off"}
              className={`form-control ${ errorHelps.firstname ? 'inputBorderError' : "" }`}
              disabled={loading}
              onChange={ (e) => {handleGetData(e)} }
              type="text"
              id="exampleInputFirstName"
              aria-describedby="firstHelp"
              value={ malumot.firstname }
              name={"firstname"}
            />
          </div>
          <small className={`${helperClasses} ${ errorHelps.firstname ? 'helperErrorTextVisiblity' : "" }`} id="emailHelp">{`${ errorHelps["firstname"] }`}</small>
          <div className="form-group">
            <label>Username</label>
            <input
              autoComplete={"off"}
              className={`form-control ${ errorHelps.username ? 'inputBorderError' : "" }`}
              disabled={loading}
              onChange={ (e) => {handleGetData(e)} }
              type="text"
              id="exampleInputUsername"
              aria-describedby="usernameHelp"
              value={ malumot.username }
              name={"username"}
            />
          </div>
          <small className={`${helperClasses} ${ errorHelps.username ? 'helperErrorTextVisiblity' : "" }`} id="emailHelp">{`${ errorHelps["username"] }`}</small>
          <div className="form-group">
            <label>Email address</label>
            <input
              autoComplete={"off"}
              className={`form-control ${ errorHelps.email ? 'inputBorderError' : "" }`}
              disabled={loading}
              onChange={ (e) => {handleGetData(e)} }
              type="email"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              value={ malumot.email }
              name={"email"}
            />
            <small className={`${helperClasses} ${ errorHelps.email ? 'helperErrorTextVisiblity' : "" }`} id="emailHelp">{`${ errorHelps["email"] }`}</small>
          </div>
          <div className="form-group mt-lg-2 mt-md-1 mt-sm-1">
            <label>Password</label>
            <input
              autoComplete={"off"}
              className={`form-control ${ errorHelps.password ? 'inputBorderError' : "" }`}
              disabled={loading}
              type="password"
              onChange={ (e) => {handleGetData(e)} }
              id="exampleInputPassword"
              value={ malumot.password }
              name={"password"}
            />
          </div>
          <small className={`${helperClasses} ${ errorHelps.password ? 'helperErrorTextVisiblity' : "" }`} id="emailHelp">{`${ errorHelps["password"] }`}</small>
          <div className="signUn__button">
            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={ (e) => {
                e.preventDefault()
                handlePostUser(malumot)
              } }>Sign up</button>
            <button
              className="btn btn-secondary"
              type="reset"
              disabled={loading}
              onClick={ () => { setMalumot({
              firstname:"",
              username:"",
              email:"",
              password:""
            }) } } >Reset</button>
          </div>
          <div className="mt-lg-5 mt-md-3 mt-sm-1">
            <p>You have been registrated?</p>
            <NavLink to="/signin">Sign in</NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp