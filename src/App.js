import { useState, useContext } from 'react'
import { HashRouter as Router } from 'react-router-dom'

import { GlobalState } from './Components/GlobalState'
// Components
import Navbar from './Components/Navbar/Navbar'
import useOurRoutes from './layout'
//CSS
import "./app.css"


function App(){

  const { isAuthUser } = useContext(GlobalState)
  const [ photo, setPhoto ] = useState(false)

  const handleChangeBackground = () => {
    setPhoto( !photo )
  }

  const routes = useOurRoutes(isAuthUser)

  return(
      <Router>
        <div className="app_container">
          <div className="container-fluid p-0 m-0">
            <Navbar />
            { photo ?
            <img className="background__cover_video" src="./photos/home/1.jpg" alt="laptop for bg"/>
            :
            <video className="background__cover_video" autoPlay="autoplay" loop muted >
              <source src="./videos/video.mp4" type="video/mp4"/>
            </video>
            }
            <button className="background__cover_changer_button" onClick={handleChangeBackground} >P</button>
            <div>
              { routes }
            </div>
          </div>
        </div>
      </Router>
  )
}

export default App


// id yordamida elementni o'chirish

// var element = document.getElementById("element-id");
// element.parentNode.removeChild(element);