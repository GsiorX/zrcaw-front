import axios, {AxiosResponse} from "axios";

export interface DocumentListItem {
    documentId: string;
    name: string;
}

export interface DocumentDetails {
    documentId: string;
    name: string;
    fileDetails: FileDetails;
    translationResult: TranslationResult | null;
    textRecognitionResult: TextRecognitionResult | null;
}

export interface FileDetails {
    objectKey: string;
    bucketName: string;
}

export interface TranslationResult {
    resultType: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
}

export interface TextRecognitionResult {
    resultType: string;
    confidence: number;
    result: string;
}

export async function fetchDocuments() {
    return await axios(`http://localhost:8080/documents`)
        .then((response: AxiosResponse<DocumentListItem[]>) => response.data);
}

export async function getDocument(documentId: string) {
    return await axios(`http://localhost:8080/documents/${documentId}`)
        .then((response: AxiosResponse<DocumentDetails>) => response.data);
}