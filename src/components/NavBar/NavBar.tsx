/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-use-before-define //
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.scss"
import PortUpdate from '../../components/PortUpdate/PortUpdate'
import FileUpdate from '../../components/FileUpdate/FileUpdate'
// @ts-ignore
import logo from "../../../assets/img/eeQl_logo.png"
const NavBar = () => {
    
    return (
        <div className="dropdown"> 

                <Link to='/'><button className="dropbtn"><img src={logo} alt="eeql_logo" width='100' height='100'/></button></Link>
                <div id='nav-text'>FILE: </div><FileUpdate />
                <div id='nav-text'>PORT: </div><PortUpdate />
      </div>
    )
}


export default NavBar