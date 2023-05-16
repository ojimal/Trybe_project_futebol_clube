import { sign, verify, SignOptions, VerifyOptions, Secret } from 'jsonwebtoken';

const jwtConfig: SignOptions & VerifyOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret: Secret = process.env.JWT_SECRET || 'yourSecret';

export function generateToken(email: string) {
  const token = sign({ email }, secret, jwtConfig);
  return token;
}

export function verifyToken(token: string) {
  const payload = verify(token, secret, jwtConfig);
  return payload;
}
