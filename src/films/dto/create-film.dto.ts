import { MaxLength, IsString, IsOptional, IsInt, Min, Max, IsEnum, IsArray, IsNumber } from 'class-validator';
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

  @IsNumber({maxDecimalPlaces: 2})
  @Min(0)
  @Max(99.99) 
  @ApiProperty()
  rental_rate: number = 4.99;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  length?: number;

  @IsNumber({maxDecimalPlaces: 2})
  @Min(0) 
  @Max(999.99) 
  @ApiProperty()
  replacement_cost: number = 19.99;

  @IsEnum(['G', 'PG', 'PG-13', 'R', 'NC-17'])
  @IsOptional()
  @ApiProperty()
  rating: string = 'G';

  @IsArray()
  @IsOptional()
  @IsEnum(['Trailers', 'Commentaries', 'Deleted Scenes', 'Behind the Scenes'], { each: true })
  @ApiProperty()
  special_features?: string[];
}
