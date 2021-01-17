import { useStyles } from './style/orderSuccessStyle'

import { Link } from 'react-router-dom'

function OrderSuccess(){
  const classes = useStyles()

  return (
    <div className={ classes.orderSuccessCover }>
      <h1 className={ classes.orderSuccessHeaderTitle } >Thank you!</h1>
      <p className={ classes.orderSuccessTitle }>Order Success recieved and will process within the next 24 hours!</p>
      <Link className={ classes.orderSuccessButtonToHome } to={"/home"}>Go to home</Link>
      <img
        className={ classes.backgroundOrderSuccess }
        src="./photos/orderSuccess/fast-delivery.svg"
        alt="orderedSuccess"
        width={"100%"}
        height={"100vh"}
      />
    </div>
  )
}

export default OrderSuccess