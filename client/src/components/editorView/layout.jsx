import EditorHeader from "@/components/editorView/header.jsx";
import {Outlet} from "react-router-dom";
import "./layout.css";

function EditorLayout() {
    return (
        <div className="editor-layout-container">
            <div className="editor-layout-content">
                <EditorHeader/>
                <div className="editor-layout-main">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default EditorLayout;