import React, { Component } from "react";
// import React from 'react';
import './App.css';
import axios from "axios";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Route, Switch } from 'react-router-dom';
import Homepage from './homepage';
import AddTickets from './addTickets';
import AddEmployee from './addEmployee';
import ShowTickets from './showTickets';
import CreateLogin from './createLogin';
import { Button } from "react-materialize";


class App extends Component {
  state = {
    currentEmployeeID: "",
    isLoggedIn: false,
    adminStatus: false,
  }

  // runs when page loads
  componentDidMount() {
    console.log("App Loaded")

  }

  // set in global logged in state
  setLoggedID = async loggedEmployeeID => {
    await this.setState({ currentEmployeeID: loggedEmployeeID });
    console.log(this.state.currentEmployeeID)
    console.log(this.state.isLoggedIn)

  }

  // global Admin status
  setAdminStatus = status => {
    this.setState({ adminStatus: status });
  }

  // sets global logged in state to true
  changeLoginStatus = () => {
    this.setState({ isLoggedIn: true });
  }

  // when user logs out it resets global state
  logOut = () => {
    this.setState({ isLoggedIn: false, currentEmployeeID: "" });
  }

  render() {
    return (
      <div className="App">
        <a href="/#/homepage"> <Button>Home</Button></a>
        <Button onClick={this.logOut}>Log Out</Button>
        <header className="App-header">
          <h1 className="header"> Ticket Master </h1>

          <div>

            <Switch>


              <Route
                exact
                path="/homepage"
                render={() => (
                  <Homepage
                    setLoggedID={this.setLoggedID}
                    setAdminStatus={this.setAdminStatus}
                    employeeID={this.state.currentEmployeeID}
                    changeLoginStatus={this.changeLoginStatus}
                    isLoggedIn={this.state.isLoggedIn}
                    adminStatus={this.state.adminStatus}
                  />
                )}
              />

              <Route
                exact
                path="/add"
                render={() => (
                  <AddTickets
                    isLoggedIn={this.state.isLoggedIn}
                    employeeID={this.state.currentEmployeeID}
                    adminStatus={this.state.adminStatus}
                  />
                )}
              />


              <Route
                exact
                path="/show"
                render={() => (
                  <ShowTickets
                    isLoggedIn={this.state.isLoggedIn}
                    employeeID={this.state.currentEmployeeID}
                    adminStatus={this.state.adminStatus}
                  />
                )}
              />
              <Route
                exact
                path="/addlogin"
                render={() => (
                  <AddEmployee
                    isLoggedIn={this.state.isLoggedIn}
                    employeeID={this.state.currentEmployeeID}
                    admin={this.state.admin}
                    adminStatus={this.state.adminStatus}
                  />
                )}
              />
              <Route
                exact
                path="/createlogin"
                render={() => (
                  <CreateLogin
                  />
                )}
              />

            </Switch>

          </div>



        </header>
      </div>
    );
  }
}
export default App;
