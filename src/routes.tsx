import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DescriptionIcon from '@material-ui/icons/Description';
<<<<<<< HEAD
import {DocumentsComponent} from "./components/documents/DocumentsComponent";
import { TranslationVerificationComponent } from './components/translation_verification/TranslationVerificationComponent';
import { TextRecognitionVerificationComponent } from './components/text_recognition_verification/TextRecognitionVerificationComponent';
=======
import {BucketsComponent} from "./components/buckets/BucketsComponent";
import {DocumentsComponent} from "./components/documents/DocumentsComponent";
import {TranslationVerificationComponent} from "./components/translation_verification/TranslationVerificationComponent";
import {TextRecognitionVerificationComponent} from "./components/text_recognition_verification/TextRecognitionVerificationComponent";
>>>>>>> 01177ee502e73da2a406c378ce08983f7449a858

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
