export interface SignUpResponseInterface {
  email: string;
  name: string;
  isEmailVerified: boolean;
  is2FAEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpRequestInterface {
  name: string;
  email: string;
  password: string;
}
