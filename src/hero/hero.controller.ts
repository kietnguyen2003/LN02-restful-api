import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { HeroById } from './interfaces/hero-by-id.interface';
import { Hero } from './interfaces/hero.interface';

// Interface định nghĩa service gRPC
interface HeroesService {
  findOne(data: HeroById): Observable<Hero>;
}

// Controller cho các endpoint liên quan đến Hero
@Controller('hero')
export class HeroController implements OnModuleInit {
  // Danh sách Hero cục bộ (giả lập)
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  private heroesService: HeroesService; // Biến để lưu trữ gRPC service

  // Inject client gRPC đã đăng ký trong module
  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) { }

  // Được gọi khi module được khởi tạo, kết nối client với service gRPC
  onModuleInit() {
    this.heroesService = this.client.getService<HeroesService>('HeroesService');
  }

  // Xử lý method gRPC `findOne` từ service `HeroesService`
  @GrpcMethod('HeroesService')
  findOne(data: HeroById): Hero {
    return this.items.find(({ id }) => id === data.id);
  }
}
