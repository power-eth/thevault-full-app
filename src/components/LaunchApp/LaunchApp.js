import React from 'react'
import { useNavigate } from 'react-router-dom'
import './LaunchApp.css'

const LaunchApp = () => {
    let navigate = useNavigate();
    return(
        <div className="first-visit">
            <button onClick={() => {
                navigate('/home');
            }}
            >Launch App</button>
        </div>
    )     
}

export default LaunchApp;

