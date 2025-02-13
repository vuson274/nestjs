import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { Product } from './entities/Product';
// import { LoggingMiddleware } from './middleware/logging/logging.middleware';
import { UsersModule } from './modules/users/users.module';
import { User } from './entities/User';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_DRIVER as  'mysql' || 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // autoLoadEntities: true,
      entities: [Product, User],
      synchronize: true,
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggingMiddleware).forRoutes(
  //     {
  //       path: '/products/*',
  //       method: RequestMethod.ALL,
  //     },
  //     {
  //       path: '/products',
  //       method: RequestMethod.ALL,
  //     },
  //   );
  // }
}
