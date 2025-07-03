import {Outlet} from "react-router-dom";
import PublicHeader from "./header";

function PublicLayout() {
    return (
        <div>
            <PublicHeader/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default PublicLayout;