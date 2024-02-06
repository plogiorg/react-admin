type WithId<T extends Record<string, unknown>> = T & { id: string };

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
};

export enum UserType {
  PROVIDER = "provider",
  ADMIN = 'admin',
  USER = "user"
}

export type UserModel = WithId<{
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  name: string;
  type: UserType;
  active: boolean;
  phone?: string;
  country: string;
  street: string;
}>;

type ServiceType = WithId<{

  name: string;
  isActive: boolean

}>

export type GetUsersResponse = {
  users: UserModel[]
}

export type GetServiceTypesResponse = {
  services: ServiceType[]
}

