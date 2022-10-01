# SAI Authorization Agent Web

A frontend compatible with [SAI Authorization Agent Service](https://github.com/janeirodigital/sai-impl-service/),
the two together provide a compliant [Authorization Agent](https://solid.github.io/data-interoperability-panel/specification/) implementation.

## Features

### Solid-OIDC

The frontend uses [Solid-OIDC](https://solidproject.org/TR/oidc) to authenticate with the backend. It also provides OIDC Provider to the backend and takes care of redirecting the user to authenticate the backend.

### Push Notifications

Push API is used to receive notifications from the backend. Currently, it's only being used when the initial Access Receipt arrives from another social agent and the user gets prompted to create a Social Agent Registration for them. Verifying the identity of that social peer is a high-priority next step on the SAI agenda.

### Messages based API

The frontend uses [api-messages](https://github.com/janeirodigital/sai-impl-service/tree/main/packages/api-messages) to control the backend based on the user's interactions.

### User interactions

#### Applications

* List all the [Applications](https://solid.github.io/data-interoperability-panel/specification/#app) based on existing [Application Registrations](https://solid.github.io/data-interoperability-panel/specification/#application-registration)
* Authorize a new [Application](https://solid.github.io/data-interoperability-panel/specification/#app), this is initiated by a redirect from the application.

#### Social Agents (aka. Peers)

* List all the [Social Agents](https://solid.github.io/data-interoperability-panel/specification/#social-agents) based on existing [Social Agent Registrations](https://solid.github.io/data-interoperability-panel/specification/#social-agent-registration)
* Add a new social peer connection by creating a new [Social Agent Registration](https://solid.github.io/data-interoperability-panel/specification/#social-agent-registration), this is initiated by receiving a Push Notification from the backend, based on an [Access Receipt](https://solid.github.io/data-interoperability-panel/specification/#access-receipt) it received.

#### Data Registries

* List all the [Data Registries](https://solid.github.io/data-interoperability-panel/specification/#data-registry) and all the [Data Registrations](https://solid.github.io/data-interoperability-panel/specification/#data-registration) in them.

## Configuration

* SRV_BASE - the root for the [SAI Authorization Agent Service](https://github.com/janeirodigital/sai-impl-service/)
* OIDC_CLIENT_ID - the [Solid-OIDC Client ID Document](https://solid.github.io/solid-oidc/#clientids-document) can be hosted independently
* DEFAULT_IDP: - the default Solid-OIDC Provider
* VAPID_PUBLIC_KEY - public key from a keypair used by the backend to send Push Notifications


## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Push Notifications

`ng serve` doesn't work with push notifications. You can follow [Web Push Notification with web-push | Angular & Node JS ](https://dev.to/devsmranjan/web-push-notification-with-web-push-angular-node-js-36de#step-2-create-the-client) to see how to test them locally.
