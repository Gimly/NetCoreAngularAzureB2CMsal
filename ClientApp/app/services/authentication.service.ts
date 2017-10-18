import { Injectable } from '@angular/core';
import 'msal';

import { environment } from '../environments/environment';

@Injectable()
export class AuthenticationService {
  private authority = 'https://login.microsoftonline.com/tfp/' + environment.tenant + '/' + environment.signUpSignInPolicy;

  private clientApplication: Msal.UserAgentApplication;

  constructor() {
    this.clientApplication =
      new Msal.UserAgentApplication(
        environment.clientID,
        this.authority,
        this.authCallback);
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

  public getUser(): Msal.User {
    return this.clientApplication.getUser();
  }

  public getAuthenticationToken(): Promise<string> {
    return this.clientApplication.acquireTokenSilent(environment.b2cScopes)
      .then(token => {
        console.log('Got silent access token: ', token);
        return token;
      }).catch(error => {
        console.log('Could not silently retrieve token from storage.', error);
        return this.clientApplication.acquireTokenPopup(environment.b2cScopes)
          .then(token => {
            console.log('Got popup access token: ', token);
            return Promise.resolve(token);
          }).catch(innererror => {
            console.log('Could not retrieve token from popup.', innererror);
            return Promise.resolve('');
          });
      });
  }

  private authCallback(errorDesc: any, token: any, error: any, tokenType: any) {
    console.log('auth callback');

    if (token) {
      console.log('Got token', token);
    } else {
      console.log(error + ':' + errorDesc);
    }
  }
}
