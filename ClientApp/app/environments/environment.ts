// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// bug there is not `.angular-cli.json` file!

export const environment = {
    production: false,
    tenant: 'fabrikamb2c.onmicrosoft.com',
    clientID: '90c0fe63-bcf2-44d5-8fb7-b8bbc0b29dc6',
    signUpSignInPolicy: 'b2c_1_susi',
    b2cScopes: ['https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read'],
    webApi: 'https://fabrikamb2chello.azurewebsites.net/hello'
  };
