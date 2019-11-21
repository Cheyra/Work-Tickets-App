import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Button, Textarea } from "react-materialize";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
class createLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            facility: "",
            employeeID: "",
            password: "",
            options: ["WDH", "Administrator", "MGH", "Brigham"],
            info: ""

        };

        // biding this to functions

        this.registerEmployee = this.registerEmployee.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this._onSelect = this._onSelect.bind(this);
    }
    async componentDidMount() {
                this.getAll()
    }
 //pulls in all the employee login info
 async getAll() {
    let Users = "";

    await axios.get("/getAllLogin").then(function (response) {
        console.log(response.data);
        Users = response.data;
    });
    console.log(Users);
    this.setState({ info: Users });
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
        for (let i = 0; i < this.state.info.length; i++) {
            if (this.state.employeeID == this.state.info[i].employeeID && this.state.facility == this.state.info[i].facility && !this.state.info[i].passwordSet) {
                console.log(this.state.employeeID)
                let id = this.state.employeeID;
                let newName = { password: this.state.password }
                axios.post("/updateLogin/" + id, newName).then(function (response) {
                    console.log(response)
                });
                console.log("edited");
              
              
              
            }
              
                
            }
        

    }
    _onSelect(e) {
        // console.log(e.target.value)
        console.log("clicked")
        console.log(e.value)
        this.setState({facility: e.value})
            }

    // renders info to web page
    render() {

        return (
            <div>
                <Dropdown options={this.state.options} onChange={this._onSelect}  placeholder="Select an option" />
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