import {Button} from '../ui/button'
import {LogOut} from 'lucide-react'
import "./header.css"

function EditorHeader() {
    return (
        <header className="editor-header">
            <div className="editor-container">
                <div className="editor-logo">Editor Panel</div>
                <div className="logout">
                    <Button className="login-button">
                        <LogOut/>
                        <span className="login-text">Logout</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default EditorHeader