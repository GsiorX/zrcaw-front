import {Document, DocumentDetails} from "../components/documents/DocumentsService";
import {useEffect, useState} from "react";
import {useAuthenticatedAxios} from "./authentication";
import {AxiosResponse} from "axios";
import {useAsyncResource} from "use-async-resource";

export interface DocumentPage {
    content: Document[],
    limit: number;
    start?: string;
    next?: string;
}

export interface Paginable {
    limit: number;
    next?: string;
}

export enum ProcessingStatus {
    FINISHED,
    MANUAL,
    FAILED,
    INSUFFICIENT_CONFIDENCE,
    NOT_STARTED
}

export const useDocuments = (paginable: Paginable = {limit: 10}, ocrStatuses: ProcessingStatus[] = [], translationStatuses: ProcessingStatus[] = []) => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [limit, setLimit] = useState<number>(paginable.limit);
    const [start, setStart] = useState<string | null>(paginable.next ? paginable.next : null);
    const [ocrStatusFilters, setOcrStatuses] = useState<ProcessingStatus[]>(ocrStatuses);
    const [translationStatusFilters, setTranslationStatuses] = useState<ProcessingStatus[]>(translationStatuses);
    const [prevStart, setPrevStart] = useState<string | null>(null);
    const [next, setNext] = useState<string | null>(null);
    const axiosHandler = useAuthenticatedAxios();


    useEffect(() => {
        const getFinalUrl = () => {
            let url = 'http://localhost:8080/documents';
            const queryParams = [];

            queryParams.push({
                limit: limit
            });

            if (start) {
                queryParams.push({next: start});
            }
            ocrStatusFilters.forEach(status => queryParams.push({ocrStatus: ProcessingStatus[status]}));
            translationStatusFilters.forEach(status => queryParams.push({translateStatus: ProcessingStatus[status]}));

            if (queryParams.length > 0) {
                const queryParamString = queryParams.map((param: any) => {
                    return Object.keys(param)
                        .map(objKey => `${objKey}=${param[objKey]}`)
                        .join("&");
                }).join("&");
                return `${url}?${queryParamString}`;
            }

            return url;
        };

        const fetchDocuments = async () => {
            const url = getFinalUrl();
            const documentPage = await axiosHandler(url)
                .then((response: AxiosResponse<DocumentPage>) => response.data);
            console.log("Fetching documents...", documentPage);
            setDocuments(documentPage.content);
            // setPrevStart(documentPage.start ? documentPage.start : null);
            setNext(documentPage.next ? documentPage.next : null);
        };

        fetchDocuments();
    }, [limit, start, ocrStatusFilters, translationStatusFilters]);

    const loadNextPage = () => {
        if (next === null) {
            return;
        }
        setPrevStart(start);
        setStart(next);
        setNext(null);
    };

    const loadPrevPage = () => {
        setNext(start);
        setStart(prevStart);
        setPrevStart(null);
    };

    const setPageSize = (limit: number) => {
        setPrevStart(null);
        setNext(null);
        setStart(null);
        setLimit(limit);
    };

    return {
        documents: documents,
        limit: limit,
        statuses: [ocrStatusFilters, translationStatusFilters],
        setLimit: setPageSize,
        setOCRStatuses: setOcrStatuses,
        setTranslationStatuses: setTranslationStatuses,
        isFirstPage: start === null,
        isLastPage: next === null,
        loadNextPage: loadNextPage,
        loadPrevPage: loadPrevPage,
    }
};

export const useDocument = () => {
    const axiosHandler = useAuthenticatedAxios();
    return useAsyncResource(async (id: string) => {
        const response = await axiosHandler(`/documents/${id}`);
        return response.data as DocumentDetails;
    });
};

export const useDocumentBase64Image = () => {
    const axiosHandler = useAuthenticatedAxios();
    return useAsyncResource(async (id: string) => {
        const url = `/documents/${id}/download`;
        const response = await axiosHandler(url, {responseType: "arraybuffer"});
        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        const contentType = response.headers["Content-Type"];
        return `data:${contentType};base64,${base64}`;
    })
};

export const useDownloadDocument = () => {
    const axiosHandler = useAuthenticatedAxios();
    return (id: string) => {
        axiosHandler(`/documents/${id}/download`, {method: 'GET', responseType: 'blob'})
            .then((response: AxiosResponse<any>) => {
                // content-disposition: attachment;filename=<NAME>
                const filename = (response.headers["content-disposition"] as string).replace('attachment;filename=', '');
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
    };
};

export interface DocumentUpdateTextRecognitionDTO {
    text: string;
}

export const useUpdateTextRecognition = () => {
    const axiosHandler = useAuthenticatedAxios();
    return (id: string, payload: DocumentUpdateTextRecognitionDTO) => {
        return axiosHandler(`/documents/${id}/ocrs`, { method: 'PUT', data: payload });
    }
};

export interface DocumentUpdateTranslationDTO {
    text: string;
    sourceLanguage: string;
    targetLanguage: string;
}

export const useUpdateTranslationRecognition = () => {
    const axiosHandler = useAuthenticatedAxios();
    return (id: string, payload: DocumentUpdateTranslationDTO) => {
        return axiosHandler(`/documents/${id}/translations`, { method: 'PUT', data: payload });
    }
};

export interface UploadDocumentDTO {
    name: string;
    sourceLanguage: string;
    targetLanguage: string;
    file: File | null;
}

export const useDocumentUpload = () => {
    const axiosHandler = useAuthenticatedAxios();
    return (payload: UploadDocumentDTO) => {
        const fileToSend = payload.file;
        if (fileToSend == null)
            return;
        var formData = new FormData();
        formData.append("file", fileToSend as Blob);
        formData.append("fileName", fileToSend.name);
        formData.append("mimeType", fileToSend.type);
        formData.append("name", payload.name);
        formData.append("sourceLang", payload.sourceLanguage);
        formData.append("targetLang", payload.targetLanguage);

        return axiosHandler('/documents',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            }).then((response: AxiosResponse<DocumentDetails>) => response.data);
    }
};