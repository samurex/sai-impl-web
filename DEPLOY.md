
Pass these variable names to the docker container runtime. FQDNs do not include a trailing slash.

`WEB_CLIENT_NAME` Name for the OIDC client. Will show as the name in the IdP authorization screen.

`OIDC_CLIENT_ID` Client ID (webid, IRI) for the web client. Currently limited to `BASE_URL/assets/id.jsonldfalsess
`.

`BASE_URL` FQDN for the web client

`SRV_BASE` FQDN for the SAI backend service

`DEFAULT_IDP` FQDN for a default IdP used when logging in

`ENCODED_DEFAULT_IDP` URL-encoded value of `DEFAULT_IDP`
