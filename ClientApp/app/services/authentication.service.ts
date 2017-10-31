import { Injectable } from '@angular/core';
import * as Msal from 'msal';

import { environment } from '../environments/environment';
import { User } from "msal/lib-commonjs/User";

@Injectable()
export class AuthenticationService {
    private authority = `https://login.microsoftonline.com/tfp/${environment.tenant}/${environment.signUpSignInPolicy}`;

    private clientApplication: Msal.UserAgentApplication;

    constructor() {
        this.clientApplication =
            new Msal.UserAgentApplication(
                environment.clientID,
                this.authority,
                this.authCallback,
                {
                    redirectUri: window.location.origin
                });
    }

    public login(): void {
        this.clientApplication.loginRedirect(environment.b2cScopes);
    }

    public logout(): void {
        this.clientApplication.logout();
    }

    public isOnline(): boolean {
        return this.clientApplication.getUser() != null;
    }

    public getUser(): User {
        return this.clientApplication.getUser();
    }

    public getAuthenticationToken(): Promise<string> {
        return this.clientApplication.acquireTokenSilent(environment.b2cScopes)
            .then(token => {
                return token;
            }).catch(error => {
                return this.clientApplication.acquireTokenPopup(environment.b2cScopes)
                    .then(token => {
                        return Promise.resolve(token);
                    }).catch(innererror => {
                        console.error('Could not retrieve token from popup.', innererror);
                        return Promise.resolve('');
                    });
            });
    }

    private authCallback(errorDesc: any, token: any, error: any, tokenType: any) {
        if (error) {
            console.error(`${error} ${errorDesc}`);
        }
    }
}
