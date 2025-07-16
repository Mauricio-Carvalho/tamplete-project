/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.

export const environment = {
  production: true,
  baseUrl: 'http://localhost:80/v1',
};

*/

export const environment = {
  production: true,
  baseUrl: "https://api.msvtecnologia.com.br",  // URL base da API
  tokenAllowedDomains: [/api\.msvtecnologia\.com\.br/],  // Domínio onde a API está hospedada
  tokenDisallowedRoutes: [/\/oauth2\/token/],  // Rotas que não devem enviar tokens (como a de autenticação)
  oauthCallbackUrl: "https://msvtecnologia.com.br/authorized",  // URL de callback após autenticação
  logoutRedirectToUrl: "https://msvtecnologia.com.br",  // URL para redirecionamento após logout
  powerBiUrl: 'https://app.powerbi.com/view?r=eyJrIjoiZDQ4ZmQwYjAtMjViMC00MTJlLWI5OWYtMjY5OTk2ZTMxMDQ0IiwidCI6ImFlOTExMGY3LTM1NDItNGI5MC1iMmJiLThkZDY5NGI4MDBjYSIsImMiOjN9'
};
