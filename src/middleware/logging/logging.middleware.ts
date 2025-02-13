import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as process from 'node:process';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: `Not authorized to logging in` });
    }
    // try {
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //
    //   if (decoded) {
    //     req.user = decoded as ReqUser;
    //   } else {
    //     req.user = null;
    //   }
    // } catch (error) {
    //   req.user = null;
    // }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        'a2e042b7ccb8b54816b215876915e2d1db81ee3220f385f427bae7223a371d4a5b3d533f6161be6627633c138eb297e68b0f4602c39432389617b55b0f10dcbd',
    );
    // console.log(decoded);
    return next();
  }
}
