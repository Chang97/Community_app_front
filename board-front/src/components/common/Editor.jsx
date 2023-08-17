import { useMemo, useRef, useState, useEffect} from "react"
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css"
import {storage} from "../../Firebase.mjs";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

Quill.register("modules/imageResize", ImageResize);

function Editor({value, onChange}) {
  // quill 에디터 컴포넌트 ref
  const quillRef = useRef();
  
  
  const [editorContent, setEditorContent] = useState(value);

  const handleEditorChange = (content) => {
    setEditorContent(content);
    onChange(content);
  };

  // 이미지 핸들러
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "/image/*");
    input.click();
    input.addEventListener("change", async () => {
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);
      try {
        // 파일명을 "image/Date.now()"로 저장
        const storageRef = ref(
          storage,
          `image/${Date.now()}`
        );
        // Firebase Method : uploadBytes, getDownloadURL
        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // 이미지 URL 에디터에 삽입
            editor.insertEmbed(range.index, "image", url);
            // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
            editor.setSelection(range.index + 1);
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule("toolbar");
      toolbar.addHandler("image", imageHandler);
    }
    // eslint-disable-next-line
  }, []);

  // quill에서 사용할 모듈
  // useMemo를 사용하여 modules가 렌더링 시 에디터가 사라지는 버그를 방지
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
        ],
      },
      imageResize: {
        // https://www.npmjs.com/package/quill-image-resize-module-react 참고
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      }
    }
  }, []);

  return (
      <ReactQuill
        style={{ width: "600px" }}
        placeholder="Quill Content"
        theme="snow"
        ref={quillRef}
        value={editorContent}
        onChange={handleEditorChange}
        modules={modules}
        preserveWhitespace
      />
  )
}  
export default Editor;