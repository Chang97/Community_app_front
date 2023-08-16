import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import ImageResize from "quill-image-resize-module-react";

ReactQuill.register("modules/imageResize", ImageResize);
ReactQuill.Quill.getEditor()

function Editor({ placeholder, value, ...rest }) {
    // quill 에디터 컴포넌트 ref
    const quillRef = useRef(null);

    const Quill = useRef(ReactQuill.Quill);

    useEffect(() => {
      const handleImage = () => {
        // 이미지 핸들 로직
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
          const file = input.files[0];

          // 현재 커서 위치 저장
          const range = Quill.getEditor().getSelection(true);

          // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
          Quill.getEditor().insertEmbed(range.index, "image", `/images/loading.gif`);

          try {
            // 필자는 파이어 스토어에 저장하기 때문에 이런식으로 유틸함수를 따로 만들어줬다 
            // 이런식으로 서버에 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현하면 된다 
            const formData = new FormData();
            formData.append('multipartFiles', file);

            const response = await fetch(`http://localhost:8000/upload/uploadImage`, {
              method: 'POST',
              body: formData,
            });

            if (response.ok) {
              const url = await response.text();
              // 정상적으로 업로드 됐다면 로딩 placeholder 삭제
              Quill.getEditor().deleteText(range.index, 1);
              // 받아온 url을 이미지 태그에 삽입
              Quill.getEditor().insertEmbed(range.index, "image", url);
              
              // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
              Quill.getEditor().setSelection(range.index + 1);
            } else {
              throw new Error('Image upload failed');
            }
          } catch (e) {
            Quill.getEditor().deleteText(range.index, 1);
          }
        };
        }
        
        if (quillRef.current) {
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
            }, 
            imageResize: {
              // https://www.npmjs.com/package/quill-image-resize-module-react 참고
              parchment: Quill.import("parchment"),
              modules: ["Resize", "DisplaySize", "Toolbar"],
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