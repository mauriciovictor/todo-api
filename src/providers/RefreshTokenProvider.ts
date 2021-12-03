import { sign } from "jsonwebtoken";
import { getManager } from "typeorm";
import { RefreshToken } from "../models/RefreshToken";
import dayjs from "dayjs";

interface GenerateProps {
  token: string;
  refresh_token?: string;
}

const { REFRESH_TOKEN_VALUE, REFRESH_TOKEN_UNITY, JWT_SECRET } = process.env;
class RefreshTokenProvider {
  private user_id: number;

  constructor(user_id: number) {
    this.user_id = user_id;
  }

  async generate() {
    const refreshTokenModel = getManager().getRepository(RefreshToken);

    const user_id = this.user_id;

    const expiresIn = dayjs()
      .add(Number(REFRESH_TOKEN_VALUE!), REFRESH_TOKEN_UNITY!)
      .unix();

    const refresh_token = sign({}, JWT_SECRET!, {
      subject: String(user_id),
      expiresIn,
    });

    try {
      const token = await refreshTokenModel.save({
        user_id,
        refresh_token,
        expiresin: expiresIn,
      });

      return {
        user_id: token.user_id,
        id: token.id,
        expiresin: token.expiresin,
      };
    } catch (error) {
      return {};
    }
  }

  async delete(): Promise<boolean> {
    const refreshTokenModel = getManager().getRepository(RefreshToken);
    const user_id = this.user_id;
    await refreshTokenModel.delete({
      user_id,
    });

    return true;
    try {
    } catch (error) {
      return false;
    }
  }
}

export default RefreshTokenProvider;
