import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) { }

    @Post()
    async create(@Body() createFilmDto: CreateFilmDto) {
        return await this.filmsService.create(createFilmDto);
    }

    @Get()
    findAll() {
        return this.filmsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string) {
        return this.filmsService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: string,
        @Body() updateFilmDto: UpdateFilmDto,
    ) {
        return this.filmsService.update(+id, updateFilmDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: string) {
        return this.filmsService.remove(+id);
    }
}
