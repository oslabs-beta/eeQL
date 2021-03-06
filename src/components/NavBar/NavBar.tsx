/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-use-before-define //
import React, { useContext } from 'react';
import "./NavBar.scss"
// @ts-ignore
import logo from "../../../assets/img/eeQl_logo.png"

const NavBar = () => {
    
    return (
        <div>
            <div className="dropdown">
                <button className="dropbtn"><img src={logo} alt="eeql_logo" width='50' height='50'/></button>
                <div className="dropdown-content">
                    <a href="/">Home</a>
                    <a href="/">Visualize</a>
                </div>
            </div>
      </div>
    )
}


export default NavBar