import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../../provider/StateProvider';
// @ts-ignore
import eeQL2 from "../../../assets/img/eeql_logo_copy.png"
import FileUpload from '../../components/FileUpload/FileUpload'
import './Landing.scss'


const Landing = () => {
    const { activePortHandler }: any = useContext(StateContext);

    const setPort = (e) => {
        e.preventDefault()
        activePortHandler(e.target.value)
    }

    return (
        <div>
        <div id='landing'>
            <img id='logo' src={eeQL2} alt="eeql"/>
            <div className='input'>
            <input type='text' placeholder='localhost:8080' onChange={(e) => setPort(e)}></input>
            <FileUpload />
            <Link to='/home'><button id='upload-button' type="button">go</button></Link>
            </div>
        </div>
        </div>
    )
}

export default Landing