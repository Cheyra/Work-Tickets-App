import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Button, NavItem, Row, Col, Textarea } from "react-materialize";

class Homepage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isLoggedIn: "",
            employeeID: "",
            password: "",
            info: "",
            loggedInEmployee: '',
            admin: ""

        }

        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    // runs when page loads
    async componentDidMount() {
        console.log("Homepage loaded");
        await this.setState({ employeeID: this.props.employeeID })
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
        this.props.setAdminStatus(status);
        this.setState({ isLoggedIn: this.props.isLoggedIn });
        this.setState({ employeeID: this.props.employeeID });
        this.setAdministration()
    }

    // checks if logged in user is an administator or not and renders additional (still working on this)
    // setAdministration() {
    //     if (this.state.loggedInEmployee.admin) {
    //         this.render(
    //             <Row>
    //                 <NavItem href='/#/addlogin'>  <Button className="main-buttons">
    //                     {" "}
    //                     addlogin{" "}
    //                 </Button>{" "}
    //                 </NavItem>
    //             </Row>

    //         )
    //     }
    // }

    // on login click checks if login info matches
    onClick(e) {
        console.log(this.state.employeeID + this.state.password);

        for (let i = 0; i < this.state.info.length; i++) {
            if (this.state.employeeID == this.state.info[i].employeeID && this.state.password == this.state.info[i].password && this.state.info[i].passwordSet) {
                this.setState({ loggedInEmployee: this.state.info[i] })
                this.Login(this.state.info[i].admin)

            }
            if (this.state.employeeID == this.state.info[i].employeeID && !this.state.info[i].passwordSet) {
                console.log("A matching id and password could not be found.")
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
                    </Row>
                    <Row>
                        <NavItem href='/#/show'>    <Button className="main-buttons">
                            {" "}
                            Open Tickets{" "}
                        </Button>{" "}
                        </NavItem>
                    </Row>

                    <Row>
                        <NavItem href='/#/show'>   <Button className="main-buttons" >
                            {" "}
                            Closed Tickets{" "}
                        </Button>{" "}
                        </NavItem>
                    </Row>
                    <Row>
                        <NavItem href='/#/add'>  <Button className="main-buttons">
                            {" "}
                            Create Ticket{" "}
                        </Button>{" "}
                        </NavItem>
                    </Row>


                    <Row>
                        <NavItem href='/#/addlogin'>  <Button className="main-buttons">
                            {" "}
                            addlogin{" "}
                        </Button>{" "}
                        </NavItem>
                    </Row>



                </div>
            );
        }
        else {
            return (
                <div><h1>Login</h1>
                    <Textarea id="employeeID" name="employeeID" value={this.state.employeeID} onChange={this.handleTextChange} label="Please enter your Employee ID" />
                    <Textarea id="password" name="password" value={this.state.password} onChange={this.handleTextChange} label="Please enter your password" />

                    <Button onClick={this.onClick}>Login</Button>
                    <a href="/#/createlogin"> First time login </a>
                </div>
            )
        }
    }
}
export default Homepage;
