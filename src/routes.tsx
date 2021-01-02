import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import ImageIcon from '@material-ui/icons/Image';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DescriptionIcon from '@material-ui/icons/Description';
import {BucketsComponent} from "./components/buckets/BucketsComponent";
import {DocumentsComponent} from "./components/documents/DocumentsComponent";
import {TranslationVerificationComponent} from "./components/translation_verification/TranslationVerificationComponent";
import {TextRecognitionVerificationComponent} from "./components/text_recognition_verification/TextRecognitionVerificationComponent";

export var routes: AppRoute[] = [
    {
        path: "/",
        exact: true,
        label: 'Buckets',
        icon: <WorkIcon />,
        component: () => <BucketsComponent />
    },
    {
        path: "/documents",
        exact: true,
        label: 'Documents',
        icon: <DescriptionIcon />,
        component: () => <DocumentsComponent/>
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
    icon: React.ReactElement<SvgIconProps>,
    component: () => JSX.Element;
}
