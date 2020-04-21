import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const Nav = props => {
  const handleLogout = () => {
    axios.delete('/api/auth/logout')
    .then(() => {
      props.history.push('/')
    })
    .catch(err => console.log(err.response))
  }
  return (
    <header>
      <nav>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  )
}

export default withRouter(Nav);