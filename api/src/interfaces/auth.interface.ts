export interface DataStoredInToken {
  _id?: string;
  iat?: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}
