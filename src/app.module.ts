import { Module } from '@nestjs/common';
import { ActorsModule } from './actors/actors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './actors/entities/actor.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Actor],
    }),
    ActorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
