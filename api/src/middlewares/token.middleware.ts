import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler";
import { prisma } from "../database";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../types";

interface AuthenticatedRequest extends Request {
  user: IUser;
}

const tokenDecode = (req: Request) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(
        token,
        process.env.JWT_SECRET
      );
    }
    return false;
  } catch {
    return false;
  }
};

const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) return responseHandler.unauthorize(res);

  const user = await prisma.user.findUnique({
    where: {
      id: tokenDecoded.data,
    },
  });

  if (!user) return responseHandler.unauthorize(res);

  req.user = user;

  next();
};

export default { auth, tokenDecode };