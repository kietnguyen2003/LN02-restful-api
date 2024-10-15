
export class CreateFilmDto {

  title: string;

  description?: string;

  release_year?: number;

  language_id: number;
 
  original_language_id?: number;

  rental_duration: number = 3;

  rental_rate: number = 4.99;

  length?: number;

  replacement_cost: number = 19.99;

  rating: string = 'G';

  special_features?: string[];
}
