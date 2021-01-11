
import { useStyles } from './style/loadingStyle'
import Loader from 'react-loader-spinner'

function Loading () {
  const classes = useStyles()
  return (
    <div className={ classes.loading_cover }>
      <Loader
         type="ThreeDots"
         color="#00BFFF"
         height={50}
         width={50}
      />
    </div>
  )
}

export default Loading