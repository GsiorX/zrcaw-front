import axios, {AxiosResponse} from 'axios';

export interface Document {
    id: string;
    name: string;
    uploadedBy: string;
    uploadedAt: string;
    modifiedBy?: string;
    modifiedAt?: string;
    originalName: string;
    ocrResult?: string;
    ocrConfidence: number;
    translationResult?: string;
    translationConfidence: number;
}

export interface DocumentDetails {
    id: string;
    name: string;
    uploadedBy: string;
    uploadedAt: string;
    modifiedBy: string;
    modifiedAt: string;
    fileDetails: FileDetails;
    translationResult?: TranslationResult | null;
    textRecognitionResult?: TextRecognitionResult | null;
}

export interface FileDetails {
    objectKey: string;
    bucketName: string;
    originalName: string;
}

export interface TranslationResult {
    resultType: string;
    confidence: number;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    translatedAt: string;
}

export interface TextRecognitionResult {
    resultType: string;
    confidence: number;
    result: string;
    ocrProcessedAt: string;
}

export async function fetchDocuments() {
    return await axios(`http://localhost:8080/documents`)
        .then((response: AxiosResponse<Document[]>) => response.data)
        .then(documents => {
            console.info(documents);
            return documents;
        });
}

export async function fetchDocument(documentId: string) {
    return await axios(`http://localhost:8080/documents/${documentId}`)
        .then((response: AxiosResponse<DocumentDetails>) => response.data);
}

export function downloadDocument(file: FileDetails) {
    axios({
        url: getFileUrl(file.bucketName, file.objectKey),
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
