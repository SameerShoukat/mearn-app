import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

export default class Navbar extends Component{
    render(){
        return(
            <div className="bg-dark style-navbar">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-3">
                        <h2>EXTR</h2>
                        </div>
                        <div className="col-6 align-self-center">
                        <ul>
                            <li >
                                <Link to="/" className="style-link"> Exercises</Link>
                            </li>
                            <li>
                                <Link to="/create" className="style-link">Create Exercise Log</Link>
                            </li>
                            <li >
                                <Link to="/user" className="style-link">Create User</Link>
                            </li>
                            <li></li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
