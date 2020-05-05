export const environment = {
  production: false,
  azureAuthConfig: {
    auth: {
      clientId: "{Application (client) ID}",
      authority: "https://login.microsoftonline.com/{Directory (tenant) ID}",
      redirectUri: "https://example.com"
    }
  }
};