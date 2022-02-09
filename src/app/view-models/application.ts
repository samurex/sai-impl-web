import {UniqueId} from "./index";

export interface ApplicationProfile extends UniqueId {
  name: string;
  description: string;
  author: string;
  url: string;
  thumbnail: string;
  authorizationDate: string; // interop:registeredAt
  lastUpdateDate: string;    // interop:updatedAt
};
