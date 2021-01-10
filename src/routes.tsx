import React from 'react';
import { SvgIconProps } from '@material-ui/core';

import ImageIcon from '@material-ui/icons/Image';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';

import LandingPage from "./components/landing_page/LandingPage";
const DocumentComponent = React.lazy(() => import('./components/documents/document/DocumentComponent'));
const AllDocumentsComponent = React.lazy(() => import('./components/documents/AllDocumentsComponent'));
const TranslationVerifyDocumentsComponent = React.lazy(() => import('./components/translation_verification/TranslationVerifyDocumentsComponent'));
const OCRVerifyDocumentsComponent = React.lazy(() => import('./components/text_recognition_verification/OCRVerifyDocumentsComponent'));

export var routes: AppRoute[] = [
    {
        path: "/",
        exact: true,
        label: 'Home',
        icon: <HomeIcon />,
        component: (props) => <LandingPage {...props} />
    },
    {
        path: "/documents",
        exact: true,
        label: 'Documents',
        icon: <DescriptionIcon />,
        component: (props) => <AllDocumentsComponent {...props} />
    },
    {
        path: "/documents/:id",
        label: 'Document',
        icon: <DescriptionIcon />,
        hidden: true,
        component: (props) => <DocumentComponent {...props} />
    },
    {
        path: "/translationVerification",
        label: 'Translation verification',
        icon: <PhotoLibraryIcon />,
        component: (props) => <TranslationVerifyDocumentsComponent {...props} />
    },
    {
        path: "/textRecognitionVerification",
        label: 'Text recognition verification',
        icon: <ImageIcon />,
        component: (props) => <OCRVerifyDocumentsComponent {...props} />
    }
];

export interface AppRoute {
    path: string,
    exact?: boolean,
    label: string,
    hidden?: boolean,
    icon: React.ReactElement<SvgIconProps>,
    component: (props: any) => JSX.Element;
}
