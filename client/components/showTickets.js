import React from "react";
import { Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
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
            ticketsOpen: true
            
        };
        // biding this to functions
        this.getData = this.getData.bind(this);
        this.getTickets = this.getTickets.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.handleOpenChange = this.handleOpenChange.bind(this)
    }

    // runs when page loads
    componentDidMount() {
        this.setState({ ID: this.props.employeeID, ticketsOpen:true })
        this.getTickets();

    }
    // pulls info from database and sets state for info
    async getTickets() {
        let Tickets = "";

        await axios.get("/getOpenTickets/" + this.props.employeeID).then(function (response) {
            console.log(response.data);
            Tickets = response.data;
        });
        console.log(Tickets);
        this.setState({ info: Tickets,  });
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
        console.log("closed ticket" )
    }
    // changes state to show open or closed tickets depending on which button is clicked
    showTickets(a) {
        this.setState({ticketsOpen:a})
    }


    // renders info to web page
    render() {
        if (!this.props.isLoggedIn) {
            return (<Redirect to={{ pathname: "/homepage" }} />)
        } else {
            return (
                <div>
                    <Button onClick={()=>{this.showTickets(true)}}> Open Tickets </Button>
                    <Button onClick={()=>{this.showTickets(false)}}> Closed Tickets </Button>
                    {/* <div> Welcome {this.state.info.first + " " + this.state.info.last} </div>  */}
                    <table>
                        <thead>
                            <tr>
                                <th />
                                <th className="desc-col">Date</th>
                                <th className="desc-col">Employee ID</th>
                                <th className="button-col">Description</th>
                                <th className="button-col">Status</th>
                                <th className="button-col">Close Ticket</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.info.filter(exp => exp.open === this.state.ticketsOpen ).map(exp => {
                                return (
                                    <tr>
                                        <td className="counterCell" />
                                        <td className="desc-col">{exp.date}</td>
                                        <td className="desc-col">{exp.employeeID}</td>
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
                                            <Button value={exp._id} onClick={this.deleteRow}>
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
    }
}
export default ShowTickets;
