import React from "react";
import { Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import axios from "axios";
import { Button, Row, Col, Select, Textarea } from "react-materialize";
class createLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            facility: "",
            employeeID: "",
            password: "",

        };
        // biding this to functions

        this.registerEmployee = this.registerEmployee.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    // updates state when user types in a field
    handleTextChange(e) {

        if (e.target.name === "facility") {
            this.setState({
                facility: e.target.value
            });
        }
        if (e.target.name === "employeeID") {
            this.setState({
                employeeID: e.target.value
            });
        }
        if (e.target.name === "password") {
            this.setState({
                password: e.target.value
            });
        }

    }

    // registers employee with a password
    registerEmployee(event) {
        // let id = event.target.value;
        console.log(this.state.employeeID)
        let id = this.state.employeeID;
        let newName = { password: this.state.password }
        axios.post("/updateLogin/" + id, newName).then(function (response) {
            console.log(response)
        });
        console.log("edited");

    }

    // renders info to web page
    render() {

        return (
            <div>
                <Textarea id="facility" name="facility" value={this.state.facility} onChange={this.handleTextChange} label="Please enter your facility" />
                <Textarea id="employeeID" name="employeeID" value={this.state.employeeID} onChange={this.handleTextChange} label="Please enter your Employee ID" />
                <Textarea id="password" name="password" value={this.state.password} onChange={this.handleTextChange} label="Please set a password" />
                <Button value={this.state.id} onClick={this.registerEmployee}>
                    {" "}<a href="/#/homepage">
                        Submit{" "}
                    </a>
                </Button>{" "}
            </div>
        );
    }
}

export default createLogin;