import React, { Component } from 'react'
import getUser from './Request'
import logo from './logo.svg'
import './App.css'
import Form from 'react-bootstrap/Form'
import Navbar from 'react-bootstrap/Navbar'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Popover from 'react-bootstrap/Popover'
import Nav from 'react-bootstrap/Nav'
import Alert from  'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {

  constructor(props, context){
    super(props, context)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.submission = this.submission.bind(this)
    this.emailChange = this.emailChange.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
    this.state = {
      show: false,
      alertShow: false,
      value: '',
      password: '',
      email: ''
    }
  }

  handleClose() {
    this.setState({show: false})
  }

  handleShow() {
    this.setState({show: true})
  }

  passwordChange(){  
    let password = document.querySelector("#password")
    if (password) {
      password = password.value
      this.setState({password})
    }
  }

  emailChange(){
    let email = document.querySelector("#email")
    if (email){
      email = email.value
      this.setState({email})
    }
  }

  submission(e){
    e.preventDefault()
    getUser(this.state.email, this.state.password).then(response=>{
      if (response.status===200){
        console.log("Incoming...")
        this.setState({alertShow: true, alertStatus: "success", id: response.data.user.id})
      } else {
        console.log("no show...")
        this.setState({alertStatus: "danger", alertShow: true})
      }
    }).catch(()=>{
      this.setState({alertStatus: "danger", alertShow: true, id: null})
    })
    .finally(()=>setTimeout(()=>this.setState({alertStatus: "info", alertShow: false}), 4000))
  }

  render() {
    const popover = (
        <Popover id="modal-popover" title="popover">
          provide your email address <b>or</b> provide your username
        </Popover>
    )

    return (
          <Container>
                
              <Navbar collapseOnSelect bg="dark" expand="md" fixed="top" variant="white" className="justify-content-end" >
              <Navbar.Brand>
                  <a href="/">React App</a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" /> 
                <Navbar.Collapse id="#responsive-navbar-nav">
                  <Nav>
                    
                  <Nav.Item>
                    <Nav.Link eventKey={1} href="#login" onClick={this.handleShow}>
                      Login
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item >
                    <Nav.Link eventKey={2} href="#register">
                      Register
                    </Nav.Link>
                  </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
                 
              </Navbar>
            
            <Jumbotron>
              <h1>Welcome To Old-School</h1>
              <p>
                <Button
                  variant="success"
                  href="http://react-bootstrap.github.io/components.html"
                  target="_blank">
                  What I use to style rapidly...
                </Button>
              </p>
            </Jumbotron>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
              <Modal.Title style={{textAlign: 'center'}}>Login Example</Modal.Title>
            </Modal.Header>
              <Modal.Body>
              <Alert closeLabel="Close Alert" show={this.state.alertShow} variant={this.state.alertStatus} dismissible>
                <Alert.Heading>{this.state.alertStatus==="success"?"Congratulations! You're signed in!":"Incorrect Credentials"}</Alert.Heading>
                {this.state.alertStatus==="success"?(
                  `Your id is ${this.state.id}`
                ):("Credentials are incorrect")}
              </Alert>

              <form name="treasureCove" onSubmit={this.submission}>
                <Form.Group
                >
                  <Form.Label>Login</Form.Label>
                  <Form.Control
                    id="email"   
                    type="email"
                    onChange={this.emailChange}
                    required
                  />
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    id="password"
                    type="password"
                    onChange={this.passwordChange}
                    required
                  />
                  <hr/>
                  <Form.Control.Feedback />
                  <Button type="submit">Submit</Button>
                </Form.Group>
               </form>
            </Modal.Body>
             </Modal>
          </Container>
         /*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      */
    )
  }
}

export default App
