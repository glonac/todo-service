export interface todo {
  owner: number;
  title: string;
  description: string;
}

export type createRequest = Omit<todo, 'owner'> & { payload: string };

export type createResponse = { id: number };
