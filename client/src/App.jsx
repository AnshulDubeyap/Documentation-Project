import {Route, Routes} from "react-router-dom";
import AuthLayout from "./components/auth/layout.jsx";
import AuthLogin from "./pages/auth/login.jsx";
import AuthRegister from "./pages/auth/register.jsx";
import EditorLayout from "./components/editorView/layout.jsx";
import EditorPanel from "./pages/editorView/editorPanel.jsx";
import PublicLayout from "./components/publicView/layout.jsx";
import PublicListing from "./pages/publicView/publicListing.jsx";
import PublicDocument from "./pages/publicView/publicDoc.jsx";
import PrivateLayout from "./components/privateView/layout.jsx";
import PrivateListing from "./pages/privateView/privateListing.jsx";
import PrivateDocument from "./pages/privateView/privateDoc.jsx";
import AdminLayout from "./components/adminView/layout.jsx";
import AdminPanel from "./pages/adminView/adminPanel.jsx";
import NotFound from "./pages/notFound/notFound.jsx";

function App() {
    return (
        <div>
            {/* Auth Routes */}
            <Routes>
                <Route path="/auth" element={<AuthLayout/>}>
                    <Route path="login" element={<AuthLogin/>}/>
                    <Route path="register" element={<AuthRegister/>}/>
                </Route>
                <Route path="/editor" element={<EditorLayout/>}>
                    <Route path="panel" element={<EditorPanel/>}/>
                </Route>
                <Route path="/" element={<PublicLayout/>}>
                    <Route path="listing" element={<PublicListing/>}/>
                    <Route path="document/:id" element={<PublicDocument/>}/>
                </Route>
                <Route path="/private" element={<PrivateLayout/>}>
                    <Route path="listing" element={<PrivateListing/>}/>
                    <Route path="document/:id" element={<PrivateDocument/>}/>
                </Route>
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route path="panel" element={<AdminPanel/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}

export default App
