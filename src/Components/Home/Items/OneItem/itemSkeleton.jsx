import React from 'react';
import { makeStyles } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
  root: {
    maxWidth: 420,
  },
})
function ItemSkeleton() {
   // <Card className="item_card">
    //   <Skeleton variant="text" />
    //   <Skeleton variant="circle" width={40} height={40} />
    //   <Skeleton variant="rect" width={210} height={118} />
    // </Card>

    const classes = useStyles()

  return (
    <Card className={`${classes.root} item_card_skeleton`}>
        <CardActionArea>
          <Skeleton className="p-3" variant="rect" width={"100%"} height={200} />
          <Skeleton className="p-2" variant="text" height={40} width={"85%"} />
          <Skeleton className="p-2" variant="text" height={30} width={"60%"} />
          <div className={"skl_circles px-2"}>
            <Skeleton className={"mx-2"} variant="circle" width={50} height={50} />
            <Skeleton className={"mx-2"} variant="circle" width={50} height={50} />
          </div>
          <Skeleton variant="text" height={30} width={"100%"} />
        </CardActionArea>
      </Card>
  );
}


export default ItemSkeleton