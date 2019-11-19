import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/app';
import Homepage from './components/homepage';
import AddTickets from './components/addTickets'
import ShowTickets from './components/showTickets'
export const Routes = () => (
  <Switch>
    <Route exact path='/*' component={App} />

    {/* <Route exact path='/homepage' component={Homepage} />
    
    <Route exact path='/add' component={AddTickets} />

    <Route exact path='/show' component={ShowTickets} /> */}
    
  </Switch>
);
export default Routes;