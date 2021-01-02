import axios, {AxiosResponse} from 'axios';
import {DocumentListItem} from "../documents/DocumentsService";

export interface TranslationUpdateRequest {
    text: string | undefined;
    sourceLanguage: string | undefined;
    targetLanguage: string | undefined;
}

export async function fetchDocumentsToTranslationVerification() {
    return await axios(`http://localhost:8080/documents/translations`)
        .then((response: AxiosResponse<DocumentListItem[]>) => response.data);
}

export async function updateTranslation(translation: TranslationUpdateRequest, documentId: string | undefined) {
    if (translation.text == '')
        return;
    await axios.put(`http://localhost:8080/documents/${documentId}/translations`, translation, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response: AxiosResponse<Response>) => response.data);
}
