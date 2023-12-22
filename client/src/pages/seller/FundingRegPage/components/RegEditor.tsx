import React, { useEffect, useState } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import Editor from "ckeditor5-custom-build/build/ckeditor"

import "./ckediter/CKEditer.styles.css"
import { editorConfig } from "./ckediter/CKEditer.config"
import uploadPlugin from "./ckediter/CKEditer.function"
import * as styled from "./../FundingRegPage.styles"

function RegEditor() {
    const [editorData, setEditorData] = useState("");

    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        setEditorData(data);
    };

    return (
        <styled.CKEitorWrap>
            <CKEditor
                editor={Editor}
                data=""
                config={editorConfig}
                onReady={(editor: any) => {
                    uploadPlugin(editor)
                }}
                onChange={handleEditorChange}
            />
            <pre className="text-white">{JSON.stringify(editorData, null, 2)}</pre>
        </styled.CKEitorWrap>
    )
}

export default RegEditor
