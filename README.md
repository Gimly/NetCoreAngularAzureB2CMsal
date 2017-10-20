# Angular .Net Core startup template with Authentication through Azure AD B2C
This is the dotnet core angular default template with an addition of authentication with the help of Azure AD B2C and msal.js

## Setting up
First, you'll need to download the source code using git.
```Bash
git clone https://github.com/Gimly/NetCoreAngularAzureB2CMsal.git
```
Then, go to the folder where the code has been loaded and restore both Nuget and NPM packages
```Bash
cd NetCoreAngularAzureB2CMsal
dotnet restore
npm install
```
Then, open the source code and go to `~/ClientApp/app/environments` and update the `environment.ts` file to match your own Azure AD B2C subcription.
```TypeScript
export const environment = {
  production: false,
  tenant: 'fabrikamb2c.onmicrosoft.com', // The name of your Azure AD B2C Tenant
  clientID: 'e760cab2-b9a1-4c0d-86fb-ff7084abd902', // The application ID
  signUpSignInPolicy: 'b2c_1_susi', // The name of the Sign-up or sign-in policy
  b2cScopes: ['https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read'], // A scope that you will setup in the Application 
  webApi: 'https://fabrikamb2chello.azurewebsites.net/hello' // URL of a web api
};
```
You'll also need to change the .Net Core API side's by changing the `JWT` property in the `appsettings.json` file.
```json
"Jwt": {
  "Authority": "https://login.microsoftonline.com/tfp/fabrikamb2c.onmicrosoft.com/b2c_1_susi",
  "Audience": "25eef6e4-c905-4a07-8eb4-0d08d5df8b3f"
}

```

Don't forget to add the URL and port on which you'll be running the sample in the application properties as a Reply URL, otherwise it won't work.

Alternatively, you can also keep the settings and try to connect with the fabrikamb2c tenant, just make sure that you run the app on port 6420 if you want to do this.
To do this, set the `ASPNETCORE_URLS` environment variable to `"http://localhost:6420"`. If you're using PowerShell, use this command:
```PowerShell
$env:ASPNETCORE_URLS="http://localhost:6420"
```

## Running the sample
Before you run the sample locally, make sure you're running it in Development mode, otherwise it might not correctly bootstrap webpack.
```PowerShell
$Env:ASPNETCORE_ENVIRONMENT = "Development"
```

To run the sample, simply call
```Bash
dotnet run
```
