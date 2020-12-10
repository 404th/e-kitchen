import { useState, useEffect, useCallback, useContext } from 'react'
import { useHttp } from '../../../hook/useHttp'
import { SERVER_URL } from '../../../storage'
import { GlobalState } from '../../GlobalState'
//CSS
import "./signIn.css"
//React-router-dom
import { NavLink } from 'react-router-dom'

function SignIn(a){
  // Deleting cand_token for user
  if( localStorage.getItem("cand_token") ){
    localStorage.removeItem("cand_token")
  }
  const { setCurrentUser, setIsAuthUser } = useContext(GlobalState)
  const [ info, setInfo ] = useState({
    email:"",
    password:""
  })
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"))
    setInfo({
      email: userInfo ? userInfo.email : "",
      password:""
    })
  },[ a.history ])

  //Getting Input values to useState hook
  const handleValueInp = e => {
    const {value, name} = e.target
    setInfo({
      ...info,
      [name]:value
    })
  }
  //ERROR HELPER WORDS
  const [ errorHelps, setErrorHelps ] = useState({
    email:"",
    password:""
  })
  const helperClasses = `form-text text-muted helperErrorText`
  ///////// axios Hooks
  const { loading, information } = useHttp()

  const handleLogin = useCallback(
    async (props) => {
      try {
        const cominInfo = await information(
          `${SERVER_URL}/api/auth/login`,
          "POST",
          {...props}
        )

        await setIsAuthUser(true)
        await setCurrentUser( cominInfo.data.data )
        localStorage.setItem("cand_token", cominInfo.data.message )
        a.history.push("/home")
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
          // Setting errors
          setErrorHelps(errorObj)
          if( errors === "User unauthorized!" ){
            setErrorHelps({
              password:"Unauthorized email or password!"
            })
          }
          // Clearing errors
          setTimeout( () => setErrorHelps({
            email:"",
            password:""
          }) , 8000 )
        }
      }
    },
    [ information, a.history, setIsAuthUser, setCurrentUser ] 
  )
  return (
    <div  className="container container__cover p-lg-5 p-md-3 p-sm-1">
      <div className="container__cover_form">
        <form className="p-lg-5 p-md-4 p-sm-4">
          <div className="form-group">
            <label>Email address</label>
            <input
              onChange={ handleValueInp }
              value={info.email}
              name="email"
              type="email"
              disabled={loading}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <small className={`${helperClasses} ${ errorHelps.email ? 'helperErrorTextVisiblity' : "" }`} id="emailHelp">{`${ errorHelps["email"] }`}</small>
          </div>
          <div className="form-group mt-lg-2 mt-md-1 mt-sm-1">
            <label>Password</label>
            <input
              onChange={ handleValueInp }
              value={info.password}
              name="password"
              type="password"
              disabled={loading}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <small className={`${helperClasses} ${ errorHelps.password ? 'helperErrorTextVisiblity' : "" }`} id="emailHelp">{`${ errorHelps["password"] }`}</small>
          <div className="form__button">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
              onClick={(e) => { 
                e.preventDefault()
                handleLogin(info)
              }}>
              Sign in
            </button>
            <button
              className="btn btn-secondary"
              disabled={loading}
              type="reset"
              onClick={ () => { setInfo({
                email:"",
                password:""
              }) } }>Reset</button>
          </div>
          <div className="addition_for_signup mt-lg-5 mt-md-3 mt-sm-1">
            <p>You are not registrated yet?</p>
            <NavLink to="/signup">Sign up</NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn