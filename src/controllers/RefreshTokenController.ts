import { Request, Response } from "express";
import { getManager } from "typeorm";
import day from "dayjs";

import { RefreshToken } from "../models/RefreshToken";
import RefreshTokenProvider from "../providers/RefreshTokenProvider";
import dayjs from "dayjs";
import TokenProvider from "../providers/TokenProvider";

class RefreshTokenController {
  async store(req: Request, res: Response) {
    const user_id = req.id!;

    const { refresh_token: id } = req.body;

    const refreshTokenModel = getManager().getRepository(RefreshToken);

    const refresh_token = await refreshTokenModel.findOne({
      where: {
        id,
      },
    });

    if (!refresh_token)
      return res.status(401).json({ message: "Refresh Token Invalid" });

    const refreshTokenProvider = new RefreshTokenProvider(user_id);
    const tokenProvider = new TokenProvider(user_id);

    const token = await tokenProvider.generate();

    const refreshTokenExpired = day().isAfter(
      dayjs.unix(refresh_token.expiresin)
    );

    if (refreshTokenExpired) {
      await refreshTokenProvider.delete();
      const newRefreshToken = await refreshTokenProvider.generate();

      return res.json({ token, refresh_token: newRefreshToken });
    }

    return res.json({ token });
  }
}

export default new RefreshTokenController();
