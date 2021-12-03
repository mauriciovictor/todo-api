import { sign } from "jsonwebtoken";

const { TOKEN_EXPIRESIN, JWT_SECRET } = process.env;

class TokenProvider {
  private user_id: number;

  constructor(user_id: number) {
    this.user_id = user_id;
  }

  async generate(): Promise<string> {
    const user_id = this.user_id;

    const token = sign({}, process.env.JWT_SECRET!, {
      subject: String(user_id),
      expiresIn: TOKEN_EXPIRESIN,
    });

    return token;
  }
}

export default TokenProvider;
