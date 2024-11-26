const { message } = require("antd");
const { axiosInstance } = require("App");

export const UploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const resp = await axiosInstance.post('/upload', formData);
        return resp.data;
    } catch (e) {
        console.log(e)
        message.error('Failed to upload file');
    }
}