import axios, {AxiosResponse} from 'axios';

import {DocumentDetails} from "../documents/DocumentsService";

export interface TextRecognitionUpdateRequest {
    text: string | undefined;
}

export async function fetchDocumentsToTextRecognitionVerification() {
    return await axios(`http://localhost:8080/documents/ocrs`)
        .then((response: AxiosResponse<DocumentDetails[]>) => response.data);
}

export async function updateTextRecognition(textRecognition: TextRecognitionUpdateRequest, documentId: string | undefined) {
    if (textRecognition.text == '')
        return;

    return await axios.put(`http://localhost:8080/documents/${documentId}/textRecognition`, textRecognition, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response: AxiosResponse<Response>) => response.data);
}
