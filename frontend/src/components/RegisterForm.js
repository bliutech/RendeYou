import React from 'react';
import classes from './RegisterForm.module.css';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      uname: '',
      pass: '',
      email: '',
      hostedEvents: [],
      friends: [],
      image: '',
    };
    this.updateUname = this.updateUname.bind(this);
    this.updatePass = this.updatePass.bind(this);
    this.updatefirstName = this.updatefirstName.bind(this);
    this.updatelastName = this.updatelastName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }

  updateUname(event) {
    this.setState({ uname: event.target.value });
  }

  updatePass(event) {
    this.setState({ pass: event.target.value });
  }

  updatefirstName(event) {
    this.setState({ firstName: event.target.value });
  }

  updatelastName(event) {
    this.setState({ lastName: event.target.value });
  }

  updateEmail(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onSubmit(
            this.state.uname,
            this.state.pass,
            this.state.firstName,
            this.state.lastName,
            this.state.email
          );
        }}
      >
        <legend>First Name</legend>
        <input
          value={this.state.firstName}
          onChange={this.updatefirstName}
          placeholder='Enter First Name'
        />
        <legend>Last Name</legend>
        <input
          value={this.state.lastName}
          onChange={this.updatelastName}
          placeholder='Enter Last Name'
        />
        <legend>Email</legend>
        <input
          value={this.state.email}
          onChange={this.updateEmail}
          placeholder='Enter Email'
        />
        <legend>Username</legend>
        <input
          value={this.state.uname}
          onChange={this.updateUname}
          placeholder='Enter Username'
        />
        <legend>Password</legend>
        <input
          type='password'
          value={this.state.pass}
          onChange={this.updatePass}
          placeholder='Enter Password'
        />
        <br />
        <input type='submit' value='Submit' className={classes.button}/>
      </form>
    );
  }
}

export default RegisterForm;
