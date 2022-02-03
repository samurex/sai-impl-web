
export enum ACCESS_LEVEL {
  READ = 'read',
  WRITE = 'write',
  CONTROL = 'control',
}

export interface Consent {
  id: string;
  name: string;
  description: string;
  author: string;
  authorUrl: string;
  authorizationDate: Date;
  icon: string;
}

export interface ConsentGroup {
  id: string,
  name: string,
  description: string;
  needs: ConsentNeed[];
}

export interface ConsentNeed {
  id: string;
  name: string;
  description: string;
  accessLevel: ACCESS_LEVEL;
}
