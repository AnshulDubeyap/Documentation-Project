import EditorHeader from "@/components/editorView/header.jsx";
import {Outlet} from "react-router-dom";

function EditorLayout() {
    return (
        <div>
            <div>
                <EditorHeader/>
                <div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default EditorLayout;