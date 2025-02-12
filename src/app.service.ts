import { Injectable } from '@nestjs/common';
import * as process from 'node:process';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env.JWT_SECRET);
    return 'Hello World!';
  }
}
