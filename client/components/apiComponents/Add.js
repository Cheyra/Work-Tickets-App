import React from 'react';
import {Button, Icon} from 'react-materialize';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');
class Add extends React.Component {
constructor() {
      super();
this.state = {
       first: '',
       last: '',
        messageFromServer: '',
        modalIsOpen: false
      }
      

      this.onClick = this.onClick.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
     
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        Modal.setAppElement('body');
     }
openModal() {
      this.setState({
        modalIsOpen: true
      });
    }
closeModal() {
      this.setState({
        modalIsOpen: false,
       first: '',
       last: '',
        messageFromServer: ''
      });
    }


onClick(e) {
      this.insertNewName(this);
      console.log("added name")
    }
insertNewName(e) {
      axios.post('/insert',
        querystring.stringify({
          first: e.state.first,
          last: e.state.last,
         
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
        e.setState({
          messageFromServer: response.data
        });
        console.log(response)
      });
    }
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
      console.log(this.state.first + this.state.last)
    }
render() {
   if(this.state.messageFromServer === ''){
      return (
        <div>
     
      <Button type="submit"  onClick={this.openModal}>
Add Name
<Icon right>
send
</Icon>
</Button>
          <Modal
          
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Name"
       className="Modal">
<Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
       <Button  onClick={this.closeModal}>Close</Button>
      </Link><br/>
<fieldset>
       <label >Last Name:</label><input type="text" id="last" name="last" value={this.state.last} onChange={this.handleTextChange}></input>
       <label >First Name:</label><input type="text" id="first" name="first" value={this.state.first} onChange={this.handleTextChange}></input>
     
      </fieldset>
<div className='button-center'>
        <br/>
        <Button onClick={this.onClick}>Add New Name</Button>
       </div>
          </Modal>
        </div>
      )
   }
   else{
    return (
     <div>
       <Button onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
       <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Add Name"
        className="Modal">
<div className='button-center'>
        <h3>{this.state.messageFromServer}</h3>
        <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
         <Button onClick={this.closeModal}>Close the Dialog</Button>
        </Link>
       </div>
      </Modal>
       </div>
     )
    }
   }
}
export default Add;