import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DescriptionIcon from '@material-ui/icons/Description';
import {DocumentsComponent} from "./components/documents/DocumentsComponent";
import {TranslationVerificationComponent} from "./components/translation_verification/TranslationVerificationComponent";
import {TextRecognitionVerificationComponent} from "./components/text_recognition_verification/TextRecognitionVerificationComponent";
import DocumentComponent from "./components/documents/document/DocumentComponent";

export var routes: AppRoute[] = [
    {
        path: "/documents",
        exact: true,
        label: 'Documents',
        icon: <DescriptionIcon />,
        component: () => <DocumentsComponent/>
    },
    {
        path: "/documents/:id",
        label: 'Document',
        icon: <DescriptionIcon />,
        hidden: true,
        component: () => <DocumentComponent/>
    },
    {
        path: "/translationVerification",
        label: 'Translation verification',
        icon: <PhotoLibraryIcon />,
        component: () => <TranslationVerificationComponent />
    },
    {
        path: "/textRecognitionVerification",
        label: 'Text recognition verification',
        icon: <ImageIcon />,
        component: () => <TextRecognitionVerificationComponent />
    }
];

export interface AppRoute {
    path: string,
    exact?: boolean,
    label: string,
    hidden?: boolean,
    icon: React.ReactElement<SvgIconProps>,
    component: () => JSX.Element;
}
