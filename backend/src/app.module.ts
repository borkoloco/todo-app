import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { TodoModule } from "./todo/todo.module";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configServer: ConfigService) => ({
        type: "postgres",
        host: configServer.get("DB_HOST"),
        port: configServer.get("DB_PORT"),
        username: configServer.get("DB_USERNAME"),
        password: configServer.get("DB_PASSWORD"),
        database: configServer.get("DB_NAME"),
        synchronize: true,
        entities: [__dirname + "/**/*.entity{.js, .ts}"],
      }),
      inject: [ConfigService],
    }),
    UserModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
