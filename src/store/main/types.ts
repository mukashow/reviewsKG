export type Service = {
  id: string;
  title: string;
};

export type ServiceSelect = {
  value: string | number;
  title: string;
};

export type User = {
  id: string;
  phone: string;
  services: Service[];
};
