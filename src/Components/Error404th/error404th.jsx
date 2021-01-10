
import { useStyles } from './style/error404thStyle'


function Error404th(){
  const classes = useStyles()

  return (
    <div className={ classes.error_cover }>
      <img className={ classes.error_img } src="/photos/404/404.svg" alt="Error 404"/>
    </div>
  )
}

export default Error404th