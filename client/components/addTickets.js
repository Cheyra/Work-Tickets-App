import React from "react";
import { Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import './App.css';
import axios from "axios";
import { Button, Textarea } from "react-materialize";
import moment from 'moment';
import Dropdown from 'react-dropdown'

var querystring = require('querystring');
class AddTickets extends React.Component {
  constructor() {
    super();
    this.state = {
      first: '',
      last: '',
      employee: '',
      description: '',
      date: moment().format("DD/MM/YYYY"),
      messageFromServer: '',
      options: ["Technology failure", "Missing a piece of equipment", "Login not working", "Other"],
      problemType: ""

    }


    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
this._onSelect = this._onSelect.bind(this);
this.insertNewTicket=this.insertNewTicket.bind(this)
  }

  // runs when page loads
  componentDidMount() {
    console.log("add")
    this.setState({ employee: this.props.loggedEmployee })
    }


  // creates new ticket on click submit
  onClick(e) {
    this.insertNewTicket(this);
    console.log("added name")
  }
  
//sets state when dropdown selection changes
async _onSelect(e) {
  await this.setState({problemType: e.value})
  console.log(this.state.problemType)
      }

  // axios call that creates a new ticket
  insertNewTicket(e) {
    axios.post('/insert',
      querystring.stringify({
        first: this.state.employee.first,
        last: this.state.employee.last,
        description: e.state.description,
        employeeID: e.state.employee.employeeID,
        problemType: e.state.problemType,
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

   
    if (e.target.name === "description") {
      this.setState({
        description: e.target.value
      });
    }

  }

  // renders info to web page
  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to={{ pathname: "/homepage" }} />;
    } else {
      return (
        <div>
                          <Dropdown options={this.state.options}  onChange={this._onSelect}  placeholder="Select your problem catorgory." />

                <Textarea id="description" name="description" value={this.state.description} onChange={this.handleTextChange} label="Please enter a description of your problem..." />
                <Button onClick={this.onClick} className="button"><a href="/#/homepage">Save</a></Button>
        </div>
      );
    }
  }
}
export default AddTickets;
