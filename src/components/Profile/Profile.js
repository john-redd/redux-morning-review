import React from 'react';
import { connect } from 'react-redux';

const Profile = props => {
  console.log(props);
  return (
    <div>
      <h1>Email: {props.userReducer.user.email}</h1>
    </div>
  )
}

const mapStateToProps = reduxState => {
  console.log(reduxState)
  const { userReducer } = reduxState;
  return {
    userReducer
  }
}

export default connect(mapStateToProps)(Profile)