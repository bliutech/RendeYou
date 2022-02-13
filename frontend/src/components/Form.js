import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: '',
            pass: '',
        };
        this.updateUname = this.updateUname.bind(this);
        this.updatePass = this.updatePass.bind(this);
    }

    updateUname(event) {
        this.setState({uname: event.target.value});
    }

    updatePass(event) {
        this.setState({pass: event.target.value});
    }

    render() {
        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                this.props.onSubmit(this.state.uname, this.state.pass)
            }}>
                <legend>Username</legend>
                <input value={this.state.uname} 
                onChange={this.updateUname}
                />
                <legend>Password</legend>
                <input type="password" value={this.state.pass}
                onChange={this.updatePass}
                />
                <input type="submit" value="Submit"/>
            </form>
            
        );
    }
}

export default Form;


