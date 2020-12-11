//COMPONENTS
import Header from './Components/Header/header'
import Footer from './Components/Footer/footer'
import Layout from './layout'
// MATERIAL-UI
import Grid from '@material-ui/core/Grid'

function App() {
  return (
    <div>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Layout />
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </div>
  )
}

export default App