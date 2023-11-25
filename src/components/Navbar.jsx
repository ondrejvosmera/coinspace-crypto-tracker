import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
        <Link to='/' className='navbar-title'>
            <h1>Coinspace</h1>
        </Link>
    </div>
  )
}

export default Navbar