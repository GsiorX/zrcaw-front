import React from 'react';

import {useParams} from "react-router-dom";
import {useDocument} from "../../../hooks/documents";
import {DocumentDetails} from "../DocumentsService";
import {LazyDataOrModifiedFn} from "use-async-resource";

interface DocumentInfoComponentProps {
    documentDetails: LazyDataOrModifiedFn<DocumentDetails>;
}

const DocumentInfoComponent = (props: DocumentInfoComponentProps) => {
    const documentDetails = props.documentDetails();
    console.log(props.documentDetails());
    return (
        <div>
            <pre>
                {JSON.stringify(documentDetails, null, 2)}
            </pre>
            {/*<img className='image' src={getFileUrl(currentImage.fileInfo.bucketName, currentImage.fileInfo.objectKey)} alt='Resource not found :(' />*/}
        </div>
    )
};

const DocumentComponent: React.FC = (props: any) => {
    const {id} = useParams<{ id: string }>();
    const [ document ] = useDocument(id);
    return (
        <div>
            <React.Suspense fallback={<p>Waiting....</p>}>
                <DocumentInfoComponent documentDetails={document}/>
            </React.Suspense>
        </div>
    );
};

export default DocumentComponent;
