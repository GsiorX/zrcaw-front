import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DescriptionIcon from '@material-ui/icons/Description';
import {DocumentsComponent} from "./components/documents/DocumentsComponent";

export var routes: AppRoute[] = [
    {
        path: "/",
        exact: true,
        label: 'Documents',
        hidden: false,
        icon: <DescriptionIcon />,
        component: () => <DocumentsComponent/>
    },
    {
        path: "/images",
        label: 'Images',
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
