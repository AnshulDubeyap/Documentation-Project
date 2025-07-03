import {Outlet} from "react-router-dom";
import AdminHeader from "./header.jsx";


function AdminLayout() {
    return (
        <div>
            <AdminHeader/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminLayout;