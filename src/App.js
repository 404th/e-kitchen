//COMPONENTS
import Header from './Components/Header/header'
import Footer from './Components/Footer/footer'
import Layout from './layout'
// MATERIAL-UI
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

function App() {
  return (
    <div>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Container maxWidth={'lg'}>
        <Grid container>
          <Grid item xs={12}>
            <Layout />
          </Grid>
        </Grid>
      </Container>
      <Grid>
        <Footer />
      </Grid>
    </div>
  )
}

export default App