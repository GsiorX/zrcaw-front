import React from 'react';
import {CellParams, ColDef} from "@material-ui/data-grid";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import DocumentsComponent, {DetailsButton} from "../documents/DocumentsComponent";
import {ProcessingStatus} from "../../hooks/documents";
import {useHistory} from "react-router";
import {Button} from "@material-ui/core";
import {VerifyTranslationButton} from "../../utils/verifyButton";

// export const VerifyTranslationButton: React.FC<{ params: CellParams }> = ({params}) => {
//     const history = useHistory();
//
//     const onClick = () => {
//         history.push(`/translationVerification/${params.row.id}`);
//     };
//
//     return <Button className='verify--translation--button' variant="contained" onClick={onClick}>Verify</Button>;
// };

const columns: ColDef[] = [
    {
        field: 'details--button',
        headerName: 'Details',
        disableClickEventBubbling: true,
        renderCell: (params: CellParams) => {
            return <DetailsButton params={params}/>;
        }
    },
    {
        field: 'verify--button',
        headerName: 'Verify Translation',
        disableClickEventBubbling: true,
        renderCell: (params: CellParams) => {
            return <VerifyTranslationButton
                link={(id: string) => `/translationVerification/${id}`}
                text='Verify'
                params={params}
            />
        }
    },
    {
        field: 'name', headerName: 'Name', width: 200,
        renderCell: (params: CellParams) => {
            if (!params.value) {
                return <div/>
            }
            return (
                <Tooltip title={params.value.toString()}>
                    <p>{params.value}</p>
                </Tooltip>
            )
        }
    },
    {
        field: 'uploadedBy', headerName: 'Uploaded By', width: 150,
        renderCell: (params: CellParams) => {
            if (!params.value) {
                return <div/>
            }
            return (
                <Tooltip title={params.value.toString()}>
                    <p>{params.value}</p>
                </Tooltip>
            )
        }
    },
    {
        field: 'uploadedAt', headerName: 'Upload Date', width: 200,
        renderCell: (params: CellParams) => {
            if (!params.value) {
                return <div/>
            }
            const date = new Date(params.value as string);
            return (
                <Tooltip title={date.toUTCString()}>
                    <p>{date.toUTCString()}</p>
                </Tooltip>
            );
        }
    },
    {
        field: 'modifiedBy', headerName: 'Modified By', width: 150,
        renderCell: (params: CellParams) => {
            if (!params.value) {
                return <div/>
            }
            return (
                <Tooltip title={params.value.toString()}>
                    <p>{params.value}</p>
                </Tooltip>
            )
        }
    },
    {
        field: 'modifiedAt', headerName: 'Modify Date', width: 200,
        renderCell: (params: CellParams) => {
            if (!params.value) {
                return <div/>
            }
            const date = new Date(params.value as string);
            return (
                <Tooltip title={date.toUTCString()}>
                    <p>{date.toUTCString()}</p>
                </Tooltip>
            );
        }
    },
    {
        field: 'ocrResult', headerName: 'OCR (Status)', width: 200,
        renderCell: (params: CellParams) => {
            if (!params.value) {
                return <div/>
            }
            return (
                <Tooltip title={params.value.toString()}>
                    <p>{params.value}</p>
                </Tooltip>
            )
        }
    },
    {
        field: 'ocrConfidence', headerName: 'OCR (Confidence)',
        renderCell: (params: CellParams) => {
            if (!params.value) {
                return <div/>
            }
            const value = `${parseFloat(params.value.toString()).toFixed(2)}%`;
            return (
                <Tooltip title={value}>
                    <p>{value}</p>
                </Tooltip>
            );
        }
    },
    {
        field: 'translationResult', headerName: 'Translation (Status)', width: 230,
        renderCell: (params: CellParams) => {
            if (!params.value) {
                return <div/>
            }
            return (
                <Tooltip title={params.value.toString()}>
                    <p>{params.value}</p>
                </Tooltip>
            )
        }
    },
    {
        field: 'translationConfidence', headerName: 'Translation (Confidence)',
        renderCell: (params: CellParams) => {
            if (!params.value) {
                return <div/>
            }
            const value = `${parseFloat(params.value.toString()).toFixed(2)}%`;
            return (
                <Tooltip title={value}>
                    <p>{value}</p>
                </Tooltip>
            );
        }
    }
];

const TranslationVerifyDocumentsComponent = () => {
    return (
        <DocumentsComponent
            columns={columns}
            defaultPageSize={15}
            rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
            allowedTranslationStatuses={[ProcessingStatus.FAILED, ProcessingStatus.INSUFFICIENT_CONFIDENCE]}/>
    )
};

export default TranslationVerifyDocumentsComponent;