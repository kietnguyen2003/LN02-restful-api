import { MaxLength, IsString, IsOptional, IsInt, Min, Max, IsEnum, IsDecimal, IsArray, ArrayContains } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateFilmDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  @IsOptional()
  @ApiProperty()
  release_year?: number;

  @IsInt()
  @ApiProperty()
  language_id: number;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  original_language_id?: number;

  @IsInt()
  @Min(1)
  @ApiProperty()
  rental_duration: number = 3;

  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  @ApiProperty()
  rental_rate: number = 4.99;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  length?: number;

  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  @ApiProperty()
  replacement_cost: number = 19.99;

  @IsEnum(['G', 'PG', 'PG-13', 'R', 'NC-17'])
  @IsOptional()
  @ApiProperty()
  rating: string = 'G';

  @IsArray()
  @IsOptional()
  @ArrayContains(['Trailers', 'Commentaries', 'Deleted Scenes', 'Behind the Scenes'], {
    message: 'Special features can only be one of the following: Trailers, Commentaries, Deleted Scenes, Behind the Scenes',
  })
  @ApiProperty()
  special_features?: string[];
}
