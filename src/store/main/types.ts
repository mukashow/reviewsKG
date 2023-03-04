export type Service = {
  value: string;
  label: string;
};

export type User = {
  id: string;
  phone: string;
  services: Service[];
};
