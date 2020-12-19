
import { createContext } from 'react'

export const MyState = createContext()

function GlobalState( props ){
  
  const state = {
    foods:[
      {
        imgSrc:"./photos/header/food1.jpg",
        aboutMeal:
          "This impressive paella is lorem10 sadsa aasdasdasdasf  asfa s adasfsdffsdf a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      },
      {
        imgSrc:"./photos/header/food2.jpg",
        aboutMeal:
          "This impressive paella is lorem10 sadsa aasdasdasdasf  asfa s adasfsdffsdf a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      },
      {
        imgSrc:"./photos/header/food3.jpg",
        aboutMeal:
          "This impressive paella is lorem10 sadsa aasdasdasdasf  asfa s adasfsdffsdf a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      },
      {
        imgSrc:"./photos/header/food4.jpg",
        aboutMeal:
          "This impressive paella is lorem10 sadsa aasdasdasdasf  asfa s adasfsdffsdf a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      },
      {
        imgSrc:"./photos/header/food5.jpg",
        aboutMeal:
          "This impressive paella is lorem10 sadsa aasdasdasdasf  asfa s adasfsdffsdf a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      },
      {
        imgSrc:"./photos/header/food6.jpg",
        aboutMeal:
          "This impressive paella is lorem10 sadsa aasdasdasdasf  asfa s adasfsdffsdf a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      },
      {
        imgSrc:"./photos/header/food7.jpg",
        aboutMeal:
          "This impressive paella is lorem10 sadsa aasdasdasdasf  asfa s adasfsdffsdf a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      },
    ]
  }
  
  return (
    <MyState.Provider value={ state }>
      { props.children }
    </MyState.Provider>
  )
}

export default GlobalState