import React from "react";
import { Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import './App.css';
import axios from "axios";
import { Button } from "react-materialize";
import Toggle from 'react-toggle'
import "react-toggle/style.css"
class ShowTickets extends React.Component {
    constructor() {
        super();
        this.state = {
            info: [],
            ID: 5555,
            ticketsOpen: true,
            admin: true

        };
        // biding this to functions
        this.getData = this.getData.bind(this);
        this.getTickets = this.getTickets.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.handleOpenChange = this.handleOpenChange.bind(this)
        this.handleStatusChange = this.handleStatusChange.bind(this)
            }

    // runs when page loads
    componentDidMount() {
        this.setState({ ID: this.props.employeeID, ticketsOpen: true, admin: this.props.loggedEmployee.admin })
       this.getTickets()
    }

    getTickets() {
        if (this.props.loggedEmployee.admin) {
            this.getAllTickets()
        }
        else {
            this.getEmployeeTickets();
        }

    }

    // pulls tickets specific to logged in user from database and sets state for info
    async getEmployeeTickets() {
        let Tickets = "";

        await axios.get("/getOpenTickets/" + this.props.employeeID).then(function (response) {
            console.log(response.data);
            Tickets = response.data;
        });
        console.log(Tickets);
        this.setState({ info: Tickets });
    }

    // pulls all tickets from database and sets state for info
    async getAllTickets() {
        let Tickets = "";

        await axios.get("/getAllTickets/").then(function (response) {
            console.log(response.data);
            Tickets = response.data;
        });
        console.log(Tickets);
        this.setState({ info: Tickets });
    }

    // pulls initial info
    getData() {
        axios.get("/").then(function (response) { });
    }

    // deletes contents in row
    async deleteRow(event) {
        let id = event.target.value;

        await axios.get("/delete/" + id).then(function (response) {
        });
        console.log("deleted");
        this.getTickets();
    }

    //updates the database to close a ticket on click
    handleOpenChange(event) {
        let id = event.target.value;
        // let update = { open: false }
        axios.post("/update/" + id).then(function (response) {
            console.log(response)
        });

        this.getTickets();
        console.log("closed ticket")
    }

    //updates the database to change status of a ticket
    handleStatusChange(event) {
        let id = event.target.value;
        console.log(event.target.value);
        let update = { status: "Pending" }
        axios.post("/updateStatus/" + id, update).then(function (response) {
            console.log(response)
        });

        this.getTickets();
    }

    // changes state to show open or closed tickets depending on which button is clicked
    showTickets(a) {
        this.setState({ ticketsOpen: a })
    }

    // renders info to web page
    render() {
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <Button onClick={() => { this.showTickets(true) }} className="button"> Open Tickets </Button>
                    <Button onClick={() => { this.showTickets(false) }} className="button"> Closed Tickets </Button>
                    <table>
                        <thead>
                            <tr>
                                <th />
                                <th className="desc-col">Date</th>
                                <th className="desc-col">Employee ID</th>
                                <th className="desc-col">Type</th>
                                <th className="button-col">Description</th>
                                <th className="button-col">Status</th>
                                <th className="button-col">Close Ticket</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.info.filter(exp => exp.open === this.state.ticketsOpen).map(exp => {
                                return (
                                    <tr>
                                        <td className="counterCell" />
                                        <td className="desc-col">{exp.date}</td>
                                        <td className="desc-col">{exp.employeeID}</td>
                                        <td className="desc-col">{exp.problemType}</td>
                                        <td className="button-col">{exp.description}</td>

                                        <td className="button-col">{exp.status}</td>

                                        <td> <label>
                                            <a href="/#/show">  <Toggle
                                                defaultChecked={!exp.open}
                                                onClick={this.handleOpenChange}
                                                value={exp._id} />
                                            </a>
                                        </label>
                                        </td>
                                        <td>
                                            {" "}
                                            <Button value={exp._id} onClick={this.handleStatusChange} className="delete-button">
                                                {" "}
                                                Update Status{" "}
                                            </Button>{" "}
                                        </td>
                                        <td>
                                            {" "}
                                            <Button value={exp._id} onClick={this.deleteRow} className="delete-button">
                                                {" "}
                                                Delete{" "}
                                            </Button>{" "}
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return (<Redirect to={{ pathname: "/homepage" }} />)

        }
    }
}
export default ShowTickets;
