import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { FilmActor } from '../actors/entities/film-actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film,FilmActor])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
