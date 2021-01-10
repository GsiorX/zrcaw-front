import {Document, DocumentDetails} from "../components/documents/DocumentsService";
import {useEffect, useRef, useState} from "react";
import {useAuthenticatedAxios} from "./authentication";
import axios, {AxiosResponse} from "axios";
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

export const useDocument = (id: string) => {
    const axiosHandler = useAuthenticatedAxios();
    return useAsyncResource(async () => {
        const response = await axiosHandler(`http://localhost:8080/documents/${id}`);
        return response.data;
    });
};