import {Outlet} from "react-router-dom";
import "./layout.css"

function AuthLayout() {
    return (
        <div className="layout-container">
            <div className="left">
                <div className="left-content">
                    <h1 className="title">Welcome to the Documentation App</h1>
                </div>
            </div>
            <div className="right">
                <Outlet/>
            </div>

        </div>
    )
}

export default AuthLayout