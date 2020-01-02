import React, { useState, createContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './containers/Navbar'
import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'
import MyProfilePage from './pages/MyProfilePage'

const AuthContext = createContext(null)

const App = () => {
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
        position={toast.POSITION.TOP_CENTER}
      />
      <Navbar setCurrentUser={setCurrentUser} currentUser={currentUser} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/users/:id">
          <UserProfilePage />
        </Route>
        <Route path="/me">
          <MyProfilePage />
        </Route>
      </Switch>
    </AuthContext.Provider>
  )
}

export default App
export { AuthContext }
// exported as non default, so it can be imported like this:
// import { AuthContext } from 'directory to App.js'
