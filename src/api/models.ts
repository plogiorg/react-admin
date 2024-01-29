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

export type UserModel = WithId<{
  firstName: string;
  lastName: string;
  email: string;
}>;
