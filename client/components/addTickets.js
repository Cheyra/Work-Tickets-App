import React from "react";
import { Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import './App.css';
import axios from "axios";
import { Button, Textarea } from "react-materialize";
import moment from 'moment';
var querystring = require('querystring');
class AddTickets extends React.Component {
  constructor() {
    super();
    this.state = {
      first: '',
      last: '',
      employeeID: '',
      description: '',
      date: moment().format("DD/MM/YYYY"),
      messageFromServer: '',

    }


    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);


  }

  // runs when page loads
  componentDidMount() {
    console.log("add")
    this.setState({ employeeID: this.props.employeeID })
    console.log(this.state.date)
  }


  // creates new ticket on click submit
  onClick(e) {
    this.insertNewTicket(this);
    console.log("added name")
  }

  // axios call that creates a new ticket
  insertNewTicket(e) {
    axios.post('/insert',
      querystring.stringify({
        first: e.state.first,
        last: e.state.last,
        description: e.state.description,
        employeeID: e.state.employeeID,
        date: moment().format("DD/MM/YYYY") ,
      open: true,
    status: "New Request"   }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (response) {
        e.setState({
          messageFromServer: response.data
        });
        console.log(response)
      });
  }

  // updates state when user types in a field
  handleTextChange(e) {

    if (e.target.name === "first") {
      this.setState({
        first: e.target.value
      });
    }
    if (e.target.name === "last") {
      this.setState({
        last: e.target.value
      });
    }
    if (e.target.name === "description") {
      this.setState({
        description: e.target.value
      });
    }

    console.log(this.state.first + this.state.last)
  }

  // renders info to web page
  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to={{ pathname: "/homepage" }} />;
    } else {
      return (
        <div>
          <label >Last Name:</label><input type="text" id="last" name="last" value={this.state.last} onChange={this.handleTextChange}></input>
          <label >First Name:</label><input type="text" id="first" name="first" value={this.state.first} onChange={this.handleTextChange}></input>
                <Textarea id="description" name="description" value={this.state.description} onChange={this.handleTextChange} label="Please enter a description of your problem..." />
                <Button onClick={this.onClick} className="button"><a href="/#/homepage">Save</a></Button>
        </div>
      );
    }
  }
}
export default AddTickets;
