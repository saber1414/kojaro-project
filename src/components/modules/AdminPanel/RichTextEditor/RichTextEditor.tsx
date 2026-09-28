"use client"
import { useCallback } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

type RichTextEditorProps = {
    value: string;
    onChange: (content: string) => void;
    height?: string;
    placeholder?: string;
};

export const RichTextEdito = ({ value, onChange, height = "50rem", placeholder = "متن مقاله" }: RichTextEditorProps) => {
    const handleImageUpload = useCallback((
        files: File[],
        _info: unknown,
        uploadHandler: (response: { errorMessage?: string, result?: Array<{ url: string, name: string, size: number }> }) => void,
    ) => {
        if (!files || files.length === 0) {
            uploadHandler({ errorMessage: "فایلی انتخاب نشده است" })
            return false;
        };

        const file = files[0];

        if (file.size > 5 * 1024 * 1024) {
            uploadHandler({ errorMessage: "حجم فایل بیش از حد مجاز" })
            return false
        };

        const formData = new FormData();

        formData.append("file", file);

        fetch("/api/upload-image", { method: "POST", body: formData })
            .then((res) => {
                if (!res) throw new Error();
                return res.json() as Promise<{ url: string }>
            })
            .then((data) => {
                uploadHandler({ result: [{ url: data.url, name: file.name, size: file.size }] })
            })
            .catch(() => {
                uploadHandler({ errorMessage: "خطای غیر منتظره رخ داد" })
            })
        return false
    }, []);

    return (
        <div dir="rtl">
            <SunEditor
                setContents={value}
                onChange={onChange}
                height={height}
                placeholder={placeholder}
                setDefaultStyle={`
                    font-family: "IRANYekanMedium", "Tahoma", "Arial", sans-serif !important;
                    direction: rtl;
                    text-align: right;
                `}
                setOptions={{
                    buttonList: [
                        ["undo", "redo"],
                        ["font", "fontSize", "formatBlock"],
                        ["paragraphStyle", "blockquote"],
                        ["bold", "italic", "underline", "strike"],
                        ["fontColor", "hiliteColor"],
                        ["removeFormat"],
                        ["outdent", "indent"],
                        ["align", "horizontalRule", "list", "lineHeight"],
                        ["table", "link", "image", "video"],
                        ["fullScreen", "showBlocks", "codeView"],
                    ],
                    imageMultipleFile: false,
                    imageAccept: ".jpg,.jpeg,.png,.gif,.webp",
                    imageWidth: "100%",
                    imageHeight: "auto",
                    imageResizing: true,
                }}
                onImageUploadBefore={handleImageUpload}
            >

            </SunEditor>
        </div>
    )
};