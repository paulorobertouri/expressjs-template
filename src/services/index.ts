import jwt from "jsonwebtoken";
import { TokenClaims } from "../domain/models.js";

export class AuthService {
  private secret: string;
  private algorithm: "HS256" | "HS384" | "HS512" = "HS256";
  private expiresIn: number;

  constructor() {
    this.secret =
      process.env.JWT_SECRET ||
      "your-super-secret-jwt-key-at-least-32-characters-long-for-hs256";
    this.algorithm = (process.env.JWT_ALGORITHM as any) || "HS256";
    this.expiresIn = parseInt(process.env.JWT_EXPIRATION || "3600", 10);
  }

  issueToken(subject: string): string {
    const payload: TokenClaims = {
      sub: subject,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + this.expiresIn,
    };

    return jwt.sign(payload, this.secret, { algorithm: this.algorithm });
  }

  validateToken(token: string): TokenClaims | null {
    try {
      const decoded = jwt.verify(token, this.secret, {
        algorithms: [this.algorithm],
      }) as TokenClaims;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}

export class CustomerService {
  private repo: any;

  constructor(repo: any) {
    this.repo = repo;
  }

  async getCustomer(id: string) {
    return this.repo.getCustomer(id);
  }

  async listCustomers() {
    return this.repo.listCustomers();
  }
}
