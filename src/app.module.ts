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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nestjs',
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
