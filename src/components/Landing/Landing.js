import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

export default class LandingPage extends Component {
    render() {
        return (
            <div className="LandingPage">
                <h3>Welcome to Petful,<br />a pet Adoption Center</h3>
                <p>Press the button below to get in line to adopt your new furry friend!</p>
                <h3><Link to={'/adoption'} className="btn">Adopt a Pet</Link></h3>
            </div>
        )
    }
}