import React , {Fragment} from 'react'
import Navbar from './components/layouts/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import ContactState from './context/State'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layouts/Alerts'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routing/privateRoute'
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    
    <AuthState>
    <ContactState> 
    <AlertState>
      <Router>
        <Fragment>
          <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <PrivateRoute exact path = '/' component = {Home} />
                <Route exact path = '/about' component = {About} />
                <Route exact path = '/register' component = {Register} />
                <Route exact path = '/login' component = {Login} />
              </Switch>
            </div>
        </Fragment>
      </Router>
      </AlertState>
    </ContactState>
    </AuthState>
  )
}

export default App
