export class CustomUploadAdapter {
    loader: any
    imageInfo: any = null

    constructor(loader: any) {
        this.loader = loader
    }

    upload() {
        return new Promise((resolve, reject) => {
            this.loader.file.then((file: any) => {

                const fileExtension = file.name.split(".").pop() 
                const uniqueFileName = `${Date.now()}.${fileExtension}`

                const data = new FormData()
                data.append("name", uniqueFileName)
                data.append("file", file)

                this.imageInfo = {
                    name: uniqueFileName,
                    url: window.URL.createObjectURL(file),
                }

                resolve({ default: window.URL.createObjectURL(file) })
            })
        })
    }

    abort() {
        return alert("사진업로드 과정중 문제가 발생했습니다.")
    }
}

function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
        return new CustomUploadAdapter(loader)
    }
}

export default uploadPlugin
