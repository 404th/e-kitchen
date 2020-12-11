import React, { useState } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './style/homeStyles'


function Sidebar () {
  
  const classes = useStyles()

  let [ textToFilter, setTextToFilter ] = useState( window.innerWidth < 600 ? false : true )

  window.addEventListener( 'resize', () => { window.innerWidth > 600 ? setTextToFilter(  true ) : setTextToFilter(  false ) } )

  return (
    <>
      <Grid item xs={2} >
        <div className={classes.drawerContainer}>
          <List className={classes.sidebarHome}>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={ textToFilter ? text : "" } />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List className={classes.sidebarHome}>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={ textToFilter ? text : ""  } />
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    </>
  )
}

export default Sidebar