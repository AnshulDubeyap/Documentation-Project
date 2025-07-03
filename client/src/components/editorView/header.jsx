import {Button} from "@/components/ui/button.jsx";
import {AlignJustify, LogOut} from "lucide-react";
import "./header.css"

function EditorHeader() {
    return (
        <div className="editor-header-container">
            {/* Menu button and icon */}
            <Button className="menu-button">
                <AlignJustify/>
                <span className="menu-button-text">Toggle Menu</span>
            </Button>
            <div className="header-right">
                <Button className="logout-button">
                    <LogOut/>
                    Logout
                </Button>
            </div>

        </div>
    )
}

export default EditorHeader