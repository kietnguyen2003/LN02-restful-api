import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private filmsRepository: Repository<Film>,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    const existingFilm = await this.filmsRepository.findOne({
      where: { title: createFilmDto.title },
    });

    if (existingFilm) {
      throw new HttpException('Film already exists', HttpStatus.CONFLICT);
    }

    const newFilm = this.filmsRepository.create(createFilmDto);
    const savedFilm = await this.filmsRepository.save(newFilm);

    return {
      statusCode: 201,
      message: 'Film created successfully',
      data: savedFilm,
    };
  }

  findAll() {
    return this.filmsRepository.find();
  }

  async findOne(id: number) {
    const film = await this.filmsRepository.findOne({
      where: { film_id: id },
    });

    if (!film) {
      throw new NotFoundException(`Film with id ${id} not found`);
    }

    return film;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.filmsRepository.findOne({
      where: { film_id: id }, 
    });

    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }

    Object.assign(film, updateFilmDto);
    return this.filmsRepository.save(film);
  }

  async remove(id: number) {
    const film = await this.filmsRepository.findOne({
      where: { film_id: id },
    });

    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }

    return await this.filmsRepository.remove(film);
  }
}
