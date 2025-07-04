import {Navigate, Route, Routes} from "react-router-dom";
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
import CheckAuth from "./components/common/checkAuth.jsx";
import {Toaster} from "sonner";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {checkAuth} from "./store/auth-slice";
import {Skeleton} from "@/components/ui/skeleton";


function App() {

    // configure the checkAuth reducer
    const dispatch = useDispatch();

    // Dispatch the checkAuth action
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);


    // Get user and auth state from redux store
    const {isAuthenticated, user, isLoading} = useSelector(state => state.auth);

    // If loading, show loading spinner
    if (isLoading) {
        return <Skeleton className="h-[600px] w-[800px] bg-black"/>;
    }


    return (
        <div>
            {/* Auth Routes */}
            <Toaster position="top-center" richColors/>
            <Routes>
                <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout/>
                </CheckAuth>}>
                    <Route path="login" element={<AuthLogin/>}/>
                    <Route path="register" element={<AuthRegister/>}/>
                </Route>
                <Route path="/editor" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><EditorLayout/>
                </CheckAuth>}>
                    <Route path="panel" element={<EditorPanel/>}/>
                </Route>
                <Route path="/public" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><PublicLayout/>
                </CheckAuth>}>
                    <Route path="listing" element={<PublicListing/>}/>
                    <Route path="document/:id" element={<PublicDocument/>}/>
                </Route>
                <Route path="/private"
                       element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><PrivateLayout/>
                       </CheckAuth>}>
                    <Route path="listing" element={<PrivateListing/>}/>
                    <Route path="document/:id" element={<PrivateDocument/>}/>
                </Route>
                <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout/>
                </CheckAuth>}>
                    <Route path="panel" element={<AdminPanel/>}/>
                </Route>
                <Route path="/" element={<Navigate to="/public/listing"/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}

export default App
