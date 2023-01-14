// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const ENV = {
  production: true,
  OIDC_CLIENT_ID: window['env']['OIDC_CLIENT_ID'],
  BASE_URL: window['env']['BASE_URL'],
  SRV_BASE: window['env']['SRV_BASE'],
  DEFAULT_IDP: window['env']['DEFAULT_IDP'],
  VAPID_PUBLIC_KEY: window['env']['VAPID_PUBLIC_KEY'],
};
