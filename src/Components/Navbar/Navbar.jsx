import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./navbar.css"
import { GlobalState } from '../GlobalState'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StoresList from './SimpleDialog/StoresList'
import Edit from './EditData/Edit'
import EditError from './EditData/EditError'
import AddItem from './AddItem/AddItem'
import { SERVER_URL } from '../../storage'
import { useHttp } from '../../hook/useHttp'

function Navbar(){
  const [ isCreator, setIsCreator ] = useState(false)
  const [ isAdmin, setIsAdmin ] = useState(false)
  //Stores List
  const [open, setOpen] = useState(false);

  // GLOBALSTATE
  const { currentUser, isAuthUser, setIsAuthUser, setAllStores } = useContext(GlobalState)
  // logging out
  const handleGoToSignIn = () => {
    localStorage.removeItem("cand_token")
    localStorage.removeItem("UserInfo")
    setIsAuthUser(false)
    setAllStores([])
  }
  // for CREATOR addStore button
  useEffect( () => {
   if ( currentUser.candidateType && isAuthUser ){
    if( currentUser.candidateType.includes("creator") ){
      setIsCreator(true)
    } else {
      setIsCreator(false)
    }
   } else {
     setIsCreator(false)
   }
  }, [ currentUser, isAuthUser ] )
  // for CREATOR addItem button
  useEffect( () => {
    if ( currentUser.candidateType && isAuthUser ){
     if( currentUser.candidateType.includes("admin") ){
       setIsAdmin(true)
     } else {
       setIsAdmin(false)
     }
    } else {
      setIsAdmin(false)
    }
   }, [ currentUser, isAuthUser ] )

  // Setting store items
   const { information } = useHttp()
   const handleGettingStores = async () => {
    try {
      const items = await information(
        `${ SERVER_URL }/stores/list`,
        "GET",
        "",
        { "candidate_token": localStorage.getItem('cand_token') }
      )
      await setAllStores( items.data.data )
      setOpen(true);
    } catch(err) {
      console.log( { errors:err, message:"I am error" } )
    }
   }
 
   const handleClose = () => {
     setOpen(false);
   };

  return(
    <div className="header_cover">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/home">
          <img src="./photos/navbar/shopping-cart.svg" alt="Brand" width="60" height="60" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse ml-lg-5 ml-md-3 ml-sm-0" id="navbarsExample04">
          <ul className="navbar-nav mr-auto navbar__navigation">
            {/* <li className="nav-item navbar__navigation_item ml-lg-5 ml-md-3 ml-sm-0">
              <NavLink className="nav-link navbar__navigation_item_a" to="#">Contact us</NavLink>
            </li> */}
            <li className="nav-item dropdown navbar__navigation_item ml-lg-5 ml-md-3 ml-sm-0">
              <NavLink
                className="nav-link navbar__navigation_item_a dropdown-toggle"
                to="#" id="dropdown04"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Stores
              </NavLink>
              <div className="dropdown-menu bg-primary" aria-labelledby="dropdown04">
                <NavLink className="dropdown-item bg-primary" to="#">Saved items</NavLink>
                {/* Link for creator adding new Stores */}
                {
                  isCreator ?
                  <>
                    <NavLink
                      onClick={ handleGettingStores }
                      className={`dropdown-item bg-primary`}
                      to="#"
                      data-toggle="modal"
                      data-target="#staticBackdrop"
                    >
                      Add store
                    </NavLink>
                    <StoresList open={open} onClose={handleClose} />
                  </>
                  : ""
                }
              </div>
            </li>
            <li className="nav-item dropdown navbar__navigation_item ml-lg-5 ml-md-3 ml-sm-0">
              <NavLink
                className="nav-link navbar__navigation_item_a dropdown-toggle"
                to="#" id="dropdown04"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Form
              </NavLink>
              <div className="dropdown-menu bg-primary" aria-labelledby="dropdown04">
                <NavLink
                  className="dropdown-item bg-primary text-light"
                  onClick={ (e) => {handleGoToSignIn(e)} }
                  to="/signin"
                >
                  Sign in
                </NavLink>
                <NavLink
                  className="dropdown-item bg-primary text-danger bolder"
                  onClick={ (e) => {handleGoToSignIn(e)} }
                  to="/signup"
                >
                  Log out
                </NavLink>
              </div>
            </li>
            <li
              type="button"
              data-toggle="modal"
              data-target="#addNewItem"
              className="nav-item navbar__navigation_item ml-lg-5 ml-md-3 py-sm-4 py-4 py-md-0 py-lg-0"
            >
              {
                isAdmin ? 
                  <Button
                    style={{ float:"right", height:"100%" }}
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    Add
                  </Button> : ""
              }
            </li>
          </ul>
          <form className="form-inline mx-lg-5 mx-md-3 mx-sm-2 float-right">
            <Typography className="navbar_profile_name" variant="body2" component="span">
              { currentUser.username }
            </Typography>
            <div
              type="button"
              data-toggle="modal"
              data-target={
                `${ isAuthUser ? `#exampleModalCenter` : `#exampleModalCenter_Error` }`
              }
            >
              <Avatar
                className="navbar_profile_avatar"
                src={ currentUser.imageURL }
              />
            </div>
          </form>
        </div>
      </nav>
      {/* Pops up when edit */}
      <Edit
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      />
      {/* Pops up when not loggen in */}
      <EditError
        className="modal fade"
        id="exampleModalCenter_Error"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      />
      {/* Adding new ITEM  */}
      <AddItem
        className="modal fade"
        id="addNewItem"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      />
      {/* Pops up Stores List */}
      {/* <StoresList
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      /> */}

    </div>
  )
}

export default Navbar


