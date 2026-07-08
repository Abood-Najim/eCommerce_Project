import React from 'react'
import { Link } from 'react-router-dom'
import { useCounterStore } from '../../store/useCounterStore'

export default function Navbar() {
  
  const counter = useCounterStore((state)=> state.counter)
  return (
    <nav>
      <Link to="/">Home - {counter}</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/products">Products</Link>
    </nav>
  )
}
