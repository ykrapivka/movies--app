
export type MovieServer = {
  title: string;
  year: number;
  format: string;
  actors: ActorServer[];
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type ActorServer = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};