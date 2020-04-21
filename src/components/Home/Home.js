import React, { Component } from "react";
import axios from "axios";
import './home.css';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/reducers/userReducer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {},
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleRegister = () => {
    const { email, password } = this.state;
    axios
      .post("/api/auth/register", { email, password })
      .then((res) => {
        console.log(res.data);
        this.props.updateUser(res.data);
        this.props.history.push("/profile");
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({
          error: err.response.data,
        });
      });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    axios
      .post("/api/auth/login", { email, password })
      .then((res) => {
        console.log(res.data);
        this.props.updateUser(res.data);
        this.props.history.push("/profile");
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({
          error: err.response.data,
        });
      });
  };

  render() {
    return (
      <div className='home-container'>
        <div className='card'>
          <div className='home-input-container'>
            <div className='input'>
              <label>Email:</label>
              <input
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className='home-button-container'>
            <button onClick={this.handleRegister} className='button'>Register</button>
            <button onClick={this.handleLogin} className='button'>Login</button>
          </div>
        {this.state.error.message && (
          <div className='error-message'>
            <p>{this.state.error.message}</p>
          </div>
        )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect( null, mapDispatchToProps )(Home);
