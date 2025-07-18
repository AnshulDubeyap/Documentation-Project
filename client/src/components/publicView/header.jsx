import React from "react";
import {Button} from "../ui/button";
import "./header.css"
import {LogIn} from "lucide-react";
import {useNavigate} from "react-router-dom";

function PublicHeader() {
    const navigate = useNavigate();

    const HandleClick = () => {
        navigate("/auth/login");
    }

    
    return (
        <div className="public-header">

            <div className="logo">
                <p className="logo-text">Happy Docs</p>
            </div>

            <div className="login">
                <Button className="login-button" onClick={HandleClick}>
                    <LogIn/>
                    <span className="login-text">Login</span>
                </Button>
            </div>
        </div>
    )
}

export default PublicHeader;