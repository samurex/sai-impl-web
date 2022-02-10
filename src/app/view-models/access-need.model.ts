import {UniqueId} from "./index";


export interface AccessNeedGroup extends UniqueId {
  title: string;
  description: string;
  required: boolean;
  needs: AccessNeed[],
}

export interface AccessNeed extends UniqueId {
  title: string;
  description: string;
  required: boolean;
  // TODO (angel) type the array
  access: Array<string>;
}
