import React from 'react';
import { SvgIconProps } from '@material-ui/core';

import ImageIcon from '@material-ui/icons/Image';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';

import LandingPage from "./components/landing_page/LandingPage";
const TextRecognitionUpdateComponent = React.lazy(() => import('./components/text_recognition_verification/TextRecognitionUpdateComponent'));
const TranslationUpdateComponent = React.lazy(() => import('./components/translation_verification/TranslationUpdateComponent'));
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
        hidden: true,
        component: (props) => <DocumentComponent {...props} />
    },
    {
        path: "/translationVerification",
        exact: true,
        label: 'Translation verification',
        icon: <PhotoLibraryIcon />,
        component: (props) => <TranslationVerifyDocumentsComponent {...props} />
    },
    {
        path: "/translationVerification/:id",
        label: 'Translation verification',
        hidden: true,
        component: (props) => <TranslationUpdateComponent {...props} />
    },
    {
        path: "/textRecognitionVerification",
        label: 'Text recognition verification',
        exact: true,
        icon: <ImageIcon />,
        component: (props) => <OCRVerifyDocumentsComponent {...props} />
    },
    {
        path: "/textRecognitionVerification/:id",
        label: 'Update text recognition',
        hidden: true,
        component: (props) => <TextRecognitionUpdateComponent {...props} />
    }
];

export interface AppRoute {
    path: string,
    exact?: boolean,
    label?: string,
    hidden?: boolean,
    icon?: React.ReactElement<SvgIconProps>,
    component: (props: any) => JSX.Element;
}
