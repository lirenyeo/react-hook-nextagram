import React, { useState, createContext } from 'react'
import { Route, useLocation, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './containers/Navbar'
import LoginCheck from './components/LoginCheck'
import AnimatedSwitch from './components/AnimatedSwitch'


import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'
import MyProfilePage from './pages/MyProfilePage'
import UploadPage from './pages/UploadPage'

const AuthContext = createContext(null)

const App = () => {
  let location = useLocation()
  let history = useHistory()

  console.log(location)
  const [currentUser, setCurrentUser] = useState({
    user: localStorage.user ? JSON.parse(localStorage.user) : null,
    jwt: localStorage.jwt
  })

  const contextValue = {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <ToastContainer
        className="text-center text-info"
        hideProgressBar
        position={toast.POSITION.BOTTOM_CENTER}
      />
      <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} />
      <div style={{ marginTop: '80px' }}>
        <AnimatedSwitch location={location} history={history}>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/users/:id">
            <UserProfilePage />
          </Route>
          <Route path="/me">
            <LoginCheck>
              <MyProfilePage currentUser={currentUser} />
            </LoginCheck>
          </Route>
          <Route path="/upload">
            <LoginCheck>
              <UploadPage currentUser={currentUser} />
            </LoginCheck>
          </Route>
        </AnimatedSwitch>
      </div>
    </AuthContext.Provider>
  )
}

export default App
export { AuthContext }
// exported as non default, so it can be imported like this:
// import { AuthContext } from 'directory to App.js'
