// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const ENV = {
  production: false,
  OIDC_CLIENT_ID: window['env'] && window['env']['OIDC_CLIENT_ID'] ? window['env']['OIDC_CLIENT_ID'] : 'http://localhost:4200/assets/id-local.jsonld',
  BASE_URL: window['env'] && window['env']['BASE_URL'] ? window['env']['BASE_URL'] : 'http://localhost:4200',
  SRV_BASE: window['env'] && window['env']['SRV_BASE'] ? window['env']['SRV_BASE'] : 'http://localhost:4000',
  DEFAULT_IDP: window['env'] && window['env']['DEFAULT_IDP'] ? window['env']['DEFAULT_IDP'] : 'http://localhost:3000',
  VAPID_PUBLIC_KEY: window['env'] && window['env']['VAPID_PUBLIC_KEY'] ? window['env']['VAPID_PUBLIC_KEY'] : "BNUaG9vwp-WE_cX-3dNLebyczW_RivE8wHECIvZIUMUZ3co6P79neE3hueJJtFcg5ezTZ25T1ITciujz-mlAcnY"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
