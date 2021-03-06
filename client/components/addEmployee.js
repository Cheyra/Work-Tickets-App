import React from "react";
import { Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import './App.css';
import axios from "axios";
import { Button, Textarea } from "react-materialize";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
var querystring = require('querystring');
class AddEmployee extends React.Component {
    constructor() {
        super();
        this.state = {
            first: '',
            last: '',
            employeeID: '',
            admin: false,
            messageFromServer: '',
            facility: "",
            options: ["WDH", "Administrator", "MGH", "Brigham"]

        }
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this._onSelect = this._onSelect.bind(this);
    }
    // runs when page loads
    componentDidMount() {
        console.log("add")
    }


    // creates new employee on click submit
    onClick(e) {
        this.insertNewEmployee(this);
    }

    // axios call that creates a new employee
    async insertNewEmployee(e) {

        axios.post('/insertLogin',
            querystring.stringify({
                first: e.state.first,
                last: e.state.last,
                facility: e.state.facility,
                employeeID: e.state.employeeID,
                password: "",
                passwordSet: false,
                admin: e.state.admin

            }), {
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
        if (e.target.name === "facility") {
            this.setState({
                description: e.target.value
            });

        }

        if (e.target.name === "employeeID") {
            this.setState({
                employeeID: e.target.value
            });
        }

        console.log(this.state.first + this.state.last)
    }
    // when dropdown selection is picked sets the state 
    //of the facility and checks for admin privileges
    _onSelect(e) {
        if(e.value==="Administrator"){
            this.setState({admin:true})
        }
        this.setState({ facility: e.value })
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
                    <Textarea id="employeeID" name="employeeID" value={this.state.employeeID} onChange={this.handleTextChange} label="Please enter your Employee ID" />
                    <Textarea id="facility" name="facility" value={this.state.facility} onChange={this.handleTextChange} label="Please enter a the facility Name" />
                    <Dropdown value={this.state.facility} options={this.state.options} onChange={this._onSelect} placeholder="Select an option" />

                    <Button onClick={this.onClick} className="button"><a href="/#/homepage">Add New Employee</a></Button>



                </div>
            );
        }
    }
}
export default AddEmployee;