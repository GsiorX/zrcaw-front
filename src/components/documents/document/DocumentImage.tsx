import React, {useEffect, useRef, useState} from "react";
import {useDocumentBase64Image} from "../../../hooks/documents";
import {LazyDataOrModifiedFn} from "use-async-resource";
import {Dialog} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";

const ImageComponent = (props: { imageBase64: string, onClick?: (e: React.MouseEvent) => void }) => {
    const {imageBase64, onClick} = props;

    return (
        <React.Fragment>
            {
                onClick
                    ? (
                        <img onClick={onClick} className='document--image' src={imageBase64} alt={'Document Image File'}/>)
                    : (<img className='document--image' src={imageBase64} alt={'Document Image File'}/>)
            }
        </React.Fragment>
    );
};

const getImgComponent = (imgComponent: LazyDataOrModifiedFn<string>) => {
    const img = imgComponent();
    if (!img) {
        return <p>No image</p>
    }
    return <ImageComponent imageBase64={img}/>
};

const ColapsingDocumentImageComponent = (props: { id: string }) => {
    const {id} = props;
    const [image, downloadImage] = useDocumentBase64Image();

    const loadImage = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!image())
            downloadImage(id);
    };

    return (
        <details onToggle={loadImage}>
            <summary>Show image</summary>
            <React.Suspense fallback={<p>Loading image...</p>}>
                {getImgComponent(image)}
            </React.Suspense>
        </details>
    );
};

const ImageDialog = (props: { imageComponent: JSX.Element, open: boolean, onClose: () => void }) => {
    const {imageComponent, open, onClose} = props;

    return (
        <Dialog
            onClose={onClose}
            open={open}
            aria-labelledby="dialog--title"
            fullWidth={true}
            maxWidth='xl'>
            <DialogTitle id="dialog--title">Document Full View</DialogTitle>
            {imageComponent}
        </Dialog>
    )
};

export const DocumentImageComponent = (props: { className: string, id: string }) => {
    const {id, className} = props;
    const [open, setOpen] = useState(false);
    const [image, downloadImage] = useDocumentBase64Image();
    const downloadImageRef = useRef(downloadImage);

    useEffect(() => {
        downloadImage(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, downloadImageRef]);

    const getImgComponent = (imgComponent: LazyDataOrModifiedFn<string>, onClick?: (e: React.MouseEvent) => void) => {
        const img = imgComponent();
        if (!img) {
            return <p>No image</p>
        }
        return <ImageComponent onClick={onClick} imageBase64={img}/>
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    return (
        <div className={className}>
            <React.Suspense fallback={<p>Loading image...</p>}>
                {getImgComponent(image, handleClickOpen)}
                <ImageDialog imageComponent={getImgComponent(image)} open={open} onClose={handleClickClose}/>
            </React.Suspense>
        </div>
    );
};

export default ColapsingDocumentImageComponent;