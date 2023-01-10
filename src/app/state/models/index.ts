/**
 * This file contains the models to be used in the state.
 * While some match very closely the models in sai-api-messages, these are
 * meant to be flat.
 *
 * These models can be constructed from the models in sai-api-messages and vice-versa
 */

import {UniqueId} from "@janeirodigital/sai-api-messages";
import {IRI} from "@janeirodigital/sai-api-messages/src";

export type ACL = 'http://www.w3.org/ns/auth/acl#Read'
  | 'http://www.w3.org/ns/auth/acl#Write'
  |'http://www.w3.org/ns/auth/acl#Control'
  |'http://www.w3.org/ns/auth/acl#Append'
  |'http://www.w3.org/ns/auth/acl#Update';

export interface AccessNeedGroup extends UniqueId {
  label: string;
  description?: string;
  required?: boolean;
  needs: IRI[];
}

export interface AccessNeed extends UniqueId {
  label: string;
  description?: string;
  required?: boolean;
  access: string[];
  shapeTree: IRI,
  children: IRI[]
  parent?: IRI
}

export interface ShapeTree extends UniqueId {
  label: string,
}

export interface Instance extends UniqueId {
  label: string;
}
