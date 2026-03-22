export interface Customer {
  id: string;
  name: string;
  email: string;
}

export interface LoginRequest {}

export interface LoginResponse {
  token: string;
}

export interface PrivateResponse {
  message: string;
  user: string;
}

export interface PublicResponse {
  message: string;
}

export interface CustomerResponse {
  id: string;
  name: string;
  email: string;
}

export interface TokenClaims {
  sub: string;
  iat: number;
  exp: number;
}
