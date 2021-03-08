/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-use-before-define //
import React, { useContext } from 'react';
import "./NavBar.scss"
// @ts-ignore
import logo from "../../../assets/img/eeQl_logo.png"
import Button from '../../../node_modules/@material-ui/core/Button';
const NavBar = () => {
    
    return (
        <div className="dropdown"> 
 
                <button className="dropbtn"><img src={logo} alt="eeql_logo" width='100' height='100'/></button>
                
                <div className="dropdown-content">
                    <a href="/">Home</a>
                    <a href="/">Visualize</a>
                </div>
            <div className='port'>
            <Button className='port' variant="contained" color="secondary">PORT: 8080</Button>
            </div>
      </div>
    )
}


export default NavBar