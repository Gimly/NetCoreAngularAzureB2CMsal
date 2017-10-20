// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.

export const environment = {
    production: false,
    tenant: 'fabrikamb2c.onmicrosoft.com',
    clientID: 'e760cab2-b9a1-4c0d-86fb-ff7084abd902',
    signUpSignInPolicy: 'b2c_1_susi',
    b2cScopes: ['https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read'],
    webApi: 'https://fabrikamb2chello.azurewebsites.net/hello'
  };
