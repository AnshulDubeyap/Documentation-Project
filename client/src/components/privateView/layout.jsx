import {Outlet} from "react-router-dom";
import PrivateHeader from "./header";


function PrivateLayout() {
    return (
        <div>
            <PrivateHeader/>
            <div>
                <Outlet/>
            </div>

        </div>
    )
}

export default PrivateLayout;

