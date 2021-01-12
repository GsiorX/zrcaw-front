import React from 'react';
import {SvgIconProps} from '@material-ui/core';

import ImageIcon from '@material-ui/icons/Image';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

import LandingPage from "./components/landing_page/LandingPage";
import SettingsComponent from "./components/settings/SettingsComponent";
import UploadDocumentComponent from "./components/documents/upload/UploadDocumentComponent";
import {UserGroups} from "./hooks/authentication";

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
        path: "/upload",
        label: 'Upload document',
        exact: true,
        icon: <DescriptionIcon />,
        requiredGroups: [UserGroups.CLIENT, UserGroups.WORKER],
        component: (props) => <UploadDocumentComponent {...props} />
    },
    {
        path: "/documents",
        exact: true,
        label: 'Documents',
        icon: <DescriptionIcon />,
        requiredGroups: [UserGroups.CLIENT, UserGroups.WORKER],
        component: (props) => <AllDocumentsComponent {...props} />
    },
    {
        path: "/documents/:id",
        label: 'Document',
        hidden: true,
        requiredGroups: [UserGroups.CLIENT, UserGroups.WORKER],
        component: (props) => <DocumentComponent {...props} />
    },
    {
        path: "/translationVerification",
        exact: true,
        label: 'Translation verification',
        icon: <PhotoLibraryIcon />,
        requiredGroups: [UserGroups.WORKER],
        component: (props) => <TranslationVerifyDocumentsComponent {...props} />
    },
    {
        path: "/translationVerification/:id",
        label: 'Translation verification',
        hidden: true,
        requiredGroups: [UserGroups.WORKER],
        component: (props) => <TranslationUpdateComponent {...props} />
    },
    {
        path: "/textRecognitionVerification",
        label: 'Text recognition verification',
        exact: true,
        icon: <ImageIcon />,
        requiredGroups: [UserGroups.WORKER],
        component: (props) => <OCRVerifyDocumentsComponent {...props} />
    },
    {
        path: "/textRecognitionVerification/:id",
        label: 'Update text recognition',
        hidden: true,
        requiredGroups: [UserGroups.WORKER],
        component: (props) => <TextRecognitionUpdateComponent {...props} />
    },
    {
        path: "/settings",
        label: 'Settings',
        icon: <SettingsIcon />,
        requiredGroups: [UserGroups.MANAGER],
        component: (props) => <SettingsComponent {...props} />
    }
];

export interface AppRoute {
    path: string,
    exact?: boolean,
    label?: string,
    hidden?: boolean,
    icon?: React.ReactElement<SvgIconProps>,
    component: (props: any) => JSX.Element;
    requiredGroups?: UserGroups[];
}
