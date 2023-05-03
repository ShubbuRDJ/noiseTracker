import React from 'react'
import './navbar.scss'

export default function Navbar() {
  return (
        <nav className="navbar  navbar-expand-lg navbar-light " style={{backgroundColor:"#12c9b7"}}>
        <div className="container-fluid">
            <a className="navbar-brand" href="/"><strong>Noise Tracker</strong></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/">About us</a>
                </li>
                
            </ul>
            </div>
        </div>
        </nav>
  )
}