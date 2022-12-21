import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  /**
   * Return true if the password in parameter is the same as the hashed password in parameter as well.
   * @param password password
   * @param hashedPassword hashed password
   * @returns
   */
  verifyPassword: async (password: string, hashedPassword: string): Promise<boolean> => {
    return await argon2.verify(hashedPassword, password);
  },

  /**
   * Return a signed payload.
   * @param payload payload to sign
   * @returns
   */
  signJwt: (payload: any) => {
    if (process.env.JWT_SECRET_KEY === undefined) {
      throw new Error();
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60,
    });
  },

  /**
   * Return the token payload from the token in parameter.
   * @param token token to verify
   * @returns
   */
  verifyToken: (token: string) => {
    if (process.env.JWT_SECRET_KEY === undefined) {
      throw new Error();
    }

    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  },

};