import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/products">Products</Link>
    </nav>
  )
}
