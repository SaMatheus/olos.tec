import React from 'react'

// REACT ROUTER
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// PAGES
import Home from '../pages/Home'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
