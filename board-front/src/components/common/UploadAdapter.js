import axios from 'axios';

const UPLOAD_BASE_URL = "http://localhost:8000/upload";

export default class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    data.append('image', await this.loader.file);
    
    return new Promise((resolve, reject) => {
      axios.post(UPLOAD_BASE_URL + '/image', data).then((response) => {
        // 이미지 업로드 성공 시 업로드된 이미지의 URL 반환
        resolve({
          default: response.data,
        });
      }).catch((error) => {
        // 이미지 업로드 실패 시 오류 메시지 반환
        alert("IMAGE 업로드 실패!!");
        reject(error);
      });
    });
  }
}
