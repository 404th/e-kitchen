import { useContext, useState, useEffect } from 'react'
//MATERIAL-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography' 
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import LocalPharmacyRoundedIcon from '@material-ui/icons/LocalPharmacyRounded';
//react-router-dom
import { Link } from 'react-router-dom'
import { MyState } from '../../GlobalState'
import { useStyles } from './style/headerStyle'
import axios from 'axios'
import { SERVER_URL } from '../../store'

import Profile from '../Profile/profile'

function Header(){
  // Global state
  const {
    filteredProduct,
    setUserHeaderSearched,
    setUserProducts,
    setSearchedProduct,
    setFilteredProduct,
    setUserIsLogged
  } = useContext( MyState )
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setMobileMoreAnchorEl(null)
    // FOR EVERYBODY;
    setAnchorEl(null)
    handleMobileMenuClose()
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem className={ classes.menuItemLinkCover } onClick={handleMenuClose}>
        <Link className={ classes.menuItemLink } to={"/profile"}>Profile</Link>
      </MenuItem>
      <MenuItem className={ classes.menuItemLinkCover } onClick={handleMenuClose}>
        <Link className={ classes.menuItemLink } to={"/my-orders"}>My Orders</Link>
      </MenuItem>
      {/* FOR ADMINS */}
      <MenuItem className={ classes.menuItemLinkCover } onClick={handleMenuClose}>
        <Link className={ classes.menuItemLink } to={"/orders"}>Manage Orders</Link>
      </MenuItem>
      <MenuItem className={ classes.menuItemLinkCover } onClick={handleMenuClose}>
        <Link className={ classes.menuItemLink } to={"/products"}>Manage Products</Link>
      </MenuItem>
      {/* FOR EVERYBODY */}
      <MenuItem className={ classes.menuItemLinkCover } onClick={handleMenuClose}>
        <Link
          className={ classes.menuItemLink }
          to={"/user/login"}
          onClick={ () => {
            // clear cookie after logging out
            axios.get( `${ SERVER_URL }/user/logout` )
            // clear products and users after logging out
            localStorage.removeItem("currentUser")
            localStorage.removeItem("userToken")
            setFilteredProduct([])
            setUserHeaderSearched([])
            setSearchedProduct([])
            setUserProducts([])
            setUserIsLogged( false )
          } }
        >Log out</Link>
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link className={ classes.shoppingCardLink } to={"/shopping-card"}>
        <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <LocalPharmacyRoundedIcon />
              </Badge>
            </IconButton>
          <p>Items</p>
        </MenuItem>
      </Link>
      <Profile />
    </Menu>
  );
  // LIVE SEARCH PRODUCT
  const [ headerSearch, setHeaderSearch ] = useState("")
  const handleSearchProduct = e => setHeaderSearch( e.target.value )
  useEffect( () => {
    let searchedP = filteredProduct.filter( item => {
      if ( headerSearch !== "" ){
        return item.productName.match( headerSearch )
      } else {
        return false
      }
    } )
    setUserHeaderSearched( searchedP )
  }, [ headerSearch ] )
  
  // HTML
  return (
    <div className={classes.root}>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Link to={"/home"}>
              <img
                className={classes.brand}
                src={`./photos/header/food.png`}
                alt="Food"
                width={"40px"}
              />
            </Link>
            {
              window.location.pathname === "/home" ? (<div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={ e => { handleSearchProduct(e) } }
                  />
                </div>) : (<></>)
            }
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <div className={classes.user_info}>
                <Typography>
                  { localStorage.getItem('currentUser') && JSON.parse( localStorage.getItem( "currentUser" ) ).username }
                  <span> | </span>
                  { localStorage.getItem('currentUser') && JSON.parse( localStorage.getItem( "currentUser" ) ).email }
                </Typography>
              </div>
              <Link className={classes.shoppingCardLink} to={"/shopping-card"}>
                <IconButton aria-label="show 4 new mails">
                  <Badge badgeContent={4} color={"secondary"}>
                    <LocalPharmacyRoundedIcon color={"error"} />
                  </Badge>
                </IconButton>
              </Link>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        { renderMobileMenu }
        { renderMenu }
      </div>
    </div>
  )
}

export default Header