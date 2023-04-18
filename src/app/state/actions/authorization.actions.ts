import {createAction, props} from "@ngrx/store";
import {AccessAuthorization, Authorization} from "@janeirodigital/sai-api-messages";


/* Authorization page is loaded with a client_id in the url */
export const authorizationPageLoaded = createAction(
  '[Authorization] Authorization Page Loaded',
  props<{applicationId: string}>(),
)

/* User authorizes an application on the authorization page.
<br> The attached authorization represents the granular decision of the owner to optional needs */
export const authorizationRequested = createAction(
  '[Authorization] Authorization `Submit` clicked on',
  props<{authorization: Authorization}>(),
)

/* The authorization has been received from the server */
export const authorizationReceived = createAction(
  '[AUTHORIZATION] Authorization Received',
  props<{ accessAuthorization: AccessAuthorization }>()
)
