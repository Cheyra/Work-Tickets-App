import React from "react";
import ReactDOM from "react-dom";
import { Button, NavItem, Row,  } from "react-materialize";
class AddLoginTrigger extends React.Component {

  
        


   

  //  renders info to web page
    
    render(){
      if (this.props.admin == "true" || this.props.admin == true) {
           return (
              <div>
                <Row>
                    <NavItem href='/#/addlogin'>  <Button className="main-buttons">
                        {" "}
                        addlogin{" "}
                    </Button>{" "}
                    </NavItem>
                </Row>
                </div>

           )
        
      }
      else return(
          <Row> </Row>
      )
    } 



}
export default AddLoginTrigger;