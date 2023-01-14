
// Angular envs are set at build time, we use this file
// to inject the values from an external source

(function (window){
  window["env"] = window["env"] || {};

  window["env"]["OIDC_CLIENT_ID"] = 'http://localhost:4200/assets/id-local.jsonld';
})(this);
