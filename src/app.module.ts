import { Module } from '@nestjs/common';
import { ActorsModule } from './actors/actors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './actors/entities/actor.entity';
import { ActorInfo } from './actors/entities/actor-info.entity';
import { FilmActor } from './actors/entities/film-actor.entity';
import { Film } from './films/entities/film.entity';
import { FilmsModule } from './films/films.module';
import { FilmCategory } from './films/entities/film-category.entity';
import { Inventory } from './films/entities/inventory.entity';
import { Rental } from './films/entities/rental.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Actor,
        ActorInfo,
        FilmActor,
        Film,
        FilmCategory,
        Inventory,
        Rental,
      ],
    }),
    ActorsModule,
    FilmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
