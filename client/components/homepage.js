import React from "react";
import ReactDOM from "react-dom";
import './App.css';
import axios from "axios";
import AddLoginTrigger from "./adminComponents/addLogintrigger"
import { Button, NavItem, Row, Textarea } from "react-materialize";


class Homepage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isLoggedIn: "",
            employeeID: "",
            password: "",
            info: "",
            loggedInEmployee: '',
            admin: false,


        }

        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.Login = this.Login.bind(this)
    }

    // runs when page loads
    async componentDidMount() {
        console.log("Homepage loaded");

        await this.setState({
            employeeID: this.props.employeeID,
            password: "",
            info: "",
            loggedInEmployee: '',
            admin: "",
            isLoggedIn: "",
        })
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

    // if login is successful set state of login information
    async Login(status) {
        await this.props.changeLoginStatus();
        this.props.setLoggedID(this.state.employeeID);
            this.setState({ isLoggedIn: this.props.isLoggedIn });
        this.setState({ employeeID: this.props.employeeID, loggedInEmployee: this.props.loggedEmployee});
         
    }

   

    // on login click checks if login info matches
    onClick(e) {
        console.log(this.state.employeeID + this.state.password);
        if (this.state.employeeID == 9000 && this.state.password == "Password") {
            this.props.changeLoginStatus();
        }
        else {
            for (let i = 0; i < this.state.info.length; i++) {
                if (this.state.employeeID == this.state.info[i].employeeID && this.state.password == this.state.info[i].password && this.state.info[i].passwordSet) {
                    this.setState({ loggedInEmployee: this.state.info[i] })
                    this.Login(this.state.info[i].admin)

                }
                if (this.state.employeeID !== this.state.info[i].employeeID || this.state.password !== this.state.info[i].password) {
                    this.props.changeLoginMessage()

                }


            }
        }
    }

    // updates state when user types in a field
    handleTextChange(e) {
        if (e.target.name === "employeeID") {
            this.setState({
                employeeID: e.target.value
            });
            console.log(this.state.employeeID)
        }
        if (e.target.name === "password") {
            this.setState({
                password: e.target.value
            });
            console.log(this.state.password)
        }

    }




    // renders info to web page
    render() {
       
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <Row>
<h1> {"Welcome " + this.props.loggedEmployee.first + " " + this.props.loggedEmployee.last} </h1>

                    </Row>
                    <Row>
                        <NavItem href='/#/show'>    <Button className="main-buttons">
                            {" "}
                            Tickets{" "}
                        </Button>{" "}
                        </NavItem>
                    </Row>


                    <Row>
                        <NavItem href='/#/add'>  <Button className="main-buttons ">
                            {" "}
                            Create Ticket{" "}
                        </Button>{" "}
                        </NavItem>
                    </Row>


<Row><AddLoginTrigger
admin={this.props.adminStatus}
/>
</Row>
                  
                </div>
            );
        }
        else {
            return (
                <div><h1 className="header-box">Login</h1>
                    <Textarea id="employeeID" name="employeeID" onChange={this.handleTextChange} label="Please enter your Employee ID" />
                    <Textarea id="password" name="password" onChange={this.handleTextChange} label="Please enter your password" />

                    <Button onClick={this.onClick} className="button">Login</Button>
                    <a href="/#/createlogin"> First time login </a>

                    <div>{this.props.loginMessage} </div>
                </div>
            )
        }
    }
}
export default Homepage;
