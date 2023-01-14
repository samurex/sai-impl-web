
// Angular envs are set at build time, use this file
// to inject the values from an external source at container run time
// using envsubst, see `Dockerfile`

(function (window){
  window["env"] = window["env"] || {};

  window["env"]["OIDC_CLIENT_ID"] = "${OIDC_CLIENT_ID}";
  window["env"]["BASE_URL"] = "${BASE_URL}";
  window["env"]["SRV_BASE"] = "${SRV_BASE}";
  window["env"]["DEFAULT_IDP"] = "${DEFAULT_IDP}";
  window["env"]["VAPID_PUBLIC_KEY"] = "${VAPID_PUBLIC_KEY}";
})(this);
