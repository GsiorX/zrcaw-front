import React, {useEffect, useRef} from 'react';

import {useParams} from "react-router-dom";
import {useDocument} from "../../../hooks/documents";
import {DocumentDetails} from "../DocumentsService";
import {LazyDataOrModifiedFn} from "use-async-resource";
import DocumentDetailsComponent from "./DocumentDetails";

interface DocumentInfoComponentProps {
    documentDetails: LazyDataOrModifiedFn<DocumentDetails>;
}

const DocumentInfoComponent = (props: DocumentInfoComponentProps) => {
    const documentDetails = props.documentDetails();

    return (
        <div className='document--info--container'>
            {documentDetails && <DocumentDetailsComponent {...documentDetails} />}
            <div className='document--data'>
                {/*<DataGrid*/}
                {/*    rows={rows}*/}
                {/*    columns={[*/}
                {/*        {*/}
                {/*            field: 'name',*/}
                {/*            headerName: 'ID'*/}
                {/*        },*/}
                {/*        {*/}
                {/*            field: 'propertyName',*/}
                {/*            headerName: 'Property'*/}
                {/*        },*/}
                {/*        {*/}
                {/*            field: 'propertyValue',*/}
                {/*            headerName: 'Value'*/}
                {/*        }*/}
                {/*    ]}*/}
                {/*/>*/}
            </div>
            <div className='document--image'>

            </div>
            {/*<pre>*/}
            {/*    {JSON.stringify(documentDetails, null, 2)}*/}
            {/*</pre>*/}
            {/*<img className='image' src={getFileUrl(currentImage.fileInfo.bucketName, currentImage.fileInfo.objectKey)} alt='Resource not found :(' />*/}
        </div>
    )
};

const DocumentComponent: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [document, fetchDocument] = useDocument();
    const fetchDocumentRef = useRef(fetchDocument);

    useEffect(() => {
        fetchDocument(id);
    }, [id, fetchDocumentRef]);

    return (
        <div>
            <React.Suspense fallback={<p>Waiting....</p>}>
                <DocumentInfoComponent documentDetails={document}/>
            </React.Suspense>
        </div>
    );
};

export default DocumentComponent;
