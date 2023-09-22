export type ThumbService = {
  id: number;
  title: string;
};

export type Service = {
  parent: ThumbService;
  children: ThumbService[];
} & ThumbService;

export type ServiceSelect = {
  value: string | number;
  title: string;
};
