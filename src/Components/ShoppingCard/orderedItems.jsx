import { useContext, Fragment } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { MyState } from '../../GlobalState'

import { useStyles } from './style/orderedItems'

function OrderedItems(){
  const classes = useStyles();
  const { userBooked } = useContext( MyState )

  return (
    <List>
      {
        Object.values(userBooked.ta).map( (item, ind) => {
          return (
            <Fragment key={ ind }>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                {/* src="./photos/header/food1.jpg" */}
                  <Avatar alt="Remy Sharp"> P </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={ item.name }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        $ { item.o }
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          )
        } )
      }
    <Divider variant="inset" component="li" />

      {/* summary   */}
      <Grid container>
        <Grid className={ classes.summaryOfItems } item xs={6}>
          <Typography className={ classes.summaryOfItemsTitle }>Total:</Typography>
        </Grid>
        <Grid className={ classes.summaryOfItems } item xs={6}>
          <Typography className={ classes.summaryOfItemsTitle }> $ { userBooked.summ } </Typography>
        </Grid>
      </Grid>
    </List>
  )
}

export default OrderedItems