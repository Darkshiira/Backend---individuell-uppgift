import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
  return (
    <nav>

        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/todolist">Todolist</Link></li>
        </ul>
</nav>
  )
}

export default Nav