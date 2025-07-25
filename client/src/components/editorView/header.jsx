import {Button} from '../ui/button';
import {LogOut} from 'lucide-react';
import "./header.css";
import {useNavigate} from "react-router-dom";

function EditorHeader() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                credentials: "include", // 🔐 important to send the cookie
            });

            const data = await response.json();

            if (data.success) {
                navigate("/"); // ✅ redirect after logout
            } else {
                alert("Logout failed: " + data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("Something went wrong during logout.");
        }
    };

    return (
        <header className="editor-header">
            <div className="editor-container">
                <div className="editor-logo">Editor Panel</div>
                <div className="logout">
                    <Button className="login-button" onClick={handleLogout}>
                        <LogOut/>
                        <span className="login-text">Logout</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default EditorHeader;
