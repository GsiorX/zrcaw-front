export const config: any = {
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_2dYIp9Lll',
        userPoolWebClientId: '2a96ivgsgnuunq9fpolfevronm',
        mandatorySignIn: true,
        // cookieStorage: {
        //     domain: 'test',
        //     path: '/',
        //     expires: 365,
        //     sameSite: 'strict',
        //     secure: true
        // },

        oauth: {
            domain: 'ocr-document-management.auth.us-east-1.amazoncognito.com',
            scope: [
                'email', 'openid', 'aws.cognito.signin.user.admin', 'profile', 'todo/ocr.read'
            ],
            redirectSignIn: 'http://localhost:3000/',
            redirectSignOut: 'http://localhost:3000/',
            responseType: 'code'
        } 
    }
}