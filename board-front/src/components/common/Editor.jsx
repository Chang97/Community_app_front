import React, {useState} from 'react'
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from './UploadAdapter';

const Editor = ({onChange, value }) => { // (1)
    return (
        <CKEditor
            editor={ClassicEditor}
            data={value }
            config={{ // (4)
                extraPlugins: [UploadAdapter]
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
        />
    )
}

export default Editor