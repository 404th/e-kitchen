
import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles({
  root: {
    transition:"0.4s",
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  }
});