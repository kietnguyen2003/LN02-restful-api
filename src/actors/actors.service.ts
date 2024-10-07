import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor) private actorsRepository: Repository<Actor>,
  ) {}

  create(createActorDto: CreateActorDto) {
    return 'This action adds a new actor';
  }

  findAll() {
    return this.actorsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} actor`;
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return `This action updates a #${id} actor`;
  }

  remove(id: number) {
    return `This action removes a #${id} actor`;
  }
}
