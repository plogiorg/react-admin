type WithId<T extends Record<string, unknown>> = T & { id: string };
type WithOptionalId<T extends Record<string, unknown>> = T & { id?: string };

export type LoginRequest = {
  username: string;
  password: string;
  type:string
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

export type ServiceType = WithOptionalId<{
  title: string;
  isActive: boolean
  description: string;
  image: string;
}>

export type GetUsersResponse = {
  users: UserModel[]
}

export type GetServiceTypesResponse = {
  types: ServiceType[]
}

