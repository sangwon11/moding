import { CKEditor } from "@ckeditor/ckeditor5-react"
import Editor from "ckeditor5-custom-build/build/ckeditor"


function FundingRegPage() {
    const edrtorConfig = {
		toolbar: {
			items: [
				'heading',
				'|',
				'link',
				'imageUpload',
				'mediaEmbed',
				'imageInsert',
				'|',
				'horizontalLine',
				'|',
				'findAndReplace',
				'undo',
				'redo',
				'-',
				'bold',
				'italic',
				'fontSize',
				'fontFamily',
				'fontColor',
				'fontBackgroundColor',
				'|',
				'alignment',
				'outdent',
				'indent',
				'|',
				'bulletedList',
				'numberedList',
				'blockQuote'
			],
			shouldNotGroupWhenFull: true
		},
		language: 'ko',
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side',
				'linkImage'
			]
		},
    }

    return (
        <>
            <h2>Using CKEditor&nbsp;5 build in React</h2>
            <CKEditor
                editor={Editor}
                data="<p>Hello from CKEditor&nbsp;5!</p>"
                config={edrtorConfig}
                onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor)
                }}
                onChange={(event) => {
                    console.log(event)
                }}
                onBlur={(event, editor) => {
                    console.log("Blur.", editor)
                }}
                onFocus={(event, editor) => {
                    console.log("Focus.", editor)
                }}
            />
        </>
    )
}
export default FundingRegPage
