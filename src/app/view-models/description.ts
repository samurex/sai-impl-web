import {UniqueId} from './index';

export interface Description extends UniqueId {
  label: string;
  description?: string;
  needId: string;
};

