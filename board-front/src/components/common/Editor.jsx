import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

function Editor({ placeholder, value, ...rest }) {
    // quill 에디터 컴포넌트 ref
    const quillRef = useRef(null);

    useEffect(() => {
        const handleImage = () => {
        // 이미지 핸들 로직
        }
        
        if (quillRef.current) {
          //const { getEditor } = quillRef.current;
          const toolbar = quillRef.current.getEditor().getModule("toolbar");
          toolbar.addHandler("image", handleImage);
        }
    }, []);
  
    return (
      <div>
        <ReactQuill
          {...rest}
          placeholder={placeholder}
          value={value || ""}
          theme="snow" 
          modules={{
            toolbar: {
              container: [
                ["link", "image", "video"],
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                ["blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
              ]
            }
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "align",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "background",
            "color",
            "link",
            "image",
            "video",
            "width",
          ]}
        />
      </div>
    );
  }
  
  export default Editor;