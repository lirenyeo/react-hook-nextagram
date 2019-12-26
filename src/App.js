import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Navbar from './containers/Navbar'
import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'


const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/users/:id">
          <UserProfilePage />
        </Route>
      </Switch>
    </>
  )
}

export default App
