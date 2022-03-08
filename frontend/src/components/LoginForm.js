import React from 'react';
import classes from './LoginForm.module.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      pass: '',
    }
    this.updateUname = this.updateUname.bind(this)
    this.updatePass = this.updatePass.bind(this)
  }

  updateUname(event) {
    this.setState({ uname: event.target.value })
  }

  updatePass(event) {
    this.setState({ pass: event.target.value })
  }

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          this.props.onSubmit(this.state.uname, this.state.pass)
        }}
      >
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
    )
  }
}

export default LoginForm
