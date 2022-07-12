// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const ENV = {
  production: false,
  OIDC_CLIENT_ID: 'http://localhost:4200/assets/id.jsonld',
  BASE_URL: 'http://localhost:4200',
  SRV_BASE: 'http://localhost:4000',
  API_URL: 'http://localhost:4200/api',
  DEFAULT_IDP: 'http://localhost:3000/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
