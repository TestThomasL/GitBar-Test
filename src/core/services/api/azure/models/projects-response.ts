type Project = {
  id: string;
  name: string;
  description?: string;
  url: string;
  state: string;
  revision: number;
  visibility: string;
  lastUpdateTime: string;
  defaultTeamImageUrl?: string;
};

export type ProjectsResponse = {
  count: number;
  value: Project[];
};
