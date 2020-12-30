import axios, {AxiosResponse} from 'axios';

export interface Document {
    documentId: Number;
}

export async function fetchDocuments() {
    const result: Document[] = await axios('http://localhost:8080/documents')
        .then((response: AxiosResponse<Document[]>) => response.data);
    return result;
}

export interface FileObject {
    objectKey: string;
    size: number;
}

export async function fetchDocument(document: Document) {
    const result: Document = await axios(`http://localhost:8080/documents/${document.documentId}`)
        .then((response: AxiosResponse<Document>) => response.data);
    return result;
}

export function downloadDocument(bucketName: string, file: FileObject) {
    axios({
        url: getFileUrl(bucketName, file.objectKey),
        method: 'GET',
        responseType: 'blob'
    }).then((response: AxiosResponse<any>) => {
        const filename = file.objectKey.replace(/^.*[\\/]/, '');
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })
}

export function getFileUrl(bucketName: String, objectKey: string) {
    return `http://localhost:8080/buckets/${bucketName}/files/${objectKey}`
}

export async function uploadDocument(bucketName: string, file: File) {
    var formData = new FormData();

    formData.append("file", file as Blob);
    formData.append("fileName", file.name);
    formData.append("mimeType", file.type);

    await axios.post(`http://localhost:8080/documents`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
