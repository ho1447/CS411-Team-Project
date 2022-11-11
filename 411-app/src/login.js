import React from 'react'
import './login.css';
import {loginUrl} from "./spotify.js";

function Login() {
    
    return (
        <div className ="btn">
            <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}

export default Login